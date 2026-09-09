---
title: Lesson 5
weight: 60
---

> _Lesson 4_ introduced stateful assistants with Redis. _Lesson 5_ adds computer vision and object storage.

# Lesson 5 - Vision Models & S3 Storage

In this lesson you will analyze images with an open source vision model and store uploaded files in S3-compatible object storage.

You will learn:

- How to send images to an Ollama vision model
- How to upload images with Pinocchio forms
- How to display base64 images in HTML
- How S3-compatible storage works in Open Serverless
- How to read, write, list, delete, and display stored objects
- How to generate signed URLs for temporary public access

---

## Preparing the Environment

Start from your starter Codespace as usual.

1. Open your fork of the starter repository.
2. Sync the fork if updates are available.
3. Start the Codespace.
4. Log in from the Open Serverless extension.
5. Select **Lesson 5** from the lessons panel.

Lesson 5 is independent from the previous lessons.

---

## Vision With Ollama

To analyze an image, use a model that supports vision, such as the Llama vision model used in this lesson.

The image must be sent as base64 text because the request body is JSON.

The basic flow is:

1. Read the image file.
2. Encode it as base64.
3. Build a chat message with a prompt and an `images` field.
4. Send the request to Ollama.
5. Collect the streamed response.

Example:

```python
import base64
import os
import requests

host = os.getenv("OLLAMA_HOST")
auth = os.getenv("AUTH")
url = f"https://{auth}@{host}/api/chat"

with open("cat.jpg", "rb") as f:
    image = base64.b64encode(f.read()).decode("utf-8")

msg = {
    "model": "llama3.2-vision",
    "messages": [
        {
            "role": "user",
            "content": "What is in this image?",
            "images": [image],
        }
    ],
}

res = requests.post(url, json=msg, stream=True)
```

The result is streamed. You need to iterate over the response and collect the pieces.

---

## Vision Action

The lesson wraps the vision call in a class.

The class responsibilities are:

- Read Ollama access values from `args` or environment variables
- Build the vision request
- Send the image to the model
- Collect the streamed response
- Return the final description

Conceptually:

```python
class Vision:
    def __init__(self, args):
        self.host = args.get("OLLAMA_HOST", os.getenv("OLLAMA_HOST"))
        self.auth = args.get("AUTH", os.getenv("AUTH"))
        self.url = f"https://{self.auth}@{self.host}/api/chat"

    def decode(self, image):
        msg = {
            "model": "llama3.2-vision",
            "messages": [
                {
                    "role": "user",
                    "content": "What is in this image?",
                    "images": [image],
                }
            ],
        }
        res = requests.post(self.url, json=msg, stream=True)
        return collect(res)
```

For simplicity, this lesson collects the streamed vision result before returning it.

---

## Uploading Images With a Form

Pinocchio forms can include file fields.

Example form field:

```python
form = [
    {
        "name": "pic",
        "description": "Choose an image",
        "type": "file",
        "required": True,
    }
]
```

Return the form when there is no submitted data:

```python
return {
    "body": {
        "output": "Upload an image to analyze.",
        "form": form,
    }
}
```

When the form is submitted, the uploaded file is available as base64 data.

Example:

```python
values = args.get("form", {})
image = values.get("pic", "")
```

Pass that base64 image to the vision class.

---

## Displaying the Uploaded Image

Pinocchio can display HTML returned by an action.

To display a base64 image, create an HTML image tag:

```python
html = f'<img src="data:image/png;base64,{image}" />'
```

Return the description and the HTML display data:

```python
return {
    "body": {
        "output": description,
        "html": html,
    }
}
```

The `html` key is forwarded to the display system, so the user can see both the uploaded image and the LLM analysis.

---

## S3-Compatible Storage

Open Serverless provides object storage through an S3-compatible API.

S3 stores files as objects inside buckets.

Important concepts:

| Concept  | Meaning                                  |
|----------|------------------------------------------|
| Endpoint | URL used to access S3                    |
| Bucket   | Storage area for objects                 |
| Key      | Object name or path inside the bucket    |
| Object   | Stored file content                      |

This lesson uses S3 to save uploaded images and analyze them later.

---

## Three S3 Endpoints

There are three S3 access contexts to keep separate:

| Endpoint type | Used for                                      |
|---------------|-----------------------------------------------|
| Internal      | Deployed actions in production                |
| Test          | Local tests inside the course environment     |
| External      | Public display URLs for browser access        |

The internal endpoint is used by deployed actions and is configured with variables such as:

- `S3_HOST`
- `S3_PORT`
- `S3_BUCKET`
- `S3_ACCESS_KEY`
- `S3_SECRET_KEY`

Tests use values from the test environment.

When an image must be displayed in the browser, use the external URL.

---

## Creating an S3 Client

Use the S3 endpoint, key, secret, bucket, and region to create a client.

The Open Serverless S3 service is compatible with the AWS S3 API, so the default region can be `us-east-1`.

Example:

```python
import boto3
import os

endpoint = f"http://{os.getenv('S3_HOST')}:{os.getenv('S3_PORT')}"
bucket = os.getenv("S3_BUCKET")

s3 = boto3.client(
    "s3",
    endpoint_url=endpoint,
    aws_access_key_id=os.getenv("S3_ACCESS_KEY"),
    aws_secret_access_key=os.getenv("S3_SECRET_KEY"),
    region_name="us-east-1",
)
```

---

## Reading and Writing Objects

Write an object:

```python
s3.put_object(
    Bucket=bucket,
    Key="cat.jpg",
    Body=data,
)
```

Read it back:

```python
res = s3.get_object(Bucket=bucket, Key="cat.jpg")
data = res["Body"].read()
```

List objects:

```python
res = s3.list_objects_v2(Bucket=bucket)
contents = res.get("Contents", [])
```

Delete an object:

```python
s3.delete_object(Bucket=bucket, Key="cat.jpg")
```

These are the core operations used by the lesson storage action.

---

## Signed URLs

Stored objects are private by default.

To show an image in the browser, generate a signed URL. A signed URL grants temporary public access to a single object.

Example:

```python
url = s3.generate_presigned_url(
    "get_object",
    Params={
        "Bucket": bucket,
        "Key": key,
    },
    ExpiresIn=3600,
)
```

The URL is valid for one hour.

Because signed URLs may be generated with the internal S3 endpoint, the lesson rewrites them to use the external S3 URL before returning them to the browser.

---

## Bucket Helper Class

The lesson wraps S3 access in a bucket class.

The class provides methods to:

- Write an object
- Read an object
- Remove objects by prefix
- Search objects by prefix or substring
- Get object size
- Generate an external signed URL

This keeps action code small and reusable.

---

## Storage Action

The storage action lets you manage uploaded images from Pinocchio.

The input commands are:

| Input prefix | Behavior                         |
|--------------|----------------------------------|
| `*`          | Search/list stored objects       |
| `!`          | Remove objects by prefix         |
| `@`          | Analyze an existing stored image |

Example:

```text
*
```

lists stored files.

Example:

```text
@cat
```

finds a matching image, reads it from S3, sends it to the vision model, and returns both the analysis and an image display.

Example:

```text
!cat
```

removes matching objects with that prefix.

---

## Exercise: Save Form Uploads to S3

Combine the two examples from the lesson.

Modify the form-based image analyzer so that it:

1. Shows a file upload form.
2. Receives the uploaded image.
3. Saves the image to S3.
4. Reads or uses the saved image.
5. Sends the image to the vision model.
6. Generates an external signed URL.
7. Displays the image using the external URL.
8. Returns the LLM description.

This gives you a complete upload, store, analyze, and display workflow.

---

## Deploy and Try It

Deploy the lesson actions:

```bash
ops ide deploy
```

Open Pinocchio and try the vision form.

Then try the storage action:

```text
*
```

```text
@cat
```

```text
!cat
```

Verify that images can be uploaded, listed, analyzed, displayed, and removed.

---

## Summary

You now:

- Sent base64 images to a vision model
- Built a file upload form
- Displayed uploaded images with HTML
- Used S3-compatible storage from Open Serverless
- Read, wrote, listed, and deleted objects
- Generated signed URLs for temporary public access
- Combined vision and storage into an image workflow

---

## Up Next

Next lesson introduces vector databases and embeddings, which are the foundation for retrieval augmented generation.
