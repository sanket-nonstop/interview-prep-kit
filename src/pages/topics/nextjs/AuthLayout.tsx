import { TopicLayout } from '@/components/TopicLayout';

const authLayoutCode = `// Auth Layout: Shared authentication UI patterns in Next.js

// ✅ Root layout with auth provider (app/layout.tsx)
import { SessionProvider } from 'next-auth/react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}

// ✅ Auth layout with conditional rendering (app/(auth)/layout.tsx)
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Your App</h1>
        </div>
        {children}
      </div>
    </div>
  );
}

// ✅ Protected dashboard layout (app/(dashboard)/layout.tsx)
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

export default async function DashboardLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const session = await getServerSession();
  
  if (!session) {
    redirect('/login');
  }

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-900 text-white">
        <nav className="p-4">
          <a href="/dashboard">Dashboard</a>
          <a href="/profile">Profile</a>
        </nav>
      </aside>
      <main className="flex-1 overflow-auto p-8">
        {children}
      </main>
    </div>
  );
}

// ✅ Client-side auth check component
'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return session ? <>{children}</> : null;
}`;

const AuthLayout = () => {
  return (
    <TopicLayout
      title="Auth Layout Patterns"
      route="/nextjs/patterns/auth-layout"
      category="nextjs"
      explanation="Authentication layouts in Next.js use route groups and nested layouts to create shared UI for auth flows. Server-side session checks in layouts provide security, while client components handle interactive auth states."
      code={authLayoutCode}
      codeFilename="auth-layout.tsx"
      whyItMatters="Every production app needs authentication. Interviewers ask: 'How do you protect routes?', 'Server vs client auth checks?', 'Layout composition patterns?' Shows understanding of Next.js architecture and security."
      mistakes={[
        "Client-only auth checks: Can be bypassed. Always verify on server.",
        "Not using route groups: (auth) and (dashboard) organize layouts cleanly.",
        "Blocking entire page load: Show loading states while checking auth.",
        "Missing redirect after login: Poor UX if user stays on login page.",
      ]}
      practiceTask="Create a multi-step onboarding layout that checks if user completed profile setup. If not, redirect to /onboarding. Use server-side session check and show progress indicator."
    />
  );
};

export default AuthLayout;