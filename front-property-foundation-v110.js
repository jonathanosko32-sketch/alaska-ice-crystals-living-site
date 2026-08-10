(() => {
  const cameraStage = document.getElementById('cameraStage');
  const property = document.getElementById('property');
  if (!cameraStage || !property) return;

  const style = document.createElement('style');
  style.textContent = `
    /* v1.1.0 — Phase 1 real property foundation: create land BEFORE the gate. */
    .front-land-v110{position:absolute;inset:0;z-index:1;pointer-events:none;overflow:hidden}
    .front-land-v110 .front-backdrop{position:absolute;left:-12%;right:-12%;top:35%;height:28%;opacity:.82;background:linear-gradient(180deg,rgba(10,34,45,.05),rgba(7,27,35,.62) 58%,rgba(6,24,31,.9));clip-path:polygon(0 58%,8% 42%,17% 55%,28% 32%,39% 50%,50% 28%,62% 48%,73% 30%,83% 53%,92% 38%,100% 57%,100% 100%,0 100%)}
    .front-land-v110 .front-tree-line{position:absolute;left:-8%;right:-8%;top:45%;height:18%;opacity:.55;background:repeating-linear-gradient(90deg,transparent 0 18px,rgba(4,23,29,.92) 19px 24px,transparent 25px 38px);clip-path:polygon(0 100%,0 75%,3% 75%,4.5% 18%,6% 75%,10% 75%,12% 8%,14% 75%,18% 75%,20% 28%,22% 75%,28% 75%,30% 12%,32% 75%,38% 75%,40% 25%,42% 75%,48% 75%,50% 5%,52% 75%,58% 75%,60% 25%,62% 75%,68% 75%,70% 10%,72% 75%,78% 75%,80% 28%,82% 75%,88% 75%,90% 14%,92% 75%,97% 75%,100% 100%)}
    .front-land-v110 .front-ground{position:absolute;left:-28%;right:-28%;bottom:-12%;height:58%;background:linear-gradient(180deg,rgba(21,50,55,.4),rgba(11,31,37,.88) 45%,rgba(5,20,28,.98));clip-path:polygon(10% 0,90% 0,100% 100%,0 100%);box-shadow:inset 0 22px 38px rgba(69,184,199,.04)}
    .front-land-v110 .approach-road{position:absolute;left:50%;bottom:-12%;width:min(78vw,620px);height:54%;transform:translateX(-50%);clip-path:polygon(43% 0,57% 0,90% 100%,10% 100%);background:linear-gradient(90deg,rgba(24,48,55,.1),rgba(68,83,87,.46) 46%,rgba(95,221,240,.19) 49.4% 50.6%,rgba(68,83,87,.46) 54%,rgba(24,48,55,.1)),linear-gradient(180deg,rgba(64,82,87,.42),rgba(16,34,42,.93));box-shadow:inset 0 0 32px rgba(65,216,240,.07)}
    .front-land-v110 .land-pad{position:absolute;bottom:5%;height:29%;width:34%;border-top:1px solid rgba(92,220,239,.12);background:linear-gradient(180deg,rgba(35,66,68,.25),rgba(8,29,35,.84));opacity:.9}
    .front-land-v110 .land-pad.left{left:-2%;clip-path:polygon(0 12%,88% 0,100% 100%,0 100%)}
    .front-land-v110 .land-pad.right{right:-2%;clip-path:polygon(12% 0,100% 12%,100% 100%,0 100%)}
    .front-land-v110 .front-bank{position:absolute;bottom:0;width:30%;height:12%;opacity:.72;background:radial-gradient(ellipse at center,rgba(93,126,128,.32),rgba(8,29,35,.05) 68%)}
    .front-land-v110 .front-bank.left{left:-3%}.front-land-v110 .front-bank.right{right:-3%}
    .front-land-v110 .approach-marker{position:absolute;left:50%;bottom:18%;transform:translateX(-50%);padding:5px 10px;border:1px solid rgba(108,229,249,.16);border-radius:999px;background:rgba(3,24,32,.45);color:rgba(173,238,247,.6);font-size:.48rem;font-weight:800;letter-spacing:.1em;white-space:nowrap}

    /* Keep the front entrance far enough away to see the whole gate and the land in front of it. */
    #cameraStage.front-gate-framed-v110{scale:.86!important;transform-origin:50% 57%!important}
    #cameraStage.front-gate-framed-v110 .property-hud{top:5%!important}

    @media(max-width:520px){
      #cameraStage.front-gate-framed-v110{scale:.84!important}
      .front-land-v110 .front-ground{left:-36%;right:-36%;height:60%}
      .front-land-v110 .approach-road{width:88vw;height:56%}
      .front-land-v110 .land-pad{width:38%;height:28%}
      .front-land-v110 .approach-marker{bottom:16%;font-size:.42rem}
    }
  `;
  document.head.appendChild(style);

  const layer = document.createElement('div');
  layer.className = 'front-land-v110';
  layer.setAttribute('aria-hidden','true');
  layer.innerHTML = `
    <div class="front-backdrop"></div>
    <div class="front-tree-line"></div>
    <div class="front-ground"></div>
    <div class="land-pad left"></div>
    <div class="land-pad right"></div>
    <div class="approach-road"></div>
    <div class="front-bank left"></div>
    <div class="front-bank right"></div>
    <div class="approach-marker">FRONT PROPERTY • GATE APPROACH</div>`;
  cameraStage.insertBefore(layer, cameraStage.firstChild);

  const compass = document.getElementById('lookCompass');
  const frameGate = () => {
    const text = (compass?.textContent || 'GATE • 0°').trim();
    const atGate = text.startsWith('GATE');
    cameraStage.classList.toggle('front-gate-framed-v110', atGate);
  };

  if (compass) new MutationObserver(() => requestAnimationFrame(frameGate)).observe(compass,{childList:true,characterData:true,subtree:true});
  document.getElementById('enterButton')?.addEventListener('click',()=>setTimeout(frameGate,40));
  frameGate();

  const stamp = document.querySelector('.build-stamp');
  if (stamp) stamp.textContent = 'AIC Living Site • v1.1.0';
})();
