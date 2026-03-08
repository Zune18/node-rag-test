import express from "express";
import { ask_question } from "./rag";

const app = express();
app.use(express.json());

app.post("/ask", async (req, res) => {
    const { question } = req.body;

    const answer = await ask_question(question);

    res.json({ answer });
});

app.listen(3000, () => {
    console.log("RAG server running on port 3000");
});