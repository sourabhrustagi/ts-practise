/**
 * Module Example - Demonstrating ES Module patterns
 * This file shows how to properly structure code using modules
 */

// ============================================================================
// Named Exports
// ============================================================================

export function add(a: number, b: number): number {
  return a + b;
}

export function subtract(a: number, b: number): number {
  return a - b;
}

export const PI = 3.14159;

export class Calculator {
  add(a: number, b: number): number {
    return a + b;
  }

  subtract(a: number, b: number): number {
    return a - b;
  }
}

// ============================================================================
// Default Export
// ============================================================================

export default class MathHelper {
  static multiply(a: number, b: number): number {
    return a * b;
  }

  static divide(a: number, b: number): number {
    return b !== 0 ? a / b : NaN;
  }
}

// ============================================================================
// Export List Pattern
// ============================================================================

function internalFunction1(): string {
  return "internal 1";
}

function internalFunction2(): string {
  return "internal 2";
}

export { internalFunction1, internalFunction2 };

// ============================================================================
// Export with Renaming
// ============================================================================

function createUser(name: string) {
  return { name };
}

export { createUser as createUserAccount };

// ============================================================================
// Type Exports
// ============================================================================

export interface User {
  id: number;
  name: string;
  email: string;
}

export type Status = "active" | "inactive" | "pending";

// ============================================================================
// How to import this module:
// ============================================================================
// import { add, subtract, PI, Calculator } from "./module-example";
// import MathHelper, { add } from "./module-example";
// import * as Math from "./module-example";
// import type { User, Status } from "./module-example";

