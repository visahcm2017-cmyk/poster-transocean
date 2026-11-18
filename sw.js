// Ưu tiên bản mới từ mạng; mất mạng thì dùng bản đã lưu. Đổi V khi cần xóa bộ nhớ cũ.
const V='tp-v1.13.0';
self.addEventListener('install',e=>{self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
e.respondWith(fetch(r,{cache:'no-cache'}).then(res=>{if(res.ok){const c=res.clone();caches.open(V).then(h=>h.put(r,c))}return res}).catch(()=>caches.match(r).then(m=>m||caches.match('./'))))});
