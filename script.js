
const beforeAfterData = {
  before: {
    image: './assets/fragmented-communication.png',
    alt: 'Fragmented emergency communication across multiple pages and platforms',
    title: 'Residents have to piece together updates on their own',
    text: 'In the fragmented model, alerts may point people to separate webpages, maps, or social posts. A warning exists, but the next steps still require searching and interpretation.',
    bullets: [
      'Multiple platforms to check',
      'Higher chance of confusion and delay',
      'No single page for instructions and bottled water access'
    ]
  },
  after: {
    image: './assets/waterready-hub.png',
    alt: 'Mockup of a centralized Atlanta WaterReady advisory hub',
    title: 'One page can make action clearer and faster',
    text: 'The proposed WaterReady hub brings together updates, address lookup, action steps, and pickup information in one place. Instead of forcing users to search, it guides them immediately.',
    bullets: [
      'Centralized updates with visible timestamps',
      'Address-based confirmation for residents',
      'Clearer instructions and easier bottled water access'
    ]
  }
};

const comparisonImage = document.getElementById('comparisonImage');
const comparisonTitle = document.getElementById('comparisonTitle');
const comparisonText = document.getElementById('comparisonText');
const comparisonList = document.getElementById('comparisonList');
const tabButtons = document.querySelectorAll('.tab-btn');

function setComparison(view) {
  const data = beforeAfterData[view];
  if (!data) return;

  comparisonImage.src = data.image;
  comparisonImage.alt = data.alt;
  comparisonTitle.textContent = data.title;
  comparisonText.textContent = data.text;
  comparisonList.innerHTML = data.bullets.map(item => `<li>${item}</li>`).join('');

  tabButtons.forEach(btn => {
    const active = btn.dataset.view === view;
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-selected', String(active));
  });
}

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => setComparison(btn.dataset.view));
});

const modal = document.getElementById('posterModal');
const openPoster = document.getElementById('openPoster');
const closePoster = document.getElementById('closePoster');
const closePosterButton = document.getElementById('closePosterButton');

function openModal() {
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

if (openPoster) openPoster.addEventListener('click', openModal);
if (closePoster) closePoster.addEventListener('click', closeModal);
if (closePosterButton) closePosterButton.addEventListener('click', closeModal);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('is-open')) {
    closeModal();
  }
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}
