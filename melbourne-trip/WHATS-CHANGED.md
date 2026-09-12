# What changed in this update

**Only `index.html` changed.** Everything else in the repo stays exactly as it is —
don't re-upload the icons, `manifest.json`, `sw.js`, `netlify.toml` or the function.

## How to apply it

1. GitHub → `melbourne-trip/index.html` → pencil icon to edit.
2. Click in the editor, `Ctrl+A` to select all, paste the new file over the top.
3. Commit. Netlify redeploys on its own.

No environment variables changed, so no manual redeploy is needed.

## What's new

- **Flights are locked in** as a fixed panel at the top, and repeated as locked
  items in Tuesday's and Saturday's timelines. The editable flight fields are gone.
- **Every day is now a timeline.** Time down the left, a bar across with the short
  version, tap to expand the full detail, booking notes and an editable time.
- **Minus button** on any bar moves it to that day's options list at the bottom.
  **Plus button** in the options list puts it back at its suggested time.
- **Add anything at any time** — pick from the options list with a time, or type
  your own. Your own items behave exactly like the built-in ones and can be
  deleted permanently with the ✕ in the options list.
- **Wednesday** is now the op shop run southeast to Tbilisi in Bentleigh East:
  Chapel St → Elsternwick → Carnegie → Bentleigh → Savers Heatherton → dinner.
- **Thursday** is Reverb plus galleries, ordered around Reverb's 5pm Thursday close.
- **Friday** is a Yarra Valley day trip with four operator options.
- **Saturday** is a full day now that the flights are in the evening, including the
  couples massage that was previously on Friday.

## Storage note

The storage key moved from `mel2026:v1` to `mel2026:v2` because the data shape
changed. Anything typed into the old version won't carry across — nothing was lost
that you can't retype in a minute.
