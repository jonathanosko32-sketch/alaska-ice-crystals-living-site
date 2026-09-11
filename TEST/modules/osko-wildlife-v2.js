/* OSKO Living OS — Alaska Wildlife Module v2
   Standalone world subsystem. FIX8 is not modified.
   Adds day/night activity, seasonal behavior, calm/alert state,
   safe-zone avoidance, proximity alerts, and deterministic status output.
*/
(function(global){
  'use strict';

  const DEFAULT_SPECIES=[
    {id:'moose',name:'Moose',color:0x4b382d,scale:1.45,speed:.32,range:28,home:[-150,88],behavior:'graze',active:'dawn-dusk',alertRadius:34},
    {id:'caribou',name:'Caribou',color:0x705541,scale:1.15,speed:.48,range:34,home:[145,58],behavior:'herd',active:'day',alertRadius:30},
    {id:'black-bear',name:'Black Bear',color:0x171716,scale:1.25,speed:.28,range:23,home:[-145,-78],behavior:'forage',active:'dawn-dusk',alertRadius:46},
    {id:'grizzly',name:'Grizzly',color:0x59412f,scale:1.38,speed:.24,range:21,home:[145,-92],behavior:'forage',active:'day',alertRadius:55},
    {id:'wolf',name:'Wolf',color:0x85898b,scale:.78,speed:.72,range:40,home:[-128,145],behavior:'roam',active:'night',alertRadius:42},
    {id:'fox',name:'Fox',color:0xa8552d,scale:.55,speed:.90,range:31,home:[130,142],behavior:'roam',active:'night',alertRadius:24}
  ];

  function dayPhase(date){
    const h=date.getHours()+date.getMinutes()/60;
    if(h<5.5||h>=22) return 'night';
    if(h<8) return 'dawn';
    if(h<18) return 'day';
    return 'dusk';
  }

  function season(date){
    const m=date.getMonth();
    if(m===11||m<=1) return 'winter';
    if(m<=4) return 'spring';
    if(m<=7) return 'summer';
    return 'fall';
  }

  function activeMultiplier(spec,phase){
    if(spec.active==='day') return phase==='day'?1:phase==='dawn'||phase==='dusk'?.55:.22;
    if(spec.active==='night') return phase==='night'?1:phase==='dawn'||phase==='dusk'?.62:.24;
    return phase==='dawn'||phase==='dusk'?1:phase==='day'?.72:.38;
  }

  function makeAnimal(THREE,scene,spec){
    const g=new THREE.Group();g.name='OSKO_WILDLIFE_'+spec.id;
    const mat=new THREE.MeshStandardMaterial({color:spec.color,roughness:.9,metalness:0});
    const body=new THREE.Mesh(new THREE.CapsuleGeometry(1.15*spec.scale,2.25*spec.scale,4,8),mat);
    body.rotation.z=Math.PI/2;body.position.y=2*spec.scale;g.add(body);
    const head=new THREE.Mesh(new THREE.SphereGeometry(.72*spec.scale,10,8),mat);
    head.position.set(1.75*spec.scale,2.35*spec.scale,0);g.add(head);
    for(const z of[-.62,.62])for(const x of[-.75,.75]){
      const leg=new THREE.Mesh(new THREE.CylinderGeometry(.14*spec.scale,.18*spec.scale,1.7*spec.scale,6),mat);
      leg.position.set(x*spec.scale,.85*spec.scale,z*spec.scale);g.add(leg);
    }
    if(spec.id==='black-bear'||spec.id==='grizzly')g.children.slice(2).forEach(function(leg){leg.scale.y=.64;});
    g.position.set(spec.home[0],0,spec.home[1]);
    g.userData.oskoWildlife={spec:spec,phase:Math.random()*Math.PI*2,visible:true,state:'CALM',lastAlert:false};
    scene.add(g);return g;
  }

  function create(options){
    options=options||{};
    const THREE=options.THREE,scene=options.scene;
    if(!THREE||!scene)throw new Error('OSKOWildlife requires THREE and scene');
    const terrainHeight=typeof options.terrainHeight==='function'?options.terrainHeight:function(){return 0;};
    const avoidZones=Array.isArray(options.avoidZones)?options.avoidZones:[];
    const awarenessPoints=Array.isArray(options.awarenessPoints)?options.awarenessPoints:[];
    const onAlert=typeof options.onAlert==='function'?options.onAlert:function(){};
    const species=Array.isArray(options.species)?options.species:DEFAULT_SPECIES;
    const animals=species.map(function(spec){return makeAnimal(THREE,scene,spec);});
    let enabled=true,lastPhase='',lastSeason='';

    function pushFromZone(x,z,zone){
      const dx=x-zone.x,dz=z-zone.z,len=Math.max(.001,Math.hypot(dx,dz)),r=(zone.radius||20)+8;
      return [zone.x+dx/len*r,zone.z+dz/len*r];
    }

    function update(now,date){
      if(!enabled)return;
      date=date||new Date();
      const phase=dayPhase(date),yrSeason=season(date),sec=now*.001;
      lastPhase=phase;lastSeason=yrSeason;
      for(const animal of animals){
        const d=animal.userData.oskoWildlife,s=d.spec;
        if(!d.visible){animal.visible=false;continue;}
        animal.visible=true;
        const activity=activeMultiplier(s,phase);
        const winterSlow=yrSeason==='winter'?.82:1;
        const ang=sec*s.speed*.16*activity*winterSlow+d.phase;
        let x=s.home[0]+Math.cos(ang)*s.range;
        let z=s.home[1]+Math.sin(ang*.83)*s.range*.72;
        let zoneHit=null;
        for(const zone of avoidZones){const dx=x-zone.x,dz=z-zone.z,r=zone.radius||20;if(dx*dx+dz*dz<r*r){zoneHit=zone;break;}}
        if(zoneHit){const p=pushFromZone(x,z,zoneHit);x=p[0];z=p[1];}
        const oldX=animal.position.x,oldZ=animal.position.z;
        animal.position.set(x,terrainHeight(x,z)+Math.sin(sec*2+d.phase)*.04,z);
        const dx=x-oldX,dz=z-oldZ;if(Math.abs(dx)+Math.abs(dz)>.0001)animal.rotation.y=Math.atan2(dx,dz);

        let nearest=null;
        for(const p of awarenessPoints){
          const dist=Math.hypot(x-p.x,z-p.z);
          if(!nearest||dist<nearest.distance)nearest={point:p,distance:dist};
        }
        const alert=!!(nearest&&nearest.distance<(s.alertRadius||30));
        d.state=alert?'AWARE':activity<.35?'RESTING':zoneHit?'AVOIDING':'CALM';
        if(alert&&!d.lastAlert)onAlert({type:'WILDLIFE_PROXIMITY',species:s.id,name:s.name,distance:+nearest.distance.toFixed(1),point:nearest.point,state:d.state});
        d.lastAlert=alert;
      }
    }

    function setEnabled(v){enabled=!!v;animals.forEach(function(a){a.visible=enabled&&a.userData.oskoWildlife.visible;});}
    function setSpeciesVisible(id,v){const a=animals.find(function(item){return item.userData.oskoWildlife.spec.id===id;});if(!a)return false;a.userData.oskoWildlife.visible=!!v;a.visible=enabled&&!!v;return true;}
    function getStatus(){return {enabled:enabled,phase:lastPhase,season:lastSeason,animals:animals.map(function(a){const d=a.userData.oskoWildlife,s=d.spec;return {id:s.id,name:s.name,behavior:s.behavior,state:d.state,visible:a.visible,x:+a.position.x.toFixed(1),z:+a.position.z.toFixed(1)};})};}
    function getAnimal(id){return animals.find(function(a){return a.userData.oskoWildlife.spec.id===id;})||null;}

    return {animals:animals,update:update,setEnabled:setEnabled,setSpeciesVisible:setSpeciesVisible,getStatus:getStatus,getAnimal:getAnimal};
  }

  global.OSKOWildlifeV2={create:create,DEFAULT_SPECIES:DEFAULT_SPECIES,dayPhase:dayPhase,season:season};
})(typeof window!=='undefined'?window:globalThis);
