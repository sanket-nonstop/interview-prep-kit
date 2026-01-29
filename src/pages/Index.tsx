import { Link } from 'react-router-dom';
import { topicsDataNew } from '@/data/topics-new';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const Index = () => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  return (
    <div className="animate-fade-in max-w-6xl mx-auto space-y-12">
      {/* Hero */}
      <div className="text-center space-y-6 py-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
          <Sparkles className="w-3 h-3" />
          Interview Ready
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
          Master Frontend <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Interviews</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Production-ready examples, real patterns, hands-on practice.
        </p>
        <Link
          to="/roadmap"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          Get Started <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        {topicsDataNew.map((category) => {
          const isOpen = openCategory === category.id;
          
          return (
            <div key={category.id} className="border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-colors">
              <button
                onClick={() => setOpenCategory(isOpen ? null : category.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{category.icon}</span>
                  <div className="text-left">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {category.subcategories.reduce((acc, sub) => acc + sub.topics.length, 0)} topics
                    </p>
                  </div>
                </div>
                <ArrowRight className={cn(
                  "w-4 h-4 text-muted-foreground transition-transform",
                  isOpen && "rotate-90"
                )} />
              </button>
              
              {isOpen && (
                <div className="border-t border-border bg-secondary/20 p-4">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.subcategories.map((subcategory) => (
                      <div key={subcategory.id} className="space-y-2">
                        <h4 className="text-xs font-semibold text-foreground uppercase tracking-wide">
                          {subcategory.title}
                        </h4>
                        <div className="space-y-1">
                          {subcategory.topics.map((topic) => (
                            <Link
                              key={topic.id}
                              to={topic.route}
                              className="block text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all"
                            >
                              {topic.title}
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
  );
};

export default Index;
