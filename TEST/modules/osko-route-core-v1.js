/* OSKO Living OS — Route / Movement Core v1
   Purpose: shared deterministic path planning for Aurora, robots, truck yard movement,
   wildlife-safe routing and future spatial navigation. No physical robot authority.
*/
(function(global){
  'use strict';

  function dist(a,b){const dx=(a.x||0)-(b.x||0),dz=(a.z||0)-(b.z||0);return Math.hypot(dx,dz)}
  function clone(p){return {x:+p.x||0,y:+p.y||0,z:+p.z||0}}

  function create(options){
    options=options||{};
    const nodes=new Map();
    const edges=new Map();
    const blockedZones=[];
    let speedProfile='walk';

    function addNode(id,pos,meta){
      if(!id) throw new Error('route node id required');
      nodes.set(id,{id:id,pos:clone(pos||{}),meta:Object.assign({},meta||{})});
      if(!edges.has(id)) edges.set(id,new Map());
      return nodes.get(id);
    }

    function connect(a,b,cost,meta){
      if(!nodes.has(a)||!nodes.has(b)) throw new Error('route connect requires existing nodes');
      const c=Number.isFinite(cost)?cost:dist(nodes.get(a).pos,nodes.get(b).pos);
      edges.get(a).set(b,{cost:c,meta:Object.assign({},meta||{})});
      edges.get(b).set(a,{cost:c,meta:Object.assign({},meta||{})});
    }

    function addBlockedZone(zone){
      const z={id:zone.id||('zone-'+(blockedZones.length+1)),x:+zone.x||0,z:+zone.z||0,radius:Math.max(1,+zone.radius||15),reason:zone.reason||'blocked'};
      blockedZones.push(z);return z;
    }

    function segmentHitsZone(a,b,zone){
      const ax=a.x,az=a.z,bx=b.x,bz=b.z,dx=bx-ax,dz=bz-az;
      const len2=dx*dx+dz*dz||1;
      let t=((zone.x-ax)*dx+(zone.z-az)*dz)/len2;t=Math.max(0,Math.min(1,t));
      const px=ax+dx*t,pz=az+dz*t;
      return Math.hypot(px-zone.x,pz-zone.z)<zone.radius;
    }

    function edgeAllowed(aId,bId,context){
      const a=nodes.get(aId),b=nodes.get(bId);if(!a||!b) return false;
      for(const zone of blockedZones){
        if(segmentHitsZone(a.pos,b.pos,zone)){
          if(context&&Array.isArray(context.ignoreZones)&&context.ignoreZones.includes(zone.id)) continue;
          return false;
        }
      }
      const em=edges.get(aId)&&edges.get(aId).get(bId);
      if(!em) return false;
      if(em.meta&&em.meta.requiresPermission&&!(context&&context.permissions&&context.permissions.includes(em.meta.requiresPermission))) return false;
      return true;
    }

    function shortestPath(startId,endId,context){
      if(!nodes.has(startId)||!nodes.has(endId)) return null;
      const open=new Set(nodes.keys()),d=new Map(),prev=new Map();
      nodes.forEach((_,id)=>d.set(id,Infinity));d.set(startId,0);
      while(open.size){
        let u=null,best=Infinity;for(const id of open){const v=d.get(id);if(v<best){best=v;u=id}}
        if(u===null||best===Infinity) break;
        open.delete(u);if(u===endId) break;
        const nbrs=edges.get(u)||new Map();
        for(const [v,edge] of nbrs){
          if(!open.has(v)||!edgeAllowed(u,v,context)) continue;
          const alt=best+edge.cost;
          if(alt<d.get(v)){d.set(v,alt);prev.set(v,u)}
        }
      }
      if(startId!==endId&&!prev.has(endId)) return null;
      const ids=[];let cur=endId;ids.unshift(cur);while(cur!==startId){cur=prev.get(cur);if(!cur) return null;ids.unshift(cur)}
      return {ids:ids,points:ids.map(id=>clone(nodes.get(id).pos)),cost:d.get(endId)};
    }

    function routeNearest(startPos,endId,context){
      let nearest=null,best=Infinity;for(const [id,n] of nodes){const dd=dist(startPos,n.pos);if(dd<best){best=dd;nearest=id}}
      if(nearest===null) return null;
      const r=shortestPath(nearest,endId,context);if(!r) return null;
      r.points.unshift(clone(startPos));r.cost+=best;r.startNode=nearest;return r;
    }

    function setSpeedProfile(name){if(['crawl','walk','patrol','vehicle'].includes(name)) speedProfile=name;return speedProfile}
    function getSpeed(){return {crawl:0.5,walk:1.0,patrol:1.35,vehicle:2.2}[speedProfile]||1}
    function getSnapshot(){return {nodes:[...nodes.values()].map(n=>({id:n.id,pos:clone(n.pos),meta:Object.assign({},n.meta)})),blockedZones:blockedZones.map(z=>Object.assign({},z)),speedProfile:speedProfile}}

    return {addNode,connect,addBlockedZone,shortestPath,routeNearest,setSpeedProfile,getSpeed,getSnapshot};
  }

  global.OSKORouteCore={create:create};
})(typeof window!=='undefined'?window:globalThis);
