import { TopicLayout } from '@/components/TopicLayout';

const coreWebVitalsCode = `// Core Web Vitals: Performance metrics that affect SEO rankings

// ✅ LCP (Largest Contentful Paint) - Target: < 2.5s
// Optimize largest element (hero image, heading)
import Image from 'next/image';

export default function HomePage() {
  return (
    <div>
      {/* Priority loading for above-the-fold hero */}
      <Image
        src="/hero.jpg"
        alt="Frontend development workspace"
        width={1200}
        height={600}
        priority // Loads immediately, improves LCP
        quality={85}
      />
      <h1 className="text-5xl font-bold">Frontend Interview Prep</h1>
    </div>
  );
}

// ✅ FID/INP (First Input Delay / Interaction to Next Paint) - Target: < 100ms
// Reduce JavaScript execution time
'use client';
import { useState, useTransition } from 'react';

export default function SearchInput() {
  const [query, setQuery] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleSearch = (value: string) => {
    setQuery(value);
    
    // Mark expensive updates as non-urgent
    startTransition(() => {
      performExpensiveSearch(value);
    });
  };

  return (
    <input
      type="text"
      value={query}
      onChange={(e) => handleSearch(e.target.value)}
      placeholder="Search topics..."
    />
  );
}

// ✅ CLS (Cumulative Layout Shift) - Target: < 0.1
// Prevent layout shifts with proper sizing
export default function ArticlePage() {
  return (
    <article>
      {/* Always specify image dimensions */}
      <Image
        src="/article-image.jpg"
        alt="Article illustration"
        width={800}
        height={600} // Prevents layout shift when image loads
      />

      {/* Reserve space for dynamic content */}
      <div className="min-h-[200px]">
        <Suspense fallback={<Skeleton className="h-[200px]" />}>
          <DynamicContent />
        </Suspense>
      </div>

      {/* Font loading without layout shift */}
      <style jsx global>{\`
        @font-face {
          font-family: 'CustomFont';
          src: url('/fonts/custom.woff2') format('woff2');
          font-display: swap; // Show fallback font immediately
        }
      \`}</style>
    </article>
  );
}

// ✅ Code splitting to reduce bundle size
import dynamic from 'next/dynamic';

// Lazy load heavy components
const HeavyChart = dynamic(() => import('@/components/HeavyChart'), {
  loading: () => <div>Loading chart...</div>,
  ssr: false, // Don't render on server if not needed
});

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <HeavyChart /> {/* Only loads when needed */}
    </div>
  );
}

// ✅ Monitoring Core Web Vitals
'use client';
import { useReportWebVitals } from 'next/web-vitals';

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Send to analytics
    console.log(metric);
    
    // metric.name: 'FCP' | 'LCP' | 'CLS' | 'FID' | 'TTFB' | 'INP'
    // metric.value: number
    
    if (metric.name === 'LCP' && metric.value > 2500) {
      console.warn('LCP is too slow:', metric.value);
    }
  });

  return null;
}

// ✅ Next.js config for performance
// next.config.js
module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'], // Modern formats
    deviceSizes: [640, 750, 828, 1080, 1200],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};`;

const CoreWebVitals = () => {
  return (
    <TopicLayout
      title="Core Web Vitals"
      route="/seo/technical/core-web-vitals"
      category="javascript"
      explanation="Core Web Vitals are Google's performance metrics: LCP (loading speed), FID/INP (interactivity), CLS (visual stability). They directly affect search rankings. Next.js provides tools to optimize all three: Image component, code splitting, Suspense."
      code={coreWebVitalsCode}
      codeFilename="core-web-vitals.tsx"
      whyItMatters="Google uses Core Web Vitals as ranking factors. Slow sites rank lower. Interviewers ask: 'What are Core Web Vitals?', 'How do you optimize LCP?', 'What causes layout shift?' Shows performance optimization skills."
      mistakes={[
        "No image dimensions: Causes CLS when images load and push content down.",
        "Blocking JavaScript: Large bundles delay FID/INP. Use code splitting.",
        "Not using priority: Hero images load late, hurting LCP. Use priority prop.",
        "Ignoring font loading: Custom fonts cause layout shift. Use font-display: swap.",
      ]}
      practiceTask="Run Lighthouse audit on your project. Fix LCP by adding priority to hero image, reduce CLS by adding dimensions to all images, improve INP by code-splitting heavy components. Target: all green scores."
    />
  );
};

export default CoreWebVitals;