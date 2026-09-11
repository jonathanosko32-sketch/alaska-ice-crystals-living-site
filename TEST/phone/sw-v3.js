'use strict';
const CACHE='osko-phone-shell-v3';
const CORE=['./OSKO-Living-OS-PHONE-INSTALL-v3.html','./manifest.webmanifest','./icon.svg','./osko-phone-update-client-v1.js','./releases-v2.json','../OSKO-Living-OS-FIRST-BUILD-v1-FIX8.html'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{
 const u=new URL(event.request.url);
 if(u.pathname.endsWith('/releases-v2.json')){event.respondWith(fetch(event.request,{cache:'no-store'}).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(event.request,copy));return r}).catch(()=>caches.match('./releases-v2.json')));return}
 if(event.request.mode==='navigate'){event.respondWith(fetch(event.request).catch(()=>caches.match('./OSKO-Living-OS-PHONE-INSTALL-v3.html')));return}
 event.respondWith(caches.match(event.request).then(hit=>hit||fetch(event.request).then(r=>{if(event.request.method==='GET'&&r.ok){const copy=r.clone();caches.open(CACHE).then(c=>c.put(event.request,copy))}return r})));
});
