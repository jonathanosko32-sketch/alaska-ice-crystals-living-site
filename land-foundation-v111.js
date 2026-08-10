(() => {
  const property=document.getElementById('property');
  const stage=document.getElementById('cameraStage');
  if(!property||!stage)return;

  const style=document.createElement('style');
  style.textContent=`
    /* v1.1.1 MASTER LAND FOUNDATION — land is wider than the road. */
    .master-land-v111{position:absolute;z-index:1;left:0;right:0;top:29%;bottom:0;overflow:hidden;pointer-events:none}
    .master-land-v111 .far-ridge{position:absolute;left:-10%;right:-10%;top:0;height:29%;opacity:.42;background:linear-gradient(180deg,rgba(12,41,55,.15),rgba(7,29,39,.65));clip-path:polygon(0 72%,7% 45%,12% 67%,20% 30%,28% 70%,36% 38%,45% 73%,55% 28%,64% 69%,72% 40%,81% 71%,90% 34%,100% 67%,100% 100%,0 100%)}
    .master-land-v111 .land{position:absolute;left:-35%;right:-35%;top:20%;bottom:-12%;background:radial-gradient(ellipse at 50% 18%,rgba(38,79,79,.36),transparent 48%),linear-gradient(180deg,rgba(20,54,58,.66),rgba(5,25,32,.98));clip-path:polygon(8% 0,92% 0,100% 100%,0 100%);box-shadow:inset 0 30px 50px rgba(41,116,122,.06)}
    .master-land-v111 .left-field,.master-land-v111 .right-field{position:absolute;top:32%;bottom:0;width:42%;background:linear-gradient(180deg,rgba(27,66,66,.18),rgba(7,31,36,.68));border-top:1px solid rgba(100,225,235,.08)}
    .master-land-v111 .left-field{left:0;clip-path:polygon(0 8%,100% 0,82% 100%,0 100%)}
    .master-land-v111 .right-field{right:0;clip-path:polygon(0 0,100% 8%,100% 100%,18% 100%)}
    .master-land-v111 .approach-road{position:absolute;left:50%;top:24%;bottom:-10%;width:31%;transform:translateX(-50%);clip-path:polygon(43% 0,57% 0,100% 100%,0 100%);background:linear-gradient(90deg,rgba(14,32,38,.86),rgba(43,59,61,.7) 48%,rgba(100,220,232,.16) 49.5%,rgba(100,220,232,.16) 50.5%,rgba(43,59,61,.7) 52%,rgba(14,32,38,.86));box-shadow:0 0 24px rgba(0,0,0,.25)}
    .master-land-v111 .boundary-left,.master-land-v111 .boundary-right{position:absolute;top:36%;bottom:0;width:1px;background:linear-gradient(180deg,rgba(102,229,240,.18),transparent 80%)}
    .master-land-v111 .boundary-left{left:18%}.master-land-v111 .boundary-right{right:18%}
    .property .camera-stage{z-index:20}
    .property .sector-world{z-index:10}
    @media(max-width:520px){.master-land-v111{top:27%}.master-land-v111 .land{left:-55%;right:-55%}.master-land-v111 .left-field,.master-land-v111 .right-field{width:45%}.master-land-v111 .approach-road{width:36%}}
  `;
  document.head.appendChild(style);

  const land=document.createElement('div');
  land.className='master-land-v111';
  land.setAttribute('aria-hidden','true');
  land.innerHTML='<div class="far-ridge"></div><div class="land"></div><div class="left-field"></div><div class="right-field"></div><div class="approach-road"></div><div class="boundary-left"></div><div class="boundary-right"></div>';
  property.insertBefore(land,stage);

  const stamp=document.querySelector('.build-stamp');
  if(stamp)stamp.textContent='AIC Living Site • v1.1.1';
})();
