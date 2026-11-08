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
};

export { N as TOKEN };
