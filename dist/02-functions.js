"use strict";
// ========================================
// 2. MORE ON FUNCTIONS - TypeScript Function Features
// ========================================
// Basic Function Types
function greet(name) {
    return `Hello, ${name}!`;
}
// Function Expression
const greetExpression = function (name) {
    return `Hello, ${name}!`;
};
// Arrow Functions
const greetArrow = (name) => {
    return `Hello, ${name}!`;
};
// Optional Parameters
function createUser(name, email) {
    return { name, email };
}
// Default Parameters
function multiply(a, b = 1) {
    return a * b;
}
// Rest Parameters
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}
function processData(value) {
    if (typeof value === "string") {
        return value.toUpperCase();
    }
    else {
        return value * 2;
    }
}
// Generic Functions
function identity(arg) {
    return arg;
}
function firstElement(arr) {
    return arr[0];
}
// Multiple Type Parameters
function pair(first, second) {
    return [first, second];
}
function logLength(arg) {
    console.log(arg.length);
    return arg;
}
const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const callableGreeter = (name) => `Hello, ${name}!`;
callableGreeter.description = "A greeter function";
function applyTransform(text, transform) {
    return transform(text);
}
const toUpperCase = (str) => str.toUpperCase();
const toLowerCase = (str) => str.toLowerCase();
// Function Composition
function compose(f, g) {
    return (x) => f(g(x));
}
// Currying
function curry(fn) {
    return (a) => (b) => fn(a, b);
}
const curriedAdd = curry((a, b) => a + b);
const addFive = curriedAdd(5);
// Async Functions
async function fetchUser(id) {
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id, name: `User ${id}` });
        }, 100);
    });
}
// Generator Functions
function* numberGenerator() {
    yield 1;
    yield 2;
    yield 3;
}
const calculator = {
    value: 0,
    add(num) {
        this.value += num;
    },
    multiply(num) {
        this.value *= num;
    }
};
// Function with Union Return Types
function parseInput(input) {
    const parsed = parseInt(input);
    return isNaN(parsed) ? input : parsed;
}
function createUserId(id) {
    return id;
}
function createEmail(email) {
    return email;
}
function validateJSON(value) {
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
function concat(arr1, arr2) {
    return [...arr1, ...arr2];
}
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
