/**
 * Module Usage Examples
 * 
 * This file demonstrates how to import and use modules
 * from the other module example files
 */

// ============================================================================
// BASIC NAMED IMPORTS
// ============================================================================

import { pi, phi, absolute, RandomNumberGenerator } from "./module-maths.js";

console.log("Pi value:", pi);
console.log("Phi value:", phi);
const absValue = absolute(-42);
console.log("Absolute of -42:", absValue);

const rng = new RandomNumberGenerator();
console.log("Random number:", rng.generate());

// ============================================================================
// IMPORT WITH RENAMING
// ============================================================================

import { pi as π, squareTwo, sqrt } from "./module-maths.js";

console.log("Pi (renamed):", π);
console.log("Square root function:", sqrt(16));

// ============================================================================
// NAMESPACE IMPORT
// ============================================================================

import * as math from "./module-maths.js";

console.log("Math namespace - pi:", math.pi);
console.log("Math namespace - absolute:", math.absolute(-10));
const rng2 = new math.RandomNumberGenerator();

// ============================================================================
// DEFAULT IMPORT
// ============================================================================

import helloWorld, { greeting } from "./module-hello.js";

helloWorld();
console.log("Greeting:", greeting);

// ============================================================================
// MIXED DEFAULT AND NAMED IMPORTS
// ============================================================================

// Example pattern (commented since we don't have a file with both):
// import DefaultExport, { namedExport1, namedExport2 } from "./module.js";

// ============================================================================
// TYPE-ONLY IMPORTS
// ============================================================================

import type { Cat, Dog, Animal } from "./module-animal.js";

// Types can be used for annotations
const myCat: Cat = {
  breed: "Persian",
  yearOfBirth: 2020,
};

const myDog: Dog = {
  breeds: ["Labrador", "Golden Retriever"],
  yearOfBirth: 2019,
};

// ============================================================================
// INLINE TYPE IMPORTS (TypeScript 4.5+)
// ============================================================================

import { createCatName, type Cat as CatType } from "./module-animal.js";

// Value import works
const catName = createCatName();
console.log("Cat name:", catName);

// Type import works
const anotherCat: CatType = {
  breed: "Siamese",
  yearOfBirth: 2021,
};

// ============================================================================
// SIDE-EFFECT IMPORTS
// ============================================================================

// Import a module just for its side effects
// This runs the module's code but doesn't import any values
// import "./module-maths.js";

// ============================================================================
// PRACTICAL EXAMPLE: Using multiple modules together
// ============================================================================

function calculateCircleArea(radius: number): number {
  return math.pi * radius * radius;
}

function calculateAbsoluteDifference(a: number, b: number): number {
  return math.absolute(a - b);
}

// Example usage
const area = calculateCircleArea(5);
console.log("Circle area:", area);

const diff = calculateAbsoluteDifference(10, 15);
console.log("Absolute difference:", diff);

// ============================================================================
// RE-EXPORTING EXAMPLES
// ============================================================================

// Re-export all from a module
export * from "./module-maths.js";

// Re-export specific items
export { pi, phi } from "./module-maths.js";

// Re-export with renaming
export { pi as π, phi as goldenRatio } from "./module-maths.js";

// Re-export types
export type { Cat, Dog, Animal } from "./module-animal.js";

// ============================================================================
// COMMONJS INTEROP EXAMPLE (commented)
// ============================================================================

// When using CommonJS modules in a TypeScript ES Module project:
// import fs = require("fs");
// const fs2 = require("fs");

// This is useful when importing Node.js built-in modules or
// npm packages that use CommonJS

export {};

