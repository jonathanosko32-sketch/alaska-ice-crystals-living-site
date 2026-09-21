(function(){
  'use strict';
  if(typeof THREE==='undefined'||typeof scene==='undefined')return;
  scene.userData=scene.userData||{};
  if(scene.userData.oskoFix78)return;
  scene.userData.oskoFix78=true;

  const world=new THREE.Group();
  world.name='OSKO_FIX78_WHOLE_WORLD_SHOWCASE';
  scene.add(world);

  const mat=(color,rough=.82,metal=.04,extra={})=>new THREE.MeshStandardMaterial(Object.assign({color,roughness:rough,metalness:metal},extra));
  const log=mat(0x70452f,.92),darkLog=mat(0x3b2923,.94),stone=mat(0x62737c,.98),snow=mat(0xe5f0f3,.96),roof=mat(0x25272b,.9),pine=mat(0x123b38,.96),trunk=mat(0x4c382d,1),ice=mat(0x8fd8e8,.3,.12,{transparent:true,opacity:.72,emissive:0x17495c,emissiveIntensity:.32}),warm=mat(0xffc66e,.36,.08,{emissive:0xff922f,emissiveIntensity:2.1}),blue=mat(0x67e4ff,.24,.48,{emissive:0x159cca,emissiveIntensity:2.8}),steel=mat(0x263742,.36,.72),cream=mat(0xd6bfaa,.44,.3);
  const smokeMat=new THREE.MeshBasicMaterial({color:0xdce8eb,transparent:true,opacity:.2,depthWrite:false});
  const movingSmoke=[];
  const pulseMeshes=[];

  function mesh(parent,geo,material,x,y,z,rx=0,ry=0,rz=0){
    const m=new THREE.Mesh(geo,material);m.position.set(x,y,z);m.rotation.set(rx,ry,rz);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;
  }
  function pineTree(x,z,s=1){
    const g=new THREE.Group();g.position.set(x,0,z);world.add(g);
    mesh(g,new THREE.CylinderGeometry(.45*s,.7*s,5*s,6),trunk,0,2.5*s,0);
    mesh(g,new THREE.ConeGeometry(4.4*s,10*s,7),pine,0,7*s,0);
    mesh(g,new THREE.ConeGeometry(3.1*s,7*s,7),snow,0,10*s,0);
  }

  // A deep three-row Alaska skyline makes the whole property feel surrounded by mountains.
  const mountainRows=[
    {z:-300,y:10,color:0x344d59,snow:0xd7e7ec,items:[[-250,48,70],[-188,64,88],[-112,51,72],[-36,72,100],[47,57,82],[123,68,96],[205,54,78],[270,45,66]]},
    {z:-348,y:13,color:0x263d49,snow:0xcbdfe7,items:[[-225,72,104],[-125,86,123],[-12,96,138],[104,82,118],[215,74,106]]},
    {z:-405,y:20,color:0x1b303c,snow:0xbfd8e2,items:[[-170,98,145],[-24,118,170],[132,105,154]]}
  ];
  mountainRows.forEach((row,ri)=>{
    const rockMat=mat(row.color,.99),capMat=mat(row.snow,.96);
    row.items.forEach((v,i)=>{
      const x=v[0],h=v[1],r=v[2]*.42;
      const peak=mesh(world,new THREE.ConeGeometry(r,h,7),rockMat,x,row.y+h*.5,row.z+(i%2?10:-8),0,(i*.31+ri*.17),0);peak.scale.z=.78;
      const cap=mesh(world,new THREE.ConeGeometry(r*.55,h*.37,7),capMat,x,row.y+h*.83,row.z+(i%2?10:-8),0,(i*.31+ri*.17),0);cap.scale.z=.78;
      for(const side of[-1,1]){const ridge=mesh(world,new THREE.ConeGeometry(r*.12,h*.52,5),stone,x+side*r*.28,row.y+h*.49,row.z+5,0,side*.12,side*.24);ridge.scale.z=.45;}
    });
  });

  // Finished exterior details for every home and working building.
  const buildings=[
    {x:0,z:-66,s:1.45,w:44,d:31,h:34},{x:-112,z:34,s:1,w:44,d:31,h:34},{x:98,z:42,s:.95,w:44,d:31,h:43},{x:-84,z:-48,s:.78,w:44,d:31,h:34},{x:158,z:25,s:.62,w:44,d:31,h:34},
    {x:-150,z:-104,s:1,w:40,d:27,h:33},{x:-102,z:-112,s:1,w:36,d:24,h:33},{x:170,z:-112,s:1,w:46,d:30,h:33},{x:138,z:-72,s:1,w:25,d:19,h:33},{x:-151,z:83,s:1,w:22,d:17,h:33},{x:146,z:-48,s:1,w:28,d:20,h:33}
  ];
  buildings.forEach((b,i)=>{
    const g=new THREE.Group();g.position.set(b.x,0,b.z);world.add(g);
    const s=b.s,front=b.d*.5*s;
    // Roof snow ridge, gutters, braces, awnings, porch lamps, chimney cap and smoke.
    mesh(g,new THREE.BoxGeometry(b.w*.7*s,.5*s,1.5*s),snow,0,b.h*s+1.2*s,0,0,0,(i%2?-.025:.025));
    for(const side of[-1,1]){
      mesh(g,new THREE.BoxGeometry(b.w*s+2*s,.38*s,.38*s),steel,0,(b.h-4)*s,side*(b.d*.43*s));
      mesh(g,new THREE.CylinderGeometry(.17*s,.22*s,7*s,6),steel,side*b.w*.46*s,(b.h-7)*s,front);
      const lamp=mesh(g,new THREE.SphereGeometry(.65*s,8,6),warm,side*b.w*.31*s,10*s,front+.75*s);pulseMeshes.push(lamp);
      const awning=mesh(g,new THREE.BoxGeometry(8*s,.45*s,3.1*s),roof,side*b.w*.25*s,13.1*s,front+1.2*s,-.16,0,0);
      mesh(g,new THREE.CylinderGeometry(.32*s,.4*s,6*s,6),darkLog,side*b.w*.34*s,4*s,front+3.2*s);
      mesh(g,new THREE.CylinderGeometry(.32*s,.4*s,6*s,6),darkLog,side*b.w*.16*s,4*s,front+3.2*s);
    }
    for(const px of[-b.w*.36,-b.w*.18,0,b.w*.18,b.w*.36])mesh(g,new THREE.BoxGeometry(.38*s,3.5*s,.38*s),darkLog,px*s,16*s,front+2.5*s);
    mesh(g,new THREE.BoxGeometry(b.w*.82*s,.42*s,.42*s),darkLog,0,17.7*s,front+2.5*s);
    const chimneyX=b.w*.28*s;
    mesh(g,new THREE.BoxGeometry(3.6*s,11*s,3.6*s),stone,chimneyX,(b.h-4)*s,-b.d*.17*s);
    mesh(g,new THREE.BoxGeometry(4.7*s,.7*s,4.7*s),snow,chimneyX,(b.h+1.7)*s,-b.d*.17*s);
    for(let p=0;p<3;p++){
      const puff=mesh(g,new THREE.SphereGeometry((.8+p*.28)*s,7,5),smokeMat,chimneyX,(b.h+4+p*2.3)*s,-b.d*.17*s+p*.4*s);
      puff.userData={baseY:puff.position.y,phase:i*.7+p*1.8,scale:s};movingSmoke.push(puff);
    }
    // Packed-snow front walk and stone landing.
    mesh(g,new THREE.BoxGeometry(9*s,.28*s,13*s),snow,0,.2*s,front+7*s);
    for(let step=0;step<3;step++)mesh(g,new THREE.BoxGeometry((9-step)*s,.65*s,(3+step*.7)*s),stone,0,(.32+step*.48)*s,front+(2+step*1.1)*s);
  });

  // Detail the existing living animals and add family members to the open ranges.
  function detailedAnimal(kind,x,z,s,color,accent,feature){
    if(typeof animal!=='function')return null;
    const g=animal(kind,x,z,s,color),detail=mat(accent,.88),eye=mat(0x091014,.45,.12,{emissive:0x081014,emissiveIntensity:.35});
    // Base animals face +X.
    mesh(g,new THREE.SphereGeometry(.7*s,8,6),detail,6.1*s,6*s,0);
    for(const side of[-1,1])mesh(g,new THREE.SphereGeometry(.16*s,6,5),eye,5.35*s,6.75*s,side*.92*s);
    for(const side of[-1,1]){const ear=mesh(g,new THREE.ConeGeometry(.38*s,1.25*s,5),detail,4.7*s,8*s,side*1.15*s,0,0,side*.3);ear.rotation.x=side*.12;}
    const tail=mesh(g,new THREE.CylinderGeometry(.16*s,.28*s,2.7*s,6),detail,-4.2*s,5.1*s,0,0,0,-.75);
    if(feature==='horns')for(const side of[-1,1])mesh(g,new THREE.ConeGeometry(.24*s,2.6*s,6),detail,4.8*s,8.3*s,side*1.35*s,side*.18,0,side*.68);
    if(feature==='antlers')for(const side of[-1,1]){const antler=mesh(g,new THREE.CylinderGeometry(.12*s,.2*s,3.8*s,6),detail,4.8*s,9.1*s,side*1.15*s,0,0,side*.38);for(let k=0;k<2;k++)mesh(g,new THREE.CylinderGeometry(.07*s,.12*s,1.4*s,5),detail,(4.5-k*.35)*s,(9.5+k*.8)*s,side*(1.7+k*.3)*s,0,0,side*.82);}
    if(feature==='mane')mesh(g,new THREE.ConeGeometry(2.35*s,4.2*s,8),detail,2.9*s,7.1*s,0,0,0,-Math.PI/2);
    if(feature==='saddle')mesh(g,new THREE.BoxGeometry(3.6*s,.75*s,3.1*s),detail,-.6*s,7.2*s,0);
    return g;
  }
  detailedAnimal('Caribou Bull',114,149,.82,0x765744,0x3b2d27,'antlers');
  detailedAnimal('Caribou Calf',128,158,.48,0x9b765c,0x564134,'antlers');
  detailedAnimal('Musk Ox',-220,105,1.03,0x3b302c,0xb79a72,'horns');
  detailedAnimal('Bison Calf',-191,39,.56,0x765847,0x382b24,'mane');
  detailedAnimal('Arctic Wolf',-164,92,.62,0xdbe4e6,0x68777d,'mane');
  detailedAnimal('Saddled Horse',-139,-18,.82,0x8a5637,0x5b241f,'saddle');
  detailedAnimal('Polar Bear Cub',60,169,.5,0xe7edef,0x9aaab0,'mane');

  // SKIE receives a stronger power pack, antenna, shoulder status lights and utility arms.
  if(typeof r4!=='undefined'&&r4&&r4.isGroup){
    const skieAdd=(geo,material,x,y,z,rx=0,ry=0,rz=0)=>mesh(r4,geo,material,x,y,z,rx,ry,rz);
    skieAdd(new THREE.BoxGeometry(5.8,7.2,2.2),steel,0,12.2,-3.1);
    skieAdd(new THREE.OctahedronGeometry(1.35,0),blue,0,12.6,-4.35);
    skieAdd(new THREE.CylinderGeometry(.12,.18,5.2,6),steel,0,24.6,-.5,0,0,.08);
    const beacon=skieAdd(new THREE.SphereGeometry(.42,8,6),blue,.4,27.1,-.5);pulseMeshes.push(beacon);
    for(const side of[-1,1]){
      skieAdd(new THREE.SphereGeometry(1.35,9,7),cream,side*4.2,15.4,0);
      const shoulderLight=skieAdd(new THREE.SphereGeometry(.34,7,5),blue,side*4.7,15.7,1.05);pulseMeshes.push(shoulderLight);
      skieAdd(new THREE.BoxGeometry(1.45,3.8,.55),steel,side*4.55,8,1.15,0,0,side*.04);
      skieAdd(new THREE.CylinderGeometry(.18,.27,3.8,6),cream,side*5.25,5.3,.7,0,0,side*.45);
    }
  }

  // Two compact helper robots and a visible charging bay complete the robot garage.
  function helperRobot(x,z,accent,turn=0){
    const g=new THREE.Group();g.position.set(x,0,z);g.rotation.y=turn;world.add(g);
    mesh(g,new THREE.CylinderGeometry(2.4,3.1,6.2,8),cream,0,7.1,0);
    mesh(g,new THREE.SphereGeometry(2.25,10,8),cream,0,11.5,0);
    const visor=mesh(g,new THREE.BoxGeometry(3.4,.9,.55),accent,0,11.8,2.05);pulseMeshes.push(visor);
    for(const side of[-1,1]){
      mesh(g,new THREE.CylinderGeometry(.65,.85,5,7),steel,side*3.2,7,0,0,0,side*.12);
      mesh(g,new THREE.CylinderGeometry(.85,1,4.8,7),steel,side*1.35,2.6,0);
      mesh(g,new THREE.BoxGeometry(2.1,.9,2.8),darkLog,side*1.35,.15,.5);
    }
    mesh(g,new THREE.BoxGeometry(3.6,3.8,1.6),steel,0,7,-2.2);
    return g;
  }
  helperRobot(-73,-35,blue,.18);helperRobot(-95,-36,warm,-.18);
  const dock=new THREE.Group();dock.position.set(-84,0,-39);world.add(dock);
  mesh(dock,new THREE.BoxGeometry(25,.65,9),steel,0,.35,0);
  for(const side of[-1,1]){mesh(dock,new THREE.BoxGeometry(1.1,10,1.1),steel,side*11.2,5,0);const lamp=mesh(dock,new THREE.SphereGeometry(.55,8,6),blue,side*11.2,10.2,.4);pulseMeshes.push(lamp);}
  mesh(dock,new THREE.BoxGeometry(23,1,1),blue,0,9.8,-.3);

  // Property-edge pines, warm lane lights, stone markers, and snowbanks unify the whole scene.
  [[-238,-130,1.15],[-214,-143,.9],[-180,-137,1.05],[-142,-151,.92],[-95,-143,1.1],[-48,-157,.88],[38,-156,1],[82,-145,.9],[126,-151,1.08],[198,-142,.95],[232,-124,1.12],[-239,92,1.05],[238,94,1.05]].forEach(v=>pineTree(v[0],v[1],v[2]));
  [[-58,-14],[-28,-16],[28,-16],[58,-14],[-73,74],[-35,91],[36,91],[74,74],[-134,-80],[119,-95]].forEach((v,i)=>{
    mesh(world,new THREE.CylinderGeometry(.24,.36,7.5,7),steel,v[0],3.75,v[1]);
    const lamp=mesh(world,new THREE.SphereGeometry(.62,8,6),i%3===0?blue:warm,v[0],7.8,v[1]);pulseMeshes.push(lamp);
    mesh(world,new THREE.SphereGeometry(2.3,7,5),snow,v[0],.48,v[1]+2.1).scale.set(2.2,.34,1.15);
  });
  for(const v of[[-210,-114,7],[-174,-124,5],[-126,-139,6],[-70,-129,5],[72,-132,6],[122,-137,5],[213,-119,7]]){
    const rock=mesh(world,new THREE.DodecahedronGeometry(v[2],0),stone,v[0],v[2]*.38,v[1]);rock.scale.set(1.4,.72,1);
    const cap=mesh(world,new THREE.SphereGeometry(v[2]*.62,7,5),snow,v[0],v[2]*.78,v[1]);cap.scale.set(1.5,.22,.9);
  }

  let raf=0;
  function animateFix78(now){
    const t=now*.001;
    movingSmoke.forEach((p,i)=>{const u=(t*.12+p.userData.phase)%1;p.position.y=p.userData.baseY+u*7*p.userData.scale;p.position.x+=Math.sin(t*.3+i)*.002;p.scale.setScalar(.75+u*.9);p.material.opacity=.2*(1-u);});
    pulseMeshes.forEach((m,i)=>{if(m.material&&'emissiveIntensity' in m.material)m.material.emissiveIntensity=1.8+.85*Math.sin(t*1.7+i*.6);});
    raf=requestAnimationFrame(animateFix78);
  }
  raf=requestAnimationFrame(animateFix78);
  window.addEventListener('pagehide',()=>cancelAnimationFrame(raf),{once:true});
  if(typeof status!=='undefined'&&status)status.textContent='READY • FIX78 • WHOLE WORLD SHOWCASE';
})();
