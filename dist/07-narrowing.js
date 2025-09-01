"use strict";
// ========================================
// 7. NARROWING - TypeScript Type Narrowing Features
// ========================================
// Type Guards
function isString(value) {
    return typeof value === "string";
}
function isNumber(value) {
    return typeof value === "number";
}
function isBoolean(value) {
    return typeof value === "boolean";
}
function isFunction(value) {
    return typeof value === "function";
}
function isObject(value) {
    return typeof value === "object" && value !== null;
}
function isArray(value) {
    return Array.isArray(value);
}
function isNull(value) {
    return value === null;
}
function isUndefined(value) {
    return value === undefined;
}
function isNullOrUndefined(value) {
    return value === null || value === undefined;
}
function isAdmin(user) {
    return user.role === "admin";
}
function isRegularUser(user) {
    return user.role === "user";
}
function isUser(obj) {
    return (typeof obj === "object" &&
        obj !== null &&
        "id" in obj &&
        "name" in obj &&
        "email" in obj &&
        "age" in obj &&
        typeof obj.id === "number" &&
        typeof obj.name === "string" &&
        typeof obj.email === "string" &&
        typeof obj.age === "number");
}
// Control Flow Analysis
function processValue(value) {
    if (isString(value)) {
        // TypeScript knows value is string here
        console.log(value.toUpperCase());
        console.log(value.length);
    }
    else if (isNumber(value)) {
        // TypeScript knows value is number here
        console.log(value.toFixed(2));
        console.log(Math.abs(value));
    }
    else if (isBoolean(value)) {
        // TypeScript knows value is boolean here
        console.log(value ? "true" : "false");
    }
    else if (isArray(value)) {
        // TypeScript knows value is array here
        console.log(value.length);
        console.log(value.join(", "));
    }
    else if (isObject(value)) {
        // TypeScript knows value is object here
        console.log(Object.keys(value));
    }
    else {
        // TypeScript knows value is null or undefined here
        console.log("Value is null or undefined");
    }
}
function getArea(shape) {
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
            const _exhaustiveCheck = shape;
            return _exhaustiveCheck;
    }
}
// Exhaustiveness Checking
function assertNever(x) {
    throw new Error(`Unexpected object: ${x}`);
}
function getAreaWithExhaustiveness(shape) {
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
function processTruthyValue(value) {
    if (value) {
        // TypeScript knows value is truthy here
        if (typeof value === "string") {
            console.log(value.toUpperCase());
        }
    }
    else {
        // TypeScript knows value is falsy here
        console.log("Value is falsy");
    }
}
// Equality Narrowing
function processEquality(value) {
    if (value === "hello") {
        // TypeScript knows value is "hello" here
        console.log("Value is hello");
    }
    else if (value === 42) {
        // TypeScript knows value is 42 here
        console.log("Value is 42");
    }
    else if (value === null) {
        // TypeScript knows value is null here
        console.log("Value is null");
    }
    else if (value === undefined) {
        // TypeScript knows value is undefined here
        console.log("Value is undefined");
    }
}
function makeSound(animal) {
    if ("bark" in animal) {
        // TypeScript knows animal is Dog here
        animal.bark();
    }
    else {
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
function driveVehicle(vehicle) {
    vehicle.drive();
    if (vehicle instanceof TruckVehicle) {
        // TypeScript knows vehicle is TruckVehicle here
        vehicle.loadCargo();
    }
}
// Assignment Narrowing
let value = "hello";
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
function processUser(user) {
    if (!user) {
        return; // Early return narrows the type
    }
    // TypeScript knows user is not null here
    console.log(user.name);
    console.log(user.email);
}
// Control Flow Analysis with Throws
function validateUser(user) {
    if (!user) {
        throw new Error("User is required");
    }
    // TypeScript knows user is not null here
    return user;
}
// Control Flow Analysis with Asserts
function assertUser(user) {
    if (!isUser(user)) {
        throw new Error("Invalid user object");
    }
}
function processUserWithAssert(user) {
    assertUser(user);
    // TypeScript knows user is User here
    console.log(user.name);
    console.log(user.email);
}
// Narrowing with Generics
function isArrayOf(arr, predicate) {
    return Array.isArray(arr) && arr.every(predicate);
}
function processStringArray(arr) {
    if (isArrayOf(arr, isString)) {
        // TypeScript knows arr is string[] here
        console.log(arr.join(", "));
        console.log(arr.map(s => s.toUpperCase()));
    }
}
function processNonNullable(value) {
    if (value === null || value === undefined) {
        throw new Error("Value cannot be null or undefined");
    }
    return value;
}
// Narrowing with Type Predicates and Generics
function isInstanceOf(value, constructor) {
    return value instanceof constructor;
}
function processInstance(value) {
    if (isInstanceOf(value, CarVehicle)) {
        // TypeScript knows value is CarVehicle here
        value.drive();
    }
    else if (isInstanceOf(value, TruckVehicle)) {
        // TypeScript knows value is TruckVehicle here
        value.loadCargo();
    }
}
function isEventHandler(name) {
    return /^on[A-Z]/.test(name);
}
function processEventHandler(name) {
    if (isEventHandler(name)) {
        // TypeScript knows name is EventHandler here
        console.log(`Setting up ${name} handler`);
    }
}
function isUserId(value) {
    return typeof value === "number" && Number.isInteger(value) && value > 0;
}
function isEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return typeof value === "string" && emailRegex.test(value);
}
function processUserId(id) {
    if (isUserId(id)) {
        // TypeScript knows id is UserId here
        console.log(`Processing user ID: ${id}`);
    }
}
function processStatus(status) {
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
function isCompleteObject(obj) {
    return (typeof obj === "object" &&
        obj !== null &&
        "id" in obj &&
        "name" in obj &&
        typeof obj.id === "number" &&
        typeof obj.name === "string");
}
function processCompleteObject(obj) {
    if (isCompleteObject(obj)) {
        // TypeScript knows obj is CompleteObject here
        console.log(`ID: ${obj.id}, Name: ${obj.name}`);
    }
}
function isUser(entity) {
    return "age" in entity;
}
function isPost(entity) {
    return "title" in entity && "content" in entity;
}
function isComment(entity) {
    return "postId" in entity && !("title" in entity);
}
function processDatabaseEntity(entity) {
    if (isUser(entity)) {
        // TypeScript knows entity is User here
        console.log(`User: ${entity.name} (${entity.age})`);
    }
    else if (isPost(entity)) {
        // TypeScript knows entity is Post here
        console.log(`Post: ${entity.title}`);
    }
    else if (isComment(entity)) {
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
const admin = {
    id: 1,
    name: "Admin User",
    email: "admin@example.com",
    permissions: ["read", "write", "delete"],
    role: "admin"
};
const regularUser = {
    id: 2,
    name: "Regular User",
    email: "user@example.com",
    role: "user"
};
console.log("Is admin:", isAdmin(admin));
console.log("Is regular user:", isRegularUser(regularUser));
// Discriminated unions examples
const circleShape = { kind: "circle", radius: 5 };
const squareShape = { kind: "square", sideLength: 4 };
const triangleShape = { kind: "triangle", base: 3, height: 6 };
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
const dog = { bark: () => console.log("Woof!") };
const cat = { meow: () => console.log("Meow!") };
makeSound(dog);
makeSound(cat);
// Instanceof narrowing examples
const carVehicle = new CarVehicle();
const truckVehicle = new TruckVehicle();
driveVehicle(carVehicle);
driveVehicle(truckVehicle);
// Assignment narrowing examples
let dynamicValue = "hello";
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
