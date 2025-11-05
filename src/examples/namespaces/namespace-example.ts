/**
 * Namespace Example - Demonstrating TypeScript Namespace patterns
 * This file shows how to organize code using namespaces
 */

// ============================================================================
// Basic Namespace
// ============================================================================

namespace Shapes {
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
  }

  export class Rectangle {
    constructor(
      public width: number,
      public height: number
    ) {}

    area(): number {
      return this.width * this.height;
    }
  }
}

// ============================================================================
// Namespace Merging (Part 1)
// ============================================================================

namespace Validation {
  export interface StringValidator {
    isAcceptable(s: string): boolean;
  }
}

// ============================================================================
// Namespace Merging (Part 2) - This will merge with the one above
// ============================================================================

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

// ============================================================================
// Nested Namespace
// ============================================================================

namespace App {
  export namespace Utils {
    export function formatDate(date: Date): string {
      return date.toISOString();
    }

    export function formatCurrency(amount: number): string {
      return `$${amount.toFixed(2)}`;
    }
  }

  export namespace Services {
    export class UserService {
      getUsers(): Array<{ id: number; name: string }> {
        return [{ id: 1, name: "Alice" }];
      }
    }
  }
}

// ============================================================================
// Using namespaces
// ============================================================================

// Using basic namespace
const circle = new Shapes.Circle({ x: 0, y: 0 }, 5);
console.log(circle.area());

// Using merged namespace
const zipValidator = new Validation.ZipCodeValidator();
console.log(zipValidator.isAcceptable("12345")); // true

// Using nested namespace
const formatted = App.Utils.formatCurrency(100.5);
console.log(formatted);

// ============================================================================
// Export namespace (when used in a module)
// ============================================================================

export { Shapes, Validation, App };

// ============================================================================
// Namespace alias
// ============================================================================

import ShapesNS = Shapes;
import AppUtils = App.Utils;

const circle2 = new ShapesNS.Circle({ x: 0, y: 0 }, 10);
const formatted2 = AppUtils.formatCurrency(50.25);

