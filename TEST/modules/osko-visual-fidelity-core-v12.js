(()=>{'use strict';
function apply(src){
  if(!window.OSKOVisualFidelityV11)throw new Error('V11 visual core required');
  src=window.OSKOVisualFidelityV11.apply(src);
  const marker="let weatherMode='snow';function oskoWeather(mode)";
  if(!src.includes(marker))throw new Error('v12 visual marker not found');
  const extra=String.raw`
const oskoV12=new THREE.Group();scene.add(oskoV12);oskoV12.name='OSKO_VISUAL_FIDELITY_V12';
const v12Wood=new THREE.MeshStandardMaterial({color:0x684128,roughness:.84,metalness:.03});
const v12Dark=new THREE.MeshStandardMaterial({color:0x15252d,roughness:.52,metalness:.36});
const v12Snow=new THREE.MeshStandardMaterial({color:0xf4fcff,roughness:.98});
const v12Ice=new THREE.MeshStandardMaterial({color:0xa9efff,emissive:0x238fb8,emissiveIntensity:1.0,transparent:true,opacity:.9,roughness:.13});
const v12Warm=new THREE.MeshStandardMaterial({color:0xffdfaa,emissive:0xffaa43,emissiveIntensity:2.35,transparent:true,opacity:.95});
const v12Metal=new THREE.MeshStandardMaterial({color:0x263a44,roughness:.4,metalness:.68});
function b12(w,h,d,m,x,y,z,p=oskoV12){const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.position.set(x,y,z);o.castShadow=o.receiveShadow=true;p.add(o);return o}
function c12(r,h,m,x,y,z,p=oskoV12,n=12){const o=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,n),m);o.position.set(x,y,z);o.castShadow=true;p.add(o);return o}
function win12(x,y,z,w=5,h=3.5){const q=new THREE.Mesh(new THREE.PlaneGeometry(w,h),v12Warm.clone());q.position.set(x,y,z);oskoV12.add(q);return q}
function crystal12(x,z,s=1){const g=new THREE.Group();g.position.set(x,0,z);oskoV12.add(g);for(let i=0;i<6;i++){const h=(4.2+i*1.55)*s,q=new THREE.Mesh(new THREE.ConeGeometry((1.1-i*.055)*s,h,6),v12Ice);q.position.set((i-2.5)*.95*s,h/2,(i%2?.45:-.45)*s);q.rotation.y=i*.41;g.add(q)}return g}
function roof12(x,z,w,d,h=8){const r=new THREE.Mesh(new THREE.ConeGeometry(Math.max(w,d)*.56,h,4),v12Dark);r.rotation.y=Math.PI/4;r.scale.z=d/w;r.position.set(x,14+h*.42,z);r.castShadow=true;oskoV12.add(r);return r}

/* HQ reference pass: deeper wings, strong center peak, balcony edge, lower covered entry. */
b12(104,1.2,6,v12Wood,0,12,-50);for(let x=-48;x<=48;x+=8)c12(.38,4.8,v12Wood,x,14.4,-49.6);
b12(76,.55,.6,v12Wood,0,16.6,-49.2);b12(24,1,12,v12Dark,0,9.2,-43.5);
for(const x of[-44,-34,-24,-14,-4,6,16,26,36,46])win12(x,13.7,-49.1,4.5,3.2);
for(const x of[-28,-14,0,14,28])win12(x,22,-48.8,5.5,4.1);
const hqPeak=new THREE.Mesh(new THREE.ConeGeometry(26,18,4),v12Dark);hqPeak.rotation.y=Math.PI/4;hqPeak.scale.z=.72;hqPeak.position.set(0,29,-63);hqPeak.castShadow=true;oskoV12.add(hqPeak);
for(const x of[-38,38]){const wingPeak=new THREE.Mesh(new THREE.ConeGeometry(17,11,4),v12Dark);wingPeak.rotation.y=Math.PI/4;wingPeak.scale.z=.78;wingPeak.position.set(x,23,-62);oskoV12.add(wingPeak)}
for(let i=0;i<8;i++)b12(14-i*.85,.7,4,v12Wood,0,.55+i*.6,-34-i*1.85);
for(const x of[-36,36]){const l=new THREE.PointLight(0xffc56f,1.0,32,2);l.position.set(x,14,-47);oskoV12.add(l)}
crystal12(-54,-46,1.2);crystal12(54,-46,1.2);

/* Workshop / School / Robot Garage: give each a distinct larger lodge-style profile. */
function lodgeFront(cx,cz,w,d,accent){b12(w,10,d,v12Wood,cx,6.2,cz);roof12(cx,cz,w,d,9);b12(w*.92,1.0,5,v12Dark,cx,10.7,cz+d*.52);b12(10,5,1,v12Dark,cx,4.5,cz+d*.52+2.2);for(let x=cx-w*.34;x<=cx+w*.34;x+=9)win12(x,7.3,cz+d*.52+2.25,5,3.5);const l=new THREE.PointLight(accent,.8,34,2);l.position.set(cx,10,cz+d*.52+5);oskoV12.add(l)}
lodgeFront(-112,57,46,28,0x86e8ff);lodgeFront(98,62,50,30,0x86e8ff);lodgeFront(-84,-27,42,26,0x86e8ff);

/* Aurora cabin and service-dog area become visible, warm and intentional. */
b12(28,9,22,v12Wood,148,5.5,18);roof12(148,18,28,22,8);for(const x of[140,148,156])win12(x,7.1,29.1,4.8,3.4);b12(9,4,1,v12Dark,148,3.8,29.4);
b12(34,.8,8,v12Wood,148,.7,33);for(const x of[134,162])c12(.35,4.2,v12Wood,x,2.3,33);
const dog12=new THREE.Group();dog12.position.set(138,0,38);oskoV12.add(dog12);const dogBody=new THREE.Mesh(new THREE.CapsuleGeometry(2.1,6.5,6,10),new THREE.MeshStandardMaterial({color:0x8f6948,roughness:.8}));dogBody.rotation.z=Math.PI/2;dogBody.position.y=4.4;dog12.add(dogBody);const dogHead=new THREE.Mesh(new THREE.SphereGeometry(2.3,12,12),new THREE.MeshStandardMaterial({color:0xa07a55,roughness:.78}));dogHead.position.set(4.6,5.6,0);dog12.add(dogHead);const scarf12=new THREE.Mesh(new THREE.TorusGeometry(2.2,.42,8,20),new THREE.MeshStandardMaterial({color:0xff6aa9,emissive:0x7d194a,emissiveIntensity:.45}));scarf12.rotation.x=Math.PI/2;scarf12.position.set(2.5,5.1,0);dog12.add(scarf12);
for(const sx of[-1.9,1.9])for(const sz of[-1.25,1.25]){const leg=new THREE.Mesh(new THREE.CylinderGeometry(.45,.55,3.5,8),new THREE.MeshStandardMaterial({color:0x79583e,roughness:.82}));leg.position.set(sx,1.8,sz);dog12.add(leg)}

/* Central fire / social area: benches, glow and clearer gathering point. */
const fireMat12=new THREE.MeshStandardMaterial({color:0xff8b38,emissive:0xff5a12,emissiveIntensity:2.6,transparent:true,opacity:.9});
const fire12=new THREE.Mesh(new THREE.ConeGeometry(2.2,5,8),fireMat12);fire12.position.set(0,2.6,18);oskoV12.add(fire12);const fireLight12=new THREE.PointLight(0xff7a32,1.8,38,2);fireLight12.position.set(0,6,18);oskoV12.add(fireLight12);
for(const a of[0,Math.PI/2,Math.PI,Math.PI*1.5]){const bench=b12(10,1,2,v12Wood,Math.cos(a)*14,1.1,18+Math.sin(a)*14);bench.rotation.y=-a}

/* Road corridor and gate approach: more depth, lights, snow berms and crystal markers. */
for(let z=152;z>=-120;z-=12){for(const x of[-36,36]){const s=new THREE.Mesh(new THREE.SphereGeometry(2.8,8,6),v12Snow);s.scale.set(2.5,.48,1.0);s.position.set(x,1.0,z);oskoV12.add(s)}}
for(const z of[144,110,76,42,8,-26,-60])for(const x of[-19,19]){c12(.26,7.5,v12Metal,x,3.7,z);const bulb=new THREE.Mesh(new THREE.SphereGeometry(.72,10,10),new THREE.MeshStandardMaterial({color:0xf2ffff,emissive:0x7ddfff,emissiveIntensity:3}));bulb.position.set(x,7.8,z);oskoV12.add(bulb)}
for(const z of[156,130,104,78,52,26,0,-26]){crystal12(-30,z,.34);crystal12(30,z,.34)}

/* Main gate: taller ice-topped towers, broad header and cattle-guard framing. */
for(const x of[-25,25]){b12(7,19,7,v12Wood,x,9.5,174);const cap=new THREE.Mesh(new THREE.OctahedronGeometry(4.1),v12Ice);cap.position.set(x,20.4,174);oskoV12.add(cap)}
b12(58,2.4,3,v12Dark,0,20.4,174);b12(52,.8,1,v12Ice,0,22,173.5);for(const x of[-14,0,14]){const l=new THREE.PointLight(0x88e8ff,.85,28,2);l.position.set(x,19,170);oskoV12.add(l)}
for(let x=-18;x<=18;x+=3.2)b12(1.2,.5,9,v12Metal,x,.35,164);

/* Custom truck: trailer mass, roof-lift crown, side-module cues and chrome/plow stance. */
b12(18,6.4,8,v12Dark,43.2,10.8,84);b12(17,4.2,6,v12Wood,43.2,15.3,87);b12(16,2.2,7,v12Dark,43.2,19.0,88);
for(const x of[36.8,49.6]){const hl=new THREE.Mesh(new THREE.SphereGeometry(.82,10,10),new THREE.MeshStandardMaterial({color:0xf1ffff,emissive:0xb8f5ff,emissiveIntensity:3.2}));hl.position.set(x,10.5,79.5);oskoV12.add(hl)}
for(const x of[36.4,50.0]){const track=new THREE.Mesh(new THREE.BoxGeometry(6,3.2,16),new THREE.MeshStandardMaterial({color:0x10171b,roughness:.75,metalness:.3}));track.position.set(x,4.2,89);oskoV12.add(track)}
b12(18,10,38,v12Dark,43.2,9.2,112);b12(20,1.2,40,v12Metal,43.2,14.8,112);for(const z of[100,112,124]){b12(3.2,6,1,v12Ice,52.1,9.5,z)}
const plow12=b12(20,5.6,1.8,new THREE.MeshStandardMaterial({color:0xcbd7db,roughness:.18,metalness:.88}),43.2,6.5,75);plow12.rotation.x=-.16;for(const sx of[-10.5,10.5]){const wing=b12(6.2,5.5,1.6,plow12.material,43.2+sx,6.4,75.8);wing.rotation.y=sx<0?.34:-.34}

/* SKIE: stronger proportions, waist, shoulders, hands and feet while keeping simple phone performance. */
b12(7.8,1.2,2.4,v12Dark,0,12.6,44);b12(4.2,2.3,.55,new THREE.MeshStandardMaterial({color:0x7be8ff,emissive:0x2fbde9,emissiveIntensity:1.8}),0,10.2,46.5);b12(4.4,1.2,2.2,v12Dark,0,6.2,44);
for(const s of[-1,1]){const hand=new THREE.Mesh(new THREE.SphereGeometry(.78,10,10),v12Dark);hand.position.set(s*4.35,4.0,44);oskoV12.add(hand);b12(2.8,1.15,4.2,v12Dark,s*1.6,.75,44)}

/* Extra perimeter trees and snow mounds reduce empty voids without changing navigation. */
function pine12(x,z,s=1){c12(.48*s,4.5*s,new THREE.MeshStandardMaterial({color:0x493020,roughness:.92}),x,2.25*s,z);const pm=new THREE.MeshStandardMaterial({color:0x1f4b42,roughness:.9});for(let i=0;i<4;i++){const q=new THREE.Mesh(new THREE.ConeGeometry((4.8-i*.68)*s,(7.2-i*.55)*s,9),pm);q.position.set(x,(5.3+i*3.0)*s,z);oskoV12.add(q)}}
[[-170,120,1.25],[-150,95,1.05],[-165,65,1.15],[-170,20,1.0],[-165,-40,1.1],[-160,-100,1.2],[170,118,1.22],[150,94,1.0],[168,65,1.13],[172,18,1.02],[166,-42,1.12],[160,-102,1.18]].forEach(v=>pine12(...v));
`;
  src=src.replace(marker,extra+marker);
  src=src.replace("READY • VISUAL FIDELITY V11 • LIVING OS ONLINE","READY • VISUAL FIDELITY V12 • LIVING OS ONLINE");
  return src;
}
window.OSKOVisualFidelityV12={apply};
})();
