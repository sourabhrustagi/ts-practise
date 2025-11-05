/**
 * Variable Declarations - Comprehensive examples
 * 
 * This file covers variable declarations in TypeScript:
 * - var declarations and their quirks
 * - let declarations (block scoping)
 * - const declarations
 * - Destructuring (arrays, tuples, objects)
 * - Spread operator
 * - using declarations (Explicit Resource Management)
 * - await using declarations
 * 
 * Based on TypeScript Handbook: Variable Declarations
 */

// ============================================================================
// VAR DECLARATIONS
// ============================================================================

// Basic var declaration
var a = 10;

// var inside function
function f() {
  var message = "Hello, world!";
  return message;
}

// var variable capturing - closure example
function createCounter() {
  var count = 0;
  return function increment() {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2

// Variable capturing in nested functions
function outerFunction() {
  var a = 1;
  a = 2;
  var b = innerFunction();
  a = 3;
  return b;

  function innerFunction() {
    return a; // Captures 'a' from outer scope
  }
}

console.log(outerFunction()); // returns 2

// ============================================================================
// VAR SCOPING RULES - Function Scoping
// ============================================================================

// var is function-scoped, not block-scoped
function fWithVar(shouldInitialize: boolean) {
  if (shouldInitialize) {
    var x = 10; // var is accessible throughout the function
  }
  return x; // Can access x even outside the if block
}

fWithVar(true); // returns 10
fWithVar(false); // returns undefined (x is declared but not initialized)

// Problem: var can be declared multiple times
function sumMatrix(matrix: number[][]) {
  var sum = 0;
  for (var i = 0; i < matrix.length; i++) {
    var currentRow = matrix[i];
    // Problem: inner loop uses same 'i' variable
    for (var i = 0; i < currentRow.length; i++) {
      sum += currentRow[i];
    }
  }
  return sum;
}

// This causes bugs because both loops share the same 'i'

// ============================================================================
// VAR VARIABLE CAPTURING QUIRKS
// ============================================================================

// Classic setTimeout problem with var
function demonstrateVarCapturing() {
  for (var i = 0; i < 10; i++) {
    setTimeout(function () {
      console.log(i); // All print 10, not 0-9
    }, 100 * i);
  }
}

// Workaround: Use IIFE (Immediately Invoked Function Expression)
function demonstrateIIFE() {
  for (var i = 0; i < 10; i++) {
    // Capture current state of 'i' by invoking a function
    (function (i) {
      setTimeout(function () {
        console.log(i); // Prints 0-9 correctly
      }, 100 * i);
    })(i);
  }
}

// ============================================================================
// LET DECLARATIONS - Block Scoping
// ============================================================================

// Basic let declaration
let hello = "Hello!";

// let is block-scoped (lexical scoping)
function fWithLet(input: boolean) {
  let a = 100;

  if (input) {
    // 'b' is only accessible within this if block
    let b = a + 1;
    return b;
  }

  // Error: 'b' doesn't exist here
  // return b; // Would cause compilation error
  return a;
}

// let in catch clause
try {
  throw "oh no!";
} catch (e) {
  console.log("Caught error:", e);
}
// Error: 'e' doesn't exist here
// console.log(e); // Would cause compilation error

// ============================================================================
// TEMPORAL DEAD ZONE
// ============================================================================

// Can't access let variable before declaration
// a++; // Error: illegal to use 'a' before it's declared
let a = 10;

// Can capture before declaration, but can't call before
function foo() {
  return a; // OK to capture
}

// foo(); // Error: illegal to call 'foo' before 'a' is declared
let a2 = 20;
foo(); // Now OK

// ============================================================================
// LET RE-DECLARATIONS AND SHADOWING
// ============================================================================

// Can't re-declare in same scope
let x = 10;
// let x = 20; // Error: can't re-declare 'x' in the same scope

// Can't mix let and var in same scope
function g() {
  let x = 100;
  // var x = 100; // Error: can't have both declarations of 'x'
}

// Shadowing - different scopes
function f(condition: boolean, x: number) {
  if (condition) {
    let x = 100; // Shadows parameter 'x'
    return x; // Returns 100
  }
  return x; // Returns parameter value
}

console.log(f(false, 0)); // returns 0
console.log(f(true, 0)); // returns 100

// Shadowing in loops - fixes the sumMatrix bug
function sumMatrixFixed(matrix: number[][]) {
  let sum = 0;
  for (let i = 0; i < matrix.length; i++) {
    let currentRow = matrix[i];
    // Inner loop's 'i' shadows outer 'i' - this is correct!
    for (let i = 0; i < currentRow.length; i++) {
      sum += currentRow[i];
    }
  }
  return sum;
}

// ============================================================================
// LET BLOCK-SCOPED VARIABLE CAPTURING
// ============================================================================

// Each iteration creates a new scope
function theCityThatAlwaysSleeps() {
  let getCity;
  if (true) {
    let city = "Seattle";
    getCity = function () {
      return city; // Captures 'city' from its environment
    };
  }
  return getCity(); // Can still access 'city' via closure
}

console.log(theCityThatAlwaysSleeps()); // "Seattle"

// let fixes the setTimeout problem
function demonstrateLetInLoop() {
  for (let i = 0; i < 10; i++) {
    setTimeout(function () {
      console.log(i); // Prints 0-9 correctly
    }, 100 * i);
  }
}

// let creates new scope per iteration
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100 * i);
}
// Prints: 0, 1, 2

// ============================================================================
// CONST DECLARATIONS
// ============================================================================

// Basic const declaration
const numLivesForCat = 9;

// const has same scoping rules as let
const maxUsers = 100;
// const maxUsers = 200; // Error: can't re-assign const

// const doesn't make objects immutable
const kitty = {
  name: "Aurora",
  numLives: numLivesForCat,
};

// Error: can't re-assign const variable
// kitty = {
//   name: "Danielle",
//   numLives: numLivesForCat,
// };

// But object properties can be modified
kitty.name = "Rory";
kitty.name = "Kitty";
kitty.name = "Cat";
kitty.numLives--;

// Array const
const numbers = [1, 2, 3];
// numbers = [4, 5, 6]; // Error: can't re-assign
numbers.push(4); // OK: can modify array contents
numbers[0] = 10; // OK: can modify array elements

// ============================================================================
// LET VS CONST
// ============================================================================

// Principle of least privilege: use const unless you need to reassign
const PI = 3.14159; // Use const for constants
const API_URL = "https://api.example.com"; // Use const for configuration

// Use let when you need to reassign
let counter = 0;
counter++; // Need let because value changes

let currentUser = null;
currentUser = { id: 1, name: "John" }; // Need let because it's reassigned

// ============================================================================
// DESTRUCTURING - ARRAY DESTRUCTURING
// ============================================================================

// Basic array destructuring
let input = [1, 2];
let [first, second] = input;
console.log(first); // outputs 1
console.log(second); // outputs 2

// Equivalent to:
// first = input[0];
// second = input[1];

// Destructuring with already-declared variables
let x1 = 1;
let y1 = 2;
[x1, y1] = [y1, x1]; // Swap variables
console.log(x1, y1); // 2, 1

// Destructuring function parameters
function fArray([first, second]: [number, number]) {
  console.log(first);
  console.log(second);
}
fArray([1, 2]);

// Rest in destructuring
let [firstItem, ...rest] = [1, 2, 3, 4];
console.log(firstItem); // outputs 1
console.log(rest); // outputs [2, 3, 4]

// Ignoring trailing elements
let [firstOnly] = [1, 2, 3, 4];
console.log(firstOnly); // outputs 1

// Ignoring specific elements
let [, secondItem, , fourthItem] = [1, 2, 3, 4];
console.log(secondItem); // outputs 2
console.log(fourthItem); // outputs 4

// ============================================================================
// TUPLE DESTRUCTURING
// ============================================================================

// Tuple destructuring
let tuple: [number, string, boolean] = [7, "hello", true];
let [a1, b1, c1] = tuple; // a: number, b: string, c: boolean

// Error: can't destructure beyond range
// let [a, b, c, d] = tuple; // Error: no element at index 3

// Rest with tuples
let [a2, ...bc] = tuple; // bc: [string, boolean]
let [a3, b3, c3, ...d] = tuple; // d: [], the empty tuple

// Ignoring tuple elements
let [a4] = tuple; // a: number
let [, b4] = tuple; // b: string

// ============================================================================
// OBJECT DESTRUCTURING
// ============================================================================

// Basic object destructuring
let o = {
  a: "foo",
  b: 12,
  c: "bar",
};

let { a, b } = o;
console.log(a); // "foo"
console.log(b); // 12

// Assignment without declaration
({ a, b } = { a: "baz", b: 101 });
// Note: Need parentheses when assignment without declaration

// Rest in object destructuring
let { a: a5, ...passthrough } = o;
let total = passthrough.b + passthrough.c.length;
console.log(total); // 15 (12 + 3)

// ============================================================================
// PROPERTY RENAMING
// ============================================================================

// Rename properties during destructuring
let { a: newName1, b: newName2 } = o;
// Read as: "a as newName1", "b as newName2"
console.log(newName1); // "foo"
console.log(newName2); // 12

// Type annotation with renaming
let { a: newName3, b: newName4 }: { a: string; b: number } = o;

// ============================================================================
// DEFAULT VALUES
// ============================================================================

// Default values in object destructuring
function keepWholeObject(wholeObject: { a: string; b?: number }) {
  let { a, b = 1001 } = wholeObject;
  console.log(a, b);
}

keepWholeObject({ a: "test" }); // "test", 1001
keepWholeObject({ a: "test", b: 50 }); // "test", 50

// ============================================================================
// FUNCTION DECLARATIONS WITH DESTRUCTURING
// ============================================================================

// Simple destructuring in function parameters
type C = { a: string; b?: number };
function fDestructured({ a, b }: C): void {
  console.log(a, b);
}

// Default values in function parameters
function fWithDefaults({ a = "", b = 0 } = {}): void {
  console.log(a, b);
}

fWithDefaults(); // "", 0
fWithDefaults({ a: "yes" }); // "yes", 0
fWithDefaults({ a: "yes", b: 10 }); // "yes", 10

// More complex default handling
function fComplex({ a, b = 0 } = { a: "" }): void {
  console.log(a, b);
}

fComplex({ a: "yes" }); // ok, default b = 0
fComplex(); // ok, default to { a: "" }, which then defaults b = 0
// fComplex({}); // error, 'a' is required if you supply an argument

// ============================================================================
// SPREAD OPERATOR
// ============================================================================

// Array spreading
let firstArray = [1, 2];
let secondArray = [3, 4];
let bothPlus = [0, ...firstArray, ...secondArray, 5];
console.log(bothPlus); // [0, 1, 2, 3, 4, 5]

// Spreading creates shallow copy
let original = [1, 2, 3];
let spread = [...original];
spread.push(4);
console.log(original); // [1, 2, 3] - unchanged
console.log(spread); // [1, 2, 3, 4]

// Object spreading
let defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
let search1 = { ...defaults, food: "rich" };
console.log(search1); // { food: "rich", price: "$$", ambiance: "noisy" }

// Later properties overwrite earlier ones
let search2 = { food: "rich", ...defaults };
console.log(search2); // { food: "spicy", price: "$$", ambiance: "noisy" }
// Note: defaults.food overwrites "rich"

// Spreading loses methods
class C {
  p = 12;
  m() {
    return "method";
  }
}

let c = new C();
let clone = { ...c };
console.log(clone.p); // ok: 12
// clone.m(); // error: method doesn't exist on clone

// ============================================================================
// USING DECLARATIONS - Explicit Resource Management
// ============================================================================

// Disposable interface (from TypeScript lib)
interface Disposable {
  [Symbol.dispose](): void;
}

// Example: TraceActivity implementing Disposable
class TraceActivity implements Disposable {
  readonly name: string;

  constructor(name: string) {
    this.name = name;
    console.log(`Entering: ${name}`);
  }

  [Symbol.dispose](): void {
    console.log(`Exiting: ${this.name}`);
  }
}

// Using declaration - automatically calls dispose
function fWithUsing() {
  using activity = new TraceActivity("f");
  console.log("Hello world!");
} // `activity[Symbol.dispose]()` is called automatically

// Equivalent to:
function fWithTryFinally() {
  const activity = new TraceActivity("f");
  try {
    console.log("Hello world!");
  } finally {
    activity[Symbol.dispose]();
  }
}

// Example: File resource
class FileHandle implements Disposable {
  private path: string;

  constructor(path: string) {
    this.path = path;
    console.log(`Opening file: ${path}`);
  }

  write(text: string): void {
    console.log(`Writing to ${this.path}: ${text}`);
  }

  [Symbol.dispose](): void {
    console.log(`Closing file: ${this.path}`);
  }
}

async function writeToFile() {
  {
    using file = new FileHandle("example.txt");
    file.write("Hello, world!");
    // File is automatically closed, even if an error is thrown
  }
}

// Using with null/undefined
function conditionalResource(condition: boolean) {
  {
    using x = condition ? new TraceActivity("conditional") : null;
    // If condition is false, nothing is disposed
    console.log("Working...");
  }
}

// ============================================================================
// AWAIT USING DECLARATIONS - Asynchronous Resource Management
// ============================================================================

// AsyncDisposable interface (from TypeScript lib)
interface AsyncDisposable {
  [Symbol.asyncDispose](): PromiseLike<void>;
}

// Example: Database Transaction
class DatabaseTransaction implements AsyncDisposable {
  public success = false;
  private db: any; // Simplified for example

  private constructor(db: any) {
    this.db = db;
    console.log("BEGIN TRANSACTION");
  }

  static async create(db: any): Promise<DatabaseTransaction> {
    await db.execAsync("BEGIN TRANSACTION");
    return new DatabaseTransaction(db);
  }

  async [Symbol.asyncDispose](): Promise<void> {
    if (this.db) {
      const db = this.db;
      this.db = undefined;
      if (this.success) {
        await db.execAsync("COMMIT TRANSACTION");
        console.log("COMMIT TRANSACTION");
      } else {
        await db.execAsync("ROLLBACK TRANSACTION");
        console.log("ROLLBACK TRANSACTION");
      }
    }
  }
}

// Example: Using await using
async function transferExample() {
  const db = {}; // Mock database
  await using tx = await DatabaseTransaction.create(db);
  
  // Perform operations
  console.log("Transferring funds...");
  
  // If an exception is thrown before this line, transaction will roll back
  tx.success = true;
  // Now the transaction will commit
}

// await using vs await
async function demonstrateAwaitUsing() {
  // await only affects disposal, not the value itself
  {
    await using x = getResourceSynchronously();
    // performs `await x[Symbol.asyncDispose]()` on exit
  }

  {
    await using y = await getResourceAsynchronously();
    // performs `await y[Symbol.asyncDispose]()` on exit
  }
}

function getResourceSynchronously(): any {
  return { [Symbol.asyncDispose]: async () => {} };
}

async function getResourceAsynchronously(): Promise<any> {
  return { [Symbol.asyncDispose]: async () => {} };
}

// ============================================================================
// USING IN FOR AND FOR..OF STATEMENTS
// ============================================================================

// Using in for loop
class ResourceReader {
  private index = 0;
  private data = [1, 2, 3, 4, 5];

  get eof(): boolean {
    return this.index >= this.data.length;
  }

  next(): void {
    this.index++;
  }

  read(): number {
    return this.data[this.index];
  }

  [Symbol.dispose](): void {
    console.log("Reader disposed");
  }
}

function getReader(): ResourceReader {
  return new ResourceReader();
}

// Using in for statement
function forWithUsing() {
  for (using x = getReader(); !x.eof; x.next()) {
    console.log(x.read());
  }
  // x is disposed when loop exits
}

// Using in for..of statement
function* createResources() {
  yield new TraceActivity("Resource 1");
  yield new TraceActivity("Resource 2");
  yield new TraceActivity("Resource 3");
}

function forOfWithUsing() {
  for (using x of createResources()) {
    // x is disposed at end of each iteration
    console.log(`Using resource: ${x.name}`);
  }
}

// ============================================================================
// PRACTICAL EXAMPLES
// ============================================================================

// Example: Configuration with defaults
function createConfig(userConfig: Partial<Config> = {}): Config {
  const defaults: Config = {
    apiUrl: "https://api.example.com",
    timeout: 5000,
    retries: 3,
  };

  return { ...defaults, ...userConfig };
}

interface Config {
  apiUrl: string;
  timeout: number;
  retries: number;
}

// Example: Rest parameters with destructuring
function processUser({ id, name, email, ...metadata }: User & Record<string, any>) {
  console.log(`Processing user ${id}: ${name} (${email})`);
  console.log("Additional metadata:", metadata);
}

interface User {
  id: number;
  name: string;
  email: string;
}

// Example: Swap variables
function swap<T>(a: T, b: T): [T, T] {
  return [b, a];
}

let value1 = 10;
let value2 = 20;
[value1, value2] = swap(value1, value2);
console.log(value1, value2); // 20, 10

// ============================================================================
// BEST PRACTICES
// ============================================================================

/*
1. Prefer const over let, use let only when reassignment is needed
2. Avoid var - use let or const instead
3. Use block scoping (let/const) to avoid variable leakage
4. Be careful with destructuring - keep it simple and readable
5. Use spread operator for shallow copying
6. Use using/await using for resource management
7. Remember that const doesn't make objects immutable
8. Use destructuring for cleaner function parameters
9. Be aware of shadowing - can cause confusion
10. Use default values in destructuring to handle optional properties
*/

export {};

