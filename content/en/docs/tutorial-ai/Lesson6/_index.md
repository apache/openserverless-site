---
title: Lesson 6
weight: 70
---

> _Lesson 5_ introduced vision models and S3 storage. _Lesson 6_ introduces embeddings and vector databases.

# Lesson 6 - Embeddings & Vector Databases

In this lesson you will store text in a vector database and search it by semantic similarity.

You will learn:

- What embeddings are
- Why vector databases are useful for LLM applications
- How to create a Milvus collection
- How to insert embedded text
- How to search by vector similarity
- How to load text from PDF files
- How document loading prepares data for RAG

---

## Preparing the Environment

Start from your fork of the starter repository.

1. Sync your fork if updates are available.
2. Start your Codespace.
3. Log in from the Open Serverless extension.
4. Select **Lesson 6** from the lessons panel.

---

## Vector Databases

A vector database stores numerical representations of data and searches by similarity.

In this course, the vector database is **Milvus**.

Vector search is important for LLM applications because it lets you find text that is semantically related to a question.

For example:

- `cat` is closer to `dog` than to `orange`
- `bitcoin` is closer to `blockchain` than to `banana`

This similarity search is the foundation of RAG: retrieval augmented generation.

---

## Milvus Concepts

Milvus is organized into databases and collections.

You can think of a collection like a table.

Each collection has:

| Concept    | Meaning                                  |
|------------|------------------------------------------|
| Schema     | Field structure for stored records       |
| Field      | A value such as text or an embedding     |
| Entity     | One stored record                        |
| Index      | Data structure that speeds up search     |
| Metric     | Distance function used for similarity    |

For text search, each record usually stores:

- The original text
- The embedding vector for that text

---

## Connecting to Milvus

Create a Milvus client from the environment values.

```python
import os
from pymilvus import MilvusClient

uri = os.getenv("MILVUS_HOST")
token = os.getenv("MILVUS_TOKEN")
database = os.getenv("MILVUS_DB")

client = MilvusClient(
    uri=uri,
    token=token,
    db_name=database,
)
```

List collections:

```python
client.list_collections()
```

Drop a collection while experimenting:

```python
client.drop_collection("test")
```

---

## Creating a Collection

Choose a vector dimension that matches the embedding model.

In the lesson, the embedding size is `1024`.

Create a schema with:

- An auto-generated ID
- A text field
- A vector field

Conceptually:

```python
from pymilvus import DataType

collection = "test"
dim = 1024

schema = MilvusClient.create_schema(auto_id=True)

schema.add_field(
    field_name="id",
    datatype=DataType.INT64,
    is_primary=True,
)

schema.add_field(
    field_name="text",
    datatype=DataType.VARCHAR,
    max_length=4096,
)

schema.add_field(
    field_name="embedding",
    datatype=DataType.FLOAT_VECTOR,
    dim=dim,
)
```

Then create an index for the vector field:

```python
index_params = client.prepare_index_params()

index_params.add_index(
    field_name="embedding",
    index_type="AUTOINDEX",
    metric_type="IP",
)
```

Create the collection:

```python
client.create_collection(
    collection_name=collection,
    schema=schema,
    index_params=index_params,
)
```

---

## Inserting Records

Each record needs text and an embedding.

Before learning embeddings, you can insert a fake vector only to understand the Milvus API:

```python
data = [
    {
        "text": "hello world",
        "embedding": [0.0] * 1024,
    }
]

client.insert(
    collection_name="test",
    data=data,
)
```

Query records:

```python
res = client.query(
    collection_name="test",
    filter="",
    output_fields=["text"],
)
```

This proves that the collection can store and return records. For real search, use embeddings.

---

## Embeddings

An embedding is a numerical vector that represents text semantically.

Instead of returning text, an embedding model returns a list of numbers.

That list can be stored in Milvus and used for similarity search.

Create an embedding request to Ollama:

```python
import os
import requests

host = os.getenv("OLLAMA_HOST")
auth = os.getenv("AUTH")
url = f"https://{auth}@{host}/api/embeddings"

msg = {
    "model": "mxbai-embed-large",
    "prompt": "hello world",
}

res = requests.post(url, json=msg).json()
embedding = res["embedding"]
```

The embedding model must produce vectors with the same dimension as the Milvus collection.

---

## Vector DB Helper Class

The lesson wraps Milvus and embedding logic in a `VectorDB` class.

The class can:

- Create or reset a collection
- Embed text with Ollama
- Insert text and embedding together
- Search for semantically similar text
- Remove records

Conceptually:

```python
class VectorDB:
    def embed(self, text):
        res = requests.post(self.embed_url, json={
            "model": self.embed_model,
            "prompt": text,
        }).json()
        return res["embedding"]

    def insert(self, text):
        embedding = self.embed(text)
        self.client.insert(
            collection_name=self.collection,
            data=[{
                "text": text,
                "embedding": embedding,
            }],
        )
```

---

## Searching by Similarity

To search, embed the search text and compare it against stored embeddings.

Example:

```python
query = "test"
query_embedding = vdb.embed(query)

res = client.search(
    collection_name="test",
    data=[query_embedding],
    anns_field="embedding",
    limit=5,
    output_fields=["text"],
)
```

The closest records are returned first.

If the collection contains:

```text
This is a test
This is another test
Testing the system
Hello world
```

then searching for:

```text
test
```

should return the test-related sentences before unrelated text.

---

## Loader Action

The lesson provides an action for loading and searching text.

The input commands are:

| Input prefix | Behavior                    |
|--------------|-----------------------------|
| text         | Insert text into Milvus     |
| `*text`      | Search for related text     |
| `!text`      | Remove matching records     |

Examples:

```text
This is a test
```

```text
*test
```

```text
!test
```

This action can be used from Pinocchio or from the command line.

---

## Loading Text From PDFs

Typing text manually is useful for tests, but real databases are loaded from documents.

The lesson uses PDF extraction to import document text.

The basic PDF flow is:

1. Open the PDF.
2. Extract text from each page.
3. Split the text into smaller sentences or chunks.
4. Send each piece to the loader action.

Example libraries:

- `pymupdf` for reading PDFs
- a sentence tokenizer for splitting text

Small pieces work better than huge pages because embeddings are more useful when each record has focused content.

---

## `ops ai loader`

The course plugin includes a loader command that automates document import.

The loader can:

- Convert a PDF into text
- Split the text into chunks or sentences
- Invoke an action for each piece of text

Example:

```bash
ops ai loader lessons/bitcoin.pdf --action vdb-load
```

The loader sends each extracted sentence or chunk to the `vdb-load` action, which embeds it and stores it in Milvus.

After loading the Bitcoin white paper, search for terms such as:

```text
*bitcoin
```

```text
*merkle
```

The vector database should return related passages.

---

## Exercise: Import Web Pages

Extend the loader so it can import content from a web URL.

If the input starts with:

```text
http
```

the loader should:

1. Download the web page.
2. Extract readable text from the HTML.
3. Split the text into chunks.
4. Send each chunk to the vector database loader action.

Recommended tools:

- `requests` to fetch the page
- `BeautifulSoup` to extract text
- regular expressions to split text into useful chunks

Use lighter splitting for web pages when a full tokenizer is too heavy.

---

## Deploy and Try It

Deploy the lesson actions:

```bash
ops ide deploy
```

Insert text:

```text
This is a test
```

Search:

```text
*test
```

Load a PDF:

```bash
ops ai loader lessons/bitcoin.pdf --action vdb-load
```

Then search:

```text
*bitcoin
```

---

## Summary

You now:

- Created a Milvus collection
- Added text and vector fields
- Generated embeddings with Ollama
- Inserted embedded text into Milvus
- Performed vector similarity searches
- Loaded PDF text into the vector database
- Prepared the foundation for RAG

---

## Up Next

Next lesson combines vector search with LLM generation to build a complete RAG system.
