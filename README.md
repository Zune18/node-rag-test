## Models Used

**Embedding model**

* `nomic-embed-text`

**LLM**

* `llama3.1:8b`

Both models should run locally using **Ollama**.

---

## Database Setup

Enable `pgvector` and create the documents table.

```sql
CREATE EXTENSION vector;

CREATE TABLE documents (
  id SERIAL PRIMARY KEY,
  content TEXT,
  embedding VECTOR(768)
);
```

---

## Environment Variables

Create a `.env` file in the project root:

```
DB_URL=postgresql://postgres:postgres@localhost:5432/ragdb
```

---

## Ingest Documents

Generate embeddings for documents and store them in PostgreSQL.

```
npx ts-node src/ingest.ts
```
