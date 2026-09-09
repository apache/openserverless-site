---
title: Lesson 2
weight: 10
draft: true
---

# TO BE REVIEWED!

# 📘 Lesson 2 – LLM Access & Streaming Implementation

Welcome to the second lesson of the OpenLLM course with Apache Open Serverless! In this lesson, we'll learn how to actually communicate with Large Language Models by creating an LLM chat with streaming capabilities.

---

## 🚀 Step 1: Environment Setup

### Fork the Repository
1. Go to **GitHub → Mastro GPT**: https://github.com/mastrogpt
2. **Fork** the repository to your account (create a copy)
3. Launch the **Code Space** from your forked repository

> **Why fork?** This gives you write permissions to save changes using Git version control without depending on the original repository.

### Download Lesson Files
1. Select **Lesson 2** from the lessons menu
2. This downloads all lesson files (both markdown and PDF formats)
3. Each lesson is independent - you don't need previous lesson files

---

## 🔧 Pro Tips

### Setting Up the Terminal Shortcut
Before starting the exercises, configure a keyboard shortcut to copy text from the editor directly to the terminal. This is extremely useful for this course:

1. **Open Settings**: Click the gear icon (⚙️) in the bottom left corner
2. **Select Keyboard Shortcuts**: Choose "Keyboard Shortcuts" from the menu
3. **Search for the Command**: Type "run selected text in active terminal"
4. **Set Your Shortcut**: Click on the command and set your preferred key combination
   - **Recommended**: `Ctrl+Enter` (as used in the course)
   - This allows you to copy text from files directly to the terminal

> **Why this shortcut?** It's extremely comfortable and saves time when you need to run commands from the lesson files. This feature is only available in VS Code and is not enabled by default.

## 🔐 Step 2: Accessing LLMs & Managing Secrets

### Understanding Credentials
LLMs are protected with the same credentials as Open Serverless:
- **`olima_host`**: The URL to access the LLM service
- **`AUTH`**: Authentication credentials from your Open Serverless login

### Secret Management Strategy
Always use this pattern in your code:
```python
def get_secret(args, env_var_name):
    return args.get(env_var_name) or os.environ.get(env_var_name)
```

This allows your code to work in both test and production environments.

### Testing LLM Access
1. Open terminal and run: `obs ai cli`
2. Import required modules and set credentials:
```python
import os
olima_host = args.get('olima_host')
auth = args.get('auth')
base_url = f"https://{auth}@{olima_host}"
```

3. Test the connection:
```bash
curl "$base_url"
# Should return: "olima is running"
```

---

## 💬 Step 3: Basic LLM Communication

### Simple API Call
Create a message with this structure:
```python
message = {
    "model": "llama-3.1-8b",  # Meta's 3.1B parameter model
    "prompt": "Who are you?",
    "stream": False,  # Start without streaming
    "input": "Who are you?"
}
```

### Making the Request
```python
import requests
url = f"{base_url}/api/generate"
response = requests.post(url, json=message)
result = response.json()
print(result['response'])
```

---

## 🌊 Step 4: Implementing Streaming

### What is Streaming?
Streaming allows you to see LLM responses in real-time instead of waiting for complete generation. This makes interactions much more immediate.

### Streaming from Command Line
```python
message["stream"] = True  # Enable streaming
response = requests.post(url, json=message, stream=True)

# Response is now an iterator
for chunk in response.iter_lines():
    if chunk:
        data = json.loads(chunk.decode('utf-8'))
        print(data['response'], end='', flush=True)
```

### Stream Format
Each streaming response contains:
- `model`: Model name
- `response`: Text chunk
- `done`: Boolean flag (true when complete)
- Additional metadata (context, duration, etc.)

---

## 🔌 Step 5: Serverless Streaming Implementation

### The Challenge
Actions in serverless environments are asynchronous and lose contact with the web server, making streaming complex.

### Solution: The Streamer Component
The `streamer` component provides:
- `stream_host`: Host for streaming connection
- `stream_port`: Port for streaming connection
- A socket to receive intermediate results

### Implementation Pattern
```python
def stream_to_socket(iterator, args):
    stream_host = args.get('stream_host')
    stream_port = args.get('stream_port')
    
    # Connect to socket
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.connect((stream_host, int(stream_port)))
    
    # Stream results
    for item in iterator:
        sock.send(f"{item}\n".encode())
    
    sock.close()
    return "Streaming completed"
```

### Testing with Stream Mock
Use `stream_mock` for local testing:
```python
from test.stream_mock import StreamMock

args = {}
mock = StreamMock()
mock.start(args)

# Your streaming function here
result = stream_to_socket(countdown(10), args)

mock.stop()
print(result)
```

---

## 🎯 Step 6: Practical Exercises

### Exercise 1: Add Authentication Parameters
**Location**: Look for `TODO E2.1`
**Task**: Add the required parameters to access and authorize Ollama
- Add `@perm olima_host`
- Add `@perm auth`
- Use `args.get('olima_host')` and `args.get('auth')`

### Exercise 2: Fix Streaming Implementation
**Location**: Look for `TODO E2.2`
**Task**: Fix the streaming to handle Ollama's response format
```python
# Decode the JSON response
data = json.loads(chunk.decode('utf-8'))
# Extract only the response part
response_text = data.get('response', 'error')
```

### Exercise 3: Model Switcher
**Location**: Look for `TODO E2.3`
**Task**: Add model switching functionality
```python
if input_text == "llama":
    model = "llama-3.1-8b"
elif input_text == "deepseek":
    model = "deepseek-coder:6.7b"
```

---

## 🚀 Step 7: Deployment

### Deploy Commands
```bash
# Deploy all functions
obs deploy

# Deploy specific function
obs ide deploy function-name

# Incremental deployment (recommended)
obs ide dev
```

### Important Notes
- Always return `streaming: true` for streaming functions
- Use `@perm` annotations to pass secrets
- The CLI sees test environment variables
- Production uses configuration + packages environment

---

## 🎉 What You've Learned

1. **LLM Access**: How to connect to and communicate with Large Language Models
2. **Secret Management**: Proper handling of credentials in both test and production
3. **Streaming Implementation**: Real-time response streaming for better user experience
4. **Model Switching**: Dynamic model selection in your applications
5. **Testing**: Using mocks to test streaming functionality locally

### Next Steps
- Practice with the exercises
- Experiment with different models
- Build upon this foundation for more complex LLM applications

---

## 🔧 Tips

- **Environment Variables**: Use `obs config dump` to see all available configuration
- **Incremental Deploy**: Use `obs ide dev` for automatic deployment on save
- **Timeout Handling**: Be aware of execution time limits (default: 3 minutes)

> **Remember**: Always test your streaming functions with the mock before deploying to production!

