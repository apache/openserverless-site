---
title: Lesson 1
weight: 20
---


> _Lesson 0_ was the environment setup. _Lesson 1_ is the **first real lesson** of the course.

# Lesson 1 – Integrated Services & First Exercise

After launching and configuring your environment, ensure you're **logged in** to begin.

---

## Downloading the Lesson

1. In the extension, select **Lesson 1** from the sidebar.
2. This will automatically download all lesson files.
3. You can preview the new lesson by selecting the markdown file under `lessons/`.

---

## Included "Hello" Examples

The `hello` package includes small examples demonstrating system services:

| Service     | Description                              |
|-------------|------------------------------------------|
| Redis       | Cache operations (info, keys, etc.)      |
| Milvus      | Vector DB search using embedding         |
| Streamer    | ASCII-based output streaming             |
| LLM (Alma)  | Query small language model                |
| S3 Storage  | Store, list, upload & delete files       |
| Tests       | 2 failing tests to practice debugging     |

> These examples are useful for testing, debugging, and learning the system APIs.

---

## Running and Fixing Tests

1. Run the tests (Tests tab).
2. Two tests **intentionally fail**.
3. Locate the `TODO` in the broken test.
4. Example fix: change `"Hi"` to `"Hello"` and save.

### Why Tests Still Fail After Fix?

- **Unit test** will pass immediately.
- **Integration test** will still fail — it requires deployment!

### Fix Integration Tests

```bash
# Deploy the fixed code
ops ide deploy

# Or just redeploy the specific action
ops ide deploy hello-llm
```

> Enable **Dev Mode** for automatic deploy on save.

---

## Using the Deployed Examples

After deployment, you’ll get a **custom URL**. Login with your user credentials.

### Example Services Overview

#### 1. Alma (LLM)

- Powered by a 3.18B parameter model
- Works in Italian and English
- Example:
  - Ask: `What is the capital of Italy?`
  - Response: `Rome`

#### 2. Streamer

- Demonstrates streaming via slow ASCII output
- Example: `Hi, how are you?` → streamed char-by-char

#### 3. Redis

- Supports CLI-like interaction
- Examples:
  ```bash
  info
  keys *
  ```

#### 4. Object Storage (MinIO)

- S3-compatible local storage
- Commands: list, insert (`+ key = value`), search, delete
- Supports file upload via UI

#### 5. Vector DB (Milvus)

- Supports semantic search
- Example:
  ```text
  This is a test
  Another test
  ```
  Then search: `*test` → shows ranked results by similarity

---

## Command-Line Tools (OBS CLI)

Use `ops` for CLI actions. Common subcommands:

```bash
ops ai lesson            # download lessons
ops ai user              # manage users
ops ai chat <svc>        # chat with an LLM from CLI
ops ide deploy <action>  # deploy a single action
ops action delete <svc>  # delete an action
ops clean                # cleanup temp files
```

> `ops ai chat` is a terminal version of the web chat.

---

## Creating a New Service: Reverse Text

### Step-by-step: "Reverse Text" Chat App

1. Ask Alma: _"How do I reverse a string in Python?"_
2. Create the service:

```bash
obs ai new reverse -p messiah
```

This creates:

```
packages/
  messiah/
    reverse/      # your new action
    __tests__/
      reverse.unit.test.py
      reverse.int.test.py
```

3. Run the tests → Integration test should fail initially
4. Deploy:

```bash
ops deploy
```

5. Add to UI:
   - Edit `packages/mastrogpt/index/index.py`
   - Add:
     ```python
     reverse("messiah/reverse")
     ```
6. Redeploy the index:

```bash
ops ide deploy mastrogpt-index
```

7. Try it in the web UI:  
   Log in → Select `Reverse` → Input: `hello` → Output: `olleh`

---

## Edit Logic in Code

File: `packages/messiah/reverse/main.py`

```python
def main(args):
    inp = args.get("input", "")
    if inp == "":
        return {"output": "Please provide an input"}
    else:
        out = inp[::-1]
        return {"output": f"**{out}**"}  # bold markdown
```

Use **Dev Mode** to auto-deploy as you edit.

---

## Summary

You now:

- Downloaded your first real lesson
- Ran & fixed tests (unit + integration)
- Explored system services: Redis, Alma, MinIO, Milvus, Streamer
- Built and deployed a custom chat service
- Learned how to modify and extend the UI

---

## Up Next

Next lessons will:

- Dive deeper into LLM usage
- Cover vision models and embeddings
- Show full-stack app development using Open Serverless

Happy coding!
