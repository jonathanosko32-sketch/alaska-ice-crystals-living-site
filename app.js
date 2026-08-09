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
    skie: { title:'SKIE 27', note:'Skie connection point', text:'This is the reserved SKIE 27 location. The approved truck/CB system will plug into this spot without rebuilding the rest of the property.' },
    hq: { title:'Headquarters', note:'Main building connection point', text:'This is the reserved headquarters location. The approved Alaska Ice Crystals building will replace only this placeholder when you are ready.' },
    aurora: { title:'Aurora', note:'Aurora interaction point', text:'This is Aurora’s reserved living interaction area. Her real approved appearance and behavior will be added here without changing the rest of the scene.' },
    workshop: { title:'Workshop', note:'Workshop connection point', text:'This is the reserved workshop location. The final OSKO workshop asset can be inserted here later without disturbing the gate, road, or other approved pieces.' }
  };

  /* v0.8.2 360 PROPERTY VIEWER FOUNDATION.
     This rotates the VIEW CAMERA, not the approved property geometry.
     Current property is still 2.5D; future property sectors can be attached to
     headings around the full 360-degree compass without replacing this control. */
  const viewerStyle = document.createElement('style');
  viewerStyle.textContent = `
    .camera-stage{transform-origin:50% 50%;will-change:translate,scale;transition:translate .12s ease,scale .12s ease}
    .property.viewer-360-active .camera-stage{cursor:grab;touch-action:none}
    .property.viewer-360-active .camera-stage.dragging{cursor:grabbing;transition:none}
    .look-toggle{position:fixed;z-index:60;right:14px;bottom:84px;border:1px solid rgba(91,235,255,.75);border-radius:18px;padding:9px 13px;background:rgba(3,24,38,.9);color:#dffcff;font-weight:900;letter-spacing:.08em;box-shadow:0 0 14px rgba(65,224,255,.25)}
    .look-controls{position:fixed;z-index:61;right:12px;bottom:128px;width:190px;padding:10px;border:1px solid rgba(91,235,255,.58);border-radius:18px;background:rgba(2,18,31,.94);box-shadow:0 12px 30px rgba(0,0,0,.45),0 0 18px rgba(65,224,255,.18);backdrop-filter:blur(8px)}
    .look-controls[hidden]{display:none}.look-title{display:block;margin:0 0 7px;text-align:center;color:#8fefff;font-size:.72rem;font-weight:900;letter-spacing:.12em}
    .look-compass{display:block;text-align:center;margin:2px 0 8px;color:#fff;font-size:.78rem;font-weight:900}.look-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}
    .look-grid button{min-height:40px;border:1px solid rgba(103,235,255,.42);border-radius:11px;background:rgba(19,57,77,.92);color:#fff;font-size:1rem;font-weight:900}.look-grid button:active{background:rgba(37,101,126,.96)}
    .look-wide{grid-column:span 3;font-size:.72rem!important}.look-readout,.look-help{display:block;text-align:center;margin-top:7px;color:#b9eaf2;font-size:.66rem}.look-help{color:#8fdbe8}
    @media(max-width:520px){.look-toggle{right:10px;bottom:76px}.look-controls{right:8px;bottom:118px;width:178px}.look-grid button{min-height:38px}}
    @media(orientation:landscape) and (max-height:600px){.look-toggle{right:72px;bottom:16px}.look-controls{right:70px;bottom:58px;width:194px}.look-grid button{min-height:34px}}
  `;
  document.head.appendChild(viewerStyle);

  const lookToggle = document.createElement('button');
  lookToggle.type='button'; lookToggle.className='look-toggle'; lookToggle.textContent='VIEW 360°'; lookToggle.setAttribute('aria-expanded','false');
  const lookControls=document.createElement('div');
  lookControls.className='look-controls'; lookControls.hidden=true;
  lookControls.innerHTML=`<span class="look-title">360° PROPERTY VIEW</span><span class="look-compass" id="lookCompass">GATE • 0°</span><div class="look-grid"><span></span><button type="button" data-look="up">▲</button><span></span><button type="button" data-look="left">◀</button><button type="button" data-look="reset">GATE</button><button type="button" data-look="right">▶</button><span></span><button type="button" data-look="down">▼</button><span></span><button type="button" data-look="out">−</button><button type="button" data-look="in">+</button><button type="button" data-look="wide">WIDE</button></div><span class="look-readout" id="lookReadout">0° • 100%</span><span class="look-help">Drag the property left/right to turn 360°</span>`;
  property.appendChild(lookToggle); property.appendChild(lookControls);

  let heading=0, viewY=0, viewZoom=1, dragging=false, startX=0, startY=0, startHeading=0, startViewY=0;
  const lookReadout=lookControls.querySelector('#lookReadout'); const lookCompass=lookControls.querySelector('#lookCompass');
  const normalize=(deg)=>((deg%360)+360)%360;
  const sectorName=(deg)=>{ const d=normalize(deg); if(d<45||d>=315)return 'GATE'; if(d<135)return 'RIGHT PROPERTY'; if(d<225)return 'BACK PROPERTY'; return 'LEFT PROPERTY'; };
  const headingOffset=()=>{ const d=((normalize(heading)+180)%360)-180; return -(d/180)*Math.max(window.innerWidth*.72,260); };
  const applyView=()=>{ const x=headingOffset(); cameraStage.style.translate=`${x}px ${viewY}px`; cameraStage.style.scale=String(viewZoom); if(lookCompass)lookCompass.textContent=`${sectorName(heading)} • ${Math.round(normalize(heading))}°`; if(lookReadout)lookReadout.textContent=`${Math.round(normalize(heading))}° • ${Math.round(viewZoom*100)}%`; };
  const resetView=()=>{ heading=0; viewY=0; viewZoom=1; applyView(); };

  lookToggle.addEventListener('click',()=>{ lookControls.hidden=!lookControls.hidden; property.classList.toggle('viewer-360-active',!lookControls.hidden); lookToggle.setAttribute('aria-expanded',String(!lookControls.hidden)); lookToggle.textContent=lookControls.hidden?'VIEW 360°':'CLOSE 360°'; });
  lookControls.addEventListener('click',(event)=>{ const b=event.target.closest('button[data-look]'); if(!b)return; const a=b.dataset.look; if(a==='left')heading-=15; if(a==='right')heading+=15; if(a==='up')viewY+=28; if(a==='down')viewY-=28; if(a==='in')viewZoom=Math.min(1.55,+(viewZoom+.1).toFixed(2)); if(a==='out')viewZoom=Math.max(.62,+(viewZoom-.1).toFixed(2)); if(a==='wide'){viewY=0;viewZoom=.72;} if(a==='reset')resetView(); else applyView(); });

  cameraStage.addEventListener('pointerdown',(e)=>{ if(lookControls.hidden)return; dragging=true; startX=e.clientX; startY=e.clientY; startHeading=heading; startViewY=viewY; cameraStage.classList.add('dragging'); cameraStage.setPointerCapture?.(e.pointerId); });
  cameraStage.addEventListener('pointermove',(e)=>{ if(!dragging)return; heading=startHeading+(e.clientX-startX)*.42; viewY=Math.max(-180,Math.min(180,startViewY+(e.clientY-startY))); applyView(); });
  const endDrag=(e)=>{ if(!dragging)return; dragging=false; cameraStage.classList.remove('dragging'); try{cameraStage.releasePointerCapture?.(e.pointerId);}catch(_){} };
  cameraStage.addEventListener('pointerup',endDrag); cameraStage.addEventListener('pointercancel',endDrag);

  const clearFocus=()=>{ activeFocus=''; cameraStage.className='camera-stage'; property.classList.remove('focused'); interactionPanel.hidden=true; hudTitle.textContent='Alaska Ice Crystals'; hudNote.textContent='Living property foundation'; travelStatus.classList.remove('show'); travelStatus.textContent=''; if(travelTimer){clearTimeout(travelTimer);travelTimer=null;} applyView(); };
  const enterProperty=()=>{ clearFocus(); resetView(); world.classList.add('inside'); property.hidden=false; lookToggle.hidden=false; requestAnimationFrame(()=>property.classList.add('active')); };
  const leaveProperty=()=>{ clearFocus(); resetView(); lookControls.hidden=true; property.classList.remove('viewer-360-active'); lookToggle.textContent='VIEW 360°'; lookToggle.setAttribute('aria-expanded','false'); property.classList.remove('active'); window.setTimeout(()=>{property.hidden=true;world.classList.remove('inside');},300); };
  const travelTo=(focusKey)=>{ const copy=placeCopy[focusKey]; if(!copy)return; activeFocus=focusKey; interactionPanel.hidden=true; property.classList.add('focused'); cameraStage.className=`camera-stage focus-${focusKey} is-traveling`; travelStatus.textContent=`Moving to ${copy.title}…`; travelStatus.classList.add('show'); hudTitle.textContent=copy.title; hudNote.textContent=copy.note; if(travelTimer)clearTimeout(travelTimer); travelTimer=window.setTimeout(()=>{cameraStage.classList.remove('is-traveling');travelStatus.classList.remove('show');interactionTitle.textContent=copy.title;interactionText.textContent=copy.text;interactionPanel.hidden=false;travelTimer=null;},450); };
  enterButton.addEventListener('click',enterProperty); backButton.addEventListener('click',()=>{if(activeFocus){clearFocus();return;}leaveProperty();}); closePanel?.addEventListener('click',clearFocus); nodes.forEach(node=>node.addEventListener('click',()=>travelTo(node.dataset.focus||'')));
  const stamp=document.querySelector('.build-stamp'); if(stamp)stamp.textContent='AIC Living Site • v0.8.2';
})();
