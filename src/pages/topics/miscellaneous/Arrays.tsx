import { TopicLayout } from '@/components/TopicLayout';

const Arrays = () => {
  return (
    <TopicLayout
      title="Arrays"
      route="/miscellaneous/data-structures/arrays"
      category="javascript"
      explanation="Arrays are ordered collections that store multiple values. They're fundamental to programming and frequently tested in interviews for operations like searching, sorting, and manipulation."
      code={`// Common Array Operations
const arr = [1, 2, 3, 4, 5];

// Access: O(1)
console.log(arr[0]); // 1

// Insert at end: O(1)
arr.push(6); // [1, 2, 3, 4, 5, 6]

// Insert at start: O(n)
arr.unshift(0); // [0, 1, 2, 3, 4, 5, 6]

// Remove from end: O(1)
arr.pop(); // [0, 1, 2, 3, 4, 5]

// Remove from start: O(n)
arr.shift(); // [1, 2, 3, 4, 5]

// Find element: O(n)
const found = arr.find(x => x === 3); // 3

// Filter: O(n)
const evens = arr.filter(x => x % 2 === 0); // [2, 4]

// Map: O(n)
const doubled = arr.map(x => x * 2); // [2, 4, 6, 8, 10]

// Reduce: O(n)
const sum = arr.reduce((acc, x) => acc + x, 0); // 15`}
      codeLanguage="javascript"
      whyItMatters="Arrays are the most common data structure in interviews. Understanding time complexity of operations (access, insert, delete) is crucial. Interviewers test your ability to manipulate arrays efficiently."
      mistakes={[
        'Forgetting that unshift/shift are O(n) operations',
        'Not considering edge cases (empty array, single element)',
        'Mutating original array when immutability is needed',
        'Using nested loops unnecessarily (O(n²) instead of O(n))',
      ]}
      practiceTask="Write a function that removes duplicates from an array in O(n) time without using Set."
    />
  );
};

export default Arrays;
