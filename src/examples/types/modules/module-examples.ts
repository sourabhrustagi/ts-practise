/**
 * TypeScript Modules Examples
 * 
 * This file demonstrates various module patterns in TypeScript:
 * - ES Module Syntax (default and named exports)
 * - Additional Import Syntax (renaming, namespace imports, type-only imports)
 * - TypeScript Specific ES Module Syntax (type exports/imports)
 * - CommonJS Syntax
 * - Module Resolution and Output Options
 */

// ============================================================================
// ES MODULE SYNTAX - DEFAULT EXPORTS
// ============================================================================

// Default export example
export default function helloWorld() {
  console.log("Hello, world!");
}

// You can also export a default class
export default class Greeting {
  sayHello(name: string): void {
    console.log(`Hello, ${name}!`);
  }
}

// Note: A file can only have one default export
// If you want multiple default exports, you need separate files

// ============================================================================
// ES MODULE SYNTAX - NAMED EXPORTS
// ============================================================================

// Named exports using export keyword
export const pi = 3.14159;
export let squareTwo = 1.41421;
export const phi = 1.61803;

// Export a class
export class RandomNumberGenerator {
  generate(): number {
    return Math.random();
  }
}

// Export a function
export function absolute(num: number): number {
  if (num < 0) return num * -1;
  return num;
}

// Export an interface
export interface MathConstants {
  pi: number;
  e: number;
  phi: number;
}

// Export a type alias
export type MathOperation = (a: number, b: number) => number;

// Export multiple things at once
const e = 2.71828;
const goldenRatio = 1.61803;

export { e, goldenRatio };

// Export with renaming
const squareRoot = Math.sqrt;
export { squareRoot as sqrt };

// ============================================================================
// ADDITIONAL IMPORT SYNTAX
// ============================================================================

// Example: Importing named exports
// import { pi, phi, absolute } from "./maths.js";

// Example: Importing default export
// import helloWorld from "./hello.js";

// Example: Import with renaming
// import { pi as π } from "./maths.js";

// Example: Mixing default and named imports
// import RandomNumberGenerator, { pi as π, phi } from "./maths.js";

// Example: Namespace import (import all exports)
// import * as math from "./maths.js";
// Then use: math.pi, math.absolute(), etc.

// Example: Side-effect import (imports file for side effects only)
// import "./maths.js";

// ============================================================================
// TYPESCRIPT SPECIFIC ES MODULE SYNTAX - TYPE EXPORTS/IMPORTS
// ============================================================================

// Exporting types
export type Cat = {
  breed: string;
  yearOfBirth: number;
};

export interface Dog {
  breeds: string[];
  yearOfBirth: number;
}

export type Animal = Cat | Dog;

// Exporting a value that can be used as a type
export const createCatName = (): string => "fluffy";

// Example: Type-only import
// import type { Cat, Dog } from "./animal.js";

// Example: Inline type imports (TypeScript 4.5+)
// import { createCatName, type Cat, type Dog } from "./animal.js";

// This allows mixing value and type imports in one statement
// const name = createCatName(); // Works
// type Animals = Cat | Dog; // Works

// ============================================================================
// RE-EXPORTING (Re-exporting from another module)
// ============================================================================

// Re-export all exports from another module
// export * from "./maths.js";

// Re-export specific exports
// export { pi, phi } from "./maths.js";

// Re-export with renaming
// export { pi as π, phi as goldenRatio } from "./maths.js";

// Re-export default export
// export { default as DefaultExport } from "./hello.js";

// ============================================================================
// COMMONJS SYNTAX (for reference, though ES Modules are preferred)
// ============================================================================

// CommonJS export pattern
function absoluteCommonJS(num: number): number {
  if (num < 0) return num * -1;
  return num;
}

// CommonJS module.exports
// module.exports = {
//   pi: 3.14,
//   squareTwo: 1.41,
//   phi: 1.61,
//   absolute: absoluteCommonJS,
// };

// CommonJS require (in comments to show usage)
// const maths = require("./maths");
// const { squareTwo } = require("./maths");

// ============================================================================
// ES MODULE SYNTAX WITH COMMONJS BEHAVIOR
// ============================================================================

// TypeScript allows CommonJS-style require with ES Module syntax
// import fs = require("fs");
// const code = fs.readFileSync("hello.ts", "utf8");

// ============================================================================
// NON-MODULES (Script files)
// ============================================================================

// A file without any top-level import or export is treated as a script
// To convert a script to a module, add:
// export {};

// This makes the file a module even without other exports

// ============================================================================
// PRACTICAL EXAMPLES
// ============================================================================

// Example 1: Math utilities module pattern
export const add = (a: number, b: number): number => a + b;
export const subtract = (a: number, b: number): number => a - b;
export const multiply = (a: number, b: number): number => a * b;
export const divide = (a: number, b: number): number => {
  if (b === 0) throw new Error("Division by zero");
  return a / b;
};

// Export as a namespace
export const MathUtils = {
  add,
  subtract,
  multiply,
  divide,
};

// Example 2: Type exports for API responses
export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

export interface User {
  id: number;
  name: string;
  email: string;
}

export type UserResponse = ApiResponse<User>;

// Example 3: Mixed value and type exports
export const API_BASE_URL = "https://api.example.com";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface RequestConfig {
  method: HttpMethod;
  url: string;
  headers?: Record<string, string>;
}

export function makeRequest(config: RequestConfig): Promise<Response> {
  return fetch(`${API_BASE_URL}${config.url}`, {
    method: config.method,
    headers: config.headers,
  });
}

// Example 4: Default export with named exports
export default class Calculator {
  add(a: number, b: number): number {
    return a + b;
  }

  subtract(a: number, b: number): number {
    return a - b;
  }
}

export const CalculatorVersion = "1.0.0";
export type CalculatorConfig = {
  precision: number;
};

// ============================================================================
// MODULE RESOLUTION NOTES
// ============================================================================

/*
TypeScript has two main module resolution strategies:

1. Classic (default when module is not commonjs)
   - For backwards compatibility
   
2. Node (replicates Node.js behavior)
   - Resolves modules like Node.js in CommonJS mode
   - Checks for .ts and .d.ts files
   - Respects package.json "exports" and "types" fields

TSConfig flags that influence module resolution:
- moduleResolution: "node" | "classic" | "node16" | "nodenext" | "bundler"
- baseUrl: Base directory for non-relative module names
- paths: Mapping of module names to paths
- rootDirs: List of root directories

Example tsconfig.json paths:
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "utils/*": ["src/utils/*"]
    }
  }
}
*/

// ============================================================================
// MODULE OUTPUT OPTIONS
// ============================================================================

/*
The 'module' compiler option determines how modules are emitted:

Common options:
- "ES2020" / "ESNext": Modern ES Modules (import/export)
- "CommonJS": Node.js style (require/module.exports)
- "AMD": Asynchronous Module Definition
- "UMD": Universal Module Definition
- "System": SystemJS modules
- "ES6" / "ES2015": ES6 modules (older syntax)

The 'target' option determines which JS version features are used:
- "ES5", "ES2015", "ES2017", "ES2020", "ESNext", etc.

Example:
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ES2020"
  }
}
*/

// ============================================================================
// BEST PRACTICES
// ============================================================================

/*
1. Use ES Modules (import/export) instead of CommonJS when possible
2. Use explicit file extensions (.js) in imports for ES modules
3. Use 'import type' for type-only imports to improve tree-shaking
4. Prefer named exports over default exports for better refactoring
5. Use barrel exports (index.ts) to organize module exports
6. Keep module resolution consistent across your project
7. Use path aliases for cleaner import paths
8. Consider using 'export type' for type-only exports
*/

// Example: Barrel export pattern (would be in index.ts)
// export * from "./maths";
// export * from "./calculator";
// export { default as Calculator } from "./calculator";

// ============================================================================
// EXAMPLE USAGE IN OTHER FILES
// ============================================================================

/*
// File: app.ts
// Import default export
import Calculator, { CalculatorVersion, type CalculatorConfig } from "./module-examples.js";

// Import named exports
import { add, subtract, multiply, divide } from "./module-examples.js";

// Import with namespace
import * as MathUtils from "./module-examples.js";

// Import types only
import type { ApiResponse, User } from "./module-examples.js";

// Mix value and type imports
import { API_BASE_URL, type RequestConfig, makeRequest } from "./module-examples.js";

// Usage
const calc = new Calculator();
const result = calc.add(5, 3);

const sum = add(10, 20);
const product = MathUtils.multiply(4, 5);

const userResponse: ApiResponse<User> = {
  success: true,
  data: {
    id: 1,
    name: "John",
    email: "john@example.com",
  },
};
*/

export {};

