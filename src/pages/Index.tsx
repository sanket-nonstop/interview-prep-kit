import { Link } from 'react-router-dom';
import { topicsData, getCategoryColor } from '@/data/topics';
import { ArrowRight, Zap, Code2, Target } from 'lucide-react';

const Index = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <div className="mb-12 pt-8 lg:pt-0">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          <Zap className="w-4 h-4" />
          Interview-Ready Practice
        </div>
        <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
          Master Frontend
          <span className="glow-text block">Interviews</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mb-6">
          Production-ready code examples, real interview patterns, and hands-on practice tasks. 
          No fluff—just what senior engineers actually ask.
        </p>
        <Link
          to="/roadmap"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          View Full Roadmap
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-12">
        <div className="topic-card text-center">
          <div className="text-2xl font-bold text-primary mb-1">
            {topicsData.reduce((acc, cat) => acc + cat.topics.length, 0)}+
          </div>
          <div className="text-sm text-muted-foreground">Topics</div>
        </div>
        <div className="topic-card text-center">
          <div className="text-2xl font-bold text-accent mb-1">5</div>
          <div className="text-sm text-muted-foreground">Categories</div>
        </div>
        <div className="topic-card text-center">
          <div className="text-2xl font-bold text-category-js mb-1">∞</div>
          <div className="text-sm text-muted-foreground">Practice</div>
        </div>
      </div>

      {/* Categories Preview */}
      <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
        <Code2 className="w-5 h-5 text-primary" />
        Explore Categories
      </h2>
      <div className="grid gap-4">
        {topicsData.map((category) => (
          <Link
            key={category.id}
            to={category.topics[0]?.route || '/'}
            className="topic-card group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{category.icon}</span>
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.topics.length} topics
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Start */}
      <div className="mt-12 p-6 rounded-xl bg-gradient-to-br from-primary/10 via-accent/5 to-transparent border border-primary/20">
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-lg bg-primary/20">
            <Target className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-1">Quick Start</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Each topic includes: explanation → code → why it matters → common mistakes → practice task
            </p>
            <Link
              to="/javascript/closures"
              className="text-sm text-primary hover:underline inline-flex items-center gap-1"
            >
              Start with Closures
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
