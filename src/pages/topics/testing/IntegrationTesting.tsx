import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const integrationTestingCode = `// Integration Testing: Testing how multiple parts work together

// ✅ Testing API Integration
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

// Mock server setup
const server = setupServer(
  http.get('/api/users/:id', ({ params }) => {
    if (params.id === '1') {
      return HttpResponse.json({ id: '1', name: 'John', email: 'john@test.com' });
    }
    return new HttpResponse(null, { status: 404 });
  }),
  
  http.post('/api/users', async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({ id: '2', ...body }, { status: 201 });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// ✅ Testing Service Layer
class UserService {
  async getUser(id: string): Promise<User | null> {
    const res = await fetch(\`/api/users/\${id}\`);
    if (!res.ok) return null;
    return res.json();
  }
  
  async createUser(userData: CreateUserDTO): Promise<User> {
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return res.json();
  }
}

describe('UserService Integration', () => {
  const userService = new UserService();

  it('should fetch existing user', async () => {
    const user = await userService.getUser('1');
    
    expect(user).toEqual({
      id: '1',
      name: 'John',
      email: 'john@test.com'
    });
  });

  it('should return null for non-existent user', async () => {
    const user = await userService.getUser('999');
    expect(user).toBeNull();
  });

  it('should create new user', async () => {
    const newUser = await userService.createUser({
      name: 'Jane',
      email: 'jane@test.com'
    });
    
    expect(newUser).toMatchObject({
      name: 'Jane',
      email: 'jane@test.com'
    });
    expect(newUser.id).toBeDefined();
  });
});

// ✅ Testing with Database (using test database)
describe('User Repository Integration', () => {
  let db: TestDatabase;

  beforeAll(async () => {
    db = await TestDatabase.create();
    await db.migrate();
  });

  afterAll(async () => {
    await db.cleanup();
  });

  beforeEach(async () => {
    await db.seed(); // Reset to known state
  });

  it('should save and retrieve user', async () => {
    const userRepo = new UserRepository(db);
    
    const savedUser = await userRepo.create({
      name: 'Test User',
      email: 'test@example.com'
    });
    
    const foundUser = await userRepo.findById(savedUser.id);
    
    expect(foundUser).toMatchObject({
      name: 'Test User',
      email: 'test@example.com'
    });
  });

  it('should handle unique email constraint', async () => {
    const userRepo = new UserRepository(db);
    
    await userRepo.create({ name: 'User1', email: 'same@email.com' });
    
    await expect(
      userRepo.create({ name: 'User2', email: 'same@email.com' })
    ).rejects.toThrow('Email already exists');
  });
});

// ✅ Testing Component + Hook Integration
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

function UserProfile({ userId }: { userId: string }) {
  const { data: user, isLoading, error } = useUser(userId);
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}

describe('UserProfile Component Integration', () => {
  it('loads and displays user data', async () => {
    render(<UserProfile userId="1" />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText('John')).toBeInTheDocument();
    });
    
    expect(screen.getByText('john@test.com')).toBeInTheDocument();
  });

  it('shows error for invalid user', async () => {
    server.use(
      http.get('/api/users/999', () => {
        return new HttpResponse(null, { status: 404 });
      })
    );
    
    render(<UserProfile userId="999" />);
    
    await waitFor(() => {
      expect(screen.getByText(/Error/)).toBeInTheDocument();
    });
  });
});`;

const IntegrationTesting = () => {
  return (
    <TopicLayout
      title="Integration Testing"
      route="/testing/basics/integration-testing"
      category="testing"
      explanation="Integration tests verify that multiple parts of your application work together correctly. They test the interaction between components, services, and external systems like APIs or databases."
      code={integrationTestingCode}
      codeFilename="integration.test.ts"
      whyItMatters="Integration tests catch bugs that unit tests miss - like contract mismatches between layers. Interviewers ask about MSW for API mocking, testing database interactions, and component + hook integration. Shows understanding of system architecture."
      mistakes={[
        "Testing too much in one test: Each test should verify one integration point",
        "Not resetting state between tests: Use beforeEach to ensure clean state",
        "Slow tests: Mock external services instead of hitting real APIs",
        "Flaky tests: Avoid race conditions with proper async handling"
      ]}
      practiceTask="Write integration tests for a shopping cart: test adding items, updating quantities, applying discount codes, and checkout flow. Use MSW for API mocking and verify the entire flow works end-to-end."
    >
      <MultiExampleEditor
        title="🎯 Try It: Integration Testing"
        examples={[
          {
            title: "MSW Setup",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: #0f172a; color: #e2e8f0; }
  .card { background: #1e293b; padding: 30px; border-radius: 12px; max-width: 700px; margin: 0 auto; }
  .step { background: #334155; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #3b82f6; }
  code { background: #1e293b; padding: 2px 6px; border-radius: 4px; font-family: monospace; }
  h3 { color: #60a5fa; margin-top: 0; }
</style>
</head>
<body>
  <div class="card">
    <h2>🔗 Integration Testing with MSW</h2>
    
    <div class="step">
      <h3>1. Install MSW</h3>
      <code>npm install msw --save-dev</code>
    </div>
    
    <div class="step">
      <h3>2. Create Handlers</h3>
      <code>src/mocks/handlers.ts</code>
      <p>Define API mock handlers for your endpoints</p>
    </div>
    
    <div class="step">
      <h3>3. Setup Server</h3>
      <code>src/mocks/server.ts</code>
      <p>Configure mock server for Node.js tests</p>
    </div>
    
    <div class="step">
      <h3>4. Configure Vitest</h3>
      <code>setupFilesAfterEnv: ['./src/setupTests.ts']</code>
      <p>Start server before tests, reset after each</p>
    </div>
    
    <p style="color: #10b981; margin-top: 20px;">
      ✅ MSW intercepts network requests and returns mock responses
    </p>
  </div>
</body>
</html>`
          }
        ]}
      />
    </TopicLayout>
  );
};

export default IntegrationTesting;