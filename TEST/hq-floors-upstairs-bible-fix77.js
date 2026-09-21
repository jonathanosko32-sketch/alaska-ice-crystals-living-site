(function hq77FinishedFloorsUpstairsOnlyBible(){
'use strict';
const root=document.getElementById('hq66');
if(!root||document.getElementById('hq77-style'))return;
root.classList.add('fix77');

const css=document.createElement('style');
css.id='hq77-style';
css.textContent=`
/* FIX77: finish both home levels without changing the working Bible reader. */
#hq66.fix77 .h69-room{background:#31170b}
#hq66.fix77 .h69-shell{border-bottom:14px solid #241006;box-shadow:inset 0 0 80px #160702,0 24px 38px #000c}
#hq66.fix77 .h69-shell:before{content:"";position:absolute;z-index:2;left:3%;right:3%;top:103px;height:18px;border:4px solid #2a1307;border-radius:8px;background:linear-gradient(90deg,#3d1d0c,#a16a3c 22%,#5d3017 50%,#a16a3c 78%,#3d1d0c);box-shadow:0 8px 12px #0009}
#hq66.fix77 .h69-floor{box-shadow:inset 0 8px 20px #0008,0 -8px 18px #1b0905}
#hq66.fix77 #h69-down .h69-living{padding-top:138px!important;padding-bottom:190px!important}
#hq66.fix77 #h69-up .h69-up{padding-top:155px!important;padding-bottom:185px!important}
.h77-floor-label{position:relative;z-index:9;width:92%;margin:0 auto 23px;padding:16px 10px;border:4px solid #2b1408;border-radius:13px;background:linear-gradient(#a06a3e,#593018);box-shadow:0 13px 17px #000a,inset 0 0 0 2px #d6a36b55;color:#ffdfa7;text-align:center;font:900 19px Georgia;letter-spacing:.09em;text-shadow:0 3px 4px #000}
#hq66.fix77 .h70-zone,#hq66.fix77 .h72-room{outline:2px solid #d7a66b38;outline-offset:-13px}
#hq66.fix77 .h70-zone:after,#hq66.fix77 .h72-room:before{content:"";position:absolute;z-index:1;left:19px;right:19px;top:15px;height:5px;border-radius:9px;background:linear-gradient(90deg,transparent,#e0b57977 18% 82%,transparent);pointer-events:none}
#hq66.fix77 .h70-kitchen,#hq66.fix77 .h70-dining,#hq66.fix77 .h70-living-room,#hq66.fix77 .h70-fire-room{box-shadow:0 25px 34px #000c,inset 0 0 42px #170803}
#hq66.fix77 .h72-library,#hq66.fix77 .h72-bedroom,#hq66.fix77 .h72-prayer{box-shadow:0 27px 37px #000c,inset 0 0 46px #170803}

/* The downstairs table stays furnished, but it is not a second Bible location. */
#hq66.fix77 .h70-book,#hq66.fix77 #h69-table-book,#hq66.fix77 #hq66-table-bible{display:none!important}
.h77-down-centerpiece{position:absolute;left:50%;top:9px;transform:translateX(-50%);width:92px;height:54px;border:4px solid #2b160b;border-radius:50%;background:radial-gradient(ellipse,#d4a35f 0 10%,#6d3519 12% 58%,#32170a 60%);box-shadow:0 10px 12px #000b,inset 0 0 0 3px #d6a05a55}
.h77-down-centerpiece:before{content:"";position:absolute;left:50%;bottom:22px;width:18px;height:45px;transform:translateX(-50%);border-radius:50% 50% 22% 22%;background:linear-gradient(90deg,#174f45,#49a56f,#174f45);box-shadow:-20px 9px 0 -5px #286a53,20px 9px 0 -5px #286a53,0 0 13px #62b982}
.h77-down-centerpiece:after{content:"WELCOME";position:absolute;left:50%;top:38px;transform:translateX(-50%);color:#ffe0a5;font:900 8px Georgia;letter-spacing:.1em}

/* One physical Bible only: the usable KJV on SKIE's upstairs desk. */
#hq66.fix77 #h72-bible,#hq66.fix77 .h72-bible,#hq66.fix77 #h73-desk-bible{display:none!important}
#hq66.fix77 #h74-desk-book{display:block!important;z-index:12!important}
.h77-prayer-light{position:absolute;left:50%;top:23px;transform:translateX(-50%);width:72px;height:72px;border:4px solid #d4ad68;border-radius:50%;background:radial-gradient(circle,#fffbd1 0 14%,#ffc75e 15% 36%,#8e481d 37% 58%,#3c1d0d 60%);box-shadow:0 0 24px #ffc65c,0 13px 14px #0009}
.h77-prayer-light:after{content:"PRAYER";position:absolute;left:50%;top:79px;transform:translateX(-50%);color:#ffe2aa;font:900 10px Georgia;letter-spacing:.13em}

/* Bible access belongs to the upstairs floor. */
#hq66.fix77 #h69-bible{transition:opacity .18s ease}
#hq66.fix77:not(.h77-upstairs) #h69-bible{visibility:hidden;pointer-events:none;opacity:0}
#hq66.fix77.h77-upstairs #h69-bible{visibility:visible;pointer-events:auto;opacity:1}

@media(max-width:620px){
 #hq66.fix77 #h69-down .h69-living{padding-top:132px!important;padding-bottom:175px!important}
 #hq66.fix77 #h69-up .h69-up{padding-top:150px!important;padding-bottom:175px!important}
 .h77-floor-label{font-size:16px;padding:14px 7px}
}
`;
document.head.appendChild(css);

// Remove the older physical Bible props; the full reader itself remains untouched.
['hq66-table-bible','h69-table-book','h70-book','h72-bible','h73-desk-bible'].forEach(id=>document.getElementById(id)?.remove());

const downstairs=root.querySelector('#h69-down .h69-living');
if(downstairs&&!downstairs.querySelector('.h77-floor-label'))downstairs.insertAdjacentHTML('afterbegin','<div class="h77-floor-label">FINISHED DOWNSTAIRS • LIVING ROOM • FIREPLACE • KITCHEN • DINING</div>');
const downTable=root.querySelector('.h70-table');
if(downTable&&!downTable.querySelector('.h77-down-centerpiece'))downTable.insertAdjacentHTML('beforeend','<div class="h77-down-centerpiece" aria-hidden="true"></div>');

const upstairs=root.querySelector('#h69-up .h69-up');
if(upstairs&&!upstairs.querySelector('.h77-floor-label'))upstairs.insertAdjacentHTML('afterbegin','<div class="h77-floor-label">FINISHED UPSTAIRS • SKIE STUDY • BEDROOM • PRAYER ROOM</div>');
const prayerTable=root.querySelector('.h72-prayer-table');
if(prayerTable&&!prayerTable.querySelector('.h77-prayer-light'))prayerTable.insertAdjacentHTML('beforeend','<div class="h77-prayer-light" aria-hidden="true"></div>');

function syncFloor(){
 const up=document.getElementById('h69-up');
 root.classList.toggle('h77-upstairs',!!up&&up.classList.contains('on'));
 const title=root.querySelector('.h69-title span');
 if(title)title.textContent=root.classList.contains('h77-upstairs')?'UPSTAIRS • SKIE DESK • FULL USABLE KJV BIBLE':'DOWNSTAIRS • COMPLETE COUNTRY LOG HOME';
}
['h69-down-tab','h69-up-tab','h69-stairs','h69-switch'].forEach(id=>document.getElementById(id)?.addEventListener('click',()=>requestAnimationFrame(syncFloor)));
const up=document.getElementById('h69-up');
if(up)new MutationObserver(syncFloor).observe(up,{attributes:true,attributeFilter:['class']});
syncFloor();
})();
