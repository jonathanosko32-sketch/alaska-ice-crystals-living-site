(() => {
  const right = document.querySelector('.sector-right');
  if (!right) return;

  const style = document.createElement('style');
  style.textContent = `
    .sector-right .workshop-v085{position:absolute;inset:0;z-index:6;pointer-events:none}
    .sector-right .workshop-building{position:absolute;left:50%;top:38%;width:44%;height:25%;transform:translateX(-50%);border:1px solid rgba(126,235,255,.32);border-radius:12px 12px 5px 5px;background:linear-gradient(180deg,rgba(30,66,80,.78),rgba(6,26,36,.94));box-shadow:0 14px 34px rgba(0,0,0,.42),inset 0 0 26px rgba(76,222,246,.07)}
    .sector-right .workshop-building:before{content:'';position:absolute;left:4%;right:4%;top:-18%;height:23%;clip-path:polygon(0 100%,18% 18%,50% 0,82% 18%,100% 100%);background:linear-gradient(180deg,rgba(83,117,127,.82),rgba(25,52,63,.86));filter:drop-shadow(0 4px 7px rgba(0,0,0,.28))}
    .sector-right .workshop-sign{position:absolute;left:50%;top:7%;transform:translateX(-50%);padding:4px 10px;border:1px solid rgba(126,235,255,.28);border-radius:999px;background:rgba(4,26,38,.82);color:#dffcff;font-size:.56rem;font-weight:900;letter-spacing:.1em;white-space:nowrap}
    .sector-right .shop-bay{position:absolute;bottom:8%;width:20%;height:58%;border:1px solid rgba(128,236,255,.32);background:repeating-linear-gradient(180deg,rgba(91,132,145,.26) 0 8px,rgba(14,40,51,.58) 8px 13px);box-shadow:inset 0 0 10px rgba(77,222,247,.08)}
    .sector-right .shop-bay.b1{left:7%}.sector-right .shop-bay.b2{left:29%}.sector-right .shop-bay.b3{left:51%}
    .sector-right .shop-office{position:absolute;right:5%;bottom:8%;width:18%;height:58%;border:1px solid rgba(128,236,255,.3);background:linear-gradient(180deg,rgba(45,88,104,.52),rgba(10,33,43,.78))}
    .sector-right .shop-office:before,.sector-right .shop-office:after{content:'';position:absolute;left:14%;right:14%;height:14%;border:1px solid rgba(123,236,255,.3);background:rgba(79,221,246,.13);box-shadow:0 0 9px rgba(76,221,246,.12)}
    .sector-right .shop-office:before{top:18%}.sector-right .shop-office:after{top:43%}
    .sector-right .service-apron{position:absolute;left:28%;right:28%;top:61%;height:15%;clip-path:polygon(10% 0,90% 0,100% 100%,0 100%);background:linear-gradient(180deg,rgba(79,91,95,.4),rgba(12,31,39,.86));border-bottom:1px solid rgba(105,231,251,.16)}
    .sector-right .parking-lane{position:absolute;bottom:15%;width:24%;height:12%;border:1px solid rgba(105,231,251,.18);background:linear-gradient(180deg,rgba(30,48,54,.28),rgba(8,25,33,.68));box-shadow:inset 0 0 12px rgba(76,221,246,.04)}
    .sector-right .parking-lane.left{left:6%;transform:skewY(-2deg)}.sector-right .parking-lane.right{right:6%;transform:skewY(2deg)}
    .sector-right .parking-lane:before,.sector-right .parking-lane:after{content:'';position:absolute;top:18%;bottom:18%;width:2px;background:rgba(113,234,255,.28)}
    .sector-right .parking-lane:before{left:34%}.sector-right .parking-lane:after{right:34%}
    .sector-right .freight-dock{position:absolute;right:5%;top:55%;width:24%;height:9%;border:1px solid rgba(112,232,252,.2);background:linear-gradient(180deg,rgba(43,69,76,.48),rgba(9,28,36,.82));transform:perspective(240px) rotateY(-8deg)}
    .sector-right .freight-dock:before{content:'FREIGHT DOCK';position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);color:#9defff;font-size:.43rem;font-weight:900;letter-spacing:.08em;white-space:nowrap}
    .sector-right .yard-post{position:absolute;bottom:34%;width:4px;height:62px;background:linear-gradient(#d8fbff,#61dff2 10%,rgba(57,111,127,.5) 11% 100%);box-shadow:0 -7px 15px rgba(85,229,255,.4)}
    .sector-right .yard-post:before{content:'';position:absolute;top:-8px;left:50%;width:12px;height:12px;transform:translateX(-50%);border-radius:50%;background:#c9faff;box-shadow:0 0 16px rgba(79,226,255,.65)}
    .sector-right .yard-post.p1{left:18%}.sector-right .yard-post.p2{left:34%}.sector-right .yard-post.p3{right:34%}.sector-right .yard-post.p4{right:18%}
    .sector-right .sector-zone.primary{top:67%;min-width:150px}.sector-right .sector-zone.left-zone,.sector-right .sector-zone.right-zone{top:77%}
    @media(max-width:520px){.sector-right .workshop-building{width:50%;top:39%;height:24%}.sector-right .workshop-sign{font-size:.5rem}.sector-right .service-apron{left:24%;right:24%}.sector-right .yard-post{height:52px}.sector-right .sector-zone.primary{top:68%}.sector-right .sector-zone.left-zone,.sector-right .sector-zone.right-zone{top:78%}}
  `;
  document.head.appendChild(style);

  const layer = document.createElement('div');
  layer.className = 'workshop-v085';
  layer.innerHTML = `
    <div class="workshop-building">
      <div class="workshop-sign">OSKO WORKSHOP</div>
      <i class="shop-bay b1"></i><i class="shop-bay b2"></i><i class="shop-bay b3"></i>
      <i class="shop-office"></i>
    </div>
    <div class="service-apron"></div>
    <div class="parking-lane left"></div><div class="parking-lane right"></div>
    <div class="freight-dock"></div>
    <i class="yard-post p1"></i><i class="yard-post p2"></i><i class="yard-post p3"></i><i class="yard-post p4"></i>`;
  right.appendChild(layer);

  const stamp = document.querySelector('.build-stamp');
  if (stamp) stamp.textContent = 'AIC Living Site • v0.8.5';
})();
