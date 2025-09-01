// ========================================
// 1. THE BASICS - TypeScript Fundamentals
// ========================================
// This file demonstrates fundamental TypeScript concepts including:
// - Variable declarations and type annotations
// - Type inference
// - Basic types
// - Arrays and tuples
// - Objects and interfaces
// - Union and intersection types
// - Type guards and narrowing
// - Advanced type features

// ========================================
// VARIABLE DECLARATIONS AND TYPE ANNOTATIONS
// ========================================

// Explicit type annotations - TypeScript knows exactly what type each variable is
let message: string = "Hello, TypeScript!";
const PI: number = 3.14159;
var oldWay: boolean = true; // Not recommended in modern TypeScript - use let/const instead

// Type Inference
let inferredString = "TypeScript infers this as string";
let inferredNumber = 42; // TypeScript infers this as number
let inferredBoolean = true; // TypeScript infers this as boolean

// Basic Types
let str: string = "Hello";
let num: number = 42;
let bool: boolean = true;
let bigInt: bigint = 100n;
let symbol: symbol = Symbol("mySymbol");

// Null and Undefined
let nullValue: null = null;
let undefinedValue: undefined = undefined;

// Arrays
let numberArray: number[] = [1, 2, 3, 4, 5];
let stringArray: Array<string> = ["apple", "banana", "cherry"];
let mixedArray: (string | number)[] = ["hello", 42, "world"];

// Tuples
let tuple: [string, number, boolean] = ["hello", 42, true];
let optionalTuple: [string, number?] = ["hello"]; // Second element is optional

// Objects
let person: { name: string; age: number; email?: string } = {
    name: "John Doe",
    age: 30
};

// Type Aliases
type Point = {
    x: number;
    y: number;
};

let point: Point = { x: 10, y: 20 };

// Interfaces
interface User {
    id: number;
    name: string;
    email: string;
    isActive?: boolean;
}

let user: User = {
    id: 1,
    name: "Jane Smith",
    email: "jane@example.com",
    isActive: true
};

// Union Types
type Status = "loading" | "success" | "error";
let currentStatus: Status = "loading";

type ID = string | number;
let userId: ID = "user123";
let numericId: ID = 12345;

// Intersection Types
interface HasName {
    name: string;
}

interface HasAge {
    age: number;
}

type Person = HasName & HasAge;
let personWithBoth: Person = { name: "Alice", age: 25 };

// Literal Types
type Direction = "north" | "south" | "east" | "west";
let direction: Direction = "north";

// Type Assertions
let someValue: unknown = "this is a string";
let strLength: number = (someValue as string).length;
let strLength2: number = (<string>someValue).length; // Alternative syntax

// Const Assertions
const colors = ["red", "green", "blue"] as const;
type Color = typeof colors[number]; // "red" | "green" | "blue"

// Template Literal Types
type EmailLocale = "en" | "es" | "fr";
type EmailTemplate = `welcome_${EmailLocale}`;
let emailTemplate: EmailTemplate = "welcome_en";

// Indexed Access Types
type UserName = User["name"]; // string
type UserKeys = keyof User; // "id" | "name" | "email" | "isActive"

// Conditional Types
type NonNullable<T> = T extends null | undefined ? never : T;
type StringOrNumber = NonNullable<string | null | undefined>; // string

// Mapped Types
type ReadonlyUser = Readonly<User>;
type PartialUser = Partial<User>;
type RequiredUser = Required<User>;
type PickUser = Pick<User, "name" | "email">;
type OmitUser = Omit<User, "id">;

// Utility Types Examples
type OptionalUser = Partial<User>;
type ReadonlyPoint = Readonly<Point>;
type UserNames = Pick<User, "name">;
type UserWithoutId = Omit<User, "id">;
type UserRecord = Record<"user1" | "user2", User>;

// Type Guards
function isString(value: unknown): value is string {
    return typeof value === "string";
}

function processValue(value: unknown) {
    if (isString(value)) {
        console.log(value.toUpperCase()); // TypeScript knows value is string
    }
}

// Type Predicates
function isUser(obj: any): obj is User {
    return obj && typeof obj.name === "string" && typeof obj.id === "number";
}

// Discriminated Unions
interface Circle {
    kind: "circle";
    radius: number;
}

interface Square {
    kind: "square";
    sideLength: number;
}

type Shape = Circle | Square;

function getArea(shape: Shape): number {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "square":
            return shape.sideLength ** 2;
    }
}

// Exhaustiveness Checking
function assertNever(x: never): never {
    throw new Error("Unexpected object: " + x);
}

function getAreaWithExhaustiveness(shape: Shape): number {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "square":
            return shape.sideLength ** 2;
        default:
            return assertNever(shape); // Ensures all cases are handled
    }
}

console.log("=== TypeScript Basics Examples ===");
console.log("Message:", message);
console.log("Point:", point);
console.log("User:", user);
console.log("Direction:", direction);
console.log("Circle area:", getArea({ kind: "circle", radius: 5 }));
console.log("Square area:", getArea({ kind: "square", sideLength: 4 }));
