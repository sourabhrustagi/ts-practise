// ========================================
// 7. NARROWING - TypeScript Type Narrowing Features
// ========================================

// Type Guards
function isString(value: unknown): value is string {
    return typeof value === "string";
}

function isNumber(value: unknown): value is number {
    return typeof value === "number";
}

function isBoolean(value: unknown): value is boolean {
    return typeof value === "boolean";
}

function isFunction(value: unknown): value is Function {
    return typeof value === "function";
}

function isObject(value: unknown): value is object {
    return typeof value === "object" && value !== null;
}

function isArray(value: unknown): value is any[] {
    return Array.isArray(value);
}

function isNull(value: unknown): value is null {
    return value === null;
}

function isUndefined(value: unknown): value is undefined {
    return value === undefined;
}

function isNullOrUndefined(value: unknown): value is null | undefined {
    return value === null || value === undefined;
}

// Custom Type Guards
interface User {
    id: number;
    name: string;
    email: string;
    age: number;
}

interface Admin {
    id: number;
    name: string;
    email: string;
    permissions: string[];
    role: "admin";
}

interface RegularUser {
    id: number;
    name: string;
    email: string;
    role: "user";
}

type AppUser = Admin | RegularUser;

function isAdmin(user: AppUser): user is Admin {
    return user.role === "admin";
}

function isRegularUser(user: AppUser): user is RegularUser {
    return user.role === "user";
}

function isUser(obj: unknown): obj is User {
    return (
        typeof obj === "object" &&
        obj !== null &&
        "id" in obj &&
        "name" in obj &&
        "email" in obj &&
        "age" in obj &&
        typeof (obj as any).id === "number" &&
        typeof (obj as any).name === "string" &&
        typeof (obj as any).email === "string" &&
        typeof (obj as any).age === "number"
    );
}

// Control Flow Analysis
function processValue(value: unknown) {
    if (isString(value)) {
        // TypeScript knows value is string here
        console.log(value.toUpperCase());
        console.log(value.length);
    } else if (isNumber(value)) {
        // TypeScript knows value is number here
        console.log(value.toFixed(2));
        console.log(Math.abs(value));
    } else if (isBoolean(value)) {
        // TypeScript knows value is boolean here
        console.log(value ? "true" : "false");
    } else if (isArray(value)) {
        // TypeScript knows value is array here
        console.log(value.length);
        console.log(value.join(", "));
    } else if (isObject(value)) {
        // TypeScript knows value is object here
        console.log(Object.keys(value));
    } else {
        // TypeScript knows value is null or undefined here
        console.log("Value is null or undefined");
    }
}

// Discriminated Unions
interface CircleShape {
    kind: "circle";
    radius: number;
}

interface SquareShape {
    kind: "square";
    sideLength: number;
}

interface TriangleShape {
    kind: "triangle";
    base: number;
    height: number;
}

type GeometricShape = CircleShape | SquareShape | TriangleShape;

function getArea(shape: GeometricShape): number {
    switch (shape.kind) {
        case "circle":
            // TypeScript knows shape is CircleShape here
            return Math.PI * shape.radius ** 2;
        case "square":
            // TypeScript knows shape is SquareShape here
            return shape.sideLength ** 2;
        case "triangle":
            // TypeScript knows shape is TriangleShape here
            return 0.5 * shape.base * shape.height;
        default:
            // Exhaustiveness checking
            const _exhaustiveCheck: never = shape;
            return _exhaustiveCheck;
    }
}

// Exhaustiveness Checking
function assertNever(x: never): never {
    throw new Error(`Unexpected object: ${x}`);
}

function getAreaWithExhaustiveness(shape: GeometricShape): number {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "square":
            return shape.sideLength ** 2;
        case "triangle":
            return 0.5 * shape.base * shape.height;
        default:
            return assertNever(shape);
    }
}

// Truthiness Narrowing
function processTruthyValue(value: unknown) {
    if (value) {
        // TypeScript knows value is truthy here
        if (typeof value === "string") {
            console.log(value.toUpperCase());
        }
    } else {
        // TypeScript knows value is falsy here
        console.log("Value is falsy");
    }
}

// Equality Narrowing
function processEquality(value: unknown) {
    if (value === "hello") {
        // TypeScript knows value is "hello" here
        console.log("Value is hello");
    } else if (value === 42) {
        // TypeScript knows value is 42 here
        console.log("Value is 42");
    } else if (value === null) {
        // TypeScript knows value is null here
        console.log("Value is null");
    } else if (value === undefined) {
        // TypeScript knows value is undefined here
        console.log("Value is undefined");
    }
}

// In Operator Narrowing
interface Dog {
    bark(): void;
}

interface Cat {
    meow(): void;
}

function makeSound(animal: Dog | Cat) {
    if ("bark" in animal) {
        // TypeScript knows animal is Dog here
        animal.bark();
    } else {
        // TypeScript knows animal is Cat here
        animal.meow();
    }
}

// Instanceof Narrowing
class CarVehicle {
    drive() {
        console.log("Driving car");
    }
}

class TruckVehicle {
    drive() {
        console.log("Driving truck");
    }
    
    loadCargo() {
        console.log("Loading cargo");
    }
}

type VehicleType = CarVehicle | TruckVehicle;

function driveVehicle(vehicle: VehicleType) {
    vehicle.drive();
    
    if (vehicle instanceof TruckVehicle) {
        // TypeScript knows vehicle is TruckVehicle here
        vehicle.loadCargo();
    }
}

// Assignment Narrowing
let value: string | number = "hello";

if (typeof value === "string") {
    // TypeScript knows value is string here
    console.log(value.toUpperCase());
}

value = 42; // Assignment narrows the type

if (typeof value === "number") {
    // TypeScript knows value is number here
    console.log(value.toFixed(2));
}

// Control Flow Analysis with Early Returns
function processUser(user: User | null) {
    if (!user) {
        return; // Early return narrows the type
    }
    
    // TypeScript knows user is not null here
    console.log(user.name);
    console.log(user.email);
}

// Control Flow Analysis with Throws
function validateUser(user: User | null): User {
    if (!user) {
        throw new Error("User is required");
    }
    
    // TypeScript knows user is not null here
    return user;
}

// Control Flow Analysis with Asserts
function assertUser(user: unknown): asserts user is User {
    if (!isUser(user)) {
        throw new Error("Invalid user object");
    }
}

function processUserWithAssert(user: unknown) {
    assertUser(user);
    
    // TypeScript knows user is User here
    console.log(user.name);
    console.log(user.email);
}

// Narrowing with Generics
function isArrayOf<T>(arr: unknown, predicate: (item: unknown) => item is T): arr is T[] {
    return Array.isArray(arr) && arr.every(predicate);
}

function processStringArray(arr: unknown) {
    if (isArrayOf(arr, isString)) {
        // TypeScript knows arr is string[] here
        console.log(arr.join(", "));
        console.log(arr.map(s => s.toUpperCase()));
    }
}

// Narrowing with Conditional Types
type NonNullable<T> = T extends null | undefined ? never : T;

function processNonNullable<T>(value: T): NonNullable<T> {
    if (value === null || value === undefined) {
        throw new Error("Value cannot be null or undefined");
    }
    return value as NonNullable<T>;
}

// Narrowing with Type Predicates and Generics
function isInstanceOf<T>(value: unknown, constructor: new (...args: any[]) => T): value is T {
    return value instanceof constructor;
}

function processInstance(value: unknown) {
    if (isInstanceOf(value, CarVehicle)) {
        // TypeScript knows value is CarVehicle here
        value.drive();
    } else if (isInstanceOf(value, TruckVehicle)) {
        // TypeScript knows value is TruckVehicle here
        value.loadCargo();
    }
}

// Narrowing with Template Literal Types
type EventName = "click" | "hover" | "focus";
type EventHandler = `on${Capitalize<EventName>}`;

function isEventHandler(name: string): name is EventHandler {
    return /^on[A-Z]/.test(name);
}

function processEventHandler(name: string) {
    if (isEventHandler(name)) {
        // TypeScript knows name is EventHandler here
        console.log(`Setting up ${name} handler`);
    }
}

// Narrowing with Branded Types
type UserId = number & { readonly brand: unique symbol };
type Email = string & { readonly brand: unique symbol };

function isUserId(value: unknown): value is UserId {
    return typeof value === "number" && Number.isInteger(value) && value > 0;
}

function isEmail(value: unknown): value is Email {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return typeof value === "string" && emailRegex.test(value);
}

function processUserId(id: unknown) {
    if (isUserId(id)) {
        // TypeScript knows id is UserId here
        console.log(`Processing user ID: ${id}`);
    }
}

// Narrowing with Union Types
type Status = "loading" | "success" | "error";

function processStatus(status: Status) {
    switch (status) {
        case "loading":
            // TypeScript knows status is "loading" here
            console.log("Loading...");
            break;
        case "success":
            // TypeScript knows status is "success" here
            console.log("Success!");
            break;
        case "error":
            // TypeScript knows status is "error" here
            console.log("Error occurred");
            break;
    }
}

// Narrowing with Intersection Types
interface HasId {
    id: number;
}

interface HasName {
    name: string;
}

type CompleteObject = HasId & HasName;

function isCompleteObject(obj: unknown): obj is CompleteObject {
    return (
        typeof obj === "object" &&
        obj !== null &&
        "id" in obj &&
        "name" in obj &&
        typeof (obj as any).id === "number" &&
        typeof (obj as any).name === "string"
    );
}

function processCompleteObject(obj: unknown) {
    if (isCompleteObject(obj)) {
        // TypeScript knows obj is CompleteObject here
        console.log(`ID: ${obj.id}, Name: ${obj.name}`);
    }
}

// Narrowing with Indexed Access Types
interface Database {
    users: User[];
    posts: Post[];
    comments: Comment[];
}

interface Post {
    id: number;
    title: string;
    content: string;
}

interface Comment {
    id: number;
    content: string;
    postId: number;
}

type DatabaseEntity = Database[keyof Database][number];

function isUser(entity: DatabaseEntity): entity is User {
    return "age" in entity;
}

function isPost(entity: DatabaseEntity): entity is Post {
    return "title" in entity && "content" in entity;
}

function isComment(entity: DatabaseEntity): entity is Comment {
    return "postId" in entity && !("title" in entity);
}

function processDatabaseEntity(entity: DatabaseEntity) {
    if (isUser(entity)) {
        // TypeScript knows entity is User here
        console.log(`User: ${entity.name} (${entity.age})`);
    } else if (isPost(entity)) {
        // TypeScript knows entity is Post here
        console.log(`Post: ${entity.title}`);
    } else if (isComment(entity)) {
        // TypeScript knows entity is Comment here
        console.log(`Comment: ${entity.content}`);
    }
}

console.log("=== TypeScript Narrowing Examples ===");

// Type guards examples
const stringValue = "hello";
const numberValue = 42;
const booleanValue = true;
const arrayValue = [1, 2, 3, 4, 5];
const objectValue = { key: "value" };

console.log("Is string:", isString(stringValue));
console.log("Is number:", isNumber(numberValue));
console.log("Is boolean:", isBoolean(booleanValue));
console.log("Is array:", isArray(arrayValue));
console.log("Is object:", isObject(objectValue));

// Custom type guards examples
const admin: Admin = {
    id: 1,
    name: "Admin User",
    email: "admin@example.com",
    permissions: ["read", "write", "delete"],
    role: "admin"
};

const regularUser: RegularUser = {
    id: 2,
    name: "Regular User",
    email: "user@example.com",
    role: "user"
};

console.log("Is admin:", isAdmin(admin));
console.log("Is regular user:", isRegularUser(regularUser));

// Discriminated unions examples
const circleShape: CircleShape = { kind: "circle", radius: 5 };
const squareShape: SquareShape = { kind: "square", sideLength: 4 };
const triangleShape: TriangleShape = { kind: "triangle", base: 3, height: 6 };

console.log("Circle area:", getArea(circleShape));
console.log("Square area:", getArea(squareShape));
console.log("Triangle area:", getArea(triangleShape));

// Control flow analysis examples
processValue("hello");
processValue(42);
processValue(true);
processValue([1, 2, 3]);
processValue({ key: "value" });
processValue(null);

// Truthiness narrowing examples
processTruthyValue("hello");
processTruthyValue("");
processTruthyValue(0);
processTruthyValue(null);

// Equality narrowing examples
processEquality("hello");
processEquality(42);
processEquality(null);
processEquality(undefined);

// In operator narrowing examples
const dog: Dog = { bark: () => console.log("Woof!") };
const cat: Cat = { meow: () => console.log("Meow!") };

makeSound(dog);
makeSound(cat);

// Instanceof narrowing examples
const carVehicle = new CarVehicle();
const truckVehicle = new TruckVehicle();

driveVehicle(carVehicle);
driveVehicle(truckVehicle);

// Assignment narrowing examples
let dynamicValue: string | number = "hello";
console.log("Initial value:", dynamicValue);

dynamicValue = 42;
console.log("Updated value:", dynamicValue);

// Control flow with early returns examples
processUser({ id: 1, name: "John", email: "john@example.com", age: 30 });
processUser(null);

// Array narrowing examples
const stringArray = ["hello", "world", "typescript"];
processStringArray(stringArray);

// Status processing examples
processStatus("loading");
processStatus("success");
processStatus("error");
