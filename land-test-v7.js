(() => {
  const back = document.querySelector('.sector-back');
  const right = document.querySelector('.sector-right');
  if (!back || !right) return;

  const style = document.createElement('style');
  style.textContent = `
    /* LAND TEST v7 — keep the two real buildings, make the campfire visible near Outfitters. */
    .sector-right .workshop-building{left:18%!important;top:39%!important;width:48%!important;z-index:8!important}
    .sector-right .freight-dock{right:4%!important;top:55%!important;z-index:8!important}
    .sector-back .store-building{right:7%!important;top:38%!important;width:48%!important;z-index:8!important}

    .campfire-v7{position:absolute;left:7%;top:58%;width:30%;height:22%;z-index:9;pointer-events:none}
    .campfire-v7 .fire-label{position:absolute;left:0;right:0;top:-24px;margin:auto;width:max-content;padding:5px 10px;border:1px solid rgba(111,231,247,.28);border-radius:999px;background:rgba(3,24,34,.84);color:#d8fbff;font-size:.56rem;font-weight:900;letter-spacing:.08em}
    .campfire-v7 .glow{position:absolute;left:50%;bottom:14%;width:88px;height:50px;transform:translateX(-50%);border-radius:50%;background:radial-gradient(ellipse,rgba(255,139,45,.45),rgba(255,79,22,.16) 45%,transparent 72%);filter:blur(3px);animation:fireGlowV7 1.2s ease-in-out infinite alternate}
    .campfire-v7 .stone-ring{position:absolute;left:50%;bottom:4%;width:112px;height:36px;transform:translateX(-50%);border-radius:50%;border:9px dotted rgba(116,118,116,.9);box-sizing:border-box;filter:drop-shadow(0 5px 5px rgba(0,0,0,.35))}
    .campfire-v7 .log{position:absolute;left:50%;bottom:12%;width:70px;height:8px;border-radius:8px;background:linear-gradient(90deg,#4a2b18,#7b4a27,#3b2518);transform-origin:center}
    .campfire-v7 .log.one{transform:translateX(-50%) rotate(24deg)}
    .campfire-v7 .log.two{transform:translateX(-50%) rotate(-24deg)}
    .campfire-v7 .flame{position:absolute;left:50%;bottom:21%;transform-origin:50% 100%;border-radius:48% 52% 42% 58% / 60% 60% 40% 40%;filter:drop-shadow(0 0 9px rgba(255,153,46,.6))}
    .campfire-v7 .flame.outer{width:34px;height:56px;margin-left:-17px;background:linear-gradient(180deg,#ffd15f 0%,#ff8c24 48%,#f24d19 100%);animation:flameV7 650ms ease-in-out infinite alternate}
    .campfire-v7 .flame.inner{width:18px;height:34px;margin-left:-9px;background:linear-gradient(180deg,#fff5ae 0%,#ffd759 50%,#ff8a25 100%);animation:flameV7b 520ms ease-in-out infinite alternate}
    @keyframes flameV7{from{transform:translateX(-50%) scale(.95,1) rotate(-2deg)}to{transform:translateX(-50%) scale(1.08,.92) rotate(3deg)}}
    @keyframes flameV7b{from{transform:translateX(-50%) scale(.92,1.05) rotate(2deg)}to{transform:translateX(-50%) scale(1.05,.9) rotate(-4deg)}}
    @keyframes fireGlowV7{from{opacity:.7;transform:translateX(-50%) scale(.92)}to{opacity:1;transform:translateX(-50%) scale(1.08)}}

    @media(max-width:520px){
      .sector-right .workshop-building{left:12%!important;width:52%!important}
      .sector-back .store-building{right:4%!important;width:50%!important}
      .campfire-v7{left:4%;top:61%;width:34%;height:19%}
      .campfire-v7 .stone-ring{width:96px;height:31px;border-width:8px}
      .campfire-v7 .log{width:60px}
    }
  `;
  document.head.appendChild(style);

  if (!back.querySelector('.campfire-v7')) {
    const fire = document.createElement('div');
    fire.className = 'campfire-v7';
    fire.innerHTML = `<div class="fire-label">CAMPFIRE</div><div class="glow"></div><div class="stone-ring"></div><div class="log one"></div><div class="log two"></div><div class="flame outer"></div><div class="flame inner"></div>`;
    back.appendChild(fire);
  }

  const stamp = document.querySelector('.build-stamp');
  if (stamp) stamp.textContent = 'LAND TEST • v7 two buildings + campfire';
})();
