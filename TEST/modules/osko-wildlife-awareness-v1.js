/* OSKO Living OS — Wildlife Awareness Module v1
   Read-only awareness layer for SKIE / Living OS / future robots.
   It does NOT command wildlife, robots, vehicles, weapons, or physical actuators.
*/
(function(global){
  'use strict';

  function dist2(a,b){
    const dx=(a.x||0)-(b.x||0), dz=(a.z||0)-(b.z||0);
    return dx*dx+dz*dz;
  }

  function create(options){
    options=options||{};
    const getWildlifeStatus=typeof options.getWildlifeStatus==='function' ? options.getWildlifeStatus : function(){return [];};
    const zones=Array.isArray(options.zones) ? options.zones : [];
    const listeners=[];
    let lastSignature='';

    function severityFor(item,zone,distance){
      const id=String(item.id||'').toLowerCase();
      const largePredator=id.includes('bear')||id.includes('wolf');
      if(distance <= (zone.criticalRadius||18)) return largePredator ? 'critical' : 'high';
      if(distance <= (zone.alertRadius||38)) return largePredator ? 'high' : 'medium';
      return 'low';
    }

    function scan(){
      const wildlife=getWildlifeStatus()||[];
      const alerts=[];
      for(const item of wildlife){
        if(item.visible===false) continue;
        for(const zone of zones){
          const distance=Math.sqrt(dist2(item,zone));
          const watchRadius=zone.watchRadius||65;
          if(distance>watchRadius) continue;
          alerts.push({
            type:'wildlife-proximity',
            species:item.name||item.id||'Wildlife',
            speciesId:item.id||'unknown',
            zoneId:zone.id||zone.name||'zone',
            zoneName:zone.name||zone.id||'Protected Area',
            distance:+distance.toFixed(1),
            severity:severityFor(item,zone,distance),
            actionPolicy:'AWARENESS_ONLY',
            message:(item.name||item.id||'Wildlife')+' near '+(zone.name||zone.id||'protected area')
          });
        }
      }
      alerts.sort(function(a,b){
        const rank={critical:4,high:3,medium:2,low:1};
        return (rank[b.severity]||0)-(rank[a.severity]||0) || a.distance-b.distance;
      });
      const signature=JSON.stringify(alerts.map(function(a){return [a.speciesId,a.zoneId,a.severity,Math.round(a.distance)];}));
      if(signature!==lastSignature){
        lastSignature=signature;
        listeners.forEach(function(fn){try{fn(alerts);}catch(e){}});
      }
      return alerts;
    }

    function onChange(fn){
      if(typeof fn!=='function') return function(){};
      listeners.push(fn);
      return function(){
        const i=listeners.indexOf(fn);
        if(i>=0) listeners.splice(i,1);
      };
    }

    function summary(){
      const alerts=scan();
      if(!alerts.length) return 'No nearby wildlife alerts.';
      const top=alerts[0];
      return top.severity.toUpperCase()+': '+top.message+' • '+top.distance+' world units away';
    }

    return {scan,onChange,summary};
  }

  global.OSKOWildlifeAwareness={create:create};
})(typeof window!=='undefined'?window:globalThis);
