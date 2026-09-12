# Update — reordering, time controls, Hobart

**Only `index.html` changed.** Leave everything else in the repo alone.

## How to apply

1. GitHub → `melbourne-trip/index.html` → pencil icon.
2. Click in the editor, `Ctrl+A`, paste the new file over the top.
3. Commit. Netlify redeploys itself. No env var changes, so no manual redeploy.

## What's new

**Kathy flies to Hobart.** Updated in the flights panel and in Saturday's timeline.
Westy is Virgin to Brisbane out of Terminal 3 at 8:40pm; Kathy is Jetstar to Hobart
out of Terminal 4 at 9:10pm. One trip to the airport still covers both — you split
at the terminal doors.

**Move items up and down.** Every bar now has ▲ and ▼ on the right.

- Different times: the two items swap times, so the timeline stays honest.
- Same time: they just swap position in the list.
- The arrows grey out at the top and bottom of the day.

**Better time editing.** Open any bar and you get the time picker plus
−30 / −15 / +15 / +30 minute buttons. Handy for shuffling a whole afternoon along
when something runs over.

**Flights can't be moved.** The arrows are disabled on flight items, and on the
item directly next to one, so a reorder can never accidentally change a departure
time. Trying it says "Flight times are fixed".

**Rename your own items.** Anything you typed in yourself now has an editable
title field when you open it, so you can fix a typo without deleting and re-adding.

## Storage note

The key moved from `mel2026:v2` to `mel2026:v3` to make room for the sort order.
It reads your old v2 data on first load, so anything you'd already typed carries
across and gets sort positions filled in automatically.
