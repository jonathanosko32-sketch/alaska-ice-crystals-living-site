(() => {
  const back = document.querySelector('.sector-back');
  if (!back) return;

  const style = document.createElement('style');
  style.textContent = `
    .sector-back .store-v088{position:absolute;inset:0;z-index:7;pointer-events:none}
    .sector-back .store-building{position:absolute;right:3%;top:36%;width:50%;height:30%;border:1px solid rgba(122,229,245,.34);border-radius:14px 14px 6px 6px;background:repeating-linear-gradient(180deg,rgba(77,50,31,.96) 0 12px,rgba(103,67,38,.94) 12px 16px,rgba(56,36,24,.97) 16px 26px);box-shadow:0 16px 30px rgba(0,0,0,.42),inset 0 0 18px rgba(78,221,246,.05)}
    .sector-back .store-building:before{content:'';position:absolute;left:-5%;right:-5%;top:-24%;height:30%;clip-path:polygon(0 100%,18% 28%,50% 0,82% 28%,100% 100%);background:linear-gradient(180deg,rgba(49,42,38,.98),rgba(24,27,29,.98));filter:drop-shadow(0 5px 8px rgba(0,0,0,.35))}
    .sector-back .store-building:after{content:'';position:absolute;right:8%;top:-31%;width:5%;height:28%;background:linear-gradient(90deg,#51463d,#2d2927)}
    .sector-back .store-sign{position:absolute;left:50%;top:7%;transform:translateX(-50%);padding:7px 16px;border:1px solid rgba(134,236,255,.3);border-radius:999px;background:rgba(3,24,34,.88);color:#e6fbff;font-size:.64rem;font-weight:900;letter-spacing:.09em;white-space:nowrap}
    .sector-back .store-window{position:absolute;top:30%;width:19%;height:20%;border:1px solid rgba(141,238,255,.34);background:linear-gradient(180deg,rgba(150,223,238,.2),rgba(31,72,83,.22));box-shadow:0 0 10px rgba(76,222,247,.12)}
    .sector-back .store-window.w1{left:8%}.sector-back .store-window.w2{left:30%}.sector-back .store-door{position:absolute;right:9%;bottom:0;width:22%;height:62%;border:1px solid rgba(136,236,255,.3);background:linear-gradient(180deg,rgba(62,91,95,.48),rgba(26,46,48,.78))}
    .sector-back .store-porch{position:absolute;right:2%;bottom:-8%;width:44%;height:10%;background:repeating-linear-gradient(90deg,#65462d 0 7px,#402d20 7px 11px);transform:skewX(-8deg);box-shadow:0 8px 12px rgba(0,0,0,.32)}
    .sector-back .store-merch{position:absolute;left:5%;right:35%;bottom:8%;display:flex;gap:8px;justify-content:center}.sector-back .store-merch span{min-width:42px;padding:5px 7px;border:1px solid rgba(112,229,247,.23);border-radius:8px;background:rgba(4,24,33,.82);color:#c9f8ff;font-size:.43rem;font-weight:900;text-align:center}
    .sector-back .store-path{position:absolute;right:0;bottom:8%;width:55%;height:28%;clip-path:polygon(38% 0,62% 0,100% 100%,0 100%);background:linear-gradient(180deg,rgba(94,104,106,.3),rgba(20,35,38,.78));opacity:.85}
    .sector-back .store-light{position:absolute;right:50%;bottom:34%;width:4px;height:58px;background:linear-gradient(#d7fbff,#5eddf1 10%,rgba(49,103,116,.48) 11% 100%);box-shadow:0 -8px 14px rgba(80,227,255,.42)}
    .sector-back .store-light:before{content:'';position:absolute;top:-8px;left:50%;width:12px;height:12px;transform:translateX(-50%);border-radius:50%;background:#c9faff;box-shadow:0 0 15px rgba(79,226,255,.65)}
    .store-open-v088{position:fixed;z-index:75;left:14px;bottom:132px;border:1px solid rgba(113,234,255,.62);border-radius:16px;padding:9px 12px;background:rgba(3,24,36,.92);color:#e5fcff;font-weight:900;letter-spacing:.07em;box-shadow:0 0 14px rgba(65,224,255,.2)}
    .store-panel-v088{position:fixed;z-index:200;inset:10% 7% 12%;max-width:720px;margin:auto;border:1px solid rgba(117,234,255,.5);border-radius:22px;padding:18px;background:linear-gradient(180deg,rgba(3,23,36,.98),rgba(4,16,25,.99));color:#ecfcff;box-shadow:0 24px 60px rgba(0,0,0,.65),0 0 24px rgba(70,221,248,.14);overflow:auto}
    .store-panel-v088[hidden]{display:none!important}.store-panel-v088 h2{margin:0 0 5px;font-size:1.1rem;letter-spacing:.08em}.store-panel-v088 p{margin:0 0 14px;color:#a9dce5;font-size:.82rem}.store-grid-v088{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.store-card-v088{border:1px solid rgba(115,229,248,.25);border-radius:14px;padding:14px 9px;background:rgba(16,47,61,.72);text-align:center}.store-card-v088 strong{display:block;margin-bottom:5px}.store-card-v088 span{font-size:.7rem;color:#9ddce8}.store-close-v088{margin-top:15px;width:100%;border:1px solid rgba(113,234,255,.45);border-radius:12px;padding:10px;background:rgba(24,72,91,.9);color:#fff;font-weight:900}
    body.store-panel-open-v088 #cameraStage,body.store-panel-open-v088 .sector-world{filter:brightness(.42) saturate(.8)}
    @media(max-width:520px){.sector-back .store-building{right:3%;width:50%;top:37%;height:28%}.sector-back .store-merch{left:2%;right:31%}.store-open-v088{left:9px;bottom:124px;font-size:.7rem}.store-panel-v088{inset:8% 4% 10%;padding:14px}.store-grid-v088{grid-template-columns:1fr}.store-card-v088{padding:11px}}
  `;
  document.head.appendChild(style);

  const layer = document.createElement('div');
  layer.className = 'store-v088';
  layer.innerHTML = `<div class="store-path"></div><div class="store-building"><div class="store-sign">OSKO OUTFITTERS</div><i class="store-window w1"></i><i class="store-window w2"></i><i class="store-door"></i><div class="store-porch"></div><div class="store-merch"><span>SHIRTS</span><span>HATS</span><span>COATS</span></div></div><i class="store-light"></i>`;
  back.appendChild(layer);

  const open = document.createElement('button');
  open.type = 'button'; open.className = 'store-open-v088'; open.textContent = 'ENTER STORE'; open.hidden = true; document.body.appendChild(open);

  const panel = document.createElement('section');
  panel.className = 'store-panel-v088'; panel.hidden = true;
  panel.innerHTML = `<h2>OSKO OUTFITTERS</h2><p>First Living World merchandise room. Real colors, pricing, 360° product views and checkout will be connected after product details are confirmed.</p><div class="store-grid-v088"><div class="store-card-v088"><strong>SHIRTS</strong><span>Product display ready for real options.</span></div><div class="store-card-v088"><strong>HATS</strong><span>Product display ready for real options.</span></div><div class="store-card-v088"><strong>COATS</strong><span>Product display ready for real options.</span></div></div><button class="store-close-v088" type="button">RETURN TO WORLD</button>`;
  document.body.appendChild(panel);

  const property = document.getElementById('property');
  const compass = document.getElementById('lookCompass');
  const updateButton = () => {
    const text = (compass?.textContent || '').trim();
    open.hidden = !property || property.hidden || !text.startsWith('BACK PROPERTY') || !panel.hidden;
  };

  open.addEventListener('click', e => { e.preventDefault(); panel.hidden = false; document.body.classList.add('store-panel-open-v088'); updateButton(); });
  panel.querySelector('.store-close-v088').addEventListener('click', e => { e.preventDefault(); panel.hidden = true; document.body.classList.remove('store-panel-open-v088'); updateButton(); });
  document.addEventListener('click', () => requestAnimationFrame(updateButton));
  document.addEventListener('pointerup', () => requestAnimationFrame(updateButton));
  if (compass) new MutationObserver(updateButton).observe(compass,{childList:true,characterData:true,subtree:true});
  updateButton();

  const stamp = document.querySelector('.build-stamp'); if (stamp) stamp.textContent = 'AIC Living Site • v0.9.6';
})();
