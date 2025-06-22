# service-worker.jsを作成
cat > service-worker.js << 'EOF'
const CACHE_NAME = 'tsum-game-v1.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
];

// Service Worker インストール
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('キャッシュを開きました');
        return cache.addAll(urlsToCache);
      })
  );
});

// キャッシュからのレスポンス
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // キャッシュにある場合はそれを返す
        if (response) {
          return response;
        }
        
        // ネットワークからフェッチ
        return fetch(event.request).then((response) => {
          // レスポンスが有効でない場合は何もしない
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // レスポンスをクローンしてキャッシュに保存
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      }
    )
  );
});

// 古いキャッシュの削除
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('古いキャッシュを削除:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// プッシュ通知対応（将来の機能拡張用）
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'ツムゲームからのお知らせ',
    icon: '/icon-192.png',
    badge: '/icon-72.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'ゲームを開く',
        icon: '/icon-192.png'
      },
      {
        action: 'close',
        title: '閉じる'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('ツムゲーム', options)
  );
});

// 通知クリック時の処理
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});
EOF
