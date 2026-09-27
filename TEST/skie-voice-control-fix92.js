(function skieVoiceControlFix92(){
'use strict';
if(window.__skieVoice92)return;window.__skieVoice92=true;

const voice=document.getElementById('voice');
const orb=voice&&voice.querySelector('.orb');
const vtext=document.getElementById('vtext');
const root=document.getElementById('hq66');
const bible=document.getElementById('bible66');
const Speech=window.SpeechRecognition||window.webkitSpeechRecognition;
if(!voice||!orb)return;

const css=document.createElement('style');
css.id='skie-voice92-style';
css.textContent=`
#voice.skie-voice92{position:fixed!important;inset:auto!important;left:12px!important;right:12px!important;bottom:calc(94px + env(safe-area-inset-bottom))!important;width:auto!important;height:auto!important;z-index:10050!important;display:block!important;pointer-events:none!important}
#voice.skie-voice92 .orb{position:relative!important;left:auto!important;top:auto!important;transform:none!important;width:min(100%,390px)!important;min-height:68px!important;height:auto!important;margin:0 auto!important;padding:10px 16px!important;border:3px solid #61def8!important;border-radius:17px!important;background:linear-gradient(160deg,#092432f5,#031019f5)!important;box-shadow:0 7px 24px #000b,0 0 18px #18bfe344!important;color:#f1fcff!important;font:900 18px/1.15 system-ui!important;letter-spacing:.04em!important;pointer-events:auto!important;cursor:pointer!important;touch-action:manipulation!important;user-select:none!important;-webkit-user-select:none!important}
#voice.skie-voice92 .orb small{display:block!important;margin-top:4px!important;color:#9eeaff!important;font:800 13px/1.2 system-ui!important;letter-spacing:.02em!important}
#voice.skie-voice92.voice-on .orb{border-color:#70efbb!important;box-shadow:0 7px 24px #000b,0 0 18px #49edaf55!important}
#voice.skie-voice92.voice-error .orb{border-color:#ffbb68!important}
#voice.skie-voice92.voice-reader-open{display:none!important}
@media(max-width:520px){#voice.skie-voice92{left:8px!important;right:8px!important;bottom:calc(91px + env(safe-area-inset-bottom))!important}#voice.skie-voice92 .orb{min-height:64px!important;font-size:17px!important}}
`;
document.head.appendChild(css);voice.classList.add('skie-voice92');
voice.setAttribute('role','status');voice.setAttribute('aria-live','polite');
orb.setAttribute('role','button');orb.setAttribute('tabindex','0');orb.setAttribute('aria-label','Enable Hey SKIE voice commands');

let enabled=false,recognition=null,restarting=false,speaking=false,commandUntil=0,waitTimer=0;
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
function sayStatus(main,sub){orb.firstChild&&orb.firstChild.nodeType===3?(orb.firstChild.textContent=main):orb.insertBefore(document.createTextNode(main),orb.firstChild);if(vtext)vtext.textContent=sub||''}
function updateStatus(main,sub,kind=''){
 voice.classList.toggle('voice-on',enabled);voice.classList.toggle('voice-error',kind==='error');
 sayStatus(main,sub);
 orb.setAttribute('aria-label',main+'. '+(sub||''));orb.setAttribute('aria-pressed',enabled?'true':'false');
}
function syncVisibility(){voice.classList.toggle('voice-reader-open',!!(bible&&bible.classList.contains('open')))}
if(bible)new MutationObserver(syncVisibility).observe(bible,{attributes:true,attributeFilter:['class']});

function speak(text,resume=true){
 if(!window.speechSynthesis||!window.SpeechSynthesisUtterance){updateStatus(text,'Say “Hey SKIE” for another command.');return}
 speaking=true;try{if(recognition)recognition.stop()}catch(_){}
 window.speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(text);utterance.rate=.94;utterance.onend=()=>{speaking=false;if(enabled&&resume)startRecognition()};utterance.onerror=()=>{speaking=false;if(enabled&&resume)startRecognition()};window.speechSynthesis.speak(utterance);
}
function startRecognition(){
 if(!enabled||speaking||!recognition||restarting)return;
 restarting=true;try{recognition.start()}catch(_){setTimeout(()=>{restarting=false;if(enabled&&!speaking)startRecognition()},650);return}
 setTimeout(()=>{restarting=false},400);
}
function stopListening(){enabled=false;commandUntil=0;clearTimeout(waitTimer);try{recognition&&recognition.stop()}catch(_){};updateStatus('HEY SKIE • VOICE OFF','Tap here to enable voice again.');}
function enableListening(){
 if(!Speech){updateStatus('VOICE CONTROL UNAVAILABLE','Use Chrome on a supported device.','error');return}
 if(enabled){stopListening();return}
 enabled=true;voice.classList.add('voice-on');updateStatus('MICROPHONE STARTING','Allow microphone access, then say “Hey SKIE.”');
 if(!recognition){recognition=new Speech();recognition.lang='en-US';recognition.continuous=false;recognition.interimResults=false;recognition.maxAlternatives=1;
  recognition.onstart=()=>{restarting=false;if(enabled&&!speaking)updateStatus('LISTENING FOR HEY SKIE','Say “Hey SKIE,” then give a command.')};
  recognition.onresult=e=>{const item=e.results&&e.results[e.results.length-1];if(!item||!item.isFinal)return;handleTranscript(item[0].transcript)};
  recognition.onerror=e=>{restarting=false;if(!enabled)return;if(e.error==='not-allowed'||e.error==='service-not-allowed'){enabled=false;updateStatus('MICROPHONE PERMISSION NEEDED','Tap again and allow microphone access.','error')}else if(e.error==='audio-capture'){updateStatus('MICROPHONE NOT FOUND','Check the phone microphone, then tap to retry.','error')}else if(e.error!=='no-speech'&&e.error!=='aborted'){updateStatus('VOICE PAUSED','Tap to restart listening.','error')}};
  recognition.onend=()=>{restarting=false;if(enabled&&!speaking)setTimeout(startRecognition,280)};
 }
 startRecognition();
}
orb.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();enableListening()});
orb.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();enableListening()}});

function normalize(text){return String(text||'').toLowerCase().replace(/[’']/g,'').replace(/[^a-z0-9: ]/g,' ').replace(/\s+/g,' ').trim()}
function wordsToNumbers(text){
 const n={zero:0,one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10,eleven:11,twelve:12,thirteen:13,fourteen:14,fifteen:15,sixteen:16,seventeen:17,eighteen:18,nineteen:19,twenty:20,thirty:30,forty:40,fifty:50,sixty:60,seventy:70,eighty:80,ninety:90};
 return text.replace(/\b(first|second|third)\s+(samuel|kings|chronicles|corinthians|thessalonians|timothy|peter|john)\b/g,(m,o,b)=>({first:'1',second:'2',third:'3'}[o]+' '+b)).replace(/\b(?:zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety)(?:[ -](?:one|two|three|four|five|six|seven|eight|nine))?\b/g,w=>{const p=w.split(/[ -]/);return String(p.length===1?n[p[0]]:n[p[0]]+n[p[1]])});
}
function parseReference(raw){
 const select=document.getElementById('h74-book');if(!select)return null;
 let s=wordsToNumbers(normalize(raw)).replace(/\b(first|second|third)\b/g,(m)=>({first:'1',second:'2',third:'3'}[m]));
 const opts=[...select.options].map(o=>o.value).sort((a,b)=>b.length-a.length);
 for(const book of opts){
  const b=normalize(book),at=s.indexOf(b);if(at<0)continue;
  const tail=s.slice(at+b.length).replace(/^\s*(?:chapter\s*)?/,'');
  const match=tail.match(/^(\d+)(?:\s*(?:verse\s*|:\s*|\s+)(\d+))?/);
  if(match)return{book,chapter:Number(match[1]),verse:Number(match[2]||1)};
 }
 return null;
}
function setChapterAndVerse(ref){
 const book=document.getElementById('h74-book'),chapter=document.getElementById('h74-chapter'),verse=document.getElementById('h74-verse'),go=document.getElementById('h74-go');
 if(!book||!chapter||!verse||!go)return false;
 book.value=ref.book;book.dispatchEvent(new Event('change',{bubbles:true}));chapter.value=String(ref.chapter);verse.value=String(ref.verse);go.click();return true;
}
function openHQ(upstairs=true){
 if(!root)return false;
 const other=document.getElementById('h80-house');if(other)other.classList.remove('open');
 root.classList.add('open');
 const down=document.getElementById('h69-down-tab')||document.getElementById('hq66-down-tab');if(down)down.click();
 const floor=document.getElementById(upstairs?'h69-up-tab':'h69-down-tab')||document.getElementById(upstairs?'hq66-up-tab':'hq66-down-tab');if(floor)floor.click();
 return true;
}
function openUpstairs(){return openHQ(true)}
function openBible(){
 openUpstairs();const btn=['h74-desk-book','h73-desk-bible','h72-bible','h69-bible','h72-bible'].map(id=>document.getElementById(id)).find(Boolean);
 if(btn){btn.click();return true}return false;
}
async function goToPage(n){
 const left=document.getElementById('h74-left-num'),next=document.getElementById('h74-next'),prev=document.getElementById('h74-prev');if(!left||!next||!prev)return false;
 const read=()=>{const m=(left.textContent||'').match(/PAGE\s+(\d+)\s+OF\s+(\d+)/i);return m?{page:Number(m[1]),total:Number(m[2])}:null};
 let cur=read();if(!cur)return false;if(n<1||n>cur.total)return'out-of-range';
 let from=Math.floor((cur.page-1)/2),to=Math.floor((n-1)/2),count=0;
 while(from!==to&&count++<120){(to>from?next:prev).click();await wait(1950);cur=read();if(!cur)return false;from=Math.floor((cur.page-1)/2)}
 return from===to;
}
async function runCommand(raw){
 const text=normalize(wordsToNumbers(raw));
 if(/\b(stop listening|turn off voice|voice off|goodbye skie)\b/.test(text)){stopListening();return}
 const ref=parseReference(text);
 if(ref){openBible();await wait(150);if(setChapterAndVerse(ref))speak('Opening '+ref.book+' '+ref.chapter+':'+ref.verse+'.');else speak('I could not open that passage.');return}
 const page=text.match(/\b(?:go to )?page\s+(\d+)\b/);
 if(page){const result=await goToPage(Number(page[1]));speak(result===true?'Moved to page '+page[1]+'.':result==='out-of-range'?'That page number is outside this chapter. Say a book, chapter, and verse.':'Open the Bible first, then ask for a page.');return}
 const asksBuilding=/\b(open|show|take me to)\b/.test(text)&&/\b(building|house|headquarters|hq|home)\b/.test(text);
 const asksUpstairs=/\b(upstairs|go upstairs|second floor)\b/.test(text);
 const asksDownstairs=/\b(downstairs|go downstairs|first floor)\b/.test(text);
 const asksBible=/\b(open|show|start)\b/.test(text)&&/\b(bible|scripture|king james|kjv)\b/.test(text);
 if(asksBuilding||asksUpstairs||asksDownstairs||asksBible){
  const upstairs=asksUpstairs||(!asksDownstairs);
  if(!openHQ(upstairs)){speak('I could not open the headquarters.');return}
  if(asksBible){const opened=openBible();speak(opened?'Opening the upstairs study and the King James Bible.':'I opened the house, but could not find the Bible button.')}
  else speak(upstairs?'Opening the headquarters upstairs.':'Opening the headquarters downstairs.');
  return;
 }
 if(/\b(next page|turn page|turn the page|go forward)\b/.test(text)){const b=document.getElementById('h74-next');if(b){b.click();speak('Turning the page.')}else speak('Open the Bible first.');return}
 if(/\b(previous page|back a page|go back|last page)\b/.test(text)){const b=document.getElementById('h74-prev');if(b){b.click();speak('Going back a page.')}else speak('Open the Bible first.');return}
 if(/\b(close|return to yard)\b/.test(text)&&/\b(building|house|headquarters|bible|scripture|home)\b/.test(text)){document.getElementById('h74-close')?.click();document.getElementById('h69-yard')?.click();document.getElementById('h80-close')?.click();speak('Closing the Bible and returning to the yard.');return}
 speak('I did not catch that. Say open the building, go upstairs, open the Bible, or name a book and verse.');
}
function handleTranscript(transcript){
 const text=normalize(transcript);if(!text)return;
 const wake=/(?:^|\s)(?:hey|okay|ok)\s+(?:skie|sky|skyie)(?:\s|$)/.exec(text);
 let command=text;
 if(wake){command=text.slice(wake.index+wake[0].length).trim();commandUntil=Date.now()+11000;clearTimeout(waitTimer);if(!command){updateStatus('I’M LISTENING','Say a command now.');speak('I’m listening.');return}}
 else if(Date.now()>commandUntil){return}
 commandUntil=Date.now()+11000;runCommand(command);
}

if(!Speech)updateStatus('HEY SKIE • VOICE UNAVAILABLE','This browser does not provide speech recognition.','error');
else updateStatus('HEY SKIE • VOICE OFF','Tap here once to allow the microphone, then say “Hey SKIE.”');
syncVisibility();
window.OSKO_SKIE_VOICE={enable:enableListening,stop:stopListening,parseReference};
})();
