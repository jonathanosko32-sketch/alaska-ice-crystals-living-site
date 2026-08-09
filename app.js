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

  /* v0.8.3 360 PROPERTY WORLD FOUNDATION.
     Entrance geometry remains untouched. Three new view sectors are added around
     the existing gate sector so the 360 viewer now has real property foundation
     to turn toward: right property, back property, and left property. */
  const viewerStyle = document.createElement('style');
  viewerStyle.textContent = `
    .camera-stage{transform-origin:50% 50%;will-change:translate,scale,opacity;transition:translate .12s ease,scale .12s ease,opacity .16s ease}
    .property.viewer-360-active .camera-stage{cursor:grab;touch-action:none}
    .property.viewer-360-active .camera-stage.dragging{cursor:grabbing;transition:none}
    .look-toggle{position:fixed;z-index:60;right:14px;bottom:84px;border:1px solid rgba(91,235,255,.75);border-radius:18px;padding:9px 13px;background:rgba(3,24,38,.9);color:#dffcff;font-weight:900;letter-spacing:.08em;box-shadow:0 0 14px rgba(65,224,255,.25)}
    .look-controls{position:fixed;z-index:61;right:12px;bottom:128px;width:190px;padding:10px;border:1px solid rgba(91,235,255,.58);border-radius:18px;background:rgba(2,18,31,.94);box-shadow:0 12px 30px rgba(0,0,0,.45),0 0 18px rgba(65,224,255,.18);backdrop-filter:blur(8px)}
    .look-controls[hidden]{display:none}.look-title{display:block;margin:0 0 7px;text-align:center;color:#8fefff;font-size:.72rem;font-weight:900;letter-spacing:.12em}
    .look-compass{display:block;text-align:center;margin:2px 0 8px;color:#fff;font-size:.78rem;font-weight:900}.look-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}
    .look-grid button{min-height:40px;border:1px solid rgba(103,235,255,.42);border-radius:11px;background:rgba(19,57,77,.92);color:#fff;font-size:1rem;font-weight:900}.look-grid button:active{background:rgba(37,101,126,.96)}
    .look-wide{grid-column:span 3;font-size:.72rem!important}.look-readout,.look-help{display:block;text-align:center;margin-top:7px;color:#b9eaf2;font-size:.66rem}.look-help{color:#8fdbe8}

    .sector-world{position:absolute;inset:0;z-index:5;pointer-events:none;overflow:hidden}
    .property-sector{position:absolute;inset:0;opacity:0;transform-origin:50% 58%;transition:opacity .16s ease,transform .16s ease;overflow:hidden}
    .sector-sky{position:absolute;inset:0 0 42%;background:linear-gradient(180deg,rgba(3,13,28,.12),rgba(5,31,48,.64));border-bottom:1px solid rgba(116,230,255,.12)}
    .sector-ground{position:absolute;left:-15%;right:-15%;bottom:-12%;height:62%;background:linear-gradient(180deg,rgba(17,45,53,.48),rgba(5,23,34,.96));clip-path:polygon(12% 0,88% 0,100% 100%,0 100%)}
    .sector-road{position:absolute;left:50%;bottom:-10%;width:min(70vw,520px);height:58%;transform:translateX(-50%);clip-path:polygon(41% 0,59% 0,100% 100%,0 100%);background:linear-gradient(90deg,transparent 49%,rgba(100,229,255,.22) 49.5% 50.5%,transparent 51%),linear-gradient(180deg,rgba(70,86,94,.35),rgba(12,29,39,.92));box-shadow:inset 0 0 28px rgba(75,226,255,.08)}
    .sector-fence{position:absolute;bottom:22%;width:34%;height:82px;opacity:.72}
    .sector-fence.left{left:-2%;transform:perspective(240px) rotateY(30deg)}.sector-fence.right{right:-2%;transform:perspective(240px) rotateY(-30deg)}
    .sector-fence i{display:block;height:5px;margin:14px 0;border-radius:5px;background:linear-gradient(90deg,rgba(50,198,221,.22),rgba(121,241,255,.76),rgba(55,184,214,.22));box-shadow:0 0 8px rgba(71,218,243,.18)}
    .sector-title{position:absolute;top:16%;left:50%;transform:translateX(-50%);padding:8px 14px;border:1px solid rgba(104,231,255,.28);border-radius:999px;background:rgba(2,18,31,.58);color:#9cefff;font-size:.68rem;font-weight:900;letter-spacing:.13em;white-space:nowrap}
    .sector-zone{position:absolute;min-width:104px;padding:10px 12px;border:1px solid rgba(111,231,255,.28);border-radius:13px;background:rgba(4,27,40,.66);color:#dffaff;text-align:center;box-shadow:0 8px 20px rgba(0,0,0,.25),inset 0 0 14px rgba(86,221,255,.05)}
    .sector-zone strong{display:block;font-size:.72rem;letter-spacing:.06em}.sector-zone span{display:block;margin-top:3px;color:#85dcea;font-size:.55rem;letter-spacing:.06em}
    .sector-zone.primary{left:50%;top:44%;transform:translateX(-50%);min-width:138px;padding:14px}
    .sector-zone.left-zone{left:8%;top:57%}.sector-zone.right-zone{right:8%;top:57%}
    .sector-crystal{position:absolute;top:36%;left:50%;width:18px;height:24px;transform:translateX(-50%);clip-path:polygon(50% 0,88% 34%,76% 100%,24% 100%,12% 34%);background:linear-gradient(135deg,#d9fbff,#31cfe9 48%,#5566ff);box-shadow:0 0 16px rgba(73,224,255,.62)}
    .sector-back .sector-ground{background:linear-gradient(180deg,rgba(21,53,60,.5),rgba(7,24,33,.97))}
    .sector-left .sector-ground{background:linear-gradient(180deg,rgba(31,54,57,.48),rgba(8,25,31,.97))}
    .sector-right .sector-ground{background:linear-gradient(180deg,rgba(21,49,61,.5),rgba(6,23,34,.97))}

    @media(max-width:520px){.look-toggle{right:10px;bottom:76px}.look-controls{right:8px;bottom:118px;width:178px}.look-grid button{min-height:38px}.sector-zone{min-width:92px;padding:8px}.sector-zone.primary{min-width:122px}.sector-zone.left-zone{left:4%}.sector-zone.right-zone{right:4%}}
    @media(orientation:landscape) and (max-height:600px){.look-toggle{right:72px;bottom:16px}.look-controls{right:70px;bottom:58px;width:194px}.look-grid button{min-height:34px}.sector-title{top:12%}.sector-zone.primary{top:38%}.sector-zone.left-zone,.sector-zone.right-zone{top:55%}}
  `;
  document.head.appendChild(viewerStyle);

  const sectorWorld = document.createElement('div');
  sectorWorld.className = 'sector-world';
  sectorWorld.setAttribute('aria-hidden','true');
  sectorWorld.innerHTML = `
    <section class="property-sector sector-right" data-sector="right">
      <div class="sector-sky"></div><div class="sector-ground"></div><div class="sector-road"></div>
      <div class="sector-fence left"><i></i><i></i><i></i></div><div class="sector-fence right"><i></i><i></i><i></i></div>
      <div class="sector-title">RIGHT PROPERTY • 90°</div><div class="sector-crystal"></div>
      <div class="sector-zone primary"><strong>WORKSHOP</strong><span>reserved build zone</span></div>
      <div class="sector-zone left-zone"><strong>TRUCK YARD</strong><span>parking • service</span></div>
      <div class="sector-zone right-zone"><strong>FREIGHT AREA</strong><span>future expansion</span></div>
    </section>
    <section class="property-sector sector-back" data-sector="back">
      <div class="sector-sky"></div><div class="sector-ground"></div><div class="sector-road"></div>
      <div class="sector-fence left"><i></i><i></i><i></i></div><div class="sector-fence right"><i></i><i></i><i></i></div>
      <div class="sector-title">BACK PROPERTY • 180°</div><div class="sector-crystal"></div>
      <div class="sector-zone primary"><strong>HEADQUARTERS</strong><span>main ranch center</span></div>
      <div class="sector-zone left-zone"><strong>CAMPFIRE</strong><span>everyday life</span></div>
      <div class="sector-zone right-zone"><strong>STORE / MONEY</strong><span>future commerce</span></div>
    </section>
    <section class="property-sector sector-left" data-sector="left">
      <div class="sector-sky"></div><div class="sector-ground"></div><div class="sector-road"></div>
      <div class="sector-fence left"><i></i><i></i><i></i></div><div class="sector-fence right"><i></i><i></i><i></i></div>
      <div class="sector-title">LEFT PROPERTY • 270°</div><div class="sector-crystal"></div>
      <div class="sector-zone primary"><strong>AURORA AREA</strong><span>living interaction zone</span></div>
      <div class="sector-zone left-zone"><strong>ANIMALS</strong><span>ranch pasture</span></div>
      <div class="sector-zone right-zone"><strong>CABIN / HOME</strong><span>future living area</span></div>
    </section>`;
  property.insertBefore(sectorWorld, cameraStage.nextSibling);
  const sectorEls = [...sectorWorld.querySelectorAll('.property-sector')];

  const lookToggle = document.createElement('button');
  lookToggle.type='button'; lookToggle.className='look-toggle'; lookToggle.textContent='VIEW 360°'; lookToggle.setAttribute('aria-expanded','false');
  const lookControls=document.createElement('div');
  lookControls.className='look-controls'; lookControls.hidden=true;
  lookControls.innerHTML=`<span class="look-title">360° PROPERTY VIEW</span><span class="look-compass" id="lookCompass">GATE • 0°</span><div class="look-grid"><span></span><button type="button" data-look="up">▲</button><span></span><button type="button" data-look="left">◀</button><button type="button" data-look="reset">GATE</button><button type="button" data-look="right">▶</button><span></span><button type="button" data-look="down">▼</button><span></span><button type="button" data-look="out">−</button><button type="button" data-look="in">+</button><button type="button" data-look="wide">WIDE</button></div><span class="look-readout" id="lookReadout">0° • 100%</span><span class="look-help">Drag left/right to turn around the property</span>`;
  property.appendChild(lookToggle); property.appendChild(lookControls);

  let heading=0, viewY=0, viewZoom=1, dragging=false, startX=0, startY=0, startHeading=0, startViewY=0;
  const lookReadout=lookControls.querySelector('#lookReadout'); const lookCompass=lookControls.querySelector('#lookCompass');
  const normalize=(deg)=>((deg%360)+360)%360;
  const angularDistance=(a,b)=>Math.abs((((normalize(a)-normalize(b))+540)%360)-180);
  const sectorName=(deg)=>{ const d=normalize(deg); if(d<45||d>=315)return 'GATE'; if(d<135)return 'RIGHT PROPERTY'; if(d<225)return 'BACK PROPERTY'; return 'LEFT PROPERTY'; };
  const headingOffset=()=>{ const d=((normalize(heading)+180)%360)-180; return -(d/180)*Math.max(window.innerWidth*.72,260); };
  const sectorCenter={right:90,back:180,left:270};

  const applyView=()=>{
    const x=headingOffset();
    const gateDistance=angularDistance(heading,0);
    cameraStage.style.translate=`${x}px ${viewY}px`;
    cameraStage.style.scale=String(viewZoom);
    cameraStage.style.opacity=String(Math.max(0,1-(gateDistance/55)));
    sectorEls.forEach((el)=>{
      const center=sectorCenter[el.dataset.sector];
      const distance=angularDistance(heading,center);
      el.style.opacity=String(Math.max(0,1-(distance/58)));
      el.style.transform=`translateY(${viewY}px) scale(${viewZoom})`;
    });
    if(lookCompass)lookCompass.textContent=`${sectorName(heading)} • ${Math.round(normalize(heading))}°`;
    if(lookReadout)lookReadout.textContent=`${Math.round(normalize(heading))}° • ${Math.round(viewZoom*100)}%`;
  };
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
  const stamp=document.querySelector('.build-stamp'); if(stamp)stamp.textContent='AIC Living Site • v0.8.3';
  applyView();
})();
