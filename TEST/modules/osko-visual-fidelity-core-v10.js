(()=>{'use strict';
function apply(src){
  src=src.replaceAll("'Robot Four'","'SKIE'").replaceAll('ROBOT FOUR','SKIE');
  src=src.replace("truck:{lights:true,expanded:false}","truck:{lights:true,sidesOut:false,roofUp:false,smoke:true}");
  const oldExpand="if(a==='EXPAND'){oskoStates.truck.expanded=!oskoStates.truck.expanded;const ex=oskoStates.truck.expanded;tr.scale.z=ex?1.32:1;sleeper.scale.y=ex?1.22:1;sleeper.position.y=ex?12.8:10.5;status.textContent='OSKO TRUCK • '+(ex?'LIVING MODULE EXPANDED':'TRAVEL MODE');return}";
  const newTruckActions="if(a==='SIDES'||a==='EXPAND'){oskoStates.truck.sidesOut=!oskoStates.truck.sidesOut;tr.scale.z=oskoStates.truck.sidesOut?1.32:1;status.textContent='OSKO TRUCK • SIDES '+(oskoStates.truck.sidesOut?'OUT':'IN');return}if(a==='ROOF'){oskoStates.truck.roofUp=!oskoStates.truck.roofUp;sleeper.scale.y=oskoStates.truck.roofUp?1.22:1;sleeper.position.y=oskoStates.truck.roofUp?12.8:10.5;status.textContent='OSKO TRUCK • ROOF '+(oskoStates.truck.roofUp?'UP':'DOWN');return}if(a==='SMOKE'){oskoStates.truck.smoke=!oskoStates.truck.smoke;if(typeof oskoTruckSmoke!=='undefined')oskoTruckSmoke.visible=oskoStates.truck.smoke;status.textContent='OSKO TRUCK • STACK SMOKE '+(oskoStates.truck.smoke?'ON':'OFF');return}";
  if(src.includes(oldExpand))src=src.replace(oldExpand,newTruckActions);
  const marker="let weatherMode='snow';function oskoWeather(mode)";
  if(!src.includes(marker))throw new Error('visual patch marker not found');
  const extra=String.raw`
const oskoTruckReg=reg.get('truck');if(oskoTruckReg){oskoTruckReg.acts=['OPEN','STATUS','LIGHTS','SIDES','ROOF','SMOKE'];}
const oskoSkieReg=reg.get('robot4');if(oskoSkieReg){oskoSkieReg.name='SKIE';oskoSkieReg.acts=['STATUS','TASKS','DOCK'];}
const oskoV10=new THREE.Group();scene.add(oskoV10);oskoV10.name='OSKO_VISUAL_FIDELITY_V10';
const logMat=new THREE.MeshStandardMaterial({color:0x6c4329,roughness:.8,metalness:.03});
const darkLogMat=new THREE.MeshStandardMaterial({color:0x37251b,roughness:.86});
const roofMatV10=new THREE.MeshStandardMaterial({color:0x152833,roughness:.58,metalness:.32});
const trimMat=new THREE.MeshStandardMaterial({color:0x294956,roughness:.54,metalness:.24});
const snowMatV10=new THREE.MeshStandardMaterial({color:0xeaf8fb,roughness:.96});
const iceMat=new THREE.MeshStandardMaterial({color:0x94ebff,emissive:0x218ebb,emissiveIntensity:.7,transparent:true,opacity:.84,roughness:.15,metalness:.08});
const glassMat=new THREE.MeshStandardMaterial({color:0xffe5b4,emissive:0xffb85f,emissiveIntensity:1.7,transparent:true,opacity:.9,roughness:.18});
const metalMat=new THREE.MeshStandardMaterial({color:0x243640,roughness:.42,metalness:.62});
function vb(w,h,d,m,x,y,z,p=oskoV10){const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.position.set(x,y,z);o.castShadow=o.receiveShadow=true;p.add(o);return o}
function vc(r,h,m,x,y,z,p=oskoV10,seg=12){const o=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,seg),m);o.position.set(x,y,z);o.castShadow=true;p.add(o);return o}
function warm(x,y,z,w=5,h=4,ry=0){const q=new THREE.Mesh(new THREE.PlaneGeometry(w,h),glassMat.clone());q.position.set(x,y,z);q.rotation.y=ry;oskoV10.add(q);return q}
function crystal(x,z,s=1){const g=new THREE.Group();g.position.set(x,0,z);oskoV10.add(g);for(let i=0;i<6;i++){const h=(5+i*1.65)*s,c=new THREE.Mesh(new THREE.ConeGeometry((1.32-i*.07)*s,h,6),iceMat);c.position.set((i-2.5)*1.05*s,h/2,(i%2?-.58:.58)*s);c.rotation.y=i*.44;g.add(c)}return g}
function pineV10(x,z,s=1){const tm=new THREE.MeshStandardMaterial({color:0x4c3221,roughness:.92}),pm=new THREE.MeshStandardMaterial({color:0x204a42,roughness:.88});vc(.55*s,5*s,tm,x,2.5*s,z);for(let i=0;i<4;i++){const c=new THREE.Mesh(new THREE.ConeGeometry((4.9-i*.75)*s,(7.5-i*.7)*s,9),pm);c.position.set(x,(5.7+i*3.2)*s,z);c.castShadow=true;oskoV10.add(c)}}
const hq=new THREE.Group();hq.position.set(0,0,-66);oskoV10.add(hq);
function hqb(w,h,d,m,x,y,z){return vb(w,h,d,m,x,y,z,hq)}
hqb(72,10,26,logMat,0,7,0);hqb(26,9,24,logMat,-43,6.5,1);hqb(26,9,24,logMat,43,6.5,1);
hqb(44,11,24,logMat,0,18,-1);hqb(18,8,20,logMat,-34,16,0);hqb(18,8,20,logMat,34,16,0);
const pk=new THREE.Mesh(new THREE.ConeGeometry(24,16,4),roofMatV10);pk.rotation.y=Math.PI/4;pk.scale.z=.72;pk.position.set(0,29,-1);pk.castShadow=true;hq.add(pk);
for(const x of[-43,43]){const rp=new THREE.Mesh(new THREE.ConeGeometry(18,10,4),roofMatV10);rp.rotation.y=Math.PI/4;rp.scale.z=.75;rp.position.set(x,18.5,1);hq.add(rp)}
hqb(86,1.2,8,darkLogMat,0,12,15);hqb(62,.7,1,trimMat,0,16.2,18.2);
for(let x=-40;x<=40;x+=8)vc(.45,5.2,logMat,x,14.6,-48.2);for(let x=-38;x<=38;x+=6.5)hqb(5.2,.5,.55,logMat,x,16.5,18.35);
for(const x of[-50,-38,-24,-12,0,12,24,38,50])warm(x,8,-52.8,5,4);for(const x of[-28,-14,0,14,28])warm(x,19,-53.3,5.5,4.6);
for(let i=0;i<9;i++)hqb(12-i*.9,.7,4,darkLogMat,0,.6+i*.62,21-i*2.1);
crystal(-50,-48,1.45);crystal(50,-48,1.45);crystal(-24,-38,.75);crystal(24,-38,.75);
function facade(cx,cz,w,labelTone=0x68cce8){vb(w,1.1,4,darkLogMat,cx,9,cz);for(let x=cx-w*.38;x<=cx+w*.38;x+=8)warm(x,7,cz+2.1,5,3.6);const l=new THREE.PointLight(labelTone,.75,34,2);l.position.set(cx,10,cz+5);oskoV10.add(l)}
facade(-112,57,44);facade(98,62,48);facade(-84,-27,40);
for(let z=145;z>=-118;z-=17){for(const x of[-31,31]){const s=new THREE.Mesh(new THREE.SphereGeometry(3.3+(Math.abs(z)%3)*.2,8,6),snowMatV10);s.scale.set(2,.48,.85);s.position.set(x,1.0,z);oskoV10.add(s)}}
for(const [x,z] of[[-18,151],[18,151],[-55,82],[55,82],[-92,6],[92,6],[-28,-18],[28,-18]]){vc(.35,7,metalMat,x,3.5,z);const bulb=new THREE.Mesh(new THREE.SphereGeometry(.8,10,10),new THREE.MeshStandardMaterial({color:0xeefcff,emissive:0x7ddcff,emissiveIntensity:2.5}));bulb.position.set(x,7.5,z);oskoV10.add(bulb);const pl=new THREE.PointLight(0x9ae7ff,.65,30,2);pl.position.set(x,7,z);oskoV10.add(pl)}
for(const x of[-22,22]){vb(5,15,5,darkLogMat,x,7.5,174);crystal(x,164,.85);const cap=new THREE.Mesh(new THREE.OctahedronGeometry(3.2),iceMat);cap.position.set(x,16.2,174);oskoV10.add(cap)}
const oskoTruckSmoke=new THREE.Group();scene.add(oskoTruckSmoke);const smoke=[];
for(const z of[84,92]){vc(.72,13,metalMat,43.2,17,z);for(let i=0;i<9;i++){const sm=new THREE.Mesh(new THREE.SphereGeometry(1.0+i*.1,8,8),new THREE.MeshBasicMaterial({color:0xe7eef1,transparent:true,opacity:.23-i*.017,depthWrite:false}));sm.position.set(43.2,24+i*1.45,z+(i%2?.35:-.35));sm.userData.seed=i*.71+z;oskoTruckSmoke.add(sm);smoke.push(sm)}}
const plow=new THREE.Mesh(new THREE.BoxGeometry(22,5,2),new THREE.MeshStandardMaterial({color:0xb8c8ce,roughness:.22,metalness:.82}));plow.position.set(43.2,6.4,75.5);plow.rotation.x=-.18;oskoV10.add(plow);for(const sx of[-8.5,8.5]){const wing=new THREE.Mesh(new THREE.BoxGeometry(5.5,5,1.6),plow.material);wing.position.set(43.2+sx,6.5,76.5);wing.rotation.y=sx<0?.28:-.28;oskoV10.add(wing)}
const windshield=new THREE.Mesh(new THREE.PlaneGeometry(12,4.8),new THREE.MeshStandardMaterial({color:0x84cde2,emissive:0x1b6c86,emissiveIntensity:.45,transparent:true,opacity:.72,roughness:.08}));windshield.position.set(43.2,12.4,80.9);oskoV10.add(windshield);
crystal(34,76,.6);crystal(52,76,.6);
setInterval(()=>{if(!oskoStates.truck.smoke){oskoTruckSmoke.visible=false;return}oskoTruckSmoke.visible=true;const t=Date.now()*.001;smoke.forEach((p,i)=>{p.position.y+=.17;p.position.x=43.2+Math.sin(t*.7+p.userData.seed)*.8;if(p.position.y>39)p.position.y=24+(i%9)*.7})},60);
const skie=new THREE.Group();skie.position.set(0,0,44);oskoV10.add(skie);const white=new THREE.MeshStandardMaterial({color:0xd8e8ec,roughness:.35,metalness:.2}),dark=new THREE.MeshStandardMaterial({color:0x142833,roughness:.4,metalness:.35}),blue=new THREE.MeshStandardMaterial({color:0x79e7ff,emissive:0x2fbbe8,emissiveIntensity:1.8});
const torso=new THREE.Mesh(new THREE.CapsuleGeometry(2.8,7.5,8,14),white);torso.position.y=9;skie.add(torso);vc(.8,1.4,dark,0,13.6,0,skie);const head=new THREE.Mesh(new THREE.SphereGeometry(2.8,18,18),white);head.position.y=16.2;skie.add(head);const visor=new THREE.Mesh(new THREE.BoxGeometry(4.5,1.25,.48),blue);visor.position.set(0,16.4,2.55);skie.add(visor);
for(const s of[-1,1]){const ua=new THREE.Mesh(new THREE.CapsuleGeometry(.72,4.6,5,9),dark);ua.position.set(s*4.0,9.8,0);ua.rotation.z=s*.08;skie.add(ua);const fa=new THREE.Mesh(new THREE.CapsuleGeometry(.62,4.2,5,9),white);fa.position.set(s*4.25,5.9,0);skie.add(fa);const leg=new THREE.Mesh(new THREE.CapsuleGeometry(.88,5.8,5,9),dark);leg.position.set(s*1.45,3.7,0);skie.add(leg)}
[[-208,-90,1.35],[-190,-112,1.1],[-174,-76,1.22],[191,-89,1.34],[207,-112,1.08],[183,-66,1.2],[-205,88,1.24],[205,86,1.26],[-162,132,1.05],[164,132,1.05],[-145,-142,1.1],[146,-144,1.12]].forEach(v=>pineV10(...v));
`;
  src=src.replace(marker,extra+marker);
  src=src.replace("READY • LIVING OS • PROPERTY SYSTEMS ONLINE","READY • VISUAL FIDELITY V10 • LIVING OS ONLINE");
  return src;
}
window.OSKOVisualFidelityV10={apply};
})();
