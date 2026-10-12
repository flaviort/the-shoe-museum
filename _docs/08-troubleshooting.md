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

## Publishing stops: "The live theme has customizer changes that are not in git yet"

Why: someone changed the site in the Shopify customizer after the last sync. Publishing now would erase that.
What to do: tell Claude. It reads what changed, keeps both your edit and the customizer edit, commits, and tries again.
Claude should: for files listed as "changed only in the customizer", run `git diff` and explain it in plain words; the live version is already in the working copy. For files "changed both here and in the customizer", see the next entry. Then run the `git add -A` and `git commit` lines the message prints, unchanged, and push again. Never discard the live content.

## "Changed both here and in the customizer"

Why: since the last publish, the same file was edited in the code and in the customizer. The scripts compare three versions: the local file, the live file, and the last version both shared (the base, normally `git show origin/live:<path>`). When both moved away from the base, neither can be picked automatically. `npm run dev` only warns; `npm run push` stops.
What to do: nothing yourself. Ask Claude to merge and publish.
Claude should:
1. Run `npm run push -- --dry-run`. It leaves these files alone (only files changed on the customizer side alone are copied in) and prints a temp folder with `live/<path>` (the live copy) and `base/<path>` (the shared base, when known).
2. For each file, run the printed `git merge-file <path> <base copy> <live copy>`. It merges into the local file and marks overlapping edits with `<<<<<<<`, `=======` and `>>>>>>>`. Resolve those by hand so both edits survive, and check the JSON is still valid. When there is no base copy, merge the live copy in by reading both.
3. For a template deleted on one side: ask the owner whether to keep it. To delete it, `git rm <path>`; to restore it, copy the live copy back.
4. Run the printed `git add -A` and `git commit ... -m "Live-Merged: <path> <code>"` lines exactly. Each `Live-Merged` line records which live version is merged in. Without it the next push stops on the same file again. If the customizer changes the file again before the publish, the code no longer matches and it stops again, which is correct.
5. Dry run again, then ask the owner before the real `npm run push`.

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
Claude should: find the bad commit with `git log --oneline`, run `git revert <commit>`, then `npm run push -- --dry-run` and, after the owner says yes, `npm run push`. This also works for customizer files: the revert counts as a code edit, so the push publishes it instead of taking the live version back. If the customizer changed the same file since the last publish, it is reported as a conflict to merge.
Emergency, if you cannot wait: in Shopify admin go to Online Store > Themes and publish an earlier copy of the theme if you have one. Then tell Claude, so the code matches.
