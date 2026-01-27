import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { getAllTopics } from '@/data/topics-new';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

export const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<ReturnType<typeof getAllTopics>>([]);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query.trim()) {
      const allTopics = getAllTopics();
      const filtered = allTopics.filter(topic =>
        topic.title.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered.slice(0, 8));
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelect = (route: string) => {
    navigate(route);
    setQuery('');
    setIsOpen(false);
    inputRef.current?.blur();
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search topics... (Ctrl+K)"
          className="w-full pl-10 pr-10 py-2 bg-secondary/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full mt-2 w-full bg-popover border border-border rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
            {results.map((topic) => (
              <button
                key={topic.id}
                onClick={() => handleSelect(topic.route)}
                className="w-full px-4 py-3 text-left hover:bg-secondary/50 transition-colors border-b border-border last:border-0 flex items-center justify-between group"
              >
                <div>
                  <div className="font-medium text-sm text-foreground group-hover:text-primary">
                    {topic.title}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {topic.category} • {topic.difficulty}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
