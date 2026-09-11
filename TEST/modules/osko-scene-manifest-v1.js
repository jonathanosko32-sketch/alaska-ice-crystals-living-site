/* OSKO Living OS - Scene Manifest v1
   Stable logical IDs and labels for major property objects.
   Keeps visual names separate from OS identities so visuals can be upgraded safely.
*/
(function(root){
'use strict';
const OBJECTS=[
  {id:'gate',name:'Main Gate',type:'access',zone:'property'},
  {id:'hq',name:'Alaska Ice Crystals HQ',type:'building',zone:'hq'},
  {id:'workshop',name:'OSKO Workshop',type:'building',zone:'workshop'},
  {id:'school',name:'School & Library',type:'building',zone:'school'},
  {id:'robot-garage',name:'Robot Garage',type:'building',zone:'robot-garage'},
  {id:'aurora-cabin',name:'Aurora Cabin',type:'building',zone:'aurora-cabin'},
  {id:'communications',name:'Communications Tower',type:'infrastructure',zone:'communications'},
  {id:'fuel-maintenance',name:'Fuel & Maintenance',type:'infrastructure',zone:'property'},
  {id:'crystal-lab',name:'Crystal Lab',type:'building',zone:'property'},
  {id:'grow-house',name:'Crystal Grow House',type:'building',zone:'property'},
  {id:'equipment-barn',name:'Equipment Barn',type:'building',zone:'property'},
  {id:'helipad',name:'Helipad',type:'transport',zone:'property'},
  {id:'lake',name:'Lake',type:'environment',zone:'lake'},
  {id:'lake-dock',name:'Lake Dock',type:'environment',zone:'lake'},
  {id:'ranch',name:'Ranch',type:'animal-area',zone:'ranch'},
  {id:'central-fire',name:'Central Fire',type:'social',zone:'property'},
  {id:'truck',name:'OSKO Custom Truck',type:'vehicle',zone:'property'},
  {id:'robot-four',name:'Robot Four',type:'robot',zone:'robot-garage'},
  {id:'aurora',name:'Aurora',type:'service-dog',zone:'property'}
];
function create(){
  const byId=new Map(OBJECTS.map(x=>[x.id,Object.assign({},x)]));
  const aliases=new Map([
    ['tower','communications'],['communication tower','communications'],['cb tower','communications'],
    ['shop','workshop'],['garage','robot-garage'],['dog cabin','aurora-cabin'],
    ['fire','central-fire'],['dock','lake-dock'],['fuel','fuel-maintenance']
  ]);
  function resolve(value){
    if(!value) return null;
    const key=String(value).trim().toLowerCase();
    if(byId.has(key)) return byId.get(key);
    if(aliases.has(key)) return byId.get(aliases.get(key))||null;
    for(const item of byId.values()) if(item.name.toLowerCase()===key) return item;
    return null;
  }
  function all(){ return Array.from(byId.values()).map(x=>Object.assign({},x)); }
  function addAlias(alias,id){ if(!byId.has(id)) return false; aliases.set(String(alias).toLowerCase(),id); return true; }
  function status(){ return {objectCount:byId.size,aliasCount:aliases.size}; }
  return {resolve,all,addAlias,status};
}
root.OSKOSceneManifest={create,OBJECTS:OBJECTS.map(x=>Object.assign({},x))};
})(typeof window!=='undefined'?window:globalThis);
