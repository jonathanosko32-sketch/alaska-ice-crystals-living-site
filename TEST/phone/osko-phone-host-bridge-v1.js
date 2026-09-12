(()=>{'use strict';
const KEY='osko-phone-host-state-v1';
function create(opts={}){
  const storage=opts.storage||localStorage;
  const listeners=new Set();
  let wakeLock=null;
  let state={standalone:false,fullscreen:false,online:navigator.onLine,visible:document.visibilityState==='visible',wakeLock:false,lastChangedAt:Date.now()};
  try{const saved=JSON.parse(storage.getItem(KEY)||'null');if(saved&&typeof saved==='object')state={...state,...saved,wakeLock:false}}catch(_){ }
  function detect(){
    const standalone=(window.matchMedia&&window.matchMedia('(display-mode: standalone)').matches)||navigator.standalone===true;
    state={...state,standalone,fullscreen:!!document.fullscreenElement,online:navigator.onLine,visible:document.visibilityState==='visible',wakeLock:!!wakeLock,lastChangedAt:Date.now()};
    try{storage.setItem(KEY,JSON.stringify({...state,wakeLock:false}))}catch(_){ }
    listeners.forEach(fn=>{try{fn({...state})}catch(_){}});
    return {...state};
  }
  async function requestRunMode(){
    let fullscreen=false,awake=false;
    try{if(!document.fullscreenElement&&document.documentElement.requestFullscreen){await document.documentElement.requestFullscreen();fullscreen=true}else fullscreen=!!document.fullscreenElement}catch(_){fullscreen=false}
    try{if('wakeLock' in navigator&&navigator.wakeLock.request){wakeLock=await navigator.wakeLock.request('screen');awake=true;wakeLock.addEventListener('release',()=>{wakeLock=null;detect()})}}catch(_){awake=false}
    detect();
    return {ok:true,fullscreen:state.fullscreen||fullscreen,wakeLock:state.wakeLock||awake,standalone:state.standalone};
  }
  async function releaseRunMode(){
    try{if(document.fullscreenElement&&document.exitFullscreen)await document.exitFullscreen()}catch(_){ }
    try{if(wakeLock){await wakeLock.release();wakeLock=null}}catch(_){ }
    return detect();
  }
  function onChange(fn){listeners.add(fn);return()=>listeners.delete(fn)}
  window.addEventListener('online',detect);window.addEventListener('offline',detect);document.addEventListener('visibilitychange',()=>{detect();if(document.visibilityState==='visible'&&state.wakeLock===false&&opts.autoWakeWhenVisible===true)requestRunMode().catch(()=>{})});document.addEventListener('fullscreenchange',detect);
  return {status:detect,requestRunMode,releaseRunMode,onChange};
}
window.OSKOPhoneHostBridge={create};
})();
