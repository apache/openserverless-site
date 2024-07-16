---
title: Project
description: How to deal with OpenServerless projects
---
## A OpenServerless Project

This document is still 🚧 **work in progress** 🚧

A project represents a logical unit of functionality whose boundaries
are up to you. Your app can contain one or more projects. The folder
structure of a project determines how the deployer finds and labels
packages and actions, how it deploys static web content, and what it
ignores.

You can detect and load entire projects into OpenServerless with a
single command using the `ops` CLI tool.

## Project Detection

When deploying a project, `ops` checks in the given path for 2 special
folders:

- The `packages` folder: contains sub-folders that are treated as
    OpenServerless packages and are assumed to contain actions in the
    form of either files or folders, which we refer to as Single File
    Actions (SFA) and Multi File Actions (MFA).

- The `web` folder: contains static web content.

Anything else is ignored. This lets you store things in the root folder
that are not meant to be deployed on OpenServerless (such as build
folders and project documentation).

### Single File Actions

A single file action is simply a file with specific extension (the
supported ones: `.js` `.py` `.php` `.go` `.java`), whici is directly deployed
as an action.

### Multi File Actions

A multi-file action is a folder containing a `main` file and
dependencies. The folder is bundled into a zip file and deployed as an
action.
