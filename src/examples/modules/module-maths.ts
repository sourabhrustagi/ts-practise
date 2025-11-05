/**
 * Example module demonstrating named exports
 * This file shows various export patterns
 */

export const pi = 3.14159;
export let squareTwo = 1.41421;
export const phi = 1.61803;

export class RandomNumberGenerator {
  generate(): number {
    return Math.random();
  }
}

export function absolute(num: number): number {
  if (num < 0) return num * -1;
  return num;
}

// Export multiple at once
const e = 2.71828;
export { e };

// Export with renaming
const squareRoot = Math.sqrt;
export { squareRoot as sqrt };

