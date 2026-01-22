import { TopicLayout } from '@/components/TopicLayout';

const apiRoutesCode = `// Next.js API Routes: Full-stack development with App Router

// ✅ Basic API route
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const users = await db.user.findMany({
      select: { id: true, name: true, email: true }
    });
    
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validation
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }
    
    const user = await db.user.create({
      data: {
        name: body.name,
        email: body.email,
      }
    });
    
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}

// ✅ Dynamic API routes
// app/api/users/[id]/route.ts
interface RouteParams {
  params: { id: string };
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const user = await db.user.findUnique({
      where: { id: params.id }
    });
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const body = await request.json();
    
    const user = await db.user.update({
      where: { id: params.id },
      data: body
    });
    
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    await db.user.delete({
      where: { id: params.id }
    });
    
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}

// ✅ Authentication middleware
// app/api/protected/route.ts
import { verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return NextResponse.json(
      { error: 'Authorization token required' },
      { status: 401 }
    );
  }
  
  try {
    const user = await verifyToken(token);
    
    // Protected data
    const data = await getProtectedData(user.id);
    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 401 }
    );
  }
}

// ✅ File upload handling
// app/api/upload/route.ts
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }
    
    // Validate file type and size
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type' },
        { status: 400 }
      );
    }
    
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      return NextResponse.json(
        { error: 'File too large' },
        { status: 400 }
      );
    }
    
    // Save file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const filename = \`\${Date.now()}-\${file.name}\`;
    const filepath = path.join(process.cwd(), 'public/uploads', filename);
    
    await fs.writeFile(filepath, buffer);
    
    return NextResponse.json({
      message: 'File uploaded successfully',
      filename,
      url: \`/uploads/\${filename}\`
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
}

// ✅ Search API with query parameters
// app/api/search/route.ts
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  const query = searchParams.get('q') || '';
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const category = searchParams.get('category');
  
  try {
    const where = {
      ...(query && {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { content: { contains: query, mode: 'insensitive' } }
        ]
      }),
      ...(category && { category })
    };
    
    const [posts, total] = await Promise.all([
      db.post.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      db.post.count({ where })
    ]);
    
    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    );
  }
}

// ✅ Webhook handling
// app/api/webhooks/stripe/route.ts
import { stripe } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');
  
  if (!signature) {
    return NextResponse.json(
      { error: 'Missing signature' },
      { status: 400 }
    );
  }
  
  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        await handlePaymentSuccess(paymentIntent);
        break;
        
      case 'customer.subscription.created':
        const subscription = event.data.object;
        await handleSubscriptionCreated(subscription);
        break;
        
      default:
        console.log(\`Unhandled event type: \${event.type}\`);
    }
    
    return NextResponse.json({ received: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Webhook error' },
      { status: 400 }
    );
  }
}

// ✅ Rate limiting
// app/api/limited/route.ts
import { rateLimit } from '@/lib/rate-limit';

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500, // Max 500 users per minute
});

export async function GET(request: NextRequest) {
  try {
    await limiter.check(request, 10, 'CACHE_TOKEN'); // 10 requests per minute
    
    return NextResponse.json({ message: 'Success' });
  } catch {
    return NextResponse.json(
      { error: 'Rate limit exceeded' },
      { status: 429 }
    );
  }
}`;

const ApiRoutes = () => {
  return (
    <TopicLayout
      title="API Routes"
      route="/nextjs/api-routes"
      category="nextjs"
      explanation="Next.js API Routes enable full-stack development with serverless functions. Handle HTTP methods, dynamic routes, authentication, file uploads, and webhooks. Use NextRequest/NextResponse for modern request handling with proper error handling and validation."
      code={apiRoutesCode}
      codeFilename="api-routes.ts"
      whyItMatters="API Routes are essential for building full-stack applications. Interviewers test understanding of HTTP methods, authentication, error handling, and security best practices. Critical for creating complete web applications without separate backend services."
      mistakes={[
        "Not validating input data - can lead to security vulnerabilities and crashes.",
        "Missing proper error handling - exposes internal errors to clients.",
        "Not implementing authentication/authorization - creates security risks.",
        "Ignoring rate limiting - APIs can be abused and overwhelmed.",
      ]}
      practiceTask="Build a complete CRUD API for a blog with authentication, file upload for images, search functionality, and webhook integration for payment processing. Include proper validation and error handling."
    />
  );
};

export default ApiRoutes;