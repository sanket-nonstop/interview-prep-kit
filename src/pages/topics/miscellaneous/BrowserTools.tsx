import { TopicLayout } from '@/components/TopicLayout';

export const NetworkTab = () => (
  <TopicLayout title="Network Tab" route="/miscellaneous/browser-tools/network" category="javascript"
    explanation="Network tab shows all HTTP requests: timing, headers, payload, response. Essential for debugging API calls, performance, and caching issues."
    code={`// Key Network Tab Features

1. Request List
   - Name, Status, Type, Size, Time
   - Filter by type: XHR, JS, CSS, Img, etc.
   - Search requests

2. Request Details
   - Headers (Request & Response)
   - Preview (formatted response)
   - Response (raw data)
   - Timing (breakdown of request phases)

3. Timing Breakdown
   - Queueing: Waiting for available connection
   - Stalled: Time before request sent
   - DNS Lookup: Domain name resolution
   - Initial Connection: TCP handshake
   - SSL: TLS negotiation
   - Request Sent: Sending request
   - Waiting (TTFB): Time to first byte
   - Content Download: Receiving response

4. Throttling
   - Simulate slow 3G, fast 3G, offline
   - Test performance on slow networks

5. Preserve Log
   - Keep requests across page reloads
   - Debug redirects and navigation

// Debugging API Calls
fetch('/api/data')
  .then(res => {
    // Check Network tab:
    // - Status code (200, 404, 500?)
    // - Response headers (Content-Type?)
    // - Response body (correct data?)
    // - Timing (slow request?)
    return res.json();
  });`}
    whyItMatters="Network tab is the first place to debug API issues. Interviewers expect you to know how to diagnose slow requests, failed calls, and CORS errors."
    mistakes={['Not checking network tab when API fails', 'Ignoring timing information', 'Not using throttling to test slow networks', 'Not preserving log for redirects']}
    practiceTask="An API call takes 5 seconds. Using Network tab, how would you identify if the issue is: slow server, large payload, or network latency?" />
);

export const PerformanceTab = () => (
  <TopicLayout title="Performance Tab" route="/miscellaneous/browser-tools/performance" category="javascript"
    explanation="Performance tab records runtime performance: JavaScript execution, rendering, painting. Use it to find bottlenecks and optimize app performance."
    code={`// Performance Tab Features

1. Recording
   - Start recording
   - Interact with page
   - Stop recording
   - Analyze timeline

2. Timeline Sections
   - Network: Resource loading
   - Frames: Frame rate (60 FPS ideal)
   - Main: JavaScript execution
   - Raster: Painting operations

3. Performance Metrics
   - FCP (First Contentful Paint)
   - LCP (Largest Contentful Paint)
   - TTI (Time to Interactive)
   - TBT (Total Blocking Time)

4. Flame Chart
   - Shows function call stack
   - Identify long-running functions
   - Find performance bottlenecks

5. Performance API
performance.mark('start');
// ... code to measure ...
performance.mark('end');
performance.measure('myOperation', 'start', 'end');
console.log(performance.getEntriesByName('myOperation'));

// Core Web Vitals
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log(entry.name, entry.startTime);
  }
});
observer.observe({ entryTypes: ['paint', 'largest-contentful-paint'] });`}
    whyItMatters="Performance optimization is critical for user experience. Knowing how to profile and fix performance issues is a valuable skill."
    mistakes={['Not profiling before optimizing', 'Ignoring frame drops', 'Not understanding main thread blocking', 'Premature optimization']}
    practiceTask="Your React app is laggy. Using Performance tab, how would you identify if the issue is: expensive re-renders, large bundle size, or slow API calls?" />
);

export default { NetworkTab, PerformanceTab };
