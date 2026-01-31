import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const unitTestingCode = `// Unit Testing: Testing individual functions and modules in isolation

// ✅ Basic Function Testing with Vitest/Jest
import { describe, it, expect, vi } from 'vitest';

// Pure function to test
function calculateDiscount(price: number, discountPercent: number): number {
  if (price < 0 || discountPercent < 0) {
    throw new Error('Values must be positive');
  }
  if (discountPercent > 100) {
    return 0;
  }
  return price * (1 - discountPercent / 100);
}

describe('calculateDiscount', () => {
  it('should calculate 20% discount correctly', () => {
    expect(calculateDiscount(100, 20)).toBe(80);
  });

  it('should return 0 for 100% discount', () => {
    expect(calculateDiscount(50, 100)).toBe(0);
  });

  it('should return 0 for discount over 100%', () => {
    expect(calculateDiscount(50, 150)).toBe(0);
  });

  it('should throw error for negative price', () => {
    expect(() => calculateDiscount(-10, 20)).toThrow('Values must be positive');
  });
});

// ✅ Testing Async Functions
async function fetchUserData(userId: string): Promise<User> {
  const response = await fetch(\`/api/users/\${userId}\`);
  if (!response.ok) {
    throw new Error('User not found');
  }
  return response.json();
}

describe('fetchUserData', () => {
  it('should return user data on success', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ id: '1', name: 'John' })
    });

    const user = await fetchUserData('1');
    expect(user).toEqual({ id: '1', name: 'John' });
  });

  it('should throw error when user not found', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false });

    await expect(fetchUserData('999')).rejects.toThrow('User not found');
  });
});

// ✅ Testing Classes
class ShoppingCart {
  private items: Map<string, number> = new Map();

  addItem(productId: string, quantity: number = 1): void {
    const current = this.items.get(productId) || 0;
    this.items.set(productId, current + quantity);
  }

  removeItem(productId: string): void {
    this.items.delete(productId);
  }

  getTotal(prices: Record<string, number>): number {
    let total = 0;
    this.items.forEach((qty, productId) => {
      total += (prices[productId] || 0) * qty;
    });
    return total;
  }
}

describe('ShoppingCart', () => {
  let cart: ShoppingCart;

  beforeEach(() => {
    cart = new ShoppingCart();
  });

  it('should add items to cart', () => {
    cart.addItem('product1', 2);
    const prices = { product1: 10 };
    expect(cart.getTotal(prices)).toBe(20);
  });

  it('should remove items from cart', () => {
    cart.addItem('product1', 2);
    cart.removeItem('product1');
    const prices = { product1: 10 };
    expect(cart.getTotal(prices)).toBe(0);
  });
});

// ✅ Matchers You Should Know
describe('Common Matchers', () => {
  // Equality
  expect(1 + 1).toBe(2);           // Strict equality
  expect({ a: 1 }).toEqual({ a: 1 }); // Deep equality
  
  // Truthiness
  expect(true).toBeTruthy();
  expect(null).toBeNull();
  expect(undefined).toBeUndefined();
  
  // Numbers
  expect(0.1 + 0.2).toBeCloseTo(0.3);
  expect(10).toBeGreaterThan(5);
  
  // Strings
  expect('hello world').toContain('world');
  expect('test@email.com').toMatch(/^[\\w-]+@/);
  
  // Arrays
  expect([1, 2, 3]).toContain(2);
  expect(['a', 'b']).toHaveLength(2);
  
  // Objects
  expect({ name: 'John' }).toHaveProperty('name');
  expect({ name: 'John' }).toMatchObject({ name: expect.any(String) });
});`;

const UnitTesting = () => {
  return (
    <TopicLayout
      title="Unit Testing"
      route="/testing/basics/unit-testing"
      category="testing"
      explanation="Unit tests verify individual functions and modules work correctly in isolation. They're fast, focused, and form the foundation of a testing strategy. Use Jest or Vitest with clear arrange-act-assert structure."
      code={unitTestingCode}
      codeFilename="unit-testing.test.ts"
      whyItMatters="Unit tests are the most common testing questions. Interviewers expect: ability to write testable code, knowledge of matchers, mocking techniques, and testing edge cases. Shows understanding of code quality and TDD principles."
      mistakes={[
        "Testing implementation details: Test behavior, not internal state",
        "Not testing edge cases: Empty arrays, null values, boundary conditions",
        "Tightly coupled tests: Each test should be independent",
        "No assertion messages: Add context to help debug failures"
      ]}
      practiceTask="Write unit tests for a password validator function: min 8 chars, at least 1 uppercase, 1 lowercase, 1 number, 1 special character. Cover all edge cases and provide helpful error messages."
    >
      <MultiExampleEditor
        title="🎯 Try It: Unit Testing"
        examples={[
          {
            title: "Test Example",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: #0f172a; color: #e2e8f0; }
  .card { background: #1e293b; padding: 30px; border-radius: 12px; max-width: 700px; margin: 0 auto; }
  .test { padding: 12px 16px; border-radius: 8px; margin: 10px 0; font-family: monospace; }
  .pass { background: #064e3b; border-left: 4px solid #10b981; }
  .fail { background: #7f1d1d; border-left: 4px solid #ef4444; }
  button { background: #3b82f6; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600; }
  button:hover { background: #2563eb; }
  pre { background: #334155; padding: 15px; border-radius: 8px; overflow-x: auto; font-size: 14px; }
</style>
</head>
<body>
  <div class="card">
    <h2>🧪 Unit Testing Demo</h2>
    
    <pre>function add(a, b) {
  return a + b;
}

// Tests
expect(add(1, 2)).toBe(3);
expect(add(-1, 1)).toBe(0);
expect(add(0, 0)).toBe(0);</pre>
    
    <button onclick="runTests()">Run Tests</button>
    <div id="results"></div>
  </div>
  
  <script>
    function add(a, b) {
      return a + b;
    }
    
    function runTests() {
      const tests = [
        { name: 'add(1, 2) should equal 3', pass: add(1, 2) === 3 },
        { name: 'add(-1, 1) should equal 0', pass: add(-1, 1) === 0 },
        { name: 'add(0, 0) should equal 0', pass: add(0, 0) === 0 },
        { name: 'add(1.5, 2.5) should equal 4', pass: add(1.5, 2.5) === 4 },
      ];
      
      const results = document.getElementById('results');
      results.innerHTML = tests.map(t => 
        \`<div class="test \${t.pass ? 'pass' : 'fail'}">
          \${t.pass ? '✅' : '❌'} \${t.name}
        </div>\`
      ).join('');
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

export default UnitTesting;