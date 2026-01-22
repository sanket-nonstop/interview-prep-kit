import { TopicLayout } from '@/components/TopicLayout';

const appRouterCode = `// Next.js App Router: File-based routing with React Server Components

// 📁 Folder structure = Routes
// app/
// ├── layout.tsx        → Root layout (wraps all pages)
// ├── page.tsx          → Home route (/)
// ├── loading.tsx       → Loading UI (Suspense boundary)
// ├── error.tsx         → Error boundary
// ├── not-found.tsx     → 404 page
// ├── products/
// │   ├── page.tsx      → /products
// │   └── [id]/
// │       └── page.tsx  → /products/123 (dynamic route)
// └── (marketing)/      → Route group (no URL impact)
//     ├── about/
//     └── contact/

// ✅ Root layout (required in app/)
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

// ✅ Page component (Server Component by default)
// app/products/[id]/page.tsx
interface ProductPageProps {
  params: { id: string };
  searchParams: { sort?: string };
}

export default async function ProductPage({
  params,
  searchParams,
}: ProductPageProps) {
  // This runs on the server - safe for DB calls
  const product = await db.products.findUnique({
    where: { id: params.id },
  });

  return (
    <article>
      <h1>{product.name}</h1>
      <AddToCart id={params.id} /> {/* Client component */}
    </article>
  );
}

// ✅ Generate static params for SSG
export async function generateStaticParams() {
  const products = await db.products.findMany();
  return products.map((p) => ({ id: p.id }));
}`;

const AppRouter = () => {
  return (
    <TopicLayout
      title="App Router Basics"
      route="/nextjs/app-router"
      category="nextjs"
      explanation="Next.js 13+ App Router uses file-system based routing where folders become URL segments. Special files (page.tsx, layout.tsx, loading.tsx) define behavior. Server Components are the default—client code must be explicitly marked."
      code={appRouterCode}
      codeFilename="app-router-structure.tsx"
      whyItMatters="The App Router is a paradigm shift from Pages Router. Interviewers test: Do you understand Server vs Client Components? Can you structure routes properly? Do you know when to use route groups, parallel routes, intercepting routes?"
      mistakes={[
        "Everything 'use client': Only add it when you need hooks, events, or browser APIs.",
        "Fetching in client components: Prefer Server Components for data fetching. Less JavaScript.",
        "Ignoring loading.tsx: Free Suspense boundaries. Use them for better UX.",
        "Wrong file names: page.tsx not Page.tsx. layout.tsx not Layout.tsx. Case matters.",
      ]}
      practiceTask="Create a dashboard layout with nested routes: /dashboard (overview), /dashboard/analytics, /dashboard/settings. Add a sidebar that persists across all dashboard routes using a layout.tsx."
    />
  );
};

export default AppRouter;
