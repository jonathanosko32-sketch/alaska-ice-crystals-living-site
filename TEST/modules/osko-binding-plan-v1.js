/* OSKO Living OS - Property Binding Plan v1
   Declares the logical objects that must be connected during the clean visual integration.
   Data only: no DOM mutation, render loop ownership, or physical control.
*/
(function(root){
'use strict';
const DEFAULT_PLAN=[
  {id:'gate',required:true,group:'entry',camera:true,state:['open','locked','visible']},
  {id:'hq',required:true,group:'buildings',camera:true,state:['lights','visible']},
  {id:'workshop',required:true,group:'buildings',camera:true,state:['lights','visible']},
  {id:'school',required:true,group:'buildings',camera:true,state:['lights','visible']},
  {id:'robot-garage',required:true,group:'buildings',camera:true,state:['lights','visible']},
  {id:'aurora-cabin',required:false,group:'buildings',camera:true,state:['lights','visible']},
  {id:'communications',required:true,group:'systems',camera:true,state:['online','lights','visible']},
  {id:'fuel-maintenance',required:false,group:'systems',camera:true,state:['lights','visible']},
  {id:'crystal-lab',required:false,group:'buildings',camera:true,state:['lights','visible']},
  {id:'grow-house',required:false,group:'buildings',camera:true,state:['lights','visible']},
  {id:'equipment-barn',required:false,group:'buildings',camera:true,state:['lights','visible']},
  {id:'helipad',required:false,group:'property',camera:true,state:['visible']},
  {id:'lake',required:true,group:'property',camera:true,state:['visible']},
  {id:'lake-dock',required:false,group:'property',camera:true,state:['visible']},
  {id:'ranch',required:true,group:'property',camera:true,state:['visible']},
  {id:'central-fire',required:true,group:'property',camera:true,state:['lit','visible']},
  {id:'truck',required:true,group:'vehicles',camera:true,state:['lights','expanded','visible']},
  {id:'robot-four',required:true,group:'robots',camera:true,state:['status','visible']},
  {id:'aurora',required:true,group:'companions',camera:true,state:['status','visible']}
];
function clone(v){ return JSON.parse(JSON.stringify(v)); }
function create(opts){
  opts=opts||{};
  const items=clone(opts.plan||DEFAULT_PLAN);
  function all(){ return clone(items); }
  function get(id){ return clone(items.find(x=>x.id===id)||null); }
  function required(){ return clone(items.filter(x=>x.required)); }
  function optional(){ return clone(items.filter(x=>!x.required)); }
  function byGroup(group){ return clone(items.filter(x=>x.group===group)); }
  function status(boundIds){
    const bound=new Set(boundIds||[]);
    const req=items.filter(x=>x.required);
    const missing=req.filter(x=>!bound.has(x.id)).map(x=>x.id);
    return {ready:missing.length===0,required:req.length,boundRequired:req.length-missing.length,missing,allCount:items.length};
  }
  return {all,get,required,optional,byGroup,status};
}
root.OSKOBindingPlan={create,DEFAULT_PLAN:clone(DEFAULT_PLAN)};
})(typeof window!=='undefined'?window:globalThis);
