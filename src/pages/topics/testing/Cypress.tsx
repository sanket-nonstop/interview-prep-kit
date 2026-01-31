import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const cypressCode = `// Cypress E2E Testing: End-to-end testing for web applications

// ✅ Basic Test Structure
// cypress/e2e/login.cy.ts
describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should login successfully with valid credentials', () => {
    cy.get('[data-testid="email-input"]').type('user@example.com');
    cy.get('[data-testid="password-input"]').type('password123');
    cy.get('[data-testid="login-button"]').click();
    
    cy.url().should('include', '/dashboard');
    cy.contains('Welcome back').should('be.visible');
  });

  it('should show error with invalid credentials', () => {
    cy.get('[data-testid="email-input"]').type('wrong@example.com');
    cy.get('[data-testid="password-input"]').type('wrongpassword');
    cy.get('[data-testid="login-button"]').click();
    
    cy.get('[data-testid="error-message"]')
      .should('be.visible')
      .and('contain', 'Invalid credentials');
  });
});

// ✅ API Interception
describe('Dashboard', () => {
  beforeEach(() => {
    // Intercept API and return mock data
    cy.intercept('GET', '/api/users', {
      statusCode: 200,
      body: [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' }
      ]
    }).as('getUsers');
    
    cy.visit('/dashboard');
  });

  it('should display user list', () => {
    cy.wait('@getUsers');
    
    cy.get('[data-testid="user-list"]')
      .should('contain', 'John Doe')
      .and('contain', 'Jane Smith');
  });

  it('should handle API errors gracefully', () => {
    cy.intercept('GET', '/api/users', {
      statusCode: 500,
      body: { error: 'Server error' }
    }).as('getUsersError');
    
    cy.reload();
    cy.wait('@getUsersError');
    
    cy.get('[data-testid="error-state"]')
      .should('be.visible');
  });
});

// ✅ Custom Commands
// cypress/support/commands.ts
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.session([email, password], () => {
    cy.visit('/login');
    cy.get('[data-testid="email-input"]').type(email);
    cy.get('[data-testid="password-input"]').type(password);
    cy.get('[data-testid="login-button"]').click();
    cy.url().should('include', '/dashboard');
  });
});

// Usage in tests
describe('Protected Pages', () => {
  beforeEach(() => {
    cy.login('user@example.com', 'password123');
  });

  it('should access settings page', () => {
    cy.visit('/settings');
    cy.contains('Account Settings').should('be.visible');
  });
});

// ✅ Testing Forms
describe('Registration Form', () => {
  it('should validate required fields', () => {
    cy.visit('/register');
    cy.get('[data-testid="submit-button"]').click();
    
    cy.get('[data-testid="name-error"]').should('contain', 'Name is required');
    cy.get('[data-testid="email-error"]').should('contain', 'Email is required');
  });

  it('should validate email format', () => {
    cy.get('[data-testid="email-input"]').type('invalid-email');
    cy.get('[data-testid="submit-button"]').click();
    
    cy.get('[data-testid="email-error"]').should('contain', 'Invalid email format');
  });

  it('should submit form successfully', () => {
    cy.intercept('POST', '/api/register', { statusCode: 201 }).as('register');
    
    cy.get('[data-testid="name-input"]').type('John Doe');
    cy.get('[data-testid="email-input"]').type('john@example.com');
    cy.get('[data-testid="password-input"]').type('SecurePass123!');
    cy.get('[data-testid="submit-button"]').click();
    
    cy.wait('@register');
    cy.url().should('include', '/welcome');
  });
});

// ✅ Visual Testing & Screenshots
describe('Visual Regression', () => {
  it('should match homepage snapshot', () => {
    cy.visit('/');
    cy.screenshot('homepage');
    // Or use cypress-image-snapshot plugin
    // cy.matchImageSnapshot('homepage');
  });
});

// ✅ Testing File Uploads
describe('File Upload', () => {
  it('should upload a file', () => {
    cy.visit('/upload');
    cy.get('[data-testid="file-input"]').selectFile('cypress/fixtures/test.pdf');
    cy.get('[data-testid="upload-button"]').click();
    
    cy.contains('File uploaded successfully').should('be.visible');
  });
});

// ✅ Testing Drag and Drop
describe('Kanban Board', () => {
  it('should drag card to different column', () => {
    cy.visit('/kanban');
    
    const dataTransfer = new DataTransfer();
    
    cy.get('[data-testid="card-1"]')
      .trigger('dragstart', { dataTransfer });
    
    cy.get('[data-testid="column-done"]')
      .trigger('drop', { dataTransfer });
    
    cy.get('[data-testid="column-done"]')
      .should('contain', 'Task 1');
  });
});`;

const Cypress = () => {
  return (
    <TopicLayout
      title="Cypress E2E Testing"
      route="/testing/e2e/cypress"
      category="testing"
      explanation="Cypress runs tests in a real browser, interacting with your app like a user. Features include: automatic waiting, time-travel debugging, API interception, screenshots, and video recording. Ideal for testing complete user flows."
      code={cypressCode}
      codeFilename="cypress.cy.ts"
      whyItMatters="E2E testing ensures your entire application works correctly. Interviewers test: cy.intercept for API mocking, custom commands, handling async operations, and testing real user flows. Shows you can verify production-ready applications."
      mistakes={[
        "Not using data-testid: Avoid fragile selectors like CSS classes",
        "Testing implementation: Focus on user behavior, not internal state",
        "Ignoring cy.wait: Wait for specific requests, not arbitrary time",
        "Skipping error cases: Test error states and edge cases too"
      ]}
      practiceTask="Write Cypress E2E tests for a shopping cart: add items, update quantities, apply discount codes, complete checkout with form validation, and verify order confirmation. Use cy.intercept for all API calls."
    >
      <MultiExampleEditor
        title="🎯 Try It: Cypress"
        examples={[
          {
            title: "Cypress Commands",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: #0f172a; color: #e2e8f0; }
  .card { background: #1e293b; padding: 30px; border-radius: 12px; max-width: 700px; margin: 0 auto; }
  .cmd { background: #334155; padding: 12px 16px; border-radius: 8px; margin: 10px 0; display: flex; align-items: center; gap: 12px; }
  code { background: #1e293b; padding: 4px 8px; border-radius: 4px; font-family: monospace; color: #60a5fa; }
  .desc { color: #94a3b8; font-size: 14px; }
  .section { margin-top: 25px; }
  .section-title { color: #10b981; font-weight: 600; margin-bottom: 10px; }
</style>
</head>
<body>
  <div class="card">
    <h2>🌲 Essential Cypress Commands</h2>
    
    <div class="section">
      <div class="section-title">🔍 Selection</div>
      <div class="cmd"><code>cy.get('[data-testid="btn"]')</code> <span class="desc">Select element</span></div>
      <div class="cmd"><code>cy.contains('Submit')</code> <span class="desc">Find by text</span></div>
    </div>
    
    <div class="section">
      <div class="section-title">⚡ Actions</div>
      <div class="cmd"><code>.click()</code> <span class="desc">Click element</span></div>
      <div class="cmd"><code>.type('text')</code> <span class="desc">Type into input</span></div>
      <div class="cmd"><code>.clear()</code> <span class="desc">Clear input</span></div>
    </div>
    
    <div class="section">
      <div class="section-title">✅ Assertions</div>
      <div class="cmd"><code>.should('be.visible')</code> <span class="desc">Check visibility</span></div>
      <div class="cmd"><code>.should('contain', 'text')</code> <span class="desc">Check content</span></div>
      <div class="cmd"><code>.should('have.length', 3)</code> <span class="desc">Check count</span></div>
    </div>
    
    <div class="section">
      <div class="section-title">🌐 Network</div>
      <div class="cmd"><code>cy.intercept('GET', '/api/*')</code> <span class="desc">Mock API</span></div>
      <div class="cmd"><code>cy.wait('@alias')</code> <span class="desc">Wait for request</span></div>
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

export default Cypress;