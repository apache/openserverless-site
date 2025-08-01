---
title: Lesson 0
weight: 10
draft: true
---

# TO BE REVIEWED!

# 👋 Welcome to the Course: Application Development with LLM Open and Apache Open Serverless

A mileage title worthy of Wertmüller — but for friends, it's simply the **Mastro GPT Course**.

---

## 🚀 Step 1: Start the Environment

To start working, launch the development environment.

### 🟢 Recommended: GitHub Codespace
1. Go to **GitHub → Mastro GPT**: https://github.com/mastrogpt
2. Click the **"Code"** button.
3. Select **"Create codespace on main"**.
4. Wait for it to start (takes some time the first time).

> This is the environment used for the course. It's convenient and preconfigured for both training and development.

---

## ⚙️ Step 2: Explore the Interface Icons

Once your Codespace is running, take note of these key icons in the sidebar:

- ☁️ **Cloud icon**: Opens the Open Serverless extension.
- 🧪 **Test tube icon**: Opens the list of tests.
- 📄 **Docs icon**: Opens course documents and slides.
- 🔍 **Search icon**: Lets you search in your code and documents.

---

## 🔐 Step 3: Login to Open Serverless

1. Click the **Cloud icon**.
2. Press the **Login** button.
3. Enter your **username and password**.
4. You should see the message:

You have successfully logged in. You can now use Open Serverless.

yaml
Copy
Edit

This concludes the initial setup. This is **Lesson Zero**, a pre-lesson to verify that everything works.

---

## 🧪 Step 4: Deploy and Run Tests

To ensure your setup is working:

1. Click the **Deploy icon** inside the extension.
2. This will install the starter project.
3. Once deployed, go to the **Test Tube icon**.
4. Run the tests. If the test passes, your environment is working correctly.

---

## 🧰 Step 5: Use Development Mode

Switch to development mode to run the web interface:

1. Click **Dev Mode** in the Open Serverless extension.
2. This starts a local web server.

If you don’t see the **Open in browser** button:

- Look for the 📡 **Antenna icon** at the bottom bar.
- Click the 🌐 **Globe icon** to open the UI in a browser.

---

## 🤖 Step 6: Meet "Pinocchio" — The User Interface

The web frontend is named **Pinocchio**, a reference to Mastro Geppetto.

### Default login credentials:
- **Username**: Pinocchio
- **Password**: Geppetto (or vice versa)

> You’ll be prompted to change it. Here’s how.

---

## 🔁 Step 7: Change the Password (via Terminal)

1. Open the terminal:  
Terminal → New Terminal

2. Run the following command:

bash
obs ai user update Pinocchio
Enter your new password.

Redeploy the login service:

bash
Copy
Edit
obs deploy mastrogpt-login
This shows how command-line tools can be used instead of the GUI for advanced operations.

🧑‍💻 Step 8: Tour the Interface Features
Pinocchio is a multi-chat UI developed in Python. You won't need to change the UI — you'll build backend logic for chat apps.

Available chats:
hello: Responds with a greeting.

demo: Demonstrates Pinocchio’s interface features:

Code rendering

HTML view

Chessboard display

Forms and form submissions

Document uploads

Custom side views

Everything is extendable and customizable.

🧪 Step 9: View the Slides
To view this lesson's materials:

Click the 📄 Docs icon.

Navigate to the lessons/ folder.

Open the lesson markdown file.

Use the Preview tab to view the slide.

Use Source to copy exercises or commands.

💡 Step 10: Tips for Codespaces
To avoid wasting free hours:

Go to GitHub → Settings → Codespaces.

Set Auto-off timeout to 5–10 minutes.

Optionally switch from VS Code web to VS Code desktop.

Alternatively, install and run everything locally using Docker.

We can organize a dedicated lesson on local installation if needed.

☁️ Step 11: Open Serverless Services
Your environment includes:

Redis

MinIO

PostgreSQL (not required for this course)

You can deploy apps on:

AWS

Google Cloud

Azure

Akamai

Hetzner

Ubuntu

OpenShift

🆘 Step 12: Get Support
You can request your free account or support via:

🌐 Website: https://mastrogpt.com

💬 Chatbot on the website

💼 LinkedIn: Send us a message

💻 Discord: Primary support (use the Italian channel if preferred)

🗣️ Reddit: Ask questions and join the discussion

▶️ Step 13: Start Lesson 1
Now that everything is set up:

Go back to the Cloud icon.

Click Lessons.

Select Lesson 1.

All lesson files will be downloaded automatically.

You're now ready to start building!