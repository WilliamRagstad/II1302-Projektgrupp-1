# HTTP server in Deno using TypeScript
This project contains a HTTP server with a static response of "Hello World" written in TypeScript running on the latest version of Deno.
An important notice is that the standard library used by this server is of the (latest) version *0.91.0*. Some versions of Deno are not compatible with older versions of the standard library.

Inspired by https://dev.to/ms314006/deploy-your-deno-apps-to-heroku-375h

## Setup

To remove all "errors" you see in the code.
You must install the Deno extension for VSCode described in the Wiki documentation.
Then second of all, inside VSCode press `CTRL` + `SHIFT` + `P`, this will bring up the command palette.
Type `deno`, and you will see `Deno: Initialize Workspace Configuration`. Press this and then Yes on every prompt.
