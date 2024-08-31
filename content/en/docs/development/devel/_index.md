---
title: Development
description: How to develop using a complete suite
weight: 20
draft: true
---
As mentioned in [Environment](#../environment/index.adoc), MastroGPT
offers a complete developer suite with functions and capabilities.

To start using it, simply click on `IDE` in your Admin environment at
<https://nuvolaris.dev> and choose a starter point to explore MastroGPT
architecture.

In this example, we’ll see as demo a simplified Open Serverless
environment from which you can develop both your backend functions and
frontend HTML/CSS/JS files.

# Choose Your Starter from IDE

<figure>
<img src="../images/IdeStarters.png" alt="IdeStarters" />
</figure>

When you click on one of these starters (which you can see as
ready-to-use templates), ops will redirect you to a web IDE with a
devcontainer inside, from which you can edit code and test it directly!

# OpenAI Integration

OpenAI is already integrated for every starter template. An API key is
available by default (with some limits) for each user.

When you need to use it, in your action file inside every package,
simply insert in the first lines `--param` as in this example:

    #--web true
    #--param OPENAI_API_KEY $OPENAI_API_KEY
    #--param OPENAI_API_HOST $OPENAI_API_HOST

    from  openai import AzureOpenAI

    def main(args):
       key = args["OPENAI_API_KEY"]
       host = args["OPENAI_API_HOST"]
       AI = AzureOpenAI(api_version="2023-05-15", api_key=key, azure_endpoint=host)


       data = AI.models.list().model_dump()
       models = [m['id'] for m in data['data']]
       return { "models": models }

## Development

<figure>
<img src="../images/WebIde1.png" alt="WebIde1" />
</figure>

Once inside the web IDE, you’ll be prompted to enter `Task devel` or
`Task deploy` via CLI. Task devel is a ops feature that will create
packages, actions, and web content (placed into the web folder) into
your Open Serverless environment.

So, if you enter `Task devel` or `devel`, a devcontainer will start and
you’ll see the output of this code immediately via the browser.

<figure>
<img src="../images/WebIde4.png" alt="WebIde4" />
</figure>

## Requirements

<figure>
<img src="../images/Requirements.png" alt="Requirements" />
</figure>

Inside the packages folder, you can place a file called
`requirements.txt` which will be used to install your needed libraries.
Here’s a simple example:

    farm-haystack
    requests

## Params

As packages need libraries, actions need parameters.

The naming convention to use a parameter is: \#--param {paramName}
{envParamName}

Some parameters are available by default inside ops .env file. To use
these parameters, remember to specify them inside every single action,
as shown here:

    #--web true
    #--param OPENAI_API_KEY $OPENAI_API_KEY
    #--param OPENAI_API_HOST $OPENAI_API_HOST

    from openai import AzureOpenAI
    import re

    MODEL = "gpt-35-turbo"
    AI = None

    def req(msg):
        return [{"role": "system", "content": ROLE},
                {"role": "user", "content": msg}]

    def ask(input):
        comp = AI.chat.completions.create(model=MODEL, messages=req(input))
        if len(comp.choices) > 0:
            content = comp.choices[0].message.content
            return content
        return "ERROR"


    """
    import re
    from pathlib import Path
    text = Path("util/test/chess.txt").read_text()
    text = Path("util/test/html.txt").read_text()
    text = Path("util/test/code.txt").read_text()
    import chess
    """
    def extract(text):
        res = {}

        # search for a chess position
        pattern = r'([rnbqkpRNBQKP1-8]{1,8}/){7}[rnbqkpRNBQKP1-8]{1,8}'
        m = re.findall(pattern, text, re.DOTALL | re.IGNORECASE)
        #print(m)
        if len(m) > 0:
            res['chess'] = m[0][0]
            return res

        # search for code
        pattern = r"```(\w+)\n(.*?)```"
        m = re.findall(pattern, text, re.DOTALL)
        if len(m) > 0:
            if m[0][0] == "html":
                html = m[0][1]
                # extract the body if any
                pattern = r"<body.*?>(.*?)</body>"
                m = re.findall(pattern, html, re.DOTALL)
                if m:
                    html = m[0]
                res['html'] = html
                return res
            res['language'] = m[0][0]
            res['code'] = m[0][1]
            return res
        return res

    def main(args):
        global AI
        (key, host) = (args["OPENAI_API_KEY"], args["OPENAI_API_HOST"])
        AI = AzureOpenAI(api_version="2023-12-01-preview", api_key=key, azure_endpoint=host)

        input = args.get("input", "")
        if input == "":
            res = {
                "output": "Welcome to the OpenAI-Google Calendar demo chat",
                "title": "OpenAI Calendar Chat",
                "message": "You can chat with OpenAI to ask your today google calendar events."
            }
        else:
            output = ask(input)
            res = extract(output)
            res['output'] = output

        return {"body": res }

If your action includes in the first line a `#--web true` parameter, the
action will be available online via HTTPS, both inside and outside Open
Serverless environment. In this way, you can deploy your site as needed.

## Utils

To improve user development, MastroGPT offers some util features. For
example, every time your source code changes, it will be immediately
available thanks to a scanner that observes your code and notifies
changes on your dev environment.

## Web and Packages Folders

<figure>
<img src="../images/webFolder.png" alt="webFolder" />
</figure>

<figure>
<img src="../images/packagesFolder.png" alt="packagesFolder" />
</figure>

The `packages` folder contains your server-side code. There, you can
deploy and publish your actions.

Inside the `web` folder, you can place every HTML/CSS/JS file that you
need to build your own site or web app. If you use some framework
single-page application, like Angular, React, Svelte, remember to copy
the content of the build folder (after `npm run build` or similar) into
the `web` folder.

So, if your index.html needs to call via index.js a backend action,
simply call the URL of your action here, and your platform will be
entirely available.

To make available on your Open Serverless env, see
[Deploy](#../deploy/index.adoc)
