import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const playwrightCode = `// Playwright E2E Testing: Cross-browser testing with auto-waiting

import { test, expect } from '@playwright/test';

// ✅ Basic Test Structure
test.describe('Login Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('should login successfully', async ({ page }) => {
    await page.getByLabel('Email').fill('user@example.com');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Login' }).click();
    
    await expect(page).toHaveURL(/.*dashboard/);
    await expect(page.getByText('Welcome back')).toBeVisible();
  });

  test('should show error with invalid credentials', async ({ page }) => {
    await page.getByLabel('Email').fill('wrong@example.com');
    await page.getByLabel('Password').fill('wrongpassword');
    await page.getByRole('button', { name: 'Login' }).click();
    
    await expect(page.getByTestId('error-message')).toContainText('Invalid credentials');
  });
});

// ✅ API Mocking with Routes
test.describe('Dashboard with Mocked API', () => {
  test.beforeEach(async ({ page }) => {
    // Mock API responses
    await page.route('/api/users', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          { id: 1, name: 'John Doe' },
          { id: 2, name: 'Jane Smith' }
        ])
      });
    });
  });

  test('should display user list', async ({ page }) => {
    await page.goto('/dashboard');
    
    await expect(page.getByTestId('user-list')).toContainText('John Doe');
    await expect(page.getByTestId('user-list')).toContainText('Jane Smith');
  });

  test('should handle API errors', async ({ page }) => {
    await page.route('/api/users', (route) => 
      route.fulfill({ status: 500 })
    );
    
    await page.goto('/dashboard');
    await expect(page.getByTestId('error-state')).toBeVisible();
  });
});

// ✅ Authentication State (Reusable Login)
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'authenticated',
      use: { storageState: 'playwright/.auth/user.json' },
      dependencies: ['setup']
    }
  ]
});

// auth.setup.ts
test('authenticate', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill('user@example.com');
  await page.getByLabel('Password').fill('password123');
  await page.getByRole('button', { name: 'Login' }).click();
  
  await page.waitForURL('/dashboard');
  await page.context().storageState({ path: 'playwright/.auth/user.json' });
});

// ✅ Testing Multiple Browsers
// playwright.config.ts
projects: [
  { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  { name: 'mobile', use: { ...devices['iPhone 13'] } }
]

// ✅ Page Object Model (POM)
class LoginPage {
  constructor(private page: Page) {}
  
  readonly emailInput = () => this.page.getByLabel('Email');
  readonly passwordInput = () => this.page.getByLabel('Password');
  readonly loginButton = () => this.page.getByRole('button', { name: 'Login' });
  readonly errorMessage = () => this.page.getByTestId('error-message');
  
  async goto() {
    await this.page.goto('/login');
  }
  
  async login(email: string, password: string) {
    await this.emailInput().fill(email);
    await this.passwordInput().fill(password);
    await this.loginButton().click();
  }
}

test('login with POM', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  await loginPage.goto();
  await loginPage.login('user@example.com', 'password123');
  
  await expect(page).toHaveURL(/.*dashboard/);
});

// ✅ Visual Comparison
test('homepage visual test', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveScreenshot('homepage.png');
});

// ✅ Network Request Assertions
test('should make correct API call', async ({ page }) => {
  const [request] = await Promise.all([
    page.waitForRequest('/api/submit'),
    page.getByRole('button', { name: 'Submit' }).click()
  ]);
  
  expect(request.method()).toBe('POST');
  expect(request.postDataJSON()).toMatchObject({ name: 'test' });
});

// ✅ Handling Dialogs
test('should handle confirm dialog', async ({ page }) => {
  page.on('dialog', async (dialog) => {
    expect(dialog.message()).toContain('Are you sure?');
    await dialog.accept();
  });
  
  await page.getByRole('button', { name: 'Delete' }).click();
  await expect(page.getByText('Deleted successfully')).toBeVisible();
});

// ✅ Testing File Downloads
test('should download file', async ({ page }) => {
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.getByRole('button', { name: 'Download' }).click()
  ]);
  
  expect(download.suggestedFilename()).toBe('report.pdf');
});`;

const Playwright = () => {
  return (
    <TopicLayout
      title="Playwright E2E Testing"
      route="/testing/e2e/playwright"
      category="testing"
      explanation="Playwright is a modern E2E testing framework supporting Chromium, Firefox, and WebKit. Features auto-waiting, powerful selectors, network interception, and parallel test execution. Uses async/await syntax and has excellent TypeScript support."
      code={playwrightCode}
      codeFilename="playwright.spec.ts"
      whyItMatters="Playwright is increasingly popular for E2E testing. Interviewers test: cross-browser testing, page object model, API mocking with routes, and handling complex scenarios like dialogs and downloads. Shows modern testing expertise."
      mistakes={[
        "Not using auto-waiting: Playwright waits automatically, avoid explicit waits",
        "Ignoring locator best practices: Use getByRole, getByLabel over CSS selectors",
        "Not using POM for large suites: Page objects improve maintainability",
        "Skipping cross-browser tests: Test on multiple browsers in CI"
      ]}
      practiceTask="Write Playwright tests for a multi-step checkout flow: select products, fill shipping info, enter payment (with mock API), and confirm order. Use Page Object Model and test on both desktop and mobile viewports."
    >
      <MultiExampleEditor
        title="🎯 Try It: Playwright"
        examples={[
          {
            title: "Playwright vs Cypress",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: #0f172a; color: #e2e8f0; }
  .card { background: #1e293b; padding: 30px; border-radius: 12px; max-width: 800px; margin: 0 auto; }
  table { width: 100%; border-collapse: collapse; margin-top: 20px; }
  th, td { padding: 12px; text-align: left; border-bottom: 1px solid #334155; }
  th { background: #334155; color: #60a5fa; }
  .check { color: #10b981; }
  .x { color: #ef4444; }
  .partial { color: #f59e0b; }
</style>
</head>
<body>
  <div class="card">
    <h2>⚔️ Playwright vs Cypress</h2>
    
    <table>
      <tr>
        <th>Feature</th>
        <th>Playwright</th>
        <th>Cypress</th>
      </tr>
      <tr>
        <td>Multi-browser</td>
        <td class="check">✅ Chrome, Firefox, Safari</td>
        <td class="partial">⚠️ Chrome, Firefox, Edge</td>
      </tr>
      <tr>
        <td>Parallel tests</td>
        <td class="check">✅ Built-in</td>
        <td class="partial">⚠️ Paid feature</td>
      </tr>
      <tr>
        <td>Mobile emulation</td>
        <td class="check">✅ Native support</td>
        <td class="partial">⚠️ Viewport only</td>
      </tr>
      <tr>
        <td>Language</td>
        <td>JS, TS, Python, .NET, Java</td>
        <td>JS, TS only</td>
      </tr>
      <tr>
        <td>Auto-waiting</td>
        <td class="check">✅ Built-in</td>
        <td class="check">✅ Built-in</td>
      </tr>
      <tr>
        <td>Network mocking</td>
        <td class="check">✅ page.route()</td>
        <td class="check">✅ cy.intercept()</td>
      </tr>
      <tr>
        <td>Time-travel debug</td>
        <td class="x">❌ No</td>
        <td class="check">✅ Yes</td>
      </tr>
    </table>
  </div>
</body>
</html>`
          }
        ]}
      />
    </TopicLayout>
  );
};

export default Playwright;