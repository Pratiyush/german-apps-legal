// Per-app facts for the privacy policies, in German and English.
//
// Every statement here was checked against the app's release configuration on 8 Nov 2026
// (pubspec / Gradle / project.yml, merged release AndroidManifest, Info.plist, PrivacyInfo.xcprivacy,
// lib/ network and storage code). If an app gains a feature that touches data, update this file,
// bump `stand` in apps.config.json, and rebuild.
//
// The app name is never written here: use {{APP_NAME}}. tools/build.mjs fills it from apps.config.json.

const N = '{{APP_NAME}}';

const ADS_PERMS = {
  de: `<li><strong>Werbung:</strong> Internetzugriff, Netzwerkstatus und Werbe-ID (Android) sowie Apples Abfrage „App Tracking Transparency“ (iOS) – nur für Google AdMob, siehe „Werbung“. Weitere technische Berechtigungen bringt Googles Werbe-SDK selbst mit.</li>`,
  en: `<li><strong>Advertising:</strong> internet access, network state and the advertising ID (Android), and Apple's App Tracking Transparency prompt (iOS) – only for Google AdMob, see "Advertising". Google's ads SDK adds a few further technical permissions of its own.</li>`,
};

const TTS = {
  de: `Fehlt eine Aufnahme, übergibt die App den deutschen Text an die Sprachausgabe (Text-to-Speech) Ihres Geräts. Diese gehört zum Betriebssystem, nicht zur App; manche Android-Sprachdienste können online arbeiten – das steuern Sie in den Geräteeinstellungen.`,
  en: `If a recording is missing, the app hands the German text to your device's text-to-speech engine. That engine belongs to the operating system, not to the app; some Android speech services can work online – your device settings control that.`,
};

export const APPS = {
  lernle: {
    bundled: { de: 'Wörter, Geschichten, Bilder und Hörbeispiele', en: 'Words, stories, pictures and audio clips' },
    localData: {
      de: `<p>Ihr Lernstand liegt in einer Datenbank im privaten Speicher der App: welche Wörter Sie gesehen haben und wie gut Sie sie wussten, Ihr Wiederholungsplan, die Ergebnisse einzelner Übungen (Wort, Übungsart, richtig oder falsch, Antwortzeit, Hinweis genutzt, bei Auswahlfragen die gewählte Antwort), Übungs- und Spielrunden, Sterne, Abzeichen, Ihre Tages-Serie sowie Lesefortschritt und Lieblingsgeschichten. Ihre Einstellungen (z. B. Design, reduzierte Bewegung, Sprechtempo, App- und Lernsprache, Niveau, Leseeinstellungen) liegen im Einstellungsspeicher des Betriebssystems.</p>
<p>Außerdem speichert die App ein kleines, größenbegrenztes Fehlerprotokoll (nur technische Fehlermeldungen) auf dem Gerät; es wird nicht gesendet. Die Sitzungsstatistik existiert nur im Arbeitsspeicher und verschwindet, wenn Sie die App schließen. Was Sie in Übungen eintippen, wird geprüft und nicht gespeichert.</p>
<p><strong>Sicherung:</strong> Nur wenn Sie unter Settings → Backup auf „Export a backup file“ tippen, erstellt die App eine unverschlüsselte Textdatei (JSON) mit Ihrem Lernstand und Ihren Einstellungen und übergibt sie an das Teilen-Menü Ihres Geräts. Wohin die Datei geht, entscheiden Sie; ab dann gelten die Bedingungen des gewählten Dienstes. „Restore from a backup file“ liest nur die Datei, die Sie auswählen, und ersetzt den aktuellen Stand.</p>`,
      en: `<p>Your learning record is kept in a database in the app's private storage: which words you have seen and how well you knew them, your review schedule, the results of individual exercises (word, exercise type, right or wrong, response time, hint used, and for multiple choice the option you picked), practice and game rounds, stars, badges, your daily streak, and reading progress and favourite stories. Your settings (e.g. theme, reduced motion, speaking speed, app and learning language, level, reader preferences) are kept in the operating system's preference store.</p>
<p>The app also keeps a small, size-limited error log (technical error messages only) on the device; it is never sent. The session statistics exist in memory only and disappear when you close the app. What you type in exercises is checked and not stored.</p>
<p><strong>Backup:</strong> Only when you tap "Export a backup file" under Settings → Backup does the app create an unencrypted text file (JSON) with your learning record and settings and hand it to your device's share sheet. You decide where it goes; from then on the terms of the service you chose apply. "Restore from a backup file" reads only the file you pick and replaces the current state.</p>`,
    },
    deletion: {
      de: 'Löschen: Settings → Data → „Erase everything on this device“ löscht die Lerndatenbank und setzt die Einstellungen zurück. Das Deinstallieren der App entfernt alle Daten. Eine exportierte Sicherungsdatei löschen Sie selbst.',
      en: 'Deleting: Settings → Data → "Erase everything on this device" wipes the learning database and resets your settings. Uninstalling the app removes all of its data. An exported backup file is yours to delete.',
    },
    features: {
      de: `<li><strong>Erinnerung (optional):</strong> eine tägliche Lern-Erinnerung als lokale Benachrichtigung, auf dem Gerät geplant – ohne Server oder Push-Dienst. Dafür fragt die App nach der Erlaubnis für Benachrichtigungen (auf iOS erst, wenn Sie die Erinnerung einschalten). Auf Android plant sie die Erinnerung nach einem Neustart neu und nutzt die Vibration für ein kurzes Feedback bei richtigen Antworten.</li>
<li><strong>Aussprache:</strong> Über 6.000 Hörbeispiele sind in der App enthalten. ${TTS.de}</li>
<li><strong>Dateien:</strong> Die App liest und schreibt nur ihren eigenen Speicher und die Sicherungsdatei, die Sie ausdrücklich auswählen.</li>
${ADS_PERMS.de}`,
      en: `<li><strong>Reminder (optional):</strong> one daily study reminder, a local notification scheduled on the device – no server, no push service. For this the app asks for notification permission (on iOS only when you switch the reminder on). On Android it reschedules the reminder after a restart and uses vibration for a short buzz on right answers.</li>
<li><strong>Pronunciation:</strong> More than 6,000 audio clips are built into the app. ${TTS.en}</li>
<li><strong>Files:</strong> The app reads and writes only its own storage and the backup file you explicitly pick.</li>
${ADS_PERMS.en}`,
    },
    adFormats: {
      de: 'Die App zeigt Banner in einigen Listen, gelegentlich eine Vollbildanzeige nach einer abgeschlossenen Runde und eine Anzeige mit Prämie nur, wenn Sie sie selbst starten.',
      en: 'The app shows banners in some lists, occasionally a full-screen ad after a finished round, and a rewarded ad only when you choose to watch one.',
    },
    privacyChoices: { de: 'Settings → About → „Privacy choices“', en: 'Settings → About → "Privacy choices"' },
    iap: null,
    todos: [],
  },

  wortschatz: {
    bundled: { de: 'Wörter und Hörbeispiele', en: 'Words and audio clips' },
    localData: {
      de: `<p>Ihr Lernstand je Wort, Ihre Punkte, Ihre Tages-Serie mit dem letzten Übungstag und Ihre Einstellungen („Speak words automatically“, „Count games as practice“) werden nur lokal im Einstellungsspeicher des Betriebssystems gespeichert.</p>`,
      en: `<p>Your progress per word, your points, your daily streak with the last practice day, and your settings ("Speak words automatically", "Count games as practice") are stored locally only, in the operating system's preference store.</p>`,
    },
    deletion: {
      de: 'Löschen: Settings → „Reset progress“ löscht Lernstand, Punkte und Serie. Das Deinstallieren der App entfernt alle Daten.',
      en: 'Deleting: Settings → "Reset progress" deletes your progress, points and streak. Uninstalling the app removes all of its data.',
    },
    features: {
      de: `<li><strong>Aussprache:</strong> Die Hörbeispiele sind in der App enthalten. ${TTS.de}</li>
<li><strong>Links:</strong> „Privacy policy“, „Impressum“ und „Contact support“ öffnen Ihren Browser bzw. Ihr E-Mail-Programm. Hinweise auf unsere anderen Apps sind einfache Links zu Google Play bzw. zum App Store – ohne Werbe-SDK und ohne Datenübertragung an uns.</li>
${ADS_PERMS.de}`,
      en: `<li><strong>Pronunciation:</strong> The audio clips are built into the app. ${TTS.en}</li>
<li><strong>Links:</strong> "Privacy policy", "Impressum" and "Contact support" open your browser or email app. Tips about our other apps are plain links to Google Play or the App Store – no ads SDK, and nothing is sent to us.</li>
${ADS_PERMS.en}`,
    },
    adFormats: {
      de: 'Die App zeigt Banner, gelegentlich eine Vollbildanzeige nach einer abgeschlossenen Runde und Anzeigen mit Prämie (z. B. um eine Serie zu retten) nur, wenn Sie sie selbst starten.',
      en: 'The app shows banners, occasionally a full-screen ad after a finished round, and rewarded ads (e.g. to save a streak) only when you choose to watch one.',
    },
    privacyChoices: { de: 'Settings → „Privacy & ad choices“', en: 'Settings → "Privacy & ad choices"' },
    iap: null,
    todos: [],
  },

  wordbit: {
    bundled: { de: 'Wörter und Hörbeispiele', en: 'Words and audio clips' },
    localData: {
      de: `<p>Ihre Lernkarten und Wiederholungen, bekannte Wörter, Ihre Lernaktivität pro Tag (für die Serie), Ihre Einstellungen, ob Sie bestimmte Hinweise schon gesehen haben, ob „Werbung entfernen“ gekauft wurde, und die Anzahl der App-Starts (für die Taktung der Werbung) werden nur lokal im privaten Speicher der App gespeichert. Auf iOS teilt die App diese Daten über einen App-Gruppen-Speicher auf dem Gerät mit ihrem Widget.</p>`,
      en: `<p>Your flashcards and reviews, known words, your activity per day (for the streak), your settings, whether you have already seen certain prompts, whether "Remove ads" was bought, and the number of app launches (to pace ads) are stored locally only, in the app's private storage. On iOS the app shares this data with its widget through an app-group container on the device.</p>`,
    },
    deletion: {
      de: 'Löschen: Settings → „Reset progress“ löscht Serie, bekannte Wörter und Lernkarten. Das Deinstallieren der App entfernt alle Daten.',
      en: 'Deleting: Settings → "Reset progress" deletes your streak, known words and flashcards. Uninstalling the app removes all of its data.',
    },
    features: {
      de: `<li><strong>Wort-Benachrichtigungen (optional):</strong> mehrmals täglich ein Wort als lokale Benachrichtigung mit Antwort-Schaltflächen, auf dem Gerät geplant (auf iOS jeweils für die nächsten Tage im Voraus) – ohne Server oder Push-Dienst. Dafür fragt die App nach der Erlaubnis für Benachrichtigungen; auf Android plant sie nach einem Neustart neu.</li>
<li><strong>Sperrbildschirm-Karte (nur Android, optional):</strong> Wenn Sie sie einschalten, zeigt die App beim Einschalten des Bildschirms eine Lernkarte. Dafür braucht sie die Berechtigung „Über anderen Apps einblenden“ und einen Vordergrunddienst, den Android mit einer dauerhaften Benachrichtigung anzeigt. Die App liest dabei keine Inhalte anderer Apps oder des Bildschirms.</li>
<li><strong>Widget:</strong> Das Startbildschirm-Widget zeigt Wörter aus dem lokalen Speicher der App.</li>
<li><strong>Andere Wort-Apps (Android):</strong> Die App prüft nur auf dem Gerät, ob bestimmte andere Sperrbildschirm-Vokabel-Apps installiert sind, um anzubieten, sie zu öffnen. Dafür darf sie die Liste der startbaren Apps abfragen. Dabei wird nichts gespeichert oder übertragen.</li>
<li><strong>Aussprache:</strong> Die Hörbeispiele sind in der App enthalten. ${TTS.de}</li>
${ADS_PERMS.de}`,
      en: `<li><strong>Word notifications (optional):</strong> a word several times a day as a local notification with answer buttons, scheduled on the device (on iOS a few days ahead) – no server, no push service. For this the app asks for notification permission; on Android it reschedules after a restart.</li>
<li><strong>Lock-screen card (Android only, optional):</strong> When you switch it on, the app shows a flashcard when the screen turns on. This needs the "Display over other apps" permission and a foreground service, which Android shows as a persistent notification. The app does not read the content of other apps or of the screen.</li>
<li><strong>Widget:</strong> The home-screen widget shows words from the app's local storage.</li>
<li><strong>Other word apps (Android):</strong> The app checks on the device only whether certain other lock-screen vocabulary apps are installed, to offer to open them. For this it may query the list of launchable apps. Nothing is stored or sent.</li>
<li><strong>Pronunciation:</strong> The audio clips are built into the app. ${TTS.en}</li>
${ADS_PERMS.en}`,
    },
    adFormats: {
      de: 'Die App zeigt Banner und gelegentlich eine Vollbildanzeige.',
      en: 'The app shows banners and occasionally a full-screen ad.',
    },
    adFormatsTodo: 'LOCK_SCREEN_ADS (Android build flag, default false) puts a banner on the lock-screen card. If a release enables it, add "and on the lock-screen card" to the ad formats sentence (DE + EN).',
    privacyChoices: { de: 'Settings → „Privacy & ad choices“', en: 'Settings → "Privacy & ad choices"' },
    iap: {
      todo: 'The "Remove ads" purchase ships behind PRO_ENABLED (Android) / WB_PRO_ENABLED (iOS), both default off. Keep this section only if the release enables it; otherwise delete it and say "no in-app purchases" like the other apps. Price deliberately not stated.',
      de: `<p>Die App kann einen einmaligen Kauf „Werbung entfernen“ anbieten. Der Kauf wird vollständig über Google Play bzw. den Apple App Store abgewickelt, nach deren Bedingungen und Datenschutzerklärungen. Wir erhalten keine Zahlungsdaten. Auf dem Gerät wird nur gespeichert, dass der Kauf erfolgt ist; „Restore“ fragt den Store danach. Rechtsgrundlage: Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO).</p>`,
      en: `<p>The app may offer a one-time "Remove ads" purchase. It is handled entirely by Google Play or the Apple App Store, under their own terms and privacy policies. We receive no payment details. The device only stores that the purchase was made; "Restore" asks the store for it. Legal basis: performance of a contract (Art. 6(1)(b) GDPR).</p>`,
    },
    todos: [],
  },

  readle: {
    bundled: { de: 'Geschichten, Bilder, Wörterbuch und Hörbeispiele', en: 'Stories, pictures, dictionary and audio clips' },
    localData: {
      de: `<p>Gelesene Geschichten und Lesefortschritt, Quiz-Ergebnisse, gespeicherte Wörter mit ihrem Wiederholungsstand, die Tage, an denen Sie gelernt haben (für Serie und Tagesziel), Ihre Einstellungen (Textgröße, Design, Sprechtempo) und die Anzahl der App-Starts werden nur lokal im Einstellungsspeicher des Betriebssystems gespeichert. Außerdem speichert die App ein kleines Fehlerprotokoll (die letzten technischen Fehlermeldungen) auf dem Gerät; es wird nicht gesendet.</p>`,
      en: `<p>Stories read and reading progress, quiz results, saved words with their review state, the days you studied (for streak and daily goal), your settings (text size, theme, speech speed) and the number of app launches are stored locally only, in the operating system's preference store. The app also keeps a small error log (the latest technical error messages) on the device; it is never sent.</p>`,
    },
    deletion: {
      de: 'Löschen: Progress → „Reset all progress“ löscht gelesene Geschichten, Fortschritt, Quiz-Ergebnisse, gespeicherte Wörter und Lerntage und setzt die Einstellungen zurück. Das Deinstallieren der App entfernt alle Daten.',
      en: 'Deleting: Progress → "Reset all progress" deletes stories read, progress, quiz results, saved words and study days, and resets your settings. Uninstalling the app removes all of its data.',
    },
    features: {
      de: `<li><strong>Vorlesen und Aussprache:</strong> Geschichten liest die App mit der Sprachausgabe (Text-to-Speech) Ihres Geräts vor und übergibt ihr dafür den deutschen Text. Diese gehört zum Betriebssystem, nicht zur App; manche Android-Sprachdienste können online arbeiten – das steuern Sie in den Geräteeinstellungen. Einzelne Wörter spielt die App aus enthaltenen Aufnahmen ab.</li>
${ADS_PERMS.de}`,
      en: `<li><strong>Read-aloud and pronunciation:</strong> The app reads stories aloud with your device's text-to-speech engine and hands it the German text for that. The engine belongs to the operating system, not to the app; some Android speech services can work online – your device settings control that. Single words are played from recordings built into the app.</li>
${ADS_PERMS.en}`,
    },
    adFormats: {
      de: 'Die App zeigt Banner und gelegentlich eine Vollbildanzeige, nachdem Sie eine Geschichte mit dem Quiz beendet haben.',
      en: 'The app shows banners and occasionally a full-screen ad after you finish a story and its quiz.',
    },
    privacyChoices: { de: 'Progress → „Privacy & ad choices“', en: 'Progress → "Privacy & ad choices"' },
    iap: null,
    todos: [
      'Readle also exists as a web app / PWA (readle/src, no ads, data in browser localStorage, content fetched from its own host). This page covers the Android and iOS apps only. If the web version is published under this name, add a short web section (hosting provider, server log files) or give it its own policy.',
    ],
  },

  // Telegram bot: a server-side service, so it brings its own sections (no AdMob, no store download).
  // Checked on 9 Nov 2026 against telegram-bot/src (db.ts, bot.ts, core.ts, cron.ts, index.ts, format.ts),
  // public/app/index.html, wrangler.toml and migrations/0001–0002. Source text: telegram-bot/docs/privacy-notice.md.
  telegram: {
    subject: `Telegram-Bot „${N}“`,
    appliesTo: { de: `den Telegram-Bot „${N}“`, en: `the Telegram bot "${N}"` },
    sections: {
      de: [
        ['Kurz gesagt', `<ul>
  <li>Sie nutzen den Bot mit Ihrem Telegram-Konto; ein eigenes Konto gibt es nicht. Gespeichert werden nur Ihre Telegram-Nutzer-ID, Ihre Auswahl (Niveau, Erklärungssprache, Uhrzeit) und Ihr Lernstand.</li>
  <li>Ihren Namen, Nutzernamen, Ihr Profilbild, Ihre Telefonnummer und die Texte Ihrer Nachrichten speichert der Bot nicht.</li>
  <li>Keine Werbung, keine Analyse- oder Tracking-Software. Wir verkaufen oder teilen keine Daten.</li>
  <li>Der Bot läuft bei Cloudflare (Datenbank in Westeuropa); die Nachrichten stellt Telegram zu.</li>
  <li><code>/mydata</code> zeigt Ihre Daten, <code>/delete</code> löscht sie sofort, <code>/stop</code> pausiert die täglichen Wörter.</li>
</ul>`],
        ['Welche Daten der Bot speichert', `<p>Wenn Sie den Bot mit <code>/start</code> beginnen, legt er in seiner Datenbank (Cloudflare D1) einen Eintrag zu Ihrer Telegram-Nutzer-ID an. Gespeichert werden:</p>
<ul>
<li><strong>Kennung:</strong> Ihre Telegram-Nutzer-ID (zugleich die ID Ihres Chats mit dem Bot) – die einzige Kennung, die wir speichern.</li>
<li><strong>Ihre Auswahl:</strong> Niveau (A1, A2, B1, B2 oder alle Niveaus nacheinander), Sprache der Erklärungen, tägliche Uhrzeit (7, 8, 12, 18 oder 20 Uhr, Berliner Zeit) und ob die täglichen Wörter an oder pausiert sind.</li>
<li><strong>Zustellungen:</strong> welches Wortpaket Sie an welchem Tag bekommen haben, mit Zustellstatus und Anzahl der Versuche – damit Sie kein Paket doppelt bekommen.</li>
<li><strong>Lernstand:</strong> je Wort die Anzahl richtiger und falscher Quiz-Antworten, das letzte Ergebnis und dessen Zeitpunkt; die gerade offene Quizfrage (Wort, Fragetyp, Antwortmöglichkeiten); Ihre Serie, beste Serie und der letzte Quiz-Tag; Ihre Position bei <code>/word</code>.</li>
<li><strong>Zeitpunkte:</strong> wann Sie den Bot zum ersten Mal genutzt haben und wann sich Ihr Eintrag zuletzt geändert hat.</li>
</ul>
<p>Wenn Sie dem Bot schreiben oder eine Schaltfläche antippen, übermittelt Telegram die Nachricht zusammen mit Ihrem öffentlichen Profil (z. B. Name, Nutzername, Spracheinstellung) an den Bot. Er verarbeitet sie nur, um in diesem Moment zu antworten, und speichert davon nichts außer den oben genannten Angaben. Nach Telefonnummer, Standort oder Kontakten fragt der Bot nicht.</p>
<p>Im Kanal, in dem der Bot Wörter veröffentlicht, sind die Quiz-Umfragen anonym. Der Bot erfährt nicht, wer den Kanal liest oder abstimmt, und speichert dazu nichts.</p>
<p>Rechtsgrundlage: Erbringung des Dienstes, den Sie mit <code>/start</code> anfordern (Art. 6 Abs. 1 lit. b DSGVO).</p>`],
        ['Betriebsprotokolle', `<p>Damit der Bot zuverlässig läuft, protokolliert er jeden stündlichen Lauf (Zeitpunkt, Zahl der gesendeten und fehlgeschlagenen Nachrichten, eine kurze Notiz ohne Angaben zu Personen) und jeden Fehler mit seiner Fehlermeldung. Bei einer fehlgeschlagenen Zustellung enthält der Fehlereintrag Ihre Telegram-Nutzer-ID und das Wortpaket. Diese Einträge werden nach 30 Tagen automatisch gelöscht. Störungsmeldungen an den Betreiber enthalten nur Zahlen und Fehlermeldungen, keine Nutzer-IDs.</p>
<p>Rechtsgrundlage: unser berechtigtes Interesse an einem zuverlässigen Dienst und an der Fehlersuche (Art. 6 Abs. 1 lit. f DSGVO).</p>`],
        ['Lernkarten (Telegram Mini App)', `<p>Unter Beiträgen im Kanal kann eine Schaltfläche „Flashcards üben“ eine Lernkarten-Ansicht öffnen (Telegram Mini App). Sie wird in Telegram von Cloudflare geladen; dabei verarbeitet Cloudflare die IP-Adresse und Browser-Angaben Ihres Geräts, soweit das technisch nötig ist, um die Dateien auszuliefern. Die Mini App lädt außerdem ein Skript von Telegram (telegram.org).</p>
<p>Welche Karten Sie mit „Kann ich“ markiert haben, speichert die Mini App im Telegram-Cloud-Speicher dieses Bots in Ihrem Telegram-Konto oder, falls der nicht verfügbar ist, im lokalen Speicher Ihres Geräts. Die Mini App überträgt diese Markierungen nicht an uns; wir können sie weder lesen noch löschen.</p>
<p>Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO; das Speichern auf Ihrem Gerät ist für die von Ihnen genutzte Funktion unbedingt erforderlich (§ 25 Abs. 2 Nr. 2 TDDDG).</p>`],
        ['Hosting: Cloudflare (Auftragsverarbeiter)', `<p>Der Bot, seine Datenbank und die Videos, Hördateien und Lernkarten, die er verschickt, liegen bei Cloudflare, Inc., 101 Townsend St., San Francisco, CA 94107, USA (Cloudflare Workers, D1, KV). Die Datenbank liegt in Westeuropa (Cloudflare-Standort „WEUR“). Der kleine Statusspeicher (KV) enthält nur Angaben zum letzten stündlichen Lauf, keine Daten über Sie. Der Programmcode läuft im weltweiten Netz von Cloudflare.</p>
<p>Cloudflare verarbeitet die Daten in unserem Auftrag nach einem Vertrag zur Auftragsverarbeitung (Art. 28 DSGVO). Soweit Daten in die USA gelangen: Cloudflare, Inc. ist nach dem EU-US Data Privacy Framework zertifiziert (Angemessenheitsbeschluss der EU-Kommission, Art. 45 DSGVO); der Vertrag enthält zusätzlich die Standardvertragsklauseln der EU-Kommission (Art. 46 Abs. 2 lit. c DSGVO). Mehr: <a href="https://www.cloudflare.com/privacypolicy/">Datenschutzerklärung von Cloudflare</a>.</p>`],
        ['Telegram', `<p>Der Bot ist ein Dienst auf der Plattform Telegram. Ihre Nachrichten an den Bot, Ihre Antworten über Schaltflächen und alles, was der Bot Ihnen schickt, übermittelt und speichert Telegram nach eigenen Bedingungen; Ihr Chat-Verlauf bleibt in Telegram, bis Sie ihn dort löschen. Für diese Verarbeitung ist Telegram selbst verantwortlich; Telegram ist nicht unser Auftragsverarbeiter und kann Daten außerhalb der EU verarbeiten. Es gilt die <a href="https://telegram.org/privacy">Datenschutzerklärung von Telegram</a>.</p>
<p>Wir übergeben Telegram Ihre Telegram-Nutzer-ID und die Inhalte, die der Bot Ihnen schickt (Wörter, Videos, Hördateien, Quizfragen), weil der Dienst nur so zugestellt werden kann (Art. 6 Abs. 1 lit. b DSGVO; für eine Übermittlung außerhalb der EU Art. 49 Abs. 1 lit. b DSGVO).</p>`],
        ['Speicherdauer und Löschung', `<ul>
<li><strong>Solange Sie den Bot nutzen,</strong> bleiben Ihre Angaben gespeichert.</li>
<li><strong><code>/delete</code></strong> löscht sofort Ihren Eintrag, Ihre Zustellungen, Ihren Lernstand und die offene Quizfrage; <code>/start</code> beginnt danach neu. Fehlereinträge, die Ihre Nutzer-ID enthalten können, werden wie alle Betriebsprotokolle nach 30 Tagen gelöscht.</li>
<li><strong><code>/stop</code></strong> (oder „Pause“ in <code>/settings</code>) beendet die täglichen Wörter; Ihr Lernstand bleibt, damit Sie mit <code>/start</code> weitermachen können. Dasselbe gilt, wenn Sie den Bot blockieren (das bemerkt er bei der nächsten Zustellung) oder die Einrichtung nach der Wahl des Niveaus nicht abschließen. Nutzen Sie den Bot danach 12 Monate lang nicht (keine Quiz-Antwort, kein <code>/word</code>, keine Änderung der Einstellungen), löscht er alle Ihre Daten automatisch.</li>
<li><strong>Betriebsprotokolle</strong> werden nach 30 Tagen gelöscht.</li>
<li><strong>E-Mails</strong> löschen wir, sobald die Anfrage erledigt ist und keine gesetzliche Aufbewahrungspflicht besteht.</li>
</ul>`],
        ['Kontakt per E-Mail', '<p>Wenn Sie uns schreiben, verwenden wir Ihre Nachricht nur zur Beantwortung (Art. 6 Abs. 1 lit. f DSGVO) und löschen sie, wenn sie erledigt ist.</p>'],
        ['Ihre Rechte', `<p>Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch (Art. 15–21 DSGVO). Im Bot zeigt <code>/mydata</code> eine Übersicht Ihrer gespeicherten Daten, <code>/settings</code> ändert Niveau, Sprache und Uhrzeit, <code>/delete</code> löscht alles. Eine vollständige Kopie (z. B. Ihre Quiz-Ergebnisse je Wort) erhalten Sie per E-Mail an den Verantwortlichen; nennen Sie dabei Ihre Telegram-Nutzer-ID, die <code>/mydata</code> anzeigt. Wir können Sie bitten, die Anfrage über Telegram zu bestätigen. Der Verarbeitung von Betriebsprotokollen (Art. 6 Abs. 1 lit. f DSGVO) können Sie aus Gründen, die sich aus Ihrer besonderen Situation ergeben, widersprechen (Art. 21 DSGVO). Zu Daten, die Telegram verarbeitet, wenden Sie sich bitte an Telegram. Sie können sich bei jeder Datenschutz-Aufsichtsbehörde beschweren, z. B. beim Hessischen Beauftragten für Datenschutz und Informationsfreiheit, Gustav-Stresemann-Ring 1, 65189 Wiesbaden.</p>`],
        ['Kinder', '<p>Der Bot richtet sich nicht an Kinder unter 13 Jahren. Wir erheben wissentlich keine Daten von Kindern.</p>'],
        ['Änderungen', '<p>Wenn der Bot Daten anders verarbeitet (etwa durch eine neue Funktion oder ein Bezahlangebot), passen wir diese Erklärung an, bevor die Änderung gilt. Es gilt die hier veröffentlichte Fassung; das Datum oben zeigt den Stand.</p>'],
      ],
      en: [
        ['In short', `<ul>
  <li>You use the bot with your Telegram account; there is no separate account. The bot stores only your Telegram user ID, your choices (level, explanation language, time) and your learning progress.</li>
  <li>The bot does not store your name, username, profile picture, phone number or the text of your messages.</li>
  <li>No ads, no analytics or tracking software. We do not sell or share data.</li>
  <li>The bot runs on Cloudflare (database in Western Europe); Telegram delivers the messages.</li>
  <li><code>/mydata</code> shows your data, <code>/delete</code> erases it at once, <code>/stop</code> pauses the daily words.</li>
</ul>`],
        ['What the bot stores', `<p>When you begin with <code>/start</code>, the bot creates an entry for your Telegram user ID in its database (Cloudflare D1). It stores:</p>
<ul>
<li><strong>Identifier:</strong> your Telegram user ID (which is also the ID of your chat with the bot) – the only identifier we keep.</li>
<li><strong>Your choices:</strong> level (A1, A2, B1, B2 or all levels in sequence), the language for explanations, the daily time (7, 8, 12, 18 or 20 o'clock, Berlin time) and whether the daily words are on or paused.</li>
<li><strong>Deliveries:</strong> which word batch you received on which day, with its delivery status and number of attempts – so you never get a batch twice.</li>
<li><strong>Progress:</strong> per word the number of right and wrong quiz answers, the last result and when it was; the quiz question currently open (word, question type, options); your streak, best streak and last quiz day; your position in <code>/word</code>.</li>
<li><strong>Timestamps:</strong> when you first used the bot and when your entry last changed.</li>
</ul>
<p>When you write to the bot or tap a button, Telegram passes the message to the bot together with your public profile (e.g. name, username, language setting). The bot uses it only to answer at that moment and keeps nothing of it beyond the items above. The bot never asks for your phone number, location or contacts.</p>
<p>In the channel where the bot publishes words, the quiz polls are anonymous. The bot does not learn who reads the channel or votes, and stores nothing about it.</p>
<p>Legal basis: providing the service you request with <code>/start</code> (Art. 6(1)(b) GDPR).</p>`],
        ['Operation logs', `<p>To keep the bot reliable, it records every hourly run (time, number of messages sent and failed, a short note that identifies no one) and every error with its error message. For a failed delivery, the error entry contains your Telegram user ID and the word batch. These entries are deleted automatically after 30 days. Fault alerts to the operator contain only counts and error messages, no user IDs.</p>
<p>Legal basis: our legitimate interest in a reliable service and in finding faults (Art. 6(1)(f) GDPR).</p>`],
        ['Flashcards (Telegram Mini App)', `<p>Under posts in the channel, a "Flashcards üben" button may open a flashcard view (Telegram Mini App). Telegram loads it from Cloudflare; Cloudflare processes your device's IP address and browser details as far as technically needed to deliver the files. The Mini App also loads a script from Telegram (telegram.org).</p>
<p>Which cards you marked "Kann ich" (I know it) is saved by the Mini App in this bot's Telegram cloud storage in your Telegram account or, if that is unavailable, in your device's local storage. The Mini App does not send these marks to us; we can neither read nor delete them.</p>
<p>Legal basis: Art. 6(1)(b) GDPR; storing on your device is strictly necessary for the feature you use (§ 25(2) no. 2 TDDDG).</p>`],
        ['Hosting: Cloudflare (processor)', `<p>The bot, its database and the videos, audio files and flashcards it sends are hosted by Cloudflare, Inc., 101 Townsend St., San Francisco, CA 94107, USA (Cloudflare Workers, D1, KV). The database is located in Western Europe (Cloudflare location "WEUR"). The small status store (KV) holds only details of the last hourly run, no data about you. The code runs on Cloudflare's global network.</p>
<p>Cloudflare processes the data on our behalf under a data processing agreement (Art. 28 GDPR). Where data reaches the USA: Cloudflare, Inc. is certified under the EU-US Data Privacy Framework (adequacy decision of the European Commission, Art. 45 GDPR), and the agreement also includes the European Commission's standard contractual clauses (Art. 46(2)(c) GDPR). More: <a href="https://www.cloudflare.com/privacypolicy/">Cloudflare Privacy Policy</a>.</p>`],
        ['Telegram', `<p>The bot is a service on the Telegram platform. Telegram transmits and stores your messages to the bot, your button taps and everything the bot sends you under its own terms; your chat history stays in Telegram until you delete it there. Telegram is itself responsible for this processing; it is not our processor and may process data outside the EU. <a href="https://telegram.org/privacy">Telegram's Privacy Policy</a> applies.</p>
<p>We give Telegram your Telegram user ID and the content the bot sends you (words, videos, audio files, quiz questions), because that is the only way to deliver the service (Art. 6(1)(b) GDPR; for any transfer outside the EU, Art. 49(1)(b) GDPR).</p>`],
        ['Retention and deletion', `<ul>
<li><strong>While you use the bot,</strong> your details stay stored.</li>
<li><strong><code>/delete</code></strong> erases your entry, your deliveries, your progress and the open quiz question at once; <code>/start</code> then begins fresh. Error entries that may contain your user ID are deleted after 30 days, like all operation logs.</li>
<li><strong><code>/stop</code></strong> (or "Pause" in <code>/settings</code>) ends the daily words; your progress stays so you can carry on with <code>/start</code>. The same applies if you block the bot (it notices at the next delivery) or do not finish the setup after choosing a level. If you then do not use the bot for 12 months (no quiz answer, no <code>/word</code>, no change of settings), it erases all your data automatically.</li>
<li><strong>Operation logs</strong> are deleted after 30 days.</li>
<li><strong>Emails</strong> are deleted once the matter is resolved and no legal retention duty applies.</li>
</ul>`],
        ['Contact by email', '<p>If you write to us, we use your message only to reply (Art. 6(1)(f) GDPR) and delete it once the matter is resolved.</p>'],
        ['Your rights', `<p>You have the right to access, rectification, erasure, restriction of processing, data portability and objection (Art. 15–21 GDPR). In the bot, <code>/mydata</code> shows an overview of your stored data, <code>/settings</code> changes level, language and time, and <code>/delete</code> erases everything. For a complete copy (e.g. your quiz results per word), email the controller and give your Telegram user ID, which <code>/mydata</code> shows; we may ask you to confirm the request through Telegram. You may object to the processing of operation logs (Art. 6(1)(f) GDPR) on grounds relating to your particular situation (Art. 21 GDPR). For data that Telegram processes, please contact Telegram. You may complain to any data protection supervisory authority, for example the Hessian Commissioner for Data Protection and Freedom of Information (Der Hessische Beauftragte für Datenschutz und Informationsfreiheit), Gustav-Stresemann-Ring 1, 65189 Wiesbaden, Germany.</p>`],
        ['Children', '<p>The bot is not directed at children under 13. We do not knowingly collect data from children.</p>'],
        ['Changes', '<p>If the bot processes data differently (for example through a new feature or a paid offer), we update this policy before the change takes effect. The version published here applies; the date at the top shows when it was last updated.</p>'],
      ],
    },
    todos: [
      'Before publishing: add the live bot\'s public @username to the subject line (the test bot is @enigma_sandbox_bot; the bot calls itself "Daily German" in src/format.ts) and bump "stand" in apps.config.json.',
      'Mini App section: keep it only if the live bot shows the "Flashcards üben" button (MINIAPP_LINK set, or CHANNEL_ID a numeric chat id; see src/cron.ts deckButton). Before that, give the Mini App a reset for its known-words list (CloudStorage key "known"), which /delete cannot reach, and name it in this section.',
      'Telegram is described as an independent controller, not a processor (the bot\'s docs/privacy-notice.md calls it a processor with SCC/DPF safeguards, which cannot be asserted for Telegram). Have the Art. 49(1)(b) GDPR transfer basis checked before publishing.',
      'Cloudflare: confirm that Cloudflare\'s Data Processing Addendum (part of its self-serve terms) covers the account that hosts the german-telegram Worker.',
    ],
  },
};

export { N as TOKEN };
