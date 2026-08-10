(() => {
  const back=document.querySelector('.sector-back');
  if(!back)return;

  const style=document.createElement('style');
  style.textContent=`
    .campfire-v6{position:absolute;z-index:8;left:8%;top:48%;width:28%;height:28%;pointer-events:none;display:flex;align-items:flex-end;justify-content:center}
    .campfire-v6 .glow{position:absolute;left:50%;bottom:10%;width:110px;height:70px;transform:translateX(-50%);border-radius:50%;background:radial-gradient(circle,rgba(255,174,63,.48) 0,rgba(255,99,28,.18) 42%,transparent 72%);filter:blur(5px);animation:campGlow 1.8s ease-in-out infinite alternate}
    .campfire-v6 .ring{position:absolute;left:50%;bottom:2%;width:115px;height:38px;transform:translateX(-50%);border-radius:50%;border:8px solid rgba(82,87,86,.92);box-shadow:inset 0 0 10px rgba(0,0,0,.65),0 8px 12px rgba(0,0,0,.38)}
    .campfire-v6 .log{position:absolute;left:50%;bottom:16%;width:76px;height:12px;border-radius:9px;background:linear-gradient(90deg,#3a2419,#704329 46%,#2a1a14);box-shadow:0 4px 7px rgba(0,0,0,.38)}
    .campfire-v6 .log.a{transform:translateX(-50%) rotate(18deg)}
    .campfire-v6 .log.b{transform:translateX(-50%) rotate(-18deg)}
    .campfire-v6 .flame{position:absolute;left:50%;bottom:25%;transform-origin:50% 100%;filter:drop-shadow(0 0 7px rgba(255,126,31,.65));animation:campFlame .75s ease-in-out infinite alternate}
    .campfire-v6 .flame.outer{width:54px;height:82px;transform:translateX(-50%);clip-path:polygon(50% 0,70% 28%,92% 54%,77% 100%,23% 100%,8% 54%,30% 30%);background:linear-gradient(180deg,#ffd56a 0%,#ff8b24 46%,#e84b18 100%)}
    .campfire-v6 .flame.inner{width:28px;height:49px;transform:translateX(-50%);clip-path:polygon(50% 0,82% 48%,70% 100%,30% 100%,18% 48%);background:linear-gradient(180deg,#fff5b5,#ffd34f 55%,#ff7b20);animation-duration:.55s}
    .campfire-v6 .sparks{position:absolute;left:50%;bottom:72%;width:4px;height:4px;border-radius:50%;background:#ffd878;box-shadow:-23px 7px 0 #ff9b38,20px 13px 0 #ffd878,-11px -13px 0 #ffb03d,14px -26px 0 #ff8a2c;animation:campSparks 1.4s linear infinite}
    .campfire-v6 .label{position:absolute;bottom:-18%;left:50%;transform:translateX(-50%);padding:5px 10px;border:1px solid rgba(255,182,83,.28);border-radius:999px;background:rgba(26,19,16,.72);color:#ffdca5;font-size:.58rem;font-weight:900;letter-spacing:.09em;white-space:nowrap}
    @keyframes campFlame{from{scale:.94 1;rotate:-2deg}to{scale:1.04 .93;rotate:2deg}}
    @keyframes campGlow{from{opacity:.62;scale:.94}to{opacity:1;scale:1.06}}
    @keyframes campSparks{0%{translate:0 0;opacity:0}20%{opacity:1}100%{translate:4px -42px;opacity:0}}
    @media(max-width:520px){.campfire-v6{left:4%;top:50%;width:30%;height:25%;transform:scale(.86);transform-origin:50% 100%}}
  `;
  document.head.appendChild(style);

  const fire=document.createElement('div');
  fire.className='campfire-v6';
  fire.setAttribute('aria-label','Campfire area');
  fire.innerHTML='<div class="glow"></div><div class="ring"></div><i class="log a"></i><i class="log b"></i><i class="flame outer"></i><i class="flame inner"></i><i class="sparks"></i><span class="label">CAMPFIRE</span>';
  back.appendChild(fire);
})();
