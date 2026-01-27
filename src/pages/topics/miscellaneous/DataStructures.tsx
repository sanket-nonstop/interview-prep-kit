import { TopicLayout } from '@/components/TopicLayout';

export const LinkedLists = () => (
  <TopicLayout title="Linked Lists" route="/miscellaneous/data-structures/linked-lists" category="javascript"
    explanation="A linked list is a linear data structure where elements are stored in nodes, each pointing to the next. Unlike arrays, elements aren't stored contiguously in memory."
    code={`class Node { constructor(data) { this.data = data; this.next = null; } }
class LinkedList { constructor() { this.head = null; }
  append(data) { const node = new Node(data); if (!this.head) { this.head = node; return; }
    let current = this.head; while (current.next) current = current.next; current.next = node; }
  prepend(data) { const node = new Node(data); node.next = this.head; this.head = node; }
  find(data) { let current = this.head; while (current) { if (current.data === data) return current; current = current.next; } return null; }
  delete(data) { if (!this.head) return; if (this.head.data === data) { this.head = this.head.next; return; }
    let current = this.head; while (current.next) { if (current.next.data === data) { current.next = current.next.next; return; } current = current.next; } } }`}
    whyItMatters="Linked lists are common in interviews for testing pointer manipulation and understanding of dynamic memory allocation."
    mistakes={['Not handling null pointers', 'Losing reference to head', 'Forgetting edge cases (empty list, single node)']}
    practiceTask="Reverse a linked list in-place without using extra space." />
);

export const StacksQueues = () => (
  <TopicLayout title="Stacks & Queues" route="/miscellaneous/data-structures/stacks-queues" category="javascript"
    explanation="Stack (LIFO) and Queue (FIFO) are fundamental data structures. Stack: push/pop from top. Queue: enqueue at rear, dequeue from front."
    code={`class Stack { constructor() { this.items = []; } push(item) { this.items.push(item); } pop() { return this.items.pop(); } peek() { return this.items[this.items.length - 1]; } isEmpty() { return this.items.length === 0; } }
class Queue { constructor() { this.items = []; } enqueue(item) { this.items.push(item); } dequeue() { return this.items.shift(); } peek() { return this.items[0]; } isEmpty() { return this.items.length === 0; } }`}
    whyItMatters="Used in BFS/DFS algorithms, function call stack, task scheduling, and many real-world applications."
    mistakes={['Using array shift() for queue (O(n) - use two stacks instead)', 'Not checking for empty before pop/dequeue']}
    practiceTask="Implement a queue using two stacks." />
);

export const Trees = () => (
  <TopicLayout title="Trees & Binary Trees" route="/miscellaneous/data-structures/trees" category="javascript"
    explanation="A tree is a hierarchical data structure with a root node and child nodes. Binary tree: each node has at most 2 children."
    code={`class TreeNode { constructor(val) { this.val = val; this.left = null; this.right = null; } }
// Traversals
function inorder(root) { if (!root) return; inorder(root.left); console.log(root.val); inorder(root.right); }
function preorder(root) { if (!root) return; console.log(root.val); preorder(root.left); preorder(root.right); }
function postorder(root) { if (!root) return; postorder(root.left); postorder(root.right); console.log(root.val); }
function levelOrder(root) { if (!root) return; const queue = [root]; while (queue.length) { const node = queue.shift(); console.log(node.val); if (node.left) queue.push(node.left); if (node.right) queue.push(node.right); } }`}
    whyItMatters="Trees are everywhere: DOM, file systems, databases. Understanding traversals is crucial for interviews."
    mistakes={['Confusing inorder/preorder/postorder', 'Not handling null nodes', 'Stack overflow with deep recursion']}
    practiceTask="Find the maximum depth of a binary tree." />
);

export const HashTables = () => (
  <TopicLayout title="Hash Tables" route="/miscellaneous/data-structures/hash-tables" category="javascript"
    explanation="Hash tables store key-value pairs with O(1) average lookup time using a hash function to compute index."
    code={`// JavaScript Map is a hash table
const map = new Map();
map.set('key', 'value'); // O(1)
map.get('key'); // O(1)
map.has('key'); // O(1)
map.delete('key'); // O(1)

// Custom implementation
class HashTable { constructor(size = 53) { this.keyMap = new Array(size); }
  _hash(key) { let total = 0; for (let char of key) total = (total + char.charCodeAt(0)) % this.keyMap.length; return total; }
  set(key, value) { const index = this._hash(key); if (!this.keyMap[index]) this.keyMap[index] = []; this.keyMap[index].push([key, value]); }
  get(key) { const index = this._hash(key); if (this.keyMap[index]) { for (let [k, v] of this.keyMap[index]) if (k === key) return v; } return undefined; } }`}
    whyItMatters="Hash tables are the most common data structure for fast lookups. Used in caching, databases, and many algorithms."
    mistakes={['Not handling collisions', 'Poor hash function causing clustering', 'Forgetting about O(n) worst case']}
    practiceTask="Find the first non-repeating character in a string using a hash table." />
);

export const Graphs = () => (
  <TopicLayout title="Graphs" route="/miscellaneous/data-structures/graphs" category="javascript"
    explanation="A graph is a collection of nodes (vertices) connected by edges. Can be directed/undirected, weighted/unweighted."
    code={`// Adjacency List representation
class Graph { constructor() { this.adjacencyList = {}; }
  addVertex(vertex) { if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = []; }
  addEdge(v1, v2) { this.adjacencyList[v1].push(v2); this.adjacencyList[v2].push(v1); }
  // DFS
  dfs(start) { const result = []; const visited = {}; const adjacencyList = this.adjacencyList;
    (function dfsHelper(vertex) { if (!vertex) return; visited[vertex] = true; result.push(vertex);
      adjacencyList[vertex].forEach(neighbor => { if (!visited[neighbor]) dfsHelper(neighbor); }); })(start); return result; }
  // BFS
  bfs(start) { const queue = [start]; const result = []; const visited = {}; visited[start] = true;
    while (queue.length) { const vertex = queue.shift(); result.push(vertex);
      this.adjacencyList[vertex].forEach(neighbor => { if (!visited[neighbor]) { visited[neighbor] = true; queue.push(neighbor); } }); } return result; } }`}
    whyItMatters="Graphs model real-world problems: social networks, maps, dependencies. BFS/DFS are fundamental algorithms."
    mistakes={['Not marking nodes as visited (infinite loop)', 'Confusing BFS and DFS', 'Not handling disconnected graphs']}
    practiceTask="Find if there's a path between two nodes in a graph." />
);

export default { LinkedLists, StacksQueues, Trees, HashTables, Graphs };
