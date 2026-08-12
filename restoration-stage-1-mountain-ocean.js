(()=>{
  /* SAFE RESTORATION STAGE 1
     Preserve original lake/river/building core. This layer only establishes
     the rear property mountain wall and temporary ocean spacing for later
     realistic shoreline/reflection work. */
  const plane=document.getElementById('worldPlane');
  if(!plane||document.getElementById('restoreRearMountains'))return;

  const style=document.createElement('style');
  style.id='restoreStage1Style';
  style.textContent=`
    #restoreRearMountains{position:absolute;left:0;right:0;top:0;height:12%;z-index:0;pointer-events:none;overflow:hidden}
    #restoreRearMountains svg{width:100%;height:100%;display:block}
    #restoreRearMountains .rear-base{fill:#405a58;stroke:#304747;stroke-width:4}
    #restoreRearMountains .rear-snow{fill:#dce8e8;opacity:.9}
    #restoreRearMountains .rear-tree{fill:#244a3d;opacity:.9}
    /* Temporary coast spacing: pull ocean slightly away from the rear edge while mountains are built. */
    .water-system-v2{z-index:1!important}
    .ocean-shape{transform:translate(0,3%);transform-box:fill-box;transform-origin:center}
    .ocean-wave{transform:translate(0,3%);transform-box:fill-box;transform-origin:center}
    /* Original water geometry stays intact; lake and rivers are not altered. */
    .lake-shape,.lake-highlight,.river-bed,.river-water{transform:none!important}
  `;
  document.head.appendChild(style);

  const rear=document.createElement('div');
  rear.id='restoreRearMountains';
  rear.setAttribute('aria-hidden','true');
  rear.innerHTML=`<svg viewBox="0 0 1000 180" preserveAspectRatio="none">
    <path class="rear-base" d="M0 178 L0 122 L45 82 L82 120 L128 46 L170 116 L218 62 L264 124 L315 28 L365 119 L420 54 L470 124 L525 22 L580 118 L632 48 L686 125 L744 31 L798 119 L850 58 L902 124 L950 72 L1000 116 L1000 178 Z"/>
    <path class="rear-snow" d="M108 77 L128 46 L149 80 L138 72 L128 85 L118 70 Z M294 61 L315 28 L338 65 L326 57 L315 72 L304 56 Z M502 58 L525 22 L550 62 L536 54 L525 70 L514 53 Z M722 65 L744 31 L768 68 L755 60 L744 75 L733 58 Z"/>
    <path class="rear-tree" d="M0 155 C80 132 150 160 225 142 C300 125 370 158 445 140 C525 122 600 158 680 139 C760 121 845 157 920 138 C950 131 978 133 1000 138 L1000 180 L0 180 Z"/>
  </svg>`;
  plane.insertBefore(rear,plane.firstChild);

  document.documentElement.dataset.restoreStage='1-mountain-ocean';
})();