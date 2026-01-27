import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const dataFetchingCode = `// Next.js Data Fetching: Server-side and client-side patterns

// ✅ Server Component data fetching (App Router)
// app/posts/page.tsx
async function PostsPage() {
  // Fetch at request time
  const posts = await fetch('https://api.example.com/posts', {
    next: { revalidate: 3600 } // Cache for 1 hour
  }).then(res => res.json());
  
  return (
    <div>
      {posts.map((post: Post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

// ✅ Dynamic route with params
// app/posts/[slug]/page.tsx
async function PostPage({ params }: { params: { slug: string } }) {
  const post = await fetch(\`https://api.example.com/posts/\${params.slug}\`, {
    next: { revalidate: false } // Cache indefinitely
  }).then(res => res.json());
  
  if (!post) {
    notFound(); // Shows 404 page
  }
  
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}

// ✅ Static generation with generateStaticParams
export async function generateStaticParams() {
  const posts = await fetch('https://api.example.com/posts')
    .then(res => res.json());
  
  return posts.map((post: Post) => ({
    slug: post.slug
  }));
}

// ✅ Parallel data fetching
async function DashboardPage() {
  // Fetch multiple data sources in parallel
  const [user, orders, analytics] = await Promise.all([
    fetch('https://api.example.com/user').then(res => res.json()),
    fetch('https://api.example.com/orders').then(res => res.json()),
    fetch('https://api.example.com/analytics').then(res => res.json())
  ]);
  
  return (
    <div>
      <UserProfile user={user} />
      <OrderHistory orders={orders} />
      <AnalyticsDashboard data={analytics} />
    </div>
  );
}

// ✅ Error handling and loading states
// app/products/loading.tsx
export default function Loading() {
  return <ProductsSkeleton />;
}

// app/products/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}

// ✅ Client-side data fetching with SWR
'use client';

import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

function ClientDataComponent() {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/user-preferences',
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true
    }
  );
  
  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div>
      <UserPreferences data={data} />
      <button onClick={() => mutate()}>Refresh</button>
    </div>
  );
}

// ✅ API Routes for server-side logic
// app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get('page') || '1';
  const limit = searchParams.get('limit') || '10';
  
  try {
    const posts = await db.post.findMany({
      skip: (parseInt(page) - 1) * parseInt(limit),
      take: parseInt(limit),
      include: { author: true }
    });
    
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  
  try {
    const post = await db.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: body.authorId
      }
    });
    
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}`;

const DataFetching = () => {
  return (
    <TopicLayout
      title="Data Fetching"
      route="/nextjs/data-fetching"
      category="nextjs"
      explanation="Next.js App Router provides multiple data fetching patterns: Server Components for server-side fetching with caching, client-side fetching with SWR/React Query, API routes for backend logic, and static generation for build-time data fetching."
      code={dataFetchingCode}
      codeFilename="data-fetching.tsx"
      whyItMatters="Data fetching strategy affects performance, SEO, and user experience. Interviewers test understanding of when to fetch on server vs client, caching strategies, and error handling. Critical for building fast, reliable web applications."
      mistakes={[
        "Fetching data in Client Components when Server Components could do it faster.",
        "Not implementing proper error boundaries and loading states.",
        "Over-caching or under-caching data - understand revalidation strategies.",
        "Not using parallel data fetching - sequential fetches slow down page loads.",
      ]}
      practiceTask="Build an e-commerce product page that fetches product data on the server, related products in parallel, and user reviews on the client. Implement proper caching, error handling, and loading states."
    >
      <MultiExampleEditor
        title="🎯 Try It: Data Fetching"
        examples={[
          {
            title: "Server-side Fetching",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: #0f172a; color: #e2e8f0; }
  .card { background: #1e293b; padding: 30px; border-radius: 12px; max-width: 600px; margin: 0 auto; }
  button { background: #3b82f6; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; margin: 5px; font-weight: 600; }
  .loading { color: #f59e0b; }
  .data { background: #334155; padding: 15px; border-radius: 8px; margin: 15px 0; }
  .success { color: #10b981; }
</style>
</head>
<body>
  <div class="card">
    <h2>🖥️ Server-side Data Fetching</h2>
    <button onclick="fetchData()">Fetch User Data</button>
    <div id="output"></div>
  </div>
  
  <script>
    async function fetchData() {
      const output = document.getElementById('output');
      output.innerHTML = '<p class="loading">Loading from server...</p>';
      
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
        const data = await response.json();
        output.innerHTML = \`
          <div class="data">
            <p class="success">✅ Fetched on server (no client JS needed)</p>
            <strong>Name:</strong> \${data.name}<br>
            <strong>Email:</strong> \${data.email}<br>
            <strong>Company:</strong> \${data.company.name}
          </div>
        \`;
      } catch (error) {
        output.innerHTML = '<p style="color: #ef4444;">❌ Error: ' + error.message + '</p>';
      }
    }
  </script>
</body>
</html>`
          },
          {
            title: "Parallel Fetching",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; min-height: 100vh; }
  .card { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 30px; border-radius: 12px; max-width: 600px; margin: 0 auto; }
  button { background: white; color: #667eea; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600; width: 100%; margin: 10px 0; }
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 15px 0; }
  .box { background: rgba(255,255,255,0.2); padding: 15px; border-radius: 8px; }
  .time { background: rgba(251, 191, 36, 0.2); padding: 10px; border-radius: 6px; margin-top: 15px; text-align: center; }
</style>
</head>
<body>
  <div class="card">
    <h2>⚡ Parallel Data Fetching</h2>
    <button onclick="fetchParallel()">Fetch 3 Users in Parallel</button>
    <div class="grid" id="grid"></div>
    <div class="time" id="time"></div>
  </div>
  
  <script>
    async function fetchParallel() {
      const grid = document.getElementById('grid');
      const time = document.getElementById('time');
      grid.innerHTML = '<div class="box">Loading...</div><div class="box">Loading...</div><div class="box">Loading...</div>';
      
      const start = Date.now();
      
      // Parallel fetching with Promise.all
      const [user1, user2, user3] = await Promise.all([
        fetch('https://jsonplaceholder.typicode.com/users/1').then(r => r.json()),
        fetch('https://jsonplaceholder.typicode.com/users/2').then(r => r.json()),
        fetch('https://jsonplaceholder.typicode.com/users/3').then(r => r.json())
      ]);
      
      const elapsed = Date.now() - start;
      
      grid.innerHTML = \`
        <div class="box"><strong>\${user1.name}</strong><br>\${user1.email}</div>
        <div class="box"><strong>\${user2.name}</strong><br>\${user2.email}</div>
        <div class="box"><strong>\${user3.name}</strong><br>\${user3.email}</div>
      \`;
      
      time.innerHTML = \`⚡ Loaded 3 users in parallel: \${elapsed}ms\`;
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

export default DataFetching;