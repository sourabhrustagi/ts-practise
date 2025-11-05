// TypeScript Basics: Based on the TypeScript Handbook
// Demonstrating static type-checking, tooling, explicit types, strictness, etc.

console.log("-- TypeScript Basics Examples --\n");

// ============================================================================
// 1) STATIC TYPE-CHECKING
// ============================================================================
console.log("--- 1) STATIC TYPE-CHECKING ---");

// BAD: JavaScript - errors only at runtime
function badGreet(person: any, date: any) {
    console.log(`Hello ${person}, today is ${date}!`);
}
// This would fail at runtime in JavaScript:
// badGreet("Brendan"); // Missing argument - would crash or behave unexpectedly

// GOOD: TypeScript - catches errors before runtime
function goodGreet(person: string, date: Date) {
    console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}

// TypeScript catches this at compile time:
// goodGreet("Brendan"); // Error: Expected 2 arguments, but got 1

// Correct usage:
goodGreet("Brendan", new Date());

// Example: Trying to call a string as function
const messageStr = "Hello World!";
// messageStr(); // TypeScript error: This expression is not callable

// BAD: No type checking
function badFlip(x: any) {
    return x.flip(); // Could fail at runtime
}

// GOOD: Type checking with interface
interface Flippable {
    flip(): boolean;
}

function goodFlip(x: Flippable): boolean {
    return x.flip();
}

// ============================================================================
// 2) NON-EXCEPTION FAILURES
// ============================================================================
console.log("\n--- 2) NON-EXCEPTION FAILURES ---");

// BAD: JavaScript returns undefined for missing properties (no error)
const badUser = {
    name: "Daniel",
    age: 26,
};
// In JavaScript: badUser.location returns undefined (no error)
// This is a silent bug!

// GOOD: TypeScript catches missing properties
const goodUser: { name: string; age: number } = {
    name: "Daniel",
    age: 26,
};
// goodUser.location; // TypeScript error: Property 'location' does not exist

// Typos caught by TypeScript
const announcement = "Hello World!";
// announcement.toLocaleLowercase(); // Error: Property doesn't exist
// announcement.toLocalLowerCase(); // Error: Property doesn't exist
console.log("Correct:", announcement.toLocaleLowerCase()); // Works

// Uncalled functions caught
function flipCoin() {
    // BAD: Math.random < 0.5 (missing parentheses)
    // return Math.random < 0.5; // TypeScript error: Operator '<' cannot be applied
    
    // GOOD: Math.random() < 0.5
    return Math.random() < 0.5;
}

// Logic errors caught
const randomValue = Math.random() < 0.5 ? "a" : "b";
if (randomValue !== "a") {
    console.log("Value is not 'a'");
    // TypeScript would catch this if we had the unreachable code:
    // } else if (randomValue === "b") {
    //     // TypeScript error: This comparison appears to be unintentional
    //     // Types '"a"' and '"b"' have no overlap
    //     console.log("This is unreachable");
}

// ============================================================================
// 3) EXPLICIT TYPES
// ============================================================================
console.log("\n--- 3) EXPLICIT TYPES ---");

// BAD: No type annotations - errors at runtime
function badGreet2(person: any, date: any) {
    console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}
// badGreet2("Maddison", Date()); // Date() returns string, not Date object - runtime error!

// GOOD: Explicit type annotations
function goodGreet2(person: string, date: Date) {
    console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}
goodGreet2("Maddison", new Date()); // Correct usage

// Type inference (TypeScript figures out types automatically)
let msg = "hello there!";
// TypeScript knows msg is string without explicit annotation
console.log("Type inferred:", typeof msg);

// You can still add explicit types if needed
let explicitMsg: string = "hello there!";
console.log("Explicit type:", explicitMsg);

// ============================================================================
// 4) ERASED TYPES
// ============================================================================
console.log("\n--- 4) ERASED TYPES ---");

// Type annotations are removed in compiled JavaScript
function greetWithTypes(person: string, date: Date): void {
    console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}
// After compilation, this becomes:
// function greetWithTypes(person, date) {
//     console.log("Hello ".concat(person, ", today is ").concat(date.toDateString(), "!"));
// }

greetWithTypes("Alice", new Date());

// Important: Type annotations never change runtime behavior
let numX: number = 5;
let numY = 5;
// Both numX and numY behave identically at runtime

// ============================================================================
// 5) DOWNLEVELING
// ============================================================================
console.log("\n--- 5) DOWNLEVELING ---");

// Template strings (ES2015) are downleveled to ES5
const tsName = "TypeScript";
const tsGreeting = `Hello, ${tsName}!`;
// ES5 equivalent: "Hello, " + tsName + "!"

// Arrow functions are downleveled
const sumNumbers = (a: number, b: number) => a + b;
// ES5 equivalent: function sumNumbers(a, b) { return a + b; }

console.log("Greeting:", tsGreeting);
console.log("Add result:", sumNumbers(3, 5));

// ============================================================================
// 6) STRICTNESS: noImplicitAny
// ============================================================================
console.log("\n--- 6) STRICTNESS: noImplicitAny ---");

// BAD: Without noImplicitAny, TypeScript allows implicit 'any'
// Note: With strict mode, this would cause an error
function badFunction(x: any) {
    // x is explicitly 'any' - no type checking!
    return x.flip();
}

// GOOD: With noImplicitAny, must specify types
function goodFunction(x: { flip(): boolean }): boolean {
    return x.flip();
}

// Explicit any (still allowed but discouraged)
function explicitAnyFunction(x: any): any {
    return x.flip();
}

// ============================================================================
// 7) STRICTNESS: strictNullChecks
// ============================================================================
console.log("\n--- 7) STRICTNESS: strictNullChecks ---");

// BAD: Without strictNullChecks, null/undefined can be assigned anywhere
function badProcessUser(user: { name: string }) {
    console.log(user.name.toUpperCase()); // Could crash if user is null
}

// GOOD: With strictNullChecks, must handle null/undefined explicitly
function goodProcessUser(user: { name: string } | null) {
    if (user === null) {
        console.log("User is null");
        return;
    }
    console.log(user.name.toUpperCase()); // TypeScript knows user is not null here
}

// Optional chaining (modern way)
function modernProcessUser(user: { name: string } | null | undefined) {
    console.log(user?.name.toUpperCase() ?? "No user");
}

// Demo
const validUser = { name: "Alice" };
goodProcessUser(validUser);
goodProcessUser(null);
modernProcessUser(validUser);
modernProcessUser(null);
modernProcessUser(undefined);

// ============================================================================
// 8) TYPES FOR TOOLING
// ============================================================================
console.log("\n--- 8) TYPES FOR TOOLING ---");

// TypeScript provides autocomplete and error checking in editors
interface User {
    name: string;
    email: string;
    age: number;
}

const user: User = {
    name: "Bob",
    email: "bob@example.com",
    age: 30,
};

// Editor provides autocomplete for user properties
console.log("User name:", user.name);
console.log("User email:", user.email);
// user.phone; // TypeScript error: Property 'phone' does not exist

// Function signature helps with parameter hints
function createUser(name: string, email: string, age: number): User {
    return { name, email, age };
}

// Editor shows parameter names and types when calling
const newUser = createUser("Charlie", "charlie@example.com", 25);

// ============================================================================
// 9) COMPREHENSIVE EXAMPLE: Bad vs Good
// ============================================================================
console.log("\n--- 9) COMPREHENSIVE EXAMPLE: Bad vs Good ---");

// BAD: JavaScript-style code (no types, potential runtime errors)
class BadCalculator {
    add(a: any, b: any) {
        return a + b; // Could concatenate strings instead of adding numbers
    }
    
    divide(a: any, b: any) {
        return a / b; // No check for division by zero or type errors
    }
}

const badCalc = new BadCalculator();
console.log("Bad add (string concat):", badCalc.add("5", "3")); // "53" instead of 8
console.log("Bad divide:", badCalc.divide(10, 2)); // Works but no type safety

// GOOD: TypeScript with proper types and validation
class GoodCalculator {
    add(a: number, b: number): number {
        return a + b;
    }
    
    divide(a: number, b: number): number {
        if (b === 0) {
            throw new Error("Division by zero");
        }
        return a / b;
    }
}

const goodCalc = new GoodCalculator();
console.log("Good add:", goodCalc.add(5, 3)); // 8
console.log("Good divide:", goodCalc.divide(10, 2)); // 5
// goodCalc.add("5", "3"); // TypeScript error: Argument of type 'string' is not assignable
// goodCalc.divide(10, 0); // Runtime error caught (could be caught at compile time with const assertions)

console.log("\n-- TypeScript Basics Examples Complete --");

