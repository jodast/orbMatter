OrbMatter Website
-------

# Ziel der Webseite

OrbMatter als Designpraxis und nicht nur als Portfolio präsentieren

Angebote auf den ersten Blick verständlich machen

Besucher zur Teilnahme, Zusammenarbeit oder Kontaktaufnahme einladen

Klare Navigation, starke Bilder, wenig Text

# Allgemein

Professionelle, übersichtliche und intuitive Gestaltung.

Klar kommunizieren, was OrbMatter ist und anbietet.

Philosophie stärker hervorheben: regenerative Materialien, Ressourcenschonung, Materialexperimente, Wissensvermittlung 

Drei Hauptbereiche klar voneinander unterscheiden

1. Workshops & Education

Private Workshops für Einzelpersonen

Gruppenworkshops für Teams, Unternehmen und Organisationen

Modulare Bildungsangebote für Schulen und Hochschulen

Anpassbar an Zielgruppe, Dauer und Lernziele

Workshopbeschreibungen, Bilder und direkte Anfragemöglichkeit

2. Design Objects

Eigene Designobjekte und Materialentwicklungen präsentieren

Lampen, Tiles, Kerzenhalter, Dominosteine

Fokus auf regenerative Materialien, Gestaltung und Herstellungsprozesse

Hochwertige Produktbilder und kurze Beschreibungen

3. Open Collaborations

Kreative Zusammenarbeit mit Künstler, Designer und Institutionen

Bisherige Projekte als Referenzen:

Klang Kiosk (Kastagnetten -> Bilder in newAssets folder)

Trophy Designs für Forum Kreislaufwirtschaft

Offenheit für neue Kooperationen kommunizieren

Kontaktmöglichkeit für Projektanfragen

# Technik & Veröffentlichung

Die Website besteht aus statischem HTML, CSS und JavaScript. Es ist kein Build nötig.
GitHub Pages kann direkt aus dem Repository-Hauptverzeichnis veröffentlichen;
`.nojekyll` ist bereits vorhanden. Lokal lässt sich `index.html` direkt öffnen
oder mit `python3 -m http.server 4173` ansehen.

## SEO & öffentliche Adressen

Die öffentliche Adresse ist auf **https://www.orbmatter.ch/** vorbereitet.
Bei einer anderen endgültigen Domain müssen die absoluten URLs in `index.html`
(Canonical, Social-Media-Metadaten und JSON-LD), `robots.txt`, `sitemap.xml` und
`404.html` angepasst werden. Die Domain und HTTPS werden separat in GitHub Pages
und beim DNS-Anbieter eingerichtet.

- `robots.txt` erlaubt das Crawlen und verweist auf `sitemap.xml`.
- Die Sitemap enthält nur die Startseite: Abschnittsanker sind keine eigenen Seiten.
- `index.html` enthält Suchmaschinen-Metadaten, Open Graph, Twitter Cards und
  strukturierte Daten für die Designpraxis und die Website.
- `assets/social-preview.png` ist das 1200 × 630 px grosse Vorschaubild beim Teilen.
  Die bearbeitbare HTML-Vorlage liegt in `scripts/social-preview.html`.
- `assets/images/orbMatter_logo.png`, die daraus abgeleiteten PNG-Icons,
  `favicon.ico` und `site.webmanifest`
  stellen passende Symbole für Browser und gespeicherte Verknüpfungen bereit.
- `404.html` bietet eine gestaltete Fehlerseite mit Rückweg zur Startseite.

Nach der Veröffentlichung die Domain in Google Search Console bestätigen und
`https://www.orbmatter.ch/sitemap.xml` einreichen. Bei Hosting unter einer
GitHub-Projektadresse wie `username.github.io/repository/` liegt `robots.txt`
nicht am Host-Stamm; die Sitemap lässt sich trotzdem direkt einreichen.

Die Originalbilder bleiben lokal in `assets/originals/` und werden durch
`.gitignore` ausgeschlossen. Optimierte Kopien aller Bilder liegen in
`assets/library/`, die tatsächlich verwendeten Bildgrössen in `assets/images/`.
`python3 scripts/prepare_images.py` erzeugt sie bei Bedarf neu (benötigt Pillow).
