import { TopicLayout } from '@/components/TopicLayout';

const pwaCode = `// PWA Fundamentals: Progressive Web App development

// ✅ Service Worker registration
// public/sw.js
const CACHE_NAME = 'app-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});

// ✅ Service Worker registration in React
const useServiceWorker = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  
  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered:', registration);
          
          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  setUpdateAvailable(true);
                }
              });
            }
          });
        })
        .catch((error) => {
          console.log('SW registration failed:', error);
        });
    }
    
    // Online/offline detection
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  const updateApp = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then((registration) => {
        if (registration?.waiting) {
          registration.waiting.postMessage({ type: 'SKIP_WAITING' });
          window.location.reload();
        }
      });
    }
  };
  
  return { isOnline, updateAvailable, updateApp };
};

// ✅ Web App Manifest (public/manifest.json)
const manifest = {
  "name": "Interview Practice",
  "short_name": "Interview Ready",
  "description": "Master interviews with hands-on practice",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#007bff",
  "background_color": "#ffffff",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable any"
    }
  ],
  "categories": ["education", "productivity"],
  "screenshots": [
    {
      "src": "/screenshots/desktop.png",
      "sizes": "1280x720",
      "type": "image/png",
      "form_factor": "wide"
    }
  ]
};

// ✅ Install prompt handling
const useInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };
    
    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setIsInstallable(false);
      console.log('PWA was installed');
    };
    
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);
  
  const promptInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(\`User response: \${outcome}\`);
      setDeferredPrompt(null);
      setIsInstallable(false);
    }
  };
  
  return { isInstallable, promptInstall };
};

// ✅ Background sync for offline actions
const useBackgroundSync = () => {
  const [pendingActions, setPendingActions] = useState<any[]>([]);
  
  const addPendingAction = (action: any) => {
    setPendingActions(prev => [...prev, action]);
    
    // Store in IndexedDB for persistence
    if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
      navigator.serviceWorker.ready.then((registration) => {
        return registration.sync.register('background-sync');
      });
    }
  };
  
  const processPendingActions = async () => {
    for (const action of pendingActions) {
      try {
        await fetch(action.url, action.options);
        setPendingActions(prev => prev.filter(a => a.id !== action.id));
      } catch (error) {
        console.error('Failed to process action:', error);
      }
    }
  };
  
  return { pendingActions, addPendingAction, processPendingActions };
};

// ✅ Push notifications
const usePushNotifications = () => {
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  
  const subscribeToPush = async () => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      try {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: process.env.REACT_APP_VAPID_PUBLIC_KEY,
        });
        
        setSubscription(subscription);
        
        // Send subscription to server
        await fetch('/api/push-subscription', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(subscription),
        });
      } catch (error) {
        console.error('Push subscription failed:', error);
      }
    }
  };
  
  return { subscription, subscribeToPush };
};

// ✅ PWA-enabled React component
const PWAApp: React.FC = () => {
  const { isOnline, updateAvailable, updateApp } = useServiceWorker();
  const { isInstallable, promptInstall } = useInstallPrompt();
  const { subscribeToPush } = usePushNotifications();
  
  return (
    <div className="pwa-app">
      {/* Offline indicator */}
      {!isOnline && (
        <div className="offline-banner">
          You're offline. Some features may not be available.
        </div>
      )}
      
      {/* Update available */}
      {updateAvailable && (
        <div className="update-banner">
          <p>A new version is available!</p>
          <button onClick={updateApp}>Update Now</button>
        </div>
      )}
      
      {/* Install prompt */}
      {isInstallable && (
        <div className="install-banner">
          <p>Install this app for a better experience!</p>
          <button onClick={promptInstall}>Install</button>
        </div>
      )}
      
      {/* Enable notifications */}
      <button onClick={subscribeToPush}>
        Enable Notifications
      </button>
      
      <main>
        {/* App content */}
      </main>
    </div>
  );
};`;

const PWA = () => {
  return (
    <TopicLayout
      title="PWA Fundamentals"
      route="/javascript/pwa"
      category="javascript"
      explanation="Progressive Web Apps combine web and native app features using Service Workers for offline functionality, Web App Manifest for installation, push notifications, background sync, and responsive design. PWAs provide app-like experiences on the web."
      code={pwaCode}
      codeFilename="pwa.tsx"
      whyItMatters="PWAs are the future of web applications, providing native app experiences without app stores. Interviewers test understanding of Service Workers, caching strategies, offline functionality, and installation flows. Essential for modern web development."
      mistakes={[
        "Not implementing proper caching strategies - poor offline experience.",
        "Ignoring update mechanisms - users stuck with old versions.",
        "Not handling offline states gracefully - broken user experience.",
        "Missing proper manifest configuration - installation issues.",
      ]}
      practiceTask="Convert a React app to a PWA with offline functionality, install prompts, push notifications, background sync for form submissions, and proper caching strategies."
    />
  );
};

export default PWA;