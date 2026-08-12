(()=>{
  const REGION_SIZE=45000;
  const ACTIVE_SPAN=180000;
  const HALF=ACTIVE_SPAN/2;
  const regions=new Map();
  window.OSKO_WORLD={
    regionSize:REGION_SIZE,
    activeSpan:ACTIVE_SPAN,
    unbounded:true,
    core:{name:'Original Alaska Ice Crystals Property',x:0,y:0,size:REGION_SIZE},
    regionKey:(rx,ry)=>`${rx},${ry}`,
    getRegion(rx,ry){
      const key=this.regionKey(rx,ry);
      if(!regions.has(key))regions.set(key,{key,rx,ry,x:rx*REGION_SIZE,y:ry*REGION_SIZE,size:REGION_SIZE,state:'reserved',features:[]});
      return regions.get(key);
    },
    reserve(rx,ry,label){const r=this.getRegion(rx,ry);r.label=label;r.state='reserved';return r},
    allRegions:()=>[...regions.values()]
  };
  for(let ry=-2;ry<2;ry++)for(let rx=-2;rx<2;rx++)window.OSKO_WORLD.getRegion(rx,ry);
  window.OSKO_WORLD.reserve(0,0,'ORIGINAL DEVELOPED CORE');
  window.OSKO_WORLD.reserve(-1,0,'WEST EXPANSION');
  window.OSKO_WORLD.reserve(1,0,'EAST EXPANSION');
  window.OSKO_WORLD.reserve(0,-1,'NORTH / MOUNTAIN EXPANSION');
  window.OSKO_WORLD.reserve(0,1,'SOUTH / COAST EXPANSION');
  document.documentElement.dataset.oskoWorld='expandable';
  document.documentElement.style.setProperty('--osko-region-size',REGION_SIZE);
  document.documentElement.style.setProperty('--osko-active-span',ACTIVE_SPAN);
  const stamp=document.querySelector('.stamp');
  if(stamp)stamp.textContent='180,000 × 180,000 ACTIVE ALASKA REGION • EXPANDABLE WORLD • ORIGINAL 45,000 CORE PRESERVED';
  const card=document.querySelector('.hud .card strong');
  if(card)card.textContent='LIVING WORLD V2 • EXPANSION TEST';
  const note=document.createElement('div');
  note.id='expansionArchitectureNote';
  note.setAttribute('aria-hidden','true');
  note.dataset.regionSize=REGION_SIZE;
  note.dataset.activeSpan=ACTIVE_SPAN;
  note.dataset.unbounded='true';
  note.dataset.corePreserved='true';
  note.style.display='none';
  document.body.appendChild(note);
})();