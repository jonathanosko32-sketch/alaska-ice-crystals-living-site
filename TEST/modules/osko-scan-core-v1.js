(function(root){'use strict';
function now(){return new Date().toISOString()}
function clean(v){return String(v==null?'':v).trim()}
function typeOf(format){const f=clean(format).toLowerCase();if(/qr/.test(f))return 'qr';if(/data.?matrix/.test(f))return 'data-matrix';if(/ean|upc|code_?128|code_?39|itf|codabar/.test(f))return 'barcode';return 'code'}
function create(opts){opts=opts||{};let history=[];const max=Math.max(1,Number(opts.maxHistory)||50);
 function normalize(input,source){const raw=clean(input&&('rawValue' in input?input.rawValue:input.value));const format=clean(input&&input.format)||'unknown';return {id:'scan-'+Date.now()+'-'+Math.random().toString(36).slice(2,8),rawValue:raw,format:format,kind:typeOf(format),source:source||'unknown',capturedAt:now(),offlineReadable:true,lookupStatus:'not-requested'} }
 function accept(input,source){const r=normalize(input,source);if(!r.rawValue)return {ok:false,error:'empty-code'};history.unshift(r);history=history.slice(0,max);return {ok:true,result:r}}
 function status(){return {history:history.slice(),last:history[0]||null,count:history.length}}
 function clear(){history=[];return status()}
 return {accept,status,clear,normalize};
}
root.OSKOScanCore={create:create};
})(typeof window!=='undefined'?window:globalThis);
