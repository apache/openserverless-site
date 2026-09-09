---
title: Lesson 4
weight: 50
---

> _Lesson 3_ introduced authentication, forms, and custom displays. _Lesson 4_ builds a stateful assistant that remembers the conversation.

# Lesson 4 – Stateful Assistants with Redis

In this lesson you will turn a stateless chat into an assistant.

An assistant is a chat that remembers what happened earlier in the conversation. To do that, it must store conversation history somewhere and reload it on the next request.

You will learn:

- How the OpenAI-compatible chat API works
- How message history is represented
- How to stream responses with the OpenAI API
- How to wrap LLM calls in a Python class
- How Redis stores temporary conversation history
- How to return state to Pinocchio
- How to build a stateful assistant

---

## Preparing the Environment

Start from your fork of the starter repository.

1. Open your fork on GitHub.
2. If GitHub shows that your fork is behind, click **Sync fork**.
3. Start a Codespace from the updated fork.
4. Log in from the Open Serverless extension.
5. Select **Lesson 4** from the lessons panel.

Lesson 4 is independent from the previous lessons. You can run it even if your workspace does not contain the code from Lessons 1, 2, or 3.

---

## Stateless Chats vs Assistants

The chats from the previous lessons are stateless.

That means each request is handled alone:

1. The user sends one input.
2. The action sends that input to the LLM.
3. The action returns the answer.
4. The next request starts again from zero.

An assistant is stateful.

It keeps the previous messages and sends the full conversation history to the LLM every time. This lets the LLM answer consistently because it can see what was already said.

---

## OpenAI-Compatible APIs

The OpenAI chat API has become a common interface for LLM applications.

Many providers implement an API that is fully or partly compatible with it, including Ollama. This means that an application written with the OpenAI client can often switch providers by changing:

- The base URL
- The API key
- The model name

For this course, the OpenAI client is used to call the Ollama-compatible endpoint.

---

## Creating an OpenAI Client

Open the interactive CLI:

```bash
ops ai cli
```

Create a client:

```python
import os
from openai import OpenAI

host = os.getenv("OLLAMA_HOST")
auth = os.getenv("AUTH")

base_url = f"https://{auth}@{host}/v1"
api_key = "unused"

client = OpenAI(
    base_url=base_url,
    api_key=api_key,
)
```

With Ollama in this environment, authentication is carried by the URL. The `api_key` value is still required by the OpenAI client, but it is not the value used for authentication here.

With other providers, both `base_url` and `api_key` are usually meaningful.

---

## Chat Messages

OpenAI-compatible chat requests use a list of messages.

Each message has:

| Field     | Purpose                         |
|-----------|---------------------------------|
| `role`    | Who wrote the message           |
| `content` | Text content of the message     |

Important roles are:

| Role        | Meaning                                      |
|-------------|----------------------------------------------|
| `system`    | Instructions that configure the assistant    |
| `user`      | User input                                   |
| `assistant` | Previous LLM answers                         |

The LLM receives the full list and produces the next assistant message.

Example:

```python
messages = [
    {
        "role": "user",
        "content": "What is the capital of Italy?",
    }
]
```

---

## Calling the Chat API

Send the message list to the model:

```python
res = client.chat.completions.create(
    model="llama3.1:8b",
    messages=messages,
)

answer = res.choices[0].message.content
print(answer)
```

The response is structured. It can contain multiple choices, but most applications use the first one:

```python
res.choices[0].message.content
```

This is the basic pattern for calling the OpenAI-compatible chat API.

---

## Streaming With the Chat API

To stream the answer, add `stream=True`:

```python
stream = client.chat.completions.create(
    model="llama3.1:8b",
    messages=messages,
    stream=True,
)
```

The result is a Python iterator.

Each item contains a small piece of the answer, called a delta:

```python
for chunk in stream:
    delta = chunk.choices[0].delta.content
    if delta:
        print(delta, end="")
```

This is the OpenAI-compatible version of the streaming behavior introduced in Lesson 2.

---

## Python Classes: Quick Reminder

Lesson 4 uses Python classes to wrap the chat logic.

A class defines an object with data and methods.

Example:

```python
class Counter:
    def __init__(self, start=0):
        self.value = start

    def count(self):
        current = self.value
        self.value += 1
        return current
```

Use it like this:

```python
c = Counter()
print(c.count())
print(c.count())
```

Important Python class rules:

- `__init__` is the constructor.
- Each method receives `self` as its first argument.
- Object fields are usually created with `self.name = value`.
- Object fields are read with `self.name`.

The rest of the lesson assumes you already know the basic idea of object-oriented programming.

---

## Chat Wrapper Class

The lesson introduces a class that wraps the OpenAI client and keeps a local message list.

The class responsibilities are:

1. Create the OpenAI client.
2. Store the message history.
3. Add new messages.
4. Send the history to the LLM.
5. Add the assistant response back to the history.

Conceptually:

```python
class Chat:
    def __init__(self):
        self.client = OpenAI(...)
        self.messages = []

    def add(self, text):
        role, content = text.split(":", 1)
        self.messages.append({
            "role": role.strip(),
            "content": content.strip(),
        })

    def complete(self):
        res = self.client.chat.completions.create(
            model="llama3.1:8b",
            messages=self.messages,
        )
        answer = res.choices[0].message.content
        self.messages.append({
            "role": "assistant",
            "content": answer,
        })
        return answer
```

The class lets you write a sequence like:

```python
chat = Chat()
chat.add("system: When I give you a country, answer with its capital.")
chat.complete()

chat.add("user: Italy")
print(chat.complete())

chat.add("user: France")
print(chat.complete())
```

Because the class keeps the message history, the model remembers the system instruction.

---

## Exercise 1: Add Streaming to the Chat Class

Find:

```text
TODO E4.1
```

The first exercise is to make the chat class stream its answers.

You need to:

1. Add a streaming function.
2. Save the action arguments when the class is initialized.
3. Request `stream=True` when calling the chat API.
4. Read each streamed delta from the OpenAI response.
5. Send each delta to the Open Serverless stream socket.
6. Collect the complete answer.
7. Save the assistant answer in the message history.
8. Return `streaming: True` from the action response.

The important OpenAI streaming extraction is:

```python
for chunk in stream:
    delta = chunk.choices[0].delta.content
    if delta:
        # send delta to the stream
        # append delta to the final result
```

After this exercise, the chat should answer progressively instead of waiting for the whole response before displaying anything.

To download the solution, use the course command shown in the lesson:

```bash
ops ai lesson 4 assistant --solution
```

---

## Why We Still Need State

The chat class keeps history only while the current action invocation is running.

After the action finishes, that memory disappears.

To build a real assistant, you need to store the history somewhere outside the action invocation. Lesson 4 uses Redis for that.

---

## Redis Overview

Redis means Remote Dictionary Server.

It is a fast data store used by server applications to keep shared state.

Redis can store several data types:

| Type        | Use case                                  |
|-------------|-------------------------------------------|
| String      | Single value                              |
| List        | Ordered sequence of values                |
| Hash        | Field/value table                         |
| Set         | Unordered unique values                   |
| Sorted set  | Ordered unique values with scores         |
| Stream      | Event-like append-only data               |

For this lesson, you will use Redis lists to store chat messages.

---

## Redis Prefixes

In this course environment, Redis is shared.

Users cannot read each other's values, but keys may be visible. For that reason, each user must use the assigned key prefix.

The Redis connection values are available in the environment.

Example:

```python
import os
import redis

prefix = os.getenv("REDIS_PREFIX")
url = os.getenv("REDIS_URL")

rd = redis.from_url(url)
```

Always include the prefix when creating keys.

---

## Redis Strings and Lists

Store and read a single value:

```python
rd.set(f"{prefix}:example", "hello")
value = rd.get(f"{prefix}:example")
print(value.decode("utf-8"))
```

Redis values are bytes, so decode them when you need strings.

Store values in a list:

```python
key = f"{prefix}:messages"

rd.rpush(key, "first")
rd.rpush(key, "second")

items = rd.lrange(key, 0, -1)
for item in items:
    print(item.decode("utf-8"))
```

Lists are a good fit for conversation history because messages have a natural order.

---

## History Class

The lesson introduces a `History` class that stores message history in Redis.

The class does three important things:

1. Creates a unique conversation ID when a new chat starts.
2. Saves messages under a Redis key based on that ID.
3. Reloads messages when the conversation continues.

A unique ID can be created with Python's `uuid` library:

```python
import uuid

conversation_id = str(uuid.uuid4())
```

Redis keys are set to expire after one day so old conversations are cleaned automatically.

Conceptually:

```python
class History:
    def __init__(self, conversation_id=None):
        self.conversation_id = conversation_id or str(uuid.uuid4())
        self.key = f"{prefix}:history:{self.conversation_id}"

    def id(self):
        return self.conversation_id

    def save(self, message):
        rd.rpush(self.key, json.dumps(message))
        rd.expire(self.key, 60 * 60 * 24)

    def load(self):
        items = rd.lrange(self.key, 0, -1)
        return [json.loads(item.decode("utf-8")) for item in items]
```

This creates temporary state: the assistant remembers the conversation for a day, then Redis deletes it.

---

## Loading History Into a Chat

The `History` class and the `Chat` class work together.

Example flow:

```python
history = History()

history.save({
    "role": "system",
    "content": "When I give you a country, answer with its capital.",
})

conversation_id = history.id()
```

Later, reload the same history:

```python
history = History(conversation_id)
messages = history.load()

chat = Chat()
chat.messages = messages
```

Now the chat can continue from the previous conversation.

---

## Building the Stateful Assistant

The assistant action should:

1. Read the current `state` from `args`.
2. Create a `History` object using that state.
3. Create a `Chat`.
4. Load the history into the chat.
5. Add the new user input.
6. Save the user input to Redis.
7. Complete the chat.
8. Save the assistant response to Redis.
9. Return the conversation ID as `state`.

Conceptually:

```python
def main(args):
    inp = args.get("input", "")
    state = args.get("state")

    history = History(state)
    chat = Chat(args)
    chat.messages = history.load()

    user_message = {
        "role": "user",
        "content": inp,
    }

    chat.messages.append(user_message)
    history.save(user_message)

    answer = chat.complete()

    history.save({
        "role": "assistant",
        "content": answer,
    })

    return {
        "body": {
            "output": answer,
            "state": history.id(),
        }
    }
```

The key part is returning `state`. Pinocchio sends that state back on the next request, so the action can reload the same Redis history.

---

## Exercise 2: Turn the Chat Into an Assistant

Find:

```text
TODO E4.2
```

Transform the stateless chat into a stateful assistant.

You need to:

1. Read the previous conversation ID from `state`.
2. Load the history from Redis.
3. Initialize the chat with the loaded messages.
4. Save the user's new message.
5. Complete the chat.
6. Save the assistant response.
7. Return the conversation ID as `state`.

When this works, the assistant should remember instructions from earlier messages.

For example:

```text
When I give you a country, answer with its capital.
```

Then:

```text
Italy
```

The assistant should answer:

```text
Rome
```

Then:

```text
France
```

The assistant should remember the instruction and answer:

```text
Paris
```

---

## Deploy and Try It

Deploy the updated lesson actions:

```bash
ops ide deploy
```

Open Pinocchio and select the stateful assistant.

Test the assistant with a sequence:

```text
When I give you a country, answer with its capital.
```

```text
Italy
```

```text
France
```

```text
United States
```

If the assistant remembers the instruction, the Redis-backed state is working.

---

## Summary

You now:

- Used the OpenAI-compatible API with Ollama
- Built chat requests from role-based message lists
- Streamed responses from the OpenAI client
- Wrapped chat behavior in a Python class
- Used Redis strings and lists
- Stored conversation history with a unique ID
- Returned `state` so Pinocchio can continue a conversation
- Built a stateful assistant that remembers previous messages

---

## Up Next

Next lessons will build on stateful assistants to create richer AI applications that combine memory, tools, and structured workflows.
