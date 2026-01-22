import { TopicLayout } from '@/components/TopicLayout';

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
    />
  );
};

export default Throttle;