# Setup

Do this once on your Mac. Claude does almost all of it for you.

## The short version

1. Put the project folder somewhere you will keep it (Claude will suggest `Sites/the-shoe-museum` in your home folder).
2. Open the Claude desktop app, go to the Code tab and choose the `the-shoe-museum` folder.
3. Type: **configure this project for me**

Claude checks your Mac, installs what is missing, and asks before each step. It takes about 15 minutes. A few times it will ask you to click something in your browser or in a macOS window. It never needs your Mac password, and you never paste passwords into the chat.

You can run it again any time by saying **check my setup**. Steps that are already done are skipped.

## What Claude sets up

| Step | What it is | Who does it |
|---|---|---|
| Git | Saves the history of every change | Claude. If macOS asks to install "developer tools", you click Install. |
| Node | Runs the project's tools | Claude |
| Shopify CLI | Talks to your store | Claude |
| GitHub | Keeps the project safe online and shared with Flávio | Claude installs and creates the repository. You create an account (if you have none) and approve the sign-in in your browser. |
| Theme Access token | Lets this Mac update your store | You install the free Theme Access app and create a password. Claude opens a file where you paste it. |
| First run | Starts the preview of your site | Claude |

The full runbook Claude follows is in `.claude/skills/setup/SKILL.md`.

## About the `.env` file

The Theme Access token lives in a file called `.env` in the project folder. It is never uploaded to GitHub or to Shopify, and Claude never shows it. If you ever need a new token, create one in the Theme Access app and ask Claude to update `.env`.

`SHOPIFY_STOREFRONT_PASSWORD` stays empty: your store is public (Online Store > Preferences > Store access > Private mode is off).

## If you prefer to do it by hand

The steps Claude runs, in order: install git (`xcode-select --install`), install Node 22 with nvm, `npm install -g @shopify/cli@latest`, install the GitHub CLI and run `gh auth login`, create a private repository and push, add `flaviort` as a collaborator, create a Theme Access password and put it in `.env` as `SHOPIFY_CLI_THEME_TOKEN=shptka_...`, then `npm install` and `npm run dev`. The exact commands are in the runbook above.

## For Flávio: sending the project

1. Zip the project folder including its hidden `.git` folder (it keeps the history and the `live` branch). Leave out `.env`, `node_modules/`, `.shopify/` and your personal `.claude/settings.local.json`:
   ```bash
   cd ..
   zip -r the-shoe-museum.zip the-shoe-museum -x 'the-shoe-museum/.env' 'the-shoe-museum/node_modules/*' 'the-shoe-museum/.shopify/*' 'the-shoe-museum/.claude/settings.local.json' '*.DS_Store'
   ```
2. Send the zip. He unzips it and follows "The short version" above.
3. When he gives you access, accept the GitHub invitation, then point your copy at his repository:
   ```bash
   git remote set-url origin https://github.com/<his username>/the-shoe-museum.git
   git fetch origin
   ```
4. Your own `.env` keeps your token. His Mac gets its own.
