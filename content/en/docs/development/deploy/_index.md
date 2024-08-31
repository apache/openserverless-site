---
title: Deploy
description: How to make application available on Apache OpenServerless
weight: 30
draft: true
---
## Deploy

To make your application available on your OpenServerless environment, you can run this command in the CLI from your web IDE. All actions, packages, and files in the web folder will be immediately accessible.

    deploy

## Instant deployment

So, if you attempt to edit an action or file, whether from the Admin
environment or the IDE, and then deploy it, the code will immediately become
available in your namespace environment.

When using the IDE, everything will be accessible locally (on your development
container). After editing an action or HTML files, simply type `devel` in the
CLI.

Here's a simple example created in Svelte. Using `npm run build` directly on
a namespace environment, we are going to change the primary color of our
waitlist site.

[![Wait List]](https://mastrogpt.s3.eu-west-1.amazonaws.com/deployNuvWaitlist.mp4)

## Conclusion

By following this process, your app becomes immediately available, ready for
use and distribution
