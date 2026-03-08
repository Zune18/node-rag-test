import { Pool } from "pg";
import { create_embedding } from "./embed";
import "dotenv/config";

const pool = new Pool({
    connectionString: process.env.DB_URL
});

export async function search_similar(query: string) {
    const embedding = await create_embedding(query);

    // Convert JS array → pgvector format
    const vector = `[${embedding.join(",")}]`;

    const result = await pool.query(
        `
    SELECT content
    FROM documents
    ORDER BY embedding <-> $1
    LIMIT 3
    `,
        [vector]
    );

    return result.rows.map((r: any) => r.content);
}