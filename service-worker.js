'use strict';
const VERSION='crop-water-stress-v3-20261009';
const ASSETS=['./','./index.html','./app.js','./manifest.json','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('crop-water-stress-')&&k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=new URL(e.request.url);if(u.origin!==self.location.origin)return;
if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).then(r=>{let copy=r.clone();caches.open(VERSION).then(c=>c.put('./index.html',copy));return r}).catch(()=>caches.open(VERSION).then(c=>c.match('./index.html'))));return;}
e.respondWith(caches.open(VERSION).then(c=>c.match(e.request).then(cached=>cached||fetch(e.request).then(r=>{if(r.ok)c.put(e.request,r.clone());return r}))))
});
