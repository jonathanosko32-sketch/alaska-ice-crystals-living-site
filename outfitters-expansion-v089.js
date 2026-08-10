(() => {
  const stage = document.getElementById('cameraStage');
  if (!stage) return;
  const style = document.createElement('style');
  style.textContent = `
    .outfitters-building{width:min(78vw,560px)!important;height:340px!important;right:50%!important;transform:translateX(50%)!important;top:34%!important;border-radius:18px!important;background:repeating-linear-gradient(0deg,#56321e 0 18px,#75482a 18px 22px)!important;box-shadow:0 22px 55px #0009, inset 0 0 40px #ffb45b18!important}
    .outfitters-building:before{content:'';position:absolute;left:-5%;right:-5%;top:-62px;height:92px;background:linear-gradient(155deg,transparent 0 16%,#321d13 17% 49%,#4d2d1a 50% 74%,transparent 75%);filter:drop-shadow(0 8px 5px #0008);z-index:-1}
    .outfitters-building:after{content:'';position:absolute;left:8%;right:8%;bottom:-28px;height:42px;border:2px solid #8d603b;background:#3b2519;box-shadow:inset 0 10px 0 #684126}
    .outfitters-sign{font-size:clamp(16px,4vw,25px)!important;padding:10px 26px!important;letter-spacing:2px!important}
    .outfitters-window{height:92px!important;width:26%!important;top:94px!important;background:linear-gradient(#7ccbe133,#07152188)!important;box-shadow:inset 0 0 20px #69dcff2b!important}
    .outfitters-door{height:130px!important;width:21%!important;top:92px!important}
    .outfitters-merch{left:7%!important;right:7%!important;bottom:48px!important;gap:12px!important}
    .outfitters-merch span{padding:9px 12px!important;font-size:13px!important}
    .outfitters-lamp{display:block!important}
    .back-property-active .world-node.node-hq,.back-property-active .world-node[data-place='Headquarters'],.back-property-active .world-node[data-place='Campfire']{opacity:0!important;pointer-events:none!important}
    .back-property-active .back-headquarters,.back-property-active .back-campfire,.back-property-active .back-store{opacity:0!important;pointer-events:none!important}
    .outfitters-ground{position:absolute;left:8%;right:8%;top:70%;height:18%;border:1px solid #61d9f744;border-radius:45% 45% 12px 12px;background:linear-gradient(180deg,#9cdcf014,#17344755);box-shadow:inset 0 0 28px #75e9ff14;z-index:2;pointer-events:none}
    .outfitters-ground:before{content:'VISITOR PARKING  •  WALKWAY  •  STORE ENTRANCE';position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);white-space:nowrap;font-size:11px;letter-spacing:1.4px;color:#bceef6aa}
    @media(max-width:480px){.outfitters-building{width:82vw!important;height:315px!important;top:35%!important}.outfitters-ground{top:72%;left:5%;right:5%}.outfitters-ground:before{font-size:9px;letter-spacing:.7px}}
  `;
  document.head.appendChild(style);
  const ground=document.createElement('div'); ground.className='outfitters-ground'; stage.appendChild(ground);
  const update=()=>{
    const title=document.getElementById('hudTitle')?.textContent||'';
    const active=/BACK PROPERTY/i.test(title) || /180/.test(document.querySelector('.hud-kicker')?.textContent||'');
    stage.classList.toggle('back-property-active',active);
    ground.style.display=active?'block':'none';
  };
  new MutationObserver(update).observe(stage,{subtree:true,childList:true,characterData:true,attributes:true});
  document.addEventListener('click',()=>setTimeout(update,30)); update();
})();
