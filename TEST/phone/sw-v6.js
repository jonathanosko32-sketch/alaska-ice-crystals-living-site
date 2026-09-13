'use strict';
const CACHE='osko-phone-shell-v6';
const PREFIX='osko-phone-shell-';
const SHELL=['./OSKO-Living-OS-PHONE-INSTALL-v6.html','./OSKO-Living-OS-PHONE-SCANNER-v1.html','./manifest-v6.webmanifest','./icon.svg','./icon-192.png','./icon-512.png','./osko-phone-update-client-v1.js','./osko-phone-host-bridge-v1.js','../modules/osko-scan-core-v1.js','../OSKO-Living-OS-FIRST-BUILD-v1-FIX8.html'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith(PREFIX)&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const u=new URL(e.request.url);
  if(u.origin!==self.location.origin)return;
  if(u.pathname.endsWith('/releases-v3.json')){e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r}).catch(()=>caches.match(e.request)));return}
  if(e.request.mode==='navigate'){
    e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r}).catch(()=>caches.match(e.request).then(x=>x||caches.match('./OSKO-Living-OS-PHONE-INSTALL-v6.html'))));return;
  }
  e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(r=>{if(r.ok){const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy))}return r})));
});
