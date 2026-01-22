import { TopicLayout } from '@/components/TopicLayout';

const protectedRoutesCode = `// Protected Routes: Server and client-side route protection

// ✅ Server Component protection (app/dashboard/page.tsx)
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

export default async function DashboardPage() {
  const session = await getServerSession();
  
  if (!session) {
    redirect('/login');
  }

  return <div>Welcome {session.user.name}</div>;
}

// ✅ Middleware protection (middleware.ts)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const isAuthPage = request.nextUrl.pathname.startsWith('/login');
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/dashboard');

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/signup'],
};

// ✅ Role-based access control
export async function checkRole(requiredRole: string) {
  const session = await getServerSession();
  
  if (!session) {
    redirect('/login');
  }

  if (session.user.role !== requiredRole) {
    redirect('/unauthorized');
  }
}

// Admin-only page
export default async function AdminPage() {
  await checkRole('admin');
  return <div>Admin Dashboard</div>;
}

// ✅ Client-side protection with HOC
'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function withAuth<P extends object>(
  Component: React.ComponentType<P>
) {
  return function ProtectedComponent(props: P) {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === 'loading') {
      return <div>Loading...</div>;
    }

    if (!session) {
      router.push('/login');
      return null;
    }

    return <Component {...props} />;
  };
}

// Usage
const ProtectedPage = withAuth(function Page() {
  return <div>Protected Content</div>;
});`;

const ProtectedRoutes = () => {
  return (
    <TopicLayout
      title="Protected Routes"
      route="/nextjs/patterns/protected-routes"
      category="nextjs"
      explanation="Protected routes in Next.js combine middleware, server components, and client hooks to secure pages. Middleware runs before rendering, server components check auth during SSR, and client components handle interactive states."
      code={protectedRoutesCode}
      codeFilename="protected-routes.tsx"
      whyItMatters="Security is critical. Interviewers test: 'How do you protect routes?', 'Middleware vs server component checks?', 'Role-based access control?' Shows understanding of Next.js security layers and authentication flow."
      mistakes={[
        "Only client-side checks: Users can bypass by disabling JavaScript.",
        "Not using middleware: Checking auth in every page is repetitive.",
        "Missing role checks: Authentication ≠ authorization. Check permissions.",
        "Redirecting in client components: Causes flash of protected content.",
      ]}
      practiceTask="Create a protected admin panel with middleware that checks authentication, then a server component that verifies admin role. Include a client component that shows user info and logout button."
    />
  );
};

export default ProtectedRoutes;