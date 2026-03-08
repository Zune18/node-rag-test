import "dotenv/config";
import ollama from "ollama";

export async function create_embedding(text: string) {
  const response = await ollama.embeddings({
    model: "nomic-embed-text",
    prompt: text
  });

  return response.embedding;
}