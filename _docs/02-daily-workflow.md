# Daily workflow

You work by talking to Claude. Claude edits the files, runs the commands and tells you what to look at.

## The loop

1. Open the project in Claude and say: "Start the preview." Claude runs `npm run dev` and reports anything odd.
2. Ask for a change in plain words.
3. Claude tells you which page to check. Open `http://127.0.0.1:9292` plus the path it gives you.
4. Happy with it? Say: "Publish this to the live site." Claude checks everything first, then asks you to confirm. Publishing changes the real site at once.

## What `npm run dev` prints

Each line starts with a tag. `[ok]` means fine. `[..]` is a progress note. `[warn]` means something to know about, but the preview still starts. `[ERROR]` means it stopped.

Normal lines: `Shopify CLI found`, `Dependencies installed`, `No uncommitted changes`, `Up to date with GitHub`, `Customizer content is up to date`. It also says whether it uses a token from `.env` or your Shopify login. Until the first publish with the current scripts you also see `Change tracking for customizer files starts with the first publish`; that is expected.

The `[warn]` lines, and what to do:

| What you see | What it means | What to do |
|---|---|---|
| `N uncommitted change(s). Starting anyway; commit them when you are done.` | There are edits that are not saved in git yet. | Nothing now. Ask Claude to commit them before publishing. |
| `Could not get the latest code from GitHub (offline, or you both committed at once). ...` | Your copy could not catch up with GitHub. | Check your internet. If it is fine, tell Claude. Do not publish until it is sorted. |
| `Could not read the live theme, so the preview may show old customizer content: ...` | It could not fetch what you changed in the Shopify customizer. | Usually a login problem. See [troubleshooting](08-troubleshooting.md). |
| `Skipped <file>: it changed in the customizer, but it also has uncommitted edits here. ...` | Someone changed that file in the customizer while you have unsaved edits to the same file. | Ask Claude to commit your edits and merge the two versions. |
| `<file> changed both here and in the customizer. Claude needs to merge before publishing ...` | The same page was changed in the code and in the customizer since the last publish. Neither version was touched. | Nothing now. Before publishing, Claude merges the two (see below). |
| `<file> was deleted in the customizer but is still here. ...` or `<file> was deleted here but changed in the customizer. ...` | One side removed a template, the other kept or changed it. | Before publishing, Claude asks you which one you want. |
| `Copied N customizer file(s) from live but could not commit them: ...` | The customizer changes were copied but not saved in git. | Tell Claude. |
| `Saved N customizer change(s) from live, but could not send them to GitHub` | Saved here, not yet on GitHub. | Tell Claude. The next publish will send them. |
| `Saved N customizer change(s) from live here. Other commits here are not published yet, so they all go to GitHub with the next publish.` | Normal when there is unpublished work. The preview only sends its own commit to GitHub when nothing else is waiting. | Nothing. |

Two other lines you may see: `<file> still exists on live but was deleted here; the next push removes it` (informational), and `Saved N customizer change(s) from live and sent them to GitHub` (good: it picked up your customizer edits).

The two `[ERROR]` lines are `Shopify CLI not found` (run the install step in [setup](01-setup.md)) and `npm install failed`.

## What `npm run push` does

Claude runs `npm run push -- --dry-run` first. That does every check and the build, but publishes nothing. Then, after you say yes, it runs the real thing:

1. Checks the tools are installed.
2. Checks nothing is unsaved, and that GitHub has nothing newer.
3. Builds the styles and scripts.
4. Checks the customizer was not changed on the live site since the last sync.
5. Sends the code to GitHub.
6. Uploads the theme to the live store.
7. Saves Shopify's reformatted copy of the customizer files.
8. Moves the `live` branch on GitHub to what it just published. The next sync compares against it, which is how it tells a code edit from a customizer edit.

It ends with `Done. Live at https://theshoemuseum.com`.

If a check fails it prints an `[ERROR]` line and `Nothing was pushed.` The live site is untouched. The errors:

| What you see | What to do |
|---|---|
| `Shopify CLI not found.` | Install it (see [setup](01-setup.md)). |
| `Dependencies are missing. Run npm run dev once ...` | Ask Claude to start the preview once, then publish again. |
| `There are uncommitted changes. Commit or discard them first:` | Ask Claude to commit them. |
| `Could not reach GitHub to check for newer changes.` | Check your internet and try again. |
| `This branch is not linked to GitHub. Ask for help before pushing.` | Ask Flávio. |
| `GitHub has N newer commit(s) that are not here yet. ...` | Ask Claude to start the preview (it fetches them), then publish again. |
| `Could not read the live theme: ...` | Usually a login problem. See [troubleshooting](08-troubleshooting.md). |
| `The live theme has customizer changes that are not in git yet.` | Someone edited in the customizer. Files "changed only in the customizer" are copied in for review. Files "changed both here and in the customizer" are left alone and Claude merges them by hand, keeping both. Then it commits and publishes again. See [troubleshooting](08-troubleshooting.md). |
| `The build failed. See the errors above.` | Tell Claude. It will fix the styles or script. |
| `GitHub rejected the push (someone pushed a moment ago). ...` | Ask Claude to start the preview, then publish again. |

One error comes after the code is already on GitHub: `The theme upload failed. ... the live site may be partly updated. Run npm run push again.` Just ask Claude to publish again. Three `[warn]` lines can follow a finished upload, and none of them undo the publish: `Could not re-read the live theme...` (harmless), `Saved Shopify formatting locally but could not send it to GitHub...` (the next preview start sends it), and `Could not move the live branch on GitHub...` (the next publish may report conflicts that are not real; Claude handles them).

A dry run that passes ends with `Dry run: every check passed. Nothing was pushed.` A real publish prints `Marked this version as published (the live branch on GitHub)` just before `Done.`

## Things to say to Claude

- "Start the preview."
- "Change the home banner title to ..."
- "Make the footer links smaller."
- "Add a new section to the About page with ..."
- "What changed since last week?"
- "Is this ready to publish?" (Claude does a dry run.)
- "Publish this to the live site."
- "Undo the last change."
- "I edited the home page in Shopify. Did you pick that up?"
- "Stop the preview."

## Change it in Shopify admin instead

Content lives in Shopify admin, not in the code:

- Products, prices, product details and photos: Products.
- Exhibits (blog posts): Content > Blog posts, blog "Exhibits".
- Designers, sponsors and other entries: Content > Metaobjects.
- Pages such as About and Contact, and uploaded files: Content > Pages and Content > Files.
- Menu links: Online Store > Navigation.
- Text, images and order of sections on a page: the theme customizer (Online Store > Themes > Customize).

Use the customizer whenever you like, with one exception: not while a publish is running. A publish uploads the files it checked a moment earlier, so an edit saved during those few minutes can be replaced. Otherwise both commands check the customizer first. Edits made only there are copied into the code. If the same page was also changed in the code, they stop and Claude merges the two by hand instead of picking one.
