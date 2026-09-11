/* OSKO Living OS — World State Core v1
   Standalone subsystem. No DOM assumptions and no render-loop replacement.
   Purpose: one deterministic source of truth for time, season, weather,
   property modes, object state, alerts, and subscribers.
*/
(function(global){
  'use strict';

  const VALID_WEATHER = new Set(['clear','cloudy','snow','heavy-snow','wind','fog']);
  const VALID_SEASONS = new Set(['winter','spring','summer','fall']);

  function clamp(v,a,b){ return Math.max(a,Math.min(b,v)); }
  function copy(v){ return JSON.parse(JSON.stringify(v)); }

  function seasonFromDate(d){
    const m=d.getMonth()+1;
    if(m===12||m<=2) return 'winter';
    if(m<=5) return 'spring';
    if(m<=8) return 'summer';
    return 'fall';
  }

  function daylightApprox(d){
    const start=new Date(d.getFullYear(),0,0);
    const doy=Math.floor((d-start)/86400000);
    return clamp(12.5 + 7*Math.sin((doy-80)/365*Math.PI*2),5.5,19.5);
  }

  function create(options){
    options=options||{};
    const subscribers=new Set();
    const now=new Date();
    const state={
      revision:1,
      time:{iso:now.toISOString(),hour:now.getHours()+now.getMinutes()/60,daylightHours:daylightApprox(now),phase:'day'},
      season:seasonFromDate(now),
      weather:{mode:'snow',temperatureF:null,windMph:null,visibility:'normal'},
      property:{life:true,snow:true,lights:'auto',gate:'closed',quietMode:false},
      objects:{},
      alerts:[]
    };

    function recomputeTime(date){
      const h=date.getHours()+date.getMinutes()/60+date.getSeconds()/3600;
      const dl=daylightApprox(date),sunrise=12.5-dl/2,sunset=12.5+dl/2;
      let phase='night';
      if(h>=sunrise-.75 && h<sunrise+.65) phase='dawn';
      else if(h>=sunrise+.65 && h<sunset-.65) phase='day';
      else if(h>=sunset-.65 && h<sunset+.75) phase='dusk';
      state.time={iso:date.toISOString(),hour:h,daylightHours:dl,sunrise,sunset,phase};
      state.season=seasonFromDate(date);
    }

    function emit(type,payload){
      state.revision++;
      const evt={type,payload:copy(payload||{}),revision:state.revision,timestamp:new Date().toISOString()};
      for(const fn of subscribers){ try{ fn(evt,copy(state)); }catch(e){} }
      return evt;
    }

    function tick(date){
      recomputeTime(date instanceof Date ? date : new Date());
      return emit('world:tick',{time:state.time,season:state.season});
    }

    function setWeather(next){
      next=next||{};
      if(next.mode && !VALID_WEATHER.has(next.mode)) throw new Error('Unsupported weather mode: '+next.mode);
      state.weather=Object.assign({},state.weather,next);
      if(typeof state.weather.windMph==='number' && state.weather.windMph>=40) state.weather.visibility=state.weather.visibility||'reduced';
      return emit('weather:changed',state.weather);
    }

    function setProperty(key,value){
      if(!(key in state.property)) throw new Error('Unknown property state: '+key);
      state.property[key]=value;
      return emit('property:changed',{key,value});
    }

    function registerObject(id,initial){
      if(!id) throw new Error('Object id required');
      if(!state.objects[id]) state.objects[id]=Object.assign({online:true,status:'ready'},initial||{});
      return copy(state.objects[id]);
    }

    function setObjectState(id,patch){
      if(!state.objects[id]) registerObject(id,{});
      Object.assign(state.objects[id],patch||{});
      return emit('object:changed',{id,state:state.objects[id]});
    }

    function addAlert(alert){
      const a=Object.assign({id:'alert-'+Date.now()+'-'+Math.random().toString(16).slice(2),level:'info',source:'world',message:'',active:true},alert||{});
      state.alerts.push(a);
      if(state.alerts.length>100) state.alerts.splice(0,state.alerts.length-100);
      emit('alert:added',a);
      return copy(a);
    }

    function clearAlert(id){
      const a=state.alerts.find(x=>x.id===id);
      if(!a) return false;
      a.active=false;
      emit('alert:cleared',{id});
      return true;
    }

    function subscribe(fn){
      if(typeof fn!=='function') throw new Error('Subscriber must be a function');
      subscribers.add(fn);
      return function(){ subscribers.delete(fn); };
    }

    function snapshot(){ return copy(state); }

    function command(name,args){
      args=args||{};
      switch(name){
        case 'HOME': return {ok:true,action:'camera:home'};
        case 'LIFE': setProperty('life',args.enabled!==false); return {ok:true};
        case 'SNOW': setProperty('snow',args.enabled!==false); return {ok:true};
        case 'GATE_OPEN': setProperty('gate','open'); return {ok:true};
        case 'GATE_CLOSE': setProperty('gate','closed'); return {ok:true};
        case 'QUIET_MODE': setProperty('quietMode',!!args.enabled); return {ok:true};
        default: return {ok:false,error:'UNKNOWN_COMMAND'};
      }
    }

    if(options.initialWeather) setWeather(options.initialWeather);
    recomputeTime(now);

    return {tick,setWeather,setProperty,registerObject,setObjectState,addAlert,clearAlert,subscribe,snapshot,command};
  }

  global.OSKOWorldState={create,VALID_WEATHER:Array.from(VALID_WEATHER),VALID_SEASONS:Array.from(VALID_SEASONS)};
})(typeof window!=='undefined'?window:globalThis);
