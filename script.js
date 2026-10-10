'use strict';
document.documentElement.classList.add('js');

// All content and contact links also work without JavaScript.
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  menuToggle.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
}
menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(expanded));
  navigation.classList.toggle('is-open', expanded);
});
navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('click', (event) => {
  if (!event.target.closest('.site-header')) closeMenu();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuToggle.focus();
  }
});
window.matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);
document.querySelector('#year').textContent = new Date().getFullYear();

// Keep the page useful without motion or scroll-triggered visibility effects.
if ('IntersectionObserver' in window) {
  const links = [...navigation.querySelectorAll('a[href^="#"]')];
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      links.forEach((link) => {
        if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
  }, { rootMargin: '-15% 0px -65% 0px', threshold: 0 });
  links.forEach((link) => {
    const section = document.querySelector(link.hash);
    if (section) observer.observe(section);
  });
}

const galleries = {
  topia: {
    title: 'Topia & Mosaic', category: 'Design Objects / Fliesen',
    description: 'Skulpturale Fliesen aus Hanf und mineralischen Bindemitteln. Topia bringt Struktur in Räume, Mosaic verbindet geometrische Oberflächen mit organischen Texturen. Material, Farbe und Anordnung eröffnen immer neue Möglichkeiten.',
    images: [
      ['topia', 'Sternförmige Komposition aus skulpturalen Topia-Fliesen'],
      ['topia-interior', 'Visualisierung der Topia-Fliesen im Innenraum'],
      ['mosaic', 'Geometrische Mosaic-Fliesen mit gefalteter Oberfläche'],
      ['mosaic-moss', 'Helle Mosaic-Fliesen in einer grünen Mooskomposition'],
    ],
  },
  lighting: {
    title: 'Lichtobjekte', category: 'Design Objects / Licht',
    description: 'Licht verändert, wie wir Material wahrnehmen. Diese Arbeiten erkunden das Zusammenspiel von Form, Oberfläche und Atmosphäre – als Teil einer offenen, experimentellen Designpraxis.',
    images: [['lighting', 'Rundes Lichtobjekt mit strukturierter, mineralischer Oberfläche']],
  },
  puzzling: {
    title: 'Puzzling Lights', category: 'Design Objects / Kerzenhalter',
    description: 'Einzeln ein Kerzenhalter, zusammen eine kleine Landschaft. Die handgefertigten Puzzleformen lassen sich immer wieder neu kombinieren und auch als skulpturale Untersetzer verwenden.',
    images: [['puzzling-lights', 'Zusammengesetzte, helle Puzzle-Kerzenhalter'], ['puzzling-detail', 'Einzelner Puzzling Lights Kerzenhalter'], ['puzzling-set', 'Anordnung mehrerer handgefertigter Kerzenhalter']],
  },
  domino: {
    title: 'Domino', category: 'Design Objects / Spiel',
    description: 'Ein vertrautes Spiel, neu materialisiert. Jeder handgefertigte Stein lädt zum Anfassen, Anlegen und Zusammenspielen ein. Kleine Objekte, die Menschen an einen Tisch bringen.',
    images: [['domino', 'Handgefertigte Dominosteine mit taktilen Oberflächen'], ['domino-box', 'Dominospiel in einer transparenten Aufbewahrungsbox']],
  },
  klang: {
    title: 'Klang Kiosk', category: 'Open Collaborations / Material × Musik',
    description: 'Wie klingt ein Material? Für Klang Kiosk entstanden handgefertigte Kastagnetten. Helle, gesprenkelte Oberflächen und rote Kordeln verbinden Materialforschung, Handwerk und musikalisches Spiel.',
    images: [['klang-kiosk', 'Kastagnetten mit roten Kordeln für Klang Kiosk'], ['klang-kiosk-portrait', 'Zwei Klang Kiosk Kastagnetten aus der Nähe'], ['klang-kiosk-detail', 'Detail der gesprenkelten Oberfläche und roten Kordel']],
  },
  trophies: {
    title: 'Forum Kreislaufwirtschaft', category: 'Open Collaborations / Trophy Design',
    description: 'Individuell gestaltete und handgefertigte Trophäen für das Forum Kreislaufwirtschaft. Ein Materialexperiment wird zum Zeichen der Wertschätzung – mit Sorgfalt entwickelt, geformt und gefertigt.',
    images: [['trophies', 'Skulpturales Trophy Design für das Forum Kreislaufwirtschaft'], ['trophies-detail', 'Detail einer handgefertigten Trophäe']],
  },
};

const dialog = document.querySelector('#gallery-dialog');
const galleryImage = document.querySelector('#gallery-image');
const galleryCount = document.querySelector('#gallery-count');
let activeGallery;
let activeIndex = 0;
let galleryTrigger;

function showImage(index) {
  activeIndex = (index + activeGallery.images.length) % activeGallery.images.length;
  const [file, description] = activeGallery.images[activeIndex];
  galleryImage.src = `assets/images/${file}.webp`;
  galleryImage.alt = description;
  galleryCount.textContent = `${activeIndex + 1} / ${activeGallery.images.length}`;
}

document.querySelectorAll('[data-gallery]').forEach((trigger) => {
  trigger.addEventListener('click', (event) => {
    // Modified clicks retain normal image-link behavior.
    if (!dialog.showModal || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    activeGallery = galleries[trigger.dataset.gallery];
    galleryTrigger = trigger;
    document.querySelector('#gallery-title').textContent = activeGallery.title;
    document.querySelector('#gallery-category').textContent = activeGallery.category;
    document.querySelector('#gallery-description').textContent = activeGallery.description;
    document.querySelector('#gallery-inquiry').href = `mailto:sarah@orbmatter.ch?subject=${encodeURIComponent(`Anfrage: ${activeGallery.title}`)}`;
    document.querySelector('#gallery-prev').disabled = activeGallery.images.length < 2;
    document.querySelector('#gallery-next').disabled = activeGallery.images.length < 2;
    showImage(0);
    dialog.showModal();
    document.body.classList.add('modal-open');
    dialog.querySelector('.dialog-close').focus();
  });
});
document.querySelector('#gallery-prev').addEventListener('click', () => showImage(activeIndex - 1));
document.querySelector('#gallery-next').addEventListener('click', () => showImage(activeIndex + 1));
dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
dialog.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault();
    showImage(activeIndex + (event.key === 'ArrowRight' ? 1 : -1));
  }
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  galleryTrigger?.focus({ preventScroll: true });
});

function openLegal() {
  if (window.location.hash === '#impressum') document.querySelector('#impressum').open = true;
}
document.querySelector('#legal-link').addEventListener('click', () => { document.querySelector('#impressum').open = true; });
window.addEventListener('hashchange', openLegal);
openLegal();
