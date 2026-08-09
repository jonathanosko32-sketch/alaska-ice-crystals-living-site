(() => {
  const world = document.getElementById('world');
  const entrance = document.getElementById('entrance');
  const property = document.getElementById('property');
  const enterButton = document.getElementById('enterButton');
  const backButton = document.getElementById('backButton');
  const interactionPanel = document.getElementById('interactionPanel');
  const interactionTitle = document.getElementById('interactionTitle');
  const interactionText = document.getElementById('interactionText');
  const nodes = document.querySelectorAll('.world-node');

  if (!world || !entrance || !property || !enterButton || !backButton) return;

  const enterProperty = () => {
    world.classList.add('inside');
    property.hidden = false;
    requestAnimationFrame(() => property.classList.add('active'));
  };

  const leaveProperty = () => {
    property.classList.remove('active');
    interactionPanel.hidden = true;
    window.setTimeout(() => {
      property.hidden = true;
      world.classList.remove('inside');
    }, 500);
  };

  enterButton.addEventListener('click', enterProperty);
  backButton.addEventListener('click', leaveProperty);

  nodes.forEach((node) => {
    node.addEventListener('click', () => {
      const place = node.dataset.place || 'Property node';
      interactionTitle.textContent = place;
      interactionText.textContent = `${place} is connected. The approved OSKO asset and its living behavior will be added here without replacing the rest of the world.`;
      interactionPanel.hidden = false;
    });
  });
})();
