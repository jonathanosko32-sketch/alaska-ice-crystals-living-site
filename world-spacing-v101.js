(() => {
 const style=document.createElement('style');
 style.textContent=`
  /* v1.0.1: spread the four property views apart so neighboring sectors do not crowd each other. */
  .sector-world{width:520vw!important}
  .sector{width:100vw!important}
  .sector-front{left:0!important}
  .sector-right{left:140vw!important}
  .sector-back{left:280vw!important}
  .sector-left{left:420vw!important}
  .sector-right .workshop-building{width:42%!important}
  .sector-back .store-building{right:5%!important;width:46%!important}
  @media(max-width:520px){
    .sector-world{width:560vw!important}
    .sector-front{left:0!important}
    .sector-right{left:150vw!important}
    .sector-back{left:300vw!important}
    .sector-left{left:450vw!important}
    .sector-right .workshop-building{width:46%!important}
    .sector-back .store-building{right:5%!important;width:47%!important}
  }
 `;
 document.head.appendChild(style);
 const stamp=document.querySelector('.build-stamp');if(stamp)stamp.textContent='AIC Living Site • v1.0.1';
})();
