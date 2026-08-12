(()=>{
  const plane=document.getElementById('worldPlane');
  if(!plane||document.getElementById('riverLake180')) return;

  const style=document.createElement('style');
  style.id='riverLake180Style';
  style.textContent=`
    #riverLake180{position:absolute;inset:0;z-index:5;pointer-events:none;overflow:visible}
    #riverLake180 svg{width:100%;height:100%;display:block;overflow:visible}
    .river-bank{fill:none;stroke:#2f6d7b;stroke-width:38;stroke-linecap:round;stroke-linejoin:round;opacity:.96}
    .river-water{fill:none;stroke:#18a8c5;stroke-width:27;stroke-linecap:round;stroke-linejoin:round}
    .river-shine{fill:none;stroke:rgba(180,241,247,.72);stroke-width:6;stroke-linecap:round;stroke-dasharray:26 38}
    .lake-bank{fill:#397b86;opacity:.92}
    .lake-water{fill:url(#lakeGrad)}
    .lake-ripple{fill:none;stroke:rgba(201,247,250,.40);stroke-width:3}
    .drop-dark{fill:#17657b;opacity:.96}
    .drop-water{fill:url(#dropGrad)}
    .drop-foam{fill:#d9fbff;opacity:.9}
    .water-label{font:900 20px system-ui,sans-serif;letter-spacing:.14em;fill:rgba(230,253,255,.92)}
  `;
  document.head.appendChild(style);

  const layer=document.createElement('div');
  layer.id='riverLake180';
  layer.setAttribute('aria-label','Coded river and lake system');
  layer.innerHTML=`
    <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <radialGradient id="lakeGrad" cx="43%" cy="38%" r="70%">
          <stop offset="0%" stop-color="#35b8cf"/>
          <stop offset="58%" stop-color="#168aa8"/>
          <stop offset="100%" stop-color="#0c6786"/>
        </radialGradient>
        <linearGradient id="dropGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#d7fbff"/>
          <stop offset="20%" stop-color="#49cde1"/>
          <stop offset="100%" stop-color="#0e7695"/>
        </linearGradient>
      </defs>

      <!-- Upper river: starts at upper-right, bends down and left into the lake. -->
      <path class="river-bank" d="M935 112 C905 155 926 205 895 247 C867 286 821 301 802 345 C780 396 796 434 748 462 C712 483 680 468 652 487"/>
      <path class="river-water" d="M935 112 C905 155 926 205 895 247 C867 286 821 301 802 345 C780 396 796 434 748 462 C712 483 680 468 652 487"/>
      <path class="river-shine" d="M935 112 C905 155 926 205 895 247 C867 286 821 301 802 345 C780 396 796 434 748 462 C712 483 680 468 652 487"/>

      <!-- Lake: broad center body matching the old layout, with river entering at upper-right. -->
      <path class="lake-bank" d="M421 470 C438 428 494 407 554 414 C609 420 667 439 691 478 C714 514 695 558 663 586 C630 614 587 624 537 615 C490 607 446 588 423 556 C403 529 404 498 421 470 Z"/>
      <path class="lake-water" d="M431 474 C448 440 496 422 550 428 C601 433 651 448 673 481 C692 510 677 545 649 568 C621 591 584 601 542 594 C500 587 461 572 440 545 C422 522 417 497 431 474 Z"/>
      <ellipse class="lake-ripple" cx="555" cy="510" rx="86" ry="48"/>
      <ellipse class="lake-ripple" cx="555" cy="510" rx="48" ry="27"/>
      <text class="water-label" x="523" y="518">LAKE</text>

      <!-- Lower river: leaves the lake southwest, loops down/left, then reaches the ocean. -->
      <path class="river-bank" d="M461 568 C441 596 447 626 423 652 C394 684 350 688 324 720 C304 744 292 770 253 786"/>
      <path class="river-water" d="M461 568 C441 596 447 626 423 652 C394 684 350 688 324 720 C304 744 292 770 253 786"/>
      <path class="river-shine" d="M461 568 C441 596 447 626 423 652 C394 684 350 688 324 720 C304 744 292 770 253 786"/>

      <!-- Drop-off / falls at the shoreline into the left ocean. Ocean edge is near x=240. -->
      <path class="drop-dark" d="M257 767 C245 768 236 775 228 787 L208 825 C201 838 207 850 220 853 L241 857 C252 859 261 853 265 842 L278 800 C283 784 274 770 257 767 Z"/>
      <path class="drop-water" d="M257 772 C248 774 241 781 236 791 L219 822 C214 832 218 840 228 843 L240 846 C248 848 255 842 258 833 L269 799 C273 785 268 775 257 772 Z"/>
      <path class="drop-foam" d="M242 783 C234 780 226 783 221 790 C214 799 218 808 228 811 C236 814 242 811 248 806 C255 800 255 788 242 783 Z"/>
      <path class="drop-foam" d="M219 842 C205 838 193 842 187 852 C181 862 189 870 202 870 C215 871 226 865 231 856 C235 850 230 845 219 842 Z"/>
    </svg>`;

  const ocean=document.getElementById('leftOcean');
  if(ocean && ocean.nextSibling) plane.insertBefore(layer,ocean.nextSibling);
  else plane.appendChild(layer);
})();