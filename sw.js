var CACHE_NAME = 'example-v1';
var urlsToCache = [
  'https://futureplayer.github.io/service-worker-demo/',
  'https://futureplayer.github.io/service-worker-demo/index.html',
  'https://futureplayer.github.io/service-worker-demo/index.js',
  'https://mipcache.bdstatic.com/static/v1/mip.js',
  'https://farm3.staticflickr.com/2916/14632988974_b3fe4012b8.jpg'
];
self.addEventListener('install', function(event) {
	event.waitUntil(
	caches.open(CACHE_NAME)
		.then(function(cache) {
			console.log('Opened cache');
			return cache.addAll(urlsToCache.map(function(urlToPrefetch) {
				if (/mip.js/.test(urlToPrefetch)) {
					return new Request(urlToPrefetch, { mode: 'no-cors' });
				}
				else {
					return new Request(urlToPrefetch);
				}			  
			})).then(function() {
			  console.log('All resources have been fetched and cached.');
			});
		})
	);
});

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request)
			.then(function(response) {
				// Cache hit - return response
				if (response) {
				  return response;
				}
				return fetch(event.request);
			}
		)
	);
});
