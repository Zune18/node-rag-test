import fs from "fs";
import { create_embedding } from "./embed";
import { Pool } from "pg";
import "dotenv/config";

const pool = new Pool({
  connectionString: process.env.DB_URL
});

function chunk_text(text: string, size = 500) {
  const words = text.split(" ");
  const chunks = [];

  for (let i = 0; i < words.length; i += size) {
    chunks.push(words.slice(i, i + size).join(" "));
  }

  return chunks;
}

export async function ingest() {
  const text = fs.readFileSync("./data/docs.txt", "utf8");

  const chunks = chunk_text(text);

  for (const chunk of chunks) {
    const embedding = await create_embedding(chunk);

    // Convert JS array → pgvector format
    const vector = `[${embedding.join(",")}]`;

    await pool.query(
      `INSERT INTO documents (content, embedding)
       VALUES ($1, $2)`,
      [chunk, vector]
    );
  }

  console.log("Ingestion complete");
}

ingest();