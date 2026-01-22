import { Link } from 'react-router-dom';
import { topicsData, getCategoryColor } from '@/data/topics';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const Roadmap = () => {
  return (
    <div className="animate-fade-in pt-8 lg:pt-0">
      <h1 className="text-3xl font-bold text-foreground mb-2">Full Topic Roadmap</h1>
      <p className="text-muted-foreground mb-8">
        Complete interview preparation path from HTML fundamentals to Next.js patterns.
      </p>

      <div className="space-y-8">
        {topicsData.map((category, catIndex) => (
          <div key={category.id} className="relative">
            {/* Category Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-xl">
                {category.icon}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">{category.title}</h2>
                <p className="text-sm text-muted-foreground">{category.topics.length} topics</p>
              </div>
            </div>

            {/* Topics */}
            <div className="ml-5 border-l-2 border-border pl-6 space-y-3">
              {category.topics.map((topic, topicIndex) => (
                <Link
                  key={topic.id}
                  to={topic.route}
                  className="group flex items-center justify-between p-3 rounded-lg bg-card hover:bg-secondary/50 border border-transparent hover:border-border transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-xs text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                      {topicIndex + 1}
                    </div>
                    <span className="text-foreground group-hover:text-primary transition-colors">
                      {topic.title}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>

            {/* Connector */}
            {catIndex < topicsData.length - 1 && (
              <div className="absolute left-5 -bottom-4 w-0.5 h-8 bg-gradient-to-b from-border to-transparent" />
            )}
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-12 p-6 rounded-xl bg-card border border-border">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-primary" />
          Preparation Summary
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {topicsData.map((category) => (
            <div key={category.id} className="text-center">
              <div className={`category-badge border ${getCategoryColor(category.id)} mb-2`}>
                {category.title}
              </div>
              <div className="text-2xl font-bold text-foreground">{category.topics.length}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
