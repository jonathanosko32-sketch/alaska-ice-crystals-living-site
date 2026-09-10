(() => {
  const hqNode = document.querySelector('.world-node.node-hq');
  const panel = document.getElementById('interactionPanel');
  const title = document.getElementById('interactionTitle');
  if (!hqNode || !panel || !title) return;

  const LIBRARY_URL = 'TEST/v213-hq-master-library-standalone.html';

  function ensureLibraryButton() {
    let button = document.getElementById('hqLibraryButton');
    if (!button) {
      button = document.createElement('a');
      button.id = 'hqLibraryButton';
      button.href = LIBRARY_URL;
      button.textContent = 'OPEN SCHOOL / HQ LIBRARY';
      button.setAttribute('aria-label', 'Open Alaska Ice Crystals School HQ Master Library');
      button.style.display = 'block';
      button.style.margin = '14px 0 4px';
      button.style.padding = '12px 14px';
      button.style.border = '2px solid rgba(111,231,255,.78)';
      button.style.borderRadius = '14px';
      button.style.background = 'linear-gradient(135deg,#0b4052,#12657b)';
      button.style.color = '#fff';
      button.style.fontWeight = '900';
      button.style.textAlign = 'center';
      button.style.textDecoration = 'none';
      button.style.boxShadow = '0 10px 24px rgba(0,0,0,.28),0 0 16px rgba(86,221,255,.16)';
      panel.insertBefore(button, panel.querySelector('.close-panel'));
    }
    button.hidden = title.textContent.trim().toLowerCase() !== 'headquarters';
  }

  hqNode.addEventListener('click', () => setTimeout(ensureLibraryButton, 0));
  document.querySelectorAll('.world-node').forEach((node) => {
    if (node !== hqNode) node.addEventListener('click', () => setTimeout(ensureLibraryButton, 0));
  });

  const observer = new MutationObserver(ensureLibraryButton);
  observer.observe(title, { childList: true, characterData: true, subtree: true });
})();
