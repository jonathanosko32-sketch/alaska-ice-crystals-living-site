(()=>{
  const plane=document.getElementById('worldPlane');
  const win=document.getElementById('worldWindow');
  if(!plane||!win||plane.dataset.actual180==='1')return;
  plane.dataset.actual180='1';

  /* Preserve every existing 45K object together in one core instead of stretching it. */
  const existing=[...plane.childNodes];
  const core=document.createElement('div');
  core.id='original45kCore';
  core.setAttribute('aria-label','Original 45,000 by 45,000 developed core');
  existing.forEach(n=>core.appendChild(n));
  plane.appendChild(core);

  const style=document.createElement('style');
  style.id='actual180Style';
  style.textContent=`
    .world-plane{width:7600px!important;height:7600px!important;background:linear-gradient(135deg,#b8c9c5 0%,#dfe8e5 42%,#b4c7c3 100%)!important;border:5px solid rgba(134,239,242,.8)!important}
    #original45kCore{position:absolute;left:37.5%;top:37.5%;width:25%;height:25%;z-index:2;border:3px solid rgba(77,145,151,.28);background:radial-gradient(circle at 23% 22%,rgba(235,245,244,.72) 0 5%,transparent 18%),radial-gradient(circle at 76% 72%,rgba(229,241,239,.62) 0 7%,transparent 20%),linear-gradient(135deg,#aebfbd 0%,#d8e2df 30%,#b8c9c5 58%,#e1e8e5 100%)}
    #original45kCore>.grid,#original45kCore>.water-system-v2,#original45kCore>.road-system-v2,#original45kCore>.terrain-scenery,#original45kCore>.detail-layer,#original45kCore>.living-layer,#original45kCore>[class^='living-layer-']{position:absolute!important;inset:0!important;width:100%!important;height:100%!important}
    .active-region-grid{position:absolute;inset:0;z-index:0;pointer-events:none;background-image:linear-gradient(rgba(48,92,92,.14) 2px,transparent 2px),linear-gradient(90deg,rgba(48,92,92,.14) 2px,transparent 2px);background-size:25% 25%}
    .region-label{position:absolute;z-index:1;color:rgba(30,80,83,.38);font:900 70px system-ui,sans-serif;letter-spacing:.08em;pointer-events:none}
    .rl-nw{left:9%;top:10%}.rl-ne{right:9%;top:10%}.rl-sw{left:9%;bottom:10%}.rl-se{right:9%;bottom:10%}
    .core-label-180{position:absolute;left:50%;top:36.7%;transform:translateX(-50%);z-index:4;padding:12px 20px;border-radius:999px;background:rgba(4,40,45,.72);color:#dffcff;font:900 26px system-ui,sans-serif;pointer-events:none;white-space:nowrap}
  `;
  document.head.appendChild(style);

  const grid=document.createElement('div');grid.className='active-region-grid';plane.insertBefore(grid,core);
  [['NORTHWEST EXPANSION','rl-nw'],['NORTHEAST EXPANSION','rl-ne'],['SOUTHWEST EXPANSION','rl-sw'],['SOUTHEAST EXPANSION','rl-se']].forEach(([t,c])=>{const e=document.createElement('div');e.className='region-label '+c;e.textContent=t;plane.appendChild(e)});
  const cl=document.createElement('div');cl.className='core-label-180';cl.textContent='ORIGINAL 45,000 CORE — PRESERVED';plane.appendChild(cl);

  /* Convert the old 45K camera coordinate readout to true 180K coordinates. */
  const pos=document.getElementById('position');
  if(pos){
    const rewrite=()=>{
      const m=(pos.textContent||'').match(/X\s+(\d+)\s+•\s+Y\s+(\d+)\s+•\s+ZOOM\s+(\d+)%/i);
      if(!m)return;
      const x=Math.min(180000,Math.max(0,Math.round(Number(m[1])*4)));
      const y=Math.min(180000,Math.max(0,Math.round(Number(m[2])*4)));
      const z=m[3];
      const next=`X ${x} • Y ${y} • ZOOM ${z}% • WORLD 180000 × 180000`;
      if(pos.textContent!==next)pos.textContent=next;
    };
    const mo=new MutationObserver(rewrite);mo.observe(pos,{childList:true,characterData:true,subtree:true});rewrite();
  }
  const stamp=document.querySelector('.stamp');if(stamp)stamp.textContent='180,000 × 180,000 ACTIVE ALASKA WORLD • EXPANDABLE • 45,000 CORE PRESERVED';
  document.documentElement.dataset.visibleWorld='180000';
})();