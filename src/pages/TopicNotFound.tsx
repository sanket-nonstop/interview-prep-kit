import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen } from 'lucide-react';

const TopicNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-fade-in">
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
        <BookOpen className="w-8 h-8 text-primary" />
      </div>
      <h1 className="text-2xl font-bold text-foreground mb-2">Topic Coming Soon</h1>
      <p className="text-muted-foreground mb-6 max-w-md">
        This topic is on the roadmap and will be added soon. Check out other available topics in the meantime.
      </p>
      <div className="flex gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Home
        </Link>
        <Link
          to="/roadmap"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          View Roadmap
        </Link>
      </div>
    </div>
  );
};

export default TopicNotFound;
