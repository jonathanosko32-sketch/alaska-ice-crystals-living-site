(function hq74OpenBibleReader(){
'use strict';
const root=document.getElementById('hq66'),bible=document.getElementById('bible66');
if(!root||!bible||document.getElementById('hq74-style'))return;
root.classList.add('fix74');

const css=document.createElement('style');
css.id='hq74-style';
css.textContent=`
/* A large Bible that is clearly present on the SKIE work desk. */
#hq66.fix74 .h72-study{min-height:330px;background:linear-gradient(#b97b47 0 32px,#713918 33px);overflow:visible}
#hq66.fix74 .h73-skie-screen{height:62px}
.h74-desk-book{position:absolute;z-index:8;left:50%;top:96px;transform:translateX(-50%);width:min(310px,72%);height:174px;border:7px solid #d7bb70;border-radius:13px;background:linear-gradient(135deg,#0f0c09,#3c2815 48%,#0c0907);box-shadow:0 20px 25px #000d,inset 0 0 0 5px #6d542b;color:#f0d99a;font:900 27px Georgia;line-height:1.08;text-align:center;touch-action:manipulation}
.h74-desk-book:before{content:"✦";display:block;margin:8px 0 4px;color:#d7bb70;font-size:30px}
.h74-desk-book:after{content:"";position:absolute;right:8px;top:8px;bottom:8px;width:13px;border-radius:5px;background:repeating-linear-gradient(#f2e5bb 0 3px,#aa9661 4px 6px)}
.h74-desk-book small{display:block;margin-top:8px;font:900 13px system-ui;letter-spacing:.12em;color:#fff0c5}
.h74-desk-book em{display:block;margin-top:9px;padding:8px;background:#0b4f63;color:#c9f9ff;font:900 12px system-ui;letter-spacing:.1em}
.h74-desk-book:active{transform:translateX(-50%) scale(.96)}
#hq66.fix74 .h73-desk-bible{display:none}

/* Full-screen, two-page, flat KJV reader. */
.bible66.h74-reader{z-index:160!important;background:radial-gradient(circle at 50% 20%,#5a3a20,#130b06 70%)!important;padding:max(9px,env(safe-area-inset-top)) 8px max(9px,env(safe-area-inset-bottom))!important}
.h74-head{flex:0 0 auto;display:grid;grid-template-columns:minmax(150px,1.35fr) 92px 92px 132px 112px;gap:9px;padding:11px;border:2px solid #c6a15f;border-radius:16px;background:linear-gradient(#2d1c12,#180f0a);box-shadow:0 10px 20px #0009}
.h74-brand{grid-column:1/-1;display:flex;align-items:center;justify-content:space-between;gap:10px;color:#ffe5ad;font:900 20px Georgia}
.h74-brand span{padding:6px 11px;border-radius:999px;background:#0a4d62;color:#c9f8ff;font:900 12px system-ui;letter-spacing:.1em}
.h74-head label{display:flex;flex-direction:column;gap:4px;color:#e8c98f;font:900 11px system-ui;letter-spacing:.08em}
.h74-head select,.h74-head input,.h74-head button{height:68px;border:2px solid #d0a85f;border-radius:13px;background:#fff9e9;color:#2b1a0e;font:900 18px Georgia}
.h74-head select{width:100%;padding:0 9px}.h74-head input{width:100%;text-align:center}
.h74-head button{background:linear-gradient(#714724,#3a2112);color:#fff0cb;font:900 15px system-ui;letter-spacing:.06em}
.h74-head button.h74-close{background:linear-gradient(#70402c,#351710)}
.h74-status{flex:0 0 auto;margin:7px 4px 0;padding:8px 10px;border-radius:10px;background:#0a4052;color:#cff8ff;text-align:center;font:900 13px system-ui;letter-spacing:.08em}
.h74-stage{position:relative;flex:1;min-height:0;display:grid;place-items:center;perspective:1600px;padding:10px 5px}
.h74-book{position:relative;width:min(97vw,980px);height:min(67vh,760px);display:grid;grid-template-columns:1fr 1fr;transform:none;background:#2a180c;border:11px solid #4b2d18;border-radius:15px 22px 22px 15px;box-shadow:0 27px 55px #000e,0 0 0 3px #a9864c;overflow:visible}
.h74-book:before{content:"";position:absolute;z-index:6;left:50%;top:0;bottom:0;width:18px;transform:translateX(-50%);background:linear-gradient(90deg,#8f7448,#e7d6a7 42%,#80663e 53%,#e9d7a5);box-shadow:0 0 15px #604820aa}
.h74-page{position:relative;overflow:auto;background:linear-gradient(90deg,#d6c79d 0,#fffdf3 5%,#fffef8 95%,#d8c89b 100%);padding:28px clamp(16px,3.5vw,42px) 32px;color:#21170f;transform:none}
.h74-page.left{border-radius:5px 0 0 7px;box-shadow:inset -14px 0 20px #89754b35}.h74-page.right{border-radius:0 10px 10px 0;box-shadow:inset 14px 0 20px #89754b35}
.h74-page h2{margin:0 0 4px;text-align:center;font:900 clamp(21px,4.6vw,33px) Georgia}
.h74-page .h74-edition{text-align:center;padding-bottom:10px;margin-bottom:10px;border-bottom:1px solid #b8a26d;color:#735d37;font:900 10px system-ui;letter-spacing:.15em}
.h74-verses{font:clamp(17px,3.6vw,24px)/1.52 Georgia}.h74-verses p{margin:.48em 0}.h74-verses sup{margin-right:4px;color:#985e22;font-size:.62em;font-weight:900}
.h74-verses p.target{margin-left:-8px;margin-right:-8px;padding:6px 8px;border-radius:8px;background:#ffe59c;box-shadow:0 0 0 3px #d2922f,0 0 15px #e8ad3c88}
.h74-page-num{position:absolute;left:0;right:0;bottom:8px;text-align:center;color:#725c36;font:900 11px system-ui}
.h74-turn{display:none;position:absolute;z-index:12;top:0;bottom:0;width:50%;background:linear-gradient(90deg,#fffef5,#f1e6c8 72%,#9d8552);backface-visibility:visible;box-shadow:-13px 0 24px #0008;border:1px solid #b79d66}
.h74-turn.forward{display:block;right:0;transform-origin:left center;animation:h74Forward .82s cubic-bezier(.42,0,.25,1)}
.h74-turn.backward{display:block;left:0;transform-origin:right center;animation:h74Backward .82s cubic-bezier(.42,0,.25,1)}
.h74-turn:before{content:"";position:absolute;inset:0;background:radial-gradient(ellipse at center,#fffdf4 0 55%,#d7c89e 80%,#8e7547 100%);opacity:.7}
.h74-turn:after{content:"";position:absolute;top:0;bottom:0;width:34px;border-radius:50%;filter:blur(5px);background:#7d6337aa}.h74-turn.forward:after{right:-8px}.h74-turn.backward:after{left:-8px}
@keyframes h74Forward{0%{transform:rotateY(0) scaleX(1);border-radius:0 10px 10px 0}45%{transform:rotateY(-82deg) scaleX(.82);border-radius:45% 0 0 45%}100%{transform:rotateY(-180deg) scaleX(1);border-radius:10px 0 0 10px}}
@keyframes h74Backward{0%{transform:rotateY(0) scaleX(1);border-radius:10px 0 0 10px}45%{transform:rotateY(82deg) scaleX(.82);border-radius:0 45% 45% 0}100%{transform:rotateY(180deg) scaleX(1);border-radius:0 10px 10px 0}}
.h74-nav{flex:0 0 auto;display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px}
.h74-nav button{height:82px;border:2px solid #d0a760;border-radius:15px;background:linear-gradient(#734924,#392111);color:#fff0ca;font:900 16px system-ui;letter-spacing:.05em}

@media(max-width:620px){
 .h74-head{grid-template-columns:1.35fr 72px 72px;gap:7px}
 .h74-head label{font-size:9px}.h74-head select,.h74-head input{height:61px;font-size:16px}
 .h74-head button{height:60px}.h74-go{grid-column:1/3}.h74-close{grid-column:3}
 .h74-brand{font-size:17px}.h74-brand span{font-size:9px}
 .h74-book{height:min(64vh,680px);border-width:8px}
 .h74-page{padding:21px 13px 29px}.h74-verses{font-size:clamp(15px,4vw,19px);line-height:1.46}
 .h74-page h2{font-size:21px}.h74-book:before{width:12px}
 .h74-nav button{height:76px;font-size:13px}
}
`;
document.head.appendChild(css);

// Put the Bible on the desk even if an older cached visual layer was shown first.
const desk=root.querySelector('.h72-study');
if(desk&&!document.getElementById('h74-desk-book')){
  if(!desk.querySelector('.h73-skie-screen'))desk.insertAdjacentHTML('afterbegin','<div class="h73-skie-screen">SKIE STUDY SYSTEM • SCRIPTURE READY</div>');
  desk.insertAdjacentHTML('beforeend','<button class="h74-desk-book" id="h74-desk-book" aria-label="Open the complete King James Bible">HOLY BIBLE<small>KING JAMES VERSION</small><em>TAP TO OPEN • 66 BOOKS</em></button>');
}

const books={"Genesis":50,"Exodus":40,"Leviticus":27,"Numbers":36,"Deuteronomy":34,"Joshua":24,"Judges":21,"Ruth":4,"1 Samuel":31,"2 Samuel":24,"1 Kings":22,"2 Kings":25,"1 Chronicles":29,"2 Chronicles":36,"Ezra":10,"Nehemiah":13,"Esther":10,"Job":42,"Psalms":150,"Proverbs":31,"Ecclesiastes":12,"Song of Solomon":8,"Isaiah":66,"Jeremiah":52,"Lamentations":5,"Ezekiel":48,"Daniel":12,"Hosea":14,"Joel":3,"Amos":9,"Obadiah":1,"Jonah":4,"Micah":7,"Nahum":3,"Habakkuk":3,"Zephaniah":3,"Haggai":2,"Zechariah":14,"Malachi":4,"Matthew":28,"Mark":16,"Luke":24,"John":21,"Acts":28,"Romans":16,"1 Corinthians":16,"2 Corinthians":13,"Galatians":6,"Ephesians":6,"Philippians":4,"Colossians":4,"1 Thessalonians":5,"2 Thessalonians":3,"1 Timothy":6,"2 Timothy":4,"Titus":3,"Philemon":1,"Hebrews":13,"James":5,"1 Peter":5,"2 Peter":3,"1 John":5,"2 John":1,"3 John":1,"Jude":1,"Revelation":22};
const fallback=[{verse:16,text:'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.'},{verse:17,text:'For God sent not his Son into the world to condemn the world; but that the world through him might be saved.'},{verse:18,text:'He that believeth on him is not condemned already, because he hath not believed in the name of the only begotten Son of God.'},{verse:19,text:'And this is the condemnation, that light is come into the world, and men loved darkness rather than light, because their deeds were evil.'},{verse:20,text:'For every one that doeth evil hateth the light, neither cometh to the light, lest his deeds should be reproved.'},{verse:21,text:'But he that doeth truth cometh to the light, that his deeds may be made manifest, that they are wrought in God.'}];

bible.classList.add('h74-reader');
bible.innerHTML=`
 <div class="h74-head">
  <div class="h74-brand">Holy Bible • KJV <span>FULL 66 BOOKS • GENESIS—REVELATION</span></div>
  <label>BOOK<select id="h74-book"></select></label>
  <label>CHAPTER<input id="h74-chapter" type="number" min="1" value="3"></label>
  <label>VERSE<input id="h74-verse" type="number" min="1" value="16"></label>
  <button class="h74-go" id="h74-go">GO TO VERSE</button><button class="h74-close" id="h74-close">CLOSE</button>
 </div>
 <div class="h74-status" id="h74-status">KING JAMES VERSION • JOHN 3:16</div>
 <div class="h74-stage"><div class="h74-book" id="h74-open-book"><article class="h74-page left"><h2 id="h74-left-title"></h2><div class="h74-edition">KING JAMES VERSION</div><div class="h74-verses" id="h74-left"></div><div class="h74-page-num" id="h74-left-num"></div></article><article class="h74-page right"><h2 id="h74-right-title"></h2><div class="h74-edition">KING JAMES VERSION</div><div class="h74-verses" id="h74-right"></div><div class="h74-page-num" id="h74-right-num"></div></article><div class="h74-turn" id="h74-turn"></div></div></div>
 <div class="h74-nav"><button id="h74-prev">◀ PREVIOUS PAGES</button><button id="h74-read">READ ALOUD</button><button id="h74-next">NEXT PAGES ▶</button></div>`;

const bookSel=document.getElementById('h74-book'),chapterInput=document.getElementById('h74-chapter'),verseInput=document.getElementById('h74-verse'),status=document.getElementById('h74-status'),turn=document.getElementById('h74-turn');
Object.keys(books).forEach(name=>{const o=document.createElement('option');o.value=o.textContent=name;if(name==='John')o.selected=true;bookSel.appendChild(o)});
let pageChunks=[],spread=0,targetVerse=16,speaking=false,turning=false;

function makePages(verses){
 const pages=[];let page=[],chars=0;
 verses.forEach(v=>{const size=v.text.length+12;if(page.length&&chars+size>620){pages.push(page);page=[];chars=0}page.push(v);chars+=size});
 if(page.length)pages.push(page);
 if(pages.length%2)pages.push([]);
 return pages.length?pages:[fallback,[]];
}
function verseHtml(items){return items.map(v=>'<p data-verse="'+v.verse+'" class="'+(Number(v.verse)===Number(targetVerse)?'target':'')+'"><sup>'+v.verse+'</sup>'+v.text+'</p>').join('')||'<p>Continue to the next chapter.</p>'}
function renderSpread(){
 const li=spread*2,ri=li+1,title=bookSel.value+' '+chapterInput.value;
 document.getElementById('h74-left-title').textContent=title;
 document.getElementById('h74-right-title').textContent=title+' • continued';
 document.getElementById('h74-left').innerHTML=verseHtml(pageChunks[li]||[]);
 document.getElementById('h74-right').innerHTML=verseHtml(pageChunks[ri]||[]);
 document.getElementById('h74-left-num').textContent='PAGE '+(li+1)+' OF '+pageChunks.length;
 document.getElementById('h74-right-num').textContent='PAGE '+(ri+1)+' OF '+pageChunks.length;
 status.textContent='KING JAMES VERSION • '+title+(targetVerse?' : '+targetVerse:'')+' • STRAIGHT OPEN PAGES';
}
function animate(direction,done){
 if(turning)return;turning=true;turn.className='h74-turn '+(direction==='next'?'forward':'backward');
 setTimeout(()=>{turn.className='h74-turn';done();turning=false},820);
}
async function loadChapter(findVerse){
 const book=bookSel.value,chapter=Math.max(1,Math.min(books[book],Number(chapterInput.value)||1));
 chapterInput.value=chapter;chapterInput.max=books[book];targetVerse=Math.max(1,Number(findVerse)||1);
 const key='osko_kjv_'+book.replace(/\s/g,'_')+'_'+chapter;status.textContent='OPENING '+book.toUpperCase()+' '+chapter+':'+targetVerse+'…';
 let verses=null;
 try{
  const saved=localStorage.getItem(key);if(saved)verses=JSON.parse(saved);
  if(!verses){const res=await fetch('https://bible-api.com/'+encodeURIComponent(book+' '+chapter)+'?translation=kjv',{cache:'force-cache'});if(!res.ok)throw new Error('Bible service unavailable');const data=await res.json();verses=(data.verses||[]).map(v=>({verse:v.verse,text:v.text.trim()}));if(verses.length)localStorage.setItem(key,JSON.stringify(verses))}
 }catch(e){verses=(book==='John'&&chapter===3)?fallback:null}
 if(!verses||!verses.length){bookSel.value='John';chapterInput.value=3;verseInput.value=16;targetVerse=16;verses=fallback;status.textContent='CONNECTION NEEDED FOR UNCACHED CHAPTERS • JOHN 3:16 IS SAVED'}
 pageChunks=makePages(verses);
 const pageIndex=Math.max(0,pageChunks.findIndex(p=>p.some(v=>Number(v.verse)===Number(targetVerse))));
 spread=Math.floor(pageIndex/2);renderSpread();
 try{localStorage.setItem('osko_kjv_place',JSON.stringify({book:bookSel.value,chapter:Number(chapterInput.value),verse:Number(verseInput.value)}))}catch(_){}
}
async function nextSpread(){
 if(turning)return;
 if(spread<pageChunks.length/2-1)animate('next',()=>{spread++;targetVerse=0;renderSpread()});
 else if(Number(chapterInput.value)<books[bookSel.value])animate('next',async()=>{chapterInput.value=Number(chapterInput.value)+1;verseInput.value=1;await loadChapter(1)});
}
async function prevSpread(){
 if(turning)return;
 if(spread>0)animate('prev',()=>{spread--;targetVerse=0;renderSpread()});
 else if(Number(chapterInput.value)>1)animate('prev',async()=>{chapterInput.value=Number(chapterInput.value)-1;verseInput.value=1;await loadChapter(1);spread=Math.max(0,pageChunks.length/2-1);renderSpread()});
}
function openReader(){
 bible.classList.add('open');
 let place=null;try{place=JSON.parse(localStorage.getItem('osko_kjv_place'))}catch(_){}
 if(place&&books[place.book]){bookSel.value=place.book;chapterInput.value=place.chapter||1;verseInput.value=place.verse||1}
 loadChapter(verseInput.value);
}
function closeReader(){bible.classList.remove('open');if(window.speechSynthesis)window.speechSynthesis.cancel();speaking=false}
bookSel.onchange=()=>{chapterInput.max=books[bookSel.value];chapterInput.value=1;verseInput.value=1};
document.getElementById('h74-go').onclick=()=>loadChapter(verseInput.value);
document.getElementById('h74-close').onclick=closeReader;
document.getElementById('h74-next').onclick=nextSpread;
document.getElementById('h74-prev').onclick=prevSpread;
document.getElementById('h74-read').onclick=()=>{if(!window.speechSynthesis)return;if(speaking){speechSynthesis.cancel();speaking=false;return}const selected=document.querySelector('.h74-verses p.target');const text=selected?selected.innerText:(document.getElementById('h74-left').innerText+' '+document.getElementById('h74-right').innerText);const u=new SpeechSynthesisUtterance(bookSel.value+' '+chapterInput.value+'. '+text);u.rate=.87;u.onend=()=>speaking=false;speaking=true;speechSynthesis.speak(u)};
let sx=0;document.getElementById('h74-open-book').addEventListener('pointerdown',e=>sx=e.clientX);document.getElementById('h74-open-book').addEventListener('pointerup',e=>{const dx=e.clientX-sx;if(dx<-45)nextSpread();else if(dx>45)prevSpread()});

['h69-bible','h70-book','h72-bible','h73-desk-bible','h74-desk-book'].forEach(id=>{const b=document.getElementById(id);if(b)b.onclick=openReader});
const h69Table=document.getElementById('h69-table-book');if(h69Table)h69Table.onclick=openReader;
loadChapter(16);
})();
