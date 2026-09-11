/* OSKO Living OS — Alaska Wildlife Module v1
   Standalone world subsystem. Does not replace the Living OS render loop.
   Host integration contract:
     const wildlife = OSKOWildlife.create({ THREE, scene, terrainHeight, avoidZones });
     wildlife.update(performance.now());
*/
(function(global){
  'use strict';

  const DEFAULT_SPECIES = [
    {id:'moose', name:'Moose', color:0x4b382d, scale:1.45, speed:0.32, range:26, home:[-150,88], behavior:'graze'},
    {id:'caribou', name:'Caribou', color:0x705541, scale:1.15, speed:0.48, range:32, home:[145,58], behavior:'herd'},
    {id:'black-bear', name:'Black Bear', color:0x171716, scale:1.25, speed:0.28, range:21, home:[-145,-78], behavior:'forage'},
    {id:'grizzly', name:'Grizzly', color:0x59412f, scale:1.38, speed:0.24, range:19, home:[145,-92], behavior:'forage'},
    {id:'wolf', name:'Wolf', color:0x85898b, scale:0.78, speed:0.72, range:37, home:[-128,145], behavior:'roam'},
    {id:'fox', name:'Fox', color:0xa8552d, scale:0.55, speed:0.90, range:29, home:[130,142], behavior:'roam'}
  ];

  function clamp(v,a,b){ return Math.max(a,Math.min(b,v)); }

  function createAnimal(THREE, scene, spec){
    const group = new THREE.Group();
    group.name = 'OSKO_WILDLIFE_' + spec.id;

    const mat = new THREE.MeshStandardMaterial({color:spec.color,roughness:0.9,metalness:0});
    const body = new THREE.Mesh(new THREE.CapsuleGeometry(1.15*spec.scale,2.25*spec.scale,4,8),mat);
    body.rotation.z = Math.PI/2;
    body.position.y = 2.0*spec.scale;
    group.add(body);

    const head = new THREE.Mesh(new THREE.SphereGeometry(0.72*spec.scale,10,8),mat);
    head.position.set(1.75*spec.scale,2.35*spec.scale,0);
    group.add(head);

    for(const z of [-0.62,0.62]){
      for(const x of [-0.75,0.75]){
        const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.14*spec.scale,0.18*spec.scale,1.7*spec.scale,6),mat);
        leg.position.set(x*spec.scale,0.85*spec.scale,z*spec.scale);
        group.add(leg);
      }
    }

    if(spec.id==='black-bear' || spec.id==='grizzly'){
      group.children.slice(2).forEach(function(leg){ leg.scale.y = 0.64; });
    }

    group.position.set(spec.home[0],0,spec.home[1]);
    group.userData.oskoWildlife = {
      spec: spec,
      phase: Math.random()*Math.PI*2,
      pauseUntil: 0,
      alert: false,
      visible: true
    };
    scene.add(group);
    return group;
  }

  function create(options){
    options = options || {};
    const THREE = options.THREE;
    const scene = options.scene;
    if(!THREE || !scene) throw new Error('OSKOWildlife requires THREE and scene');

    const terrainHeight = typeof options.terrainHeight==='function' ? options.terrainHeight : function(){return 0;};
    const avoidZones = Array.isArray(options.avoidZones) ? options.avoidZones : [];
    const species = Array.isArray(options.species) ? options.species : DEFAULT_SPECIES;
    const animals = species.map(function(spec){ return createAnimal(THREE,scene,spec); });
    let enabled = true;

    function inAvoidZone(x,z){
      for(const zone of avoidZones){
        const dx=x-zone.x, dz=z-zone.z, r=zone.radius||20;
        if(dx*dx+dz*dz < r*r) return zone;
      }
      return null;
    }

    function update(now){
      if(!enabled) return;
      const sec = now*0.001;
      for(const animal of animals){
        const data=animal.userData.oskoWildlife;
        const spec=data.spec;
        if(!data.visible){ animal.visible=false; continue; }
        animal.visible=true;

        let ang = sec*spec.speed*0.16 + data.phase;
        let x = spec.home[0] + Math.cos(ang)*spec.range;
        let z = spec.home[1] + Math.sin(ang*0.83)*spec.range*0.72;

        const zone=inAvoidZone(x,z);
        if(zone){
          const dx=x-zone.x, dz=z-zone.z;
          const len=Math.max(0.001,Math.hypot(dx,dz));
          const push=(zone.radius||20)+8;
          x=zone.x+(dx/len)*push;
          z=zone.z+(dz/len)*push;
          data.alert=true;
        }else{
          data.alert=false;
        }

        const oldX=animal.position.x, oldZ=animal.position.z;
        animal.position.x=x;
        animal.position.z=z;
        animal.position.y=terrainHeight(x,z)+Math.sin(sec*2+data.phase)*0.04;
        const dx=x-oldX, dz=z-oldZ;
        if(Math.abs(dx)+Math.abs(dz)>0.0001) animal.rotation.y=Math.atan2(dx,dz);
      }
    }

    function setEnabled(value){
      enabled=!!value;
      animals.forEach(function(a){ a.visible=enabled && a.userData.oskoWildlife.visible; });
    }

    function setSpeciesVisible(id,value){
      const a=animals.find(function(item){return item.userData.oskoWildlife.spec.id===id;});
      if(!a) return false;
      a.userData.oskoWildlife.visible=!!value;
      a.visible=enabled && !!value;
      return true;
    }

    function getStatus(){
      return animals.map(function(a){
        const d=a.userData.oskoWildlife;
        return {id:d.spec.id,name:d.spec.name,behavior:d.spec.behavior,alert:d.alert,visible:a.visible,x:+a.position.x.toFixed(1),z:+a.position.z.toFixed(1)};
      });
    }

    return {animals, update, setEnabled, setSpeciesVisible, getStatus};
  }

  global.OSKOWildlife={create,DEFAULT_SPECIES};
})(typeof window!=='undefined'?window:globalThis);
