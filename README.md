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

Draft pages carry a visible DRAFT banner and `noindex`, keep the literal `{{APP_NAME}}` token, and
are not linked from `index.html`. Do not hand their URLs to a store or AdMob until they are renamed.

## Edit, build, check

- `apps.config.json` – the one place for app names, publish state, provider details and the date.
  Renaming an app is one edit: set `name`, set `published: true` when ready.
- `tools/apps.mjs` – per-app facts (local data, deletion path, permissions, ad formats, purchases),
  German and English, verified against each app's release config on 8 Nov 2026.
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

## When the policy must change

- **Content CDN.** Today every word, clip, picture and story is bundled in the apps, so the pages
  say "built into the app" and mention no download. When an app ships the CDN client (A2–C1 media,
  daily feed), its page must gain a section on that host (IP address in server logs, provider,
  retention, transfer basis) and the "offline / no server" wording must be revised **before** that
  version is released. Update `tools/apps.mjs`, bump `stand`, rebuild.
- Any new SDK (analytics, crash reporting, another ad network), account, or permission.
- Lernle and Wortschatz also show policy text or links in the app itself; keep them in step with
  these pages.
