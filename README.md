# german-apps-legal

Privacy policies and Impressum for the German-learning apps, served by GitHub Pages at
`https://pratiyush.github.io/german-apps-legal/<slug>/privacy.html` and `/<slug>/impressum.html`,
with `index.html` listing the published apps. Slugs are stable: they go into store listings and the
AdMob consent (GDPR) messages.

| Slug | App | State |
|---|---|---|
| `lernle` | Lernle | ready to publish |
| `wortschatz` | Wortschatz (Tobo clone) | ready to publish |
| `wordbit` | `{{APP_NAME}}` (WordBit clone) | **DRAFT** – name not chosen ("WordBit" is another company's trademark) |
| `readle` | `{{APP_NAME}}` (Readle clone) | **DRAFT** – name not chosen ("Readle" is another company's trademark) |
| `telegram` | Daily German (Telegram bot) | **DRAFT** – bot still in test (@enigma_sandbox_bot, owner only); publish when it opens to real users |

Draft pages (`published: false`) carry a visible DRAFT banner and `noindex`, are not linked from
`index.html`, and their folders are git-ignored so they never reach the public repo. Unnamed drafts
keep the literal `{{APP_NAME}}` token. Do not hand a draft URL to a store, AdMob or users. To publish
a draft: set `published: true`, remove its folder from `.gitignore`, build, check, commit.

## Edit, build, check

- `apps.config.json` – the one place for app names, publish state, provider details and the date.
  Renaming an app is one edit: set `name`, set `published: true` when ready.
- `tools/apps.mjs` – per-app facts (local data, deletion path, permissions, ad formats, purchases),
  German and English, verified against each app's release config on 8 Nov 2026. A service that is not
  an ad-funded offline app (the Telegram bot) gives its own `sections`, `subject` and `appliesTo`;
  `telegram` was checked against `telegram-bot/src`, `public/app`, `wrangler.toml` and the migrations
  on 9 Nov 2026.
- `tools/build.mjs` – renders every page (single-file HTML, inline CSS, light/dark, no external
  resources). The generated HTML is committed; never hand-edit it.
- `tools/check.mjs` – fails on a missing page, any external resource, a broken internal link or
  fragment, or `{{APP_NAME}}` left in a published slug; lists `TODO(owner)` comments as warnings.

```sh
node tools/build.mjs && node tools/check.mjs
```

## Open TODO(owner) items

1. All privacy pages: describe any AdMob message besides the GDPR one (e.g. US state regulations),
   if one is configured in AdMob → Privacy & messaging.
2. All Impressum pages: add the USt-IdNr. / Wirtschafts-ID once one is issued (§ 5 Abs. 1 Nr. 6 DDG).
3. `wordbit`: keep the "Remove ads" section only if the release enables `PRO_ENABLED` /
   `WB_PRO_ENABLED` (both off by default); price is not stated on purpose.
4. `wordbit`: if `LOCK_SCREEN_ADS` is enabled, say that the lock-screen card shows a banner.
5. `readle`: the pages cover Android and iOS only; the web/PWA build needs its own section or policy
   if it is published.
6. `telegram` – where `telegram-bot/docs/privacy-notice.md` (and the in-bot `/privacy` text) does not
   match the bot's code. The page follows the code; fix the bot's notice (or the code) to match:
   - **Not listed in the notice:** the explanation language (`subscribers.lang`), the `/word` position
     (`word_cursor`), first-use and last-change timestamps, delivery status/attempts, quiz answer times.
   - **`/delete` is not "everything":** `deleteUser` clears `subscribers`, `deliveries`, `progress`,
     `quiz`, but not `failures` rows whose `ref` is `<user id>:<batch>`; they go with the 30-day prune.
     Either also delete `failures WHERE ref LIKE '<uid>:%'` in `deleteUser`, or keep the page wording.
   - **"12 months after you stopped":** `prune` erases `active = 0` rows whose `updated_at` is older
     than 365 days, so any later quiz answer, `/word` or settings change restarts the clock; it also
     covers a blocked bot and a setup left unfinished after the level step.
   - **Telegram is not a processor:** the notice lists Telegram as "Auftragsverarbeiter" with SCC/DPF
     safeguards; Telegram is an independent controller under its own policy. Have the Art. 49(1)(b)
     GDPR transfer wording checked.
   - **Flashcard Mini App missing:** `public/app` (button under channel posts when `CHANNEL_ID` is a
     numeric id or `MINIAPP_LINK` is set) loads from Cloudflare (device IP), loads telegram.org's
     script, and keeps the known-words list in Telegram CloudStorage / localStorage with no reset,
     which `/delete` cannot reach. Add a reset before offering it, or drop the page section.
   - **In-bot `/privacy` says "/mydata shows everything":** `/mydata` shows a summary (number of words
     with answers, not per-word results, delivery status or the open question).
   - Before publishing: add the live bot's @username, bump `stand`, confirm Cloudflare's DPA covers the
     account.

## When the policy must change

- **Content CDN.** Today every word, clip, picture and story is bundled in the apps, so the pages
  say "built into the app" and mention no download. When an app ships the CDN client (A2–C1 media,
  daily feed), its page must gain a section on that host (IP address in server logs, provider,
  retention, transfer basis) and the "offline / no server" wording must be revised **before** that
  version is released. Update `tools/apps.mjs`, bump `stand`, rebuild.
- Any new SDK (analytics, crash reporting, another ad network), account, or permission.
- Lernle and Wortschatz also show policy text or links in the app itself; keep them in step with
  these pages.
