import "dotenv/config";
import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.HF_API_KEY);

export async function create_embedding(text: string) {
    const embedding = await hf.featureExtraction({
        model: "BAAI/bge-small-en-v1.5",
        inputs: text
    });

    return embedding as number[];
}