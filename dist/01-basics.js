"use strict";
// ========================================
// 1. THE BASICS - TypeScript Fundamentals
// ========================================
// Variable Declarations
let message = "Hello, TypeScript!";
const PI = 3.14159;
var oldWay = true; // Not recommended in modern TypeScript
// Type Inference
let inferredString = "TypeScript infers this as string";
let inferredNumber = 42; // TypeScript infers this as number
let inferredBoolean = true; // TypeScript infers this as boolean
// Basic Types
let str = "Hello";
let num = 42;
let bool = true;
let bigInt = 100n;
let symbol = Symbol("mySymbol");
// Null and Undefined
let nullValue = null;
let undefinedValue = undefined;
// Arrays
let numberArray = [1, 2, 3, 4, 5];
let stringArray = ["apple", "banana", "cherry"];
let mixedArray = ["hello", 42, "world"];
// Tuples
let tuple = ["hello", 42, true];
let optionalTuple = ["hello"]; // Second element is optional
// Objects
let person = {
    name: "John Doe",
    age: 30
};
let point = { x: 10, y: 20 };
let user = {
    id: 1,
    name: "Jane Smith",
    email: "jane@example.com",
    isActive: true
};
let currentStatus = "loading";
let userId = "user123";
let numericId = 12345;
let personWithBoth = { name: "Alice", age: 25 };
let direction = "north";
// Type Assertions
let someValue = "this is a string";
let strLength = someValue.length;
let strLength2 = someValue.length; // Alternative syntax
// Const Assertions
const colors = ["red", "green", "blue"];
let emailTemplate = "welcome_en";
// Type Guards
function isString(value) {
    return typeof value === "string";
}
function processValue(value) {
    if (isString(value)) {
        console.log(value.toUpperCase()); // TypeScript knows value is string
    }
}
// Type Predicates
function isUser(obj) {
    return obj && typeof obj.name === "string" && typeof obj.id === "number";
}
function getArea(shape) {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "square":
            return shape.sideLength ** 2;
    }
}
// Exhaustiveness Checking
function assertNever(x) {
    throw new Error("Unexpected object: " + x);
}
function getAreaWithExhaustiveness(shape) {
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
