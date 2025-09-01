// ========================================
// 8. COMPREHENSIVE TYPESCRIPT EXAMPLES
// ========================================

// 1. BASIC TYPES AND VARIABLES
let message: string = "Hello, TypeScript!";
const PI: number = 3.14159;
let isActive: boolean = true;
let bigIntValue: bigint = 100n;
let symbolValue: symbol = Symbol("unique");

// Arrays and Tuples
let numberArray: number[] = [1, 2, 3, 4, 5];
let stringArray: Array<string> = ["apple", "banana", "cherry"];
let tuple: [string, number, boolean] = ["hello", 42, true];

// Objects and Interfaces
interface Person {
    id: number;
    name: string;
    email: string;
    age?: number;
    readonly createdAt: Date;
}

let person: Person = {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    createdAt: new Date()
};

// 2. FUNCTIONS
// Basic function
function greet(name: string): string {
    return `Hello, ${name}!`;
}

// Function with optional parameters
function createUser(name: string, email?: string): { name: string; email?: string } {
    return { name, email };
}

// Function with default parameters
function multiply(a: number, b: number = 1): number {
    return a * b;
}

// Function with rest parameters
function sum(...numbers: number[]): number {
    return numbers.reduce((total, num) => total + num, 0);
}

// Function overloads
function processData(value: string): string;
function processData(value: number): number;
function processData(value: string | number): string | number {
    if (typeof value === "string") {
        return value.toUpperCase();
    } else {
        return value * 2;
    }
}

// Generic functions
function identity<T>(arg: T): T {
    return arg;
}

function firstElement<T>(arr: T[]): T | undefined {
    return arr[0];
}

// 3. CLASSES
class Animal {
    protected name: string;
    private age: number;
    readonly species: string;

    constructor(name: string, age: number, species: string) {
        this.name = name;
        this.age = age;
        this.species = species;
    }

    public makeSound(): void {
        console.log("Some animal sound");
    }

    public getInfo(): string {
        return `${this.name} is a ${this.age}-year-old ${this.species}`;
    }

    // Static method
    static createAnimal(name: string, species: string): Animal {
        return new Animal(name, 0, species);
    }

    // Getter
    get fullInfo(): string {
        return `${this.getInfo()} - Created: ${new Date().toLocaleDateString()}`;
    }

    // Setter
    set updateAge(newAge: number) {
        if (newAge >= 0) {
            this.age = newAge;
        }
    }
}

class Dog extends Animal {
    private breed: string;

    constructor(name: string, age: number, breed: string) {
        super(name, age, "Canis familiaris");
        this.breed = breed;
    }

    public makeSound(): void {
        console.log("Woof! Woof!");
    }

    public getBreed(): string {
        return this.breed;
    }
}

// Abstract class
abstract class Vehicle {
    protected brand: string;
    protected model: string;
    protected year: number;

    constructor(brand: string, model: string, year: number) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }

    abstract startEngine(): void;
    abstract stopEngine(): void;

    public getInfo(): string {
        return `${this.year} ${this.brand} ${this.model}`;
    }
}

class Car extends Vehicle {
    private fuelType: string;

    constructor(brand: string, model: string, year: number, fuelType: string) {
        super(brand, model, year);
        this.fuelType = fuelType;
    }

    public startEngine(): void {
        console.log("Car engine started");
    }

    public stopEngine(): void {
        console.log("Car engine stopped");
    }
}

// 4. INTERFACES AND TYPE ALIASES
interface Drawable {
    draw(): void;
    getArea(): number;
}

interface Movable {
    move(x: number, y: number): void;
    getPosition(): { x: number; y: number };
}

class Circle implements Drawable, Movable {
    private x: number;
    private y: number;
    private radius: number;

    constructor(x: number, y: number, radius: number) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    public draw(): void {
        console.log(`Drawing circle at (${this.x}, ${this.y}) with radius ${this.radius}`);
    }

    public getArea(): number {
        return Math.PI * this.radius ** 2;
    }

    public move(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }

    public getPosition(): { x: number; y: number } {
        return { x: this.x, y: this.y };
    }
}

// Type aliases
type Point = { x: number; y: number };
type Status = "loading" | "success" | "error";
type ID = string | number;

// 5. UNION AND INTERSECTION TYPES
// Union types
type StringOrNumber = string | number;
type Shape = Circle | { kind: "square"; sideLength: number };

// Intersection types
interface HasId { id: number; }
interface HasName { name: string; }
type CompleteObject = HasId & HasName;

// 6. GENERICS
class Container<T> {
    private items: T[] = [];

    public add(item: T): void {
        this.items.push(item);
    }

    public remove(item: T): void {
        const index = this.items.indexOf(item);
        if (index > -1) {
            this.items.splice(index, 1);
        }
    }

    public getAll(): T[] {
        return [...this.items];
    }
}

// Generic constraints
interface Lengthwise {
    length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}

// 7. UTILITY TYPES
type PartialPerson = Partial<Person>;
type RequiredPerson = Required<Person>;
type ReadonlyPerson = Readonly<Person>;
type PersonBasicInfo = Pick<Person, 'id' | 'name' | 'email'>;
type PersonWithoutTimestamps = Omit<Person, 'createdAt'>;

// 8. CONDITIONAL TYPES
type IsString<T> = T extends string ? true : false;
type ArrayElement<T> = T extends (infer U)[] ? U : never;

// 9. MAPPED TYPES
type Optional<T> = {
    [K in keyof T]?: T[K];
};

type Readonly<T> = {
    readonly [K in keyof T]: T[K];
};

// 10. TEMPLATE LITERAL TYPES
type EmailLocale = "en" | "es" | "fr";
type EmailTemplate = `welcome_${EmailLocale}`;

// 11. TYPE GUARDS
function isString(value: unknown): value is string {
    return typeof value === "string";
}

function isNumber(value: unknown): value is number {
    return typeof value === "number";
}

function isPerson(obj: unknown): obj is Person {
    return (
        typeof obj === "object" &&
        obj !== null &&
        "id" in obj &&
        "name" in obj &&
        "email" in obj
    );
}

// 12. DISCRIMINATED UNIONS
interface SuccessResult {
    success: true;
    data: any;
}

interface ErrorResult {
    success: false;
    error: string;
}

type Result = SuccessResult | ErrorResult;

function handleResult(result: Result) {
    if (result.success) {
        // TypeScript knows result is SuccessResult here
        console.log("Success:", result.data);
    } else {
        // TypeScript knows result is ErrorResult here
        console.log("Error:", result.error);
    }
}

// 13. NAMESPACES
namespace MathUtils {
    export function add(a: number, b: number): number {
        return a + b;
    }

    export function subtract(a: number, b: number): number {
        return a - b;
    }

    export const PI = 3.14159;
}

// 14. MODULES (Export/Import examples)
export const VERSION = "1.0.0";

export function formatNumber(num: number, decimals: number = 2): string {
    return num.toFixed(decimals);
}

export interface Config {
    apiUrl: string;
    timeout: number;
    retries: number;
}

export class ApiClient {
    constructor(private config: Config) {}

    async fetch<T>(url: string): Promise<T> {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({} as T);
            }, 100);
        });
    }
}

// 15. ENUMS
enum Color {
    Red = "red",
    Green = "green",
    Blue = "blue"
}

enum StatusCode {
    OK = 200,
    NotFound = 404,
    InternalError = 500
}

// 16. DECORATORS (Experimental)
// Note: Requires experimentalDecorators in tsconfig.json

// 17. ADVANCED PATTERNS
// Singleton Pattern
class DatabaseConnection {
    private static instance: DatabaseConnection;
    private connectionString: string;

    private constructor(connectionString: string) {
        this.connectionString = connectionString;
    }

    public static getInstance(connectionString?: string): DatabaseConnection {
        if (!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection(connectionString || "default");
        }
        return DatabaseConnection.instance;
    }

    public connect(): void {
        console.log(`Connecting to database: ${this.connectionString}`);
    }
}

// Factory Pattern
interface Product {
    name: string;
    price: number;
}

class ProductFactory {
    static createProduct(type: "basic" | "premium"): Product {
        switch (type) {
            case "basic":
                return { name: "Basic Product", price: 10 };
            case "premium":
                return { name: "Premium Product", price: 50 };
        }
    }
}

// 18. ASYNC/AWAIT
async function fetchUserData(id: number): Promise<Person> {
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id,
                name: `User ${id}`,
                email: `user${id}@example.com`,
                createdAt: new Date()
            });
        }, 100);
    });
}

// 19. ITERATORS AND GENERATORS
function* numberGenerator(): Generator<number, void, unknown> {
    yield 1;
    yield 2;
    yield 3;
}

// 20. BRANDED TYPES
type UserId = number & { readonly brand: unique symbol };
type Email = string & { readonly brand: unique symbol };

function createUserId(id: number): UserId {
    return id as UserId;
}

function createEmail(email: string): Email {
    return email as Email;
}

// 21. RECURSIVE TYPES
type JSONValue = 
    | string
    | number
    | boolean
    | null
    | JSONValue[]
    | { [key: string]: JSONValue };

// 22. CONDITIONAL TYPES WITH INFERENCE
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
type Parameters<T> = T extends (...args: infer P) => any ? P : never;

// 23. TEMPLATE LITERAL TYPES WITH INFERENCE
type ExtractRouteParams<T extends string> = T extends `${string}:${infer Param}/${infer Rest}`
    ? Param | ExtractRouteParams<Rest>
    : T extends `${string}:${infer Param}`
    ? Param
    : never;

// 24. ADVANCED UTILITY TYPES
type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

type DeepReadonly<T> = {
    readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

// 25. TYPE PREDICATES
function isArrayOf<T>(arr: unknown, predicate: (item: unknown) => item is T): arr is T[] {
    return Array.isArray(arr) && arr.every(predicate);
}

// 26. ASSERTION FUNCTIONS
function assertIsString(value: unknown): asserts value is string {
    if (typeof value !== "string") {
        throw new Error("Value must be a string");
    }
}

// 27. THIS TYPE
interface Calculator {
    value: number;
    add(this: Calculator, num: number): void;
    multiply(this: Calculator, num: number): void;
}

// 28. INDEXED ACCESS TYPES
type PersonName = Person["name"];
type PersonKeys = keyof Person;

// 29. CONDITIONAL TYPES WITH DISTRIBUTIVE PROPERTY
type ToArray<T> = T extends any ? T[] : never;
type StringOrNumberArray = ToArray<string | number>; // string[] | number[]

// 30. NON-DISTRIBUTIVE CONDITIONAL TYPES
type ToArrayNonDist<T> = [T] extends [any] ? T[] : never;
type StringOrNumberArrayNonDist = ToArrayNonDist<string | number>; // (string | number)[]

console.log("=== COMPREHENSIVE TYPESCRIPT EXAMPLES ===");

// Basic types
console.log("Message:", message);
console.log("PI:", PI);
console.log("Is active:", isActive);

// Functions
console.log("Greet:", greet("Alice"));
console.log("Create user:", createUser("Bob"));
console.log("Multiply:", multiply(5));
console.log("Sum:", sum(1, 2, 3, 4, 5));
console.log("Process data:", processData("hello"));
console.log("Identity:", identity("generic"));

// Classes
const animal = new Animal("Buddy", 3, "Dog");
console.log("Animal info:", animal.getInfo());
animal.makeSound();

const dog = new Dog("Rex", 2, "Golden Retriever");
console.log("Dog info:", dog.getInfo());
dog.makeSound();

const car = new Car("Toyota", "Camry", 2022, "Gasoline");
car.startEngine();
console.log("Car info:", car.getInfo());

// Interfaces and objects
const circle = new Circle(10, 20, 5);
circle.draw();
console.log("Circle area:", circle.getArea());
circle.move(15, 25);
console.log("New position:", circle.getPosition());

// Type guards
const testValue = "hello";
if (isString(testValue)) {
    console.log("Is string:", testValue.toUpperCase());
}

// Discriminated unions
const successResult: Result = { success: true, data: "Success data" };
const errorResult: Result = { success: false, error: "Error message" };
handleResult(successResult);
handleResult(errorResult);

// Namespaces
console.log("Math add:", MathUtils.add(5, 3));
console.log("Math PI:", MathUtils.PI);

// Enums
console.log("Color:", Color.Red);
console.log("Status code:", StatusCode.OK);

// Singleton
const db1 = DatabaseConnection.getInstance("postgresql://localhost:5432/mydb");
const db2 = DatabaseConnection.getInstance();
console.log("Same instance:", db1 === db2);

// Factory
const basicProduct = ProductFactory.createProduct("basic");
const premiumProduct = ProductFactory.createProduct("premium");
console.log("Basic product:", basicProduct);
console.log("Premium product:", premiumProduct);

// Async/await
(async () => {
    const userData = await fetchUserData(1);
    console.log("User data:", userData);
})();

// Generators
const generator = numberGenerator();
console.log("Generator values:", Array.from(generator));

// Branded types
const userId = createUserId(123);
const userEmail = createEmail("user@example.com");
console.log("User ID:", userId);
console.log("User email:", userEmail);

// Utility types
const partialPerson: PartialPerson = { name: "John" };
console.log("Partial person:", partialPerson);

// Type predicates
const stringArray = ["hello", "world", "typescript"];
if (isArrayOf(stringArray, isString)) {
    console.log("String array:", stringArray.join(", "));
}

console.log("=== END OF COMPREHENSIVE EXAMPLES ===");


