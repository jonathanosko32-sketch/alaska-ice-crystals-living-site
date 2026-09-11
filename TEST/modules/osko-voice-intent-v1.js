/* OSKO Living OS — Voice Intent Router v1
   Deterministic front-end parser. Natural-language AI may assist upstream,
   but final actions resolve to explicit object/action pairs.
*/
(function(global){
  'use strict';

  function norm(s){ return String(s||'').trim().toLowerCase().replace(/[^a-z0-9\s-]/g,' ').replace(/\s+/g,' '); }

  const OBJECT_ALIASES = {
    hq:['hq','house','home','lodge','headquarters'],
    school:['school','library','school library'],
    workshop:['shop','workshop','osko workshop'],
    truck:['truck','semi','tractor','trailer','truck yard'],
    gate:['gate','main gate','entrance','cattle guard'],
    robot4:['robot four','robot 4','fourth robot'],
    aurora:['aurora','service dog','dog'],
    lake:['lake','dock','lake dock'],
    fire:['fire','campfire','central fire'],
    tower:['tower','communications','communications tower'],
    ranch:['ranch','animals','animal area'],
    fuel:['fuel','fuel station','maintenance','service area']
  };

  const ACTION_ALIASES = [
    {action:'open', words:['open','enter','go inside','take me to','show me']},
    {action:'status', words:['status','check','how is','show status','what is happening']},
    {action:'lights.on', words:['lights on','turn on lights','light it up']},
    {action:'lights.off', words:['lights off','turn off lights']},
    {action:'lock', words:['lock','secure']},
    {action:'unlock', words:['unlock']},
    {action:'expand', words:['expand','open sides','open living module']},
    {action:'retract', words:['retract','close sides','close living module']},
    {action:'dock', words:['dock','go dock','return to dock']},
    {action:'home', words:['go home','return home','home']},
    {action:'find', words:['find','locate','where is']}
  ];

  function findObject(text){
    let best=null;
    Object.keys(OBJECT_ALIASES).forEach(function(id){
      OBJECT_ALIASES[id].forEach(function(alias){
        if(text.includes(alias) && (!best || alias.length>best.alias.length)) best={id:id,alias:alias};
      });
    });
    return best;
  }

  function findAction(text){
    let best=null;
    ACTION_ALIASES.forEach(function(row){
      row.words.forEach(function(w){
        if(text.includes(w) && (!best || w.length>best.word.length)) best={action:row.action,word:w};
      });
    });
    return best;
  }

  function parse(phrase){
    const text=norm(phrase);
    if(!text) return {ok:false,reason:'empty'};
    const object=findObject(text);
    const action=findAction(text);

    if(text==='home' || text==='take me home') return {ok:true,type:'navigation',target:'home',action:'focus'};
    if(text.includes('show property') || text.includes('whole property')) return {ok:true,type:'navigation',target:'property',action:'focus'};

    if(!object) return {ok:false,reason:'object-not-found',text:text};
    return {
      ok:true,
      type:'object-action',
      objectId:object.id,
      action:action ? action.action : 'open',
      text:text,
      confidence:action ? 0.95 : 0.75
    };
  }

  function create(options){
    options=options||{};
    const execute=typeof options.execute==='function' ? options.execute : null;
    const safety=typeof options.safety==='function' ? options.safety : function(){return {allowed:true};};

    function handle(phrase,context){
      const intent=parse(phrase);
      if(!intent.ok) return Promise.resolve(intent);
      const gate=safety(intent,context||{});
      if(gate && gate.allowed===false) return Promise.resolve({ok:false,reason:'blocked',detail:gate.reason||'not-allowed',intent:intent});
      if(!execute) return Promise.resolve({ok:true,dryRun:true,intent:intent});
      return Promise.resolve(execute(intent,context||{})).then(function(result){return {ok:true,intent:intent,result:result};});
    }

    return {parse:parse,handle:handle};
  }

  global.OSKOVoiceIntent={create:create,parse:parse,OBJECT_ALIASES:OBJECT_ALIASES};
})(typeof window!=='undefined'?window:globalThis);
