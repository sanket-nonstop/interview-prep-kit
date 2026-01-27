import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

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
    >
      <MultiExampleEditor
        title="🎯 Try It: App Router"
        examples={[
          {
            title: "File Structure",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: 'Courier New', monospace; background: #0f172a; color: #e2e8f0; }
  .tree { background: #1e293b; padding: 30px; border-radius: 12px; max-width: 600px; margin: 0 auto; }
  .folder { color: #3b82f6; margin: 5px 0; }
  .file { color: #10b981; margin: 5px 0; padding-left: 20px; }
  .special { color: #f59e0b; }
  .comment { color: #6b7280; font-style: italic; }
</style>
</head>
<body>
  <div class="tree">
    <h2 style="font-family: system-ui;">📁 App Router Structure</h2>
    <div class="folder">📂 app/</div>
    <div class="file special">├─ layout.tsx <span class="comment">// Root layout</span></div>
    <div class="file special">├─ page.tsx <span class="comment">// Home route (/)</span></div>
    <div class="file">├─ loading.tsx <span class="comment">// Loading UI</span></div>
    <div class="file">├─ error.tsx <span class="comment">// Error boundary</span></div>
    <div class="folder">├─ 📂 products/</div>
    <div class="file special">│   ├─ page.tsx <span class="comment">// /products</span></div>
    <div class="folder">│   └─ 📂 [id]/</div>
    <div class="file special">│       └─ page.tsx <span class="comment">// /products/123</span></div>
    <div class="folder">└─ 📂 (marketing)/ <span class="comment">// Route group</span></div>
    <div class="folder">    ├─ 📂 about/</div>
    <div class="folder">    └─ 📂 contact/</div>
  </div>
</body>
</html>`
          },
          {
            title: "Layout Example",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; font-family: system-ui; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; min-height: 100vh; }
  .layout { max-width: 1200px; margin: 0 auto; padding: 20px; }
  .header { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 20px; border-radius: 12px; margin-bottom: 20px; }
  .content { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 30px; border-radius: 12px; min-height: 400px; }
  nav a { color: white; text-decoration: none; margin: 0 15px; font-weight: 600; }
  nav a:hover { text-decoration: underline; }
</style>
</head>
<body>
  <div class="layout">
    <div class="header">
      <h1>My App</h1>
      <nav>
        <a href="/">Home</a>
        <a href="/products">Products</a>
        <a href="/about">About</a>
      </nav>
    </div>
    <div class="content">
      <h2>Page Content Goes Here</h2>
      <p>This layout wraps all pages in the app directory</p>
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

export default AppRouter;
