---
name: setup
description: First-time setup of The Shoe Museum project on a new Mac. Use when the user asks to configure, set up, install or "get this project working", when they say they just downloaded or received the project, when `npm run dev` fails because Node, the Shopify CLI, git, GitHub or the Theme Access token is missing, or when they ask to check their setup. Walks a non-technical store owner through git, Node, the Shopify CLI, GitHub and the Theme Access token, doing everything Claude can do itself.
---

# Set up The Shoe Museum on this Mac

The person you are helping is most likely the store owner. He is not technical. He received this project folder from Flávio (the developer) and wants it working so he can ask you for changes to his site.

## How to run this

- **Do the work yourself.** Run every command you can. Only hand something to him when it truly needs him: a browser sign-in, a click in a macOS dialog, creating an account, copying a token.
- **Ask before acting.** Before each step, say in one or two plain sentences what you are about to do and why, then ask "OK to go ahead?" Wait for a yes. One approval covers one step.
- **Check first, every step.** Each step starts with a check. If it already passes, say so in one line and move on. That makes this safe to run again ("check my setup").
- **Plain language.** No jargon. When he must do something, give numbered clicks, one action per line, and tell him what he should see.
- **Never ask him to paste secrets into the chat.** The Theme Access token goes straight into the `.env` file (step 6).
- **Shell state:** each command runs in a fresh shell. After installing nvm or the GitHub CLI, start commands with the loader lines shown in that step until a new session picks them up.
- **Writing style for anything you write or say:** no em dashes, no emojis, short sentences.
- Keep a short checklist of the eight steps in your replies so he can see progress.

Start with: "I'll get this project working on your Mac. It takes about 15 minutes. I'll do most of it; a few times I'll need you to click something in your browser. Ready?"

---

## Step 1: Where the project lives

Check: `pwd`

- If the folder is inside `Downloads`, `Desktop` or a temporary place, suggest a permanent home: `~/Sites/the-shoe-museum`. Downloads gets cleaned up and is easy to delete by accident.
- If he agrees: `mkdir -p ~/Sites && mv "<current folder>" ~/Sites/the-shoe-museum`. Then tell him: "Done. Please open the folder `Sites/the-shoe-museum` (in your home folder) in Claude, start a new chat there, and say 'configure this project for me' again. I'll pick up where we left off." Stop here; the rest must run from the new location.
- If he prefers to keep it where it is, continue.

## Step 2: Git (saves the history of every change)

Check: `git --version`

- If it prints a version: OK.
- If macOS shows a dialog about "command line developer tools", or the command fails: run `xcode-select --install` and tell him: "A window just opened asking to install developer tools. Click **Install**, then **Agree**. It takes a few minutes. Tell me when it says the software was installed." Then check again.

Then the identity used to label his changes:

Check: `git config --global user.name` and `git config --global user.email`

- If either is empty, ask: "What name and email should your changes be saved under? Use the email of your GitHub account if you have one." Then:
  `git config --global user.name "<name>"` and `git config --global user.email "<email>"`

## Step 3: Node (runs the project's tools)

Check (Node 22 or newer is required):
```bash
export NVM_DIR="$HOME/.nvm"; [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"; node -v
```

- If it prints `v22` or higher: OK.
- Otherwise install it with nvm. This needs no Mac password:
  ```bash
  touch ~/.zshrc
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.8/install.sh | PROFILE="$HOME/.zshrc" bash
  export NVM_DIR="$HOME/.nvm"; . "$NVM_DIR/nvm.sh"
  nvm install 22 && nvm alias default 22
  node -v
  ```
- Verify: `node -v` prints `v22.x`.
- From now on, prefix Node commands in this session with: `export NVM_DIR="$HOME/.nvm"; . "$NVM_DIR/nvm.sh";`

## Step 4: Shopify CLI (talks to the store)

Check: `shopify version` (with the nvm prefix)

- If it prints a version (4.x or newer): OK.
- Otherwise: `npm install -g @shopify/cli@latest`, then check again.
- Do not run `shopify auth login`. The Theme Access token from step 6 replaces the browser login.

## Step 5: GitHub (keeps the project safe online and shared with Flávio)

### 5a. GitHub CLI

Check: `export PATH="$HOME/.local/bin:$PATH"; gh --version`

If missing, install it into his home folder (no Mac password needed):
```bash
mkdir -p ~/.local/bin
ARCH=$(uname -m); [ "$ARCH" = "x86_64" ] && ARCH=amd64
TAG=$(curl -s https://api.github.com/repos/cli/cli/releases/latest | grep -m1 '"tag_name"' | cut -d'"' -f4)
VER=${TAG#v}
TMP=$(mktemp -d)
curl -sL "https://github.com/cli/cli/releases/download/$TAG/gh_${VER}_macOS_${ARCH}.zip" -o "$TMP/gh.zip"
unzip -q "$TMP/gh.zip" -d "$TMP"
cp "$TMP/gh_${VER}_macOS_${ARCH}/bin/gh" ~/.local/bin/gh
rm -rf "$TMP"
grep -q '.local/bin' ~/.zshrc || echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
export PATH="$HOME/.local/bin:$PATH"; gh --version
```
From now on, prefix gh commands with `export PATH="$HOME/.local/bin:$PATH";`.

### 5b. GitHub account and sign-in

Check: `gh auth status`

If not signed in:
1. Ask: "Do you have a GitHub account?" If not: run `open https://github.com/signup` and walk him through it (email, password, username, the email code). Wait until he says it is done.
2. Start the sign-in in the background and capture its code:
   ```bash
   gh auth login --hostname github.com --git-protocol https --web < /dev/null > /tmp/tsm-gh-login.log 2>&1 &
   sleep 3; cat /tmp/tsm-gh-login.log
   ```
3. Read the one-time code (looks like `ABCD-1234`) from the log, run `open https://github.com/login/device`, and tell him: "A GitHub page just opened. Type this code: **ABCD-1234**, then click **Continue** and **Authorize**. Tell me when it says you're all set."
4. Verify with `gh auth status`. If the background login did not work, open the Terminal app for him with `open -a Terminal` and ask him to paste `~/.local/bin/gh auth login --web` and follow the same code steps.
5. Then: `gh auth setup-git` (lets git use this sign-in).

### 5c. Put the project in his GitHub account

Check: `git rev-parse --is-inside-work-tree` and `git remote -v`

- If `origin` already points to a repository under his GitHub username (`gh api user --jq .login`): OK, skip to 5d.
- **The folder has git history** (it has a `.git` folder, most likely pointing at Flávio's old repository):
  ```bash
  git show-ref --verify --quiet refs/remotes/origin/live && git branch -f live origin/live
  git remote remove origin
  ```
- **The folder has no git history** (a plain download):
  ```bash
  git init -b main
  git add -A
  git commit -m "Start of The Shoe Museum project"
  ```
  Before committing, run `git status --short` and make sure `.env` and `node_modules/` are not listed (the `.gitignore` excludes them).
- Ask: "I'll create a private repository called `the-shoe-museum` in your GitHub account and upload the project. OK?" Then:
  ```bash
  gh repo create the-shoe-museum --private --source=. --remote=origin --push
  git show-ref --verify --quiet refs/heads/live && git push -u origin live
  git branch -u origin/main main
  ```
- Verify: `git status -sb` shows `main...origin/main` with nothing ahead or behind.

### 5d. Give Flávio access

Ask: "Should I give Flávio, your developer, access to this repository so he can keep working on the site? His GitHub username is `flaviort`." If yes:
```bash
gh api -X PUT "repos/$(gh api user --jq .login)/the-shoe-museum/collaborators/flaviort" -f permission=push
```
Tell him Flávio will get an email invitation to accept. Mention that Flávio should be told the new repository address: `https://github.com/<his username>/the-shoe-museum`.

## Step 6: Theme Access token (lets this Mac update the store)

Check:
```bash
grep -q '^SHOPIFY_CLI_THEME_TOKEN=shptka_' .env 2>/dev/null && echo present || echo missing
```
Never print the value.

If missing:
1. Tell him: "Now I need a password that lets this project update your store. Shopify's free Theme Access app makes one." Run `open "https://apps.shopify.com/theme-access"`.
2. Guide him:
   1. Click **Install**, and choose The Shoe Museum store if asked. Approve the install.
   2. In the app, click **Create password**.
   3. Enter your name and your email address, then click **Create password**.
   4. Shopify emails you a link. Open that email and click the link.
   5. You'll see a password that starts with `shptka_`. It's shown only once, so keep that page open.
3. Create the file and open it for him:
   ```bash
   [ -f .env ] || cp .env.example .env
   open -e .env
   ```
   Tell him: "A text file just opened. On the line that starts with `SHOPIFY_CLI_THEME_TOKEN=`, click right after the `=` sign, paste the password, then press Cmd+S to save and close the window. Tell me when it's saved."
4. Verify without showing the token, with a read-only pull of the store's customizer files:
   ```bash
   export NVM_DIR="$HOME/.nvm"; . "$NVM_DIR/nvm.sh"
   [ -d node_modules ] || npm install
   node -e "import('./scripts/lib/env.mjs').then(async ({ loadEnv }) => { const { pullLiveJson } = await import('./scripts/lib/live.mjs'); const r = pullLiveJson(loadEnv('.')); console.log(r.ok ? 'token works: ' + r.files.size + ' files read' : 'failed: ' + r.error) })"
   ```
   If it fails: check there are no spaces around `=` and that the line starts with `SHOPIFY_CLI_THEME_TOKEN=shptka_`, with `grep -c '^SHOPIFY_CLI_THEME_TOKEN=shptka_' .env` (prints 1 when right). Never cat the file.

`SHOPIFY_STOREFRONT_PASSWORD` stays empty: the store is public (Private mode is off).

## Step 7: First run

```bash
export NVM_DIR="$HOME/.nvm"; . "$NVM_DIR/nvm.sh"
npm install
npm test
```
Then start `npm run dev` in the background (it keeps running). Read its checklist lines. Every `[ok]` is good; explain any `[warn]` in plain words and fix what you can. When it prints the local preview address, give it to him: http://127.0.0.1:9292

## Step 8: Done

Tell him, in a few lines:
- Everything is set up. The project is saved in his GitHub account and Flávio has access (if he said yes).
- To start working: open this folder in Claude and ask for what he wants, for example "Change the homepage banner title to ...", "Add a new exhibit section", "Show me what changed this week".
- Nothing goes to the live site until he says "publish". Claude asks first, every time.
- Content like products, exhibits and designers is still edited in Shopify admin as usual.

Then follow the normal session routine in `CLAUDE.md` from now on.

## If something goes wrong

- A download fails: check the internet connection and retry once. If it fails again, show him the error in plain words and stop.
- Anything asks for his Mac password: stop. Explain what it is for and let him decide. None of the steps above should need it.
- He gets lost in a browser step: ask him to describe or screenshot what he sees, then give the next single click.
- See `_docs/08-troubleshooting.md` for problems after setup.
