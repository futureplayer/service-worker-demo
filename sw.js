var CACHE_NAME = 'example-v1';
var urlsToCache = [
	'https://futureplayer.github.io/service-worker-demo/',
	'https://futureplayer.github.io/service-worker-demo/index.html',
	'https://futureplayer.github.io/service-worker-demo/index.js',
	'https://farm3.staticflickr.com/2916/14632988974_b3fe4012b8.jpg',
	'https://mipcache.bdstatic.com/static/v1/mip.js'
];
var cachePromise;
self.addEventListener('install', function(event) {
	cachePromise = caches.open(CACHE_NAME);
	console.log('Opened cache');
});

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request).then(function(response) {
			// Cache hit - return response
			if (response) {
			  return response;
			}
			return fetch(event.request).then(function (response) {
				var responseToCache = response.clone();
				cachePromise.then(function(cache) {					
					if (/mip.js/.test(event.request.url)) {
						console.log(event.request.url);
						var req = new Request(event.request.url, { mode: 'no-cors' });
						cache.put(req, responseToCache);
					} else {
						var req = new Request(event.request.url);
						cache.put(req, responseToCache);
					}
				});
                return response;
			});
		})
	);
});
