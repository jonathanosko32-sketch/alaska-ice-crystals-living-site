(() => {
  const right = document.querySelector('.sector-right');
  if (!right) return;

  const style = document.createElement('style');
  style.textContent = `
    .sector-right .sector-zone.primary,
    .sector-right .sector-zone.left-zone,
    .sector-right .sector-zone.right-zone{display:none!important;}
    .sector-right .look-toggle{right:12px;bottom:92px;}
    .sector-right .workshop-building{top:36%;width:48%;height:26%;}
    .sector-right .service-apron{top:60%;height:17%;}
    .sector-right .parking-lane{bottom:11%;height:13%;}
    .sector-right .freight-dock{top:56%;right:3%;width:22%;}
    .sector-right .yard-post{bottom:31%;}
    .sector-right .truck-yard-label,
    .sector-right .freight-area-label{position:absolute;bottom:8%;z-index:8;padding:6px 10px;border:1px solid rgba(110,230,250,.3);border-radius:12px;background:rgba(4,27,40,.74);color:#dffaff;font-size:.58rem;font-weight:900;letter-spacing:.08em;box-shadow:0 8px 20px rgba(0,0,0,.22)}
    .sector-right .truck-yard-label{left:6%}.sector-right .freight-area-label{right:6%}
    .sector-right .workshop-status{position:absolute;left:50%;top:66%;transform:translateX(-50%);z-index:8;padding:5px 9px;border-radius:999px;border:1px solid rgba(110,230,250,.28);background:rgba(4,27,40,.76);color:#9defff;font-size:.5rem;font-weight:800;letter-spacing:.08em;white-space:nowrap}
    @media(max-width:520px){
      .sector-right .workshop-building{width:54%;top:37%;height:25%;}
      .sector-right .truck-yard-label,.sector-right .freight-area-label{bottom:7%;font-size:.52rem;padding:5px 8px}
      .sector-right .look-toggle{bottom:88px;}
      .sector-right .workshop-status{top:65%;font-size:.47rem}
    }
  `;
  document.head.appendChild(style);

  const labels = document.createElement('div');
  labels.className = 'workshop-v086-labels';
  labels.innerHTML = `
    <div class="workshop-status">SERVICE • TRUCK YARD • FREIGHT</div>
    <div class="truck-yard-label">TRUCK YARD</div>
    <div class="freight-area-label">FREIGHT AREA</div>`;
  right.appendChild(labels);

  const stamp = document.querySelector('.build-stamp');
  if (stamp) stamp.textContent = 'AIC Living Site • v0.8.6';
})();
