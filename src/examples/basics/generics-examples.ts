/*
  TypeScript Generics Examples
  
  This file demonstrates various TypeScript generics techniques:
  - Hello World of Generics (identity function)
  - Working with Generic Type Variables
  - Generic Types (interfaces, type aliases)
  - Generic Classes
  - Generic Constraints
  - Using Type Parameters in Generic Constraints
  - Using Class Types in Generics
  - Generic Parameter Defaults
  - Variance Annotations (advanced)
*/

// ========== 1. Hello World of Generics ==========

// Without generics - specific type
function identityNumber(arg: number): number {
  return arg;
}

// Without generics - using any (loses type information)
function identityAny(arg: any): any {
  return arg;
}

// With generics - captures type information
function identity<Type>(arg: Type): Type {
  return arg;
}

// Calling generic functions - explicit type argument
let output1 = identity<string>("myString");
// output1: string

// Calling generic functions - type argument inference
let output2 = identity("myString");
// output2: string (TypeScript infers the type)

// ========== 2. Working with Generic Type Variables ==========

// This would cause an error - Type doesn't have .length
/*
function loggingIdentity<Type>(arg: Type): Type {
  console.log(arg.length); // Error: Property 'length' does not exist on type 'Type'
  return arg;
}
*/

// Solution: Use array of Type
function loggingIdentity<Type>(arg: Type[]): Type[] {
  console.log(arg.length); // Arrays have .length
  return arg;
}

// Alternative: Use Array<Type> syntax
function loggingIdentityAlt<Type>(arg: Array<Type>): Array<Type> {
  console.log(arg.length);
  return arg;
}

// Example usage
const genericNumbers = loggingIdentity([1, 2, 3]);
const genericStrings = loggingIdentityAlt(["a", "b", "c"]);

// ========== 3. Generic Types ==========

// Generic function type
function identityFunc<Type>(arg: Type): Type {
  return arg;
}

// Type of generic function
let myIdentity: <Type>(arg: Type) => Type = identityFunc;

// Using different parameter name (still works)
let myIdentity2: <Input>(arg: Input) => Input = identityFunc;

// Generic type as call signature of object literal
let myIdentity3: { <Type>(arg: Type): Type } = identityFunc;

// Generic interface
interface GenericIdentityFn {
  <Type>(arg: Type): Type;
}

let myIdentity4: GenericIdentityFn = identityFunc;

// Generic interface with type parameter on interface
interface GenericIdentityFnInterface<Type> {
  (arg: Type): Type;
}

let myIdentity5: GenericIdentityFnInterface<number> = identityFunc;

// Generic type alias
type GenericIdentityType<Type> = (arg: Type) => Type;
let myIdentity6: GenericIdentityType<string> = identityFunc;

// ========== 4. Generic Classes ==========

class GenericNumber<NumType> {
  zeroValue: NumType;
  add!: (x: NumType, y: NumType) => NumType;

  constructor(zeroValue: NumType) {
    this.zeroValue = zeroValue;
  }
}

// Using with number
let myGenericNumber = new GenericNumber<number>(0);
myGenericNumber.add = function (x, y) {
  return x + y;
};

// Using with string
let stringNumeric = new GenericNumber<string>("");
stringNumeric.add = function (x, y) {
  return x + y;
};

// Using with object
interface GenericPoint {
  x: number;
  y: number;
}

let pointNumeric = new GenericNumber<GenericPoint>({ x: 0, y: 0 });
pointNumeric.add = function (p1, p2) {
  return { x: p1.x + p2.x, y: p1.y + p2.y };
};

// Note: Static members cannot use class type parameters
class StaticExample<T> {
  // static value: T; // Error: Static members cannot reference class type parameters
  instanceValue: T;
  constructor(value: T) {
    this.instanceValue = value;
  }
}

// ========== 5. Generic Constraints ==========

// Without constraint - error
/*
function loggingIdentityConstraint<Type>(arg: Type): Type {
  console.log(arg.length); // Error: Property 'length' does not exist on type 'Type'
  return arg;
}
*/

// With constraint - using extends
interface Lengthwise {
  length: number;
}

function loggingIdentityConstraint<Type extends Lengthwise>(arg: Type): Type {
  console.log(arg.length); // Now we know it has .length
  return arg;
}

// This won't work - number doesn't have length
// loggingIdentityConstraint(3); // Error

// This works - object has length property
loggingIdentityConstraint({ length: 10, value: 3 });
loggingIdentityConstraint("hello"); // string has length
loggingIdentityConstraint([1, 2, 3]); // array has length

// Multiple constraints
interface HasLength {
  length: number;
}

interface HasValue {
  value: number;
}

function multipleConstraints<Type extends HasLength & HasValue>(arg: Type): Type {
  console.log(arg.length, arg.value);
  return arg;
}

// ========== 6. Using Type Parameters in Generic Constraints ==========

function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key): Type[Key] {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

// These work - keys exist on x
getProperty(x, "a"); // returns number
getProperty(x, "b"); // returns number

// This would cause an error - "m" doesn't exist on x
// getProperty(x, "m"); // Error: Argument of type '"m"' is not assignable

// More complex example
interface Person {
  name: string;
  age: number;
  email: string;
}

function getPersonProperty<T extends Person, K extends keyof Person>(
  person: T,
  key: K
): Person[K] {
  return person[key];
}

const person: Person = { name: "Alice", age: 30, email: "alice@example.com" };
const personName = getPersonProperty(person, "name"); // string
const personAge = getPersonProperty(person, "age"); // number

// ========== 7. Using Class Types in Generics ==========

// Basic factory function
function create<Type>(c: { new (): Type }): Type {
  return new c();
}

class BasicClass {
  value = "hello";
}

const instance = create(BasicClass);

// Advanced example with constraints
class GenericBeeKeeper {
  hasMask: boolean = true;
}

class GenericZooKeeper {
  nametag: string = "Mikle";
}

class GenericAnimal {
  numLegs: number = 4;
}

class GenericBee extends GenericAnimal {
  numLegs = 6;
  keeper: GenericBeeKeeper = new GenericBeeKeeper();
}

class GenericLion extends GenericAnimal {
  keeper: GenericZooKeeper = new GenericZooKeeper();
}

function createInstance<A extends GenericAnimal>(c: new () => A): A {
  return new c();
}

// TypeScript knows the return type based on the class
const genericLion = createInstance(GenericLion);
const genericBee = createInstance(GenericBee);

// genericLion.keeper.nametag; // TypeScript knows this is available
// genericBee.keeper.hasMask; // TypeScript knows this is available

// ========== 8. Generic Parameter Defaults ==========

// Example: Creating a container with defaults
interface GenericContainer<T, U = T[]> {
  element: T;
  children: U;
}

// Function with generic defaults
function createContainer<T extends HTMLElement = HTMLDivElement, U extends HTMLElement[] = T[]>(
  element?: T,
  children?: U
): GenericContainer<T, U> {
  // For demo purposes, we'll use a simpler approach without actual DOM
  return {
    element: element as T,
    children: (children as U) || ([] as unknown as U),
  };
}

// Without defaults - would need multiple overloads
/*
declare function createOld(): GenericContainer<HTMLDivElement, HTMLDivElement[]>;
declare function createOld<T extends HTMLElement>(element: T): GenericContainer<T, T[]>;
declare function createOld<T extends HTMLElement, U extends HTMLElement[]>(
  element: T,
  children: U
): GenericContainer<T, U>;
*/

// With defaults - single function signature
function createElement<
  T extends { tagName: string } = { tagName: "div" },
  U extends T[] = T[]
>(element?: T, children?: U): GenericContainer<T, U> {
  return {
    element: (element as T) || ({ tagName: "div" } as T),
    children: (children as U) || ([] as unknown as U),
  };
}

// Usage examples
interface SimpleElement {
  tagName: string;
}

const div = createElement();
const p = createElement<SimpleElement>({ tagName: "p" });

// ========== 9. Variance Annotations (Advanced) ==========

// Covariance example - Producer pattern
interface GenericProducer<T> {
  make(): T;
}

class GenericAnimalProducer implements GenericProducer<GenericAnimal> {
  make(): GenericAnimal {
    return new GenericAnimal();
  }
}

class GenericCatProducer implements GenericProducer<GenericAnimal> {
  make(): GenericAnimal {
    return new GenericAnimal();
  }
}

// Covariant: GenericProducer<Cat> can be used where GenericProducer<GenericAnimal> is expected
// (if Cat extends GenericAnimal)

// Contravariance example - Consumer pattern
interface GenericConsumer<T> {
  consume: (arg: T) => void;
}

// Contravariant: GenericConsumer<GenericAnimal> can be used where GenericConsumer<Cat> is expected
// (if Cat extends GenericAnimal)

// Example usage
function useProducer(producer: GenericProducer<GenericAnimal>): GenericAnimal {
  return producer.make();
}

function useConsumer(consumer: GenericConsumer<GenericAnimal>): void {
  consumer.consume(new GenericAnimal());
}

// Explicit variance annotations (use sparingly and only when needed)
// Contravariant annotation
interface ExplicitGenericConsumer<in T> {
  consume: (arg: T) => void;
}

// Covariant annotation
interface ExplicitGenericProducer<out T> {
  make(): T;
}

// Invariant annotation (both in and out)
interface ExplicitGenericProducerConsumer<in out T> {
  consume: (arg: T) => void;
  make(): T;
}

// ========== Practical Examples ==========

// Stack data structure
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
}

// Key-Value Store
class KeyValueStore<K, V> {
  private store: Array<{ key: K; value: V }> = [];

  set(key: K, value: V): void {
    let existing = -1;
    for (let i = 0; i < this.store.length; i++) {
      if (this.store[i].key === key) {
        existing = i;
        break;
      }
    }
    if (existing >= 0) {
      this.store[existing].value = value;
    } else {
      this.store.push({ key, value });
    }
  }

  get(key: K): V | undefined {
    for (let i = 0; i < this.store.length; i++) {
      if (this.store[i].key === key) {
        return this.store[i].value;
      }
    }
    return undefined;
  }

  has(key: K): boolean {
    for (let i = 0; i < this.store.length; i++) {
      if (this.store[i].key === key) {
        return true;
      }
    }
    return false;
  }

  delete(key: K): boolean {
    for (let i = 0; i < this.store.length; i++) {
      if (this.store[i].key === key) {
        this.store.splice(i, 1);
        return true;
      }
    }
    return false;
  }
}

// Function that returns first element of array
function getFirstElement<T>(arr: T[]): T | undefined {
  return arr.length > 0 ? arr[0] : undefined;
}

// Function that maps over array
function mapArray<T, U>(arr: T[], fn: (item: T) => U): U[] {
  return arr.map(fn);
}

// Function that filters array
function filterArray<T>(arr: T[], predicate: (item: T) => boolean): T[] {
  return arr.filter(predicate);
}

// Promise wrapper (using a simple wrapper for demo)
function createPromise<T>(value: T): { value: T; then: (fn: (val: T) => void) => void } {
  return {
    value,
    then(fn: (val: T) => void) {
      // Simulate async behavior
      setTimeout(() => fn(this.value), 0);
    },
  };
}

// ========== Demo Runner ==========

function runGenericsExamples(): void {
  console.log("=== TypeScript Generics Examples ===\n");

  console.log("--- 1. Hello World of Generics ---");
  console.log("identity<number>(42):", identity<number>(42));
  console.log('identity("hello"):', identity("hello")); // type inference
  console.log("identity(true):", identity(true));

  console.log("\n--- 2. Working with Generic Type Variables ---");
  const numArray = loggingIdentity([1, 2, 3, 4, 5]);
  console.log("loggingIdentity([1,2,3,4,5]):", numArray);
  const strArray = loggingIdentityAlt(["a", "b", "c"]);
  console.log('loggingIdentityAlt(["a","b","c"]):', strArray);

  console.log("\n--- 3. Generic Types ---");
  console.log("myIdentity<number>(42):", myIdentity<number>(42));
  console.log("myIdentity4<string>('test'):", myIdentity4<string>("test"));
  console.log("myIdentity5(100):", myIdentity5(100));

  console.log("\n--- 4. Generic Classes ---");
  const numGen = new GenericNumber<number>(0);
  numGen.add = (x, y) => x + y;
  console.log("numGen.add(5, 3):", numGen.add(5, 3));

  const strGen = new GenericNumber<string>("");
  strGen.add = (x, y) => x + y;
  console.log('strGen.add("hello", "world"):', strGen.add("hello", "world"));

  const pointGen = new GenericNumber<GenericPoint>({ x: 0, y: 0 });
  pointGen.add = (p1, p2) => ({ x: p1.x + p2.x, y: p1.y + p2.y });
  console.log(
    "pointGen.add({x:1,y:2}, {x:3,y:4}):",
    pointGen.add({ x: 1, y: 2 }, { x: 3, y: 4 })
  );

  console.log("\n--- 5. Generic Constraints ---");
  loggingIdentityConstraint("hello");
  loggingIdentityConstraint([1, 2, 3]);
  loggingIdentityConstraint({ length: 5, value: 10 });

  multipleConstraints({ length: 10, value: 20 });

  console.log("\n--- 6. Using Type Parameters in Generic Constraints ---");
  console.log('getProperty({a:1,b:2,c:3,d:4}, "a"):', getProperty(x, "a"));
  console.log('getProperty({a:1,b:2,c:3,d:4}, "b"):', getProperty(x, "b"));
  console.log('getPersonProperty(person, "name"):', personName);
  console.log('getPersonProperty(person, "age"):', personAge);

  console.log("\n--- 7. Using Class Types in Generics ---");
  const basicInstance = create(BasicClass);
  console.log("create(BasicClass).value:", basicInstance.value);
  const genericLionInstance = createInstance(GenericLion);
  const genericBeeInstance = createInstance(GenericBee);
  console.log("createInstance(GenericLion).numLegs:", genericLionInstance.numLegs);
  console.log("createInstance(GenericBee).numLegs:", genericBeeInstance.numLegs);

  console.log("\n--- 8. Generic Parameter Defaults ---");
  const defaultContainer = createElement();
  console.log("createElement() (default):", defaultContainer);
  const pContainer = createElement<SimpleElement>({ tagName: "p" });
  console.log('createElement({tagName: "p"}):', pContainer);

  console.log("\n--- Practical Examples ---");
  const numberStack = new Stack<number>();
  numberStack.push(1);
  numberStack.push(2);
  numberStack.push(3);
  console.log("Stack push(1,2,3), pop():", numberStack.pop());
  console.log("Stack peek():", numberStack.peek());
  console.log("Stack size():", numberStack.size());

  const kvStore = new KeyValueStore<string, number>();
  kvStore.set("one", 1);
  kvStore.set("two", 2);
  console.log('KeyValueStore.get("one"):', kvStore.get("one"));
  console.log('KeyValueStore.has("two"):', kvStore.has("two"));

  console.log("getFirstElement([1,2,3]):", getFirstElement([1, 2, 3]));
  console.log(
    'mapArray([1,2,3], x => x * 2):',
    mapArray([1, 2, 3], (x) => x * 2)
  );
  console.log(
    "filterArray([1,2,3,4,5], x => x > 2):",
    filterArray([1, 2, 3, 4, 5], (x) => x > 2)
  );

  createPromise("resolved").then((value) => {
    console.log("createPromise('resolved'):", value);
  });

  console.log("\n=== All Examples Complete ===");
}

runGenericsExamples();

