import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

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
    >
      <MultiExampleEditor
        title="🎯 Try It: API Routes"
        examples={[
          {
            title: "GET & POST API",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: #0f172a; color: #e2e8f0; }
  .card { background: #1e293b; padding: 30px; border-radius: 12px; max-width: 600px; margin: 0 auto; }
  button { background: #3b82f6; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; margin: 5px; font-weight: 600; }
  .response { background: #334155; padding: 15px; border-radius: 8px; margin: 15px 0; font-family: 'Courier New'; font-size: 14px; }
  .success { border-left: 4px solid #10b981; }
  .error { border-left: 4px solid #ef4444; }
</style>
</head>
<body>
  <div class="card">
    <h2>🚀 API Routes Demo</h2>
    <button onclick="getUsers()">GET /api/users</button>
    <button onclick="createUser()">POST /api/users</button>
    <div id="output"></div>
  </div>
  
  <script>
    async function getUsers() {
      const output = document.getElementById('output');
      output.innerHTML = '<div class="response">Loading...</div>';
      
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users?_limit=3');
        const data = await response.json();
        output.innerHTML = \`<div class="response success">
          <strong>GET /api/users</strong><br>
          Status: \${response.status}<br><br>
          \${JSON.stringify(data, null, 2)}
        </div>\`;
      } catch (error) {
        output.innerHTML = \`<div class="response error">Error: \${error.message}</div>\`;
      }
    }
    
    async function createUser() {
      const output = document.getElementById('output');
      output.innerHTML = '<div class="response">Creating...</div>';
      
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: 'John Doe', email: 'john@example.com' })
        });
        const data = await response.json();
        output.innerHTML = \`<div class="response success">
          <strong>POST /api/users</strong><br>
          Status: \${response.status}<br><br>
          \${JSON.stringify(data, null, 2)}
        </div>\`;
      } catch (error) {
        output.innerHTML = \`<div class="response error">Error: \${error.message}</div>\`;
      }
    }
  </script>
</body>
</html>`
          },
          {
            title: "HTTP Methods",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; min-height: 100vh; }
  .card { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 30px; border-radius: 12px; max-width: 600px; margin: 0 auto; }
  .methods { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
  .method { background: rgba(255,255,255,0.2); padding: 20px; border-radius: 8px; text-align: center; }
  .method-name { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
  .get { border-left: 4px solid #10b981; }
  .post { border-left: 4px solid #3b82f6; }
  .put { border-left: 4px solid #f59e0b; }
  .delete { border-left: 4px solid #ef4444; }
</style>
</head>
<body>
  <div class="card">
    <h2>🔧 HTTP Methods</h2>
    <div class="methods">
      <div class="method get">
        <div class="method-name">GET</div>
        <div>Read data</div>
      </div>
      <div class="method post">
        <div class="method-name">POST</div>
        <div>Create data</div>
      </div>
      <div class="method put">
        <div class="method-name">PUT</div>
        <div>Update data</div>
      </div>
      <div class="method delete">
        <div class="method-name">DELETE</div>
        <div>Delete data</div>
      </div>
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

export default ApiRoutes;