(()=>{
'use strict';
const root=document.getElementById('hq66');if(!root||document.getElementById('hq-command-v1'))return;
const css=document.createElement('style');css.id='hq-command-v1';css.textContent=`
#hq66.fix72 #h69-bible,#hq66.fix72 .h69-book,#hq66.fix72 .h70-book,#hq66.fix72 .h72-bible,#hq66.fix72 #h74-desk-book{display:none!important}
#hq66.fix72 .h69-head{grid-template-columns:80px 1fr 80px!important;min-height:70px!important;padding:8px!important}
#hq66.fix72 .h69-head button{min-height:48px!important;min-width:64px!important;font-size:13px!important}
#hq66.fix72 .h69-tabs{padding:8px!important;gap:8px!important}#hq66.fix72 .h69-tabs button{min-height:52px!important;font-size:15px!important}
#hq66.fix72 .h69-foot{padding:8px!important;gap:8px!important}#hq66.fix72 .h69-foot button{min-height:52px!important;height:52px!important;font-size:14px!important}
#hq66.fix72 .h69-title b{font-size:clamp(17px,3vw,25px)!important}#hq66.fix72 .h69-title span{font-size:10px!important}
#hq66.fix72 .h69-head{grid-template-columns:80px 1fr!important}
#hq66.fix72 #h69-up .h69-up{padding-top:135px!important}
.hq-workspace{position:relative;border:5px solid #382010;border-radius:15px;background:linear-gradient(135deg,#82532f,#422514);padding:clamp(16px,3vw,28px);box-shadow:0 16px 28px #0008;color:#fff1d6}
.hq-workspace h2{font:500 clamp(26px,5vw,36px) Georgia;margin:0 0 9px;color:#ffe1a5}.hq-workspace p{font:16px/1.6 system-ui;color:#e4d7c1;margin:0 0 18px}
.hq-tools{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}.hq-tool{display:flex;flex-direction:column;justify-content:center;gap:6px;min-height:100px;padding:16px;text-decoration:none;border:1px solid #b99561;border-radius:10px;background:linear-gradient(#113b46,#071e2d);color:#d1fff2;box-shadow:0 6px 12px #0005;font:600 19px Georgia}.hq-tool small{font:13px/1.4 system-ui;color:#c1d8d8}.hq-tool:hover{border-color:#e8d29d;background:#174852}.hq-tool:focus-visible,.hq-search input:focus-visible,.hq-search button:focus-visible{outline:3px solid #baffef;outline-offset:3px}
.hq-search{display:flex;gap:9px;margin:22px 0}.hq-search label{flex:1;font:14px system-ui;color:#ffe5b5}.hq-search input{display:block;margin-top:7px;min-width:0;width:100%;box-sizing:border-box;min-height:50px;padding:12px;border:1px solid #bb9860;border-radius:7px;background:#fff7e8;color:#182830;font:17px system-ui}.hq-search button{align-self:end;min-height:50px;padding:12px 18px;border:1px solid #bb9860;border-radius:7px;background:#153d46;color:#dcfff1;font:600 16px system-ui}
.hq-desk-note{padding:15px;border-left:3px solid #c3a167;background:#1b100b66;font:14px/1.6 system-ui!important}.hq-desk-note a{color:#aaffee}.hq-house-shortcut{position:fixed;right:10px;top:100px;z-index:30;min-height:48px;border:1px solid #b99b63;border-radius:9px;background:#103542;color:#e6fff3;padding:10px 15px;font:600 15px system-ui}body.house-only #hq66{display:flex}.hq-standalone-nav{display:none}body.house-only .hq-standalone-nav{display:block;position:fixed;inset:0;background:#071b29;color:white;padding:35px;font:20px system-ui}
@media(max-width:650px){.hq-tools{grid-template-columns:1fr 1fr}.hq-tool{padding:12px;font-size:17px;min-height:95px}.hq-workspace{padding:15px}.hq-search{flex-wrap:wrap}.hq-search label{flex-basis:100%}.hq-search button{width:100%}.hq-house-shortcut{top:92px}}
@media(prefers-reduced-motion:reduce){#hq66.fix72 *{animation:none!important;transition:none!important}}
`;document.head.appendChild(css);
root.querySelectorAll('#h69-bible,.h69-book,.h70-book,.h72-bible,#h74-desk-book').forEach(el=>el.remove());
const targets=[
['Google','Search the internet','https://www.google.com/'],
['Gmail','Email','https://mail.google.com/'],
['Google Drive','Files and projects','https://drive.google.com/'],
['Google Docs','Writing and documents','https://docs.google.com/document/'],
['Google Sheets','Numbers and planning','https://docs.google.com/spreadsheets/'],
['Google Calendar','Appointments and dates','https://calendar.google.com/'],
['Google Photos','Pictures','https://photos.google.com/'],
['YouTube','Videos and learning','https://www.youtube.com/'],
['Talk with ChatGPT','Open your ChatGPT account','https://chatgpt.com/']
];
const workspace=document.createElement('section');workspace.className='hq-workspace';workspace.id='skie-workspace';workspace.setAttribute('aria-label','SKIE’s working study');
workspace.innerHTML='<h2>SKIE’s Working Study</h2><p>Your desk for the internet, email, files, writing, and planning.</p><form class="hq-search" action="https://www.google.com/search" method="get" target="_blank" rel="noopener noreferrer"><label>Search Google<input name="q" type="search" placeholder="What would you like to find?" required></label><button type="submit">Search</button></form><nav class="hq-tools" aria-label="Work tools">'+targets.map(([name,desc,href])=>'<a class="hq-tool" href="'+href+'" target="_blank" rel="noopener noreferrer">'+name+'<small>'+desc+' ↗</small></a>').join('')+'</nav><p class="hq-desk-note" style="margin-top:20px">Your tools open in their own tabs. Keep this house tab open to return to your desk. Sign in to each service with your own account.<br>ChatGPT opens as a separate conversation. SKIE does not yet control these services.<br>The Bible is on your <a href="https://alaskaicecrystals.com/church/" target="_blank" rel="noopener noreferrer">Alaska Ice Crystals website</a>.</p>';
const library=root.querySelector('.h72-library');if(library)library.replaceWith(workspace);else root.querySelector('.h69-up')?.prepend(workspace);
root.querySelector('.h72-prayer h2')?.replaceChildren(document.createTextNode('Quiet Reading Room'));
const prayerNote=root.querySelector('.h72-prayer-note');if(prayerNote)prayerNote.textContent='A QUIET PLACE TO READ • THINK • PLAN';
const prayerLight=root.querySelector('.h77-prayer-light');if(prayerLight)prayerLight.remove();
root.querySelectorAll('.h77-floor-label').forEach(el=>el.textContent=el.closest('#h69-up')?'UPSTAIRS • SKIE WORKING STUDY • BEDROOM • READING ROOM':'DOWNSTAIRS • LIVING ROOM • FIREPLACE • KITCHEN • DINING');
function label(){const title=root.querySelector('.h69-title span');if(title)title.textContent=root.querySelector('#h69-up')?.classList.contains('on')?'UPSTAIRS • SKIE’S WORKING STUDY':'DOWNSTAIRS • WELCOME HOME'}
['h69-down-tab','h69-up-tab','h69-stairs','h69-switch'].forEach(id=>document.getElementById(id)?.addEventListener('click',()=>requestAnimationFrame(label)));
document.querySelector('.hq-standalone-nav')?.remove();
const up=root.querySelector('#h69-up');if(up)new MutationObserver(label).observe(up,{attributes:true,attributeFilter:['class']});label();
function open(){if(!document.body.classList.contains('house-only')){window.top.location.href=new URL('./SKIE-HOUSE-v99.html?v=99b',location.href).href;return}root.classList.add('open');document.getElementById('h69-up-tab')?.click()}
window.OSKO_HQ_OPEN=open;
document.addEventListener('click',e=>{const button=e.target.closest?.('.chip');if(button?.textContent.trim().toUpperCase()==='OPEN'&&/Alaska Ice Crystals HQ/i.test(document.getElementById('ptitle')?.textContent||'')){e.preventDefault();e.stopImmediatePropagation();open()}},true);
if(document.body.classList.contains('house-only')){open();for(const id of ['h69-yard','h69-yard-top']){const b=document.getElementById(id);if(b){b.textContent='LIVING OS';b.onclick=()=>location.href='./OSKO-Living-OS-HOUSE-READY-v97.html'}}}else{const b=document.createElement('button');b.className='hq-house-shortcut';b.textContent='SKIE’s House';b.addEventListener('click',open);document.body.appendChild(b)}
})();