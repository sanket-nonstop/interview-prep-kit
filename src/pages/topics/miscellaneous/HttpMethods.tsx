import { TopicLayout } from '@/components/TopicLayout';
import { ApiTester } from '@/components/ApiTester';

const HttpMethods = () => {
  return (
    <TopicLayout
      title="HTTP Methods"
      route="/miscellaneous/http-networking/http-methods"
      category="javascript"
      explanation="HTTP methods (verbs) define the action to be performed on a resource. The most common are GET, POST, PUT, PATCH, and DELETE. Understanding when to use each is essential for building RESTful APIs."
      code={`// GET - Retrieve data
fetch('/api/users')
  .then(res => res.json())
  .then(data => console.log(data));

// POST - Create new resource
fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'John', email: 'john@example.com' })
});

// PUT - Replace entire resource
fetch('/api/users/123', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'John Doe', email: 'john@example.com', age: 30 })
});

// PATCH - Partial update
fetch('/api/users/123', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ age: 31 })
});

// DELETE - Remove resource
fetch('/api/users/123', {
  method: 'DELETE'
});`}
      codeLanguage="javascript"
      whyItMatters="Interviewers test your understanding of RESTful principles. Knowing the difference between PUT and PATCH, understanding idempotency, and proper status codes shows API design knowledge."
      mistakes={[
        'Using POST for updates instead of PUT/PATCH',
        'Not understanding idempotency (GET, PUT, DELETE are idempotent)',
        'Sending sensitive data in GET query parameters',
        'Confusing PUT (replace) with PATCH (partial update)',
      ]}
      practiceTask="Design a RESTful API for a blog with posts and comments. Define all endpoints with proper HTTP methods."
    >
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">🎮 Interactive API Tester</h3>
        <p className="text-sm text-muted-foreground">Try different HTTP methods and see real API responses!</p>
        <ApiTester />
      </div>
    </TopicLayout>
  );
};

export default HttpMethods;
