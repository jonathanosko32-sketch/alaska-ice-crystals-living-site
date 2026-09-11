/* OSKO Living OS — Environment Core v1
   Shared environmental model for time, season, weather, visibility, lights and safe world reactions.
*/
(function(global){
  'use strict';

  const listeners=new Set();
  const state={
    timeMode:'device',
    hour:12,
    dayPhase:'day',
    daylight:1,
    season:'summer',
    weather:'clear',
    temperatureF:null,
    windMph:0,
    snowLevel:0,
    visibility:1,
    lightsSuggested:false,
    auroraSuggested:false,
    roadCaution:false,
    updatedAt:Date.now()
  };

  function clamp(v,a,b){return Math.max(a,Math.min(b,v))}
  function smooth(a,b,v){const t=clamp((v-a)/(b-a),0,1);return t*t*(3-2*t)}
  function seasonFromDate(d){const m=d.getMonth()+1;if(m===12||m<=2)return'winter';if(m<=5)return'spring';if(m<=8)return'summer';return'fall'}
  function daylightFor(d,h){
    const start=new Date(d.getFullYear(),0,0),doy=Math.floor((d-start)/86400000);
    const dayLength=12.5+7*Math.sin((doy-80)/365*Math.PI*2);
    const sunrise=12.5-dayLength/2,sunset=12.5+dayLength/2;
    const rise=smooth(sunrise-.8,sunrise+.8,h),fall=1-smooth(sunset-.8,sunset+.8,h);
    return {value:clamp(Math.min(rise,fall),0,1),sunrise,sunset};
  }
  function emit(){const snap=Object.freeze(Object.assign({},state));listeners.forEach(fn=>{try{fn(snap)}catch(e){console.warn('OSKO environment listener error',e)}});return snap}
  function recompute(input){
    input=input||{};
    const d=input.date instanceof Date?input.date:new Date();
    const h=Number.isFinite(input.hour)?input.hour:d.getHours()+d.getMinutes()/60;
    const dl=daylightFor(d,h);
    state.hour=h;state.daylight=dl.value;state.season=input.season||seasonFromDate(d);
    state.weather=input.weather||state.weather;
    if(Number.isFinite(input.temperatureF))state.temperatureF=input.temperatureF;
    if(Number.isFinite(input.windMph))state.windMph=input.windMph;
    if(Number.isFinite(input.snowLevel))state.snowLevel=clamp(input.snowLevel,0,1);
    const weatherPenalty=state.weather==='snow'?0.22:state.weather==='fog'?0.38:state.weather==='storm'?0.48:0;
    state.visibility=clamp((0.45+state.daylight*0.55)-weatherPenalty,0.12,1);
    state.dayPhase=state.daylight>.78?'day':state.daylight>.22?'twilight':'night';
    state.lightsSuggested=state.daylight<.45||state.visibility<.5;
    state.auroraSuggested=state.daylight<.18&&state.weather!=='storm'&&state.weather!=='fog';
    state.roadCaution=state.weather==='snow'||state.weather==='storm'||state.visibility<.4||state.snowLevel>.45||state.windMph>=35;
    state.updatedAt=Date.now();
    return emit();
  }
  function setWeather(mode,extras){state.weather=String(mode||'clear').toLowerCase();return recompute(Object.assign({},extras||{}, {weather:state.weather}))}
  function setSnowLevel(v){state.snowLevel=clamp(Number(v)||0,0,1);return recompute({snowLevel:state.snowLevel})}
  function setWind(mph){state.windMph=Math.max(0,Number(mph)||0);return recompute({windMph:state.windMph})}
  function getState(){return Object.assign({},state)}
  function on(fn){listeners.add(fn);return()=>listeners.delete(fn)}
  function start(intervalMs){recompute();const id=setInterval(()=>recompute(),Math.max(5000,intervalMs||15000));return()=>clearInterval(id)}

  global.OSKOEnvironment={recompute,setWeather,setSnowLevel,setWind,getState,on,start};
})(typeof window!=='undefined'?window:globalThis);
