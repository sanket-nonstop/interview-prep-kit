import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const serverComponentsCode = `// Next.js Server Components: React components that run on the server

// ✅ Server Component (default in app directory)
// app/dashboard/page.tsx
async function DashboardPage() {
  // This runs on the server - no client bundle impact
  const user = await fetch('https://api.example.com/user', {
    headers: { Authorization: \`Bearer \${process.env.API_TOKEN}\` }
  }).then(res => res.json());
  
  const stats = await fetch('https://api.example.com/stats').then(res => res.json());
  
  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <ServerStats stats={stats} />
      <ClientInteractiveChart data={stats.chartData} />
    </div>
  );
}

// ✅ Server Component with database access
import { db } from '@/lib/database';

async function PostsList() {
  // Direct database access - no API route needed
  const posts = await db.post.findMany({
    where: { published: true },
    include: { author: true },
    orderBy: { createdAt: 'desc' }
  });
  
  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>By {post.author.name}</p>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}

// ✅ Client Component (interactive)
'use client';

import { useState } from 'react';

function ClientInteractiveChart({ data }: { data: any[] }) {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  
  return (
    <div>
      <select 
        value={selectedPeriod} 
        onChange={(e) => setSelectedPeriod(e.target.value)}
      >
        <option value="week">This Week</option>
        <option value="month">This Month</option>
      </select>
      <Chart data={data} period={selectedPeriod} />
    </div>
  );
}

// ✅ Mixed Server + Client pattern
// app/products/page.tsx
async function ProductsPage() {
  const categories = await fetch('https://api.example.com/categories')
    .then(res => res.json());
  
  return (
    <div>
      <h1>Products</h1>
      {/* Server Component */}
      <CategoryList categories={categories} />
      {/* Client Component for interactivity */}
      <ProductFilters />
      <ProductGrid />
    </div>
  );
}

// ✅ Streaming with Suspense
import { Suspense } from 'react';

function DashboardWithStreaming() {
  return (
    <div>
      <h1>Dashboard</h1>
      
      {/* Fast content loads immediately */}
      <QuickStats />
      
      {/* Slow content streams in */}
      <Suspense fallback={<ChartSkeleton />}>
        <SlowChart />
      </Suspense>
      
      <Suspense fallback={<TableSkeleton />}>
        <SlowDataTable />
      </Suspense>
    </div>
  );
}

async function SlowChart() {
  // Simulate slow data fetch
  await new Promise(resolve => setTimeout(resolve, 2000));
  const data = await fetch('https://api.example.com/slow-chart-data')
    .then(res => res.json());
  
  return <Chart data={data} />;
}

// ✅ Server Actions (form handling)
// app/contact/page.tsx
import { redirect } from 'next/navigation';

async function submitContact(formData: FormData) {
  'use server';
  
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;
  
  // Server-side processing
  await db.contact.create({
    data: { email, message }
  });
  
  // Send email notification
  await sendEmail({
    to: 'admin@example.com',
    subject: 'New Contact Form',
    body: message
  });
  
  redirect('/contact/thank-you');
}

function ContactForm() {
  return (
    <form action={submitContact}>
      <input name="email" type="email" required />
      <textarea name="message" required />
      <button type="submit">Send Message</button>
    </form>
  );
}`;

const ServerComponents = () => {
  return (
    <TopicLayout
      title="Server Components"
      route="/nextjs/server-components"
      category="nextjs"
      explanation="Server Components run on the server and don't ship JavaScript to the client. They can access databases directly, use server-only APIs, and reduce bundle size. Use 'use client' directive for interactive components that need browser APIs or state."
      code={serverComponentsCode}
      codeFilename="server-components.tsx"
      whyItMatters="Server Components are the future of React and Next.js. Interviewers test understanding of server vs client boundaries, performance benefits, and when to use each. Essential for building fast, SEO-friendly applications with optimal user experience."
      mistakes={[
        "Using 'use client' everywhere - defeats the purpose of Server Components.",
        "Trying to use browser APIs in Server Components - they run on the server.",
        "Not understanding the component tree boundary - client components can't import server components.",
        "Fetching data in Client Components when Server Components could do it more efficiently.",
      ]}
      practiceTask="Build a blog with Server Components for static content (posts, categories) and Client Components for interactive features (search, comments, likes). Implement streaming for slow data and server actions for form submissions."
    >
      <MultiExampleEditor
        title="🎯 Try It: Server Components"
        examples={[
          {
            title: "Server vs Client Components",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: #0f172a; color: #e2e8f0; }
  .comparison { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; max-width: 1000px; margin: 0 auto; }
  .box { background: #1e293b; padding: 20px; border-radius: 12px; }
  .server { border: 3px solid #10b981; }
  .client { border: 3px solid #3b82f6; }
  h3 { margin-top: 0; }
  .feature { background: #334155; padding: 10px; margin: 8px 0; border-radius: 6px; font-size: 14px; }
  .yes { color: #10b981; }
  .no { color: #ef4444; }
</style>
</head>
<body>
  <h2 style="text-align: center;">⚡ Server vs Client Components</h2>
  <div class="comparison">
    <div class="box server">
      <h3>🖥️ Server Components</h3>
      <div class="feature"><span class="yes">✅</span> Direct database access</div>
      <div class="feature"><span class="yes">✅</span> Access server-only APIs</div>
      <div class="feature"><span class="yes">✅</span> Zero client JS bundle</div>
      <div class="feature"><span class="yes">✅</span> SEO friendly</div>
      <div class="feature"><span class="no">❌</span> No useState/useEffect</div>
      <div class="feature"><span class="no">❌</span> No browser APIs</div>
      <div class="feature"><span class="no">❌</span> No event handlers</div>
    </div>
    
    <div class="box client">
      <h3>💻 Client Components</h3>
      <div class="feature"><span class="yes">✅</span> useState/useEffect</div>
      <div class="feature"><span class="yes">✅</span> Event handlers</div>
      <div class="feature"><span class="yes">✅</span> Browser APIs</div>
      <div class="feature"><span class="yes">✅</span> Interactive UI</div>
      <div class="feature"><span class="no">❌</span> Adds to JS bundle</div>
      <div class="feature"><span class="no">❌</span> No direct DB access</div>
      <div class="feature"><span class="no">❌</span> No server-only APIs</div>
    </div>
  </div>
</body>
</html>`
          },
          {
            title: "'use client' Directive",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; min-height: 100vh; }
  .card { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 30px; border-radius: 12px; max-width: 600px; margin: 0 auto; }
  .code { background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px; margin: 15px 0; font-family: 'Courier New'; font-size: 14px; }
  .highlight { color: #fbbf24; font-weight: bold; }
  button { background: white; color: #667eea; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600; margin: 10px 5px; }
  .counter { font-size: 48px; font-weight: bold; text-align: center; margin: 20px 0; }
</style>
</head>
<body>
  <div class="card">
    <h2>🎯 Client Component Demo</h2>
    <div class="code">
      <span class="highlight">'use client'</span><br><br>
      function Counter() {<br>
      &nbsp;&nbsp;const [count, setCount] = useState(0);<br>
      &nbsp;&nbsp;return ...<br>
      }
    </div>
    <div class="counter" id="count">0</div>
    <button onclick="increment()">Increment</button>
    <button onclick="decrement()">Decrement</button>
    <p style="font-size: 14px; opacity: 0.8;">✅ This needs 'use client' because it uses useState and event handlers</p>
  </div>
  
  <script>
    let count = 0;
    function increment() {
      count++;
      document.getElementById('count').textContent = count;
    }
    function decrement() {
      count--;
      document.getElementById('count').textContent = count;
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

export default ServerComponents;