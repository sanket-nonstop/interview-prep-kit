import { Link } from 'react-router-dom';
import { topicsDataNew } from '@/data/topics-new';
import { ArrowRight, Zap, Code2, Target, BookOpen, TrendingUp, ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const Index = () => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  return (
    <div className="animate-fade-in max-w-7xl mx-auto">
      {/* Hero Card */}
      <div className="topic-card mb-8 p-8 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          <Zap className="w-4 h-4" />
          Interview-Ready Practice
        </div>
        <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
          Master Frontend <span className="glow-text">Interviews</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mb-6">
          Production-ready code examples, real interview patterns, and hands-on practice tasks.
        </p>
        <Link
          to="/roadmap"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          View Full Roadmap <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="topic-card text-center p-6 hover:shadow-lg transition-shadow">
          <BookOpen className="w-8 h-8 text-primary mx-auto mb-2" />
          <div className="text-3xl font-bold text-primary mb-1">
            {topicsDataNew.reduce((acc, cat) => acc + cat.subcategories.reduce((a, sub) => a + sub.topics.length, 0), 0)}+
          </div>
          <div className="text-sm text-muted-foreground">Topics Covered</div>
        </div>
        <div className="topic-card text-center p-6 hover:shadow-lg transition-shadow">
          <Code2 className="w-8 h-8 text-accent mx-auto mb-2" />
          <div className="text-3xl font-bold text-accent mb-1">{topicsDataNew.length}</div>
          <div className="text-sm text-muted-foreground">Categories</div>
        </div>
        <div className="topic-card text-center p-6 hover:shadow-lg transition-shadow">
          <TrendingUp className="w-8 h-8 text-category-js mx-auto mb-2" />
          <div className="text-3xl font-bold text-category-js mb-1">∞</div>
          <div className="text-sm text-muted-foreground">Practice Tasks</div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="topic-card p-6 mb-8">
        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <Code2 className="w-5 h-5 text-primary" />
          Explore Categories
        </h2>
        <div className="space-y-3">
          {topicsDataNew.map((category) => {
            const isOpen = openCategory === category.id;
            
            return (
              <div key={category.id} className="border-2 border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all">
                <button
                  onClick={() => setOpenCategory(isOpen ? null : category.id)}
                  className="w-full flex items-center justify-between p-5 bg-gradient-to-r from-secondary/30 to-transparent hover:from-secondary/50 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-3xl transform group-hover:scale-110 transition-transform">{category.icon}</div>
                    <div className="text-left">
                      <h3 className="font-bold text-foreground text-lg group-hover:text-primary transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {category.subcategories.reduce((acc, sub) => acc + sub.topics.length, 0)} topics • {category.subcategories.length} sections
                      </p>
                    </div>
                  </div>
                  <div className={cn(
                    "p-2 rounded-full bg-secondary/50 group-hover:bg-primary/20 transition-all",
                    isOpen && "bg-primary/20"
                  )}>
                    {isOpen ? (
                      <ChevronDown className="w-5 h-5 text-primary" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                    )}
                  </div>
                </button>
                
                {isOpen && (
                  <div className="border-t-2 border-border bg-gradient-to-b from-secondary/10 to-transparent p-5">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {category.subcategories.map((subcategory) => (
                        <div key={subcategory.id} className="bg-background/50 rounded-lg p-3 border border-border/50">
                          <h4 className="text-sm font-bold text-foreground mb-3 pb-2 border-b border-border flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                            {subcategory.title}
                          </h4>
                          <div className="space-y-1.5">
                            {subcategory.topics.map((topic) => (
                              <Link
                                key={topic.id}
                                to={topic.route}
                                className="flex items-center gap-2 px-2 py-1.5 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-all group/topic"
                              >
                                <ArrowRight className="w-3 h-3 opacity-0 group-hover/topic:opacity-100 transition-opacity" />
                                <span className="group-hover/topic:translate-x-1 transition-transform">{topic.title}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Start Card */}
      <div className="topic-card p-6 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent border-primary/20">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-primary/20">
            <Target className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-2">Quick Start Guide</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Each topic includes: explanation → code → why it matters → common mistakes → practice task
            </p>
            <Link
              to="/javascript/advanced/closures"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              Start with Closures <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
