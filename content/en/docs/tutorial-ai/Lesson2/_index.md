---
title: Lesson 2
weight: 30
---

> _Lesson 1_ introduced the first services and a simple chat action. _Lesson 2_ shows how to call an LLM directly and stream its answer through Open Serverless.

# Lesson 2 – LLM Access, Secrets & Streaming

In this lesson you will build an LLM chat that streams its output while the model is generating it.

You will learn:

- How to access the Ollama LLM endpoint
- How secrets are passed to tests and deployed actions
- How streaming works in Python and in Open Serverless
- How to test streaming locally with a mock
- How to complete a streamed LLM chat exercise

---

## Preparing the Environment

Start from the MastroGPT starter repository as in the previous lessons.

1. Open the MastroGPT GitHub organization.
2. Fork the starter repository into your own account.
3. Create a Codespace from your fork.
4. Log in from the Open Serverless extension using your course credentials.
5. Select **Lesson 2** from the lessons panel.

Each lesson is independent. You do not need the files from Lesson 1 to complete Lesson 2.

> You can also work locally, but Codespaces keeps the course environment preconfigured.

---

## Optional Editor Shortcut

During the lesson it is useful to send selected code from the editor directly to the terminal.

In VS Code:

1. Open **Settings**.
2. Select **Keyboard Shortcuts**.
3. Search for **Run Selected Text in Active Terminal**.
4. Assign a shortcut, for example `Ctrl+Enter`.

This makes it easier to copy small code snippets into the interactive CLI while experimenting.

---

## Accessing the LLM

The LLM endpoint is protected with the same credentials used by Open Serverless.

The two values you need are:

| Variable      | Purpose                            |
|---------------|------------------------------------|
| `OLLAMA_HOST` | Hostname of the Ollama server      |
| `AUTH`        | Credentials used to access Ollama  |

Open the interactive Python CLI:

```bash
ops ai cli
```

Read the values from the environment:

```python
import os

args = {}
host = args.get("OLLAMA_HOST", os.getenv("OLLAMA_HOST"))
auth = args.get("AUTH", os.getenv("AUTH"))
base = f"https://{auth}@{host}"
```

The pattern is important:

```python
value = args.get("NAME", os.getenv("NAME"))
```

Always read secrets from `args` first, then fall back to the environment. This keeps the same code usable in tests, local CLI experiments, and deployed actions.

You can verify that Ollama is reachable:

```python
!curl {base}
```

You should receive a response showing that Ollama is running.

---

## Calling Ollama Without Streaming

Start with a normal request that returns the full answer only when generation is complete.

```python
import requests

model = "llama3.1:8b"
inp = "Who are you?"

msg = {
    "model": model,
    "prompt": inp,
    "stream": False,
}

url = f"{base}/api/generate"
res = requests.post(url, json=msg).json()
print(res["response"])
```

This is the basic Ollama API flow:

1. Choose a model.
2. Build a JSON request.
3. POST it to `/api/generate`.
4. Read the `response` field.

There are Python libraries for Ollama, but using the HTTP API directly is useful because it shows exactly what the service expects.

---

## Creating an LLM Action

The same logic can be placed inside an Open Serverless action.

A typical action:

```python
import os
import requests

def main(args):
    inp = args.get("input", "")
    if inp == "":
        return {"body": {"output": "Please provide an input"}}

    host = args.get("OLLAMA_HOST", os.getenv("OLLAMA_HOST"))
    auth = args.get("AUTH", os.getenv("AUTH"))
    base = f"https://{auth}@{host}"

    msg = {
        "model": "llama3.1:8b",
        "prompt": inp,
        "stream": False,
    }

    res = requests.post(f"{base}/api/generate", json=msg).json()
    return {"body": {"output": res["response"]}}
```

You can create or update actions directly from the CLI, but for normal development use:

```bash
ops ide deploy
```

or deploy a single action:

```bash
ops ide deploy <action>
```

---

## How Secrets Are Propagated

Secrets can come from several places:

| Source          | Used for                                      |
|-----------------|-----------------------------------------------|
| Login config    | Values loaded when you log in                 |
| `.env`          | Shared project variables                      |
| `packages/.env` | Variables used for deployed packages/actions  |
| test env files  | Variables used while running tests            |

The shell does not necessarily see every secret. The `ops` CLI can read the Open Serverless configuration.

To inspect the loaded configuration:

```bash
ops config dump
```

To search for a specific value:

```bash
ops config dump | grep OLLAMA
```

Action annotations are used to pass configuration values during deployment. They are written as comments at the top of the action file.

Example:

```python
#--param OLLAMA_HOST $OLLAMA_HOST
#--param AUTH $AUTH
```

When you run:

```bash
ops ide deploy
```

the deploy command reads these annotations and passes the values to the action.

### What `ops ide deploy` Does

`ops ide deploy` builds on top of lower-level Open Serverless action and package commands.

It can:

- Create packages and actions
- Zip multi-file actions
- Resolve dependencies from files such as `requirements.txt`, `package.json`, or `composer.json`
- Extract annotations from action files
- Propagate secrets into deployed actions
- Work with development mode for incremental deploys

For normal development, prefer `ops ide deploy` over manually creating actions.

---

## Streaming From Ollama

Streaming lets the user see the response while the model is still generating it.

To request streaming from Ollama, set `stream` to `True`:

```python
import requests

msg = {
    "model": "llama3.1:8b",
    "prompt": "Who are you?",
    "stream": True,
}

res = requests.post(f"{base}/api/generate", json=msg, stream=True)
```

In Python, the response stream is an iterator:

```python
for item in res.iter_lines():
    print(item)
```

Ollama returns a sequence of JSON objects. Each object contains fields such as:

| Field      | Meaning                              |
|------------|--------------------------------------|
| `model`    | Model that generated the response    |
| `response` | Current generated text fragment      |
| `done`     | Whether generation has finished      |

Only the `response` field is normally sent to the user interface.

---

## Streaming in Open Serverless

Open Serverless actions are asynchronous, so they do not keep a normal direct connection to the browser.

For streaming, Open Serverless uses a **streamer** component:

1. The UI asks for a streamed response.
2. The streamer invokes the action.
3. The action receives `stream_host` and `stream_port`.
4. The action opens a socket to that host and port.
5. The action sends partial output to the socket as it is produced.

The action should also return:

```python
{"streaming": True}
```

This tells Pinocchio to call the streamed endpoint instead of waiting for a single final response.

---

## Countdown Streaming Example

Before streaming an LLM, the lesson uses a simple countdown iterator.

```python
import time

def count_to_zero(n):
    for i in range(n - 1, -1, -1):
        time.sleep(1)
        yield str(i)
```

This is useful because it behaves like a stream without requiring an LLM.

A streaming helper receives an iterator and sends each item to the stream socket. It also collects the final result so the action can return the full output at the end.

The same helper can be tested locally with a stream mock.

---

## Testing Streaming With a Mock

Streaming is hard to test directly because it depends on a socket opened by the runtime.

The lesson provides a **stream mock** that simulates the streamer locally.

The test flow is:

1. Create mock stream arguments.
2. Start the stream mock.
3. Run the streaming function with those arguments.
4. Stop the mock.
5. Assert that the expected streamed output was received.

The mock waits only a few seconds before timing out, so start the function immediately after starting the mock.

This lets you test streamed code before deploying it.

---

## Exercise 1: Add LLM Secrets

Find:

```text
TODO E2.1
```

Complete the action so it receives the Ollama values.

Add the parameters:

```python
#--param OLLAMA_HOST $OLLAMA_HOST
#--param AUTH $AUTH
```

Then read them in the code:

```python
host = args.get("OLLAMA_HOST", os.getenv("OLLAMA_HOST"))
auth = args.get("AUTH", os.getenv("AUTH"))
base = f"https://{auth}@{host}"
```

After this exercise, the URL test should pass. The streaming test will still fail until Exercise 2 is completed.

---

## Exercise 2: Decode Ollama Streaming Output

Find:

```text
TODO E2.2
```

The existing streaming function is written for the countdown example. Ollama returns JSON objects instead of plain text, so each streamed item must be decoded.

Use `json.loads` to parse each item:

```python
import json

dec = json.loads(item.decode("utf-8"))
out = dec.get("response", "")
```

Then send only `out` to the stream and append it to the final result.

After this change, the streaming test should pass.

---

## Exercise 3: Add a Model Switch

Find:

```text
TODO E2.3
```

Add a simple command that lets the user switch models from the chat input.

Example behavior:

| Input      | Model selected | Prompt sent to the model |
|------------|----------------|--------------------------|
| `llama`    | `llama3.1:8b`   | `Who are you?`           |
| `deepseek` | DeepSeek model  | `Who are you?`           |

For example:

```python
if inp == "llama":
    model = "llama3.1:8b"
    inp = "Who are you?"
elif inp == "deepseek":
    model = "deepseek-r1:7b"
    inp = "Who are you?"
```

DeepSeek may emit hidden thinking sections. If they appear as unreadable tags, convert them to a readable Markdown form, for example by replacing angle brackets with square brackets.

---

## Deploy and Try the Chat

Deploy the lesson actions:

```bash
ops ide deploy
```

Open Pinocchio and select the streamed LLM chat.

Try prompts such as:

```text
Who are you?
```

```text
List the capitals of the United States
```

Then test the model switch:

```text
deepseek
```

```text
llama
```

The first answer from a newly selected model can take longer because the model may need to load.

---

## Summary

You now:

- Accessed Ollama from the CLI
- Built a non-streaming LLM request
- Learned where secrets come from and how actions receive them
- Used action annotations to propagate secret parameters
- Learned how Python iterators represent streams
- Tested streaming locally with a stream mock
- Completed a streamed LLM chat with model switching

---

## Up Next

Next lessons will build on this foundation by using LLMs in richer applications, including embeddings, vision models, and full-stack Open Serverless workflows.
