function initReveal(selector) {
const items = document.querySelectorAll(selector);
items.forEach((item) => {
item.setAttribute('data-reveal', '');
const position = Array.from(item.parentNode.children).indexOf(item);
item.style.transitionDelay = `${(position % 3) * 0.12}s`;
});
const reveal = (item) => {
item.classList.add('is-visible');
setTimeout(() => (item.style.transitionDelay = '0s'), 1600);
};
if (!('IntersectionObserver' in window)) {
items.forEach(reveal);
return;
}
const observer = new IntersectionObserver(
(entries) => {
entries.forEach((entry) => {
if (entry.isIntersecting) {
reveal(entry.target);
observer.unobserve(entry.target);
}
});
},
{ threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
);
items.forEach((item) => observer.observe(item));
}
function initNavbarShadow() {
const navbar = document.querySelector('.navbar');
const update = () => navbar.classList.toggle('is-scrolled', window.scrollY > 20);
update();
window.addEventListener('scroll', update, { passive: true });
}
function initTracking() {
document.addEventListener('click', (event) => {
const element = event.target.closest('[data-track]');
if (!element || !window.track) return;
const project = element.closest('.project');
window.track(element.dataset.track, {
link_text: element.textContent.trim().slice(0, 60),
project: project ? project.querySelector('.project__title').textContent : undefined,
});
});
}
function initMobileMenu() {
const navbar = document.querySelector('.navbar');
const toggle = navbar && navbar.querySelector('.navbar__toggle');
if (!toggle) return;
const menu = navbar.querySelector('.navbar__menu');
function setOpen(open, returnFocus) {
navbar.classList.toggle('is-open', open);
toggle.setAttribute('aria-expanded', String(open));
toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
if (open) menu.querySelector('a').focus();
else if (returnFocus) toggle.focus();
}
toggle.addEventListener('click', () => setOpen(!navbar.classList.contains('is-open')));
menu.addEventListener('click', (event) => { if (event.target.closest('a')) setOpen(false); });
document.addEventListener('click', (event) => {
if (navbar.classList.contains('is-open') && !navbar.contains(event.target)) setOpen(false);
});
document.addEventListener('keydown', (event) => {
if (event.key === 'Escape' && navbar.classList.contains('is-open')) setOpen(false, true);
});
window.matchMedia('(min-width: 1025px)').addEventListener('change', (event) => { if (event.matches) setOpen(false); });
}
const WHATSAPP_NUMBER = '919794982969';
const WHATSAPP_MESSAGES = {
buy: 'I want to buy this student project listed on AtriBotix website. Please share details.',
apply: 'Hi, I would like to apply for ASIP.',
contact: '',
};
function whatsappUrl(kind) {
const message = WHATSAPP_MESSAGES[kind] || '';
return `https://wa.me/${WHATSAPP_NUMBER}` + (message ? `?text=${encodeURIComponent(message)}` : '');
}
function openWhatsApp(url) {
const popup = window.open(url, '_blank');
if (popup) { popup.opener = null; return; }
try { window.top.location.href = url; } catch (error) {  }
}
function initWhatsApp() {
document.querySelectorAll('[data-whatsapp]').forEach((link) => {
const url = whatsappUrl(link.dataset.whatsapp);
link.href = url;
link.target = '_blank';
link.rel = 'noopener';
const note = document.createElement('p');
note.className = 'whatsapp-note';
note.setAttribute('role', 'status');
link.insertAdjacentElement('afterend', note);
link.addEventListener('click', (event) => {
event.preventDefault();
note.textContent = '';
openWhatsApp(url);
setTimeout(() => {
if (document.visibilityState === 'visible') {
note.textContent = `If WhatsApp did not open, please message us on +${WHATSAPP_NUMBER.slice(0, 2)} ${WHATSAPP_NUMBER.slice(2)}.`;
}
}, 1200);
});
});
}
initNavbarShadow();
initWhatsApp();
initMobileMenu();
initTracking();
