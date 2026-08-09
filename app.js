(() => {
  const world = document.getElementById('world');
  const entrance = document.getElementById('entrance');
  const property = document.getElementById('property');
  const cameraStage = document.getElementById('cameraStage');
  const enterButton = document.getElementById('enterButton');
  const backButton = document.getElementById('backButton');
  const closePanel = document.getElementById('closePanel');
  const interactionPanel = document.getElementById('interactionPanel');
  const interactionTitle = document.getElementById('interactionTitle');
  const interactionText = document.getElementById('interactionText');
  const hudTitle = document.getElementById('hudTitle');
  const hudNote = document.getElementById('hudNote');
  const travelStatus = document.getElementById('travelStatus');
  const nodes = document.querySelectorAll('.world-node');

  if (!world || !entrance || !property || !cameraStage || !enterButton || !backButton) return;

  let activeFocus = '';
  let travelTimer = null;

  const placeCopy = {
    skie: {
      title: 'SKIE 27',
      note: 'Skie connection point',
      text: 'This is the reserved SKIE 27 location. The approved truck/CB system will plug into this spot without rebuilding the rest of the property.'
    },
    hq: {
      title: 'Headquarters',
      note: 'Main building connection point',
      text: 'This is the reserved headquarters location. The approved Alaska Ice Crystals building will replace only this placeholder when you are ready.'
    },
    aurora: {
      title: 'Aurora',
      note: 'Aurora interaction point',
      text: 'This is Aurora’s reserved living interaction area. Her real approved appearance and behavior will be added here without changing the rest of the scene.'
    },
    workshop: {
      title: 'Workshop',
      note: 'Workshop connection point',
      text: 'This is the reserved workshop location. The final OSKO workshop asset can be inserted here later without disturbing the gate, road, or other approved pieces.'
    }
  };

  const clearFocus = () => {
    activeFocus = '';
    cameraStage.className = 'camera-stage';
    property.classList.remove('focused');
    interactionPanel.hidden = true;
    hudTitle.textContent = 'Alaska Ice Crystals';
    hudNote.textContent = 'Living property foundation';
    travelStatus.classList.remove('show');
    travelStatus.textContent = '';
    if (travelTimer) {
      clearTimeout(travelTimer);
      travelTimer = null;
    }
  };

  const enterProperty = () => {
    clearFocus();
    world.classList.add('inside');
    property.hidden = false;
    requestAnimationFrame(() => property.classList.add('active'));
  };

  const leaveProperty = () => {
    clearFocus();
    property.classList.remove('active');
    window.setTimeout(() => {
      property.hidden = true;
      world.classList.remove('inside');
    }, 300);
  };

  const travelTo = (focusKey) => {
    const copy = placeCopy[focusKey];
    if (!copy) return;

    activeFocus = focusKey;
    interactionPanel.hidden = true;
    property.classList.add('focused');
    cameraStage.className = `camera-stage focus-${focusKey} is-traveling`;
    travelStatus.textContent = `Moving to ${copy.title}…`;
    travelStatus.classList.add('show');
    hudTitle.textContent = copy.title;
    hudNote.textContent = copy.note;

    if (travelTimer) clearTimeout(travelTimer);
    travelTimer = window.setTimeout(() => {
      cameraStage.classList.remove('is-traveling');
      travelStatus.classList.remove('show');
      interactionTitle.textContent = copy.title;
      interactionText.textContent = copy.text;
      interactionPanel.hidden = false;
      travelTimer = null;
    }, 450);
  };

  enterButton.addEventListener('click', enterProperty);
  backButton.addEventListener('click', () => {
    if (activeFocus) {
      clearFocus();
      return;
    }
    leaveProperty();
  });

  closePanel?.addEventListener('click', clearFocus);

  nodes.forEach((node) => {
    node.addEventListener('click', () => {
      const focusKey = node.dataset.focus || '';
      travelTo(focusKey);
    });
  });
})();
