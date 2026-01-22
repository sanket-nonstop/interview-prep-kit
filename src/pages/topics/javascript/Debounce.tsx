import { TopicLayout } from '@/components/TopicLayout';

const debounceCode = `// Debounce: Delay execution until after calls have stopped

// ✅ Production debounce implementation
function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

// ✅ React hook for debounced values
import { useState, useEffect } from 'react';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// ✅ Search input with debounced API calls
function SearchInput() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery) {
      // Only calls API 300ms after user stops typing
      searchAPI(debouncedQuery);
    }
  }, [debouncedQuery]);

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search..."
    />
  );
}

// ✅ Debounced resize handler
const handleResize = debounce(() => {
  console.log('Window resized:', window.innerWidth);
}, 250);

window.addEventListener('resize', handleResize);`;

const Debounce = () => {
  return (
    <TopicLayout
      title="Debounce Pattern"
      route="/javascript/patterns/debounce"
      category="javascript"
      explanation="Debounce delays function execution until after calls have stopped coming for a specified time. Essential for search inputs, resize handlers, and any high-frequency events where you only want the final result."
      code={debounceCode}
      codeFilename="debounce.ts"
      whyItMatters="Prevents excessive API calls and improves performance. Common interview question: 'Implement debounce from scratch' or 'How would you optimize a search input?' Shows understanding of performance optimization and user experience."
      mistakes={[
        "Not clearing previous timeout: Creates memory leaks and unexpected behavior.",
        "Wrong delay timing: Too short = still too many calls, too long = poor UX.",
        "Missing TypeScript generics: Loses type safety for function parameters.",
        "Not handling cleanup: In React, missing cleanup in useEffect causes bugs.",
      ]}
      practiceTask="Create a debounced save function for a form that saves to localStorage 500ms after the user stops typing. Include proper cleanup and TypeScript types."
    />
  );
};

export default Debounce;