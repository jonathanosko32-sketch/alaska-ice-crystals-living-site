(() => {
  const right = document.querySelector('.sector-right');
  if (!right) return;

  const style = document.createElement('style');
  style.textContent = `
    .sector-right .workshop-building{
      border-color:rgba(225,198,150,.38)!important;
      background:
        repeating-linear-gradient(180deg,rgba(119,78,42,.96) 0 10px,rgba(89,57,31,.98) 10px 13px)!important;
      box-shadow:0 16px 38px rgba(0,0,0,.48),inset 0 0 28px rgba(255,220,160,.08)!important;
    }
    .sector-right .workshop-building:before{
      background:linear-gradient(180deg,rgba(88,55,31,.98),rgba(54,34,22,.98))!important;
      clip-path:polygon(0 100%,16% 16%,50% 0,84% 16%,100% 100%)!important;
    }
    .sector-right .workshop-building:after{
      content:'';position:absolute;inset:0;pointer-events:none;opacity:.9;
      background:
        radial-gradient(circle at 2% 8%,rgba(176,119,66,.95) 0 5px,rgba(65,40,23,.95) 6px 8px,transparent 9px),
        radial-gradient(circle at 98% 8%,rgba(176,119,66,.95) 0 5px,rgba(65,40,23,.95) 6px 8px,transparent 9px),
        radial-gradient(circle at 2% 20%,rgba(176,119,66,.95) 0 5px,rgba(65,40,23,.95) 6px 8px,transparent 9px),
        radial-gradient(circle at 98% 20%,rgba(176,119,66,.95) 0 5px,rgba(65,40,23,.95) 6px 8px,transparent 9px),
        radial-gradient(circle at 2% 32%,rgba(176,119,66,.95) 0 5px,rgba(65,40,23,.95) 6px 8px,transparent 9px),
        radial-gradient(circle at 98% 32%,rgba(176,119,66,.95) 0 5px,rgba(65,40,23,.95) 6px 8px,transparent 9px),
        radial-gradient(circle at 2% 44%,rgba(176,119,66,.95) 0 5px,rgba(65,40,23,.95) 6px 8px,transparent 9px),
        radial-gradient(circle at 98% 44%,rgba(176,119,66,.95) 0 5px,rgba(65,40,23,.95) 6px 8px,transparent 9px);
    }
    .sector-right .workshop-sign{
      border-color:rgba(228,205,165,.42)!important;
      background:rgba(54,34,22,.9)!important;
      color:#fff3dc!important;
      box-shadow:0 0 12px rgba(218,177,105,.16)!important;
    }
    .sector-right .shop-bay{
      border-color:rgba(218,202,177,.36)!important;
      background:repeating-linear-gradient(180deg,rgba(76,86,88,.72) 0 8px,rgba(24,34,37,.88) 8px 13px)!important;
    }
    .sector-right .shop-office{
      border-color:rgba(221,197,158,.34)!important;
      background:repeating-linear-gradient(180deg,rgba(111,72,40,.94) 0 10px,rgba(82,52,30,.98) 10px 13px)!important;
    }
    .sector-right .shop-office:before,.sector-right .shop-office:after{
      border-color:rgba(142,231,249,.42)!important;
      background:rgba(77,198,224,.17)!important;
    }
    .sector-right .service-apron{background:linear-gradient(180deg,rgba(96,91,82,.48),rgba(26,34,35,.9))!important}
    .sector-right .log-corner{position:absolute;width:15px;height:8px;border-radius:8px;background:linear-gradient(180deg,#b27a43,#744726);box-shadow:0 0 0 1px rgba(52,31,17,.35)}
    .sector-right .log-corner.c1{left:-8px;top:18%}.sector-right .log-corner.c2{right:-8px;top:18%}.sector-right .log-corner.c3{left:-8px;top:36%}.sector-right .log-corner.c4{right:-8px;top:36%}.sector-right .log-corner.c5{left:-8px;top:54%}.sector-right .log-corner.c6{right:-8px;top:54%}
    .sector-right .log-porch{position:absolute;right:4%;bottom:-9%;width:22%;height:8%;border-top:4px solid rgba(122,78,43,.95);border-left:4px solid rgba(122,78,43,.92);border-right:4px solid rgba(122,78,43,.92);opacity:.95}
    .sector-right .log-chimney{position:absolute;right:14%;top:-28%;width:5%;height:20%;background:linear-gradient(90deg,#4b3324,#76513b,#402b20);box-shadow:0 0 0 1px rgba(30,20,14,.35)}
    .sector-right .log-chimney:after{content:'';position:absolute;left:50%;top:-11px;width:12px;height:12px;transform:translateX(-50%);border-radius:50%;background:rgba(210,220,226,.18);box-shadow:0 -7px 11px rgba(210,220,226,.12)}
  `;
  document.head.appendChild(style);

  const building = right.querySelector('.workshop-building');
  if (building && !building.querySelector('.log-corner')) {
    building.insertAdjacentHTML('beforeend', `
      <i class="log-corner c1"></i><i class="log-corner c2"></i>
      <i class="log-corner c3"></i><i class="log-corner c4"></i>
      <i class="log-corner c5"></i><i class="log-corner c6"></i>
      <i class="log-porch"></i><i class="log-chimney"></i>`);
  }

  const sign = right.querySelector('.workshop-sign');
  if (sign) sign.textContent = 'OSKO LOG WORKSHOP';

  const stamp = document.querySelector('.build-stamp');
  if (stamp) stamp.textContent = 'AIC Living Site • v0.8.7';
})();
