const CACHE_NAME = 'hesab-safi-v4-auth';
const FILES_TO_CACHE = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png'];
self.addEventListener('install',(evt)=>{evt.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(FILES_TO_CACHE)));self.skipWaiting();});
self.addEventListener('activate',(evt)=>{evt.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>k!==CACHE_NAME?caches.delete(k):null))));self.clients.claim();});
self.addEventListener('fetch',(evt)=>{evt.respondWith(caches.open(CACHE_NAME).then(cache=>cache.match(evt.request).then(r=>r||fetch(evt.request).then(nr=>{cache.put(evt.request,nr.clone());return nr;}).catch(()=>r))));});
