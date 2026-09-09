---
title: Lesson 3
weight: 40
---

> _Lesson 2_ introduced LLM access, secrets, and streaming. _Lesson 3_ adds authenticated web actions, structured forms, and custom displays.

# Lesson 3 – Authentication, Forms & Displays

In this lesson you will improve the input and output of your AI applications.

You will learn:

- Why Pinocchio actions need an extra authentication check
- How Open Serverless action authentication works
- How to protect public web actions with the Pinocchio login token
- How to return forms from an action
- How to build prompts from form data
- How to return custom display data
- How to build a chess puzzle generator with structured input and visual output

---

## Preparing the Environment

Before starting Lesson 3, update your fork of the starter repository.

1. Open your fork on GitHub.
2. If GitHub shows that your fork is behind, click **Sync fork**.
3. Update your fork from the upstream starter.
4. Start a fresh Codespace from your fork.
5. Log in from the Open Serverless extension.
6. Select **Lesson 3** from the lessons panel.

Lesson 3 is independent from the previous lessons. You can run it even if you do not have the code from Lesson 1 or Lesson 2.

> If your Codespace contains uncommitted changes, save or commit them before deleting it.

---

## Why Authentication Matters

Pinocchio itself is protected by a login screen, but the actions invoked by Pinocchio are web actions.

Web actions must be public so that the browser interface can call them. This means that, by default, anyone with the URL can invoke them.

For AI applications this is risky because public actions may call LLMs, use user data, or access other services.

The solution used in this course is a custom authentication check based on the Pinocchio login token.

---

## Open Serverless Action Authentication

Normal Open Serverless actions are protected by default.

The CLI stores the authentication key in the local properties file. This key contains:

| Value     | Purpose                                  |
|-----------|------------------------------------------|
| `AUTH`    | User and secret used to invoke actions   |
| `APIHOST` | Open Serverless API endpoint             |

You can load these values into your shell:

```bash
source .wskprops
```

Protected actions cannot be called directly from a browser URL. They must be invoked with the authentication key and the correct Open Serverless API parameters.

For example, to get an action URL:

```bash
ops url mastrogpt/index
```

If the command prints an extra status line, you can keep only the URL:

```bash
ops url mastrogpt/index | tail -n +2
```

You can store it in a variable:

```bash
URL=$(ops url mastrogpt/index | tail -n +2)
```

Then invoke a protected action with authentication:

```bash
curl -u "$AUTH" -X POST "$URL?blocking=true&result=true"
```

This is how normal protected Open Serverless actions are invoked under the hood.

---

## Web Actions Are Public

Pinocchio actions are deployed as web actions, usually with `--web true`.

That makes them reachable from the browser, but it also means they are not protected by the normal Open Serverless action key.

For example:

```bash
ops ide deploy auth
URL=$(ops url mastrogpt/auth | tail -n +2)
curl "$URL"
```

Without an extra check, the action can be called directly.

The rest of this section shows how to connect these public actions to the Pinocchio login system.

---

## Pinocchio Login Tokens

When a user logs in to Pinocchio, Pinocchio creates a random token.

That token is:

- Stored in a browser cookie
- Sent with each request to the backend actions
- Stored server-side in Redis
- Associated with the logged-in user

The backend action can verify that the token sent by the browser matches the token stored in Redis.

If the token is valid, the request came from a logged-in Pinocchio session. If it is missing or invalid, the action should reject the request.

---

## Protecting a Web Action

Lesson 3 provides an authentication helper that checks whether the current request is authorized.

The action pattern is:

```python
def main(args):
    if unauthorized(args):
        return {"body": {"output": "You are not authenticated"}}

    return {"body": {"output": "You are authenticated"}}
```

The `unauthorized` helper reads the token from the request, compares it with Redis, and returns whether the user is logged in.

After this check:

- Calling the action from inside Pinocchio succeeds.
- Calling the action directly from its public URL fails.

Add this check to web actions that should only be used by authenticated Pinocchio users.

---

## Forms in Pinocchio

Forms let an action request structured input instead of asking the user to type everything in one message.

A form is a list of field definitions.

Each field can define:

| Property      | Purpose                                      |
|---------------|----------------------------------------------|
| `name`        | Key used when the form is submitted          |
| `description` | Text shown to the user                       |
| `type`        | Field type, such as text, textarea, radio    |
| `required`    | Whether the field must be completed          |
| `options`     | Choices for radio or checkbox fields         |

Common field types include:

- `text`
- `textarea`
- `checkbox`
- `radio`
- `file`

---

## Returning a Form

To show a form, return a response that includes a `form` key.

Example:

```python
form = [
    {
        "name": "job",
        "description": "Your role",
        "type": "text",
        "required": True,
    },
    {
        "name": "why",
        "description": "Why are you using Apache Open Serverless?",
        "type": "textarea",
        "required": True,
    },
    {
        "name": "tone",
        "description": "Tone of the post",
        "type": "radio",
        "options": ["formal", "informal"],
        "required": True,
    },
]

return {
    "body": {
        "output": "Fill the form to generate a post.",
        "form": form,
    }
}
```

Pinocchio renders the form automatically.

As in earlier lessons, an action should always return `output`. If the action streams, it should also return `streaming`.

---

## Processing Form Data

When the user submits a form, the action receives structured data in the input arguments.

The submitted values can be used to build a prompt.

Example:

```python
values = args.get("form", {})

job = values.get("job", "")
why = values.get("why", "")
tone = values.get("tone", "formal")

prompt = f"""
Generate a promotional post for Apache Open Serverless.

The reader is a {job}.
The reason for using it is: {why}.
The tone must be {tone}.
"""
```

This is the core idea of prompt engineering with forms:

1. Ask the user for structured information.
2. Convert the form values into a precise prompt.
3. Send that prompt to the LLM.
4. Return the generated answer.

The post generator in this lesson follows this pattern.

---

## Displays in Pinocchio

Forms improve input. Displays improve output.

Pinocchio can forward custom response keys to a display action. This lets you show visual content such as:

- Chessboards
- PDFs
- Diagrams
- Circuits
- Other domain-specific views

Pinocchio already knows how to handle some standard keys:

| Key      | Purpose                    |
|----------|----------------------------|
| `output` | Main chat response         |
| `state`  | Stored conversation state  |
| `form`   | Form definition            |

Unknown keys are forwarded to the display system.

For example:

```python
return {
    "body": {
        "output": "Here is the chess position.",
        "chess": "8/8/8/8/8/8/8/8 w - - 0 1",
    }
}
```

The `chess` key is not a standard chat key, so Pinocchio forwards it to the display action. The display action can then render a chessboard.

---

## Testing Display Output From the CLI

You can inspect display data from the command line.

Invoke a demo action that returns display data:

```bash
ops ai cli
```

Then call the demo with a chess request and save the result:

```bash
ops action invoke mastrogpt/demo -p input chess --result > chess.json
```

The result contains the normal output plus an extra display key such as `chess`.

That extra data is what Pinocchio forwards to the display action.

---

## Chess Puzzle Generator

The lesson combines forms, prompt engineering, LLM output parsing, and displays in a chess puzzle generator.

The flow is:

1. The user asks for a puzzle.
2. The action asks the LLM to generate a chess puzzle in FEN format.
3. The action extracts the FEN string from the LLM response.
4. The action returns the FEN string under the `chess` key.
5. Pinocchio forwards the `chess` value to the display.
6. The display renders the chessboard.

FEN is a standard chess notation used to describe a board position.

Example:

```text
8/8/8/8/8/8/8/8 w - - 0 1
```

The puzzle generator can extract the FEN string from the LLM output with a regular expression.

Example pattern:

```python
import re

match = re.search(r"([rnbqkpRNBQKP1-8/]+ [wb] [-KQkq]+ [-a-h1-8]+ \d+ \d+)", output)
fen = match.group(1) if match else ""
```

Regular expressions are useful for extracting structured fragments from LLM output. You do not need to write them all by hand; an LLM can often help generate or refine the pattern.

---

## Exercise: Add a Puzzle Form

Modify the puzzle generator so it asks the user what kind of puzzle to create.

Instead of generating a generic chess puzzle, return a form with piece options such as:

- Queen
- Rook
- Knight
- Bishop

The user should be able to select one or more pieces.

Then build a prompt from the selected values.

Example prompt:

```text
Generate a chess puzzle in FEN format.
The puzzle must include a queen and a knight.
Return the FEN string clearly.
```

The completed flow should be:

1. The user writes `puzzle`.
2. Pinocchio displays the piece-selection form.
3. The user selects pieces, for example queen and knight.
4. The action builds a prompt from those choices.
5. The LLM returns a puzzle in FEN format.
6. The action extracts the FEN string.
7. The action returns the `chess` key.
8. Pinocchio displays the board.

---

## Checking the Solution

Try the exercise before looking at the solution.

The lesson files include a hidden solution that can be extracted with the course command shown in the video.

After extracting it, compare your file with the solution using VS Code:

1. Open your puzzle generator file.
2. Open the solution file.
3. Use **Select for Compare**.
4. Use **Compare with Selected**.

The final result should display a form first, then generate and render a puzzle that matches the selected pieces.

---

## Deploy and Try It

Deploy the updated actions:

```bash
ops ide deploy
```

Open Pinocchio and try:

```text
puzzle
```

Select pieces in the form, submit it, and verify that a chessboard appears in the display.

Also test authentication:

1. Invoke the action from Pinocchio.
2. Invoke the same public URL directly with `curl`.
3. Confirm that direct access is rejected when the authentication check is enabled.

---

## Summary

You now:

- Updated your fork before starting a new lesson
- Learned the difference between protected actions and public web actions
- Protected Pinocchio web actions with a login token check
- Built forms for structured user input
- Converted form data into LLM prompts
- Returned custom display keys from actions
- Used FEN strings to render chess puzzle output
- Started combining authentication, forms, prompt engineering, and displays

---

## Up Next

Next lessons will continue expanding these application patterns with richer LLM workflows and more complete Open Serverless applications.
