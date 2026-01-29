import { Link } from 'react-router-dom';
import { topicsDataNew } from '@/data/topics-new';
import { ArrowRight, Map, Clock, Target, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const Roadmap = () => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const totalTopics = topicsDataNew.reduce((acc, cat) => 
    acc + cat.subcategories.reduce((a, sub) => a + sub.topics.length, 0), 0
  );

  const difficultyLevels = [
    { level: 'Fundamentals', categories: ['HTML', 'CSS'], color: 'text-green-500' },
    { level: 'Core Skills', categories: ['JavaScript', 'React'], color: 'text-blue-500' },
    { level: 'Advanced', categories: ['TypeScript', 'Next.js'], color: 'text-purple-500' },
  ];

  return (
    <div className="animate-fade-in max-w-6xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center space-y-4 py-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
          <Map className="w-3 h-3" />
          Complete Learning Path
        </div>
        <h1 className="text-4xl md:text-5xl font-bold">
         Interview <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Roadmap</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          A structured path covering {totalTopics} essential topics across {topicsDataNew.length} categories. Master each concept with real code examples and practice tasks.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="border border-border rounded-lg p-5 hover:border-primary/50 transition-colors">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Target className="w-4 h-4 text-primary" />
            </div>
            <span className="text-2xl font-bold text-foreground">{totalTopics}</span>
          </div>
          <p className="text-sm text-muted-foreground">Interview Topics</p>
        </div>
        <div className="border border-border rounded-lg p-5 hover:border-accent/50 transition-colors">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-accent/10">
              <Clock className="w-4 h-4 text-accent" />
            </div>
            <span className="text-2xl font-bold text-foreground">4-6 weeks</span>
          </div>
          <p className="text-sm text-muted-foreground">Estimated Timeline</p>
        </div>
        <div className="border border-border rounded-lg p-5 hover:border-green-500/50 transition-colors">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-green-500/10">
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <span className="text-2xl font-bold text-foreground">3 Levels</span>
          </div>
          <p className="text-sm text-muted-foreground">Difficulty Progression</p>
        </div>
      </div>

      {/* Learning Path */}
      <div className="border border-border rounded-lg p-6 bg-gradient-to-br from-secondary/30 to-transparent">
        <h2 className="text-lg font-semibold text-foreground mb-4">Recommended Learning Path</h2>
        <div className="space-y-3">
          {difficultyLevels.map((level, idx) => (
            <div key={idx} className="flex items-start gap-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-background border-2 border-border flex-shrink-0 mt-0.5">
                <span className="text-sm font-semibold text-foreground">{idx + 1}</span>
              </div>
              <div className="flex-1">
                <h3 className={cn("font-semibold mb-1", level.color)}>{level.level}</h3>
                <p className="text-sm text-muted-foreground">
                  {level.categories.join(' → ')} • Build strong foundation and progress systematically
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">All Topics by Category</h2>
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
                      {category.subcategories.reduce((acc, sub) => acc + sub.topics.length, 0)} topics • 
                      {category.subcategories.length} sections
                    </p>
                  </div>
                </div>
                <ArrowRight className={cn(
                  "w-4 h-4 text-muted-foreground transition-transform",
                  isOpen && "rotate-90"
                )} />
              </button>
              
              {isOpen && (
                <div className="border-t border-border bg-secondary/20 p-4 space-y-6">
                  {category.subcategories.map((subcategory, subIdx) => (
                    <div key={subcategory.id}>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded">
                          Section {subIdx + 1}
                        </span>
                        <h4 className="text-xs font-semibold text-foreground uppercase tracking-wide">
                          {subcategory.title}
                        </h4>
                      </div>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {subcategory.topics.map((topic, idx) => (
                          <Link
                            key={topic.id}
                            to={topic.route}
                            className="group flex items-center gap-2 p-2.5 rounded-lg hover:bg-background border border-transparent hover:border-primary/30 transition-all"
                          >
                            <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center text-xs text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors flex-shrink-0">
                              {idx + 1}
                            </div>
                            <span className="text-sm text-foreground group-hover:text-primary transition-colors flex-1">
                              {topic.title}
                            </span>
                            <ArrowRight className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
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
      </div>

      {/* Footer Tip */}
      <div className="border border-primary/30 rounded-lg p-5 bg-gradient-to-r from-primary/5 to-accent/5">
        <p className="text-sm text-muted-foreground text-center">
          💡 <span className="font-semibold text-foreground">Pro Tip:</span> Each topic includes explanation, code examples, common mistakes, and practice tasks. Start from fundamentals and progress sequentially for best results.
        </p>
      </div>
    </div>
  );
};

export default Roadmap;
