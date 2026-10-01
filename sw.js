const CACHE_NAME='manavis-v1';
const ASSETS=['./manavis-kitchen.html','./manifest.json'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(names=>Promise.all(names.map(n=>n!==CACHE_NAME&&caches.delete(n)))))});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{if(e.request.method==='GET'){let clone=res.clone();caches.open(CACHE_NAME).then(c=>c.put(e.request,clone))}return res}).catch(()=>caches.match('./manavis-kitchen.html'))))});