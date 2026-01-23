import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

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
    >
      <MultiExampleEditor
        title="🎯 Try It: Browser APIs"
        examples={[
          {
            title: "Geolocation API",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; min-height: 100vh; }
  .card { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 30px; border-radius: 12px; max-width: 500px; margin: 0 auto; text-align: center; }
  button { background: white; color: #667eea; border: none; padding: 15px 30px; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 16px; margin: 10px; }
  button:hover { transform: scale(1.05); }
  .location { background: rgba(255,255,255,0.2); padding: 20px; border-radius: 8px; margin: 20px 0; font-size: 18px; }
  .loading { color: #fbbf24; }
</style>
</head>
<body>
  <div class="card">
    <h2>🌍 Geolocation API</h2>
    <button onclick="getLocation()">Get My Location</button>
    <div id="output"></div>
  </div>
  
  <script>
    function getLocation() {
      const output = document.getElementById('output');
      
      if (!navigator.geolocation) {
        output.innerHTML = '<div class="location">❌ Geolocation not supported</div>';
        return;
      }
      
      output.innerHTML = '<div class="loading">⏳ Getting location...</div>';
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude.toFixed(4);
          const lng = position.coords.longitude.toFixed(4);
          output.innerHTML = \`
            <div class="location">
              <strong>✅ Location Found!</strong><br><br>
              📍 Latitude: \${lat}<br>
              📍 Longitude: \${lng}<br>
              🎯 Accuracy: \${position.coords.accuracy.toFixed(0)}m
            </div>
          \`;
        },
        (error) => {
          output.innerHTML = \`<div class="location">❌ Error: \${error.message}</div>\`;
        }
      );
    }
  </script>
</body>
</html>`
          },
          {
            title: "Clipboard API",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: #0f172a; color: #e2e8f0; }
  .container { max-width: 500px; margin: 0 auto; }
  textarea { width: 100%; padding: 15px; border: 2px solid #3b82f6; border-radius: 8px; font-size: 16px; font-family: inherit; background: #1e293b; color: white; min-height: 150px; }
  button { background: #3b82f6; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; margin: 5px; font-weight: 600; }
  button:hover { background: #2563eb; }
  .success { background: #10b981; }
  .success:hover { background: #059669; }
  .message { background: #1e293b; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #10b981; }
</style>
</head>
<body>
  <div class="container">
    <h2>📋 Clipboard API</h2>
    <textarea id="text" placeholder="Type something...">Hello, World!</textarea>
    <br>
    <button onclick="copyText()">Copy to Clipboard</button>
    <button class="success" onclick="pasteText()">Paste from Clipboard</button>
    <div id="message"></div>
  </div>
  
  <script>
    async function copyText() {
      const text = document.getElementById('text').value;
      try {
        await navigator.clipboard.writeText(text);
        showMessage('✅ Copied to clipboard!');
      } catch (err) {
        showMessage('❌ Failed to copy: ' + err.message);
      }
    }
    
    async function pasteText() {
      try {
        const text = await navigator.clipboard.readText();
        document.getElementById('text').value = text;
        showMessage('✅ Pasted from clipboard!');
      } catch (err) {
        showMessage('❌ Failed to paste: ' + err.message);
      }
    }
    
    function showMessage(msg) {
      const div = document.getElementById('message');
      div.innerHTML = '<div class="message">' + msg + '</div>';
      setTimeout(() => div.innerHTML = '', 3000);
    }
  </script>
</body>
</html>`
          }
        ]}
      />
    </TopicLayout>
  );
};

export default BrowserApis;