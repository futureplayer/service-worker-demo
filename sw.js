var CACHE_NAME = 'example-v1';
var urlsToCache = [
  'https://futureplayer.github.io/service-worker-demo/',
  'https://futureplayer.github.io/service-worker-demo/index.html',
  'https://futureplayer.github.io/service-worker-demo/index.js',
  'https://mipcache.bdstatic.com/static/v1/mip.js',
  'https://farm3.staticflickr.com/2916/14632988974_b3fe4012b8.jpg'
];
self.addEventListener('install', function(event) {
});

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request)
			.then(function(response) {
				// Cache hit - return response
				if (response) {
				  return response;
				}
				return fetch(event.request).then(function (response) {
					var responseToCache = response.clone();
					
					caches.open(CACHE_NAME).then(function(cache) {
						console.log('Opened cache');
						if (/mip.js/.test(event.request.url)) {
							console.log(event.request.url);
							var req = new Request(event.request.url, { mode: 'no-cors' });
							cache.put(req, responseToCache);	
						} else {
							console.log(event.request.url);
							cache.put(event.request, responseToCache);
						}						
				      });
				});
			}
		)
	);
});
