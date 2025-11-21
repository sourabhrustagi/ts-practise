/**
 * TypeScript Type Compatibility Examples
 * 
 * Comprehensive examples covering:
 * - Structural subtyping vs nominal typing
 * - Basic compatibility rules
 * - Function compatibility
 * - Function parameter bivariance
 * - Optional parameters and rest parameters
 * - Functions with overloads
 * - Enum compatibility
 * - Class compatibility
 * - Private and protected members
 * - Generic compatibility
 * - Advanced topics (subtype vs assignment)
 * - Special type assignability
 */

// ============================================================================
// 1. Structural Subtyping (Duck Typing)
// ============================================================================

// TypeScript uses structural typing: if it looks like a duck and quacks like a duck,
// it's a duck (at least structurally)

interface Pet {
  name: string;
}

class Dog {
  name: string;
  
  constructor(name: string) {
    this.name = name;
  }
}

let pet: Pet;
// OK, because of structural typing
// Dog has a 'name: string' property, which matches Pet's structure
pet = new Dog("Lassie");

// In nominally-typed languages (C#, Java), this would be an error
// because Dog doesn't explicitly implement Pet

// ============================================================================
// 2. Basic Compatibility Rules
// ============================================================================

// Basic rule: x is compatible with y if y has at least the same members as x

interface Pet2 {
  name: string;
}

let pet2: Pet2;

// dog has extra properties, but that's OK
// dog must have at least all properties of Pet2
let dog = { name: "Lassie", owner: "Rudd Weatherwax" };
pet2 = dog; // OK - dog has 'name: string' which matches Pet2

// Same rule applies for function arguments
function greet(pet: Pet2): void {
  console.log("Hello, " + pet.name);
}

greet(dog); // OK - dog has the required 'name' property

// However, object literals may only specify known properties
// let dog2: Pet2 = { name: "Lassie", owner: "Rudd Weatherwax" }; // Error!
// Excess property checking applies to object literals

// ============================================================================
// 3. Comparing Two Functions
// ============================================================================

// Function compatibility is based on parameter and return types

// Example 1: Parameter lists
let x = (a: number) => 0;
let y = (b: number, s: string) => 0;

y = x; // OK - x can be assigned to y
// x has fewer parameters, which is fine because y can ignore extra params

// x = y; // Error - y has a required second parameter that x doesn't have

// Why allow 'discarding' parameters?
// This is common in JavaScript callbacks
let items = [1, 2, 3];

// forEach provides 3 parameters, but we can use just 1
items.forEach((item, index, array) => console.log(item)); // All params
items.forEach((item) => console.log(item)); // Just first param - OK!

// Example 2: Return types
let x2 = () => ({ name: "Alice" });
let y2 = () => ({ name: "Alice", location: "Seattle" });

x2 = y2; // OK - y2's return type has all properties of x2's return type
// y2 = x2; // Error - x2() lacks a location property

// The source function's return type must be a subtype of the target's return type

// ============================================================================
// 4. Function Parameter Bivariance
// ============================================================================

// When comparing function parameters, assignment succeeds if either:
// - source parameter is assignable to target parameter, OR
// - target parameter is assignable to source parameter
// This is unsound but enables common JavaScript patterns

enum EventType {
  Mouse,
  Keyboard,
}

interface Event {
  timestamp: number;
}

interface MyMouseEvent extends Event {
  x: number;
  y: number;
}

interface MyKeyEvent extends Event {
  keyCode: number;
}

function listenEvent(eventType: EventType, handler: (n: Event) => void): void {
  // Implementation
}

// Unsound but useful and common
// Handler expects MyMouseEvent (more specific), but function signature expects Event (less specific)
listenEvent(EventType.Mouse, (e: MyMouseEvent) => console.log(e.x + "," + e.y));

// Alternative approaches (more verbose but type-safe):
listenEvent(EventType.Mouse, (e: Event) =>
  console.log((e as MyMouseEvent).x + "," + (e as MyMouseEvent).y)
);

listenEvent(EventType.Mouse, ((e: MyMouseEvent) =>
  console.log(e.x + "," + e.y)) as (e: Event) => void);

// Still disallowed - completely incompatible types
// listenEvent(EventType.Mouse, (e: number) => console.log(e)); // Error

// You can enable strict function types with: strictFunctionTypes compiler flag
// This makes function parameter types checked more strictly (contravariant)

// ============================================================================
// 5. Optional Parameters and Rest Parameters
// ============================================================================

// Optional and required parameters are interchangeable
// Extra optional parameters are not an error

function optionalParamsExample(
  required: string,
  optional?: number,
  rest?: string[]
): void {
  console.log(required, optional, rest);
}

// Function with fewer parameters can be assigned to one with more optional params
let func1 = (x: string) => x;
let func2 = (x: string, y?: number) => x;

func2 = func1; // OK - func1 can be used where func2 is expected
// func1 = func2; // Also OK - optional param doesn't prevent assignment

// Rest parameters are treated as infinite series of optional parameters
function withRest(...args: number[]): void {
  console.log(args);
}

function withRequiredParams(a: number, b: number): void {
  console.log(a, b);
}

// withRest = withRequiredParams; // This would work conceptually
// withRequiredParams = withRest; // This would also work

// Common pattern: function taking callback with unknown number of arguments
function invokeLater(args: any[], callback: (...args: any[]) => void): void {
  callback(...args);
}

// Unsound but common pattern
invokeLater([1, 2], (x, y) => console.log(x + ", " + y));

// Optional parameters in callback
invokeLater([1, 2], (x?, y?) => console.log(x + ", " + y));

// ============================================================================
// 6. Functions with Overloads
// ============================================================================

// When a function has overloads, each overload in the target type
// must be matched by a compatible signature on the source type

// Target function with overloads
function targetFunc(x: string): string;
function targetFunc(x: number): number;
function targetFunc(x: string | number): string | number {
  return x;
}

// Source function compatible with all overloads
function sourceFunc(x: string): string;
function sourceFunc(x: number): number;
function sourceFunc(x: string | number): string | number {
  return x;
}

// targetFunc = sourceFunc; // Would be OK if we could assign functions

// Incompatible source function
function incompatibleFunc(x: string): string {
  return x;
}

// targetFunc = incompatibleFunc; // Error - missing number overload

// ============================================================================
// 7. Enum Compatibility
// ============================================================================

// Enums are compatible with numbers, and numbers are compatible with enums
enum Status {
  Ready,
  Waiting,
}

enum Color {
  Red,
  Blue,
  Green,
}

let status = Status.Ready;
let num: number = 42;

status = num; // OK - numbers are assignable to enums
num = status; // OK - enums are assignable to numbers

// But enum values from different enum types are incompatible
// status = Color.Green; // Error - different enum types

// Enum compatibility with specific values
let status2: Status.Ready = Status.Ready;
let status3: Status = Status.Waiting;

status2 = status3; // OK - Status is assignable to Status.Ready
// status3 = status2; // Also OK

// ============================================================================
// 8. Class Compatibility
// ============================================================================

// Classes work similarly to object literal types and interfaces
// Exception: they have both a static and an instance type
// Only instance members are compared for compatibility

class Animal {
  feet: number;
  
  constructor(name: string, numFeet: number) {
    this.feet = numFeet;
  }
}

class Size {
  feet: number;
  
  constructor(numFeet: number) {
    this.feet = numFeet;
  }
}

let a: Animal;
let s: Size;

a = s; // OK - both have 'feet: number'
s = a; // OK - structural typing

// Static members don't affect compatibility
class AnimalWithStatic {
  static count: number = 0;
  feet: number;
  
  constructor(feet: number) {
    this.feet = feet;
  }
}

class SizeWithStatic {
  static size: string = "large";
  feet: number;
  
  constructor(feet: number) {
    this.feet = feet;
  }
}

let a2: AnimalWithStatic;
let s2: SizeWithStatic;

a2 = s2; // OK - static members are ignored
s2 = a2; // OK

// ============================================================================
// 9. Private and Protected Members
// ============================================================================

// Private and protected members affect compatibility
// If target type has private member, source must have private member from same class

class AnimalWithPrivate {
  private name: string;
  feet: number;
  
  constructor(name: string, feet: number) {
    this.name = name;
    this.feet = feet;
  }
}

class DogWithPrivate {
  private name: string; // Different private member (not from same class)
  feet: number;
  
  constructor(name: string, feet: number) {
    this.name = name;
    this.feet = feet;
  }
}

let animal: AnimalWithPrivate;
let dog: DogWithPrivate;

// animal = dog; // Error - different private members
// dog = animal; // Error - different private members

// Same class - OK
class Cat extends AnimalWithPrivate {
  constructor(name: string, feet: number) {
    super(name, feet);
  }
}

let cat: Cat;
animal = cat; // OK - Cat extends AnimalWithPrivate, same private member
cat = animal; // OK

// Protected members work similarly
class AnimalWithProtected {
  protected name: string;
  feet: number;
  
  constructor(name: string, feet: number) {
    this.name = name;
    this.feet = feet;
  }
}

class DogWithProtected extends AnimalWithProtected {
  constructor(name: string, feet: number) {
    super(name, feet);
  }
}

let animal2: AnimalWithProtected;
let dog2: DogWithProtected;

animal2 = dog2; // OK - same protected member hierarchy
dog2 = animal2; // OK

// ============================================================================
// 10. Generic Compatibility
// ============================================================================

// Type parameters only affect compatibility when used in member types

// Example 1: Type parameters not used in structure
interface Empty<T> {}

let x: Empty<number>;
let y: Empty<string>;

x = y; // OK - structure is the same (empty), type parameter doesn't matter

// Example 2: Type parameters used in structure
interface NotEmpty<T> {
  data: T;
}

let x2: NotEmpty<number>;
let y2: NotEmpty<string>;

// x2 = y2; // Error - different types for 'data' property
// y2 = x2; // Error

// Generic types with type arguments act like non-generic types
let x3: NotEmpty<number> = { data: 42 };
let y3: NotEmpty<number> = { data: 100 };

x3 = y3; // OK - same generic type with same type argument

// Example 3: Unspecified type arguments
let identity = function <T>(x: T): T {
  return x;
};

let reverse = function <U>(y: U): U {
  return y;
};

// identity = reverse; // OK - unspecified type params treated as 'any'
// Both become (x: any) => any

// Example 4: Generic interfaces
interface GenericInterface<T> {
  value: T;
}

let gi1: GenericInterface<number> = { value: 42 };
let gi2: GenericInterface<string> = { value: "hello" };

// gi1 = gi2; // Error - different types

let gi3: GenericInterface<number> = { value: 100 };
gi1 = gi3; // OK - same generic type with same type argument

// ============================================================================
// 11. Advanced Topics: Subtype vs Assignment
// ============================================================================

// TypeScript has two kinds of compatibility:
// 1. Subtype compatibility
// 2. Assignment compatibility (extends subtype with rules for any and enums)

// Assignment compatibility extends subtype compatibility with:
// - Assignment to/from 'any'
// - Assignment to/from enum with corresponding numeric values

// For practical purposes, type compatibility is dictated by assignment compatibility
// Even in implements and extends clauses

// ============================================================================
// 12. Special Type Assignability
// ============================================================================

// any, unknown, object, void, undefined, null, and never assignability

// any
let anyValue: any = "anything";
anyValue = 42;
anyValue = true;
anyValue = null;
anyValue = undefined;

let targetAny: any;
targetAny = anyValue; // OK

// unknown
let unknownValue: unknown = "anything";
unknownValue = 42;
unknownValue = true;
// unknownValue = null; // Depends on strictNullChecks
// unknownValue = undefined; // Depends on strictNullChecks

let targetUnknown: unknown;
targetUnknown = anyValue; // OK - any is assignable to unknown
targetUnknown = unknownValue; // OK
// targetUnknown = 42; // Error - unknown is not assignable to anything except any

// unknown is like a type-safe any
// Everything is assignable to unknown
// unknown is not assignable to anything except any

// object
let objectValue: object = { name: "test" };
objectValue = [1, 2, 3];
objectValue = new Date();
// objectValue = 42; // Error - number is not assignable to object
// objectValue = "string"; // Error - string is not assignable to object

let targetObject: object;
targetObject = anyValue; // OK
targetObject = unknownValue; // OK
targetObject = objectValue; // OK

// void
function returnsVoid(): void {
  // No return statement or return;
}

let voidValue: void;
// voidValue = 42; // Error - nothing is assignable to void (except undefined/null)
voidValue = undefined; // OK

let targetVoid: void;
targetVoid = anyValue; // OK
targetVoid = unknownValue; // OK
targetVoid = undefined; // OK
// targetVoid = null; // OK if strictNullChecks is off

// undefined
let undefinedValue: undefined = undefined;

let targetUndefined: undefined;
targetUndefined = anyValue; // OK
targetUndefined = unknownValue; // OK
targetUndefined = undefined; // OK
targetUndefined = voidValue; // OK
// targetUndefined = null; // OK if strictNullChecks is off

// null
let nullValue: null = null;

let targetNull: null;
targetNull = anyValue; // OK
targetNull = unknownValue; // OK
targetNull = null; // OK
// targetNull = undefined; // OK if strictNullChecks is off

// never
function neverReturns(): never {
  throw new Error("Never returns");
}

let neverValue: never = neverReturns();

// never is assignable to everything
let targetNever: never;
targetNever = anyValue; // OK
targetNever = unknownValue; // OK
targetNever = objectValue; // OK
targetNever = voidValue; // OK
targetNever = undefinedValue; // OK
targetNever = nullValue; // OK
targetNever = neverValue; // OK

// But nothing is assignable to never (except never itself)
// let neverVar: never = 42; // Error
// let neverVar: never = "string"; // Error

// ============================================================================
// 13. Practical Examples
// ============================================================================

// Example 1: Structural typing with interfaces
interface Point {
  x: number;
  y: number;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
}

let point2D: Point = { x: 0, y: 0 };
let point3D: Point3D = { x: 0, y: 0, z: 0 };

point2D = point3D; // OK - Point3D has all properties of Point
// point3D = point2D; // Error - Point2D lacks 'z' property

// Example 2: Function compatibility in practice
type Handler = (event: Event) => void;

function addEventListener(handler: Handler): void {
  // Register handler
}

// More specific handler is compatible
addEventListener((e: MyMouseEvent) => {
  console.log(e.x, e.y);
});

// Example 3: Generic compatibility
interface Container<T> {
  item: T;
}

let stringContainer: Container<string> = { item: "hello" };
let numberContainer: Container<number> = { item: 42 };

// stringContainer = numberContainer; // Error - different T

// But if we use the same type argument:
let stringContainer2: Container<string> = { item: "world" };
stringContainer = stringContainer2; // OK - same generic type

// Example 4: Class and interface compatibility
interface Named {
  name: string;
}

class Person {
  name: string;
  
  constructor(name: string) {
    this.name = name;
  }
}

let named: Named;
let person: Person = new Person("Alice");

named = person; // OK - structural typing
// person = named; // Error - might not be a Person instance

// ============================================================================
// Export Examples
// ============================================================================

export {
  Pet,
  Dog,
  Pet2,
  EventType,
  Event,
  MyMouseEvent,
  MyKeyEvent,
  Status,
  Color,
  Animal,
  Size,
  AnimalWithPrivate,
  DogWithPrivate,
  Cat,
  Empty,
  NotEmpty,
  Point,
  Point3D,
  Container,
  Named,
  Person,
};

