/* OSKO Living OS — Adaptive Performance Core v1
   Keeps one Living OS design while scaling expensive effects to the device.
   No visual redesign; this module only recommends quality levels.
*/
(function(global){
  'use strict';

  function create(options){
    options=options||{};
    const listeners=new Set();
    const samples=[];
    let last=0;
    let level='balanced';
    let locked=false;

    const profiles={
      battery:{pixelRatio:1.0,shadowMap:512,shadowUpdates:0.25,particles:0.45,reflections:false,distantDetail:0.45,animationRate:30},
      balanced:{pixelRatio:Math.min((global.devicePixelRatio||1),1.5),shadowMap:1024,shadowUpdates:0.5,particles:0.75,reflections:false,distantDetail:0.72,animationRate:45},
      high:{pixelRatio:Math.min((global.devicePixelRatio||1),2),shadowMap:1536,shadowUpdates:1,particles:1,reflections:true,distantDetail:1,animationRate:60}
    };

    function emit(reason){
      const snapshot=getProfile();
      listeners.forEach(fn=>{try{fn({reason,level,profile:snapshot})}catch(e){}});
    }

    function detectInitial(){
      const mem=Number(global.navigator&&navigator.deviceMemory||0);
      const cores=Number(global.navigator&&navigator.hardwareConcurrency||0);
      const mobile=/Android|iPhone|iPad|Mobile/i.test(global.navigator&&navigator.userAgent||'');
      if(options.preferredLevel&&profiles[options.preferredLevel]) return options.preferredLevel;
      if(mem&&mem<=4) return 'battery';
      if((mem&&mem>=8)&&(cores>=8)&&!mobile) return 'high';
      return 'balanced';
    }

    level=detectInitial();

    function getProfile(){
      return Object.assign({level},profiles[level]);
    }

    function setLevel(next,reason){
      if(!profiles[next]||next===level) return false;
      level=next;
      emit(reason||'manual');
      return true;
    }

    function lock(value){locked=!!value;return locked}

    function frame(now){
      if(!last){last=now;return getProfile()}
      const dt=now-last;last=now;
      if(dt>0&&dt<250){
        samples.push(dt);
        if(samples.length>120)samples.shift();
      }
      if(!locked&&samples.length>=60){
        const avg=samples.reduce((a,b)=>a+b,0)/samples.length;
        const fps=1000/avg;
        if(fps<28&&level==='high') setLevel('balanced','low-fps');
        else if(fps<24&&level==='balanced') setLevel('battery','low-fps');
        else if(fps>55&&level==='battery'&&samples.length>=100) setLevel('balanced','recovered-fps');
        samples.length=0;
      }
      return getProfile();
    }

    function report(){
      const avg=samples.length?samples.reduce((a,b)=>a+b,0)/samples.length:0;
      return {
        level,
        locked,
        estimatedFps:avg?+(1000/avg).toFixed(1):null,
        deviceMemory:Number(global.navigator&&navigator.deviceMemory||0)||null,
        hardwareConcurrency:Number(global.navigator&&navigator.hardwareConcurrency||0)||null,
        mobile:/Android|iPhone|iPad|Mobile/i.test(global.navigator&&navigator.userAgent||'')
      };
    }

    function subscribe(fn){listeners.add(fn);return()=>listeners.delete(fn)}

    return {frame,getProfile,setLevel,lock,report,subscribe,profiles:Object.keys(profiles)};
  }

  global.OSKOPerformance={create};
})(typeof window!=='undefined'?window:globalThis);
