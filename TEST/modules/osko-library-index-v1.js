/* OSKO Living OS - Library Index Core v1
   Logical index for books, manuals, school material, project records and files.
   Does not grant filesystem access by itself.
*/
(function(root){
'use strict';
function create(opts){
  opts=opts||{};
  const eventBus=opts.eventBus||null;
  const items=new Map();
  const collections=new Map();

  function emit(type,payload){ if(eventBus&&typeof eventBus.emit==='function') eventBus.emit(type,payload); }
  function norm(v){ return String(v||'').trim().toLowerCase(); }
  function addCollection(id,config){
    if(!id) throw new Error('collection id required');
    const c=Object.assign({id,name:id,kind:'general',description:''},config||{});
    collections.set(id,c); return Object.assign({},c);
  }
  function add(item){
    if(!item||!item.id) throw new Error('item id required');
    const next=Object.assign({title:item.id,type:'document',collection:'general',tags:[],source:null,location:null,readOnly:false,meta:{}},item);
    if(!collections.has(next.collection)) addCollection(next.collection,{name:next.collection});
    items.set(next.id,next); emit('library:item-added',{id:next.id,collection:next.collection}); return Object.assign({},next);
  }
  function remove(id){ const existed=items.delete(id); if(existed) emit('library:item-removed',{id}); return existed; }
  function get(id){ const x=items.get(id); return x?Object.assign({},x):null; }
  function search(query,filters){
    const q=norm(query); filters=filters||{};
    return Array.from(items.values()).filter(item=>{
      if(filters.collection && item.collection!==filters.collection) return false;
      if(filters.type && item.type!==filters.type) return false;
      if(!q) return true;
      const hay=norm([item.title,item.type,item.collection,(item.tags||[]).join(' '),item.meta&&item.meta.description].join(' '));
      return hay.includes(q);
    }).map(item=>Object.assign({},item));
  }
  function listCollection(id){ return search('',{collection:id}); }
  function snapshot(){ return {collections:Array.from(collections.values()).map(x=>Object.assign({},x)),items:Array.from(items.values()).map(x=>Object.assign({},x))}; }

  addCollection('school',{name:'School & Library',kind:'learning'});
  addCollection('mechanics',{name:'Mechanics',kind:'technical'});
  addCollection('trucking',{name:'Trucking',kind:'technical'});
  addCollection('robots',{name:'Robots',kind:'project'});
  addCollection('living-os',{name:'Living OS',kind:'project'});
  addCollection('business',{name:'Business Records',kind:'records'});
  addCollection('aurora',{name:'Aurora',kind:'records'});
  addCollection('general',{name:'General',kind:'general'});

  return {addCollection,add,remove,get,search,listCollection,snapshot};
}
root.OSKOLibraryIndex={create};
})(typeof window!=='undefined'?window:globalThis);
