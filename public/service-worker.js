self.addEventListener('install', (event) => {
    event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    const subdomain = url.hostname.split('.')[0]; // Extrae el subdominio del hostname

    const cacheName = `tenant-cache-${subdomain}`;

    // Almacena en caché los recursos específicos del tenant
    if (url.pathname.includes('/tenant_')) {
        console.log( 'OK' )

        event.respondWith(
            caches.open(cacheName).then((cache) => {
                return cache.match(event.request).then((cachedResponse) => {
                    return (
                        cachedResponse ||
                        fetch(event.request).then((networkResponse) => {
                            cache.put(event.request, networkResponse.clone());
                            return networkResponse;
                        })
                    );
                });
            })
        );
    } else {
        event.respondWith(fetch(event.request));
    }
});
