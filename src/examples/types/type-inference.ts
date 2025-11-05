/**
 * TypeScript Type Inference Examples
 * 
 * Comprehensive examples covering TypeScript's type inference features:
 * 
 * Type Inference Basics:
 * - Variable initialization
 * - Member initialization
 * - Parameter default values
 * - Function return types
 * 
 * Best Common Type:
 * - Inference from multiple expressions
 * - Union types from candidates
 * - Super type inference
 * 
 * Contextual Typing:
 * - Function expressions
 * - Callbacks
 * - Object and array literals
 * - Return statements
 */

// ============================================================================
// 1. Basic Type Inference - Variables
// ============================================================================

// Type is inferred from the initial value
let x = 3;
// let x: number

let y = "hello";
// let y: string

let z = true;
// let z: boolean

// Inference works with complex types
let array = [1, 2, 3];
// let array: number[]

let object = { name: "John", age: 30 };
// let object: { name: string; age: number }

// ============================================================================
// 2. Basic Type Inference - Members
// ============================================================================

class MyClass {
  // Types are inferred from initializers
  count = 0; // number
  name = "default"; // string
  items = [1, 2, 3]; // number[]
  active = true; // boolean
}

const instance = new MyClass();
// instance.count: number
// instance.name: string
// instance.items: number[]
// instance.active: boolean

// ============================================================================
// 3. Basic Type Inference - Parameter Default Values
// ============================================================================

// Parameter type is inferred from default value
function greet(name = "World") {
  // name: string
  return `Hello, ${name}!`;
}

// When called without argument, name is "World" (string)
greet(); // "Hello, World!"
// When called with argument, name is the provided string
greet("Alice"); // "Hello, Alice!"

// Multiple parameters with defaults
function createUser(name = "User", age = 0, active = true) {
  return { name, age, active };
}
// Parameters inferred as: name: string, age: number, active: boolean

// ============================================================================
// 4. Basic Type Inference - Function Return Types
// ============================================================================

// Return type is inferred from the return statement
function add(a: number, b: number) {
  return a + b; // inferred return type: number
}

function getMessage() {
  return "Hello"; // inferred return type: string
}

function isActive() {
  return true; // inferred return type: boolean
}

// Complex return types
function getData() {
  return {
    id: 1,
    name: "Test",
    values: [1, 2, 3]
  };
}
// Inferred return type: { id: number; name: string; values: number[] }

// ============================================================================
// 5. Best Common Type - Simple Cases
// ============================================================================

// TypeScript infers the best common type from array elements
let numbers = [0, 1, 2, 3];
// let numbers: number[]

let mixed = [0, 1, null];
// let mixed: (number | null)[]

let moreMixed = [0, 1, null, undefined];
// let moreMixed: (number | null | undefined)[]

let strings = ["a", "b", "c"];
// let strings: string[]

let bools = [true, false, true];
// let bools: boolean[]

// ============================================================================
// 6. Best Common Type - With Classes
// ============================================================================

// Base class
class Animal {
  name: string;
  
  constructor(name: string) {
    this.name = name;
  }
  
  move() {
    console.log(`${this.name} is moving`);
  }
}

class Rhino extends Animal {
  hornLength: number;
  
  constructor() {
    super("Rhino");
    this.hornLength = 1;
  }
}

class Elephant extends Animal {
  trunkLength: number;
  
  constructor() {
    super("Elephant");
    this.trunkLength = 2;
  }
}

class Snake extends Animal {
  length: number;
  
  constructor() {
    super("Snake");
    this.length = 3;
  }
}

// Best common type example
let zoo = [new Rhino(), new Elephant(), new Snake()];
// let zoo: (Rhino | Elephant | Snake)[]

// No single super type found in the array, so union type is inferred
// If we want Animal[], we need to explicitly type it:
let zooTyped: Animal[] = [new Rhino(), new Elephant(), new Snake()];
// let zooTyped: Animal[]

// ============================================================================
// 7. Best Common Type - With Functions
// ============================================================================

// When returning arrays, best common type considers the return context
function createZoo(): Animal[] {
  return [new Rhino(), new Elephant(), new Snake()];
}
// The return type annotation helps TypeScript infer Animal as the common type
// In this case, Animal is chosen because it's the super type

// Without explicit return type, union type is inferred
function createZooWithoutType() {
  return [new Rhino(), new Elephant(), new Snake()];
}
// Inferred return type: (Rhino | Elephant | Snake)[]

// ============================================================================
// 8. Best Common Type - With Interfaces
// ============================================================================

interface Point {
  x: number;
  y: number;
}

interface Point3D extends Point {
  z: number;
}

// Best common type finds the common structure
let points = [
  { x: 0, y: 0 },
  { x: 1, y: 1, z: 1 }
];
// Inferred type: ({ x: number; y: number; z?: number })[]

// With explicit types
let pointsTyped: Point[] = [
  { x: 0, y: 0 },
  { x: 1, y: 1 }
];

// ============================================================================
// 9. Contextual Typing - Function Expressions
// ============================================================================

// Contextual typing from function assignment
window.onmousedown = function (mouseEvent) {
  // mouseEvent is contextually typed as MouseEvent
  console.log(mouseEvent.button);
  // console.log(mouseEvent.kangaroo); // Error: Property 'kangaroo' does not exist
};

// Contextual typing from window.onscroll
window.onscroll = function (uiEvent) {
  // uiEvent is contextually typed as UIEvent (not MouseEvent)
  // console.log(uiEvent.button); // Error: Property 'button' does not exist on type 'Event'
  console.log(uiEvent.type); // OK: UIEvent has 'type' property
};

// Without contextual typing, parameter would be 'any'
const handler = function (uiEvent) {
  // uiEvent: any (no contextual type)
  console.log(uiEvent.button); // No error without noImplicitAny
  console.log(uiEvent.anything); // Also no error
};

// Explicit type overrides contextual type
window.onscroll = function (uiEvent: any) {
  // Explicitly typed as any, overrides contextual UIEvent type
  console.log(uiEvent.button); // No error, but will be undefined at runtime
};

// ============================================================================
// 10. Contextual Typing - Callbacks
// ============================================================================

// Array methods with contextual typing
const numbersArray = [1, 2, 3, 4, 5];

// map callback parameter is contextually typed
const doubled = numbersArray.map(function (num) {
  // num is contextually typed as number
  return num * 2;
});

// Arrow function with contextual typing
const tripled = numbersArray.map((num) => {
  // num is contextually typed as number
  return num * 3;
});

// filter with contextual typing
const evens = numbersArray.filter(function (num) {
  // num is contextually typed as number
  return num % 2 === 0;
});

// forEach with contextual typing
numbersArray.forEach(function (num, index) {
  // num: number, index: number
  console.log(`Index ${index}: ${num}`);
});

// ============================================================================
// 11. Contextual Typing - Object Literals
// ============================================================================

interface User {
  name: string;
  age: number;
  email?: string;
}

// Object literal is contextually typed by the variable type
const user: User = {
  name: "John",
  age: 30,
  // email is optional, so it can be omitted
};

// Function parameter with contextual typing
function processUser(user: User) {
  console.log(user.name);
}

// Object literal passed to function is contextually typed
processUser({
  name: "Alice",
  age: 25,
  // TypeScript knows this must match User interface
});

// ============================================================================
// 12. Contextual Typing - Array Literals
// ============================================================================

// Array literal contextually typed by function parameter
function processNumbers(numbers: number[]) {
  return numbers.map((n) => n * 2);
}

// Array literal is contextually typed as number[]
processNumbers([1, 2, 3, 4, 5]);

// Array literal contextually typed by variable
const numberArray: number[] = [1, 2, 3];
// Each element is contextually typed as number

// ============================================================================
// 13. Contextual Typing - Type Assertions
// ============================================================================

// Type assertion provides contextual type
const value = "hello" as string;
// value is contextually typed as string

interface ApiResponse {
  data: string;
  status: number;
}

const response = {
  data: "success",
  status: 200
} as ApiResponse;
// Object literal is contextually typed by the assertion

// ============================================================================
// 14. Contextual Typing - Return Statements
// ============================================================================

// Return statement contextually typed by function return type
function createPoint(): Point {
  return {
    x: 0,
    y: 0
    // TypeScript knows this must match Point interface
  };
}

function createPoint3D(): Point3D {
  return {
    x: 0,
    y: 0,
    z: 0
    // TypeScript knows this must match Point3D interface
  };
}

// ============================================================================
// 15. Contextual Typing - Multiple Contexts
// ============================================================================

// Contextual type acts as candidate in best common type
function createAnimalArray(): Animal[] {
  return [
    new Rhino(),
    new Elephant(),
    new Snake()
    // Contextual type (Animal[]) helps inference choose Animal as common type
  ];
}

// Without contextual type, union type is inferred
function createAnimalArrayWithoutType() {
  return [
    new Rhino(),
    new Elephant(),
    new Snake()
    // No contextual type, so (Rhino | Elephant | Snake)[] is inferred
  ];
}

// ============================================================================
// 16. Inference with Generics
// ============================================================================

// Generic type inference from arguments
function identity<T>(arg: T): T {
  return arg;
}

// Type is inferred from argument
const str = identity("hello"); // T inferred as string
const num = identity(42); // T inferred as number
const bool = identity(true); // T inferred as boolean

// Multiple generic parameters
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const stringNumberPair = pair("hello", 42);
// Inferred as: [string, number]

const numberBooleanPair = pair(10, true);
// Inferred as: [number, boolean]

// ============================================================================
// 17. Inference with Complex Types
// ============================================================================

// Inference with nested structures
function createNested() {
  return {
    user: {
      name: "John",
      age: 30,
      address: {
        street: "123 Main St",
        city: "New York"
      }
    },
    items: [1, 2, 3],
    active: true
  };
}

// Inferred return type:
// {
//   user: {
//     name: string;
//     age: number;
//     address: {
//       street: string;
//       city: string;
//     };
//   };
//   items: number[];
//   active: boolean;
// }

// ============================================================================
// 18. Inference with Conditional Logic
// ============================================================================

function processValue(value: number | string) {
  if (typeof value === "number") {
    return value * 2; // inferred return: number
  } else {
    return value.toUpperCase(); // inferred return: string
  }
  // Overall inferred return type: number | string
}

// ============================================================================
// 19. Inference with Promises
// ============================================================================

// Promise type is inferred from resolved value
async function fetchData() {
  return { id: 1, name: "Test" };
}
// Inferred return type: Promise<{ id: number; name: string }>

// Explicit Promise (commented to avoid Promise runtime dependency)
// function fetchDataExplicit(): Promise<{ id: number; name: string }> {
//   return Promise.resolve({ id: 1, name: "Test" });
// }

// ============================================================================
// 20. Inference Limitations
// ============================================================================

// Sometimes explicit types are needed
let zooExplicit: Animal[] = [new Rhino(), new Elephant(), new Snake()];
// Without explicit type, would be (Rhino | Elephant | Snake)[]

// Function overloads may need explicit return types
function process(input: string): string;
function process(input: number): number;
function process(input: string | number): string | number {
  return input;
}

// ============================================================================
// 21. Inference with Readonly
// ============================================================================

// Readonly arrays are inferred
const readonlyNumbers = [1, 2, 3] as const;
// Inferred as: readonly [1, 2, 3]

// Readonly object
const readonlyConfig = {
  apiUrl: "https://api.example.com",
  timeout: 5000
} as const;
// Inferred as: { readonly apiUrl: "https://api.example.com"; readonly timeout: 5000 }

// ============================================================================
// 22. Inference with Template Literals
// ============================================================================

function createMessage(name: string) {
  return `Hello, ${name}!`;
}
// Inferred return type: string

// Template literal type inference (when used with const)
const message = `Hello, ${"World"}!` as const;
// Type: "Hello, World!"

// ============================================================================
// 23. Inference with Destructuring
// ============================================================================

const person = {
  name: "John",
  age: 30,
  city: "New York"
};

// Destructuring preserves types
const { name, age } = person;
// name: string, age: number

// Array destructuring
const [first, second] = [1, 2, 3];
// first: number, second: number

// ============================================================================
// 24. Inference with Spread Operator
// ============================================================================

const base = { x: 1, y: 2 };
const extended = { ...base, z: 3 };
// Inferred type: { x: number; y: number; z: number }

const array1 = [1, 2, 3];
const array2 = [4, 5, 6];
const combined = [...array1, ...array2];
// Inferred type: number[]

// ============================================================================
// 25. Real-World Examples
// ============================================================================

// Event handler with contextual typing
document.addEventListener("click", function (event) {
  // event is contextually typed as MouseEvent
  console.log(event.clientX, event.clientY);
});

// API response inference
async function fetchUser(id: number) {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
  // Inferred return type: Promise<any>
  // In practice, you'd want to type this explicitly
}

// Configuration object inference
function createApp(config: {
  apiUrl: string;
  timeout: number;
  retries?: number;
}) {
  return {
    ...config,
    initialized: true
  };
}

const app = createApp({
  apiUrl: "https://api.example.com",
  timeout: 5000
  // retries is optional, so inference works fine
});
// app.initialized: boolean
// app.apiUrl: string
// app.timeout: number
// app.retries: number | undefined

// ============================================================================
// Export Examples
// ============================================================================

export {
  Animal,
  Rhino,
  Elephant,
  Snake,
  Point,
  Point3D,
  MyClass,
  createZoo,
  createPoint,
  createPoint3D,
  identity,
  pair,
  processValue,
  fetchData,
};

// ============================================================================
// Summary
// ============================================================================
//
// Type Inference in TypeScript:
// 1. Automatic inference from values, parameters, and return statements
// 2. Best common type: Finds the most compatible type from multiple candidates
// 3. Contextual typing: Uses surrounding context to infer types
// 4. Works in most cases, but explicit types are sometimes needed
// 5. Helps reduce verbosity while maintaining type safety
//

