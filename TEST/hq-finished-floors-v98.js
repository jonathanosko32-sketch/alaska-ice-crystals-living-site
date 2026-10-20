(()=>{
'use strict';
const root=document.getElementById('hq66');if(!root||document.getElementById('hq-floors98'))return;
const style=document.createElement('style');style.id='hq-floors98';style.textContent=`
#hq66.fix72 .h69-shell{max-width:1120px!important}
#hq66.fix72 #h69-down .h69-shell,#hq66.fix72 #h69-down .h69-living,#hq66.fix72 #h69-up .h69-shell,#hq66.fix72 .h69-up{min-height:0!important}
#hq66.fix72 #h69-down .h69-living{padding-bottom:100px!important}
#hq66.fix72 .h69-up{padding-bottom:100px!important}
#hq66.fix72 .h70-home{gap:22px!important}
.floor98-nav{position:relative;z-index:10;display:flex;gap:8px;flex-wrap:wrap;margin:0 0 18px}
.floor98-nav button,.f98-control{min-height:46px;border:1px solid #c19d65;border-radius:7px;padding:10px 14px;background:linear-gradient(#173f49,#092330);color:#e4fff5;font:600 14px system-ui;cursor:pointer}
.floor98-nav button:focus-visible,.f98-control:focus-visible,.f98-notes textarea:focus-visible{outline:3px solid #a9fff1;outline-offset:3px}
#hq66 .f98-room-name{font:500 clamp(21px,4vw,30px) Georgia;color:#ffe2b0;margin:0 0 12px;letter-spacing:.04em}
.f98-panel{border:2px solid #a47a46;border-radius:10px;background:linear-gradient(145deg,#71482a,#3c2417);box-shadow:inset 0 0 0 5px #26130b44,0 12px 20px #0006;padding:18px;color:#ffeed0}
.f98-house-controls{position:relative;display:flex;gap:10px;align-items:center;justify-content:center;flex-wrap:wrap;border:1px solid #ba985b66;padding:12px;border-radius:10px;background:#20130caa;margin:10px 0 20px;z-index:8}
.f98-house-controls p{margin:0 10px 0 0;font:16px Georgia;color:#efdaae}
.f98-tools{display:flex;gap:10px;flex-wrap:wrap;margin-top:12px}.f98-tools a{display:flex;min-height:46px;align-items:center;padding:10px 14px;border:1px solid #ad8b58;border-radius:7px;color:#befff1;background:#102e38;text-decoration:none;font:600 14px system-ui}
#hq66.fix72 .h70-fire-room{padding-top:65px!important}.f98-fire-heading{position:absolute;top:20px;left:20px;right:20px;text-align:center;font:500 25px Georgia;color:#ffe1a8}
#hq66.fix72 .h70-fire-room:before{display:none}
#hq66.fix72 .h70-tv{display:flex!important;align-items:center;justify-content:center;text-align:center;flex-direction:column;color:#acf9ed!important;text-shadow:0 0 7px #38c9bd55;font:500 18px Georgia!important}
#hq66.fix72 .h70-tv:before,#hq66.fix72 .h70-tv:after{display:none!important}.h70-tv small{display:block;margin:5px;font:11px system-ui;color:#b8d2d2}
.f98-table-tray{position:absolute;inset:12px 22%;border:3px solid #24140b;border-radius:50%;background:radial-gradient(ellipse,#c89c5b,#5b351c);box-shadow:0 5px 9px #0008;display:flex;align-items:center;justify-content:center;gap:12px}
.f98-cup{display:block;width:25px;height:25px;border:4px solid #dce8df;border-radius:50%;background:#3c2115;box-shadow:3px 3px 4px #0008}.f98-cup:after{content:'';display:block;width:7px;height:10px;border:3px solid #dce8df;border-radius:5px;transform:translate(17px,2px)}
.f98-kitchen-window{position:absolute;left:30%;right:30%;top:95px;height:110px;border:9px solid #342013;border-radius:5px;background:linear-gradient(#142c48 0 44%,#5ba1b4 45% 60%,#eaf5f3 61%);box-shadow:inset 0 0 12px #0007}.f98-kitchen-window:before{content:'';position:absolute;left:48%;height:100%;width:5px;background:#382312}.f98-kitchen-window:after{content:'';position:absolute;top:47%;width:100%;height:5px;background:#382312}
.f98-counter-items{position:absolute;left:9%;top:57%;display:flex;gap:8px;align-items:end}.f98-counter-items i{width:23px;height:35px;border:2px solid #c6cab8;border-radius:5px;background:linear-gradient(90deg,#8fcdc7,#214948);box-shadow:0 4px 6px #0006}.f98-counter-items i:nth-child(2){height:45px;background:linear-gradient(90deg,#d2c5a7,#75613e)}
.f98-dining-set{position:absolute;left:20%;right:20%;top:19%;bottom:19%;display:flex;align-items:center;justify-content:space-around}.f98-dining-set i{width:40px;height:27px;border-radius:50%;background:#e8e8d4;box-shadow:inset 0 0 0 4px #b1b7a5,0 3px 4px #0008}.f98-dining-set i:nth-child(2){width:27px;height:50px;border:3px solid #8bba9c;background:linear-gradient(#c8e5be,#315c3a);border-radius:30%}
#hq66.fix72 .h70-dining-table:before{display:none}
#hq66.fix72 .h72-bedroom{min-height:760px!important}
.f98-bed-pillows{position:absolute;left:10%;right:10%;top:32px;display:flex;gap:10px}.f98-bed-pillows i{height:58px;flex:1;border-radius:17px;background:linear-gradient(#fff8e4,#c7c5b1);box-shadow:inset 0 0 0 3px #ddd3b6,0 4px 7px #0006}.f98-bedroom-actions{position:absolute;bottom:18px;left:12px;right:12px;z-index:10;display:flex;justify-content:center}
#hq66.fix72 .h72-bedroom.lamps-off .h72-night:before{filter:brightness(.3);opacity:.45}
#hq66.fix72 .h72-prayer{min-height:490px}.f98-reading-actions{position:absolute;bottom:55px;left:16px;right:16px;z-index:12;display:flex;justify-content:center}.f98-reading-actions a{text-align:center}
#hq66 .h72-prayer-note{font-size:11px;bottom:20px}
.f98-notes{margin-top:20px}.f98-notes label{display:block;color:#ffe1a5;font:20px Georgia;margin-bottom:9px}.f98-notes textarea{display:block;box-sizing:border-box;width:100%;min-height:150px;resize:vertical;padding:14px;border:1px solid #b99961;border-radius:7px;background:#fcf3df;color:#243036;font:16px/1.6 system-ui}.f98-save-state{display:block;margin-top:7px;color:#c9e6da;font:13px system-ui}
#hq66.house-lights-low .h69-shell{background-color:#20150f!important}#hq66.house-lights-low .h69-window,#hq66.house-lights-low .h71-snow-window,#hq66.house-lights-low .h72-snow-window{filter:brightness(.55)}#hq66.house-lights-low .h70-lamp,#hq66.house-lights-low .h71-pendants,#hq66.house-lights-low .h71-chandelier{filter:brightness(.35)}
#hq66 .f98-controls-hidden{display:none!important}
@media(max-width:650px){.floor98-nav button{flex:1 1 100px;padding:9px;font-size:13px}.f98-house-controls{justify-content:flex-start}.f98-house-controls p{width:100%;text-align:center}.f98-house-controls button{flex:1}.f98-table-tray{inset:10px 17%}.f98-kitchen-window{left:28%;right:28%;top:100px;height:85px}.f98-counter-items{left:8%}.f98-dining-set i{width:27px;height:21px}.f98-notes textarea{font-size:17px}}
`;document.head.appendChild(style);
const get=selector=>root.querySelector(selector);
function jump(id){const node=document.getElementById(id);if(node)node.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})}
const roomList=[['h70-fire-room','Great room'],['h70-living-room','Living room'],['h70-kitchen','Kitchen'],['h70-dining','Dining'],['skie-workspace','SKIE study'],['h72-bedroom','Bedroom'],['h72-prayer','Reading room']];
for(const [key]of roomList){const node=get('.'+key)||document.getElementById(key);if(node&&!node.id)node.id=key}
for(const [selector,entries]of [['#h69-down .h69-living',roomList.slice(0,4)],['#h69-up .h69-up',roomList.slice(4)]]){
const host=get(selector);if(!host)continue;const nav=document.createElement('nav');nav.className='floor98-nav';nav.setAttribute('aria-label',selector.includes('down')?'Downstairs rooms':'Upstairs rooms');for(const [id,title]of entries){const b=document.createElement('button');b.type='button';b.textContent=title;b.addEventListener('click',()=>jump(id));nav.appendChild(b)}host.prepend(nav);
}
const controls=document.createElement('section');controls.className='f98-house-controls';controls.setAttribute('aria-label','House lighting and entertainment');controls.innerHTML='<p>Welcome to SKIE’s home</p><button class="f98-control" type="button" id="f98-lights" aria-pressed="false">House lights · Bright</button><a class="f98-control" href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" style="text-decoration:none">Open music &amp; videos ↗</a>';get('#h69-down .h69-living')?.prepend(controls);
let low=false;try{low=localStorage.getItem('osko-house-lights-low')==='yes'}catch{}
function lights(){root.classList.toggle('house-lights-low',low);const b=document.getElementById('f98-lights');b.textContent='House lights · '+(low?'Soft':'Bright');b.setAttribute('aria-pressed',String(low))}
document.getElementById('f98-lights').addEventListener('click',()=>{low=!low;lights();try{localStorage.setItem('osko-house-lights-low',low?'yes':'no')}catch{}});lights();
const fire=get('.h70-fire-room');fire?.insertAdjacentHTML('afterbegin','<h2 class="f98-fire-heading">Crystal Fireplace &amp; Music Room</h2>');
const tv=get('.h70-tv');if(tv){tv.textContent='Alaska Ice Crystals';const sub=document.createElement('small');sub.textContent='YOUR HOME • MUSIC • MOMENTS';tv.appendChild(sub)}
get('.h70-table')?.insertAdjacentHTML('beforeend','<div class="f98-table-tray" aria-hidden="true"><i class="f98-cup"></i><i class="f98-cup"></i></div>');
get('.h70-kitchen')?.insertAdjacentHTML('beforeend','<div class="f98-kitchen-window" aria-hidden="true"></div><div class="f98-counter-items" aria-hidden="true"><i></i><i></i><i></i></div>');
get('.h70-dining-table')?.insertAdjacentHTML('beforeend','<div class="f98-dining-set" aria-hidden="true"><i></i><i></i><i></i></div>');
get('.h72-bed')?.insertAdjacentHTML('beforeend','<div class="f98-bed-pillows" aria-hidden="true"><i></i><i></i></div>');
const bed=get('.h72-bedroom');if(bed){bed.insertAdjacentHTML('beforeend','<div class="f98-bedroom-actions"><button class="f98-control" type="button" id="f98-lamps" aria-pressed="true">Bedside lamps · On</button></div>');let on=true;try{on=localStorage.getItem('osko-bedroom-lamps')!=='off'}catch{}const apply=()=>{bed.classList.toggle('lamps-off',!on);const b=document.getElementById('f98-lamps');b.textContent='Bedside lamps · '+(on?'On':'Off');b.setAttribute('aria-pressed',String(on))};document.getElementById('f98-lamps').onclick=()=>{on=!on;apply();try{localStorage.setItem('osko-bedroom-lamps',on?'on':'off')}catch{}};apply()}
get('.h72-prayer')?.insertAdjacentHTML('beforeend','<div class="f98-reading-actions f98-tools"><a href="https://docs.google.com/document/" target="_blank" rel="noopener noreferrer">Open your reading &amp; writing ↗</a></div>');
const workspace=get('#skie-workspace');if(workspace){const notes=document.createElement('section');notes.className='f98-notes';notes.innerHTML='<label for="f98-notepad">SKIE’s desk notes</label><textarea id="f98-notepad" placeholder="Write what you want to work on tomorrow…"></textarea><span class="f98-save-state" role="status">Notes stay in this browser on this device.</span>';workspace.appendChild(notes);const input=notes.querySelector('textarea'),state=notes.querySelector('[role=status]');try{input.value=localStorage.getItem('osko-house-desk-notes')||''}catch{state.textContent='Saving is unavailable in this browser.'}input.addEventListener('input',()=>{try{localStorage.setItem('osko-house-desk-notes',input.value);state.textContent='Saved on this device. Use Google Docs for notes shared across devices.'}catch{state.textContent='Could not save. Copy your notes before leaving.'}})}
root.querySelectorAll('.h77-floor-label').forEach(el=>el.textContent=el.closest('#h69-up')?'SKIE’S UPSTAIRS • WORK • REST • READ':'SKIE’S DOWNSTAIRS • GATHER • RELAX • FEEL AT HOME');
if(document.body.classList.contains('house-only'))for(const id of ['h69-yard','h69-yard-top']){const b=document.getElementById(id);if(b)b.onclick=()=>location.href='./OSKO-Living-OS-HOUSE-READY-v98.html'}
window.OSKO_HOUSE_FLOORS_VERSION='98';
})();