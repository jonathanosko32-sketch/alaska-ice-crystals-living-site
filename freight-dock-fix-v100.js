(() => {
  const right=document.querySelector('.sector-right');
  if(!right)return;
  const style=document.createElement('style');
  style.textContent=`
    /* v1.0.0: clean freight dock and give the workshop real loading space. */
    .sector-right .freight-dock{
      right:1.5%!important;top:57%!important;width:18%!important;height:7%!important;
      transform:none!important;border:1px solid rgba(112,232,252,.28)!important;
      background:linear-gradient(180deg,rgba(43,69,76,.58),rgba(9,28,36,.92))!important;
      overflow:visible!important;box-shadow:0 8px 18px rgba(0,0,0,.28)!important;
    }
    .sector-right .freight-dock:before{font-size:.38rem!important;letter-spacing:.06em!important}
    .sector-right .freight-dock:after{
      content:'';position:absolute;left:-42%;right:0;top:100%;height:135%;
      clip-path:polygon(20% 0,100% 0,100% 100%,0 100%);
      background:linear-gradient(180deg,rgba(87,99,101,.28),rgba(15,29,34,.72));
      border-bottom:1px solid rgba(102,225,246,.15);pointer-events:none;
    }
    .sector-right .workshop-building{left:47%!important}
    .sector-right .yard-post.p4{right:23%!important}
    @media(max-width:520px){
      .sector-right .freight-dock{right:1%!important;width:19%!important;top:57%!important}
      .sector-right .freight-dock:before{font-size:.34rem!important}
      .sector-right .workshop-building{left:45%!important}
    }
  `;
  document.head.appendChild(style);
  const stamp=document.querySelector('.build-stamp');
  if(stamp)stamp.textContent='AIC Living Site • v1.0.0';
})();
