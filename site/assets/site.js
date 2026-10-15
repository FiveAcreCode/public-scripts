const demo = document.querySelector('[data-demo]');
const toggle = document.querySelector('[data-demo-toggle]');
const status = document.querySelector('[data-demo-status]');

if (demo && toggle && status) {
  toggle.addEventListener('click', () => {
    const hidden = toggle.getAttribute('aria-pressed') !== 'true';

    toggle.setAttribute('aria-pressed', String(hidden));
    demo.classList.toggle('is-hidden', hidden);
    status.textContent = hidden
      ? 'The floating prompt is hidden.'
      : 'The floating prompt is visible.';
  });
}
