import { TopicLayout } from '@/components/TopicLayout';

const routingCode = `// Next.js Dynamic Routing: File-based routing with parameters

// ✅ Basic dynamic routes
// app/blog/[slug]/page.tsx
interface Props {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function BlogPost({ params, searchParams }: Props) {
  const post = await fetch(\`https://api.example.com/posts/\${params.slug}\`)
    .then(res => res.json());
  
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}

// ✅ Nested dynamic routes
// app/blog/[category]/[slug]/page.tsx
interface NestedProps {
  params: { category: string; slug: string };
}

export default async function CategoryPost({ params }: NestedProps) {
  const { category, slug } = params;
  
  const post = await fetch(
    \`https://api.example.com/categories/\${category}/posts/\${slug}\`
  ).then(res => res.json());
  
  return (
    <div>
      <nav>
        <Link href="/blog">Blog</Link> → 
        <Link href={\`/blog/\${category}\`}>{category}</Link> → 
        {post.title}
      </nav>
      <article>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
      </article>
    </div>
  );
}

// ✅ Catch-all routes
// app/docs/[...slug]/page.tsx
interface CatchAllProps {
  params: { slug: string[] };
}

export default async function DocsPage({ params }: CatchAllProps) {
  const path = params.slug.join('/');
  
  // Handle different path depths
  if (params.slug.length === 1) {
    // /docs/getting-started
    return <CategoryPage category={params.slug[0]} />;
  } else if (params.slug.length === 2) {
    // /docs/getting-started/installation
    return <ArticlePage category={params.slug[0]} article={params.slug[1]} />;
  }
  
  return <NotFound />;
}

// ✅ Optional catch-all routes
// app/shop/[[...slug]]/page.tsx
interface OptionalCatchAllProps {
  params: { slug?: string[] };
}

export default async function ShopPage({ params }: OptionalCatchAllProps) {
  const segments = params.slug || [];
  
  if (segments.length === 0) {
    // /shop - show all products
    return <AllProducts />;
  } else if (segments.length === 1) {
    // /shop/electronics
    return <CategoryProducts category={segments[0]} />;
  } else if (segments.length === 2) {
    // /shop/electronics/laptops
    return <SubcategoryProducts 
      category={segments[0]} 
      subcategory={segments[1]} 
    />;
  }
  
  return <NotFound />;
}

// ✅ generateStaticParams for static generation
// app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = await fetch('https://api.example.com/posts')
    .then(res => res.json());
  
  return posts.map((post: any) => ({
    slug: post.slug,
  }));
}

// For nested routes
// app/blog/[category]/[slug]/page.tsx
export async function generateStaticParams() {
  const categories = await fetch('https://api.example.com/categories')
    .then(res => res.json());
  
  const params = [];
  
  for (const category of categories) {
    const posts = await fetch(\`https://api.example.com/categories/\${category.slug}/posts\`)
      .then(res => res.json());
    
    for (const post of posts) {
      params.push({
        category: category.slug,
        slug: post.slug,
      });
    }
  }
  
  return params;
}

// ✅ Route groups (organization only)
// app/(marketing)/about/page.tsx
// app/(marketing)/contact/page.tsx
// app/(dashboard)/analytics/page.tsx
// app/(dashboard)/settings/page.tsx

// These don't affect the URL structure, just organization

// ✅ Parallel routes
// app/dashboard/@analytics/page.tsx
// app/dashboard/@team/page.tsx
// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
  analytics,
  team,
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  team: React.ReactNode;
}) {
  return (
    <div className="dashboard">
      <div className="main">{children}</div>
      <div className="sidebar">
        <div className="analytics">{analytics}</div>
        <div className="team">{team}</div>
      </div>
    </div>
  );
}

// ✅ Intercepting routes
// app/photos/[id]/page.tsx - Full page
// app/@modal/(.)photos/[id]/page.tsx - Modal overlay

export default function PhotoModal({ params }: { params: { id: string } }) {
  const router = useRouter();
  
  return (
    <div className="modal-overlay" onClick={() => router.back()}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <Image src={\`/photos/\${params.id}.jpg\`} alt="Photo" />
        <button onClick={() => router.back()}>Close</button>
      </div>
    </div>
  );
}

// ✅ Route handlers (API routes)
// app/api/posts/[id]/route.ts
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const post = await getPost(params.id);
  
  if (!post) {
    return new Response('Post not found', { status: 404 });
  }
  
  return Response.json(post);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const updatedPost = await updatePost(params.id, body);
  
  return Response.json(updatedPost);
}

// ✅ Programmatic navigation
'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

const NavigationExample: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const handleNavigation = () => {
    // Different navigation methods
    router.push('/dashboard');
    router.replace('/login');
    router.back();
    router.forward();
    router.refresh();
  };
  
  // Create query string
  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    return params.toString();
  };
  
  return (
    <div>
      <p>Current path: {pathname}</p>
      <button 
        onClick={() => 
          router.push(pathname + '?' + createQueryString('sort', 'name'))
        }
      >
        Sort by name
      </button>
    </div>
  );
};`;

const Routing = () => {
  return (
    <TopicLayout
      title="Dynamic Routing"
      route="/nextjs/routing"
      category="nextjs"
      explanation="Next.js uses file-based routing with dynamic segments. Square brackets create dynamic routes, catch-all routes handle multiple segments, and route groups organize files. Use generateStaticParams for static generation and route handlers for API endpoints."
      code={routingCode}
      codeFilename="routing.tsx"
      whyItMatters="Dynamic routing is fundamental to building scalable web applications. Interviewers test understanding of Next.js routing patterns, static generation, and navigation. Essential for creating SEO-friendly, performant applications with complex URL structures."
      mistakes={[
        "Not implementing generateStaticParams for dynamic routes - missing static generation benefits.",
        "Overusing catch-all routes - can make routing logic complex and hard to debug.",
        "Not handling edge cases in dynamic routes - can cause 404 errors or crashes.",
        "Mixing client and server navigation incorrectly - can break user experience.",
      ]}
      practiceTask="Build a multi-level e-commerce site with category/subcategory/product routing, implement search with query parameters, add breadcrumb navigation, and optimize with static generation."
    />
  );
};

export default Routing;