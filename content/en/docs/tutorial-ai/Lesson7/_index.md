---
title: Lesson 7
weight: 80
---

> _Lesson 6_ introduced embeddings and vector search. _Lesson 7_ combines them with LLM generation to build a RAG system.

# Lesson 7 - Retrieval Augmented Generation

In this final lesson you will build a RAG system: retrieval augmented generation.

RAG lets an LLM answer using private or external information by retrieving relevant context from a vector database and adding it to the prompt.

You will learn:

- What RAG is
- How vector search creates context
- How chunk size affects retrieval quality
- How to load multiple document collections
- How to query different collections and models
- How the RAG loader and RAG query actions work
- How to design an image RAG exercise

---

## Preparing the Environment

Start from a clean and updated Codespace.

1. Commit or save your local changes.
2. Sync your fork if updates are available.
3. Delete and recreate the Codespace if the starter changed significantly.
4. Log in from the Open Serverless extension.
5. Select **Lesson 7** from the lessons panel.

Lesson 7 contains more complete examples than the previous lessons. It brings together the work from the whole course.

---

## What RAG Means

RAG means retrieval augmented generation.

The system works in two phases:

1. **Retrieval**: search a knowledge source for content related to the user question.
2. **Generation**: send the question plus the retrieved context to the LLM.

The LLM does not need to already know the information. It can answer using the context provided with the request.

This is especially useful for private data, internal documents, personal datasets, or new information not present in the model training data.

---

## RAG Flow

A typical RAG request works like this:

1. The user asks a question.
2. The question is converted into an embedding.
3. The vector database searches for similar chunks.
4. The retrieved chunks are combined into a context.
5. The context and question are sent to the LLM.
6. The LLM answers using that context.

Conceptually:

```text
Question -> Embedding -> Vector search -> Context -> LLM prompt -> Answer
```

---

## Simple RAG Example

Start with a small vector database containing facts:

```text
Lisa is the first daughter of Steve Jobs.
Her name is Lisa Brennan.
The Apple Lisa was named after Lisa.
The name Lisa may also refer to the Mona Lisa.
```

Search for:

```text
Lisa
```

The vector database returns related facts.

Build a context:

```text
Consider this information:
Lisa is the first daughter of Steve Jobs.
Her name is Lisa Brennan.
The Apple Lisa was named after Lisa.
The name Lisa may also refer to the Mona Lisa.
```

Now ask:

```text
Who is Lisa?
```

Without context, the LLM may answer generically. With context, it can answer about Steve Jobs' daughter and the Apple Lisa.

That is the core RAG mechanism.

---

## Chunk Size

RAG works best when documents are split into useful chunks.

Chunks should be:

- Small enough to search accurately
- Large enough to preserve meaning
- Semantically related where possible

As a practical starting point, this lesson uses chunks of about 4000 characters, roughly 500 to 800 words.

This is not perfect, but it is simple and works well enough for learning.

Better systems often split by:

- Sections
- Paragraphs
- Headings
- Semantic boundaries

Good chunking is a major part of content engineering for RAG.

---

## Context Size

Each LLM has a context window limit.

The model used in the course can handle a large context, but the request still needs room for:

- The system prompt
- Retrieved chunks
- The user question
- The answer

If each chunk is around 4000 characters, around 30 chunks is a practical upper limit for the examples.

Too much context can make responses slower, more expensive, or less focused.

---

## RAG Loader Action

The lesson includes a loader action for managing vector database content.

The loader supports:

- Multiple collections
- Manual text insertion
- Vector searches
- Record deletion
- Collection deletion
- Search limit changes

Collections let you keep different knowledge sources separate.

For example:

- `bitcoin`
- `linkedin`
- `jobs`

---

## Loader Commands

The loader action uses short command prefixes.

| Command       | Behavior                              |
|---------------|---------------------------------------|
| text          | Insert text into the current collection |
| `*query`      | Search current collection             |
| `!text`       | Delete records matching text          |
| `!!name`      | Delete a collection                   |
| `@name`       | Select a collection                   |
| `#number`     | Change search result limit            |

Examples:

```text
@bitcoin
```

selects the `bitcoin` collection.

```text
This is a test
```

adds text to the current collection.

```text
*bitcoin
```

searches for related chunks.

```text
!test
```

removes matching records.

```text
!!bitcoin
```

removes the `bitcoin` collection.

---

## Loading PDFs

The command-line loader can import documents into a collection.

Example:

```bash
ops ai loader --action rag-loader --collection bitcoin lessons/bitcoin.pdf
```

The loader:

1. Extracts text from the PDF.
2. Splits the text into chunks.
3. Sends each chunk to the loader action.
4. Embeds each chunk.
5. Stores each embedded chunk in the selected collection.

After loading, select the collection:

```text
@bitcoin
```

Search:

```text
*bitcoin
```

```text
*merkle
```

---

## Private Data Example

Public documents are often already known by large LLMs.

RAG becomes more useful with private or local data. The lesson shows this with exported LinkedIn connections.

The workflow is:

1. Export contacts from LinkedIn as CSV.
2. Convert the CSV into a more readable text format.
3. Import the text into a vector collection.
4. Ask questions about the imported contacts.

Example collection:

```text
linkedin
```

Example questions:

```text
List contacts with the role of CEO.
```

```text
List contacts who work in software engineering.
```

The example is intentionally simple. Better results require better data structuring and chunking.

---

## RAG Query Action

The RAG query action combines vector search with an LLM prompt.

It supports:

- Multiple collections
- Multiple LLMs
- Variable context size
- Abbreviated collection names
- Streaming responses

The action parses a short command prefix, performs vector search, builds a context, and sends the question to the selected LLM.

---

## Query Syntax

Use `@` to choose model, context size, and collection.

The exact parser is implemented in the lesson code, but the idea is:

```text
@<model><limit><collection> question
```

Examples:

```text
@jobs Who is Lisa?
```

asks using the `jobs` collection.

```text
@phi jobs Who is Lisa?
```

asks with the Phi model and the `jobs` collection.

```text
@l List all contacts with the role of CEO.
```

uses the collection whose name starts with `l`, such as `linkedin`.

Short prefixes make it quick to switch collections and models from the chat.

---

## Building the Prompt

After retrieving chunks, the action builds a prompt like this:

```text
Use the following context to answer the question.

Context:
<retrieved chunks>

Question:
<user question>
```

Then it sends the prompt to the selected LLM.

Most of the implementation reuses pieces from earlier lessons:

- LLM access
- Streaming
- Vector database search
- State and command parsing

Lesson 7 is mainly about putting those pieces together.

---

## Comparing Models

The RAG query action can switch models, for example:

- Llama
- Phi
- Mistral
- DeepSeek

Different models may answer the same context differently.

Trying multiple models helps you understand how:

- Context affects answers
- Smaller models behave with retrieved data
- Prompt wording changes results
- Private datasets need careful structuring

---

## Exercise: Image RAG

The final exercise is to build a RAG system for images.

Use what you learned in Lessons 5, 6, and 7.

The system should:

1. Upload images from a form or from S3.
2. Use a vision model to describe each image.
3. Store the image description in the vector database.
4. Keep a reference to the original image, such as an S3 key or signed URL.
5. Search images by semantic description.
6. Return matching images and descriptions.

Example:

```text
Find images with a bird on a branch.
```

The system should retrieve image descriptions related to the prompt and display the matching images.

---

## Suggested Image RAG Design

A useful record structure could include:

| Field         | Purpose                              |
|---------------|--------------------------------------|
| `description` | Text generated by the vision model   |
| `embedding`   | Vector embedding of the description  |
| `s3_key`      | Stored image key                     |
| `filename`    | Original file name                   |

The flow:

1. Upload an image.
2. Store it in S3.
3. Generate a description with the vision model.
4. Embed the description.
5. Store the description, embedding, and S3 key in Milvus.
6. Search by text query.
7. Generate signed URLs for matching images.
8. Display the images in Pinocchio.

This combines the main ideas from the course into one project.

---

## Deploy and Try It

Deploy the lesson actions:

```bash
ops ide deploy
```

Try the loader:

```text
@jobs
```

```text
*Lisa
```

Try the RAG query:

```text
@jobs Who is Lisa?
```

Load a PDF:

```bash
ops ai loader --action rag-loader --collection bitcoin lessons/bitcoin.pdf
```

Then query it:

```text
@bitcoin What is a Merkle tree?
```

---

## Summary

You now:

- Built the mental model of RAG
- Used vector search to retrieve context
- Loaded documents into named collections
- Queried private and document-based data
- Switched collections and LLMs from chat commands
- Saw how chunking affects answer quality
- Designed a final image RAG exercise

---

## Course Wrap-Up

This first edition of the course introduced the main building blocks for private AI applications with Apache Open Serverless:

- LLM calls
- Streaming
- Secrets
- Forms
- Displays
- Stateful assistants
- Vision models
- S3 storage
- Embeddings
- Vector databases
- RAG

From here, you can extend these examples into your own private AI workflows and open source projects.
