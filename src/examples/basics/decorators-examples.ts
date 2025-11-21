/**
 * TypeScript Decorators Examples
 * 
 * This file demonstrates various types of decorators in TypeScript:
 * - Class Decorators
 * - Method Decorators
 * - Accessor Decorators
 * - Property Decorators
 * - Parameter Decorators
 * - Decorator Composition
 * - Metadata Usage
 * 
 * NOTE: This document refers to an experimental stage 2 decorators implementation.
 * Stage 3 decorator support is available since TypeScript 5.0.
 * 
 * To use decorators, ensure experimentalDecorators is enabled in tsconfig.json
 */

// ============================================================================
// 1. CLASS DECORATORS
// ============================================================================

/**
 * Class Decorator: Sealed
 * Seals both the constructor and its prototype to prevent further modifications
 */
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
  console.log(`Class ${(constructor as any).name} has been sealed`);
}

@sealed
class BugReportSealed {
  type = "report";
  title: string;

  constructor(t: string) {
    this.title = t;
  }
}

/**
 * Class Decorator Factory: Reportable
 * Adds a reportingURL property to the class
 */
function reportableClassDecorator<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    reportingURL = "http://www.example.com/report";
  };
}

@reportableClassDecorator
class FeatureRequest {
  type = "feature";
  title: string;

  constructor(t: string) {
    this.title = t;
  }
}

// ============================================================================
// 2. METHOD DECORATORS
// ============================================================================

/**
 * Method Decorator Factory: Enumerable
 * Controls whether a method appears in enumeration
 */
function enumerable(value: boolean) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.enumerable = value;
    console.log(`Method ${propertyKey} enumerable set to ${value}`);
  };
}

/**
 * Method Decorator: Log
 * Logs method calls with arguments and return values
 */
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${propertyKey} with arguments:`, args);
    const result = originalMethod.apply(this, args);
    console.log(`${propertyKey} returned:`, result);
    return result;
  };

  return descriptor;
}

/**
 * Method Decorator Factory: Timing
 * Measures execution time of a method
 */
function timing(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const start = performance.now();
    const result = originalMethod.apply(this, args);
    const end = performance.now();
    console.log(`${propertyKey} took ${(end - start).toFixed(2)}ms`);
    return result;
  };

  return descriptor;
}

class Greeter {
  greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }

  @enumerable(false)
  @log
  greet() {
    return "Hello, " + this.greeting;
  }

  @timing
  computeSum(a: number, b: number): number {
    // Simulate some work
    let sum = 0;
    for (let i = 0; i < 1000000; i++) {
      sum += i;
    }
    return a + b;
  }
}

// ============================================================================
// 3. ACCESSOR DECORATORS
// ============================================================================

/**
 * Accessor Decorator Factory: Configurable
 * Controls whether a property descriptor can be changed
 */
function configurable(value: boolean) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.configurable = value;
    console.log(`Accessor ${propertyKey} configurable set to ${value}`);
  };
}

/**
 * Accessor Decorator: Readonly
 * Makes a getter read-only by preventing setter
 */
function readonly(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  if (descriptor.set) {
    const originalSet = descriptor.set;
    descriptor.set = function (value: any) {
      throw new Error(`Cannot set ${propertyKey} - it is read-only`);
    };
  }
  return descriptor;
}

class Point {
  private _x: number;
  private _y: number;

  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  @configurable(false)
  get x() {
    return this._x;
  }

  @configurable(false)
  get y() {
    return this._y;
  }

  @readonly
  get coordinates(): string {
    return `(${this._x}, ${this._y})`;
  }
}

// ============================================================================
// 4. PROPERTY DECORATORS
// ============================================================================

/**
 * Property Decorator Factory: Format
 * Stores format metadata for a property
 */
const formatMetadataKey = Symbol("format");

function format(formatString: string) {
  return function (target: any, propertyKey: string) {
    // Store metadata (would typically use reflect-metadata in real scenarios)
    if (!target.__metadata) {
      target.__metadata = {};
    }
    if (!target.__metadata[propertyKey]) {
      target.__metadata[propertyKey] = {};
    }
    target.__metadata[propertyKey].format = formatString;
    console.log(`Format metadata added for ${propertyKey}: ${formatString}`);
  };
}

function getFormat(target: any, propertyKey: string): string | undefined {
  return target.__metadata?.[propertyKey]?.format;
}

/**
 * Property Decorator: Default
 * Sets a default value for a property
 */
function defaultValue(value: any) {
  return function (target: any, propertyKey: string) {
    if (!target[propertyKey]) {
      target[propertyKey] = value;
    }
    console.log(`Default value set for ${propertyKey}: ${value}`);
  };
}

class FormattedGreeter {
  @format("Hello, %s")
  greeting: string;

  @defaultValue("World")
  name!: string;

  constructor(message: string) {
    this.greeting = message;
  }

  greet() {
    const formatString = getFormat(this, "greeting") || "%s";
    return formatString.replace("%s", this.greeting);
  }
}

// ============================================================================
// 5. PARAMETER DECORATORS
// ============================================================================

/**
 * Parameter Decorator: Required
 * Marks a parameter as required (metadata storage)
 */
const requiredMetadataKey = Symbol("required");

function required(target: any, propertyKey: string | symbol, parameterIndex: number) {
  if (!target.__requiredParams) {
    target.__requiredParams = {};
  }
  if (!target.__requiredParams[propertyKey]) {
    target.__requiredParams[propertyKey] = [];
  }
  target.__requiredParams[propertyKey].push(parameterIndex);
  console.log(`Parameter at index ${parameterIndex} of ${String(propertyKey)} marked as required`);
}

/**
 * Method Decorator: Validate
 * Validates that required parameters are provided
 */
function validate<T extends (...args: any[]) => any>(
  target: any,
  propertyName: string,
  descriptor: TypedPropertyDescriptor<T>
) {
  const method = descriptor.value!;

  descriptor.value = function (this: any, ...args: any[]) {
    const requiredParams: number[] = target.__requiredParams?.[propertyName] || [];
    
    if (requiredParams.length > 0) {
      for (const parameterIndex of requiredParams) {
        if (parameterIndex >= args.length || args[parameterIndex] === undefined) {
          throw new Error(`Missing required argument at index ${parameterIndex} for ${propertyName}`);
        }
      }
    }
    
    return method.apply(this, args);
  } as T;
}

/**
 * Parameter Decorator Factory: Min/Max
 * Validates numeric parameter ranges
 */
function minMax(min: number, max: number) {
  return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
    if (!target.__paramValidators) {
      target.__paramValidators = {};
    }
    if (!target.__paramValidators[propertyKey]) {
      target.__paramValidators[propertyKey] = {};
    }
    target.__paramValidators[propertyKey][parameterIndex] = { min, max };
  };
}

class BugReport {
  type = "report";
  title: string;

  constructor(t: string) {
    this.title = t;
  }

  @validate
  print(@required verbose: boolean) {
    if (verbose) {
      return `type: ${this.type}\ntitle: ${this.title}`;
    } else {
      return this.title;
    }
  }

  @validate
  setPriority(@required @minMax(1, 5) priority: number) {
    console.log(`Setting priority to ${priority}`);
    return priority;
  }
}

// ============================================================================
// 6. DECORATOR COMPOSITION
// ============================================================================

/**
 * Demonstrates decorator composition order
 * Decorators are evaluated top-to-bottom, but executed bottom-to-top
 */
function first() {
  console.log("first(): factory evaluated");
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("first(): called");
  };
}

function second() {
  console.log("second(): factory evaluated");
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("second(): called");
  };
}

function third() {
  console.log("third(): factory evaluated");
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("third(): called");
  };
}

class ExampleClass {
  @first()
  @second()
  @third()
  method() {
    console.log("Method executed");
  }
}

// ============================================================================
// 7. METADATA USAGE (with reflect-metadata)
// ============================================================================

/**
 * Note: This section demonstrates metadata usage patterns.
 * For full metadata support, install reflect-metadata:
 * npm install reflect-metadata --save
 * 
 * And import it at the top of your file:
 * import "reflect-metadata";
 */

/**
 * Type validation decorator using metadata
 */
function validateType<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>) {
  const set = descriptor.set!;

  descriptor.set = function (value: T) {
    // In a real scenario with reflect-metadata:
    // const type = Reflect.getMetadata("design:type", target, propertyKey);
    // if (!(value instanceof type)) {
    //   throw new TypeError(`Invalid type, got ${typeof value} not ${type.name}.`);
    // }
    
    // Simplified version without reflect-metadata:
    if (value === null || value === undefined) {
      throw new TypeError(`Invalid value for ${propertyKey}`);
    }
    
    set.call(this, value);
  };
}

class Line {
  private _start!: Point;
  private _end!: Point;

  @validateType
  set start(value: Point) {
    this._start = value;
  }

  get start() {
    return this._start;
  }

  @validateType
  set end(value: Point) {
    this._end = value;
  }

  get end() {
    return this._end;
  }
}

// ============================================================================
// 8. PRACTICAL EXAMPLES
// ============================================================================

/**
 * Decorator: Memoize
 * Caches method results based on arguments
 */
function memoize(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const cache = new Map<string, any>();

  descriptor.value = function (...args: any[]) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      console.log(`Cache hit for ${propertyKey} with key: ${key}`);
      return cache.get(key);
    }
    
    const result = originalMethod.apply(this, args);
    cache.set(key, result);
    console.log(`Cache miss for ${propertyKey}, storing result`);
    return result;
  };

  return descriptor;
}

/**
 * Decorator Factory: Throttle
 * Limits function calls to once per specified time period
 */
function throttle(ms: number) {
  let lastCall = 0;
  
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const now = Date.now();
      if (now - lastCall >= ms) {
        lastCall = now;
        return originalMethod.apply(this, args);
      } else {
        console.log(`${propertyKey} throttled - waiting ${ms}ms`);
        return undefined;
      }
    };

    return descriptor;
  };
}

/**
 * Decorator Factory: Retry
 * Retries a method on failure
 */
function retry(maxAttempts: number = 3) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      let lastError: Error | undefined;
      
      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
          return await originalMethod.apply(this, args);
        } catch (error) {
          lastError = error as Error;
          console.log(`${propertyKey} attempt ${attempt} failed:`, error);
          if (attempt < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
          }
        }
      }
      
      throw lastError;
    };

    return descriptor;
  };
}

class ApiService {
  @memoize
  expensiveCalculation(n: number): number {
    console.log(`Computing expensive calculation for ${n}`);
    return n * n * n;
  }

  @throttle(1000)
  sendRequest(data: any) {
    console.log("Sending request:", data);
    return { success: true, data };
  }

  @retry(3)
  async fetchData(url: string): Promise<any> {
    // Simulate network call that might fail
    if (Math.random() > 0.5) {
      throw new Error("Network error");
    }
    return { url, data: "success" };
  }
}

// ============================================================================
// 9. COMBINING MULTIPLE DECORATOR TYPES
// ============================================================================

/**
 * Complex example combining multiple decorator types
 */
function logClass(message: string) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    console.log(`${message}: ${(constructor as any).name}`);
    return constructor;
  };
}

function logMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  
  descriptor.value = function (this: any, ...args: any[]) {
    console.log(`[${(target.constructor as any).name}] Calling ${propertyKey}`);
    return originalMethod.apply(this, args);
  };
  
  return descriptor;
}

@logClass("Creating logged class")
class UserService {
  @logMethod
  @validate
  createUser(@required name: string, @required email: string) {
    console.log(`Creating user: ${name} (${email})`);
    return { name, email, id: Math.random() };
  }

  @logMethod
  @timing
  processUsers(users: any[]) {
    return users.map(user => ({ ...user, processed: true }));
  }
}

// ============================================================================
// 10. USAGE EXAMPLES
// ============================================================================

console.log("\n=== DECORATORS EXAMPLES ===\n");

// Class Decorators
console.log("1. Class Decorators:");
const bugSealed = new BugReportSealed("Needs dark mode");
console.log(bugSealed.title); // "Needs dark mode"
console.log(bugSealed.type); // "report"

const feature = new FeatureRequest("Add dark mode");
console.log(feature.title); // "Add dark mode"
// @ts-ignore - TypeScript doesn't know about reportingURL
console.log((feature as any).reportingURL); // "http://www.example.com/report"

// Method Decorators
console.log("\n2. Method Decorators:");
const greeter = new Greeter("World");
greeter.greet();
greeter.computeSum(5, 10);

// Accessor Decorators
console.log("\n3. Accessor Decorators:");
const point = new Point(10, 20);
console.log(point.x); // 10
console.log(point.y); // 20
console.log(point.coordinates); // "(10, 20)"

// Property Decorators
console.log("\n4. Property Decorators:");
const formattedGreeter = new FormattedGreeter("TypeScript");
console.log(formattedGreeter.greet()); // "Hello, TypeScript"

// Parameter Decorators
console.log("\n5. Parameter Decorators:");
const bugReport = new BugReport("Test Report");
try {
  bugReport.print(true); // Works
  bugReport.print(false); // Works
  // bugReport.print(); // Would throw error if called
  bugReport.setPriority(3); // Works
  // bugReport.setPriority(10); // Would fail validation if implemented
} catch (error) {
  console.error("Error:", (error as Error).message);
}

// Decorator Composition
console.log("\n6. Decorator Composition:");
const example = new ExampleClass();
example.method();

// Metadata Usage
console.log("\n7. Metadata Usage:");
const line = new Line();
line.start = new Point(0, 0);
line.end = new Point(10, 10);
console.log("Line created successfully");

// Practical Examples
console.log("\n8. Practical Examples:");
const apiService = new ApiService();
console.log(apiService.expensiveCalculation(5)); // Computes
console.log(apiService.expensiveCalculation(5)); // Uses cache
apiService.sendRequest({ action: "test" });
apiService.sendRequest({ action: "test" }); // Throttled

// Combined Decorators
console.log("\n9. Combined Decorators:");
const userService = new UserService();
userService.createUser("John Doe", "john@example.com");
userService.processUsers([{ name: "Alice" }, { name: "Bob" }]);

console.log("\n=== END OF EXAMPLES ===\n");

export {};

