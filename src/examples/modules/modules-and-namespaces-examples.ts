/**
 * TypeScript Modules and Namespaces Examples
 * 
 * Comprehensive examples covering:
 * - ES Modules (import/export)
 * - CommonJS modules
 * - TypeScript namespaces
 * - Namespace merging
 * - Module declarations
 * - Ambient modules
 * - Common pitfalls
 * - Best practices
 */

// ============================================================================
// 1. ES Modules - Basic Export
// ============================================================================

// Named exports
export function calculateArea(width: number, height: number): number {
  return width * height;
}

export function calculatePerimeter(width: number, height: number): number {
  return 2 * (width + height);
}

export const PI = 3.14159;

export class Rectangle {
  constructor(
    public width: number,
    public height: number
  ) {}

  area(): number {
    return this.width * this.height;
  }
}

// Default export
export default function greet(name: string): string {
  return `Hello, ${name}!`;
}

// ============================================================================
// 2. ES Modules - Basic Import
// ============================================================================

// Importing from another file (commented out as this is a single file)
// import { calculateArea, calculatePerimeter, PI } from "./math";
// import Rectangle from "./shapes";
// import greet, { calculateArea } from "./utils";

// Re-exporting
// export { calculateArea, calculatePerimeter } from "./math";
// export { default as Greet } from "./utils";

// ============================================================================
// 3. TypeScript Namespaces - Basic Usage
// ============================================================================

// Namespaces are TypeScript-specific way to organize code
// They are simply named JavaScript objects in the global namespace

namespace Geometry {
  export interface Point {
    x: number;
    y: number;
  }

  export class Circle {
    constructor(
      public center: Point,
      public radius: number
    ) {}

    area(): number {
      return Math.PI * this.radius * this.radius;
    }

    circumference(): number {
      return 2 * Math.PI * this.radius;
    }
  }

  export class Rectangle {
    constructor(
      public topLeft: Point,
      public bottomRight: Point
    ) {}

    area(): number {
      const width = Math.abs(this.bottomRight.x - this.topLeft.x);
      const height = Math.abs(this.topLeft.y - this.bottomRight.y);
      return width * height;
    }
  }

  // Namespace can contain functions
  export function distance(p1: Point, p2: Point): number {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

// Using namespace
const circle = new Geometry.Circle({ x: 0, y: 0 }, 5);
console.log("Circle area:", circle.area());

const point1: Geometry.Point = { x: 0, y: 0 };
const point2: Geometry.Point = { x: 3, y: 4 };
console.log("Distance:", Geometry.distance(point1, point2));

// ============================================================================
// 4. Namespace Merging
// ============================================================================

// Namespaces can be split across multiple files and merged
namespace Validation {
  export interface StringValidator {
    isAcceptable(s: string): boolean;
  }
}

// This namespace will merge with the one above
namespace Validation {
  const lettersRegexp = /^[A-Za-z]+$/;
  const numberRegexp = /^[0-9]+$/;

  export class LettersOnlyValidator implements StringValidator {
    isAcceptable(s: string): boolean {
      return lettersRegexp.test(s);
    }
  }

  export class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string): boolean {
      return s.length === 5 && numberRegexp.test(s);
    }
  }
}

// Using merged namespace
const validators: { [s: string]: Validation.StringValidator } = {};
validators["ZIP code"] = new Validation.ZipCodeValidator();
validators["Letters only"] = new Validation.LettersOnlyValidator();

// ============================================================================
// 5. Nested Namespaces
// ============================================================================

namespace Outer {
  export namespace Inner {
    export class Nested {
      value: string = "nested";
    }

    export function nestedFunction(): string {
      return "nested function";
    }
  }

  export class OuterClass {
    value: string = "outer";
  }
}

// Using nested namespace
const nested = new Outer.Inner.Nested();
console.log(nested.value);

const outer = new Outer.OuterClass();
console.log(outer.value);

// ============================================================================
// 6. Namespaces with Interfaces and Types
// ============================================================================

namespace Database {
  export interface User {
    id: number;
    name: string;
    email: string;
  }

  export type UserStatus = "active" | "inactive" | "pending";

  export class UserRepository {
    private users: User[] = [];

    add(user: User): void {
      this.users.push(user);
    }

    findById(id: number): User | undefined {
      return this.users.find((u) => u.id === id);
    }

    findAll(): User[] {
      return [...this.users];
    }
  }

  export function createUser(id: number, name: string, email: string): User {
    return { id, name, email };
  }
}

// Using database namespace
const userRepo = new Database.UserRepository();
const user = Database.createUser(1, "Alice", "alice@example.com");
userRepo.add(user);

// ============================================================================
// 7. Ambient Modules
// ============================================================================

// Ambient modules declare modules that exist at runtime
// Typically used in .d.ts files for JavaScript libraries

declare module "my-custom-module" {
  export interface CustomConfig {
    apiKey: string;
    endpoint: string;
  }

  export function initialize(config: CustomConfig): void;
  export function processData(data: any): any;
}

// Now you can import from this ambient module
// import { initialize, CustomConfig } from "my-custom-module";

// ============================================================================
// 8. Module Augmentation
// ============================================================================

// Augmenting existing modules
declare module "./math" {
  export function calculateVolume(length: number, width: number, height: number): number;
}

// This would be in a separate file
// export function calculateVolume(length: number, width: number, height: number): number {
//   return length * width * height;
// }

// ============================================================================
// 9. CommonJS Modules
// ============================================================================

// CommonJS export
// module.exports = {
//   calculateArea,
//   calculatePerimeter,
//   PI
// };

// CommonJS import (commented out)
// const { calculateArea, calculatePerimeter } = require("./math");

// TypeScript with CommonJS
// export = syntax
// export = {
//   calculateArea,
//   calculatePerimeter,
//   PI
// };

// import = require() syntax
// import math = require("./math");

// ============================================================================
// 10. Pitfall: /// <reference>-ing a Module
// ============================================================================

// WRONG: Using /// <reference> for modules
// /// <reference path="math.ts" />
// import { calculateArea } from "./math"; // This is correct

// CORRECT: Use import statements for modules
// import { calculateArea } from "./math";

// /// <reference> is for ambient declarations and type references
// Example of correct usage:
// /// <reference types="node" />
// This references Node.js type definitions

// ============================================================================
// 11. Pitfall: Needless Namespacing
// ============================================================================

// BAD: Wrapping exports in a namespace unnecessarily
/*
export namespace Shapes {
  export class Triangle {
    sides = 3;
  }
  export class Square {
    sides = 4;
  }
}

// Usage becomes verbose:
// import * as shapes from "./shapes";
// const t = new shapes.Shapes.Triangle(); // shapes.Shapes? Unnecessary!
*/

// GOOD: Export directly without namespace
export class Triangle {
  sides = 3;
}

export class Square {
  sides = 4;
}

// Usage is cleaner:
// import * as shapes from "./shapes";
// const t = new shapes.Triangle(); // Much better!

// ============================================================================
// 12. When to Use Namespaces vs Modules
// ============================================================================

// Use Modules when:
// - Building modern applications (Node.js, bundlers, etc.)
// - Need better code organization and tree-shaking
// - Want better tooling support
// - Working with ES6+ JavaScript

// Example: Modern module-based structure
export class UserService {
  getUser(id: number) {
    return { id, name: "User" };
  }
}

export class OrderService {
  getOrder(id: number) {
    return { id, total: 100 };
  }
}

// Use Namespaces when:
// - Building web applications with global script tags
// - Need to organize code without a module system
// - Legacy codebases
// - Type definitions for libraries

// Example: Namespace for type definitions
namespace GlobalLibrary {
  export interface Config {
    apiKey: string;
  }

  export function init(config: Config): void {
    // Implementation
  }
}

// ============================================================================
// 13. Combining Namespaces and Modules
// ============================================================================

// You can export a namespace from a module
export namespace Utils {
  export function formatDate(date: Date): string {
    return date.toISOString();
  }

  export function formatCurrency(amount: number): string {
    return `$${amount.toFixed(2)}`;
  }
}

// Usage:
// import { Utils } from "./utils";
// const formatted = Utils.formatDate(new Date());

// ============================================================================
// 14. Namespace Aliases
// ============================================================================

// Creating shorter aliases for long namespace names
namespace VeryLongNamespaceName {
  export namespace AnotherLongName {
    export class MyClass {
      value = "hello";
    }
  }
}

// Create alias
import MyClass = VeryLongNamespaceName.AnotherLongName.MyClass;

const instance = new MyClass();
console.log(instance.value);

// ============================================================================
// 15. Module Resolution
// ============================================================================

// TypeScript resolves modules in this order:
// 1. Relative paths: ./file, ../folder/file
// 2. Node modules: from node_modules
// 3. Ambient modules: declared modules

// Example module structure:
// src/
//   utils/
//     math.ts (export function add...)
//     string.ts (export function capitalize...)
//   index.ts (export * from "./utils/math")

// Importing:
// import { add } from "./utils/math";
// import { capitalize } from "./utils/string";
// import { add, capitalize } from "./utils";

// ============================================================================
// 16. Export Patterns
// ============================================================================

// Pattern 1: Named exports
export const CONSTANT = "value";
export function namedFunction() {}
export class NamedClass {}

// Pattern 2: Default export
export default class DefaultClass {}

// Pattern 3: Export list
function func1() {}
function func2() {}
export { func1, func2 };

// Pattern 4: Export with renaming
function internalName() {}
export { internalName as publicName };

// Pattern 5: Re-export everything
// export * from "./other-module";

// Pattern 6: Re-export specific items
// export { item1, item2 } from "./other-module";

// Pattern 7: Re-export with renaming
// export { oldName as newName } from "./other-module";

// ============================================================================
// 17. Import Patterns
// ============================================================================

// Pattern 1: Named imports
// import { item1, item2 } from "./module";

// Pattern 2: Default import
// import DefaultClass from "./module";

// Pattern 3: Import everything
// import * as Module from "./module";

// Pattern 4: Import with renaming
// import { oldName as newName } from "./module";

// Pattern 5: Import default with named
// import DefaultClass, { namedExport } from "./module";

// Pattern 6: Side-effect import
// import "./polyfills"; // Runs code but doesn't import anything

// Pattern 7: Type-only imports
// import type { MyType } from "./module";
// import { type MyType, myFunction } from "./module";

// ============================================================================
// 18. Practical Examples
// ============================================================================

// Example 1: Library with namespace
namespace MathLibrary {
  export namespace Basic {
    export function add(a: number, b: number): number {
      return a + b;
    }

    export function subtract(a: number, b: number): number {
      return a - b;
    }
  }

  export namespace Advanced {
    export function power(base: number, exponent: number): number {
      return Math.pow(base, exponent);
    }

    export function sqrt(value: number): number {
      return Math.sqrt(value);
    }
  }
}

// Usage
const sum = MathLibrary.Basic.add(5, 3);
const result = MathLibrary.Advanced.power(2, 8);

// Example 2: Module-based API
export namespace API {
  export interface Response<T> {
    data: T;
    status: number;
    message: string;
  }

  export class HttpClient {
    async get<T>(url: string): Promise<Response<T>> {
      // Implementation
      return {
        data: {} as T,
        status: 200,
        message: "Success",
      };
    }
  }
}

// Example 3: Configuration namespace
namespace Config {
  export interface AppConfig {
    name: string;
    version: string;
    debug: boolean;
  }

  export const defaultConfig: AppConfig = {
    name: "MyApp",
    version: "1.0.0",
    debug: false,
  };

  export function getConfig(): AppConfig {
    return defaultConfig;
  }
}

// ============================================================================
// 19. Module vs Namespace Comparison
// ============================================================================

// MODULE (Modern approach)
// ✅ Better tree-shaking
// ✅ Better code splitting
// ✅ Standard JavaScript (ES6+)
// ✅ Explicit dependencies
// ✅ Works with bundlers
// ✅ Better IDE support
export class ModernClass {
  value = "modern";
}

// NAMESPACE (Legacy approach)
// ⚠️ Global namespace pollution
// ⚠️ Can span multiple files
// ⚠️ TypeScript-specific
// ⚠️ Can be concatenated
// ⚠️ Works with script tags
namespace LegacyNamespace {
  export class LegacyClass {
    value = "legacy";
  }
}

// ============================================================================
// 20. Best Practices
// ============================================================================

// 1. Prefer modules over namespaces for new code
// 2. Use namespaces only for type definitions or legacy code
// 3. Don't wrap module exports in namespaces unnecessarily
// 4. Use /// <reference> only for type definitions, not modules
// 5. Keep module structure flat and organized
// 6. Use default exports sparingly (prefer named exports)
// 7. Group related exports together
// 8. Use barrel exports (index.ts) for cleaner imports

// Example of barrel export pattern:
// utils/index.ts
// export * from "./math";
// export * from "./string";
// export * from "./date";

// Then import:
// import { calculateArea, formatDate } from "./utils";

// ============================================================================
// Export Examples
// ============================================================================

export {
  Geometry,
  Validation,
  Outer,
  Database,
  Utils,
  MathLibrary,
  API,
  Config,
  Triangle,
  Square,
  ModernClass,
};

// Export types
export type { Rectangle };

