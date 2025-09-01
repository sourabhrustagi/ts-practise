// ========================================
// 2. MORE ON FUNCTIONS - TypeScript Function Features
// ========================================

// Basic Function Types
function greet(name: string): string {
    return `Hello, ${name}!`;
}

// Function Expression
const greetExpression: (name: string) => string = function(name: string): string {
    return `Hello, ${name}!`;
};

// Arrow Functions
const greetArrow: (name: string) => string = (name: string): string => {
    return `Hello, ${name}!`;
};

// Optional Parameters
function createUser(name: string, email?: string): { name: string; email?: string } {
    return { name, email };
}

// Default Parameters
function multiply(a: number, b: number = 1): number {
    return a * b;
}

// Rest Parameters
function sum(...numbers: number[]): number {
    return numbers.reduce((total, num) => total + num, 0);
}

// Function Overloads
function processData(value: string): string;
function processData(value: number): number;
function processData(value: string | number): string | number {
    if (typeof value === "string") {
        return value.toUpperCase();
    } else {
        return value * 2;
    }
}

// Generic Functions
function identity<T>(arg: T): T {
    return arg;
}

function firstElement<T>(arr: T[]): T | undefined {
    return arr[0];
}

// Multiple Type Parameters
function pair<T, U>(first: T, second: U): [T, U] {
    return [first, second];
}

// Constrained Generics
interface Lengthwise {
    length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}

// Function Type Interfaces
interface MathFunc {
    (x: number, y: number): number;
}

const add: MathFunc = (x: number, y: number): number => x + y;
const subtract: MathFunc = (x: number, y: number): number => x - y;

// Callable Objects
interface CallableObject {
    (name: string): string;
    description: string;
}

const callableGreeter: CallableObject = (name: string): string => `Hello, ${name}!`;
callableGreeter.description = "A greeter function";

// Higher-Order Functions
type StringTransformer = (str: string) => string;

function applyTransform(text: string, transform: StringTransformer): string {
    return transform(text);
}

const toUpperCase: StringTransformer = (str: string) => str.toUpperCase();
const toLowerCase: StringTransformer = (str: string) => str.toLowerCase();

// Function Composition
function compose<T, U, V>(f: (x: U) => V, g: (x: T) => U): (x: T) => V {
    return (x: T) => f(g(x));
}

// Currying
function curry<T, U, V>(fn: (a: T, b: U) => V): (a: T) => (b: U) => V {
    return (a: T) => (b: U) => fn(a, b);
}

const curriedAdd = curry((a: number, b: number) => a + b);
const addFive = curriedAdd(5);

// Async Functions
async function fetchUser(id: number): Promise<{ id: number; name: string }> {
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id, name: `User ${id}` });
        }, 100);
    });
}

// Generator Functions
function* numberGenerator(): Generator<number, void, unknown> {
    yield 1;
    yield 2;
    yield 3;
}

// Function with this Context
interface Calculator {
    value: number;
    add(this: Calculator, num: number): void;
    multiply(this: Calculator, num: number): void;
}

const calculator: Calculator = {
    value: 0,
    add(num: number) {
        this.value += num;
    },
    multiply(num: number) {
        this.value *= num;
    }
};

// Function with Union Return Types
function parseInput(input: string): string | number {
    const parsed = parseInt(input);
    return isNaN(parsed) ? input : parsed;
}

// Function with Conditional Types
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

// Function with Mapped Types
type FunctionProperties<T> = {
    [K in keyof T]: T[K] extends Function ? T[K] : never;
};

// Function with Template Literal Types
type EventHandler<T extends string> = `on${Capitalize<T>}`;
type ClickHandler = EventHandler<"click">; // "onClick"

// Function with Indexed Access Types
type User = {
    id: number;
    name: string;
    email: string;
};

type UserMethod = (user: User) => string;
type UserProperty = keyof User;

// Function with Utility Types
type PartialFunction<T> = Partial<T>;
type RequiredFunction<T> = Required<T>;
type ReadonlyFunction<T> = Readonly<T>;

// Function with Branded Types
type UserId = number & { readonly brand: unique symbol };
type Email = string & { readonly brand: unique symbol };

function createUserId(id: number): UserId {
    return id as UserId;
}

function createEmail(email: string): Email {
    return email as Email;
}

// Function with Conditional Types and Inference
type ArrayElement<T> = T extends (infer U)[] ? U : never;
type StringArrayElement = ArrayElement<string[]>; // string

// Function with Recursive Types
type JSONValue = 
    | string
    | number
    | boolean
    | null
    | JSONValue[]
    | { [key: string]: JSONValue };

function validateJSON(value: unknown): value is JSONValue {
    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean" || value === null) {
        return true;
    }
    if (Array.isArray(value)) {
        return value.every(validateJSON);
    }
    if (typeof value === "object") {
        return Object.values(value).every(validateJSON);
    }
    return false;
}

// Function with Variadic Tuple Types
function concat<T extends readonly unknown[], U extends readonly unknown[]>(
    arr1: T,
    arr2: U
): [...T, ...U] {
    return [...arr1, ...arr2] as [...T, ...U];
}

// Function with Template Literal Types and Inference
type ExtractRouteParams<T extends string> = T extends `${string}:${infer Param}/${infer Rest}`
    ? Param | ExtractRouteParams<Rest>
    : T extends `${string}:${infer Param}`
    ? Param
    : never;

type RouteParams = ExtractRouteParams<"/users/:id/posts/:postId">; // "id" | "postId"

console.log("=== TypeScript Functions Examples ===");
console.log("Basic function:", greet("Alice"));
console.log("Function expression:", greetExpression("Bob"));
console.log("Arrow function:", greetArrow("Charlie"));
console.log("Optional params:", createUser("David"));
console.log("Default params:", multiply(5));
console.log("Rest params:", sum(1, 2, 3, 4, 5));
console.log("Function overload:", processData("hello"));
console.log("Generic function:", identity("generic"));
console.log("Constrained generic:", logLength("hello"));
console.log("Higher-order function:", applyTransform("hello", toUpperCase));
console.log("Curried function:", addFive(3));
console.log("Async function result:", await fetchUser(1));
console.log("Generator values:", Array.from(numberGenerator()));
console.log("Parse input:", parseInput("123"), parseInput("hello"));


