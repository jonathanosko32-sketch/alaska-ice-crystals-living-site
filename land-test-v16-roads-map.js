(() => {
 const property=document.getElementById('property');
 const right=document.querySelector('.sector-right');
 const back=document.querySelector('.sector-back');
 const left=document.querySelector('.sector-left');
 if(!property||!right||!back||!left)return;
 const style=document.createElement('style');
 style.textContent=`
 .district-road-v16{position:absolute;z-index:3;pointer-events:none;background:linear-gradient(90deg,rgba(19,31,35,.92),rgba(58,68,69,.78) 48%,rgba(106,225,240,.14) 49.4% 50.6%,rgba(58,68,69,.78) 52%,rgba(19,31,35,.92));box-shadow:inset 0 0 12px rgba(0,0,0,.3)}
 .district-road-v16.main{left:50%;bottom:-8%;width:16%;height:67%;transform:translateX(-50%);clip-path:polygon(39% 0,61% 0,100% 100%,0 100%)}
 .district-road-v16.left{left:13%;bottom:18%;width:39%;height:13%;transform:rotate(-12deg);clip-path:polygon(0 30%,100% 0,100% 70%,0 100%)}
 .district-road-v16.right{right:13%;bottom:18%;width:39%;height:13%;transform:rotate(12deg);clip-path:polygon(0 0,100% 30%,100% 100%,0 70%)}
 .map-btn-v16{position:fixed;z-index:96;left:12px;bottom:18px;border:1px solid rgba(108,231,249,.62);border-radius:16px;padding:9px 13px;background:rgba(3,24,35,.9);color:#e3fbff;font-size:.68rem;font-weight:900;letter-spacing:.08em}
 .property-map-v16{position:fixed;z-index:97;left:12px;right:12px;bottom:64px;max-width:390px;margin:auto;padding:12px;border:1px solid rgba(105,231,249,.5);border-radius:18px;background:rgba(2,18,28,.96);box-shadow:0 14px 35px rgba(0,0,0,.5)}
 .property-map-v16[hidden]{display:none}.property-map-v16 h3{margin:0 0 8px;text-align:center;color:#dffbff;font-size:.78rem}.map-grid-v16{display:grid;grid-template-columns:1fr 1fr;gap:7px}.map-zone-v16{padding:8px;border:1px solid rgba(99,219,238,.22);border-radius:10px;background:rgba(14,48,60,.72);color:#dff8fb;font-size:.62rem}.map-zone-v16 strong{display:block;color:#8eeafa;margin-bottom:3px}.map-note-v16{display:block;margin-top:8px;text-align:center;color:#9ed9e2;font-size:.55rem}
 @media(max-width:520px){.map-btn-v16{left:8px;bottom:12px}.property-map-v16{left:8px;right:8px;bottom:56px}}
 `;document.head.appendChild(style);
 const addRoads=(sector)=>{if(sector.querySelector('.district-road-v16'))return;['main','left','right'].forEach(c=>{const r=document.createElement('div');r.className='district-road-v16 '+c;sector.insertBefore(r,sector.firstChild);});};
 [right,back,left].forEach(addRoads);
 const btn=document.createElement('button');btn.type='button';btn.className='map-btn-v16';btn.textContent='PROPERTY MAP';
 const map=document.createElement('div');map.className='property-map-v16';map.hidden=true;map.innerHTML=`<h3>ALASKA ICE CRYSTALS • PROPERTY MAP</h3><div class="map-grid-v16"><div class="map-zone-v16"><strong>FRONT • 0°</strong>Gate • entrance • main road</div><div class="map-zone-v16"><strong>RIGHT • 90°</strong>Workshop • truck yard • freight</div><div class="map-zone-v16"><strong>BACK • 180°</strong>Headquarters • Outfitters • campfire</div><div class="map-zone-v16"><strong>LEFT • 270°</strong>OSKO Farm • barn • farm shop • animals</div></div><span class="map-note-v16">Main road connects the property. Side roads branch into each district. Land size stays locked.</span>`;
 property.append(btn,map);btn.addEventListener('click',()=>{map.hidden=!map.hidden;btn.textContent=map.hidden?'PROPERTY MAP':'CLOSE MAP';});
 const stamp=document.querySelector('.build-stamp');if(stamp)stamp.textContent='LAND TEST • v16 road network + property map';
})();