/**
 * TypeScript Iterators and Generators Examples
 * 
 * This file demonstrates:
 * - Iterables and the Iterable interface
 * - Symbol.iterator property
 * - for...of loops
 * - for...of vs for...in statements
 * - Built-in iterable types (Array, Map, Set, String, etc.)
 * - Custom iterable objects
 * - Generators (function* and yield)
 * - Iterator protocols
 */

// ============================================================================
// 1. ITERABLES AND SYMBOL.ITERATOR
// ============================================================================

/**
 * An object is deemed iterable if it has an implementation for the Symbol.iterator property.
 * Some built-in types like Array, Map, Set, String, Int32Array, Uint32Array, etc.
 * have their Symbol.iterator property already implemented.
 */

// Built-in iterable types
const iterableArray = [1, 2, 3, 4, 5];
const iterableString = "Hello";
const iterableSet = new Set(["a", "b", "c"]);
const iterableMap = new Map([
  ["key1", "value1"],
  ["key2", "value2"],
]);

// Checking if an object is iterable
function isIterable(obj: any): obj is Iterable<any> {
  return obj != null && typeof obj[Symbol.iterator] === "function";
}

console.log("=== ITERABLES AND SYMBOL.ITERATOR ===");
console.log("Array is iterable:", isIterable(iterableArray));
console.log("String is iterable:", isIterable(iterableString));
console.log("Set is iterable:", isIterable(iterableSet));
console.log("Map is iterable:", isIterable(iterableMap));
console.log("Object is iterable:", isIterable({})); // false

// ============================================================================
// 2. ITERABLE INTERFACE
// ============================================================================

/**
 * Iterable is a type we can use if we want to take in types that are iterable.
 * The Iterable<T> interface requires an object to have a Symbol.iterator method
 * that returns an Iterator<T>.
 */

// Function that accepts any iterable
function toArray<X>(xs: Iterable<X>): X[] {
  return [...xs];
}

// Using the function with different iterable types
const arrayFromArray = toArray([1, 2, 3]);
const arrayFromString = toArray("Hello");
const arrayFromSet = toArray(new Set([1, 2, 3]));
const arrayFromMap = toArray(new Map([["a", 1], ["b", 2]])); // Returns array of [key, value] pairs

console.log("\n=== ITERABLE INTERFACE ===");
console.log("Array from array:", arrayFromArray);
console.log("Array from string:", arrayFromString);
console.log("Array from Set:", arrayFromSet);
console.log("Array from Map:", arrayFromMap);

// ============================================================================
// 3. FOR...OF LOOPS
// ============================================================================

/**
 * for...of loops over an iterable object, invoking the Symbol.iterator property on the object.
 */

console.log("\n=== FOR...OF LOOPS ===");

// for...of on Array
let someArray = [1, "string", false];
console.log("for...of on array:");
for (let entry of someArray) {
  console.log(entry); // 1, "string", false
}

// for...of on String
console.log("\nfor...of on string:");
for (let char of "TypeScript") {
  console.log(char);
}

// for...of on Set
console.log("\nfor...of on Set:");
let pets = new Set(["Cat", "Dog", "Hamster"]);
for (let pet of pets) {
  console.log(pet); // "Cat", "Dog", "Hamster"
}

// for...of on Map
console.log("\nfor...of on Map:");
let userMap = new Map<string, string | number>([
  ["name", "John"],
  ["age", 30],
  ["city", "New York"],
]);
for (let [key, value] of userMap) {
  console.log(`${key}: ${value}`);
}

// for...of on Map entries, keys, values
console.log("\nMap entries:");
for (let entry of userMap.entries()) {
  console.log(entry);
}

console.log("\nMap keys:");
for (let key of userMap.keys()) {
  console.log(key);
}

console.log("\nMap values:");
for (let value of userMap.values()) {
  console.log(value);
}

// ============================================================================
// 4. FOR...OF VS FOR...IN
// ============================================================================

/**
 * Both for..of and for..in statements iterate over lists;
 * the values iterated on are different though:
 * - for..in returns a list of keys on the object being iterated
 * - for..of returns a list of values of the numeric properties of the object
 */

console.log("\n=== FOR...OF VS FOR...IN ===");

let list = [4, 5, 6];

console.log("for...in on array (returns indices):");
for (let i in list) {
  console.log(i); // "0", "1", "2"
  console.log(typeof i); // "string"
}

console.log("\nfor...of on array (returns values):");
for (let i of list) {
  console.log(i); // 4, 5, 6
  console.log(typeof i); // "number"
}

// Another distinction: for..in operates on any object
let petsWithProperty = new Set(["Cat", "Dog", "Hamster"]);
(petsWithProperty as any)["species"] = "mammals"; // Adding a property

console.log("\nfor...in on Set (returns property names):");
for (let pet in petsWithProperty) {
  console.log(pet); // "species" (only the property, not the Set values)
}

console.log("\nfor...of on Set (returns values):");
for (let pet of petsWithProperty) {
  console.log(pet); // "Cat", "Dog", "Hamster"
}

// for...in on object
let obj = { a: 1, b: 2, c: 3 };
console.log("\nfor...in on object:");
for (let key in obj) {
  console.log(`${key}: ${obj[key as keyof typeof obj]}`);
}

// Note: for...of doesn't work on plain objects (they're not iterable)
// Uncommenting the following would cause an error:
// for (let value of obj) {
//   console.log(value);
// }

// ============================================================================
// 5. CUSTOM ITERABLE OBJECTS
// ============================================================================

/**
 * Creating custom iterable objects by implementing Symbol.iterator
 */

console.log("\n=== CUSTOM ITERABLE OBJECTS ===");

// Custom Range class that implements Iterable
class Range implements Iterable<number> {
  constructor(
    private start: number,
    private end: number,
    private step: number = 1
  ) {}

  *[Symbol.iterator](): Iterator<number> {
    let current = this.start;
    while (current < this.end) {
      yield current;
      current += this.step;
    }
  }
}

// Using the custom Range
console.log("Custom Range(0, 5):");
for (let num of new Range(0, 5)) {
  console.log(num); // 0, 1, 2, 3, 4
}

console.log("\nCustom Range(0, 10, 2):");
for (let num of new Range(0, 10, 2)) {
  console.log(num); // 0, 2, 4, 6, 8
}

// Convert custom iterable to array
const rangeArray = [...new Range(0, 5)];
console.log("\nRange as array:", rangeArray);

// Custom Collection class
class Collection<T> implements Iterable<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  *[Symbol.iterator](): Iterator<T> {
    for (let item of this.items) {
      yield item;
    }
  }
}

const collection = new Collection<string>();
collection.add("first");
collection.add("second");
collection.add("third");

console.log("\nCustom Collection:");
for (let item of collection) {
  console.log(item);
}

// ============================================================================
// 6. ITERATOR PROTOCOL
// ============================================================================

/**
 * The Iterator protocol requires an object to have a next() method
 * that returns { value: T, done: boolean }
 */

console.log("\n=== ITERATOR PROTOCOL ===");

// Manual iteration using iterator
const array = [1, 2, 3];
const iterator = array[Symbol.iterator]();

console.log("Manual iteration:");
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: undefined, done: true }

// Custom iterator implementation
class Counter implements Iterable<number> {
  constructor(private max: number) {}

  [Symbol.iterator](): Iterator<number> {
    let count = 0;
    const max = this.max;

    return {
      next(): IteratorResult<number> {
        if (count < max) {
          return { value: count++, done: false };
        }
        return { value: undefined, done: true };
      },
    };
  }
}

console.log("\nCustom Counter iterator:");
for (let count of new Counter(5)) {
  console.log(count); // 0, 1, 2, 3, 4
}

// ============================================================================
// 7. GENERATORS
// ============================================================================

/**
 * Generators are functions that can be paused and resumed.
 * They use function* syntax and yield keyword.
 */

console.log("\n=== GENERATORS ===");

// Simple generator function
function* numberGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = numberGenerator();
console.log("Generator values:");
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }

// Generator with for...of
console.log("\nGenerator with for...of:");
for (let value of numberGenerator()) {
  console.log(value); // 1, 2, 3
}

// Infinite generator
function* infiniteSequence() {
  let i = 0;
  while (true) {
    yield i++;
  }
}

const infinite = infiniteSequence();
console.log("\nInfinite generator (first 5 values):");
for (let i = 0; i < 5; i++) {
  console.log(infinite.next().value);
}

// Generator with parameters
function* rangeGenerator(start: number, end: number, step: number = 1) {
  for (let i = start; i < end; i += step) {
    yield i;
  }
}

console.log("\nRange generator:");
for (let num of rangeGenerator(0, 10, 2)) {
  console.log(num); // 0, 2, 4, 6, 8
}

// Generator that yields other generators (delegation)
function* generator1() {
  yield 1;
  yield 2;
}

function* generator2() {
  yield* generator1();
  yield 3;
  yield 4;
}

console.log("\nGenerator delegation:");
for (let value of generator2()) {
  console.log(value); // 1, 2, 3, 4
}

// ============================================================================
// 8. GENERATOR METHODS IN CLASSES
// ============================================================================

console.log("\n=== GENERATOR METHODS IN CLASSES ===");

class NumberSequence {
  *fibonacci(max: number): Generator<number> {
    let a = 0,
      b = 1;
    while (a < max) {
      yield a;
      [a, b] = [b, a + b];
    }
  }

  *powersOfTwo(max: number): Generator<number> {
    let power = 1;
    while (power < max) {
      yield power;
      power *= 2;
    }
  }
}

const sequence = new NumberSequence();

console.log("Fibonacci sequence (first 10):");
let count = 0;
for (let fib of sequence.fibonacci(100)) {
  console.log(fib);
  if (++count >= 10) break;
}

console.log("\nPowers of 2 (first 8):");
count = 0;
for (let power of sequence.powersOfTwo(256)) {
  console.log(power);
  if (++count >= 8) break;
}

// ============================================================================
// 9. ITERATOR HELPERS
// ============================================================================

console.log("\n=== ITERATOR HELPERS ===");

// Using spread operator with iterables
const spreadArray = [...new Range(0, 5)];
console.log("Spread operator:", spreadArray);

// Using Array.from() with iterables
const fromArray = Array.from(new Range(0, 5));
console.log("Array.from():", fromArray);

// Using destructuring with iterables
const [first, second, third] = new Range(0, 5);
console.log("Destructuring:", first, second, third);

// Using with array methods
const doubled = Array.from(new Range(0, 5), (x) => x * 2);
console.log("Doubled range:", doubled);

// ============================================================================
// 10. PRACTICAL EXAMPLES
// ============================================================================

console.log("\n=== PRACTICAL EXAMPLES ===");

// Tree traversal using iterators
class TreeNode<T> {
  constructor(
    public value: T,
    public left: TreeNode<T> | null = null,
    public right: TreeNode<T> | null = null
  ) {}

  // In-order traversal generator
  *[Symbol.iterator](): Generator<T> {
    if (this.left) {
      yield* this.left;
    }
    yield this.value;
    if (this.right) {
      yield* this.right;
    }
  }
}

const tree = new TreeNode(
  4,
  new TreeNode(2, new TreeNode(1), new TreeNode(3)),
  new TreeNode(6, new TreeNode(5), new TreeNode(7))
);

console.log("Tree in-order traversal:");
for (let value of tree) {
  console.log(value); // 1, 2, 3, 4, 5, 6, 7
}

// Batch processing with generators
function* batchProcessor<T>(items: T[], batchSize: number): Generator<T[]> {
  for (let i = 0; i < items.length; i += batchSize) {
    yield items.slice(i, i + batchSize);
  }
}

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log("\nBatch processing (size 3):");
for (let batch of batchProcessor(items, 3)) {
  console.log("Batch:", batch);
}

// Filter generator
function* filter<T>(
  iterable: Iterable<T>,
  predicate: (item: T) => boolean
): Generator<T> {
  for (let item of iterable) {
    if (predicate(item)) {
      yield item;
    }
  }
}

console.log("\nFilter even numbers:");
for (let num of filter(new Range(0, 10), (n) => n % 2 === 0)) {
  console.log(num); // 0, 2, 4, 6, 8
}

// Map generator
function* map<T, U>(
  iterable: Iterable<T>,
  transform: (item: T) => U
): Generator<U> {
  for (let item of iterable) {
    yield transform(item);
  }
}

console.log("\nMap squares:");
for (let square of map(new Range(1, 6), (n) => n * n)) {
  console.log(square); // 1, 4, 9, 16, 25
}

// Take generator (limit items)
function* take<T>(iterable: Iterable<T>, count: number): Generator<T> {
  let taken = 0;
  for (let item of iterable) {
    if (taken >= count) break;
    yield item;
    taken++;
  }
}

console.log("\nTake first 5 from infinite sequence:");
for (let num of take(infiniteSequence(), 5)) {
  console.log(num); // 0, 1, 2, 3, 4
}

// ============================================================================
// 11. ASYNC ITERATORS AND GENERATORS
// ============================================================================

/**
 * Async iterators and generators work similarly but with async/await
 */

console.log("\n=== ASYNC ITERATORS AND GENERATORS ===");

// Async generator
async function* asyncNumberGenerator() {
  for (let i = 0; i < 5; i++) {
    // Simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 100));
    yield i;
  }
}

// Note: Async iterators may have type issues depending on TypeScript configuration
async function demonstrateAsyncGenerator() {
  console.log("Async generator:");
  const gen = asyncNumberGenerator();
  for await (let value of gen as any) {
    console.log(value);
  }
}
// Uncomment to run: demonstrateAsyncGenerator();

// Async iterable class
// Note: AsyncIterable requires ES2018+ types. Using type assertion for compatibility.
class AsyncRange {
  constructor(
    private start: number,
    private end: number,
    private step: number = 1
  ) {}

  // Using string literal for asyncIterator to avoid type issues
  async *["Symbol.asyncIterator" as any]() {
    for (let i = this.start; i < this.end; i += this.step) {
      await new Promise((resolve) => setTimeout(resolve, 50));
      yield i;
    }
  }
}

// Note: Async iterators require proper ES2018+ support
// This example demonstrates the concept but may have type issues in some configurations
async function demonstrateAsyncIterable() {
  console.log("\nAsync iterable:");
  const asyncRange = new AsyncRange(0, 5);
  // Using type assertion for for-await-of
  for await (let num of (asyncRange as any)) {
    console.log(num);
  }
}
// Uncomment to run: demonstrateAsyncIterable();

// ============================================================================
// 12. CODE GENERATION NOTES
// ============================================================================

/**
 * Code Generation:
 * 
 * Targeting ES5:
 * - Iterators are only allowed on values of Array type
 * - for..of loops on non-Array values will generate a simple for loop
 * - Example: for (let num of numbers) becomes:
 *   for (var _i = 0; _i < numbers.length; _i++) {
 *     var num = numbers[_i];
 *   }
 * 
 * Targeting ECMAScript 2015 and higher:
 * - The compiler will generate for..of loops to target the built-in iterator
 *   implementation in the engine
 * - Supports all iterable types (Array, Map, Set, String, custom iterables, etc.)
 */

console.log("\n=== CODE GENERATION NOTES ===");
console.log("Check tsconfig.json target setting:");
console.log("- ES5: Only Arrays supported in for...of");
console.log("- ES2015+: All iterable types supported");

// ============================================================================
// 13. SUMMARY
// ============================================================================

console.log("\n=== SUMMARY ===");
console.log("Key concepts demonstrated:");
console.log("1. Iterables and Symbol.iterator");
console.log("2. Iterable<T> interface");
console.log("3. for...of vs for...in");
console.log("4. Custom iterable objects");
console.log("5. Iterator protocol");
console.log("6. Generator functions (function*)");
console.log("7. Generator methods in classes");
console.log("8. Iterator helpers (spread, Array.from, destructuring)");
console.log("9. Practical examples (tree traversal, batch processing)");
console.log("10. Async iterators and generators");

export {};

