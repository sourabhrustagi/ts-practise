/**
 * Global Augmentation Examples
 * 
 * This file demonstrates how to add declarations to the global scope
 * from inside a module using global augmentation
 */

// ============================================================================
// GLOBAL AUGMENTATION - Array Extensions
// ============================================================================

// Add methods to Array prototype
declare global {
  interface Array<T> {
    /**
     * Converts array to a comma-separated string
     */
    toCommaString(): string;

    /**
     * Groups array elements by a key function
     */
    groupBy<K extends string | number>(
      keyFn: (item: T) => K
    ): Record<K, T[]>;

    /**
     * Removes duplicates from array
     */
    unique(): T[];

    /**
     * Chunks array into smaller arrays of specified size
     */
    chunk(size: number): T[][];
  }
}

// Implementation
Array.prototype.toCommaString = function <T>(this: T[]): string {
  return this.join(", ");
};

Array.prototype.groupBy = function <T, K extends string | number>(
  this: T[],
  keyFn: (item: T) => K
): Record<K, T[]> {
  return this.reduce((acc, item) => {
    const key = keyFn(item);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {} as Record<K, T[]>);
};

Array.prototype.unique = function <T>(this: T[]): T[] {
  return Array.from(new Set(this));
};

Array.prototype.chunk = function <T>(this: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < this.length; i += size) {
    chunks.push(this.slice(i, i + size));
  }
  return chunks;
};

// ============================================================================
// USAGE EXAMPLES
// ============================================================================

const numbers = [1, 2, 3, 4, 5];
console.log(numbers.toCommaString()); // "1, 2, 3, 4, 5"

const users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 25 },
];
const groupedByAge = users.groupBy((user) => user.age);
// { 25: [{ name: "Alice", age: 25 }, { name: "Charlie", age: 25 }], 30: [{ name: "Bob", age: 30 }] }

const duplicates = [1, 2, 2, 3, 3, 3, 4];
const unique = duplicates.unique(); // [1, 2, 3, 4]

const chunked = [1, 2, 3, 4, 5, 6, 7].chunk(3);
// [[1, 2, 3], [4, 5, 6], [7]]

// ============================================================================
// GLOBAL AUGMENTATION - String Extensions
// ============================================================================

declare global {
  interface String {
    /**
     * Capitalizes the first letter
     */
    capitalize(): string;

    /**
     * Converts string to camelCase
     */
    toCamelCase(): string;

    /**
     * Converts string to kebab-case
     */
    toKebabCase(): string;

    /**
     * Checks if string is a valid email
     */
    isValidEmail(): boolean;

    /**
     * Truncates string to specified length with ellipsis
     */
    truncate(length: number): string;
  }
}

String.prototype.capitalize = function (this: string): string {
  return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

String.prototype.toCamelCase = function (this: string): string {
  return this.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
    .replace(/^[A-Z]/, (c) => c.toLowerCase());
};

String.prototype.toKebabCase = function (this: string): string {
  return this.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
};

String.prototype.isValidEmail = function (this: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(this);
};

String.prototype.truncate = function (this: string, length: number): string {
  if (this.length <= length) return this;
  return this.slice(0, length) + "...";
};

// Usage
const greeting = "hello world";
console.log(greeting.capitalize()); // "Hello world"

const kebab = "myVariableName".toKebabCase(); // "my-variable-name"
const camel = "my-variable-name".toCamelCase(); // "myVariableName"

const email = "user@example.com";
console.log(email.isValidEmail()); // true

const longText = "This is a very long text that needs truncation";
console.log(longText.truncate(20)); // "This is a very long..."

// ============================================================================
// GLOBAL AUGMENTATION - Number Extensions
// ============================================================================

declare global {
  interface Number {
    /**
     * Formats number as currency
     */
    toCurrency(symbol?: string): string;

    /**
     * Formats number with commas
     */
    toFormattedString(): string;

    /**
     * Converts number to percentage string
     */
    toPercentage(decimals?: number): string;

    /**
     * Checks if number is between two values (inclusive)
     */
    isBetween(min: number, max: number): boolean;
  }
}

Number.prototype.toCurrency = function (
  this: number,
  symbol: string = "$"
): string {
  return `${symbol}${this.toFixed(2)}`;
};

Number.prototype.toFormattedString = function (this: number): string {
  return this.toLocaleString();
};

Number.prototype.toPercentage = function (
  this: number,
  decimals: number = 2
): string {
  return `${(this * 100).toFixed(decimals)}%`;
};

Number.prototype.isBetween = function (
  this: number,
  min: number,
  max: number
): boolean {
  return this >= min && this <= max;
};

// Usage
const price = 1234.56;
console.log(price.toCurrency()); // "$1234.56"
console.log(price.toCurrency("€")); // "€1234.56"
console.log(price.toFormattedString()); // "1,234.56"

const ratio = 0.8543;
console.log(ratio.toPercentage()); // "85.43%"
console.log(ratio.toPercentage(1)); // "85.4%"

const age = 25;
console.log(age.isBetween(18, 65)); // true

// ============================================================================
// GLOBAL AUGMENTATION - Date Extensions
// ============================================================================

declare global {
  interface Date {
    /**
     * Gets date in YYYY-MM-DD format
     */
    toDateString(): string;

    /**
     * Gets date in readable format
     */
    toReadableString(): string;

    /**
     * Checks if date is today
     */
    isToday(): boolean;

    /**
     * Gets relative time string (e.g., "2 hours ago")
     */
    toRelativeTime(): string;
  }
}

Date.prototype.toDateString = function (this: Date): string {
  const year = this.getFullYear();
  const month = String(this.getMonth() + 1).padStart(2, "0");
  const day = String(this.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

Date.prototype.toReadableString = function (this: Date): string {
  return this.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

Date.prototype.isToday = function (this: Date): boolean {
  const today = new Date();
  return (
    this.getDate() === today.getDate() &&
    this.getMonth() === today.getMonth() &&
    this.getFullYear() === today.getFullYear()
  );
};

Date.prototype.toRelativeTime = function (this: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - this.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return "just now";
  if (diffMin < 60) return `${diffMin} minute${diffMin > 1 ? "s" : ""} ago`;
  if (diffHour < 24) return `${diffHour} hour${diffHour > 1 ? "s" : ""} ago`;
  if (diffDay < 7) return `${diffDay} day${diffDay > 1 ? "s" : ""} ago`;
  return this.toReadableString();
};

// Usage
const date = new Date();
console.log(date.toDateString()); // "2024-01-15"
console.log(date.toReadableString()); // "Monday, January 15, 2024"
console.log(date.isToday()); // true (if run today)

const pastDate = new Date(Date.now() - 2 * 60 * 60 * 1000); // 2 hours ago
console.log(pastDate.toRelativeTime()); // "2 hours ago"

// ============================================================================
// GLOBAL AUGMENTATION - Custom Global Types
// ============================================================================

declare global {
  /**
   * Global configuration object
   */
  interface Window {
    appConfig?: {
      apiUrl: string;
      environment: "development" | "production";
      version: string;
    };
  }

  /**
   * Global utility function
   */
  function logWithTimestamp(message: string): void;
}

// Implementation (for browser environment)
if (typeof window !== "undefined") {
  window.appConfig = {
    apiUrl: "https://api.example.com",
    environment: "development",
    version: "1.0.0",
  };
}

// Implementation of global function
global.logWithTimestamp = function (message: string): void {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${message}`);
};

// Usage (would work in Node.js or browser)
// logWithTimestamp("Application started");

// ============================================================================
// BEST PRACTICES FOR GLOBAL AUGMENTATION
// ============================================================================

/*
1. Use global augmentation sparingly - it affects the entire codebase
2. Prefer module augmentation over global augmentation when possible
3. Always document your augmentations with JSDoc comments
4. Consider creating a separate file for global augmentations
5. Be aware of potential conflicts with other libraries
6. Test thoroughly as global augmentations affect all code
7. Use type guards and proper type checking in implementations
8. Consider using a namespace to organize global types
*/

export {};

