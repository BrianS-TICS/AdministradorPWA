const nombreCache = 'apv-v3';

const archivos = [
    '/',
    '/index.html',
    '/error.html',
    '/css/bootstrap.css',
    '/css/styles.css',
    '/js/app.js',
    '/js/apv.js',
    '/manifest.json',
];

// Cuando se instala el service worker
self.addEventListener('install', e => {
    console.log('Instalado el service worker');

    e.waitUntil(
        caches.open(nombreCache)
            .then(cache => {
                console.log('cacheando');
                cache.addAll(archivos);
            })
    )
});

// Activarlo
self.addEventListener('activate', e => {
    console.log('Se activa service worker');
    e.waitUntil(
        caches.keys()
            .then( keys => {
                return Promise.all(
                    keys
                        .filter(key => key !== nombreCache)
                        .map( key => caches.delete(key)) // Borra los demas
                )
            } )
    )
});

// Evento fetch para descargar archivos estaticos
self.addEventListener('fetch', e => {
    console.log('Fetch', e)

    e.respondWith(
        caches
            .match(e.request)
            // Si cache responde se presenta error.html
            .then(cacheResponse => (cacheResponse ? cacheResponse : caches.match('error.html')))

    )
})
