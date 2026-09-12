(()=>{'use strict';
function apply(src){
  if(!window.OSKOVisualFidelityV10) throw new Error('V10 visual core required');
  src=window.OSKOVisualFidelityV10.apply(src);
  const marker="let weatherMode='snow';function oskoWeather(mode)";
  if(!src.includes(marker)) throw new Error('v13 repair marker not found');
  const extra=String.raw`
const oskoV13R=new THREE.Group();scene.add(oskoV13R);oskoV13R.name='OSKO_VISUAL_FIDELITY_V13_REPAIR';
const rSnow=new THREE.MeshStandardMaterial({color:0xf4fcff,roughness:.98});
const rRock=new THREE.MeshStandardMaterial({color:0x40515b,roughness:.92});
const rRock2=new THREE.MeshStandardMaterial({color:0x273740,roughness:.9});
const rWood=new THREE.MeshStandardMaterial({color:0x5f3d28,roughness:.88});
const rDark=new THREE.MeshStandardMaterial({color:0x14252d,roughness:.52,metalness:.35});
const rMetal=new THREE.MeshStandardMaterial({color:0x263b45,roughness:.4,metalness:.65});
const rIce=new THREE.MeshStandardMaterial({color:0xa9efff,emissive:0x238fba,emissiveIntensity:.85,transparent:true,opacity:.88,roughness:.14});
const rWarm=new THREE.MeshStandardMaterial({color:0xffdfaa,emissive:0xffaa43,emissiveIntensity:2.0,transparent:true,opacity:.94});
function rb(w,h,d,m,x,y,z,p=oskoV13R){const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.position.set(x,y,z);o.castShadow=o.receiveShadow=true;p.add(o);return o}
function rc(r,h,m,x,y,z,p=oskoV13R,n=12){const o=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,n),m);o.position.set(x,y,z);o.castShadow=true;p.add(o);return o}
function rglow(x,y,z,color=0x8de8ff,int=.65,dist=28){const l=new THREE.PointLight(color,int,dist,2);l.position.set(x,y,z);oskoV13R.add(l);return l}
function rcrystal(x,z,s=.5){for(let i=0;i<4;i++){const h=(4+i*1.25)*s,c=new THREE.Mesh(new THREE.ConeGeometry((1.05-i*.08)*s,h,6),rIce);c.position.set(x+(i-1.5)*.9*s,h/2,z+(i%2?.3:-.3)*s);c.rotation.y=i*.4;oskoV13R.add(c)}}
function mountain(x,z,w,h,d,mat){const m=new THREE.Mesh(new THREE.ConeGeometry(w,h,6),mat);m.position.set(x,h*.48,z);m.scale.z=d/w;m.rotation.y=Math.PI/6;oskoV13R.add(m);const cap=new THREE.Mesh(new THREE.ConeGeometry(w*.7,h*.34,6),rSnow);cap.position.set(x,h*.81,z);cap.scale.z=d/w;cap.rotation.y=Math.PI/6;oskoV13R.add(cap)}
[[-180,-240,78,88,65,rRock2],[-78,-258,100,112,78,rRock],[35,-268,112,126,84,rRock2],[148,-248,88,98,70,rRock]].forEach(v=>mountain(...v));
rb(92,1.1,7,rWood,0,12,-50);for(let x=-42;x<=42;x+=8)rc(.38,4.8,rWood,x,14.4,-49.5);rb(64,.55,.6,rWood,0,16.5,-49.1);rb(18,1,11,rDark,0,9.2,-43.3);
for(const x of[-36,-24,-12,0,12,24,36]){const w=new THREE.Mesh(new THREE.PlaneGeometry(5,3.5),rWarm.clone());w.position.set(x,14,-49);oskoV13R.add(w)}
for(const x of[-26,-13,0,13,26]){const w=new THREE.Mesh(new THREE.PlaneGeometry(5.3,4),rWarm.clone());w.position.set(x,21.5,-49);oskoV13R.add(w)}
for(const x of[-34,34])rglow(x,14,-46,0xffc56d,.8,30);
for(const x of[-25,25]){rb(7,18,7,rWood,x,9,174);const cap=new THREE.Mesh(new THREE.OctahedronGeometry(4),rIce);cap.position.set(x,19.5,174);oskoV13R.add(cap)}rb(58,2.2,3,rDark,0,20,174);rb(50,.7,1,rIce,0,21.5,173.5);
for(let z=150;z>=-105;z-=18){for(const x of[-34,34]){const s=new THREE.Mesh(new THREE.SphereGeometry(2.7,8,6),rSnow);s.scale.set(2.3,.48,.95);s.position.set(x,1,z);oskoV13R.add(s)}}
for(const z of[138,98,58,18,-22])for(const x of[-18,18]){rc(.25,7,rMetal,x,3.5,z);const q=new THREE.Mesh(new THREE.SphereGeometry(.68,9,9),new THREE.MeshStandardMaterial({color:0xf2ffff,emissive:0x7edfff,emissiveIntensity:2.6}));q.position.set(x,7.2,z);oskoV13R.add(q)}
for(const z of[150,116,82,48,14,-20]){rcrystal(-29,z,.35);rcrystal(29,z,.35)}
function rail(x1,z1,x2,z2){const len=Math.hypot(x2-x1,z2-z1),ang=-Math.atan2(z2-z1,x2-x1);for(let i=0;i<=8;i++){const t=i/8;rc(.28,3.8,rWood,x1+(x2-x1)*t,1.9,z1+(z2-z1)*t)}for(const y of[1.2,2.6]){const r=rb(len,.28,.38,rWood,(x1+x2)/2,y,(z1+z2)/2);r.rotation.y=ang}}
rail(-210,-10,-210,68);rail(-210,68,-142,68);rail(-142,68,-142,-10);rail(-210,-10,-142,-10);
for(const [x,z] of[[-194,48],[-174,28],[-155,48],[-188,8]]){const g=new THREE.Group();g.position.set(x,0,z);oskoV13R.add(g);const mat=new THREE.MeshStandardMaterial({color:0x80694f,roughness:.86});const body=new THREE.Mesh(new THREE.CapsuleGeometry(1.6,4.5,5,8),mat);body.rotation.z=Math.PI/2;body.position.y=3.4;g.add(body);const head=new THREE.Mesh(new THREE.SphereGeometry(1.3,9,9),mat);head.position.set(3.8,4.2,0);g.add(head)}
const tower=new THREE.Group();tower.position.set(158,0,34);oskoV13R.add(tower);for(const sx of[-3,3])for(const sz of[-3,3])rc(.28,30,rDark,sx,15,sz,tower);for(let y=4;y<29;y+=5){const a=rb(8,.24,.24,rMetal,0,y,0,tower);const b=rb(8,.24,.24,rMetal,0,y,0,tower);b.rotation.y=Math.PI/2}rc(.22,9,rMetal,0,34,0,tower);const beacon=new THREE.Mesh(new THREE.SphereGeometry(.55,9,9),new THREE.MeshStandardMaterial({color:0xffdddd,emissive:0xff3030,emissiveIntensity:2.4}));beacon.position.set(0,39,0);tower.add(beacon);
rb(38,.6,20,rMetal,110,.32,4);for(const x of[102,110,118])rb(4,7,4,rDark,x,3.7,4);for(const x of[98,122])rc(.5,10,rMetal,x,5,4);rb(30,1,16,rDark,110,10.2,4);rglow(110,9,5,0xdafcff,.65,25);
const heli=new THREE.Mesh(new THREE.CylinderGeometry(24,24,.6,40),new THREE.MeshStandardMaterial({color:0x4b5860,roughness:.72,metalness:.28}));heli.position.set(176,.35,93);oskoV13R.add(heli);const ring=new THREE.Mesh(new THREE.TorusGeometry(16,.7,8,40),rIce);ring.rotation.x=Math.PI/2;ring.position.set(176,.8,93);oskoV13R.add(ring);rb(2,.5,17,rSnow,176,.8,93);rb(12,.5,2,rSnow,176,.8,93);
rb(38,1,7,rWood,116,.7,-39);for(const x of[100,108,116,124,132])rc(.4,4.6,rWood,x,2.2,-39);
for(const x of[36.5,49.9]){const trk=new THREE.Mesh(new THREE.BoxGeometry(5.8,3,15),new THREE.MeshStandardMaterial({color:0x10171b,roughness:.75,metalness:.3}));trk.position.set(x,4.1,89);oskoV13R.add(trk)}
rb(18,9,34,rDark,43.2,9,111);rb(19,1.1,36,rMetal,43.2,14.2,111);for(const z of[100,111,122])rb(2.6,5,1,rIce,52.2,9.2,z);
rb(26,8,20,rWood,146,5,18);const roof=new THREE.Mesh(new THREE.ConeGeometry(17,9,4),rDark);roof.rotation.y=Math.PI/4;roof.scale.z=.75;roof.position.set(146,13.5,18);oskoV13R.add(roof);for(const x of[140,146,152]){const w=new THREE.Mesh(new THREE.PlaneGeometry(4.2,3),rWarm.clone());w.position.set(x,7,28.1);oskoV13R.add(w)}
const dog=new THREE.Group();dog.position.set(136,0,37);oskoV13R.add(dog);const dm=new THREE.MeshStandardMaterial({color:0x96704d,roughness:.8});const db=new THREE.Mesh(new THREE.CapsuleGeometry(1.7,5.2,5,9),dm);db.rotation.z=Math.PI/2;db.position.y=3.8;dog.add(db);const dh=new THREE.Mesh(new THREE.SphereGeometry(1.8,10,10),dm);dh.position.set(3.8,4.8,0);dog.add(dh);const scarf=new THREE.Mesh(new THREE.TorusGeometry(1.7,.32,8,18),new THREE.MeshStandardMaterial({color:0xff6aa9,emissive:0x7d194a,emissiveIntensity:.4}));scarf.rotation.x=Math.PI/2;scarf.position.set(2.1,4.5,0);dog.add(scarf);
const fire=new THREE.Mesh(new THREE.ConeGeometry(2,4.6,8),new THREE.MeshStandardMaterial({color:0xff8b38,emissive:0xff5a12,emissiveIntensity:2.5}));fire.position.set(0,2.4,18);oskoV13R.add(fire);rglow(0,5.5,18,0xff7a32,1.5,34);
`;
  src=src.replace(marker,extra+marker);
  src=src.replace("READY • VISUAL FIDELITY V10 • LIVING OS ONLINE","READY • V13 REPAIR • LIVING OS ONLINE");
  return src;
}
window.OSKOVisualFidelityV13Repair={apply};
})();
