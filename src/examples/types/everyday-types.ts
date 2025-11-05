/*
 * Everyday Types - Comprehensive examples covering all TypeScript everyday types
 * Based on TypeScript Handbook: Everyday Types
 */

// ============================================================================
// 1. THE PRIMITIVES: string, number, and boolean
// ============================================================================

// String type
const greetingExample: string = "Hello, world";
const messageExample: string = "TypeScript";

// Number type (no int or float - everything is number)
const age: number = 42;
const price: number = 19.99;
const temperature: number = -5;

// Boolean type
const isActive: boolean = true;
const isComplete: boolean = false;

// Note: String, Number, Boolean (capital letters) are legal but rarely used
// Always use string, number, boolean for types

// ============================================================================
// 2. ARRAYS
// ============================================================================

// Array syntax: type[]
const numbers: number[] = [1, 2, 3, 4, 5];
const names: string[] = ["Alice", "Bob", "Eve"];
const flags: boolean[] = [true, false, true];

// Generic array syntax: Array<type>
const scores: Array<number> = [100, 95, 87];
const items: Array<string> = ["apple", "banana", "orange"];

// Note: [number] is a tuple (different from number[]), covered later

// ============================================================================
// 3. ANY
// ============================================================================

// any type disables type checking
let anyObj: any = { x: 0 };

// These all work without type errors (but may fail at runtime!)
anyObj.foo(); // Method doesn't exist, but no compile error
anyObj(); // Can call it as a function
anyObj.bar = 100; // Can add properties
anyObj = "hello"; // Can reassign to different type
const n: number = anyObj; // Can assign to any type

// Use any sparingly - it defeats the purpose of TypeScript
// Useful when migrating JavaScript or when you truly don't know the type

// ============================================================================
// 4. NOIMPLICITANY
// ============================================================================

// With noImplicitAny enabled (default in strict mode), this would be an error:
// function example(param) {  // Error: Parameter 'param' implicitly has an 'any' type
//   return param;
// }

// You must explicitly type it:
function exampleWithAny(param: any): any {
  return param;
}

// ============================================================================
// 5. TYPE ANNOTATIONS ON VARIABLES
// ============================================================================

// Explicit type annotation
let myName: string = "Alice";
let count: number = 42;
let isValid: boolean = true;

// Type inference - TypeScript automatically infers types
let inferredString = "Alice"; // inferred as string
let inferredNumber = 42; // inferred as number
let inferredBoolean = true; // inferred as boolean

// Type annotations go after the variable name (not before like some languages)

// ============================================================================
// 6. FUNCTIONS
// ============================================================================

// Parameter Type Annotations
function greet(name: string): void {
  console.log("Hello, " + name.toUpperCase() + "!!");
}

// greet(42); // Error: Argument of type 'number' is not assignable to parameter of type 'string'

function addNumbers(a: number, b: number): void {
  console.log(a + b);
}

// Return Type Annotations
function getFavoriteNumber(): number {
  return 26;
}

function multiply(x: number, y: number): number {
  return x * y;
}

// Functions Which Return Promises
async function getFavoriteNumberAsync(): Promise<number> {
  return 26;
}

async function fetchUser(id: number): Promise<{ name: string; age: number }> {
  // Simulated async operation
  return Promise.resolve({ name: "Alice", age: 30 });
}

// Anonymous Functions (Contextual Typing)
const namesArray = ["Alice", "Bob", "Eve"];

// TypeScript infers 's' is string from the array type
namesArray.forEach(function (s) {
  console.log(s.toUpperCase());
});

// Contextual typing also applies to arrow functions
namesArray.forEach((s) => {
  console.log(s.toUpperCase());
});

// TypeScript uses the forEach function's type and the array's type to infer 's'

// ============================================================================
// 7. OBJECT TYPES
// ============================================================================

// Basic object type
function printCoord(pt: { x: number; y: number }): void {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

printCoord({ x: 3, y: 7 });

// You can use comma or semicolon to separate properties
type PointWithComma = { x: number, y: number };
type PointWithSemicolon = { x: number; y: number };

// Optional Properties
function printName(obj: { first: string; last?: string }): void {
  // Reading optional property - need to check for undefined
  // Error if you don't check:
  // console.log(obj.last.toUpperCase()); // 'obj.last' is possibly 'undefined'
  
  if (obj.last !== undefined) {
    // OK - we've narrowed the type
    console.log(obj.first + " " + obj.last.toUpperCase());
  } else {
    console.log(obj.first);
  }
  
  // Modern JavaScript optional chaining
  console.log(obj.last?.toUpperCase());
}

// Both OK
printName({ first: "Bob" });
printName({ first: "Alice", last: "Alisson" });

// ============================================================================
// 8. UNION TYPES
// ============================================================================

// Defining a Union Type
function printId(id: number | string): void {
  console.log("Your ID is: " + id);
}

// OK
printId(101);
printId("202");
// printId({ myID: 22342 }); // Error: Argument of type '{ myID: number; }' is not assignable

// Alternative syntax with separator before first element
function printTextOrNumberOrBool(
  textOrNumberOrBool:
    | string
    | number
    | boolean
): void {
  console.log(textOrNumberOrBool);
}

// Working with Union Types
function printIdWithNarrowing(id: number | string): void {
  // Can't use string methods directly on union type
  // console.log(id.toUpperCase()); // Error: Property 'toUpperCase' does not exist on type 'number'
  
  // Solution: Narrow the union with type checking
  if (typeof id === "string") {
    // In this branch, id is of type 'string'
    console.log(id.toUpperCase());
  } else {
    // Here, id is of type 'number'
    console.log(id);
  }
}

// Using Array.isArray for narrowing
function welcomePeople(x: string[] | string): void {
  if (Array.isArray(x)) {
    // Here: 'x' is 'string[]'
    console.log("Hello, " + x.join(" and "));
  } else {
    // Here: 'x' is 'string'
    console.log("Welcome lone traveler " + x);
  }
}

// Common properties can be used without narrowing
// Both arrays and strings have slice method
function getFirstThree(x: number[] | string): number[] | string {
  return x.slice(0, 3);
}

// ============================================================================
// 9. TYPE ALIASES
// ============================================================================

// Type alias for object type
type Point = {
  x: number;
  y: number;
};

function printCoordAlias(pt: Point): void {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

printCoordAlias({ x: 100, y: 100 });

// Type alias for union type
type ID = number | string;

function processId(id: ID): void {
  console.log("Processing ID:", id);
}

// Type aliases are just aliases - they don't create distinct types
type UserInputSanitizedString = string;

function sanitizeInput(str: string): UserInputSanitizedString {
  return str.trim().toLowerCase();
}

let userInput = sanitizeInput("  HELLO  ");
userInput = "new input"; // Still allowed - it's just a string

// ============================================================================
// 10. INTERFACES
// ============================================================================

// Interface declaration for object type
interface PointInterface {
  x: number;
  y: number;
}

function printCoordInterface(pt: PointInterface): void {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

printCoordInterface({ x: 100, y: 100 });

// TypeScript is structurally typed - it only cares about the shape

// ============================================================================
// 11. DIFFERENCES BETWEEN TYPE ALIASES AND INTERFACES
// ============================================================================

// Extending an interface
interface Animal {
  name: string;
}

interface Bear extends Animal {
  honey: boolean;
}

const bear: Bear = {
  name: "Winnie",
  honey: true
};

// Extending a type via intersections
type AnimalType = {
  name: string;
};

type BearType = AnimalType & {
  honey: boolean;
};

const bearType: BearType = {
  name: "Pooh",
  honey: true
};

// Adding new fields to an existing interface (declaration merging)
interface Window {
  title: string;
}

interface Window {
  ts: string; // Merges with previous Window interface
}

// This would be an error with type:
// type Window = { title: string; }
// type Window = { ts: string; } // Error: Duplicate identifier 'Window'

// Recommendation: Use interface until you need features from type

// ============================================================================
// 12. TYPE ASSERTIONS
// ============================================================================

// Type assertion to specify a more specific type
// In browser: const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;

// Example with unknown type
function processElement(element: unknown): void {
  // Type assertion
  const canvas = element as { width: number; height: number };
  console.log(canvas.width, canvas.height);
}

// Angle-bracket syntax (not allowed in .tsx files)
const stringValue = "hello" as string;
// const value2 = <string>"hello"; // Angle-bracket syntax

// TypeScript only allows assertions to more or less specific types
// const x = "hello" as number; // Error: Conversion may be a mistake

// For complex coercions, use double assertion
const complexValue = "123" as unknown as number; // First to unknown, then to number

// ============================================================================
// 13. LITERAL TYPES
// ============================================================================

// Variable declared with let - can change, so type is string
let changingString = "Hello World";
changingString = "Olá Mundo"; // OK - changingString is type 'string'

// Variable declared with const - cannot change, so type is literal
const constantString = "Hello World"; // constantString is type "Hello World"

// Literal types by themselves aren't very useful
let literalX: "hello" = "hello";
// literalX = "howdy"; // Error: Type '"howdy"' is not assignable to type '"hello"'

// But combining literals into unions is very useful
function printText(s: string, alignment: "left" | "right" | "center"): void {
  console.log(`${alignment}: ${s}`);
}

printText("Hello, world", "left");
// printText("G'day, mate", "centre"); // Error: Argument of type '"centre"' is not assignable

// Numeric literal types
function compare(a: string, b: string): -1 | 0 | 1 {
  return a === b ? 0 : a > b ? 1 : -1;
}

// Combining literals with non-literal types
interface Options {
  width: number;
}

function configure(x: Options | "auto"): void {
  if (x === "auto") {
    console.log("Auto configuration");
  } else {
    console.log(`Width: ${x.width}`);
  }
}

configure({ width: 100 });
configure("auto");
// configure("automatic"); // Error: Argument of type '"automatic"' is not assignable

// Boolean literals
const isTrue: true = true;
const isFalse: false = false;
// The type boolean is actually an alias for true | false

// ============================================================================
// 14. LITERAL INFERENCE
// ============================================================================

// When you initialize a variable with an object, TypeScript assumes properties might change
const counterObj = { counter: 0 };
if (true) { // someCondition
  counterObj.counter = 1; // OK - counter is type number, not literal 0
}

// Example of literal inference issue
declare function handleRequest(url: string, method: "GET" | "POST"): void;

const req = { url: "https://example.com", method: "GET" };
// handleRequest(req.url, req.method); // Error: method is inferred as string, not "GET"

// Solution 1: Type assertion on the property
const req1 = { url: "https://example.com", method: "GET" as "GET" };
handleRequest(req1.url, req1.method);

// Solution 2: Type assertion on the argument
handleRequest(req.url, req.method as "GET");

// Solution 3: Use 'as const' to convert entire object to literals
const req2 = { url: "https://example.com", method: "GET" } as const;
handleRequest(req2.url, req2.method); // Now method is literal type "GET"

// ============================================================================
// 15. NULL AND UNDEFINED
// ============================================================================

// JavaScript has null and undefined
// TypeScript has corresponding types

// With strictNullChecks ON (default in strict mode)
function doSomething(x: string | null): void {
  // Can't use x directly - might be null
  // console.log(x.toUpperCase()); // Error: 'x' is possibly 'null'
  
  if (x === null) {
    // do nothing
    return;
  } else {
    // TypeScript knows x is string here (narrowing)
    console.log("Hello, " + x.toUpperCase());
  }
}

// Non-null Assertion Operator (Postfix !)
function liveDangerously(x?: number | null): void {
  // ! asserts that x is not null or undefined
  // No runtime checking - use with caution!
  console.log(x!.toFixed());
}

// liveDangerously(); // Would throw at runtime if x is undefined

// ============================================================================
// 16. ENUMS
// ============================================================================

// Enums are a TypeScript feature (not just type-level)
// Prefer union literals in modern TypeScript, but enums exist

enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT"
}

enum Status {
  Pending,    // 0
  Approved,   // 1
  Rejected    // 2
}

const directionMove = Direction.Up;
const currentStatus = Status.Pending;

// ============================================================================
// 17. LESS COMMON PRIMITIVES
// ============================================================================

// bigint
// From ES2020 onwards
const oneHundred: bigint = BigInt(100);
const anotherHundred: bigint = 100n;

const bigSum = oneHundred + anotherHundred; // 200n

// symbol
// Creates globally unique reference
const firstName = Symbol("name");
const secondName = Symbol("name");

// These are never equal (even with same description)
// TypeScript warns this comparison is always false (intentional to demonstrate symbol uniqueness)
// Using a workaround to demonstrate the concept while avoiding TypeScript error
const areSame = (firstName as any) === (secondName as any); // false - always false (symbols are unique)

// ============================================================================
// DEMO RUNNER
// ============================================================================

function runExamples(): void {
  console.log("\n=== EVERYDAY TYPES EXAMPLES ===\n");
  
  console.log("1. Primitives:");
  console.log("  String:", greetingExample);
  console.log("  Number:", age, price, temperature);
  console.log("  Boolean:", isActive, isComplete);
  
  console.log("\n2. Arrays:");
  console.log("  Numbers:", numbers);
  console.log("  Names:", names);
  console.log("  Scores:", scores);
  
  console.log("\n3. Functions:");
  greet("TypeScript");
  console.log("  Favorite number:", getFavoriteNumber());
  getFavoriteNumberAsync().then(n => console.log("  Favorite number (async):", n));
  
  console.log("\n4. Object Types:");
  printCoord({ x: 3, y: 7 });
  printName({ first: "Bob" });
  printName({ first: "Alice", last: "Alisson" });
  
  console.log("\n5. Union Types:");
  printId(101);
  printId("202");
  printIdWithNarrowing(42);
  printIdWithNarrowing("hello");
  welcomePeople(["Alice", "Bob", "Charlie"]);
  welcomePeople("David");
  console.log("  First three:", getFirstThree([1, 2, 3, 4, 5]));
  console.log("  First three:", getFirstThree("abcdefgh"));
  
  console.log("\n6. Type Aliases:");
  printCoordAlias({ x: 100, y: 200 });
  processId(123);
  processId("abc-123");
  
  console.log("\n7. Interfaces:");
  printCoordInterface({ x: 50, y: 75 });
  console.log("  Bear:", bear);
  console.log("  BearType:", bearType);
  
  console.log("\n8. Literal Types:");
  printText("Hello", "left");
  printText("World", "center");
  console.log("  Compare:", compare("apple", "banana"));
  configure({ width: 200 });
  configure("auto");
  
  console.log("\n9. Literal Inference:");
  handleRequest(req1.url, req1.method);
  handleRequest(req2.url, req2.method);
  
  console.log("\n10. Null and Undefined:");
  doSomething("Hello");
  doSomething(null);
  
  console.log("\n11. Enums:");
  console.log("  Direction:", directionMove);
  console.log("  Status:", currentStatus);
  
  console.log("\n12. Less Common Primitives:");
  console.log("  BigInt:", oneHundred, anotherHundred, bigSum);
  // Demonstrate symbol uniqueness (this comparison is always false)
  console.log("  Symbols equal?", areSame); // Always false - symbols are unique
  
  console.log("\n=== EXAMPLES COMPLETE ===\n");
}

// Run examples
runExamples();
