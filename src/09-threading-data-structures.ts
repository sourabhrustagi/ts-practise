// ========================================
// THREADING AND DATA STRUCTURES IN TYPESCRIPT
// ========================================
// This file demonstrates threading patterns, concurrency, and data structures
// Note: TypeScript/JavaScript is single-threaded, but we can simulate
// concurrent operations using async/await, Web Workers, and timers

// ========================================
// 1. THREADING AND CONCURRENCY PATTERNS
// ========================================

/**
 * Simulates work with a random delay
 * @param taskName - Name of the task for logging
 * @param baseDelay - Base delay in milliseconds
 * @returns Promise that resolves with task result
 */
function simulateWork(taskName: string, baseDelay: number): Promise<string> {
    return new Promise((resolve) => {
        const delay = baseDelay + Math.random() * 500;
        setTimeout(() => {
            console.log(`${taskName} completed after ${Math.round(delay)}ms`);
            resolve(`${taskName} result`);
        }, delay);
    });
}

/**
 * Demonstrates concurrent operations using Promise.all
 * All tasks run simultaneously and we wait for all to complete
 */
async function concurrentOperations(): Promise<void> {
    console.log("=== CONCURRENT OPERATIONS ===");
    console.log("Starting concurrent operations...");
    
    const startTime = Date.now();
    
    // Run multiple async operations concurrently
    const results = await Promise.all([
        simulateWork("Task 1", 1000),
        simulateWork("Task 2", 1500),
        simulateWork("Task 3", 800),
        simulateWork("Task 4", 1200)
    ]);
    
    const endTime = Date.now();
    console.log(`All tasks completed in ${endTime - startTime}ms`);
    console.log("Results:", results);
    console.log("Note: Total time is less than sum of individual times due to concurrency");
}

/**
 * Demonstrates race condition with shared state
 * Multiple async operations modify the same variable concurrently
 */
async function raceConditionExample(): Promise<void> {
    console.log("\n=== RACE CONDITION EXAMPLE ===");
    console.log("Demonstrating race condition with shared state...");
    
    let counter = 0;
    
    // Simulate multiple async operations that modify shared state
    const promises = Array.from({ length: 10 }, async (_, i) => {
        await simulateWork(`Counter Update ${i}`, 100);
        counter++;
        return counter;
    });
    
    await Promise.all(promises);
    console.log(`Final counter value: ${counter}`);
    console.log("Expected: 10, Actual:", counter);
    console.log("Race condition may cause inconsistent results");
}

/**
 * Mutex-like pattern for shared resource access
 * Ensures only one operation can access a resource at a time
 */
class SharedResource {
    private isLocked = false;
    private queue: Array<() => void> = [];

    /**
     * Acquire the lock - wait if already locked
     */
    async acquire(): Promise<void> {
        return new Promise((resolve) => {
            if (!this.isLocked) {
                this.isLocked = true;
                resolve();
            } else {
                this.queue.push(resolve);
            }
        });
    }

    /**
     * Release the lock - allow next waiting operation to proceed
     */
    release(): void {
        if (this.queue.length > 0) {
            const next = this.queue.shift();
            if (next) next();
        } else {
            this.isLocked = false;
        }
    }
}

/**
 * Thread-safe counter using mutex pattern
 * Prevents race conditions when multiple operations modify the counter
 */
class ThreadSafeCounter {
    private value = 0;
    private resource = new SharedResource();

    /**
     * Safely increment the counter
     */
    async increment(): Promise<number> {
        await this.resource.acquire();
        try {
            this.value++;
            return this.value;
        } finally {
            this.resource.release();
        }
    }

    /**
     * Safely get the current counter value
     */
    async getValue(): Promise<number> {
        await this.resource.acquire();
        try {
            return this.value;
        } finally {
            this.resource.release();
        }
    }
}

/**
 * Demonstrates thread-safe counter vs unsafe counter
 */
async function threadSafetyComparison(): Promise<void> {
    console.log("\n=== THREAD SAFETY COMPARISON ===");
    
    // Unsafe counter
    let unsafeCounter = 0;
    const unsafePromises = Array.from({ length: 10 }, async () => {
        await simulateWork("Unsafe increment", 50);
        unsafeCounter++;
        return unsafeCounter;
    });
    
    // Safe counter
    const safeCounter = new ThreadSafeCounter();
    const safePromises = Array.from({ length: 10 }, async () => {
        await simulateWork("Safe increment", 50);
        return await safeCounter.increment();
    });
    
    await Promise.all([...unsafePromises, ...safePromises]);
    
    console.log(`Unsafe counter final value: ${unsafeCounter}`);
    console.log(`Safe counter final value: ${await safeCounter.getValue()}`);
    console.log("Expected: 10 for both");
}

/**
 * Demonstrates Promise.race - first to complete wins
 */
async function raceExample(): Promise<void> {
    console.log("\n=== PROMISE RACE EXAMPLE ===");
    
    const promises = [
        simulateWork("Fast task", 100),
        simulateWork("Medium task", 500),
        simulateWork("Slow task", 1000)
    ];
    
    const winner = await Promise.race(promises);
    console.log(`Winner: ${winner}`);
    console.log("Note: Other tasks continue running in background");
}

// ========================================
// 2. DATA STRUCTURES
// ========================================

/**
 * Stack Implementation
 * LIFO (Last In, First Out) data structure
 */
class Stack<T> {
    private items: T[] = [];

    /**
     * Add an item to the top of the stack
     */
    push(item: T): void {
        this.items.push(item);
    }

    /**
     * Remove and return the top item from the stack
     */
    pop(): T | undefined {
        return this.items.pop();
    }

    /**
     * View the top item without removing it
     */
    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }

    /**
     * Check if stack is empty
     */
    isEmpty(): boolean {
        return this.items.length === 0;
    }

    /**
     * Get the number of items in the stack
     */
    size(): number {
        return this.items.length;
    }

    /**
     * Remove all items from the stack
     */
    clear(): void {
        this.items = [];
    }

    /**
     * Convert stack to array for display
     */
    toArray(): T[] {
        return [...this.items];
    }
}

/**
 * Queue Implementation
 * FIFO (First In, First Out) data structure
 */
class Queue<T> {
    private items: T[] = [];

    /**
     * Add an item to the end of the queue
     */
    enqueue(item: T): void {
        this.items.push(item);
    }

    /**
     * Remove and return the first item from the queue
     */
    dequeue(): T | undefined {
        return this.items.shift();
    }

    /**
     * View the first item without removing it
     */
    front(): T | undefined {
        return this.items[0];
    }

    /**
     * Check if queue is empty
     */
    isEmpty(): boolean {
        return this.items.length === 0;
    }

    /**
     * Get the number of items in the queue
     */
    size(): number {
        return this.items.length;
    }

    /**
     * Remove all items from the queue
     */
    clear(): void {
        this.items = [];
    }

    /**
     * Convert queue to array for display
     */
    toArray(): T[] {
        return [...this.items];
    }
}

/**
 * Priority Queue Implementation
 * Items are dequeued based on priority (higher priority first)
 */
interface PriorityItem<T> {
    item: T;
    priority: number;
}

class PriorityQueue<T> {
    private items: PriorityItem<T>[] = [];

    /**
     * Add an item with a priority level
     */
    enqueue(item: T, priority: number): void {
        const priorityItem: PriorityItem<T> = { item, priority };
        this.items.push(priorityItem);
        // Sort by priority (higher priority first)
        this.items.sort((a, b) => b.priority - a.priority);
    }

    /**
     * Remove and return the highest priority item
     */
    dequeue(): T | undefined {
        return this.items.shift()?.item;
    }

    /**
     * View the highest priority item without removing it
     */
    peek(): T | undefined {
        return this.items[0]?.item;
    }

    /**
     * Check if priority queue is empty
     */
    isEmpty(): boolean {
        return this.items.length === 0;
    }

    /**
     * Get the number of items in the priority queue
     */
    size(): number {
        return this.items.length;
    }

    /**
     * Convert priority queue to array for display
     */
    toArray(): T[] {
        return this.items.map(item => item.item);
    }
}

/**
 * Linked List Node
 */
class ListNode<T> {
    constructor(
        public data: T,
        public next: ListNode<T> | null = null
    ) {}
}

/**
 * Linked List Implementation
 * Linear data structure with nodes pointing to next node
 */
class LinkedList<T> {
    private head: ListNode<T> | null = null;
    private tail: ListNode<T> | null = null;
    private size = 0;

    /**
     * Add an item to the end of the list
     */
    append(data: T): void {
        const newNode = new ListNode(data);
        
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail!.next = newNode;
            this.tail = newNode;
        }
        
        this.size++;
    }

    /**
     * Add an item to the beginning of the list
     */
    prepend(data: T): void {
        const newNode = new ListNode(data, this.head);
        this.head = newNode;
        
        if (!this.tail) {
            this.tail = newNode;
        }
        
        this.size++;
    }

    /**
     * Remove the first occurrence of an item
     */
    delete(data: T): boolean {
        if (!this.head) return false;

        if (this.head.data === data) {
            this.head = this.head.next;
            if (!this.head) this.tail = null;
            this.size--;
            return true;
        }

        let current = this.head;
        while (current.next) {
            if (current.next.data === data) {
                current.next = current.next.next;
                if (!current.next) this.tail = current;
                this.size--;
                return true;
            }
            current = current.next;
        }

        return false;
    }

    /**
     * Find the first occurrence of an item
     */
    find(data: T): ListNode<T> | null {
        let current = this.head;
        while (current) {
            if (current.data === data) {
                return current;
            }
            current = current.next;
        }
        return null;
    }

    /**
     * Convert linked list to array
     */
    toArray(): T[] {
        const result: T[] = [];
        let current = this.head;
        while (current) {
            result.push(current.data);
            current = current.next;
        }
        return result;
    }

    /**
     * Get the number of items in the list
     */
    getSize(): number {
        return this.size;
    }

    /**
     * Check if list is empty
     */
    isEmpty(): boolean {
        return this.size === 0;
    }
}

/**
 * Binary Tree Node
 */
class TreeNode<T> {
    constructor(
        public data: T,
        public left: TreeNode<T> | null = null,
        public right: TreeNode<T> | null = null
    ) {}
}

/**
 * Binary Tree Implementation
 * Hierarchical data structure with at most two children per node
 */
class BinaryTree<T> {
    private root: TreeNode<T> | null = null;

    /**
     * Insert a new node into the tree
     */
    insert(data: T): void {
        this.root = this.insertNode(this.root, data);
    }

    private insertNode(node: TreeNode<T> | null, data: T): TreeNode<T> {
        if (!node) {
            return new TreeNode(data);
        }

        if (data < node.data) {
            node.left = this.insertNode(node.left, data);
        } else if (data > node.data) {
            node.right = this.insertNode(node.right, data);
        }

        return node;
    }

    /**
     * In-order traversal (left, root, right)
     * Returns nodes in ascending order for BST
     */
    inOrderTraversal(): T[] {
        const result: T[] = [];
        this.inOrderHelper(this.root, result);
        return result;
    }

    private inOrderHelper(node: TreeNode<T> | null, result: T[]): void {
        if (node) {
            this.inOrderHelper(node.left, result);
            result.push(node.data);
            this.inOrderHelper(node.right, result);
        }
    }

    /**
     * Pre-order traversal (root, left, right)
     */
    preOrderTraversal(): T[] {
        const result: T[] = [];
        this.preOrderHelper(this.root, result);
        return result;
    }

    private preOrderHelper(node: TreeNode<T> | null, result: T[]): void {
        if (node) {
            result.push(node.data);
            this.preOrderHelper(node.left, result);
            this.preOrderHelper(node.right, result);
        }
    }

    /**
     * Post-order traversal (left, right, root)
     */
    postOrderTraversal(): T[] {
        const result: T[] = [];
        this.postOrderHelper(this.root, result);
        return result;
    }

    private postOrderHelper(node: TreeNode<T> | null, result: T[]): void {
        if (node) {
            this.postOrderHelper(node.left, result);
            this.postOrderHelper(node.right, result);
            result.push(node.data);
        }
    }

    /**
     * Search for a value in the tree
     */
    search(data: T): boolean {
        return this.searchNode(this.root, data);
    }

    private searchNode(node: TreeNode<T> | null, data: T): boolean {
        if (!node) return false;
        
        if (data === node.data) return true;
        
        if (data < node.data) {
            return this.searchNode(node.left, data);
        } else {
            return this.searchNode(node.right, data);
        }
    }
}

/**
 * Hash Table Implementation
 * Key-value storage with O(1) average lookup time
 */
class HashTable<K, V> {
    private buckets: Array<Array<{ key: K; value: V }>>;
    private size: number;

    constructor(initialSize: number = 16) {
        this.buckets = new Array(initialSize).fill(null).map(() => []);
        this.size = 0;
    }

    /**
     * Hash function to convert key to bucket index
     */
    private hash(key: K): number {
        const keyString = String(key);
        let hash = 0;
        for (let i = 0; i < keyString.length; i++) {
            hash = ((hash << 5) - hash + keyString.charCodeAt(i)) & 0xffffffff;
        }
        return Math.abs(hash) % this.buckets.length;
    }

    /**
     * Set a key-value pair
     */
    set(key: K, value: V): void {
        const index = this.hash(key);
        const bucket = this.buckets[index];
        
        // Check if key already exists
        const existingIndex = bucket.findIndex(item => item.key === key);
        if (existingIndex >= 0) {
            bucket[existingIndex].value = value;
        } else {
            bucket.push({ key, value });
            this.size++;
        }
    }

    /**
     * Get value by key
     */
    get(key: K): V | undefined {
        const index = this.hash(key);
        const bucket = this.buckets[index];
        const item = bucket.find(item => item.key === key);
        return item?.value;
    }

    /**
     * Remove a key-value pair
     */
    delete(key: K): boolean {
        const index = this.hash(key);
        const bucket = this.buckets[index];
        const itemIndex = bucket.findIndex(item => item.key === key);
        
        if (itemIndex >= 0) {
            bucket.splice(itemIndex, 1);
            this.size--;
            return true;
        }
        
        return false;
    }

    /**
     * Check if key exists
     */
    has(key: K): boolean {
        return this.get(key) !== undefined;
    }

    /**
     * Get the number of key-value pairs
     */
    getSize(): number {
        return this.size;
    }

    /**
     * Remove all key-value pairs
     */
    clear(): void {
        this.buckets = new Array(this.buckets.length).fill(null).map(() => []);
        this.size = 0;
    }

    /**
     * Get all keys
     */
    keys(): K[] {
        const keys: K[] = [];
        for (const bucket of this.buckets) {
            for (const item of bucket) {
                keys.push(item.key);
            }
        }
        return keys;
    }

    /**
     * Get all values
     */
    values(): V[] {
        const values: V[] = [];
        for (const bucket of this.buckets) {
            for (const item of bucket) {
                values.push(item.value);
            }
        }
        return values;
    }
}

/**
 * Graph Implementation
 * Collection of vertices connected by edges
 */
class Graph<T> {
    private adjacencyList: Map<T, T[]> = new Map();

    /**
     * Add a vertex to the graph
     */
    addVertex(vertex: T): void {
        if (!this.adjacencyList.has(vertex)) {
            this.adjacencyList.set(vertex, []);
        }
    }

    /**
     * Add an edge between two vertices (undirected graph)
     */
    addEdge(vertex1: T, vertex2: T): void {
        this.addVertex(vertex1);
        this.addVertex(vertex2);
        
        this.adjacencyList.get(vertex1)!.push(vertex2);
        this.adjacencyList.get(vertex2)!.push(vertex1); // Undirected graph
    }

    /**
     * Remove an edge between two vertices
     */
    removeEdge(vertex1: T, vertex2: T): void {
        const vertex1List = this.adjacencyList.get(vertex1);
        const vertex2List = this.adjacencyList.get(vertex2);
        
        if (vertex1List) {
            const index1 = vertex1List.indexOf(vertex2);
            if (index1 > -1) vertex1List.splice(index1, 1);
        }
        
        if (vertex2List) {
            const index2 = vertex2List.indexOf(vertex1);
            if (index2 > -1) vertex2List.splice(index2, 1);
        }
    }

    /**
     * Remove a vertex and all its edges
     */
    removeVertex(vertex: T): void {
        const neighbors = this.adjacencyList.get(vertex) || [];
        
        // Remove all edges to this vertex
        for (const neighbor of neighbors) {
            this.removeEdge(vertex, neighbor);
        }
        
        // Remove the vertex
        this.adjacencyList.delete(vertex);
    }

    /**
     * Get all neighbors of a vertex
     */
    getNeighbors(vertex: T): T[] {
        return this.adjacencyList.get(vertex) || [];
    }

    /**
     * Get all vertices in the graph
     */
    getVertices(): T[] {
        return Array.from(this.adjacencyList.keys());
    }

    /**
     * Depth-First Search traversal
     */
    dfs(startVertex: T): T[] {
        const visited = new Set<T>();
        const result: T[] = [];

        const dfsHelper = (vertex: T) => {
            if (visited.has(vertex)) return;
            
            visited.add(vertex);
            result.push(vertex);
            
            const neighbors = this.getNeighbors(vertex);
            for (const neighbor of neighbors) {
                dfsHelper(neighbor);
            }
        };

        dfsHelper(startVertex);
        return result;
    }

    /**
     * Breadth-First Search traversal
     */
    bfs(startVertex: T): T[] {
        const visited = new Set<T>();
        const result: T[] = [];
        const queue: T[] = [startVertex];
        visited.add(startVertex);

        while (queue.length > 0) {
            const vertex = queue.shift()!;
            result.push(vertex);

            const neighbors = this.getNeighbors(vertex);
            for (const neighbor of neighbors) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push(neighbor);
                }
            }
        }

        return result;
    }
}

// ========================================
// DEMONSTRATION
// ========================================

console.log("=== THREADING AND DATA STRUCTURES DEMONSTRATION ===");

// Threading demonstrations
concurrentOperations();
raceConditionExample();
threadSafetyComparison();
raceExample();

// Data structures demonstrations
console.log("\n=== DATA STRUCTURES DEMONSTRATION ===");

// Stack demonstration
console.log("\n1. Stack (LIFO):");
const stack = new Stack<number>();
stack.push(1);
stack.push(2);
stack.push(3);
console.log("Stack after pushing 1, 2, 3:", stack.toArray());
console.log("Stack pop:", stack.pop());
console.log("Stack peek:", stack.peek());
console.log("Stack after pop:", stack.toArray());

// Queue demonstration
console.log("\n2. Queue (FIFO):");
const queue = new Queue<string>();
queue.enqueue("first");
queue.enqueue("second");
queue.enqueue("third");
console.log("Queue after enqueuing:", queue.toArray());
console.log("Queue dequeue:", queue.dequeue());
console.log("Queue front:", queue.front());
console.log("Queue after dequeue:", queue.toArray());

// Priority Queue demonstration
console.log("\n3. Priority Queue:");
const priorityQueue = new PriorityQueue<string>();
priorityQueue.enqueue("low priority", 1);
priorityQueue.enqueue("high priority", 3);
priorityQueue.enqueue("medium priority", 2);
console.log("Priority queue:", priorityQueue.toArray());
console.log("Priority queue dequeue:", priorityQueue.dequeue());
console.log("Priority queue dequeue:", priorityQueue.dequeue());

// Linked List demonstration
console.log("\n4. Linked List:");
const linkedList = new LinkedList<number>();
linkedList.append(1);
linkedList.append(2);
linkedList.append(3);
linkedList.prepend(0);
console.log("Linked list:", linkedList.toArray());
console.log("Find 2:", linkedList.find(2)?.data);
linkedList.delete(2);
console.log("Linked list after deleting 2:", linkedList.toArray());

// Binary Tree demonstration
console.log("\n5. Binary Tree:");
const binaryTree = new BinaryTree<number>();
binaryTree.insert(5);
binaryTree.insert(3);
binaryTree.insert(7);
binaryTree.insert(1);
binaryTree.insert(9);
console.log("Binary tree in-order traversal:", binaryTree.inOrderTraversal());
console.log("Binary tree pre-order traversal:", binaryTree.preOrderTraversal());
console.log("Binary tree post-order traversal:", binaryTree.postOrderTraversal());
console.log("Search for 3:", binaryTree.search(3));
console.log("Search for 10:", binaryTree.search(10));

// Hash Table demonstration
console.log("\n6. Hash Table:");
const hashTable = new HashTable<string, number>();
hashTable.set("apple", 1);
hashTable.set("banana", 2);
hashTable.set("cherry", 3);
console.log("Hash table get apple:", hashTable.get("apple"));
console.log("Hash table has banana:", hashTable.has("banana"));
console.log("Hash table keys:", hashTable.keys());
console.log("Hash table values:", hashTable.values());
hashTable.delete("banana");
console.log("Hash table after deleting banana:", hashTable.keys());

// Graph demonstration
console.log("\n7. Graph:");
const graph = new Graph<string>();
graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("B", "D");
graph.addEdge("C", "D");
console.log("Graph vertices:", graph.getVertices());
console.log("Graph neighbors of A:", graph.getNeighbors("A"));
console.log("Graph DFS from A:", graph.dfs("A"));
console.log("Graph BFS from A:", graph.bfs("A"));

console.log("\n=== END OF THREADING AND DATA STRUCTURES DEMONSTRATION ===");


