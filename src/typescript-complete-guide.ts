// ========================================
// TYPESCRIPT COMPLETE GUIDE
// ========================================
// This file contains comprehensive examples of all TypeScript features
// including threading, data structures, and advanced patterns.
// Each section is thoroughly commented for educational purposes.

// ========================================
// 1. BASIC TYPES AND VARIABLES
// ========================================

// Variable declarations with explicit types
let message: string = "Hello, TypeScript!";
const PI: number = 3.14159;
let isActive: boolean = true;
let bigIntValue: bigint = 100n;
let symbolValue: symbol = Symbol("unique");

// Type inference - TypeScript automatically infers types
let inferredString = "TypeScript infers this as string";
let inferredNumber = 42; // TypeScript infers this as number
let inferredBoolean = true; // TypeScript infers this as boolean

// Arrays with different syntax
let numberArray: number[] = [1, 2, 3, 4, 5];
let stringArray: Array<string> = ["apple", "banana", "cherry"];
let mixedArray: (string | number)[] = ["hello", 42, "world"];

// Tuples - fixed-length arrays with specific types
let tuple: [string, number, boolean] = ["hello", 42, true];
let optionalTuple: [string, number?] = ["hello"]; // Second element is optional

// ========================================
// 2. OBJECTS AND INTERFACES
// ========================================

// Basic object type annotation
let person: { name: string; age: number; email?: string } = {
    name: "John Doe",
    age: 30,
    email: "john@example.com"
};

// Interface definition - defines the shape of an object
interface User {
    id: number;
    name: string;
    email: string;
    isActive?: boolean; // Optional property
    readonly createdAt: Date; // Readonly property
}

// Interface implementation
let user: User = {
    id: 1,
    name: "Jane Smith",
    email: "jane@example.com",
    isActive: true,
    createdAt: new Date()
};

// Interface extension - inheritance
interface Employee extends User {
    department: string;
    salary: number;
    manager?: Employee; // Self-referencing optional property
}

let employee: Employee = {
    id: 2,
    name: "Bob Johnson",
    email: "bob@example.com",
    isActive: true,
    createdAt: new Date(),
    department: "Engineering",
    salary: 75000
};

// Interface with index signatures - allows additional properties
interface StringDictionary {
    [key: string]: string;
}

let colors: StringDictionary = {
    primary: "blue",
    secondary: "green",
    accent: "orange"
};

// ========================================
// 3. FUNCTIONS
// ========================================

// Basic function with type annotations
function greet(name: string): string {
    return `Hello, ${name}!`;
}

// Function with optional parameters
function createUser(name: string, email?: string): { name: string; email?: string } {
    return { name, email };
}

// Function with default parameters
function multiply(a: number, b: number = 1): number {
    return a * b;
}

// Function with rest parameters - collects remaining arguments into an array
function sum(...numbers: number[]): number {
    return numbers.reduce((total, num) => total + num, 0);
}

// Function overloads - multiple signatures for the same function
function processData(value: string): string;
function processData(value: number): number;
function processData(value: string | number): string | number {
    if (typeof value === "string") {
        return value.toUpperCase();
    } else {
        return value * 2;
    }
}

// Generic functions - work with any type
function identity<T>(arg: T): T {
    return arg;
}

function firstElement<T>(arr: T[]): T | undefined {
    return arr[0];
}

// Generic functions with constraints
interface Lengthwise {
    length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}

// Arrow functions
const greetArrow: (name: string) => string = (name: string): string => {
    return `Hello, ${name}!`;
};

// ========================================
// 4. CLASSES
// ========================================

// Basic class with access modifiers
class Animal {
    // Private property - only accessible within the class
    private id: number;
    
    // Protected property - accessible within class and subclasses
    protected name: string;
    
    // Public property - accessible from anywhere
    public age: number;
    
    // Readonly property - cannot be modified after initialization
    readonly species: string;

    constructor(name: string, age: number, species: string) {
        this.id = Math.floor(Math.random() * 1000);
        this.name = name;
        this.age = age;
        this.species = species;
    }

    // Public method
    public makeSound(): void {
        console.log("Some animal sound");
    }

    // Protected method - accessible within class and subclasses
    protected getAge(): number {
        return this.age;
    }

    // Private method - only accessible within the class
    private getId(): number {
        return this.id;
    }

    // Static method - belongs to the class, not instances
    static createAnimal(name: string, species: string): Animal {
        return new Animal(name, 0, species);
    }

    // Getter - computed property
    get fullInfo(): string {
        return `${this.name} is a ${this.age}-year-old ${this.species}`;
    }

    // Setter - property with custom assignment logic
    set updateAge(newAge: number) {
        if (newAge >= 0) {
            this.age = newAge;
        }
    }
}

// Class inheritance
class Dog extends Animal {
    private breed: string;

    constructor(name: string, age: number, breed: string) {
        super(name, age, "Canis familiaris"); // Call parent constructor
        this.breed = breed;
    }

    // Method override - replaces parent method
    public makeSound(): void {
        console.log("Woof! Woof!");
    }

    public getBreed(): string {
        return this.breed;
    }

    public getFullInfo(): string {
        return `${super.fullInfo} of breed ${this.breed}`;
    }
}

// Abstract class - cannot be instantiated directly
abstract class Vehicle {
    protected brand: string;
    protected model: string;
    protected year: number;

    constructor(brand: string, model: string, year: number) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }

    // Abstract method - must be implemented by subclasses
    abstract startEngine(): void;
    abstract stopEngine(): void;

    // Concrete method - has implementation
    public getInfo(): string {
        return `${this.year} ${this.brand} ${this.model}`;
    }
}

class Car extends Vehicle {
    private fuelType: string;
    private isRunning: boolean = false;

    constructor(brand: string, model: string, year: number, fuelType: string) {
        super(brand, model, year);
        this.fuelType = fuelType;
    }

    public startEngine(): void {
        this.isRunning = true;
        console.log(`${this.brand} engine started`);
    }

    public stopEngine(): void {
        this.isRunning = false;
        console.log(`${this.brand} engine stopped`);
    }

    public isEngineRunning(): boolean {
        return this.isRunning;
    }
}

// ========================================
// 5. GENERICS
// ========================================

// Generic class
class Container<T> {
    private items: T[] = [];

    public add(item: T): void {
        this.items.push(item);
    }

    public remove(item: T): void {
        const index = this.items.indexOf(item);
        if (index > -1) {
            this.items.splice(index, 1);
        }
    }

    public getAll(): T[] {
        return [...this.items];
    }

    public getCount(): number {
        return this.items.length;
    }
}

// Generic interface
interface Repository<T> {
    findById(id: number): T | undefined;
    save(item: T): void;
    delete(id: number): boolean;
    findAll(): T[];
}

// Generic function with multiple type parameters
function pair<T, U>(first: T, second: U): [T, U] {
    return [first, second];
}

// ========================================
// 6. UTILITY TYPES
// ========================================

// Partial<T> - makes all properties optional
type PartialUser = Partial<User>;

// Required<T> - makes all properties required
type RequiredUser = Required<User>;

// Readonly<T> - makes all properties readonly
type ReadonlyUser = Readonly<User>;

// Pick<T, K> - picks specific properties
type UserBasicInfo = Pick<User, 'id' | 'name' | 'email'>;

// Omit<T, K> - omits specific properties
type UserWithoutTimestamps = Omit<User, 'createdAt'>;

// Record<K, T> - creates object type with specific keys and values
type UserRoles = Record<string, User>;

// Exclude<T, U> - excludes types from union
type NonNullableUser = Exclude<User | null | undefined, null | undefined>;

// Extract<T, U> - extracts types from union
type StringOrNumber = Extract<string | number | boolean, string | number>;

// ReturnType<T> - gets return type of function
type GreetReturnType = ReturnType<typeof greet>;

// Parameters<T> - gets parameters of function
type GreetParameters = Parameters<typeof greet>;

// ========================================
// 7. CONDITIONAL TYPES
// ========================================

// Basic conditional type
type IsString<T> = T extends string ? true : false;

// Conditional type with inference
type ArrayElement<T> = T extends (infer U)[] ? U : never;

// Multiple conditions
type TypeName<T> = T extends string
    ? "string"
    : T extends number
    ? "number"
    : T extends boolean
    ? "boolean"
    : "object";

// Distributive conditional type
type ToArray<T> = T extends any ? T[] : never;

// Non-distributive conditional type
type ToArrayNonDist<T> = [T] extends [any] ? T[] : never;

// ========================================
// 8. MAPPED TYPES
// ========================================

// Basic mapped type
type Optional<T> = {
    [K in keyof T]?: T[K];
};

type Required<T> = {
    [K in keyof T]-?: T[K];
};

type Readonly<T> = {
    readonly [K in keyof T]: T[K];
};

// Mapped type with conditional
type ConditionalOptional<T> = {
    [K in keyof T]: T[K] extends string ? T[K] : T[K] | undefined;
};

// Mapped type with template literal
type EventHandlers<T> = {
    [K in keyof T as `on${Capitalize<string & K>}`]: (event: T[K]) => void;
};

// ========================================
// 9. TEMPLATE LITERAL TYPES
// ========================================

// Basic template literal type
type EmailLocale = "en" | "es" | "fr";
type EmailTemplate = `welcome_${EmailLocale}`;

// Template literal with inference
type ExtractRouteParams<T extends string> = T extends `${string}:${infer Param}/${infer Rest}`
    ? Param | ExtractRouteParams<Rest>
    : T extends `${string}:${infer Param}`
    ? Param
    : never;

// ========================================
// 10. TYPE GUARDS AND NARROWING
// ========================================

// Type guard functions
function isString(value: unknown): value is string {
    return typeof value === "string";
}

function isNumber(value: unknown): value is number {
    return typeof value === "number";
}

function isUser(obj: unknown): obj is User {
    return (
        typeof obj === "object" &&
        obj !== null &&
        "id" in obj &&
        "name" in obj &&
        "email" in obj
    );
}

// Control flow analysis
function processValue(value: unknown) {
    if (isString(value)) {
        // TypeScript knows value is string here
        console.log(value.toUpperCase());
    } else if (isNumber(value)) {
        // TypeScript knows value is number here
        console.log(value.toFixed(2));
    } else {
        console.log("Unknown type");
    }
}

// Discriminated unions
interface Circle {
    kind: "circle";
    radius: number;
}

interface Square {
    kind: "square";
    sideLength: number;
}

interface Triangle {
    kind: "triangle";
    base: number;
    height: number;
}

type Shape = Circle | Square | Triangle;

function getArea(shape: Shape): number {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "square":
            return shape.sideLength ** 2;
        case "triangle":
            return 0.5 * shape.base * shape.height;
        default:
            const _exhaustiveCheck: never = shape;
            return _exhaustiveCheck;
    }
}

// ========================================
// 11. ENUMS
// ========================================

// Numeric enum
enum Direction {
    North = 0,
    South = 1,
    East = 2,
    West = 3
}

// String enum
enum Color {
    Red = "red",
    Green = "green",
    Blue = "blue"
}

// Computed enum
enum FileAccess {
    None = 0,
    Read = 1 << 0,
    Write = 1 << 1,
    ReadWrite = Read | Write
}

// ========================================
// 12. NAMESPACES
// ========================================

namespace MathUtils {
    export function add(a: number, b: number): number {
        return a + b;
    }

    export function subtract(a: number, b: number): number {
        return a - b;
    }

    export const PI = 3.14159;
}

// ========================================
// 13. MODULES
// ========================================

// Named exports
export const VERSION = "1.0.0";

export function formatNumber(num: number, decimals: number = 2): string {
    return num.toFixed(decimals);
}

export interface Config {
    apiUrl: string;
    timeout: number;
    retries: number;
}

// Default export
export default class ApiClient {
    constructor(private config: Config) {}

    async fetch<T>(url: string): Promise<T> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({} as T);
            }, 100);
        });
    }
}

// ========================================
// 14. ASYNC/AWAIT AND PROMISES
// ========================================

// Async function
async function fetchUserData(id: number): Promise<User> {
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id,
                name: `User ${id}`,
                email: `user${id}@example.com`,
                isActive: true,
                createdAt: new Date()
            });
        }, 100);
    });
}

// Promise chaining
function fetchUserWithPosts(id: number): Promise<{ user: User; posts: any[] }> {
    return fetchUserData(id)
        .then(user => {
            return fetchUserPosts(id)
                .then(posts => ({ user, posts }));
        });
}

// Async/await version
async function fetchUserWithPostsAsync(id: number): Promise<{ user: User; posts: any[] }> {
    const user = await fetchUserData(id);
    const posts = await fetchUserPosts(id);
    return { user, posts };
}

// Helper function
async function fetchUserPosts(id: number): Promise<any[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, title: "Post 1", content: "Content 1" },
                { id: 2, title: "Post 2", content: "Content 2" }
            ]);
        }, 50);
    });
}

// ========================================
// 15. ITERATORS AND GENERATORS
// ========================================

// Generator function
function* numberGenerator(): Generator<number, void, unknown> {
    yield 1;
    yield 2;
    yield 3;
}

// Iterator interface
interface IterableCollection<T> {
    [Symbol.iterator](): Iterator<T>;
}

// Custom iterator
class NumberRange implements IterableCollection<number> {
    constructor(private start: number, private end: number) {}

    *[Symbol.iterator](): Iterator<number> {
        for (let i = this.start; i <= this.end; i++) {
            yield i;
        }
    }
}

// ========================================
// 16. THREADING AND CONCURRENCY
// ========================================

// Note: TypeScript/JavaScript is single-threaded, but we can simulate
// concurrent operations using async/await, Web Workers, and timers

// Simulating concurrent operations with Promise.all
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
}

// Simulate work with random delay
function simulateWork(taskName: string, baseDelay: number): Promise<string> {
    return new Promise((resolve) => {
        const delay = baseDelay + Math.random() * 500;
        setTimeout(() => {
            console.log(`${taskName} completed after ${Math.round(delay)}ms`);
            resolve(`${taskName} result`);
        }, delay);
    });
}

// Race condition simulation
async function raceConditionExample(): Promise<void> {
    console.log("\n=== RACE CONDITION EXAMPLE ===");
    
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
}

// Mutex-like pattern for shared resource access
class SharedResource {
    private isLocked = false;
    private queue: Array<() => void> = [];

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

    release(): void {
        if (this.queue.length > 0) {
            const next = this.queue.shift();
            if (next) next();
        } else {
            this.isLocked = false;
        }
    }
}

// Thread-safe counter using mutex pattern
class ThreadSafeCounter {
    private value = 0;
    private resource = new SharedResource();

    async increment(): Promise<number> {
        await this.resource.acquire();
        try {
            this.value++;
            return this.value;
        } finally {
            this.resource.release();
        }
    }

    async getValue(): Promise<number> {
        await this.resource.acquire();
        try {
            return this.value;
        } finally {
            this.resource.release();
        }
    }
}

// ========================================
// 17. DATA STRUCTURES
// ========================================

// Stack Implementation
class Stack<T> {
    private items: T[] = [];

    push(item: T): void {
        this.items.push(item);
    }

    pop(): T | undefined {
        return this.items.pop();
    }

    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }

    size(): number {
        return this.items.length;
    }

    clear(): void {
        this.items = [];
    }

    toArray(): T[] {
        return [...this.items];
    }
}

// Queue Implementation
class Queue<T> {
    private items: T[] = [];

    enqueue(item: T): void {
        this.items.push(item);
    }

    dequeue(): T | undefined {
        return this.items.shift();
    }

    front(): T | undefined {
        return this.items[0];
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }

    size(): number {
        return this.items.length;
    }

    clear(): void {
        this.items = [];
    }

    toArray(): T[] {
        return [...this.items];
    }
}

// Priority Queue Implementation
interface PriorityItem<T> {
    item: T;
    priority: number;
}

class PriorityQueue<T> {
    private items: PriorityItem<T>[] = [];

    enqueue(item: T, priority: number): void {
        const priorityItem: PriorityItem<T> = { item, priority };
        this.items.push(priorityItem);
        this.items.sort((a, b) => b.priority - a.priority);
    }

    dequeue(): T | undefined {
        return this.items.shift()?.item;
    }

    peek(): T | undefined {
        return this.items[0]?.item;
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }

    size(): number {
        return this.items.length;
    }

    toArray(): T[] {
        return this.items.map(item => item.item);
    }
}

// Linked List Implementation
class ListNode<T> {
    constructor(
        public data: T,
        public next: ListNode<T> | null = null
    ) {}
}

class LinkedList<T> {
    private head: ListNode<T> | null = null;
    private tail: ListNode<T> | null = null;
    private size = 0;

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

    prepend(data: T): void {
        const newNode = new ListNode(data, this.head);
        this.head = newNode;
        
        if (!this.tail) {
            this.tail = newNode;
        }
        
        this.size++;
    }

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

    toArray(): T[] {
        const result: T[] = [];
        let current = this.head;
        while (current) {
            result.push(current.data);
            current = current.next;
        }
        return result;
    }

    getSize(): number {
        return this.size;
    }

    isEmpty(): boolean {
        return this.size === 0;
    }
}

// Binary Tree Implementation
class TreeNode<T> {
    constructor(
        public data: T,
        public left: TreeNode<T> | null = null,
        public right: TreeNode<T> | null = null
    ) {}
}

class BinaryTree<T> {
    private root: TreeNode<T> | null = null;

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

// Hash Table Implementation
class HashTable<K, V> {
    private buckets: Array<Array<{ key: K; value: V }>>;
    private size: number;

    constructor(initialSize: number = 16) {
        this.buckets = new Array(initialSize).fill(null).map(() => []);
        this.size = 0;
    }

    private hash(key: K): number {
        const keyString = String(key);
        let hash = 0;
        for (let i = 0; i < keyString.length; i++) {
            hash = ((hash << 5) - hash + keyString.charCodeAt(i)) & 0xffffffff;
        }
        return Math.abs(hash) % this.buckets.length;
    }

    set(key: K, value: V): void {
        const index = this.hash(key);
        const bucket = this.buckets[index];
        
        const existingIndex = bucket.findIndex(item => item.key === key);
        if (existingIndex >= 0) {
            bucket[existingIndex].value = value;
        } else {
            bucket.push({ key, value });
            this.size++;
        }
    }

    get(key: K): V | undefined {
        const index = this.hash(key);
        const bucket = this.buckets[index];
        const item = bucket.find(item => item.key === key);
        return item?.value;
    }

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

    has(key: K): boolean {
        return this.get(key) !== undefined;
    }

    getSize(): number {
        return this.size;
    }

    clear(): void {
        this.buckets = new Array(this.buckets.length).fill(null).map(() => []);
        this.size = 0;
    }

    keys(): K[] {
        const keys: K[] = [];
        for (const bucket of this.buckets) {
            for (const item of bucket) {
                keys.push(item.key);
            }
        }
        return keys;
    }

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

// Graph Implementation
class Graph<T> {
    private adjacencyList: Map<T, T[]> = new Map();

    addVertex(vertex: T): void {
        if (!this.adjacencyList.has(vertex)) {
            this.adjacencyList.set(vertex, []);
        }
    }

    addEdge(vertex1: T, vertex2: T): void {
        this.addVertex(vertex1);
        this.addVertex(vertex2);
        
        this.adjacencyList.get(vertex1)!.push(vertex2);
        this.adjacencyList.get(vertex2)!.push(vertex1);
    }

    getNeighbors(vertex: T): T[] {
        return this.adjacencyList.get(vertex) || [];
    }

    getVertices(): T[] {
        return Array.from(this.adjacencyList.keys());
    }

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
// 18. ALGORITHMS AND SORTING
// ========================================

// Bubble Sort
function bubbleSort<T>(arr: T[]): T[] {
    const result = [...arr];
    const n = result.length;
    
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (result[j] > result[j + 1]) {
                [result[j], result[j + 1]] = [result[j + 1], result[j]];
            }
        }
    }
    
    return result;
}

// Quick Sort
function quickSort<T>(arr: T[]): T[] {
    if (arr.length <= 1) return arr;
    
    const pivot = arr[Math.floor(arr.length / 2)];
    const left = arr.filter(x => x < pivot);
    const middle = arr.filter(x => x === pivot);
    const right = arr.filter(x => x > pivot);
    
    return [...quickSort(left), ...middle, ...quickSort(right)];
}

// Merge Sort
function mergeSort<T>(arr: T[]): T[] {
    if (arr.length <= 1) return arr;
    
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    
    return merge(left, right);
}

function merge<T>(left: T[], right: T[]): T[] {
    const result: T[] = [];
    let i = 0, j = 0;
    
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }
    
    return result.concat(left.slice(i), right.slice(j));
}

// Binary Search
function binarySearch<T>(arr: T[], target: T): number {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}

// ========================================
// 19. DESIGN PATTERNS
// ========================================

// Singleton Pattern
class Singleton {
    private static instance: Singleton;
    private constructor() {}

    static getInstance(): Singleton {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }
}

// Factory Pattern
interface Product {
    name: string;
    price: number;
}

class ProductFactory {
    static createProduct(type: "basic" | "premium"): Product {
        switch (type) {
            case "basic":
                return { name: "Basic Product", price: 10 };
            case "premium":
                return { name: "Premium Product", price: 50 };
        }
    }
}

// Observer Pattern
interface Observer {
    update(data: any): void;
}

class Subject {
    private observers: Observer[] = [];

    attach(observer: Observer): void {
        this.observers.push(observer);
    }

    detach(observer: Observer): void {
        const index = this.observers.indexOf(observer);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    }

    notify(data: any): void {
        for (const observer of this.observers) {
            observer.update(data);
        }
    }
}

// Strategy Pattern
interface PaymentStrategy {
    pay(amount: number): void;
}

class CreditCardPayment implements PaymentStrategy {
    pay(amount: number): void {
        console.log(`Paid $${amount} using Credit Card`);
    }
}

class PayPalPayment implements PaymentStrategy {
    pay(amount: number): void {
        console.log(`Paid $${amount} using PayPal`);
    }
}

class PaymentProcessor {
    constructor(private strategy: PaymentStrategy) {}

    setStrategy(strategy: PaymentStrategy): void {
        this.strategy = strategy;
    }

    processPayment(amount: number): void {
        this.strategy.pay(amount);
    }
}

// ========================================
// 20. ERROR HANDLING
// ========================================

// Custom error classes
class ValidationError extends Error {
    constructor(message: string, public field: string) {
        super(message);
        this.name = "ValidationError";
    }
}

class NetworkError extends Error {
    constructor(message: string, public statusCode: number) {
        super(message);
        this.name = "NetworkError";
    }
}

// Error handling with try-catch
function safeDivide(a: number, b: number): number {
    try {
        if (b === 0) {
            throw new Error("Division by zero");
        }
        return a / b;
    } catch (error) {
        console.error("Error in safeDivide:", error);
        throw error;
    }
}

// Async error handling
async function fetchDataWithErrorHandling(url: string): Promise<any> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new NetworkError(`HTTP error! status: ${response.status}`, response.status);
        }
        return await response.json();
    } catch (error) {
        if (error instanceof NetworkError) {
            console.error(`Network error: ${error.message} (${error.statusCode})`);
        } else {
            console.error("Unexpected error:", error);
        }
        throw error;
    }
}

// ========================================
// DEMONSTRATION AND TESTING
// ========================================

console.log("=== TYPESCRIPT COMPLETE GUIDE DEMONSTRATION ===");

// Basic types demonstration
console.log("1. Basic Types:");
console.log("Message:", message);
console.log("PI:", PI);
console.log("Is active:", isActive);

// Functions demonstration
console.log("\n2. Functions:");
console.log("Greet:", greet("Alice"));
console.log("Create user:", createUser("Bob"));
console.log("Multiply:", multiply(5));
console.log("Sum:", sum(1, 2, 3, 4, 5));
console.log("Process data:", processData("hello"));

// Classes demonstration
console.log("\n3. Classes:");
const animal = new Animal("Buddy", 3, "Dog");
console.log("Animal info:", animal.fullInfo);
animal.makeSound();

const dog = new Dog("Rex", 2, "Golden Retriever");
console.log("Dog info:", dog.getFullInfo());
dog.makeSound();

const car = new Car("Toyota", "Camry", 2022, "Gasoline");
car.startEngine();
console.log("Car info:", car.getInfo());

// Generics demonstration
console.log("\n4. Generics:");
const numberContainer = new Container<number>();
numberContainer.add(1);
numberContainer.add(2);
numberContainer.add(3);
console.log("Number container:", numberContainer.getAll());

const stringContainer = new Container<string>();
stringContainer.add("hello");
stringContainer.add("world");
console.log("String container:", stringContainer.getAll());

// Utility types demonstration
console.log("\n5. Utility Types:");
const partialUser: PartialUser = { name: "John" };
console.log("Partial user:", partialUser);

// Type guards demonstration
console.log("\n6. Type Guards:");
const testValue = "hello";
if (isString(testValue)) {
    console.log("Is string:", testValue.toUpperCase());
}

// Discriminated unions demonstration
console.log("\n7. Discriminated Unions:");
const circle: Circle = { kind: "circle", radius: 5 };
const square: Square = { kind: "square", sideLength: 4 };
console.log("Circle area:", getArea(circle));
console.log("Square area:", getArea(square));

// Data structures demonstration
console.log("\n8. Data Structures:");

// Stack
const stack = new Stack<number>();
stack.push(1);
stack.push(2);
stack.push(3);
console.log("Stack pop:", stack.pop());
console.log("Stack peek:", stack.peek());

// Queue
const queue = new Queue<string>();
queue.enqueue("first");
queue.enqueue("second");
queue.enqueue("third");
console.log("Queue dequeue:", queue.dequeue());
console.log("Queue front:", queue.front());

// Priority Queue
const priorityQueue = new PriorityQueue<string>();
priorityQueue.enqueue("low priority", 1);
priorityQueue.enqueue("high priority", 3);
priorityQueue.enqueue("medium priority", 2);
console.log("Priority queue dequeue:", priorityQueue.dequeue());

// Linked List
const linkedList = new LinkedList<number>();
linkedList.append(1);
linkedList.append(2);
linkedList.append(3);
linkedList.prepend(0);
console.log("Linked list:", linkedList.toArray());

// Binary Tree
const binaryTree = new BinaryTree<number>();
binaryTree.insert(5);
binaryTree.insert(3);
binaryTree.insert(7);
binaryTree.insert(1);
binaryTree.insert(9);
console.log("Binary tree in-order:", binaryTree.inOrderTraversal());
console.log("Binary tree search 3:", binaryTree.search(3));

// Hash Table
const hashTable = new HashTable<string, number>();
hashTable.set("apple", 1);
hashTable.set("banana", 2);
hashTable.set("cherry", 3);
console.log("Hash table get apple:", hashTable.get("apple"));
console.log("Hash table keys:", hashTable.keys());

// Graph
const graph = new Graph<string>();
graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("B", "D");
graph.addEdge("C", "D");
console.log("Graph DFS from A:", graph.dfs("A"));
console.log("Graph BFS from A:", graph.bfs("A"));

// Algorithms demonstration
console.log("\n9. Algorithms:");
const unsortedArray = [64, 34, 25, 12, 22, 11, 90];
console.log("Original array:", unsortedArray);
console.log("Bubble sort:", bubbleSort([...unsortedArray]));
console.log("Quick sort:", quickSort([...unsortedArray]));
console.log("Merge sort:", mergeSort([...unsortedArray]));

const sortedArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log("Binary search for 7:", binarySearch(sortedArray, 7));

// Design patterns demonstration
console.log("\n10. Design Patterns:");

// Singleton
const singleton1 = Singleton.getInstance();
const singleton2 = Singleton.getInstance();
console.log("Singleton instances are same:", singleton1 === singleton2);

// Factory
const basicProduct = ProductFactory.createProduct("basic");
const premiumProduct = ProductFactory.createProduct("premium");
console.log("Basic product:", basicProduct);
console.log("Premium product:", premiumProduct);

// Strategy
const paymentProcessor = new PaymentProcessor(new CreditCardPayment());
paymentProcessor.processPayment(100);
paymentProcessor.setStrategy(new PayPalPayment());
paymentProcessor.processPayment(50);

// Threading demonstration
console.log("\n11. Threading and Concurrency:");
concurrentOperations().then(() => {
    console.log("Concurrent operations completed");
});

raceConditionExample().then(() => {
    console.log("Race condition example completed");
});

// Thread-safe counter demonstration
const threadSafeCounter = new ThreadSafeCounter();
Promise.all([
    threadSafeCounter.increment(),
    threadSafeCounter.increment(),
    threadSafeCounter.increment(),
    threadSafeCounter.increment(),
    threadSafeCounter.increment()
]).then(() => {
    threadSafeCounter.getValue().then(value => {
        console.log("Thread-safe counter final value:", value);
    });
});

console.log("\n=== END OF TYPESCRIPT COMPLETE GUIDE ===");
