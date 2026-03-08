import ollama from "ollama";
import { search_similar } from "./search";

export async function ask_question(question: string) {
  const contexts = await search_similar(question);

  const prompt = `
Answer using ONLY the context below.

Context:
${contexts.join("\n")}

Question:
${question}
`;

  const response = await ollama.chat({
    model: "llama3.1:8b",
    messages: [
      { role: "user", content: prompt }
    ]
  });

  return response.message.content;
}