# Melbourne — Westy & Mrs West, 22–26 September 2026

A single-page itinerary app. Vanilla HTML/CSS/JS, one file, no build step, no dependencies.
Everything you type saves to the device. Airtable sync is optional and off until you configure it.

---

## Files

```
melbourne-trip/
├── index.html                    ← the whole app (content, styles, logic)
├── manifest.json                 ← PWA manifest, "Add to Home Screen"
├── sw.js                         ← offline cache, so it opens without signal
├── netlify.toml                  ← publish dir + functions dir + no-cache headers
├── icons/
│   ├── icon-192.png
│   ├── icon-512.png
│   ├── icon-180.png              ← apple-touch-icon
│   └── icon-maskable-512.png
└── netlify/
    └── functions/
        └── trip.mjs              ← optional Airtable read/write (token stays server-side)
```

## Deploy (browser only, no terminal)

1. Create a new GitHub repo, e.g. `melbourne-trip`.
2. Drag the **contents** of this folder into the repo — keep `netlify/functions/trip.mjs`
   and `icons/` in their subfolders. For binary files (the PNGs), drag-and-drop works fine.
3. In Netlify: **Add new site → Import an existing project → GitHub**, pick the repo.
4. Build command: leave empty. Publish directory: `.` (netlify.toml already sets this).
5. Deploy. Open the site on your phone and use **Share → Add to Home Screen**.

Continuous deployment is now live — every commit redeploys.

## Where to change things

| What | Where in `index.html` |
|---|---|
| Days, times, descriptions | the `SEED.days` array |
| The three options under any slot | that slot's `opts` array |
| "Also on while you're here" cards | the `SEED.also` array |
| Pre-trip checklist | the `SEED.check` array |
| Fields in "Your details" | the `SEED.essentials` object |
| Departure date used by the countdown | `SEED.meta.departISO` |
| Colours | the `:root` block at the top of `<style>` |

Everything is in one place near the top of the `<script>` block. You don't need to touch
the render code to change content.

## Optional: Airtable sync

Without this, the app is device-local and the **Sync** button stays hidden. Turn it on when
you want the same itinerary on both phones.

**1. Airtable base**

Create a table called `Trip` with exactly two fields:

| Field | Type |
|---|---|
| `Key` | Single line text |
| `Data` | Long text |

One row per trip. The app uses the key `westy`. The function creates the row on first save.

**2. Netlify environment variables**

Site configuration → Environment variables:

| Variable | Value |
|---|---|
| `AIRTABLE_TOKEN` | Personal access token with `data.records:read` and `data.records:write`, scoped to this base |
| `AIRTABLE_BASE_ID` | `appXXXXXXXXXXXXXX` from the base URL |
| `AIRTABLE_TABLE` | `Trip` (optional — this is the default) |

**Adding or changing environment variables does nothing until you redeploy.**
Trigger a redeploy from Deploys → Trigger deploy → Deploy site.

**3. How it behaves**

- The **Sync** button appears once the function responds.
- Tapping it pushes the current state to Airtable.
- A fresh device with no local data pulls from Airtable automatically on load.
- Sync failures never lose anything — the device copy is always the source of truth.

The function uses field names, not IDs, because it does not use `typecast`. If you ever add
`typecast: true`, switch to field IDs.

## Test checklist

- [ ] Day tabs switch and the active tab is highlighted
- [ ] Tapping a restaurant marks it "booked"; tapping again clears it
- [ ] Typing in a note field, reloading, and seeing the text still there
- [ ] Adding a custom item to a day, then deleting it
- [ ] Checklist ticks survive a reload
- [ ] **Backup** downloads a JSON file
- [ ] **Print** produces all five days on paper, not just the open one
- [ ] Add to Home Screen shows the record icon and opens full screen
- [ ] Aeroplane mode: the app still opens after one online visit
- [ ] With Airtable configured: Sync reports success and the row appears in the base

## Redeploy needed?

| Change | Redeploy |
|---|---|
| Editing `index.html` and committing | Automatic |
| Adding or changing Netlify environment variables | **Yes, manually** |
| Adding the Airtable function for the first time | Automatic on commit |

## Notes

- Opening hours, prices and gig listings were correct at build time. Reconfirm anything
  you're relying on, particularly public-holiday hours on Friday 25 September.
- Venue data is from Google Places. Exhibition dates are from ACMI and NGV.
- No API keys, tokens or secrets appear anywhere in the client-side code.
