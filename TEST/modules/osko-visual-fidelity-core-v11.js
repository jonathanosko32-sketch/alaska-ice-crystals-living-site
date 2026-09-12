(()=>{'use strict';
function apply(src){
  if(!window.OSKOVisualFidelityV10)throw new Error('V10 visual core required');
  src=window.OSKOVisualFidelityV10.apply(src);
  const marker="let weatherMode='snow';function oskoWeather(mode)";
  if(!src.includes(marker))throw new Error('v11 visual marker not found');
  const extra=String.raw`
const oskoV11=new THREE.Group();scene.add(oskoV11);oskoV11.name='OSKO_VISUAL_FIDELITY_V11';
const v11Wood=new THREE.MeshStandardMaterial({color:0x5b3925,roughness:.82,metalness:.03});
const v11Dark=new THREE.MeshStandardMaterial({color:0x1a2931,roughness:.5,metalness:.35});
const v11Snow=new THREE.MeshStandardMaterial({color:0xf1fbfd,roughness:.97});
const v11Ice=new THREE.MeshStandardMaterial({color:0xa9efff,emissive:0x1b8fb9,emissiveIntensity:.9,transparent:true,opacity:.9,roughness:.12});
const v11Warm=new THREE.MeshStandardMaterial({color:0xffe3ad,emissive:0xffad45,emissiveIntensity:2.2,transparent:true,opacity:.93});
function b11(w,h,d,m,x,y,z,p=oskoV11){const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.position.set(x,y,z);o.castShadow=o.receiveShadow=true;p.add(o);return o}
function c11(r,h,m,x,y,z,p=oskoV11,n=12){const o=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,n),m);o.position.set(x,y,z);o.castShadow=true;p.add(o);return o}
function win11(x,y,z,w=5,h=3.5){const q=new THREE.Mesh(new THREE.PlaneGeometry(w,h),v11Warm.clone());q.position.set(x,y,z);oskoV11.add(q);return q}
function ice11(x,z,s=1){const g=new THREE.Group();g.position.set(x,0,z);oskoV11.add(g);for(let i=0;i<5;i++){const h=(4.5+i*1.7)*s,q=new THREE.Mesh(new THREE.ConeGeometry((1.15-i*.06)*s,h,6),v11Ice);q.position.set((i-2)*1.05*s,h/2,(i%2?.4:-.4)*s);q.rotation.y=i*.38;g.add(q)}return g}

/* HQ detail shell: stronger lodge proportions, porch rails, balcony lights and entrance canopy. */
b11(90,.9,7,v11Wood,0,11.7,-50.5);for(let x=-42;x<=42;x+=7){c11(.42,4.8,v11Wood,x,14.1,-49.8)}
b11(64,.55,.6,v11Wood,0,16.4,-49.4);b11(16,.9,10,v11Dark,0,9.4,-42.5);
for(const x of[-34,-24,-14,-4,6,16,26,36])win11(x,13.7,-49.25,4.8,3.3);
for(const x of[-24,-12,0,12,24])win11(x,21.6,-48.9,5.3,4.1);
for(const x of[-31,31]){const lamp=new THREE.PointLight(0xffc46d,.95,30,2);lamp.position.set(x,14,-47);oskoV11.add(lamp)}
for(let i=0;i<7;i++)b11(13-i*.9,.65,3.8,v11Wood,0,.55+i*.58,-34-i*1.9);

/* Gate becomes a deliberate Alaska Ice Crystals entrance rather than plain blocks. */
for(const x of[-24,24]){b11(6,17,6,v11Wood,x,8.5,174);const cap=new THREE.Mesh(new THREE.OctahedronGeometry(3.8),v11Ice);cap.position.set(x,18.2,174);oskoV11.add(cap);ice11(x,162,.7)}
b11(54,2.2,3,v11Dark,0,19.2,174);b11(48,.7,1,v11Ice,0,20.9,173.6);
for(const x of[-12,0,12]){const l=new THREE.PointLight(0x8be7ff,.7,24,2);l.position.set(x,18,170);oskoV11.add(l)}

/* Road edge, snow berms and utility lights create stronger depth on phone. */
for(let z=150;z>=-120;z-=14){for(const x of[-34,34]){const s=new THREE.Mesh(new THREE.SphereGeometry(2.8,8,6),v11Snow);s.scale.set(2.4,.5,1.0);s.position.set(x,1.1,z);oskoV11.add(s)}}
for(const [x,z] of[[-18,132],[18,132],[-18,95],[18,95],[-18,58],[18,58],[-18,20],[18,20],[-18,-18],[18,-18]]){c11(.28,7,v11Dark,x,3.5,z);const bulb=new THREE.Mesh(new THREE.SphereGeometry(.72,10,10),new THREE.MeshStandardMaterial({color:0xf5ffff,emissive:0x8ce8ff,emissiveIntensity:2.8}));bulb.position.set(x,7.4,z);oskoV11.add(bulb)}

/* Workshop, school, robot garage fronts get larger readable massing and entrances. */
function front11(cx,cz,w){b11(w,1.1,4,v11Wood,cx,9.3,cz);b11(10,5,1,v11Dark,cx,5,cz+2.3);for(let x=cx-w*.34;x<=cx+w*.34;x+=9)win11(x,7,cz+2.2,5,3.4);const pl=new THREE.PointLight(0x8edfff,.75,30,2);pl.position.set(cx,10,cz+5);oskoV11.add(pl)}
front11(-112,57,48);front11(98,62,50);front11(-84,-27,44);

/* Lake/dock dressing and crystal trail. */
b11(38,1.1,7,v11Wood,118,.9,-37);for(const x of[106,118,130]){c11(.45,4.5,v11Wood,x,2.2,-37)}
for(const [x,z,s] of[[92,-30,.45],[102,-34,.5],[112,-40,.52],[122,-44,.48],[132,-48,.45]])ice11(x,z,s);

/* Heavier custom truck nose and tracked visual stance. */
b11(18,6,8,v11Dark,43.2,10.5,84);b11(16,4,6,v11Wood,43.2,14.8,87);
for(const x of[37.2,49.2]){const hl=new THREE.Mesh(new THREE.SphereGeometry(.8,10,10),new THREE.MeshStandardMaterial({color:0xeafcff,emissive:0xb9f4ff,emissiveIntensity:3}));hl.position.set(x,10.2,79.9);oskoV11.add(hl)}
for(const x of[36.5,49.9]){const trk=new THREE.Mesh(new THREE.BoxGeometry(5.8,3.0,15),new THREE.MeshStandardMaterial({color:0x11181c,roughness:.74,metalness:.32}));trk.position.set(x,4.2,89);oskoV11.add(trk)}
const plowCenter=b11(19,5.4,1.6,new THREE.MeshStandardMaterial({color:0xc8d4d8,roughness:.18,metalness:.86}),43.2,6.5,75.2);plowCenter.rotation.x=-.15;
for(const sx of[-10,10]){const wing=b11(6,5.3,1.5,plowCenter.material,43.2+sx,6.4,76);wing.rotation.y=sx<0?.34:-.34}

/* SKIE silhouette: shoulders, chest panel, hands and feet for stronger human-like read. */
b11(7.4,1.1,2.2,v11Dark,0,12.2,44);const chest=new THREE.Mesh(new THREE.BoxGeometry(3.8,2.2,.5),new THREE.MeshStandardMaterial({color:0x79e7ff,emissive:0x2fbbe8,emissiveIntensity:1.5}));chest.position.set(0,10,46.5);oskoV11.add(chest);
for(const s of[-1,1]){const hand=new THREE.Mesh(new THREE.SphereGeometry(.72,10,10),v11Dark);hand.position.set(s*4.25,4.1,44);oskoV11.add(hand);b11(2.6,1.1,4,v11Dark,s*1.55,.7,44)}

/* Additional foreground/background pines to reduce empty snow field feel. */
function pine11(x,z,s=1){c11(.5*s,4.6*s,new THREE.MeshStandardMaterial({color:0x4b3121,roughness:.9}),x,2.3*s,z);const pm=new THREE.MeshStandardMaterial({color:0x1d4940,roughness:.88});for(let i=0;i<4;i++){const q=new THREE.Mesh(new THREE.ConeGeometry((4.7-i*.7)*s,(7-i*.6)*s,9),pm);q.position.set(x,(5.5+i*3.0)*s,z);oskoV11.add(q)}}
[[-150,110,1.2],[-135,92,.95],[-155,62,1.05],[148,112,1.18],[138,90,.92],[156,63,1.08],[-130,-118,1.05],[-112,-135,.9],[128,-120,1.03],[110,-138,.92]].forEach(v=>pine11(...v));
`;
  src=src.replace(marker,extra+marker);
  src=src.replace("READY • VISUAL FIDELITY V10 • LIVING OS ONLINE","READY • VISUAL FIDELITY V11 • LIVING OS ONLINE");
  return src;
}
window.OSKOVisualFidelityV11={apply};
})();
