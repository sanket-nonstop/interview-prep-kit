import { Link } from 'react-router-dom';
import { topicsDataNew, getCategoryColor } from '@/data/topics-new';
import { ArrowRight, CheckCircle2, Map, ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const Roadmap = () => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  return (
    <div className="animate-fade-in max-w-7xl mx-auto">
      {/* Header Card */}
      <div className="topic-card p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <Map className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Full Topic Roadmap</h1>
            <p className="text-muted-foreground">
              Complete interview preparation path from HTML fundamentals to Next.js patterns.
            </p>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-4">
        {topicsDataNew.map((category) => {
          const isOpen = openCategory === category.id;
          
          return (
            <div key={category.id} className="topic-card p-6">
              <button
                onClick={() => setOpenCategory(isOpen ? null : category.id)}
                className="w-full flex items-center justify-between mb-4"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{category.icon}</span>
                  <div className="text-left">
                    <h2 className="text-xl font-semibold text-foreground">{category.title}</h2>
                    <p className="text-sm text-muted-foreground">
                      {category.subcategories.reduce((acc, sub) => acc + sub.topics.length, 0)} topics
                    </p>
                  </div>
                </div>
                {isOpen ? (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                )}
              </button>
              
              {isOpen && (
                <div>
                  {category.subcategories.map((subcategory) => (
                    <div key={subcategory.id} className="mb-4 last:mb-0">
                      <h3 className="text-sm font-semibold text-muted-foreground mb-2 px-3">{subcategory.title}</h3>
                      <div className="grid md:grid-cols-3 gap-2">
                        {subcategory.topics.map((topic, idx) => (
                          <Link
                            key={topic.id}
                            to={topic.route}
                            className="group flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 border border-transparent hover:border-border transition-all"
                          >
                            <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-xs text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary transition-colors flex-shrink-0">
                              {idx + 1}
                            </div>
                            <span className="text-sm text-foreground group-hover:text-primary transition-colors flex-1">
                              {topic.title}
                            </span>
                            <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all flex-shrink-0" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary Card */}
      <div className="topic-card p-6 mt-6">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-primary" />
          Preparation Summary
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {topicsDataNew.map((category) => (
            <div key={category.id} className="text-center p-3 rounded-lg bg-secondary/30">
              <div className={`text-xs font-medium mb-2 ${getCategoryColor(category.id)}`}>
                {category.title}
              </div>
              <div className="text-2xl font-bold text-foreground">
                {category.subcategories.reduce((acc, sub) => acc + sub.topics.length, 0)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
