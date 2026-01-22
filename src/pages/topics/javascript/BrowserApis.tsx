import { TopicLayout } from '@/components/TopicLayout';

const browserApisCode = `// Browser APIs: Modern web platform capabilities

// ✅ Intersection Observer - Lazy loading and scroll effects
const useIntersectionObserver = (
  elementRef: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);
    
    observer.observe(element);
    
    return () => observer.disconnect();
  }, [elementRef, options]);
  
  return isIntersecting;
};

const LazyImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const isVisible = useIntersectionObserver(imgRef, { threshold: 0.1 });
  
  return (
    <img
      ref={imgRef}
      src={isVisible ? src : undefined}
      alt={alt}
      loading="lazy"
    />
  );
};

// ✅ Geolocation API
const useGeolocation = () => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported');
      return;
    }
    
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLoading(false);
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };
  
  return { location, error, loading, getCurrentLocation };
};

// ✅ Web Workers for heavy computations
const useWebWorker = (workerScript: string) => {
  const [worker, setWorker] = useState<Worker | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const newWorker = new Worker(workerScript);
    setWorker(newWorker);
    
    newWorker.onmessage = (event) => {
      setResult(event.data);
      setLoading(false);
    };
    
    return () => newWorker.terminate();
  }, [workerScript]);
  
  const postMessage = (data: any) => {
    if (worker) {
      setLoading(true);
      worker.postMessage(data);
    }
  };
  
  return { postMessage, result, loading };
};

// ✅ Notification API
const useNotifications = () => {
  const [permission, setPermission] = useState(Notification.permission);
  
  const requestPermission = async () => {
    const result = await Notification.requestPermission();
    setPermission(result);
    return result;
  };
  
  const showNotification = (title: string, options?: NotificationOptions) => {
    if (permission === 'granted') {
      return new Notification(title, options);
    } else if (permission === 'default') {
      requestPermission().then((result) => {
        if (result === 'granted') {
          new Notification(title, options);
        }
      });
    }
  };
  
  return { permission, requestPermission, showNotification };
};

// ✅ File API - File reading and processing
const useFileReader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [content, setContent] = useState<string | ArrayBuffer | null>(null);
  const [loading, setLoading] = useState(false);
  
  const readFile = (file: File, readAs: 'text' | 'dataURL' | 'arrayBuffer' = 'text') => {
    setFile(file);
    setLoading(true);
    
    const reader = new FileReader();
    
    reader.onload = (event) => {
      setContent(event.target?.result || null);
      setLoading(false);
    };
    
    reader.onerror = () => {
      setLoading(false);
    };
    
    switch (readAs) {
      case 'text':
        reader.readAsText(file);
        break;
      case 'dataURL':
        reader.readAsDataURL(file);
        break;
      case 'arrayBuffer':
        reader.readAsArrayBuffer(file);
        break;
    }
  };
  
  return { file, content, loading, readFile };
};

// ✅ Clipboard API
const useClipboard = () => {
  const [copied, setCopied] = useState(false);
  
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };
  
  const readFromClipboard = async () => {
    try {
      return await navigator.clipboard.readText();
    } catch (error) {
      console.error('Failed to read clipboard:', error);
      return null;
    }
  };
  
  return { copied, copyToClipboard, readFromClipboard };
};

// ✅ Battery API
const useBattery = () => {
  const [battery, setBattery] = useState<{
    level: number;
    charging: boolean;
    chargingTime: number;
    dischargingTime: number;
  } | null>(null);
  
  useEffect(() => {
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        const updateBattery = () => {
          setBattery({
            level: battery.level,
            charging: battery.charging,
            chargingTime: battery.chargingTime,
            dischargingTime: battery.dischargingTime,
          });
        };
        
        updateBattery();
        
        battery.addEventListener('chargingchange', updateBattery);
        battery.addEventListener('levelchange', updateBattery);
        
        return () => {
          battery.removeEventListener('chargingchange', updateBattery);
          battery.removeEventListener('levelchange', updateBattery);
        };
      });
    }
  }, []);
  
  return battery;
};

// ✅ Component using multiple APIs
const ModernWebApp: React.FC = () => {
  const { location, getCurrentLocation } = useGeolocation();
  const { showNotification } = useNotifications();
  const { copyToClipboard, copied } = useClipboard();
  const battery = useBattery();
  
  const handleShareLocation = () => {
    if (location) {
      const locationText = \`Lat: \${location.latitude}, Lng: \${location.longitude}\`;
      copyToClipboard(locationText);
      showNotification('Location copied!', {
        body: 'Your location has been copied to clipboard',
        icon: '/icon.png',
      });
    }
  };
  
  return (
    <div>
      <button onClick={getCurrentLocation}>Get Location</button>
      {location && (
        <div>
          <p>Location: {location.latitude}, {location.longitude}</p>
          <button onClick={handleShareLocation}>
            {copied ? 'Copied!' : 'Share Location'}
          </button>
        </div>
      )}
      {battery && (
        <div>Battery: {Math.round(battery.level * 100)}%</div>
      )}
    </div>
  );
};`;

const BrowserApis = () => {
  return (
    <TopicLayout
      title="Browser APIs"
      route="/javascript/browser-apis"
      category="javascript"
      explanation="Modern browsers provide powerful APIs for enhanced user experiences: Intersection Observer for lazy loading, Geolocation for location services, Web Workers for background processing, Notification API for alerts, File API for file handling, and Clipboard API for copy/paste functionality."
      code={browserApisCode}
      codeFilename="browser-apis.ts"
      whyItMatters="Browser APIs enable rich, native-like web experiences. Interviewers test knowledge of modern web capabilities, performance optimization techniques, and progressive enhancement. Essential for building competitive web applications."
      mistakes={[
        "Not checking API availability - older browsers may not support all APIs.",
        "Not handling permissions properly - many APIs require user consent.",
        "Blocking the main thread - use Web Workers for heavy computations.",
        "Not providing fallbacks - graceful degradation for unsupported features.",
      ]}
      practiceTask="Build a photo gallery with lazy loading (Intersection Observer), geolocation tagging, offline support (Service Worker), and file upload with drag-and-drop (File API)."
    />
  );
};

export default BrowserApis;