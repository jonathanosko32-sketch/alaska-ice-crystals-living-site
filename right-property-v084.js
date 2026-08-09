(() => {
  const right = document.querySelector('.sector-right');
  if (!right) return;

  const style = document.createElement('style');
  style.textContent = `
    .sector-right .sector-ground{background:linear-gradient(180deg,rgba(20,50,60,.58),rgba(5,22,33,.98));}
    .sector-right .sector-road{height:64%;width:min(74vw,560px);bottom:-12%;background:linear-gradient(90deg,transparent 49%,rgba(106,235,255,.27) 49.5% 50.5%,transparent 51%),linear-gradient(180deg,rgba(84,101,108,.46),rgba(11,29,39,.96));}
    .sector-right .sector-fence{bottom:27%;height:108px;opacity:.85;}
    .sector-right .sector-zone{z-index:8;}
    .right-property-build{position:absolute;inset:0;z-index:4;pointer-events:none;}
    .rp-mountain{position:absolute;left:8%;right:8%;top:20%;height:25%;opacity:.35;background:linear-gradient(135deg,transparent 0 17%,rgba(57,98,115,.7) 18% 34%,transparent 35% 47%,rgba(42,79,99,.72) 48% 65%,transparent 66%),linear-gradient(225deg,transparent 0 24%,rgba(35,69,88,.6) 25% 43%,transparent 44%);clip-path:polygon(0 100%,12% 56%,24% 78%,41% 24%,55% 70%,70% 40%,88% 78%,100% 100%);}
    .rp-yard-pad{position:absolute;bottom:20%;height:20%;border:1px solid rgba(100,224,244,.26);background:linear-gradient(180deg,rgba(42,60,66,.34),rgba(9,27,35,.82));box-shadow:inset 0 0 20px rgba(77,221,246,.07),0 8px 18px rgba(0,0,0,.25);}
    .rp-yard-pad.truck{left:3%;width:34%;clip-path:polygon(0 16%,88% 0,100% 100%,6% 100%);}
    .rp-yard-pad.freight{right:3%;width:34%;clip-path:polygon(12% 0,100% 16%,94% 100%,0 100%);}
    .rp-shop-pad{position:absolute;left:50%;top:42%;width:34%;height:18%;transform:translateX(-50%);border:1px solid rgba(113,232,251,.26);border-radius:10px 10px 4px 4px;background:linear-gradient(180deg,rgba(26,61,74,.52),rgba(7,27,38,.8));box-shadow:0 10px 24px rgba(0,0,0,.3),inset 0 0 18px rgba(78,221,244,.07);}
    .rp-shop-pad:before{content:'';position:absolute;left:11%;right:11%;top:-28%;height:34%;background:linear-gradient(135deg,transparent 0 48%,rgba(74,108,118,.58) 49% 55%,transparent 56%),linear-gradient(225deg,transparent 0 48%,rgba(74,108,118,.58) 49% 55%,transparent 56%);}
    .rp-shop-pad .door{position:absolute;left:38%;bottom:0;width:24%;height:68%;border:1px solid rgba(118,236,255,.34);background:repeating-linear-gradient(180deg,rgba(89,128,139,.28) 0 7px,rgba(14,38,48,.5) 7px 12px);}
    .rp-shop-pad .window{position:absolute;top:18%;width:16%;height:18%;border:1px solid rgba(118,236,255,.35);background:rgba(75,218,245,.12);box-shadow:0 0 8px rgba(75,218,245,.15)}
    .rp-shop-pad .w1{left:12%}.rp-shop-pad .w2{right:12%}
    .rp-drive-left,.rp-drive-right{position:absolute;bottom:13%;width:38%;height:24%;opacity:.68;background:linear-gradient(180deg,rgba(73,88,92,.35),rgba(12,30,37,.78));}
    .rp-drive-left{left:0;clip-path:polygon(56% 0,100% 0,72% 100%,0 100%)}
    .rp-drive-right{right:0;clip-path:polygon(0 0,44% 0,100% 100%,28% 100%)}
    .rp-light{position:absolute;bottom:37%;width:5px;height:54px;background:linear-gradient(#c8f8ff,#4dcde5 12%,rgba(57,116,132,.55) 13% 100%);box-shadow:0 -7px 14px rgba(85,229,255,.42)}
    .rp-light:before{content:'';position:absolute;left:50%;top:-8px;transform:translateX(-50%);width:12px;height:12px;border-radius:50%;background:#bdf7ff;box-shadow:0 0 14px rgba(79,226,255,.7)}
    .rp-light.l1{left:24%}.rp-light.l2{left:41%}.rp-light.l3{right:41%}.rp-light.l4{right:24%}
    .rp-yard-mark{position:absolute;bottom:24%;height:3px;background:linear-gradient(90deg,transparent,rgba(89,225,247,.55),transparent);opacity:.8}.rp-yard-mark.m1{left:6%;width:26%}.rp-yard-mark.m2{right:6%;width:26%}
    @media(max-width:520px){.rp-shop-pad{width:40%;top:43%}.rp-yard-pad{bottom:19%;height:19%}.rp-light{height:46px}}
  `;
  document.head.appendChild(style);

  const build = document.createElement('div');
  build.className = 'right-property-build';
  build.innerHTML = `
    <div class="rp-mountain"></div>
    <div class="rp-drive-left"></div><div class="rp-drive-right"></div>
    <div class="rp-yard-pad truck"></div><div class="rp-yard-pad freight"></div>
    <div class="rp-shop-pad"><i class="door"></i><i class="window w1"></i><i class="window w2"></i></div>
    <i class="rp-light l1"></i><i class="rp-light l2"></i><i class="rp-light l3"></i><i class="rp-light l4"></i>
    <i class="rp-yard-mark m1"></i><i class="rp-yard-mark m2"></i>`;
  right.insertBefore(build, right.firstChild);

  const stamp = document.querySelector('.build-stamp');
  if (stamp) stamp.textContent = 'AIC Living Site • v0.8.4';
})();
