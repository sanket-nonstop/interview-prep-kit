import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, BookOpen, Clock, Lightbulb, Home, Search } from 'lucide-react';
import { topicsDataNew } from '@/data/topics-new';

const TopicNotFound = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const categoryId = pathSegments[0];
  
  // Find the category to show related topics
  const category = topicsDataNew.find(cat => cat.id === categoryId);
  const relatedTopics = category?.subcategories[0]?.topics.slice(0, 4) || [];

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="topic-card p-8 mb-6 text-center bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-yellow-500/20 mb-4">
          <Clock className="w-10 h-10 text-yellow-600" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-3">Topic Coming Soon!</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          This topic is on our roadmap and will be added soon. We're constantly expanding our content to help you ace your interviews!
        </p>
      </div>

      {/* What You Can Do */}
      <div className="topic-card p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold text-foreground">What You Can Do</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-secondary/50 rounded-lg border border-border">
            <div className="text-2xl mb-2">🔍</div>
            <div className="font-semibold text-sm text-foreground mb-1">Search Other Topics</div>
            <div className="text-xs text-muted-foreground">Use the search bar (Ctrl+K) to find related content</div>
          </div>
          <div className="p-4 bg-secondary/50 rounded-lg border border-border">
            <div className="text-2xl mb-2">📚</div>
            <div className="font-semibold text-sm text-foreground mb-1">Browse Categories</div>
            <div className="text-xs text-muted-foreground">Explore other topics in the sidebar navigation</div>
          </div>
          <div className="p-4 bg-secondary/50 rounded-lg border border-border">
            <div className="text-2xl mb-2">🗺️</div>
            <div className="font-semibold text-sm text-foreground mb-1">Check Roadmap</div>
            <div className="text-xs text-muted-foreground">See what topics are planned for the future</div>
          </div>
        </div>
      </div>

      {/* Related Topics */}
      {relatedTopics.length > 0 && (
        <div className="topic-card p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">
              Related {category?.title} Topics
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {relatedTopics.map((topic) => (
              <Link
                key={topic.id}
                to={topic.route}
                className="p-4 bg-secondary/50 rounded-lg border border-border hover:border-primary/50 hover:bg-secondary transition-all group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                      {topic.title}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {topic.difficulty && (
                        <span className={`inline-block px-2 py-0.5 rounded text-xs ${
                          topic.difficulty === 'beginner' ? 'bg-green-500/20 text-green-700' :
                          topic.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-700' :
                          'bg-red-500/20 text-red-700'
                        }`}>
                          {topic.difficulty}
                        </span>
                      )}
                    </div>
                  </div>
                  <ArrowLeft className="w-4 h-4 text-muted-foreground group-hover:text-primary rotate-180 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all font-semibold"
        >
          <Home className="w-4 h-4" />
          Go Home
        </Link>
        <Link
          to="/roadmap/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-all font-semibold border border-border"
        >
          <BookOpen className="w-4 h-4" />
          View Roadmap
        </Link>
        {category && (
          <Link
            to={`/${category.id}/`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-all font-semibold border border-border"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {category.title}
          </Link>
        )}
      </div>

      {/* Help Section */}
      <div className="mt-8 p-4 bg-blue-500/10 rounded-lg border border-blue-500/30 text-center">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">Want to request a topic?</strong> We're always looking to improve. 
          Check back soon for updates!
        </p>
      </div>
    </div>
  );
};

export default TopicNotFound;
