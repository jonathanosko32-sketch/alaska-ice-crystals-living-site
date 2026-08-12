(()=>{
  const plane=document.getElementById('worldPlane');
  if(!plane||document.getElementById('riverLake180')) return;
  const style=document.createElement('style');
  style.id='riverLake180Style';
  style.textContent=`
#riverLake180{position:absolute;inset:0;z-index:5;pointer-events:none;overflow:hidden;contain:layout paint}
#riverLake180 svg{width:100%;height:100%;display:block;overflow:hidden}
.river-bank{fill:none;stroke:#2f6d7b;stroke-width:46;stroke-linecap:round;stroke-linejoin:round}
.river-water{fill:none;stroke:#19a9c8;stroke-width:34;stroke-linecap:round;stroke-linejoin:round}
.river-segments{fill:none;stroke:#70d4df;stroke-width:18;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:38 28;opacity:.96;animation:riverFlow 1.4s linear infinite}
.lake-bank{fill:#87c8d1;opacity:.92}
.lake-water{fill:url(#lakeGrad);animation:lakeShimmer 3s ease-in-out infinite}
.lake-ripple{fill:none;stroke:rgba(201,247,250,.55);stroke-width:3;stroke-dasharray:12 10;animation:rippleFlow 2.8s linear infinite}
.lake-ripple.r2{animation-duration:2.1s;opacity:.72}
.drop-dark{fill:#17657b}.drop-water{fill:url(#dropGrad)}.drop-foam{fill:#d9fbff;opacity:.9}
.water-label{font:900 20px system-ui,sans-serif;letter-spacing:.14em;fill:rgba(230,253,255,.92)}
.camp-ring{fill:#66574a;stroke:#3e342d;stroke-width:4}.camp-stone{fill:#7b746d;stroke:#4c4945;stroke-width:2}.camp-log{fill:#654126;stroke:#3b2819;stroke-width:3}
.camp-flame-outer{fill:#ff7b22;animation:fireGlow .46s ease-in-out infinite alternate}.camp-flame-mid{fill:#ffb32d;animation:fireGlow .34s ease-in-out infinite alternate-reverse}.camp-flame-inner{fill:#fff0a3;animation:fireGlow .28s ease-in-out infinite alternate}
.ocean-left:before{animation:oceanMove 2.4s linear infinite!important}
@keyframes riverFlow{from{stroke-dashoffset:0}to{stroke-dashoffset:-132}}
@keyframes rippleFlow{from{stroke-dashoffset:0;opacity:.58}50%{opacity:.28}to{stroke-dashoffset:-44;opacity:.58}}
@keyframes lakeShimmer{0%,100%{opacity:1}50%{opacity:.90}}
@keyframes oceanMove{from{background-position:0 0}to{background-position:0 156px}}
@keyframes fireGlow{from{opacity:.72}to{opacity:1}}
`;
  document.head.appendChild(style);
  const layer=document.createElement('div');
  layer.id='riverLake180';
  layer.innerHTML=`<svg viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true"><defs><radialGradient id="lakeGrad" cx="43%" cy="37%" r="72%"><stop offset="0%" stop-color="#38b9d0"/><stop offset="55%" stop-color="#168eac"/><stop offset="100%" stop-color="#0c6d8b"/></radialGradient><linearGradient id="dropGrad"><stop offset="0%" stop-color="#d7fbff"/><stop offset="20%" stop-color="#49cde1"/><stop offset="100%" stop-color="#0e7695"/></linearGradient></defs><path class="river-bank" d="M935 112 C905 155 926 205 895 247 C867 286 821 301 802 345 C780 396 791 427 760 449 C744 461 730 466 716 471"/><path class="river-water" d="M935 112 C905 155 926 205 895 247 C867 286 821 301 802 345 C780 396 791 427 760 449 C744 461 730 466 716 471"/><path class="river-segments" d="M935 112 C905 155 926 205 895 247 C867 286 821 301 802 345 C780 396 791 427 760 449 C744 461 730 466 716 471"/><path class="river-bank" d="M342 630 C331 643 318 655 305 668 C286 688 273 714 262 740 C257 754 253 770 253 786"/><path class="river-water" d="M342 630 C331 643 318 655 305 668 C286 688 273 714 262 740 C257 754 253 770 253 786"/><path class="river-segments" d="M342 630 C331 643 318 655 305 668 C286 688 273 714 262 740 C257 754 253 770 253 786"/><path class="lake-bank" d="M334 467 C350 423 393 395 447 390 C495 385 536 400 575 395 C626 389 675 399 703 431 C733 465 731 509 709 543 C694 566 671 578 664 602 C653 637 622 657 581 663 C537 670 500 657 459 660 C414 663 371 651 347 621 C329 599 331 574 318 550 C298 514 309 491 334 467 Z"/><path class="lake-water" d="M343 472 C359 434 398 410 449 405 C494 401 535 414 574 409 C621 403 664 413 689 440 C716 469 713 505 695 534 C680 558 657 568 651 591 C641 621 615 638 578 644 C537 650 501 638 461 642 C420 645 382 635 360 609 C343 589 345 565 333 543 C315 512 321 491 343 472 Z"/><ellipse class="lake-ripple" cx="500" cy="500" rx="96" ry="52"/><ellipse class="lake-ripple r2" cx="500" cy="500" rx="54" ry="29"/><text class="water-label" x="472" y="512">LAKE</text><path class="drop-dark" d="M257 767 C245 768 236 775 228 787 L208 825 C201 838 207 850 220 853 L241 857 C252 859 261 853 265 842 L278 800 C283 784 274 770 257 767 Z"/><path class="drop-water" d="M257 772 C248 774 241 781 236 791 L219 822 C214 832 218 840 228 843 L240 846 C248 848 255 842 258 833 L269 799 C273 785 268 775 257 772 Z"/><path class="drop-foam" d="M242 783 C234 780 226 783 221 790 C214 799 218 808 228 811 C236 814 242 811 248 806 C255 800 255 788 242 783 Z"/><path class="drop-foam" d="M219 842 C205 838 193 842 187 852 C181 862 189 870 202 870 C215 871 226 865 231 856 C235 850 230 845 219 842 Z"/><g id="campfire180" transform="translate(720 390)"><circle class="camp-ring" r="32" opacity=".18"/><circle class="camp-stone" cx="-25" cy="8" r="7"/><circle class="camp-stone" cx="-13" cy="22" r="7"/><circle class="camp-stone" cx="5" cy="25" r="7"/><circle class="camp-stone" cx="22" cy="14" r="7"/><circle class="camp-stone" cx="26" cy="-4" r="7"/><circle class="camp-stone" cx="13" cy="-20" r="7"/><circle class="camp-stone" cx="-7" cy="-23" r="7"/><circle class="camp-stone" cx="-23" cy="-11" r="7"/><rect class="camp-log" x="-23" y="-5" width="46" height="9" rx="4" transform="rotate(24)"/><rect class="camp-log" x="-23" y="-5" width="46" height="9" rx="4" transform="rotate(-24)"/><path class="camp-flame-outer" d="M0 14 C-19 4 -13 -12 -3 -21 C-4 -9 4 -10 7 -28 C22 -12 21 7 0 14Z"/><path class="camp-flame-mid" d="M1 12 C-10 5 -7 -5 0 -13 C0 -5 7 -7 8 -16 C15 -5 12 8 1 12Z"/><path class="camp-flame-inner" d="M2 9 C-3 5 -2 0 2 -5 C2 0 6 1 5 6 C5 8 4 9 2 9Z"/></g></svg>`;
  const ocean=document.getElementById('leftOcean');if(ocean&&ocean.nextSibling)plane.insertBefore(layer,ocean.nextSibling);else plane.appendChild(layer);
})();