#!/usr/bin/env node
// Renders index.html and <slug>/{privacy,impressum}.html from apps.config.json + tools/apps.mjs.
// Usage: node tools/build.mjs   (then: node tools/check.mjs)
// Output is committed: GitHub Pages serves the repo root as-is (.nojekyll).

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { APPS, TOKEN } from './apps.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const cfg = JSON.parse(readFileSync(join(ROOT, 'apps.config.json'), 'utf8'));
const P = cfg.provider;

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const todo = (text) => `<!-- TODO(owner): ${text.replace(/--/g, '–')} -->`;

const CSS = `:root{color-scheme:light dark;--ink:#1c1b1f;--bg:#fbfaf6;--muted:#5f5d66;--link:#0b57d0;--rule:#d9d6cf;--warn-bg:#fff1c7;--warn-ink:#4d3900}
@media (prefers-color-scheme:dark){:root{--ink:#e8e6ea;--bg:#141317;--muted:#a8a5ae;--link:#8ab4f8;--rule:#3a3840;--warn-bg:#3b300c;--warn-ink:#ffe08a}}
body{font:16px/1.6 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;color:var(--ink);background:var(--bg);max-width:720px;margin:0 auto;padding:24px 16px 64px;overflow-wrap:break-word}
h1{font-size:1.6rem;line-height:1.25;hyphens:auto}h2{font-size:1.3rem;margin-top:2.5rem;border-top:1px solid var(--rule);padding-top:1.5rem}h3{font-size:1.05rem;margin-top:1.6rem}
a{color:var(--link)}nav{font-size:.95rem;color:var(--muted);margin-bottom:1rem}ul{padding-left:1.25rem}li{margin:.35rem 0}
.muted{color:var(--muted)}.draft{background:var(--warn-bg);color:var(--warn-ink);padding:.6rem .8rem;border-radius:8px;font-weight:600}
.apps{list-style:none;padding:0}.apps li{padding:.8rem 0;border-bottom:1px solid var(--rule)}.apps strong{display:block;font-size:1.1rem}`;

function page({ title, body, draft, nav }) {
  return `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
${draft ? '<meta name="robots" content="noindex">\n' : ''}<title>${title}</title>
<style>
${CSS}
</style>
</head>
<body>
${nav ? `<nav>${nav}</nav>\n` : ''}${draft ? `<p class="draft">${draft}</p>\n` : ''}${body}
</body>
</html>
`;
}

/** Banner text for an unpublished slug (false once published). Unnamed drafts wait for a name, named ones for launch. */
const draftOf = (slug) => {
  const app = cfg.apps[slug];
  if (app.published) return false;
  return app.name
    ? 'ENTWURF · DRAFT – noch nicht veröffentlicht, nicht verlinken · not published yet, do not link'
    : 'ENTWURF · DRAFT – App-Name noch nicht festgelegt, nicht veröffentlichen · name not chosen yet, do not publish';
};

const NAV = `<a href="../">Alle Apps · All apps</a> · <a href="privacy.html">Datenschutz · Privacy</a> · <a href="impressum.html">Impressum</a>`;
const mail = `<a href="mailto:${P.email}">${P.email}</a>`;

function sections(a, L) {
  const de = L === 'de';
  const s = [];
  s.push([de ? 'Verantwortlicher' : 'Controller',
    `<p>${P.name}, ${P.street}, ${P.city}, ${de ? P.countryDe : P.countryEn} · ${de ? 'E-Mail' : 'Email'}: ${mail}</p>`]);

  // A service that is not an ad-funded offline app (e.g. the Telegram bot) brings all its sections in apps.mjs.
  if (a.sections) return render([...s, ...a.sections[L]]);

  const short = de ? [
    `Kein Konto, keine Anmeldung. ${a.bundled.de} sind in der App enthalten; das Lernen funktioniert auch offline.`,
    'Ihr Lernfortschritt und Ihre Einstellungen bleiben nur auf Ihrem Gerät. Wir haben keinen Server und erhalten diese Daten nicht.',
    'Die App enthält keine Analyse- und keine Absturzberichts-Software.',
    'Die kostenlose App zeigt Werbung von Google AdMob. Wo das Gesetz es verlangt, fragt sie vorher um Ihre Einwilligung; personalisierte Werbung gibt es nur mit Einwilligung.',
    a.iap ? 'Optional: ein einmaliger Kauf „Werbung entfernen“ über Google Play bzw. den App Store.' : 'Keine In-App-Käufe.',
  ] : [
    `No account, no sign-in. ${a.bundled.en} are built into the app; learning works offline too.`,
    'Your progress and settings stay on your device only. We have no server and never receive them.',
    'The app contains no analytics and no crash-reporting software.',
    'The free app shows ads from Google AdMob. Where the law requires it, the app asks for your consent first; ads are personalised only with your consent.',
    a.iap ? 'Optional: a one-time "Remove ads" purchase through Google Play or the App Store.' : 'No in-app purchases.',
  ];
  s.push([de ? 'Kurz gesagt' : 'In short', `<ul>\n${short.map((x) => `  <li>${x}</li>`).join('\n')}\n</ul>`]);

  s.push([de ? 'Daten auf Ihrem Gerät' : 'Data on your device', `${a.localData[L]}
<p>${a.deletion[L]}</p>
<p>${de
    ? 'Diese Speicherung ist für die von Ihnen gewünschte Funktion der App unbedingt erforderlich (§ 25 Abs. 2 Nr. 2 TDDDG). Wir haben darauf keinen Zugriff.'
    : 'This storage is strictly necessary for the app features you use (§ 25(2) no. 2 TDDDG). We have no access to it.'}</p>`]);

  s.push([de ? 'Berechtigungen und Gerätefunktionen' : 'Permissions and device features', `<ul>
${a.features[L]}
</ul>
<p>${de
    ? 'Die App fragt nicht nach Kamera, Mikrofon, Standort, Kontakten, Kalender oder Fotos.'
    : 'The app does not ask for camera, microphone, location, contacts, calendar or photos.'}</p>`]);

  s.push([de ? 'Werbung (Google AdMob) und Einwilligung' : 'Advertising (Google AdMob) and consent', de ? `<p>Anbieter: Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. ${a.adFormats.de}</p>
${a.adFormatsTodo ? todo(a.adFormatsTodo) + '\n' : ''}<p>Einwilligung: Im Europäischen Wirtschaftsraum, im Vereinigten Königreich und in der Schweiz zeigt die App vor der ersten Anzeigenanfrage das Einwilligungsformular von Google (User Messaging Platform, IAB Transparency &amp; Consent Framework). Das Werbe-SDK wird erst gestartet, wenn Google danach Anzeigenanfragen zulässt. Auf iPhone und iPad folgt Apples Abfrage, ob die App Sie über Apps und Websites anderer Unternehmen hinweg tracken darf („App Tracking Transparency“). Ihre Auswahl wird auf dem Gerät gespeichert.</p>
<p>Verarbeitete Daten: IP-Adresse (daraus grober Standort), Geräte- und App-Informationen (z. B. Modell, Betriebssystem, Sprache, App-Version), Werbe-ID (Android-Werbe-ID bzw. iOS-IDFA – auf iOS nur, wenn Sie „Tracking erlauben“), Interaktionen mit Anzeigen (Einblendung, Klick) sowie Diagnosedaten zur Betrugsabwehr.</p>
<p>Zweck: Anzeigen ausspielen und messen, Werbebetrug verhindern. Mit Ihrer Einwilligung können Anzeigen personalisiert werden. Ohne Einwilligung zeigt Google nur nicht personalisierte oder eingeschränkte Anzeigen. Außerhalb dieser Regionen richtet sich die Personalisierung nach den dort geltenden Regeln; die IDFA wird auch dort nur genutzt, wenn Sie Tracking erlauben.</p>
${todo('Code cannot show the AdMob console. If "Privacy & messaging" gets a US state regulations (CCPA/CPRA) or another regional message besides the GDPR one, describe it in this section (DE + EN).')}
<p>Rechtsgrundlage: Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO; für das Speichern und Auslesen von Informationen auf Ihrem Gerät § 25 Abs. 1 TDDDG). Sie können sie jederzeit mit Wirkung für die Zukunft widerrufen oder ändern: ${a.privacyChoices.de} (erscheint, wo Googles Einwilligungsformular gilt). Auf iOS zusätzlich: Einstellungen → Datenschutz &amp; Sicherheit → Tracking. Auf Android können Sie die Werbe-ID in den Geräteeinstellungen unter „Werbung“ zurücksetzen oder löschen.</p>
<p>Empfänger: Google. Google ist für die eigene Verarbeitung dieser Daten selbst verantwortlich. Google kann Daten in die USA übermitteln; Google LLC ist nach dem EU-US Data Privacy Framework zertifiziert (Angemessenheitsbeschluss der EU-Kommission, Art. 45 DSGVO). Mehr: <a href="https://policies.google.com/technologies/partner-sites">Wie Google Daten von Apps verwendet</a> · <a href="https://policies.google.com/privacy">Datenschutzerklärung von Google</a>.</p>` : `<p>Provider: Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland. ${a.adFormats.en}</p>
<p>Consent: In the European Economic Area, the UK and Switzerland the app shows Google's consent form (User Messaging Platform, IAB Transparency &amp; Consent Framework) before the first ad request. The ads SDK only starts once Google allows ad requests after that step. On iPhone and iPad, Apple's prompt follows, asking whether the app may track you across other companies' apps and websites (App Tracking Transparency). Your choice is stored on the device.</p>
<p>Data processed: IP address (and the approximate location derived from it), device and app information (e.g. model, OS, language, app version), advertising ID (Android advertising ID or iOS IDFA, the latter only if you allow tracking), ad interactions (impressions, clicks) and diagnostics for fraud prevention.</p>
<p>Purpose: to serve and measure ads and to prevent ad fraud. With your consent, ads may be personalised. Without consent, Google only shows non-personalised or limited ads. Outside these regions, personalisation follows the local rules; the IDFA is used there too only if you allow tracking.</p>
<p>Legal basis: your consent (Art. 6(1)(a) GDPR; for storing and reading information on your device § 25(1) TDDDG). You can withdraw or change it at any time with effect for the future: ${a.privacyChoices.en} (shown where Google's consent form applies). On iOS, also: Settings → Privacy &amp; Security → Tracking. On Android you can reset or delete your advertising ID in the device settings under "Ads".</p>
<p>Recipient: Google. Google is itself responsible for its own processing of this data. Google may transfer data to the USA; Google LLC is certified under the EU-US Data Privacy Framework (adequacy decision of the European Commission, Art. 45 GDPR). More: <a href="https://policies.google.com/technologies/partner-sites">How Google uses data from apps</a> · <a href="https://policies.google.com/privacy">Google Privacy Policy</a>.</p>`]);

  if (a.iap) {
    s.push([de ? 'Kauf „Werbung entfernen“' : '"Remove ads" purchase', (de ? todo(a.iap.todo) + '\n' : '') + a.iap[L]]);
  }

  s.push([de ? 'Download über Google Play und den App Store' : 'Download through Google Play and the App Store', de
    ? '<p>Wenn Sie die App herunterladen oder aktualisieren, verarbeiten Google (Google Play) bzw. Apple (App Store) Daten nach ihren eigenen Datenschutzerklärungen. Über die Entwicklerkonsolen sehen wir nur zusammengefasste Statistiken und gegebenenfalls Absturzberichte ohne Angaben zu Ihrer Person, wenn Sie die Weitergabe von Diagnosedaten in Ihren Geräteeinstellungen erlaubt haben.</p>'
    : '<p>When you download or update the app, Google (Google Play) or Apple (App Store) process data under their own privacy policies. Through the developer consoles we only see aggregated statistics and, where you allowed sharing diagnostics in your device settings, crash reports that do not identify you.</p>']);

  s.push([de ? 'Kontakt per E-Mail' : 'Contact by email', de
    ? '<p>Wenn Sie uns schreiben, verwenden wir Ihre Nachricht nur zur Beantwortung (Art. 6 Abs. 1 lit. f DSGVO) und löschen sie, wenn sie erledigt ist.</p>'
    : '<p>If you write to us, we use your message only to reply (Art. 6(1)(f) GDPR) and delete it once the matter is resolved.</p>']);

  s.push([de ? 'Speicherdauer' : 'Retention', de
    ? '<p>Daten auf Ihrem Gerät bleiben dort, bis Sie sie in der App löschen oder die App deinstallieren. Ihre Einwilligungsentscheidung bleibt auf dem Gerät gespeichert, bis Sie sie ändern oder die App deinstallieren. E-Mails löschen wir, sobald die Anfrage erledigt ist und keine gesetzliche Aufbewahrungspflicht besteht. Wie lange Google Werbedaten speichert, beschreibt die Datenschutzerklärung von Google.</p>'
    : '<p>Data on your device stays there until you delete it in the app or uninstall the app. Your consent choice stays stored on the device until you change it or uninstall the app. We delete emails once the matter is resolved and no legal retention duty applies. How long Google keeps advertising data is described in Google\'s privacy policy.</p>']);

  s.push([de ? 'Ihre Rechte' : 'Your rights', de
    ? '<p>Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch (Art. 15–21 DSGVO) sowie auf Widerruf einer Einwilligung (Art. 7 Abs. 3 DSGVO). Da wir selbst keine Daten über Sie speichern, wenden Sie sich zu Werbedaten bitte auch an Google. Sie können sich bei jeder Datenschutz-Aufsichtsbehörde beschweren, z. B. beim Hessischen Beauftragten für Datenschutz und Informationsfreiheit, Gustav-Stresemann-Ring 1, 65189 Wiesbaden.</p>'
    : '<p>You have the right to access, rectification, erasure, restriction of processing, data portability and objection (Art. 15–21 GDPR), and to withdraw consent (Art. 7(3) GDPR). We store no data about you ourselves, so for advertising data please also contact Google. You may complain to any data protection supervisory authority, for example the Hessian Commissioner for Data Protection and Freedom of Information (Der Hessische Beauftragte für Datenschutz und Informationsfreiheit), Gustav-Stresemann-Ring 1, 65189 Wiesbaden, Germany.</p>']);

  s.push([de ? 'Kinder' : 'Children', de
    ? '<p>Die App richtet sich nicht an Kinder unter 13 Jahren. Wir erheben wissentlich keine Daten von Kindern.</p>'
    : '<p>The app is not directed at children under 13. We do not knowingly collect data from children.</p>']);

  s.push([de ? 'Änderungen' : 'Changes', de
    ? '<p>Wenn eine neue Version der App Daten anders verarbeitet, passen wir diese Erklärung an, bevor die Version erscheint. Es gilt die hier veröffentlichte Fassung; das Datum oben zeigt den Stand.</p>'
    : '<p>If a new version of the app processes data differently, we update this policy before that version is released. The version published here applies; the date at the top shows when it was last updated.</p>']);

  return render(s);
}

const render = (s) => s.map(([h, html], i) => `<h3>${i + 1}. ${h}</h3>\n${html}`).join('\n\n');

function privacy(slug, a) {
  const st = cfg.stand;
  const todos = a.todos.map(todo).join('\n');
  return page({
    title: `Datenschutz · Privacy – ${TOKEN}`,
    draft: draftOf(slug),
    nav: NAV,
    body: `${todos ? todos + '\n' : ''}<h1>Datenschutzerklärung · Privacy Policy</h1>
<p>Stand: ${st.de} · Last updated: ${st.en} · ${a.subject ?? `App „${TOKEN}“ (Android, iOS)`}</p>
<p><a href="#de">Deutsch</a> · <a href="#en">English</a></p>

<h2 id="de">Deutsch</h2>

${sections(a, 'de')}

<h2 id="en">English</h2>

${sections(a, 'en')}`,
  });
}

function impressum(slug, a) {
  const applies = a.appliesTo ?? { de: `die App „${TOKEN}“ (Android, iOS)`, en: `the app "${TOKEN}" (Android, iOS)` };
  return page({
    title: `Impressum – ${TOKEN}`,
    draft: draftOf(slug),
    nav: NAV,
    body: `<h1>Impressum</h1>
<p>Angaben gemäß § 5 DDG · Provider information</p>
<p>${P.name}<br>${P.street}<br>${P.city}<br>${P.countryDe}</p>
<p>Telefon: <a href="tel:${P.phoneHref}">${P.phoneDisplay}</a><br>E-Mail: ${mail}</p>
${todo('If a USt-IdNr. or Wirtschafts-Identifikationsnummer is issued (e.g. once the Gewerbe for AdMob payouts is registered), add it here: § 5 Abs. 1 Nr. 6 DDG.')}
<h3>Gilt für · Applies to</h3>
<p>Diese Angaben gelten für ${applies.de} und diese Seiten.</p>
<p>This information applies to ${applies.en} and these pages.</p>
<h3>Verbraucherstreitbeilegung · Consumer dispute resolution</h3>
<p>Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
<p>We are neither willing nor obliged to take part in dispute resolution proceedings before a consumer arbitration board.</p>`,
  });
}

function index() {
  const live = Object.entries(cfg.apps).filter(([, v]) => v.published);
  const items = live.map(([slug, v]) => `  <li><strong>${esc(v.name)}</strong><a href="${slug}/privacy.html">Datenschutz · Privacy</a> · <a href="${slug}/impressum.html">Impressum</a></li>`).join('\n');
  return page({
    title: 'Rechtliches · Legal',
    body: `<h1>Rechtliches · Legal</h1>
<p>Datenschutzerklärungen und Impressum für die Deutsch-Lern-Apps von ${P.name} · Privacy policies and legal notice for the German-learning apps by ${P.name}.</p>
<ul class="apps">
${items}
</ul>
<p class="muted">Kontakt · Contact: ${mail}</p>`,
  });
}

const out = [];
const write = (rel, html, slug) => {
  const name = slug ? cfg.apps[slug].name : null;
  const final = name ? html.replaceAll(TOKEN, esc(name)) : html;
  const file = join(ROOT, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, final);
  out.push(rel);
};

for (const slug of Object.keys(cfg.apps)) {
  const a = APPS[slug];
  if (!a) throw new Error(`apps.mjs has no facts for slug "${slug}"`);
  write(`${slug}/privacy.html`, privacy(slug, a), slug);
  write(`${slug}/impressum.html`, impressum(slug, a), slug);
}
write('index.html', index(), null);
writeFileSync(join(ROOT, '.nojekyll'), '');
console.log(`built ${out.length} pages: ${out.join(', ')}`);
