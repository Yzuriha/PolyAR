//This is the service worker with the Advanced caching

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const HTML_CACHE = "html";
const JS_CACHE = "javascript";
const STYLE_CACHE = "stylesheets";
const IMAGE_CACHE = "images";
const FONT_CACHE = "fonts";
const PATTERN = "pattern";

self.addEventListener("message", (event) => {
    if (event.data && event.data.type === "SKIP_WAITING") {
        self.skipWaiting();
    }
});

workbox.routing.registerRoute(
    new RegExp('.*\\.patt'),
    new workbox.strategies.CacheFirst({
        cacheName: PATTERN,
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 1000,
            }),
        ],
    })
);

workbox.routing.registerRoute(
    ({event}) => event.request.destination === 'document',
    new workbox.strategies.CacheFirst({
        cacheName: HTML_CACHE,
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 10,
            }),
        ],
    })
);

workbox.routing.registerRoute(
    ({event}) => event.request.destination === 'script',
    new workbox.strategies.CacheFirst({
        cacheName: JS_CACHE,
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 150,
            }),
        ],
    })
);

workbox.routing.registerRoute(
    ({event}) => event.request.destination === 'style',
    new workbox.strategies.CacheFirst({
        cacheName: STYLE_CACHE,
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 15,
            }),
        ],
    })
);

workbox.routing.registerRoute(
    ({event}) => event.request.destination === 'image',
    new workbox.strategies.CacheFirst({
        cacheName: IMAGE_CACHE,
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 150,
            }),
        ],
    })
);

workbox.routing.registerRoute(
    ({event}) => event.request.destination === 'font',
    new workbox.strategies.CacheFirst({
        cacheName: FONT_CACHE,
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 15,
            }),
        ],
    })
);