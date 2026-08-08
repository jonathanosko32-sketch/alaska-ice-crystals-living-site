(() => {
  const world = document.getElementById('world');
  const button = document.getElementById('enterButton');
  const panel = document.getElementById('statusPanel');

  if (!world || !button || !panel) return;

  button.addEventListener('click', () => {
    const isOpen = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!isOpen));
    panel.hidden = isOpen;
    world.classList.toggle('awake', !isOpen);
    button.querySelector('span:last-child').textContent = isOpen
      ? 'Enter the Property'
      : 'Foundation Active';
  });
})();
