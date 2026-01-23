import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const throttleCode = `// Throttle: Limit execution to once per time period

// ✅ Production throttle implementation
function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ✅ Advanced throttle with leading/trailing options
function advancedThrottle<T extends (...args: any[]) => any>(
  func: T,
  limit: number,
  options: { leading?: boolean; trailing?: boolean } = {}
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null;
  let previous = 0;
  
  return (...args: Parameters<T>) => {
    const now = Date.now();
    
    if (!previous && !options.leading) previous = now;
    
    const remaining = limit - (now - previous);
    
    if (remaining <= 0 || remaining > limit) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func(...args);
    } else if (!timeout && options.trailing) {
      timeout = setTimeout(() => {
        previous = options.leading ? 0 : Date.now();
        timeout = null;
        func(...args);
      }, remaining);
    }
  };
}

// ✅ Scroll event throttling
const handleScroll = throttle(() => {
  const scrollPercent = (window.scrollY / 
    (document.body.scrollHeight - window.innerHeight)) * 100;
  
  updateScrollProgress(scrollPercent);
}, 16); // ~60fps

window.addEventListener('scroll', handleScroll);

// ✅ API rate limiting with throttle
class APIClient {
  private throttledRequest = throttle(
    (url: string, options: RequestInit) => fetch(url, options),
    1000 // Max 1 request per second
  );
  
  async get(url: string) {
    return this.throttledRequest(url, { method: 'GET' });
  }
}`;

const Throttle = () => {
  return (
    <TopicLayout
      title="Throttle Pattern"
      route="/javascript/patterns/throttle"
      category="javascript"
      explanation="Throttle limits function execution to once per time period, ensuring consistent intervals. Unlike debounce which waits for quiet periods, throttle executes at regular intervals during continuous events."
      code={throttleCode}
      codeFilename="throttle.ts"
      whyItMatters="Critical for performance in scroll handlers, mouse move events, and API rate limiting. Interviewers ask: 'Difference between throttle and debounce?' and 'When would you use each?' Shows understanding of event optimization."
      mistakes={[
        "Confusing with debounce: Throttle = regular intervals, debounce = wait for quiet.",
        "Wrong interval timing: Too frequent = performance issues, too slow = choppy UX.",
        "Not considering leading/trailing: Advanced throttle needs both options.",
        "Memory leaks: Not clearing timeouts properly in cleanup.",
      ]}
      practiceTask="Implement a throttled infinite scroll loader that checks if user is near bottom of page and loads more content. Should throttle to maximum once per 100ms and handle cleanup."
    >
      <MultiExampleEditor
        title="🎯 Try It: Throttle Pattern"
        examples={[
          {
            title: "Scroll Progress Bar",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; font-family: system-ui; background: #0f172a; color: #e2e8f0; }
  .progress-bar { position: fixed; top: 0; left: 0; height: 4px; background: linear-gradient(90deg, #3b82f6, #10b981); transition: width 0.1s; z-index: 1000; }
  .stats { position: fixed; top: 20px; right: 20px; background: rgba(30, 41, 59, 0.9); padding: 20px; border-radius: 12px; backdrop-filter: blur(10px); }
  .stat { margin: 10px 0; }
  .stat-value { font-size: 32px; font-weight: bold; color: #3b82f6; }
  .stat-label { font-size: 12px; opacity: 0.7; }
  .content { padding: 40px; max-width: 800px; margin: 0 auto; }
  .section { min-height: 400px; padding: 40px; margin: 20px 0; background: #1e293b; border-radius: 12px; }
</style>
</head>
<body>
  <div class="progress-bar" id="progress"></div>
  <div class="stats">
    <div class="stat">
      <div class="stat-value" id="scrollCount">0</div>
      <div class="stat-label">Scroll Events</div>
    </div>
    <div class="stat">
      <div class="stat-value" id="updateCount">0</div>
      <div class="stat-label">Updates (Throttled)</div>
    </div>
  </div>
  <div class="content">
    <h1>📊 Throttle Scroll Demo</h1>
    <p>Scroll down to see throttling in action (100ms interval)</p>
    <div class="section"><h2>Section 1</h2><p>Keep scrolling...</p></div>
    <div class="section"><h2>Section 2</h2><p>Notice the progress bar updates smoothly</p></div>
    <div class="section"><h2>Section 3</h2><p>But scroll events are throttled!</p></div>
    <div class="section"><h2>Section 4</h2><p>Efficient performance ✅</p></div>
  </div>
  
  <script>
    let scrollCount = 0;
    let updateCount = 0;
    let throttleTimer = null;
    let isThrottled = false;
    
    window.addEventListener('scroll', () => {
      scrollCount++;
      document.getElementById('scrollCount').textContent = scrollCount;
      
      // Throttle: only update if not throttled
      if (!isThrottled) {
        updateProgress();
        isThrottled = true;
        setTimeout(() => { isThrottled = false; }, 100);
      }
    });
    
    function updateProgress() {
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      document.getElementById('progress').style.width = scrollPercent + '%';
      updateCount++;
      document.getElementById('updateCount').textContent = updateCount;
    }
  </script>
</body>
</html>`
          },
          {
            title: "Mouse Move Tracker",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; min-height: 100vh; overflow: hidden; }
  .tracker { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 40px; border-radius: 16px; }
  .coords { font-size: 48px; font-weight: bold; color: #fbbf24; margin: 20px 0; }
  .stats { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 30px; }
  .stat { background: rgba(255,255,255,0.2); padding: 15px; border-radius: 8px; }
  .stat-value { font-size: 32px; font-weight: bold; }
  .cursor { position: fixed; width: 20px; height: 20px; background: #fbbf24; border-radius: 50%; pointer-events: none; transform: translate(-50%, -50%); transition: all 0.1s; }
</style>
</head>
<body>
  <div class="cursor" id="cursor"></div>
  <div class="tracker">
    <h2>🕹️ Mouse Move Throttle</h2>
    <div class="coords" id="coords">Move your mouse!</div>
    <div class="stats">
      <div class="stat">
        <div class="stat-value" id="moveCount">0</div>
        <div>Move Events</div>
      </div>
      <div class="stat">
        <div class="stat-value" id="throttledCount">0</div>
        <div>Throttled (50ms)</div>
      </div>
    </div>
  </div>
  
  <script>
    let moveCount = 0;
    let throttledCount = 0;
    let isThrottled = false;
    
    document.addEventListener('mousemove', (e) => {
      moveCount++;
      document.getElementById('moveCount').textContent = moveCount;
      
      // Always update cursor (smooth)
      document.getElementById('cursor').style.left = e.clientX + 'px';
      document.getElementById('cursor').style.top = e.clientY + 'px';
      
      // Throttle coordinate display
      if (!isThrottled) {
        updateCoords(e.clientX, e.clientY);
        isThrottled = true;
        setTimeout(() => { isThrottled = false; }, 50);
      }
    });
    
    function updateCoords(x, y) {
      document.getElementById('coords').textContent = \`X: \${x}, Y: \${y}\`;
      throttledCount++;
      document.getElementById('throttledCount').textContent = throttledCount;
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

export default Throttle;