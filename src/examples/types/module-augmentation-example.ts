/**
 * Module Augmentation Examples
 * 
 * This file demonstrates how to augment existing modules
 * to add new properties or methods to exported classes/interfaces
 */

// ============================================================================
// EXAMPLE: Observable Class Augmentation
// ============================================================================

// This would typically be in a separate file: observable.ts
export class Observable<T> {
  constructor(private value: T) {}

  getValue(): T {
    return this.value;
  }

  setValue(value: T): void {
    (this as any).value = value;
  }
}

// ============================================================================
// MODULE AUGMENTATION - Adding Methods to Observable
// ============================================================================

// This would typically be in a separate file: map.ts
// The module augmentation tells TypeScript about the new method

declare module "./module-augmentation-example" {
  interface Observable<T> {
    map<U>(f: (x: T) => U): Observable<U>;
    filter(predicate: (x: T) => boolean): Observable<T>;
    reduce<U>(reducer: (acc: U, val: T) => U, initial: U): Observable<U>;
  }
}

// Implementation of the augmented methods
Observable.prototype.map = function <T, U>(
  this: Observable<T>,
  f: (x: T) => U
): Observable<U> {
  return new Observable(f(this.getValue()));
};

Observable.prototype.filter = function <T>(
  this: Observable<T>,
  predicate: (x: T) => boolean
): Observable<T> {
  const value = this.getValue();
  return predicate(value) ? this : new Observable(value);
};

Observable.prototype.reduce = function <T, U>(
  this: Observable<T>,
  reducer: (acc: U, val: T) => U,
  initial: U
): Observable<U> {
  return new Observable(reducer(initial, this.getValue()));
};

// ============================================================================
// USAGE EXAMPLE
// ============================================================================

// Now Observable has all the augmented methods
const obs = new Observable(5);
const doubled = obs.map((x) => x * 2);
console.log(doubled.getValue()); // 10

const filtered = obs.filter((x) => x > 3);
console.log(filtered.getValue()); // 5

const reduced = obs.reduce((acc, val) => acc + val, 0);
console.log(reduced.getValue()); // 5

// ============================================================================
// EXAMPLE: Interface Augmentation
// ============================================================================

// Original interface
export interface User {
  id: number;
  name: string;
  email: string;
}

// Augmentation - adding new properties
declare module "./module-augmentation-example" {
  interface User {
    avatar?: string;
    lastLogin?: Date;
    preferences?: {
      theme: "light" | "dark";
      notifications: boolean;
    };
  }
}

// Usage
const user: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  avatar: "https://example.com/avatar.jpg",
  lastLogin: new Date(),
  preferences: {
    theme: "dark",
    notifications: true,
  },
};

// ============================================================================
// EXAMPLE: Augmenting Third-Party Module
// ============================================================================

// Example pattern for augmenting a third-party library
// This would be in a separate file: express-augmentation.ts

// declare module "express-serve-static-core" {
//   interface Request {
//     user?: {
//       id: number;
//       name: string;
//     };
//   }
// }

// ============================================================================
// LIMITATIONS
// ============================================================================

/*
Module Augmentation Limitations:

1. You cannot declare new top-level declarations in the augmentation
   - Only patches to existing declarations are allowed

2. Default exports cannot be augmented
   - Only named exports can be augmented
   - You need to augment by the exported name, and "default" is a reserved word

3. The module name must match exactly how it's imported
   - Use the same path/name as in your import statements
*/

export {};

