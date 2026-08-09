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

  /* v0.7.9 LOOK-AROUND VIEWER
     Viewing tool only: it changes the cameraStage presentation, never the
     underlying gate/pillar/cattle-guard geometry. */
  const viewerStyle = document.createElement('style');
  viewerStyle.textContent = `
    .camera-stage{transform-origin:50% 50%;will-change:translate,scale;transition:translate .18s ease,scale .18s ease}
    .look-toggle{position:fixed;z-index:60;right:14px;bottom:84px;border:1px solid rgba(91,235,255,.75);border-radius:18px;padding:9px 13px;background:rgba(3,24,38,.9);color:#dffcff;font-weight:900;letter-spacing:.08em;box-shadow:0 0 14px rgba(65,224,255,.25)}
    .look-controls{position:fixed;z-index:61;right:12px;bottom:128px;width:174px;padding:10px;border:1px solid rgba(91,235,255,.58);border-radius:18px;background:rgba(2,18,31,.94);box-shadow:0 12px 30px rgba(0,0,0,.45),0 0 18px rgba(65,224,255,.18);backdrop-filter:blur(8px)}
    .look-controls[hidden]{display:none}
    .look-title{display:block;margin:0 0 7px;text-align:center;color:#8fefff;font-size:.72rem;font-weight:900;letter-spacing:.12em}
    .look-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}
    .look-grid button{min-height:40px;border:1px solid rgba(103,235,255,.42);border-radius:11px;background:rgba(19,57,77,.92);color:#fff;font-size:1.05rem;font-weight:900;box-shadow:inset 0 0 10px rgba(94,225,255,.08)}
    .look-grid button:active{background:rgba(37,101,126,.96)}
    .look-wide{grid-column:span 3;font-size:.75rem!important;letter-spacing:.06em}
    .look-readout{display:block;text-align:center;margin-top:7px;color:#b9eaf2;font-size:.68rem}
    @media(max-width:520px){.look-toggle{right:10px;bottom:76px}.look-controls{right:8px;bottom:118px;width:162px}.look-grid button{min-height:38px}}
    @media(orientation:landscape) and (max-height:600px){.look-toggle{right:72px;bottom:16px}.look-controls{right:70px;bottom:58px;width:186px}.look-grid button{min-height:34px}.look-title{font-size:.64rem}}
  `;
  document.head.appendChild(viewerStyle);

  const lookToggle = document.createElement('button');
  lookToggle.type = 'button';
  lookToggle.className = 'look-toggle';
  lookToggle.textContent = 'VIEW';
  lookToggle.setAttribute('aria-expanded', 'false');

  const lookControls = document.createElement('div');
  lookControls.className = 'look-controls';
  lookControls.hidden = true;
  lookControls.innerHTML = `
    <span class="look-title">LOOK AROUND</span>
    <div class="look-grid">
      <span></span><button type="button" data-look="up" aria-label="Look up">▲</button><span></span>
      <button type="button" data-look="left" aria-label="Look left">◀</button><button type="button" data-look="reset" aria-label="Reset view">●</button><button type="button" data-look="right" aria-label="Look right">▶</button>
      <span></span><button type="button" data-look="down" aria-label="Look down">▼</button><span></span>
      <button type="button" data-look="out">− ZOOM</button><button type="button" data-look="in">+ ZOOM</button><button type="button" data-look="wide">WIDE</button>
    </div>
    <span class="look-readout" id="lookReadout">Center • 100%</span>
  `;
  property.appendChild(lookToggle);
  property.appendChild(lookControls);

  let viewX = 0;
  let viewY = 0;
  let viewZoom = 1;
  const lookReadout = lookControls.querySelector('#lookReadout');

  const applyView = () => {
    cameraStage.style.translate = `${viewX}px ${viewY}px`;
    cameraStage.style.scale = String(viewZoom);
    if (lookReadout) lookReadout.textContent = `X ${viewX} • Y ${viewY} • ${Math.round(viewZoom * 100)}%`;
  };

  const resetView = () => {
    viewX = 0;
    viewY = 0;
    viewZoom = 1;
    applyView();
  };

  lookToggle.addEventListener('click', () => {
    lookControls.hidden = !lookControls.hidden;
    lookToggle.setAttribute('aria-expanded', String(!lookControls.hidden));
    lookToggle.textContent = lookControls.hidden ? 'VIEW' : 'CLOSE VIEW';
  });

  lookControls.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-look]');
    if (!button) return;
    const action = button.dataset.look;
    const step = 34;
    if (action === 'left') viewX += step;
    if (action === 'right') viewX -= step;
    if (action === 'up') viewY += step;
    if (action === 'down') viewY -= step;
    if (action === 'in') viewZoom = Math.min(1.55, +(viewZoom + .10).toFixed(2));
    if (action === 'out') viewZoom = Math.max(.65, +(viewZoom - .10).toFixed(2));
    if (action === 'wide') { viewX = 0; viewY = 0; viewZoom = .72; }
    if (action === 'reset') resetView();
    else applyView();
  });

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
    resetView();
    world.classList.add('inside');
    property.hidden = false;
    lookToggle.hidden = false;
    requestAnimationFrame(() => property.classList.add('active'));
  };

  const leaveProperty = () => {
    clearFocus();
    resetView();
    lookControls.hidden = true;
    lookToggle.textContent = 'VIEW';
    lookToggle.setAttribute('aria-expanded', 'false');
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

  const stamp = document.querySelector('.build-stamp');
  if (stamp) stamp.textContent = 'AIC Living Site • v0.7.9';
})();
