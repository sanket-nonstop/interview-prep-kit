import { Link } from 'react-router-dom';
import { Code2, ArrowRight } from 'lucide-react';

const methods = [
  { name: 'GET', route: '/api-testing/get', color: 'bg-green-500', desc: 'Retrieve data from server', icon: '📥' },
  { name: 'POST', route: '/api-testing/post', color: 'bg-blue-500', desc: 'Create new resource', icon: '➕' },
  { name: 'PUT', route: '/api-testing/put', color: 'bg-orange-500', desc: 'Replace entire resource', icon: '🔄' },
  { name: 'PATCH', route: '/api-testing/patch', color: 'bg-yellow-500', desc: 'Update partial resource', icon: '✏️' },
  { name: 'DELETE', route: '/api-testing/delete', color: 'bg-red-500', desc: 'Remove resource', icon: '🗑️' },
];

const ApiTestingMain = () => {
  return (
    <div className="animate-fade-in max-w-5xl mx-auto">
      <div className="topic-card p-8 mb-8 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="flex items-center gap-3 mb-4">
          <Code2 className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">API Testing Lab</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Interactive playground to test all HTTP methods with real APIs. Learn by doing!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {methods.map((method) => (
          <Link
            key={method.name}
            to={method.route}
            className="topic-card p-6 group hover:scale-[1.02] transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 ${method.color} rounded-lg flex items-center justify-center text-2xl`}>
                  {method.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {method.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{method.desc}</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        ))}
      </div>

      <div className="topic-card p-6 mt-8">
        <h3 className="font-semibold text-foreground mb-3">💡 What You'll Learn</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Send real HTTP requests to live APIs</li>
          <li>• See request/response headers and body</li>
          <li>• Understand status codes (200, 201, 404, etc.)</li>
          <li>• Test with different data payloads</li>
          <li>• Industry-standard API testing practices</li>
        </ul>
      </div>
    </div>
  );
};

export default ApiTestingMain;
