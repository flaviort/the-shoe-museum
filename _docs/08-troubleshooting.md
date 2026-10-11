# Troubleshooting

Each entry says what you see, why it happens, and what to do. When something fails, you can always paste the message to Claude and say "fix this".

## Shopify asks me to log in, or says "unauthorized"

Why: your Shopify login expired, or you never logged in on this Mac.
What to do: in Terminal, in the project folder, run `npm run dev` and log in to the browser window that opens (store owner account). Then ask Claude to try again.
Claude should: tell you to log in, because it cannot do it for you. If a Theme Access token is set in `.env`, it may have been deleted in Shopify (Apps > Theme Access); a new one is needed.

## `npm run dev` says "Could not get the latest code from GitHub"

Why: no internet, or you and Flávio both saved changes at the same time, so the two versions do not line up.
What to do: check your internet. If it still shows after that, tell Claude.
Claude should: run `git status` and `git log --oneline -5`, explain what differs, and fix it with a normal merge (never a force push). The preview still works in the meantime.

## `npm run dev` says "Could not read the live theme"

Why: most often a login problem (see above). The preview then may show old customizer content.
What to do: log in again, restart the preview.

## Publishing stops: "There are uncommitted changes"

Why: some edits are not saved in git yet, and publishing only sends saved work.
What to do: say "commit my changes".
Claude should: look at `git status`, commit with a plain message, and run the check again.

## Publishing stops: "GitHub has N newer commit(s)"

Why: Flávio (or the preview itself) saved something to GitHub that is not on your Mac yet.
What to do: say "start the preview", then "publish" again. The preview fetches the new work first.

## Publishing stops: "These were changed in the Shopify customizer"

Why: someone changed the site in the Shopify customizer after the last sync. Publishing now would erase that.
What to do: tell Claude. It reads what changed, keeps both your edit and the customizer edit, commits, and tries again.
Claude should: run `git diff`, explain it in plain words, never discard the live content.

## The preview link does not load

Why: the preview is not running, or another one is.
What to do: say "start the preview" and use the link it prints (usually `http://127.0.0.1:9292`).
Claude should: read the output of `npm run dev`, and stop any stale preview before starting a new one.

## My change does not show on the live site

Why: the push did not finish, or your browser is showing an older copy.
What to do: refresh with Cmd+Shift+R. If it is still old, ask Claude "did the publish finish?". A finished publish ends with `Done. Live at https://theshoemuseum.com`. If it stopped with an `[ERROR]`, see above.
If you changed content in Shopify admin (a product, an exhibit), that is not part of publishing and is live right away.

## The build failed

Why: a mistake in the styles or script.
What to do: tell Claude. The messages above the `[ERROR]` line say which file.

## Something broke on the live site, undo it

What to do: tell Claude "undo the last change and publish".
Claude should: find the bad commit with `git log --oneline`, run `git revert <commit>`, then `npm run push -- --dry-run` and, after the owner says yes, `npm run push`.
Emergency, if you cannot wait: in Shopify admin go to Online Store > Themes and publish an earlier copy of the theme if you have one. Then tell Claude, so the code matches.
