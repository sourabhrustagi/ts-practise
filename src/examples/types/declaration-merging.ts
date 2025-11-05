/**
 * Declaration Merging - Comprehensive examples
 * 
 * Declaration merging is a unique TypeScript feature that allows the compiler
 * to merge two separate declarations with the same name into a single definition.
 * 
 * Based on TypeScript Handbook: Declaration Merging
 */

// ============================================================================
// BASIC CONCEPTS - Understanding Declaration Types
// ============================================================================

/*
In TypeScript, a declaration creates entities in at least one of three groups:
1. Namespace - creates a namespace (accessed with dotted notation)
2. Type - creates a type visible with the declared shape
3. Value - creates values visible in the output JavaScript

Declaration Type    | Namespace | Type | Value
--------------------|-----------|------|------
Namespace           |    X      |      |   X
Class               |           |  X   |   X
Enum                |    X      |  X   |   X
Interface           |           |  X   |
Type Alias          |           |  X   |
Function            |           |      |   X
Variable            |           |      |   X
*/

// ============================================================================
// MERGING INTERFACES
// ============================================================================

// Basic interface merging - simplest and most common type
interface Box {
  height: number;
  width: number;
}

interface Box {
  scale: number;
}

// All members are merged into a single interface
const box: Box = { height: 5, width: 6, scale: 10 };

// Example: Merging interfaces with different members
interface User {
  name: string;
  email: string;
}

interface User {
  age: number;
  address: string;
}

// Now User has all four properties
const user: User = {
  name: "John Doe",
  email: "john@example.com",
  age: 30,
  address: "123 Main St",
};

// ============================================================================
// INTERFACE MERGING - Non-Function Members
// ============================================================================

// Non-function members must be unique or have the same type
interface Config {
  apiUrl: string;
  timeout: number;
}

interface Config {
  apiUrl: string; // OK - same type
  timeout: number; // OK - same type
  retries: number; // OK - new member
}

// Error example (commented out):
// interface BadConfig {
//   apiUrl: string;
// }
// interface BadConfig {
//   apiUrl: number; // Error: Property 'apiUrl' must be of type 'string'
// }

// ============================================================================
// INTERFACE MERGING - Function Members (Method Overloads)
// ============================================================================

// Function members create overloads - later declarations have higher precedence
interface Cloner {
  clone(animal: Animal): Animal;
}

interface Cloner {
  clone(animal: Sheep): Sheep;
}

interface Cloner {
  clone(animal: Dog): Dog;
  clone(animal: Cat): Cat;
}

// Type definitions for the example
class Animal {}
class Sheep extends Animal {}
class Dog extends Animal {}
class Cat extends Animal {}

// The merged interface has overloads in this order:
// 1. clone(animal: Dog): Dog
// 2. clone(animal: Cat): Cat
// 3. clone(animal: Sheep): Sheep
// 4. clone(animal: Animal): Animal
// (Later declarations come first, but within each declaration, order is preserved)

// ============================================================================
// INTERFACE MERGING - Specialized Signatures
// ============================================================================

// Specialized signatures (single string literal types) bubble to the top
interface Document {
  createElement(tagName: any): Element;
}

interface Document {
  createElement(tagName: "div"): HTMLDivElement;
  createElement(tagName: "span"): HTMLSpanElement;
}

interface Document {
  createElement(tagName: string): HTMLElement;
  createElement(tagName: "canvas"): HTMLCanvasElement;
}

// Type definitions for the example
class Element {}
class HTMLElement extends Element {}
class HTMLDivElement extends HTMLElement {}
class HTMLSpanElement extends HTMLElement {}
class HTMLCanvasElement extends HTMLElement {}

// The merged Document interface has overloads in this order:
// 1. createElement(tagName: "canvas"): HTMLCanvasElement
// 2. createElement(tagName: "div"): HTMLDivElement
// 3. createElement(tagName: "span"): HTMLSpanElement
// 4. createElement(tagName: string): HTMLElement
// 5. createElement(tagName: any): Element
// (String literal types bubble to the top, then more specific types)

// ============================================================================
// MERGING NAMESPACES
// ============================================================================

// Namespaces of the same name merge their members
namespace Animals {
  export class Zebra {}
}

namespace Animals {
  export interface Legged {
    numberOfLegs: number;
  }
  export class Dog {}
}

// Equivalent to:
// namespace Animals {
//   export interface Legged {
//     numberOfLegs: number;
//   }
//   export class Zebra {}
//   export class Dog {}
// }

// Usage
const zebra = new Animals.Zebra();
const dog = new Animals.Dog();
const legged: Animals.Legged = { numberOfLegs: 4 };

// ============================================================================
// NAMESPACE MERGING - Non-Exported Members
// ============================================================================

// Non-exported members are only visible in the original (un-merged) namespace
namespace Animal {
  let haveMuscles = true; // Not exported - private to this namespace

  export function animalsHaveMuscles() {
    return haveMuscles; // OK - can access haveMuscles here
  }
}

namespace Animal {
  export function doAnimalsHaveMuscles() {
    // return haveMuscles; // Error: cannot find name 'haveMuscles'
    // haveMuscles is not accessible here because it wasn't exported
    return Animal.animalsHaveMuscles(); // OK - can call exported function
  }
}

// ============================================================================
// MERGING NAMESPACES WITH CLASSES
// ============================================================================

// Namespaces can merge with classes to create "inner classes"
class Album {
  label: Album.AlbumLabel; // Using the merged namespace
}

namespace Album {
  export class AlbumLabel {
    name: string = "Default Album";
  }
}

// Usage
const album = new Album();
album.label = new Album.AlbumLabel();
album.label.name = "Greatest Hits";

// Example: Adding static members to a class
class Calculator {
  static add(a: number, b: number): number {
    return a + b;
  }
}

namespace Calculator {
  export function subtract(a: number, b: number): number {
    return a - b;
  }
  export const PI = 3.14159;
}

// Usage
Calculator.add(5, 3); // 8
Calculator.subtract(10, 4); // 6
Calculator.PI; // 3.14159

// ============================================================================
// MERGING NAMESPACES WITH FUNCTIONS
// ============================================================================

// Namespaces can merge with functions to add properties to functions
function buildLabel(name: string): string {
  return buildLabel.prefix + name + buildLabel.suffix;
}

namespace buildLabel {
  export let suffix = "";
  export let prefix = "Hello, ";
}

// Usage
console.log(buildLabel("Sam Smith")); // "Hello, Sam Smith"

// Example: Function with configuration
function createGreeting(name: string): string {
  return `${createGreeting.template}${name}${createGreeting.suffix}`;
}

namespace createGreeting {
  export let template = "Hi, ";
  export let suffix = "!";
  export function setTemplate(newTemplate: string) {
    createGreeting.template = newTemplate;
  }
}

// Usage
console.log(createGreeting("Alice")); // "Hi, Alice!"
createGreeting.setTemplate("Welcome, ");
console.log(createGreeting("Bob")); // "Welcome, Bob!"

// ============================================================================
// MERGING NAMESPACES WITH ENUMS
// ============================================================================

// Namespaces can merge with enums to add static members
enum Color {
  red = 1,
  green = 2,
  blue = 4,
}

namespace Color {
  export function mixColor(colorName: string): Color | undefined {
    if (colorName === "yellow") {
      return Color.red + Color.green;
    } else if (colorName === "white") {
      return Color.red + Color.green + Color.blue;
    } else if (colorName === "magenta") {
      return Color.red + Color.blue;
    } else if (colorName === "cyan") {
      return Color.green + Color.blue;
    }
    return undefined;
  }

  export function getColorName(color: Color): string {
    switch (color) {
      case Color.red:
        return "red";
      case Color.green:
        return "green";
      case Color.blue:
        return "blue";
      default:
        return "unknown";
    }
  }
}

// Usage
const yellow = Color.mixColor("yellow"); // 3 (red + green)
const colorName = Color.getColorName(Color.red); // "red"

// ============================================================================
// DISALLOWED MERGES
// ============================================================================

/*
NOT ALL MERGES ARE ALLOWED IN TYPESCRIPT:

1. Classes CANNOT merge with other classes
   // Error: Duplicate identifier 'MyClass'
   class MyClass {}
   class MyClass {} // Error!

2. Classes CANNOT merge with variables
   // Error: Duplicate identifier 'MyClass'
   class MyClass {}
   var MyClass; // Error!

3. Type aliases CANNOT merge with other declarations
   // Type aliases don't create a new type name, they're just aliases

For information on mimicking class merging, see Mixins in TypeScript.
*/

// ============================================================================
// MODULE AUGMENTATION
// ============================================================================

// Module augmentation allows you to patch existing modules

// Example: Augmenting a class in another module
// (This would typically be in separate files)

// File: observable.ts (conceptual)
export class Observable<T> {
  constructor(private value: T) {}
  getValue(): T {
    return this.value;
  }
}

// File: map.ts (module augmentation)
// import { Observable } from "./observable";
// 
// declare module "./observable" {
//   interface Observable<T> {
//     map<U>(f: (x: T) => U): Observable<U>;
//   }
// }
// 
// Observable.prototype.map = function <T, U>(
//   this: Observable<T>,
//   f: (x: T) => U
// ): Observable<U> {
//   return new Observable(f(this.getValue()));
// };

// Example: Augmenting interface in a module
// declare module "./my-module" {
//   interface MyInterface {
//     newMethod(): void;
//   }
// }

// ============================================================================
// GLOBAL AUGMENTATION
// ============================================================================

// You can add declarations to the global scope from inside a module

// Example: Adding method to Array
declare global {
  interface Array<T> {
    toObservable(): Observable<T>;
  }
}

// Implementation
Array.prototype.toObservable = function <T>(this: T[]): Observable<T> {
  return new Observable(this[0]); // Simplified implementation
};

// Usage
const arr = [1, 2, 3];
const obs = arr.toObservable();

// Example: Adding to String
declare global {
  interface String {
    capitalize(): string;
  }
}

String.prototype.capitalize = function (this: string): string {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

// Usage
const greeting = "hello world";
console.log(greeting.capitalize()); // "Hello world"

// ============================================================================
// PRACTICAL EXAMPLES - API Response Types
// ============================================================================

// Merging interfaces for API responses
interface ApiResponse {
  status: number;
  message: string;
}

interface ApiResponse {
  timestamp: string;
}

// User-specific response
interface UserApiResponse extends ApiResponse {
  user: {
    id: number;
    name: string;
  };
}

// ============================================================================
// PRACTICAL EXAMPLES - Configuration Objects
// ============================================================================

// Merging configuration interfaces
interface AppConfig {
  apiUrl: string;
  timeout: number;
}

interface AppConfig {
  retries: number;
  cacheEnabled: boolean;
}

// Usage
const config: AppConfig = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3,
  cacheEnabled: true,
};

// ============================================================================
// PRACTICAL EXAMPLES - Event System
// ============================================================================

// Merging event interfaces
interface EventEmitter {
  on(event: string, listener: Function): void;
}

interface EventEmitter {
  on(event: "click", listener: (x: number, y: number) => void): void;
  on(event: "hover", listener: (element: string) => void): void;
}

// Type definitions
class EventEmitterImpl implements EventEmitter {
  on(event: string, listener: Function): void {
    // Implementation
  }
}

// ============================================================================
// PRACTICAL EXAMPLES - Utility Functions with Namespaces
// ============================================================================

// Creating a utility function with additional properties
function formatDate(date: Date): string {
  return formatDate.format(date, formatDate.defaultFormat);
}

namespace formatDate {
  export const defaultFormat = "YYYY-MM-DD";
  export function format(date: Date, format: string): string {
    // Simplified implementation
    return date.toISOString().split("T")[0];
  }
  export function parse(dateString: string): Date {
    return new Date(dateString);
  }
}

// Usage
const date = new Date();
const formatted = formatDate(date); // Uses default format
const customFormatted = formatDate.format(date, "MM/DD/YYYY");
const parsed = formatDate.parse("2024-01-01");

// ============================================================================
// BEST PRACTICES
// ============================================================================

/*
1. Use interface merging for extending types from libraries or frameworks
2. Use namespace merging with classes to organize related functionality
3. Use module augmentation to extend third-party library types
4. Be careful with non-exported members in namespaces - they're not accessible
   after merging
5. Remember that later declarations have higher precedence in overload resolution
6. Specialized signatures (string literals) bubble to the top of overload lists
7. Global augmentation should be used sparingly - prefer module augmentation
8. You cannot merge classes with classes or variables
9. Always export members from namespaces that need to be accessible after merging
*/

export {};

