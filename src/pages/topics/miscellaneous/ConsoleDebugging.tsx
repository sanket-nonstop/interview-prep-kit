import { TopicLayout } from '@/components/TopicLayout';

const ConsoleDebugging = () => {
  return (
    <TopicLayout
      title="Console & Debugging"
      route="/miscellaneous/browser-tools/console"
      category="javascript"
      explanation="Browser DevTools console is essential for debugging. Beyond console.log, there are powerful methods for inspecting objects, measuring performance, and setting breakpoints."
      code={`// Basic logging
console.log('Simple message');
console.warn('Warning message');
console.error('Error message');

// Formatted output
console.table([{ name: 'John', age: 30 }, { name: 'Jane', age: 25 }]);

// Grouping
console.group('User Details');
console.log('Name: John');
console.log('Age: 30');
console.groupEnd();

// Timing
console.time('API Call');
await fetch('/api/data');
console.timeEnd('API Call'); // API Call: 234ms

// Assertions
console.assert(1 === 2, 'Values are not equal');

// Count occurrences
for (let i = 0; i < 5; i++) {
  console.count('Loop');
}

// Clear console
console.clear();

// Debugging with breakpoints
function calculateTotal(items) {
  debugger; // Execution pauses here
  return items.reduce((sum, item) => sum + item.price, 0);
}`}
      codeLanguage="javascript"
      whyItMatters="Efficient debugging saves hours of development time. Interviewers value developers who can quickly identify and fix issues using browser tools rather than relying solely on console.log."
      mistakes={[
        'Leaving console.log statements in production code',
        'Not using console.table for arrays/objects',
        'Ignoring browser breakpoints and debugger statement',
        'Not utilizing network tab to debug API calls',
      ]}
      practiceTask="Debug a function that's running slowly. Use console.time, console.trace, and breakpoints to identify the bottleneck."
    />
  );
};

export default ConsoleDebugging;
