var CACHE_NAME = 'example-v1';
var urlsToCache = [
  'https://futureplayer.github.io/service-worker-demo/',
  'https://futureplayer.github.io/service-worker-demo/index.html',
  'https://futureplayer.github.io/service-worker-demo/index.js'
];
self.addEventListener('install', function(event) {
	event.waitUntil(
	caches.open(CACHE_NAME)
		.then(function(cache) {
			console.log('Opened cache');
			return cache.addAll(urlsToCache);
		})
	);
});

self.addEventListener('fetch', function(event) {
	console.log(event.request.url);
	event.respondWith(
		caches.match(event.request)
			.then(function(response) {
				// Cache hit - return response
				if (response) {
				  return response;
				}
				console.log(event.request.url);
				return fetch(event.request);
			}
		)
	);
});
