import OpenAI from "openai";
import { search_similar } from "./search";

const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1"
});

export async function ask_question(question: string) {

    const contexts = await search_similar(question);

    const prompt = `
Answer using ONLY the context below.

Context:
${contexts.join("\n")}

Question:
${question}
`;

    const response = await client.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [
            { role: "user", content: prompt }
        ]
    });

    return response.choices[0].message.content;
}