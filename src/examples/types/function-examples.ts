/**
 * More on Functions - TypeScript Examples
 * 
 * This file demonstrates various ways to work with functions in TypeScript,
 * including function types, generics, overloads, and more.
 */

// ============================================================================
// 1. Function Type Expressions
// ============================================================================

// Basic function type expression
function greeter(fn: (a: string) => void) {
  fn("Hello, World");
}

function printToConsole(s: string) {
  console.log(s);
}

greeter(printToConsole);

// Using type alias for function type
type GreetFunction = (a: string) => void;

function greeterWithType(fn: GreetFunction) {
  fn("Greetings!");
}

// ============================================================================
// 2. Call Signatures
// ============================================================================

// Functions can have properties in addition to being callable
type DescribableFunction = {
  description: string;
  (someArg: number): boolean;
};

function doSomething(fn: DescribableFunction) {
  console.log(fn.description + " returned " + fn(6));
}

function myFunc(someArg: number) {
  return someArg > 3;
}
myFunc.description = "default description";

doSomething(myFunc);

// ============================================================================
// 3. Construct Signatures
// ============================================================================

type SomeObject = {
  value: string;
};

type SomeConstructor = {
  new (s: string): SomeObject;
};

function createFromConstructor(ctor: SomeConstructor) {
  return new ctor("hello");
}

// Combining call and construct signatures
interface CallOrConstruct {
  (n?: number): string;
  new (s: string): Date;
}

function callOrConstruct(ctor: CallOrConstruct) {
  // Passing an argument of type `number` to `ctor` matches it against
  // the first definition in the `CallOrConstruct` interface.
  console.log(ctor(10));

  // Similarly, passing an argument of type `string` to `ctor` matches it
  // against the second definition in the `CallOrConstruct` interface.
  console.log(new ctor("10"));
}

callOrConstruct(Date);

// ============================================================================
// 4. Generic Functions
// ============================================================================

// Basic generic function
function firstElement<Type>(arr: Type[]): Type | undefined {
  return arr[0];
}

// s is of type 'string'
const s = firstElement(["a", "b", "c"]);
// n is of type 'number'
const n = firstElement([1, 2, 3]);
// u is of type undefined
const u = firstElement([]);

// Multiple type parameters
function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
  return arr.map(func);
}

// Parameter 'n' is of type 'string'
// 'parsed' is of type 'number[]'
const parsed = map(["1", "2", "3"], (n) => parseInt(n));

// ============================================================================
// 5. Constraints
// ============================================================================

// Constraining type parameters
function longest<Type extends { length: number }>(a: Type, b: Type) {
  if (a.length >= b.length) {
    return a;
  } else {
    return b;
  }
}

// longerArray is of type 'number[]'
const longerArray = longest([1, 2], [1, 2, 3]);
// longerString is of type 'alice' | 'bob'
const longerString = longest("alice", "bob");
// Error! Numbers don't have a 'length' property
// const notOK = longest(10, 100); // This would cause an error

// Working with constrained values - common error example
function minimumLength<Type extends { length: number }>(
  obj: Type,
  minimum: number
): Type {
  if (obj.length >= minimum) {
    return obj;
  } else {
    // This would cause an error - we can't return just any object with length
    // because Type might be a more specific subtype
    return obj; // Using obj instead of { length: minimum } to avoid error
  }
}

// ============================================================================
// 6. Specifying Type Arguments
// ============================================================================

function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
  return arr1.concat(arr2);
}

// Normally it would be an error to call this function with mismatched arrays:
// const arr = combine([1, 2, 3], ["hello"]); // Error

// But you can manually specify Type:
const arr = combine<string | number>([1, 2, 3], ["hello"]);

// ============================================================================
// 7. Guidelines for Writing Good Generic Functions
// ============================================================================

// Push Type Parameters Down
function firstElement1<Type>(arr: Type[]) {
  return arr[0];
}

function firstElement2<Type extends any[]>(arr: Type) {
  return arr[0];
}

// a: number (good)
const a = firstElement1([1, 2, 3]);
// b: any (bad)
const b = firstElement2([1, 2, 3]);

// Use Fewer Type Parameters
function filter1<Type>(arr: Type[], func: (arg: Type) => boolean): Type[] {
  return arr.filter(func);
}

function filter2<Type, Func extends (arg: Type) => boolean>(
  arr: Type[],
  func: Func
): Type[] {
  return arr.filter(func);
}

// Type Parameters Should Appear Twice
// Bad - unnecessary generic
function greet<Str extends string>(s: Str) {
  console.log("Hello, " + s);
}

// Good - simpler version
function greetSimple(s: string) {
  console.log("Hello, " + s);
}

greet("world");
greetSimple("world");

// ============================================================================
// 8. Optional Parameters
// ============================================================================

function f(x?: number) {
  // x has type number | undefined
  if (x !== undefined) {
    console.log(x.toFixed());
  }
}

f(); // OK
f(10); // OK

// Parameter with default value
function fWithDefault(x = 10) {
  // x has type number (not number | undefined)
  console.log(x.toFixed());
}

// All OK
fWithDefault();
fWithDefault(10);
fWithDefault(undefined);

// ============================================================================
// 9. Optional Parameters in Callbacks
// ============================================================================

function myForEach(arr: any[], callback: (arg: any, index?: number) => void) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i], i);
  }
}

// Both of these calls are legal
myForEach([1, 2, 3], (a) => console.log(a));
myForEach([1, 2, 3], (a, i) => console.log(a, i));

// But TypeScript will enforce that index might be undefined
myForEach([1, 2, 3], (a, i) => {
  // i is possibly 'undefined'
  if (i !== undefined) {
    console.log(i.toFixed());
  }
});

// ============================================================================
// 10. Function Overloads
// ============================================================================

// Overload signatures
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
// Implementation signature
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}

const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);
// const d3 = makeDate(1, 3); // Error: No overload expects 2 arguments

// Common mistake - overload signature without implementation visibility
function fnOverload(x: string): void;
function fnOverload() {
  // Implementation
}
// fnOverload(); // Error: Expected 1 arguments, but got 0

// ============================================================================
// 11. Writing Good Overloads
// ============================================================================

// Overloaded version (can have issues with union types)
function lenOverloaded(s: string): number;
function lenOverloaded(arr: any[]): number;
function lenOverloaded(x: any) {
  return x.length;
}

lenOverloaded(""); // OK
lenOverloaded([0]); // OK
// lenOverloaded(Math.random() > 0.5 ? "hello" : [0]); // Error - can't resolve

// Better: Use union types instead
function len(x: any[] | string) {
  return x.length;
}

len(""); // OK
len([0]); // OK
len(Math.random() > 0.5 ? "hello" : [0]); // OK!

// ============================================================================
// 12. Declaring 'this' in a Function
// ============================================================================

interface User {
  admin: boolean;
  id: number;
}

interface DB {
  filterUsers(filter: (this: User) => boolean): User[];
}

// Example DB implementation
function getDB(): DB {
  return {
    filterUsers(filter: (this: User) => boolean): User[] {
      const users: User[] = [
        { id: 1, admin: true },
        { id: 2, admin: false },
        { id: 3, admin: true },
      ];
      return users.filter(filter);
    },
  };
}

const db = getDB();
const admins = db.filterUsers(function (this: User) {
  return this.admin;
});

// Note: Must use 'function', not arrow functions
// db.filterUsers(() => this.admin); // Error: arrow functions don't have 'this'

// ============================================================================
// 13. Other Types to Know About
// ============================================================================

// void - represents the return value of functions which don't return a value
function noop(): void {
  return;
}

// The inferred return type is void
function noopInferred() {
  return;
}

// object - refers to any value that isn't a primitive
function processObject(obj: object) {
  // Can't access properties without type narrowing
  console.log(obj);
}

processObject({});
processObject([]);
processObject(() => {});

// unknown - safer than any
function f1(a: any) {
  a.b(); // OK (but unsafe)
}

function f2(a: unknown) {
  // a.b(); // Error: 'a' is of type 'unknown'
  if (typeof a === 'object' && a !== null && 'b' in a) {
    (a as { b: () => void }).b(); // Need type narrowing
  }
}

// Function that returns unknown
function safeParse(s: string): unknown {
  return JSON.parse(s);
}

const obj = safeParse('{"key": "value"}');
// Need to be careful with 'obj' - it's unknown!

// never - represents values which are never observed
function fail(msg: string): never {
  throw new Error(msg);
}

// never also appears when TypeScript determines there's nothing left in a union
function processNever(x: string | number) {
  if (typeof x === "string") {
    // do something
  } else if (typeof x === "number") {
    // do something else
  } else {
    // x has type 'never' here!
    const _exhaustive: never = x;
  }
}

// Function - global type (generally avoid using)
function doSomethingWithFunction(f: Function) {
  return f(1, 2, 3);
}

// Better: use specific function types
function doSomethingBetter(f: (...args: number[]) => void) {
  return f(1, 2, 3);
}

// ============================================================================
// 14. Rest Parameters and Arguments
// ============================================================================

// Rest Parameters
function multiply(n: number, ...m: number[]) {
  return m.map((x) => n * x);
}

// 'a' gets value [10, 20, 30, 40]
const multiplied = multiply(10, 1, 2, 3, 4);

// Rest Arguments (spread syntax)
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
arr1.push(...arr2);

// TypeScript needs const context for tuple types
// Inferred type is number[] -- "an array with zero or more numbers"
const args = [8, 5];
// const angle = Math.atan2(...args); // Error: spread argument must have tuple type

// Fixed with const assertion
const argsTuple = [8, 5] as const;
const angle = Math.atan2(...argsTuple); // OK

// ============================================================================
// 15. Parameter Destructuring
// ============================================================================

// Basic destructuring
function sum({ a, b, c }: { a: number; b: number; c: number }) {
  console.log(a + b + c);
}

sum({ a: 10, b: 3, c: 9 });

// Using named type
type ABC = { a: number; b: number; c: number };

function sumWithType({ a, b, c }: ABC) {
  console.log(a + b + c);
}

sumWithType({ a: 10, b: 3, c: 9 });

// ============================================================================
// 16. Assignability of Functions - Return type void
// ============================================================================

type voidFunc = () => void;

// These implementations are all valid
const f1_void: voidFunc = () => {
  return true;
};

const f2_void: voidFunc = () => true;

const f3_void: voidFunc = function () {
  return true;
};

// When the return value is assigned to another variable, it retains the type of void
const v1 = f1_void(); // v1 is void
const v2 = f2_void(); // v2 is void
const v3 = f3_void(); // v3 is void

// This behavior allows this code to work:
const src = [1, 2, 3];
const dst = [0];

src.forEach((el) => dst.push(el)); // push returns number, but forEach expects void return

// However, literal function definitions with void return type must not return anything
function f2_literal(): void {
  // return true; // Error: Type 'boolean' is not assignable to type 'void'
  return;
}

const f3_literal = function (): void {
  // return true; // Error: Type 'boolean' is not assignable to type 'void'
  return;
};

// ============================================================================
// Export for use in other files
// ============================================================================

export {
  greeter,
  greeterWithType,
  doSomething,
  createFromConstructor,
  callOrConstruct,
  firstElement,
  map,
  longest,
  combine,
  filter1,
  greet,
  greetSimple,
  myForEach,
  makeDate,
  len,
  lenOverloaded,
  getDB,
  processObject,
  safeParse,
  fail,
  processNever,
  doSomethingWithFunction,
  multiply,
  sum,
  sumWithType,
  type GreetFunction,
  type DescribableFunction,
  type SomeConstructor,
  type CallOrConstruct,
  type ABC,
  type voidFunc,
};

