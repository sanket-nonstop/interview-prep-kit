import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const performanceCode = `<!-- HTML Performance: Optimize loading and rendering -->

<!-- ✅ Lazy loading images -->
<img 
  src="hero.jpg" 
  alt="Hero image"
  loading="eager"
  fetchpriority="high"
>

<img 
  src="below-fold.jpg" 
  alt="Below fold image"
  loading="lazy"
  width="800"
  height="600"
>

<!-- ✅ Preload critical resources -->
<link rel="preload" href="critical.css" as="style">
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="hero.jpg" as="image">

<!-- ✅ Prefetch next page resources -->
<link rel="prefetch" href="/next-page.html">
<link rel="prefetch" href="next-page-image.jpg">

<!-- ✅ DNS prefetch for external domains -->
<link rel="dns-prefetch" href="https://fonts.googleapis.com">
<link rel="dns-prefetch" href="https://api.example.com">

<!-- ✅ Preconnect for critical third-party origins -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- ✅ Script loading strategies -->
<!-- Blocking (default) - stops HTML parsing -->
<script src="blocking.js"></script>

<!-- Async - downloads in parallel, executes when ready -->
<script src="analytics.js" async></script>

<!-- Defer - downloads in parallel, executes after HTML parsing -->
<script src="app.js" defer></script>

<!-- Module with defer behavior -->
<script type="module" src="module.js"></script>

<!-- ✅ Resource hints -->
<link rel="modulepreload" href="module.js">

<!-- ✅ Responsive images for performance -->
<img 
  srcset="small.jpg 480w, medium.jpg 800w, large.jpg 1200w"
  sizes="(max-width: 600px) 480px, (max-width: 1000px) 800px, 1200px"
  src="medium.jpg"
  alt="Responsive image"
  loading="lazy"
>

<!-- ✅ Picture element for art direction -->
<picture>
  <source media="(max-width: 799px)" srcset="mobile.jpg">
  <source media="(min-width: 800px)" srcset="desktop.jpg">
  <img src="fallback.jpg" alt="Responsive image">
</picture>

<!-- ✅ Inline critical CSS -->
<style>
  /* Critical above-the-fold styles */
  body { margin: 0; font-family: system-ui; }
  .hero { height: 100vh; background: #3b82f6; }
</style>

<!-- Load non-critical CSS asynchronously -->
<link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="styles.css"></noscript>`;

const HtmlPerformance = () => {
  return (
    <TopicLayout
      title="HTML Performance"
      route="/html/performance"
      category="html"
      explanation="HTML performance optimization includes lazy loading images, preloading critical resources, prefetching next pages, using async/defer for scripts, and implementing resource hints. These techniques reduce initial load time and improve user experience."
      code={performanceCode}
      codeFilename="performance.html"
      whyItMatters="Performance directly affects user experience and SEO rankings. Interviewers test knowledge of loading strategies, resource hints, and optimization techniques. Critical for building fast, efficient web applications."
      mistakes={[
        "Loading all images eagerly - slows initial page load, use loading='lazy'.",
        "Blocking scripts in head - delays page rendering, use defer or async.",
        "Not preloading critical resources - fonts and CSS load late, causing FOUT/FOUC.",
        "Missing width/height on images - causes layout shift, hurts CLS score.",
      ]}
      practiceTask="Optimize a blog page: implement lazy loading for images, preload critical fonts and CSS, defer non-critical scripts, add resource hints for external domains, and measure performance improvements with Lighthouse."
    >
      <MultiExampleEditor
        title="🎯 Try It: HTML Performance"
        examples={[
          {
            title: "Lazy Loading",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; font-family: system-ui; }
  .hero { height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; display: flex; align-items: center; justify-content: center; text-align: center; }
  .content { padding: 40px; max-width: 800px; margin: 0 auto; }
  .image-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 40px 0; }
  .image-card { background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
  .image-card img { width: 100%; height: 200px; object-fit: cover; }
  .image-card p { padding: 15px; margin: 0; }
  .badge { display: inline-block; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: bold; margin: 5px; }
  .eager { background: #fee; color: #dc2626; }
  .lazy { background: #d1fae5; color: #065f46; }
  .info { background: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6; }
</style>
</head>
<body>
  <div class="hero">
    <div>
      <h1>⚡ Lazy Loading Demo</h1>
      <p>Scroll down to see images load on demand</p>
    </div>
  </div>

  <div class="content">
    <div class="info">
      <strong>💡 How it works:</strong><br>
      • Hero image: <code>loading="eager"</code> - loads immediately<br>
      • Below-fold images: <code>loading="lazy"</code> - loads when near viewport<br>
      • Saves bandwidth and improves initial load time
    </div>

    <h2>Above the Fold</h2>
    <div class="image-grid">
      <div class="image-card">
        <img 
          src="data:image/svg+xml,%3Csvg width='400' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='300' fill='%233b82f6'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' fill='white' font-size='24'%3EEager Load%3C/text%3E%3C/svg%3E"
          alt="Eager loaded"
          loading="eager"
          width="400"
          height="300"
        >
        <p><span class="badge eager">EAGER</span> Loads immediately</p>
      </div>
    </div>

    <h2>Below the Fold (Scroll to Load)</h2>
    <div class="image-grid">
      <div class="image-card">
        <img 
          src="data:image/svg+xml,%3Csvg width='400' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='300' fill='%2310b981'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' fill='white' font-size='24'%3ELazy 1%3C/text%3E%3C/svg%3E"
          alt="Lazy loaded 1"
          loading="lazy"
          width="400"
          height="300"
        >
        <p><span class="badge lazy">LAZY</span> Loads on scroll</p>
      </div>

      <div class="image-card">
        <img 
          src="data:image/svg+xml,%3Csvg width='400' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='300' fill='%23f59e0b'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' fill='white' font-size='24'%3ELazy 2%3C/text%3E%3C/svg%3E"
          alt="Lazy loaded 2"
          loading="lazy"
          width="400"
          height="300"
        >
        <p><span class="badge lazy">LAZY</span> Loads on scroll</p>
      </div>

      <div class="image-card">
        <img 
          src="data:image/svg+xml,%3Csvg width='400' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='300' fill='%23ef4444'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' fill='white' font-size='24'%3ELazy 3%3C/text%3E%3C/svg%3E"
          alt="Lazy loaded 3"
          loading="lazy"
          width="400"
          height="300"
        >
        <p><span class="badge lazy">LAZY</span> Loads on scroll</p>
      </div>
    </div>

    <div class="info" style="background: #d1fae5; border-color: #10b981;">
      <strong>✅ Benefits:</strong><br>
      • Faster initial page load<br>
      • Reduced bandwidth usage<br>
      • Better Core Web Vitals scores<br>
      • Improved user experience
    </div>
  </div>
</body>
</html>`
          },
          {
            title: "Script Loading",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: system-ui; padding: 40px; background: #f3f4f6; }
  .container { max-width: 900px; margin: 0 auto; }
  .card { background: white; padding: 30px; border-radius: 12px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
  h2 { color: #1f2937; margin-bottom: 15px; }
  .timeline { position: relative; padding-left: 40px; }
  .timeline-item { position: relative; padding: 15px; background: #f9fafb; border-radius: 8px; margin: 10px 0; border-left: 4px solid #3b82f6; }
  .timeline-item:before { content: ''; position: absolute; left: -44px; top: 20px; width: 12px; height: 12px; border-radius: 50%; background: #3b82f6; }
  .code { background: #1f2937; color: #10b981; padding: 15px; border-radius: 6px; font-family: monospace; font-size: 14px; margin: 10px 0; }
  .comparison { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin: 20px 0; }
  .comparison-item { padding: 20px; border-radius: 8px; text-align: center; }
  .blocking { background: #fee; border: 2px solid #ef4444; }
  .async { background: #fef3c7; border: 2px solid #f59e0b; }
  .defer { background: #d1fae5; border: 2px solid #10b981; }
</style>
</head>
<body>
  <div class="container">
    <div class="card">
      <h2>📜 Script Loading Strategies</h2>
      
      <div class="comparison">
        <div class="comparison-item blocking">
          <h3>❌ Blocking</h3>
          <p>Stops HTML parsing</p>
          <div class="code">&lt;script src="app.js"&gt;</div>
        </div>
        
        <div class="comparison-item async">
          <h3>⚡ Async</h3>
          <p>Parallel download, immediate execution</p>
          <div class="code">&lt;script src="app.js" async&gt;</div>
        </div>
        
        <div class="comparison-item defer">
          <h3>✅ Defer</h3>
          <p>Parallel download, executes after parsing</p>
          <div class="code">&lt;script src="app.js" defer&gt;</div>
        </div>
      </div>
    </div>

    <div class="card">
      <h2>⏱️ Loading Timeline</h2>
      
      <h3 style="margin-top: 20px;">Blocking Script:</h3>
      <div class="timeline">
        <div class="timeline-item">1. HTML parsing starts</div>
        <div class="timeline-item" style="border-color: #ef4444;">2. ❌ Script found - STOP parsing</div>
        <div class="timeline-item" style="border-color: #ef4444;">3. Download script</div>
        <div class="timeline-item" style="border-color: #ef4444;">4. Execute script</div>
        <div class="timeline-item">5. Resume HTML parsing</div>
      </div>

      <h3 style="margin-top: 30px;">Defer Script:</h3>
      <div class="timeline">
        <div class="timeline-item">1. HTML parsing starts</div>
        <div class="timeline-item" style="border-color: #10b981;">2. ✅ Script found - continue parsing</div>
        <div class="timeline-item" style="border-color: #10b981;">3. Download script in parallel</div>
        <div class="timeline-item">4. HTML parsing completes</div>
        <div class="timeline-item" style="border-color: #10b981;">5. Execute script</div>
      </div>
    </div>

    <div class="card">
      <h2>💡 Best Practices</h2>
      <div style="background: #f9fafb; padding: 20px; border-radius: 8px;">
        <p><strong>Use defer for:</strong></p>
        <ul>
          <li>Main application scripts</li>
          <li>Scripts that need DOM access</li>
          <li>Scripts that depend on each other</li>
        </ul>
        
        <p style="margin-top: 20px;"><strong>Use async for:</strong></p>
        <ul>
          <li>Analytics scripts</li>
          <li>Ad scripts</li>
          <li>Independent third-party scripts</li>
        </ul>
      </div>
    </div>
  </div>
</body>
</html>`
          },
          {
            title: "Resource Hints",
            code: `<!DOCTYPE html>
<html>
<head>
  <!-- Resource Hints -->
  <link rel="dns-prefetch" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" as="style">
  
<style>
  body { font-family: system-ui; padding: 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; }
  .container { max-width: 900px; margin: 0 auto; }
  .card { background: white; padding: 30px; border-radius: 12px; margin-bottom: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
  h2 { color: #1f2937; margin-bottom: 20px; }
  .hint-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; }
  .hint-card { padding: 20px; border-radius: 8px; border: 2px solid #e5e7eb; }
  .hint-card h3 { margin-top: 0; color: #1f2937; }
  .dns { border-color: #3b82f6; background: #dbeafe; }
  .preconnect { border-color: #10b981; background: #d1fae5; }
  .preload { border-color: #f59e0b; background: #fef3c7; }
  .prefetch { border-color: #8b5cf6; background: #ede9fe; }
  .code { background: #1f2937; color: #10b981; padding: 10px; border-radius: 6px; font-family: monospace; font-size: 12px; margin: 10px 0; overflow-x: auto; }
  .timeline { background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0; }
  .timeline-step { padding: 10px; margin: 5px 0; background: white; border-radius: 6px; border-left: 4px solid #3b82f6; }
</style>
</head>
<body>
  <div class="container">
    <div class="card">
      <h2>🚀 Resource Hints</h2>
      
      <div class="hint-grid">
        <div class="hint-card dns">
          <h3>🔍 DNS Prefetch</h3>
          <p>Resolve domain name early</p>
          <div class="code">&lt;link rel="dns-prefetch" href="https://api.com"&gt;</div>
          <small>Saves: ~20-120ms</small>
        </div>

        <div class="hint-card preconnect">
          <h3>🔌 Preconnect</h3>
          <p>Establish connection early</p>
          <div class="code">&lt;link rel="preconnect" href="https://fonts.com"&gt;</div>
          <small>Saves: ~100-500ms</small>
        </div>

        <div class="hint-card preload">
          <h3>⚡ Preload</h3>
          <p>Load critical resources</p>
          <div class="code">&lt;link rel="preload" href="font.woff2" as="font"&gt;</div>
          <small>Priority: High</small>
        </div>

        <div class="hint-card prefetch">
          <h3>🔮 Prefetch</h3>
          <p>Load next page resources</p>
          <div class="code">&lt;link rel="prefetch" href="next.html"&gt;</div>
          <small>Priority: Low</small>
        </div>
      </div>
    </div>

    <div class="card">
      <h2>⏱️ Connection Timeline</h2>
      
      <div class="timeline">
        <h3>Without Preconnect:</h3>
        <div class="timeline-step">1. DNS Lookup (20-120ms)</div>
        <div class="timeline-step">2. TCP Handshake (50-200ms)</div>
        <div class="timeline-step">3. TLS Negotiation (50-200ms)</div>
        <div class="timeline-step">4. Request/Response</div>
        <p style="margin-top: 10px; color: #ef4444;"><strong>Total: 120-520ms overhead</strong></p>
      </div>

      <div class="timeline">
        <h3>With Preconnect:</h3>
        <div class="timeline-step" style="border-color: #10b981;">1. ✅ Already connected!</div>
        <div class="timeline-step">2. Request/Response</div>
        <p style="margin-top: 10px; color: #10b981;"><strong>Saved: 120-520ms!</strong></p>
      </div>
    </div>

    <div class="card">
      <h2>💡 Usage Guide</h2>
      <div style="background: #f9fafb; padding: 20px; border-radius: 8px;">
        <p><strong>dns-prefetch:</strong> External domains (analytics, ads)</p>
        <p><strong>preconnect:</strong> Critical third-party resources (fonts, APIs)</p>
        <p><strong>preload:</strong> Current page critical resources (fonts, CSS, hero images)</p>
        <p><strong>prefetch:</strong> Next page resources (low priority)</p>
      </div>
    </div>
  </div>
</body>
</html>`
          },
          {
            title: "Responsive Images",
            code: `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  body { font-family: system-ui; padding: 20px; background: #f3f4f6; margin: 0; }
  .container { max-width: 1200px; margin: 0 auto; }
  .card { background: white; padding: 30px; border-radius: 12px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
  h2 { color: #1f2937; margin-bottom: 15px; }
  .image-demo { margin: 20px 0; }
  .image-demo img { width: 100%; height: auto; border-radius: 8px; }
  .info { background: #dbeafe; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #3b82f6; font-size: 14px; }
  .code { background: #1f2937; color: #10b981; padding: 15px; border-radius: 6px; font-family: monospace; font-size: 12px; margin: 10px 0; overflow-x: auto; }
  .comparison { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0; }
  .comparison-item { padding: 20px; border-radius: 8px; }
  .bad { background: #fee; border: 2px solid #ef4444; }
  .good { background: #d1fae5; border: 2px solid #10b981; }
</style>
</head>
<body>
  <div class="container">
    <div class="card">
      <h2>📱 Responsive Images with srcset</h2>
      
      <div class="image-demo">
        <img 
          srcset="
            data:image/svg+xml,%3Csvg width='480' height='320' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='480' height='320' fill='%233b82f6'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' fill='white' font-size='24'%3ESmall 480w%3C/text%3E%3C/svg%3E 480w,
            data:image/svg+xml,%3Csvg width='800' height='533' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='800' height='533' fill='%2310b981'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' fill='white' font-size='32'%3EMedium 800w%3C/text%3E%3C/svg%3E 800w,
            data:image/svg+xml,%3Csvg width='1200' height='800' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='1200' height='800' fill='%23f59e0b'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' fill='white' font-size='48'%3ELarge 1200w%3C/text%3E%3C/svg%3E 1200w
          "
          sizes="(max-width: 600px) 480px, (max-width: 1000px) 800px, 1200px"
          src="data:image/svg+xml,%3Csvg width='800' height='533' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='800' height='533' fill='%2310b981'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' fill='white' font-size='32'%3EMedium%3C/text%3E%3C/svg%3E"
          alt="Responsive image"
          loading="lazy"
        >
      </div>

      <div class="info">
        <strong>💡 How it works:</strong><br>
        Browser automatically selects the best image based on screen size and pixel density.<br>
        Resize your window to see different images load!
      </div>

      <div class="code">
&lt;img 
  srcset="small.jpg 480w, medium.jpg 800w, large.jpg 1200w"
  sizes="(max-width: 600px) 480px, (max-width: 1000px) 800px, 1200px"
  src="medium.jpg"
  alt="Responsive"
  loading="lazy"
&gt;</div>
    </div>

    <div class="card">
      <h2>🎨 Picture Element (Art Direction)</h2>
      
      <picture>
        <source media="(max-width: 799px)" srcset="data:image/svg+xml,%3Csvg width='400' height='600' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='600' fill='%23ef4444'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' fill='white' font-size='24'%3EMobile Portrait%3C/text%3E%3C/svg%3E">
        <source media="(min-width: 800px)" srcset="data:image/svg+xml,%3Csvg width='1200' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='1200' height='400' fill='%238b5cf6'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' fill='white' font-size='32'%3EDesktop Landscape%3C/text%3E%3C/svg%3E">
        <img src="data:image/svg+xml,%3Csvg width='800' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='800' height='400' fill='%236b7280'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' fill='white' font-size='24'%3EFallback%3C/text%3E%3C/svg%3E" alt="Art directed image" style="width: 100%; height: auto; border-radius: 8px;">
      </picture>

      <div class="info">
        <strong>💡 Art Direction:</strong><br>
        Different images for different screen sizes (not just scaled versions).<br>
        Mobile gets portrait, desktop gets landscape!
      </div>
    </div>

    <div class="card">
      <h2>⚖️ Comparison</h2>
      
      <div class="comparison">
        <div class="comparison-item bad">
          <h3>❌ Without Optimization</h3>
          <p>• Loads 1200px image on mobile</p>
          <p>• Wastes 80% of bandwidth</p>
          <p>• Slow load time</p>
          <p>• Poor mobile experience</p>
        </div>

        <div class="comparison-item good">
          <h3>✅ With srcset</h3>
          <p>• Loads 480px image on mobile</p>
          <p>• Saves 80% bandwidth</p>
          <p>• Fast load time</p>
          <p>• Great mobile experience</p>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`
          }
        ]}
      />
    </TopicLayout>
  );
};

export default HtmlPerformance;
