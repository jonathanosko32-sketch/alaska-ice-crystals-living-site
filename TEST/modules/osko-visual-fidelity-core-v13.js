(()=>{'use strict';
function apply(src){
  if(!window.OSKOVisualFidelityV12)throw new Error('V12 visual core required');
  src=window.OSKOVisualFidelityV12.apply(src);
  const marker="let weatherMode='snow';function oskoWeather(mode)";
  if(!src.includes(marker))throw new Error('v13 visual marker not found');
  const extra=String.raw`
const oskoV13=new THREE.Group();scene.add(oskoV13);oskoV13.name='OSKO_VISUAL_FIDELITY_V13';
const v13Snow=new THREE.MeshStandardMaterial({color:0xf5fcff,roughness:.98});
const v13Rock=new THREE.MeshStandardMaterial({color:0x52616a,roughness:.92});
const v13RockDark=new THREE.MeshStandardMaterial({color:0x283740,roughness:.9});
const v13Ice=new THREE.MeshStandardMaterial({color:0xa7efff,emissive:0x1f91bc,emissiveIntensity:.8,transparent:true,opacity:.86,roughness:.16});
const v13Wood=new THREE.MeshStandardMaterial({color:0x5e3c27,roughness:.9});
const v13Metal=new THREE.MeshStandardMaterial({color:0x23343d,roughness:.46,metalness:.62});
const v13Dark=new THREE.MeshStandardMaterial({color:0x101c23,roughness:.58,metalness:.34});
const v13Warm=new THREE.MeshStandardMaterial({color:0xffdfab,emissive:0xffad4a,emissiveIntensity:2.0,transparent:true,opacity:.95});
function b13(w,h,d,m,x,y,z,p=oskoV13){const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.position.set(x,y,z);o.castShadow=o.receiveShadow=true;p.add(o);return o}
function c13(r,h,m,x,y,z,p=oskoV13,n=12){const o=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,n),m);o.position.set(x,y,z);o.castShadow=true;p.add(o);return o}
function glow13(x,y,z,color=0x8de8ff,intensity=.7,dist=30){const l=new THREE.PointLight(color,intensity,dist,2);l.position.set(x,y,z);oskoV13.add(l);return l}
function crystal13(x,z,s=1){const g=new THREE.Group();g.position.set(x,0,z);oskoV13.add(g);for(let i=0;i<5;i++){const h=(4.5+i*1.5)*s,q=new THREE.Mesh(new THREE.ConeGeometry((1.1-i*.06)*s,h,6),v13Ice);q.position.set((i-2)*1.02*s,h/2,(i%2?.4:-.4)*s);q.rotation.y=i*.47;g.add(q)}return g}

/* Mountain wall: fills the horizon with layered Alaska terrain without changing the property footprint. */
function mountain13(x,z,w,h,d,mat){const m=new THREE.Mesh(new THREE.ConeGeometry(w,h,6),mat);m.position.set(x,h*.48,z);m.scale.z=d/w;m.rotation.y=Math.PI/6;m.receiveShadow=true;oskoV13.add(m);const cap=new THREE.Mesh(new THREE.ConeGeometry(w*.72,h*.38,6),v13Snow);cap.position.set(x,h*.82,z);cap.scale.z=d/w;m.rotation.y=Math.PI/6;oskoV13.add(cap)}
[[-210,-245,85,92,70,v13RockDark],[-115,-262,105,118,78,v13Rock],[-5,-276,126,142,92,v13RockDark],[112,-260,108,120,82,v13Rock],[214,-244,84,90,68,v13RockDark]].forEach(v=>mountain13(...v));

/* Aurora curtains: broad translucent ribbons behind the property. */
const aurora13=[];for(let i=0;i<6;i++){const mat=new THREE.MeshBasicMaterial({color:i%2?0x70f0ce:0x7ddcff,transparent:true,opacity:.055,side:THREE.DoubleSide,depthWrite:false,blending:THREE.AdditiveBlending});const q=new THREE.Mesh(new THREE.PlaneGeometry(115+i*12,62+i*4,18,5),mat);q.position.set(-180+i*72,102+i*4,-228-i*5);q.rotation.y=(i-2.5)*.06;q.userData.seed=i*.8;oskoV13.add(q);aurora13.push(q)}
setInterval(()=>{const t=Date.now()*.001;aurora13.forEach((q,i)=>{q.position.x+=Math.sin(t*.14+q.userData.seed)*.015;q.rotation.z=Math.sin(t*.1+i)*.01})},80);

/* Ranch boundary: clearer separation between domestic-animal area and living property. */
function fence13(x1,z1,x2,z2,steps=9){for(let i=0;i<=steps;i++){const t=i/steps,x=x1+(x2-x1)*t,z=z1+(z2-z1)*t;c13(.34,4.2,v13Wood,x,2.1,z)}const dx=x2-x1,dz=z2-z1,len=Math.hypot(dx,dz),ang=-Math.atan2(dz,dx);for(const y of[1.3,2.8]){const r=b13(len,.34,.42,v13Wood,(x1+x2)/2,y,(z1+z2)/2);r.rotation.y=ang}}
fence13(-220,-18,-220,75,12);fence13(-220,75,-135,75,11);fence13(-135,75,-135,-18,12);fence13(-220,-18,-135,-18,11);
for(const [x,z] of[[-205,55],[-185,38],[-160,56],[-197,10],[-155,12]]){const animal=new THREE.Group();animal.position.set(x,0,z);oskoV13.add(animal);const body=new THREE.Mesh(new THREE.CapsuleGeometry(1.8,5,5,8),new THREE.MeshStandardMaterial({color:(x+z)%2?0x6b5846:0x8d7559,roughness:.86}));body.rotation.z=Math.PI/2;body.position.y=3.7;animal.add(body);const head=new THREE.Mesh(new THREE.SphereGeometry(1.45,10,10),body.material);head.position.set(4.2,4.6,0);animal.add(head);for(const sx of[-1.7,1.7])for(const sz of[-.9,.9]){const leg=new THREE.Mesh(new THREE.CylinderGeometry(.34,.42,2.8,7),body.material);leg.position.set(sx,1.5,sz);animal.add(leg)}}

/* Communications tower: black cage silhouette with antenna lights and equipment base. */
const tower13=new THREE.Group();tower13.position.set(158,0,34);oskoV13.add(tower13);for(const sx of[-3,3])for(const sz of[-3,3])c13(.32,34,v13Dark,sx,17,sz,tower13);for(let y=4;y<=32;y+=4){for(const a of[0,Math.PI/2]){const bar=b13(8,.28,.28,v13Metal,0,y,0,tower13);bar.rotation.y=a}}for(let y=5;y<31;y+=5){for(const s of[-1,1]){const brace=b13(9,.2,.22,v13Metal,0,y,0,tower13);brace.rotation.z=s*.55;brace.rotation.y=.78}}
c13(.24,11,v13Metal,0,39,0,tower13);const beacon=new THREE.Mesh(new THREE.SphereGeometry(.62,10,10),new THREE.MeshStandardMaterial({color:0xffdddd,emissive:0xff2f2f,emissiveIntensity:2.4}));beacon.position.set(0,45,0);tower13.add(beacon);glow13(158,42,34,0xff3030,.45,18);b13(13,5,10,v13Dark,158,2.8,34);

/* Fuel & maintenance zone: pump island, canopy and lit service pad. */
b13(42,.65,22,v13Metal,112,.35,4);for(const x of[102,112,122]){b13(4,8,4,v13Dark,x,4.3,4);const screen=new THREE.Mesh(new THREE.PlaneGeometry(2.2,1.5),new THREE.MeshStandardMaterial({color:0x85eaff,emissive:0x2ca8ce,emissiveIntensity:1.3}));screen.position.set(x,5.4,6.05);oskoV13.add(screen)}for(const x of[98,126])c13(.55,11,v13Metal,x,5.5,4);b13(34,1.1,18,v13Dark,112,11.2,4);for(const x of[101,112,123])glow13(x,10,5,0xdafcff,.65,24);

/* Helipad and dock become readable landmarks. */
const heli13=new THREE.Mesh(new THREE.CylinderGeometry(27,27,.65,48),new THREE.MeshStandardMaterial({color:0x49565d,roughness:.72,metalness:.3}));heli13.position.set(176,.38,93);oskoV13.add(heli13);const ring13=new THREE.Mesh(new THREE.TorusGeometry(18,.75,8,48),v13Ice);ring13.rotation.x=Math.PI/2;ring13.position.set(176,.82,93);oskoV13.add(ring13);b13(2,.55,19,v13Snow,176,.82,93);b13(14,.55,2,v13Snow,176,.82,93);glow13(176,4,93,0x8de8ff,.55,30);
b13(42,1.0,7,v13Wood,116,.7,-39);for(const x of[97,107,117,127,137])c13(.42,5,v13Wood,x,2.2,-39);for(const x of[100,132]){const lamp=new THREE.Mesh(new THREE.SphereGeometry(.6,9,9),new THREE.MeshStandardMaterial({color:0xecffff,emissive:0x7adfff,emissiveIntensity:2.1}));lamp.position.set(x,5.4,-39);oskoV13.add(lamp)}

/* Lake shoreline depth: snow/ice stones and low crystals rather than an empty flat edge. */
for(let i=0;i<18;i++){const a=i/18*Math.PI*1.35-.35,x=112+Math.cos(a)*58,z=-64+Math.sin(a)*37;const rock=new THREE.Mesh(new THREE.DodecahedronGeometry(2.2+(i%3)*.55),i%2?v13Rock:v13Snow);rock.scale.y=.55;rock.position.set(x,1.0,z);oskoV13.add(rock);if(i%4===0)crystal13(x+2,z-2,.34)}

/* Entrance and HQ path: denser crystal markers and warm arrival lighting. */
for(const [x,z] of[[-26,156],[26,156],[-27,132],[27,132],[-28,105],[28,105],[-29,78],[29,78],[-30,50],[30,50],[-24,-28],[24,-28],[-34,-43],[34,-43]])crystal13(x,z,.42);
for(const [x,z] of[[-12,-34],[12,-34],[-20,-44],[20,-44]])glow13(x,5,z,0xffc56d,.75,24);

/* Truck trailer gets side rails, rear lights and roof hardware to read as a working vehicle. */
for(const x of[33.2,53.2]){b13(1.1,8,39,v13Metal,x,9.2,113);for(const z of[99,111,123])b13(2.2,5.5,1,v13Ice,x,9.4,z)}
for(const x of[36.5,49.9])for(const z of[101,114,127]){const lamp=new THREE.Mesh(new THREE.SphereGeometry(.5,9,9),new THREE.MeshStandardMaterial({color:0xff8b73,emissive:0xff3e25,emissiveIntensity:2.3}));lamp.position.set(x,6.0,z);oskoV13.add(lamp)}
for(const z of[101,113,125])b13(10,.55,1,v13Metal,43.2,15.8,z);

/* SKIE receives clearer face, neck ring and five-finger hand cues while remaining lightweight. */
const neckRing=new THREE.Mesh(new THREE.TorusGeometry(1.2,.24,8,18),v13Ice);neckRing.rotation.x=Math.PI/2;neckRing.position.set(0,13.6,44);oskoV13.add(neckRing);for(const ex of[-.9,.9]){const eye=new THREE.Mesh(new THREE.SphereGeometry(.28,8,8),new THREE.MeshStandardMaterial({color:0xaef5ff,emissive:0x4fdcff,emissiveIntensity:2.5}));eye.position.set(ex,16.5,46.65);oskoV13.add(eye)}for(const s of[-1,1]){for(let f=0;f<5;f++){const finger=c13(.12,.9,v13Dark,s*(4.55+f*.12),3.55,43.45+f*.24);finger.rotation.z=s*.18}}

/* More tree depth around corners; avoids cluttering touch targets in central road. */
function pine13(x,z,s=1){c13(.46*s,4.4*s,new THREE.MeshStandardMaterial({color:0x493120,roughness:.92}),x,2.2*s,z);const pm=new THREE.MeshStandardMaterial({color:0x19483e,roughness:.9});for(let i=0;i<4;i++){const q=new THREE.Mesh(new THREE.ConeGeometry((4.9-i*.7)*s,(7.3-i*.6)*s,9),pm);q.position.set(x,(5.2+i*2.95)*s,z);oskoV13.add(q)}}
[[-205,128,1.2],[-190,105,1.0],[-205,45,1.12],[-198,-72,1.18],[-190,-130,1.0],[204,128,1.2],[190,108,1.0],[204,48,1.12],[199,-70,1.16],[190,-132,1.0],[-110,-150,.95],[112,-152,.96]].forEach(v=>pine13(...v));
`;
  src=src.replace(marker,extra+marker);
  src=src.replace("READY • VISUAL FIDELITY V12 • LIVING OS ONLINE","READY • VISUAL FIDELITY V13 • LIVING OS ONLINE");
  return src;
}
window.OSKOVisualFidelityV13={apply};
})();
