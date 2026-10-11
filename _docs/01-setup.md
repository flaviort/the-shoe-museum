# Setup

Do this once on your Mac. It takes about 15 minutes. You do not need to understand any of it. If a step fails, copy the message and paste it to Claude.

## What you need

- A Mac.
- The Claude desktop app.
- A GitHub account.
- The login for the Shopify store (the owner account for `the-shoe-museum.myshopify.com`).

## 1. Install the tools

Open the Terminal app (press Cmd+Space, type "Terminal", press Enter). Run each block below, one at a time.

Homebrew is a tool that installs other tools. Check whether you have it:

```bash
brew --version
```

If you see "command not found", install it from https://brew.sh (copy the one command shown on that page into Terminal). Then:

```bash
brew install node git
```

```bash
npm install -g @shopify/cli@latest
```

Check that it worked:

```bash
node -v
shopify version
```

`node -v` must show 22 or higher (for example `v22.11.0`). `shopify version` shows a number like `3.80.0`.

## 2. Get the code

Use the address of the repo on your GitHub account. Right now it is `https://github.com/flaviort/the-shoe-museum`. After Flávio transfers it to you, replace `flaviort` with your GitHub username.

```bash
git clone https://github.com/flaviort/the-shoe-museum.git
cd the-shoe-museum
npm install
```

## 3. Log in to Shopify once

Still in Terminal, inside the `the-shoe-museum` folder:

```bash
npm run dev
```

Your browser opens and asks you to log in to Shopify. Use the store owner account. After you log in, go back to Terminal. It prints a checklist and then a preview link (usually `http://127.0.0.1:9292`). Press Ctrl+C to stop it.

You only do this once. From now on Claude can start the preview for you.

## 4. Open the folder in Claude

In the Claude desktop app, open the Code tab and choose the `the-shoe-museum` folder. Claude reads the file `CLAUDE.md` by itself, so there is nothing to explain first. Try saying: "Start the preview."

## 5. Optional: the `.env` file

You can skip this. The file `.env.example` lists two optional secrets. To use them, copy it to a file named `.env` and fill in only what you need.

- `SHOPIFY_CLI_THEME_TOKEN`: a Theme Access password, for people who work on several stores and do not want the browser login. Create it in Shopify admin under Apps > Theme Access > Create password. The token arrives by email, starts with `shptka_`, and is shown only once.
- `SHOPIFY_STOREFRONT_PASSWORD`: only for stores with a storefront password. Yours has none (Online Store > Preferences > Private mode is off), so leave it empty.

The `.env` file is never uploaded to GitHub. Do not paste its contents into chat.

## Handoff checklist

- [ ] Flávio transfers the GitHub repo to the owner's account (repo Settings > Transfer ownership).
- [ ] The owner accepts the transfer and adds Flávio as a collaborator (Settings > Collaborators).
- [ ] Both update their copy if the address changed: `git remote set-url origin <new address>`.
- [ ] The owner installs the tools and logs in (steps 1 to 3 above).
- [ ] The owner runs `npm run dev` and sees the preview.
- [ ] Flávio shuts down the Vercel project for the old PHP site, if it is still running.
