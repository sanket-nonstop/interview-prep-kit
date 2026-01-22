import { TopicLayout } from '@/components/TopicLayout';

const serverVsClientCode = `// Server vs Client Components: When to use each in Next.js

// ✅ Server Component (default in App Router)
// - Fetch data directly
// - Access backend resources
// - Keep sensitive info on server
async function ProductPage({ params }: { params: { id: string } }) {
  const product = await db.product.findUnique({
    where: { id: params.id },
  });

  return (
    <div>
      <h1>{product.name}</h1>
      <AddToCartButton productId={product.id} />
    </div>
  );
}

// ✅ Client Component (use 'use client' directive)
// - Interactive elements (onClick, onChange)
// - React hooks (useState, useEffect)
// - Browser APIs (localStorage, window)
'use client';
import { useState } from 'react';

function AddToCartButton({ productId }: { productId: string }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    await fetch('/api/cart', {
      method: 'POST',
      body: JSON.stringify({ productId }),
    });
    setLoading(false);
  };

  return (
    <button onClick={handleClick} disabled={loading}>
      {loading ? 'Adding...' : 'Add to Cart'}
    </button>
  );
}

// ✅ Composition: Server wraps Client
async function Dashboard() {
  const user = await getUser(); // Server-side data fetch
  
  return (
    <div>
      <h1>Welcome {user.name}</h1>
      <ClientSidebar user={user} /> {/* Pass data to client */}
    </div>
  );
}

// ✅ When to use Server Components:
// - Data fetching
// - Direct database access
// - API calls with secrets
// - Large dependencies (stay on server)
// - SEO-critical content

// ✅ When to use Client Components:
// - Event listeners (onClick, onChange)
// - State and lifecycle (useState, useEffect)
// - Browser-only APIs (localStorage, geolocation)
// - Custom hooks
// - Class components (legacy)

// ✅ Passing Server data to Client
async function Page() {
  const data = await fetchData(); // Server
  
  return <ClientComponent data={data} />; // Serialize and pass
}

// ❌ Common mistake: Can't pass functions
async function BadExample() {
  const handleClick = () => console.log('click'); // Function
  
  return <ClientComponent onClick={handleClick} />; // ❌ Error!
}

// ✅ Solution: Define handler in client component
'use client';
function ClientComponent() {
  const handleClick = () => console.log('click'); // ✅ Works
  return <button onClick={handleClick}>Click</button>;
}`;

const ServerVsClient = () => {
  return (
    <TopicLayout
      title="Server vs Client Components"
      route="/nextjs/patterns/server-vs-client"
      category="nextjs"
      explanation="Next.js App Router defaults to Server Components for better performance and SEO. Client Components handle interactivity. Understanding when to use each and how they compose is fundamental to Next.js architecture."
      code={serverVsClientCode}
      codeFilename="server-vs-client.tsx"
      whyItMatters="Core Next.js concept. Interviewers ask: 'When do you use client components?', 'How do they compose?', 'What can't you pass between them?' Shows understanding of React Server Components and Next.js rendering."
      mistakes={[
        "Using 'use client' everywhere: Loses server benefits. Default to server.",
        "Passing functions to client: Only serializable data (JSON) can pass.",
        "Fetching in client when server works: Slower, exposes API keys.",
        "Not understanding composition: Server can wrap client, not vice versa.",
      ]}
      practiceTask="Create a blog post page where the post content is fetched server-side, but comments section is client-side with real-time updates. Include a like button that updates optimistically."
    />
  );
};

export default ServerVsClient;