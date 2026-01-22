import { TopicLayout } from '@/components/TopicLayout';

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
    />
  );
};

export default ServerComponents;