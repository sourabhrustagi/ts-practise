"use strict";
// ========================================
// 8. COMPREHENSIVE TYPESCRIPT EXAMPLES
// ========================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiClient = exports.VERSION = void 0;
exports.formatNumber = formatNumber;
// 1. BASIC TYPES AND VARIABLES
let message = "Hello, TypeScript!";
const PI = 3.14159;
let isActive = true;
let bigIntValue = 100n;
let symbolValue = Symbol("unique");
// Arrays and Tuples
let numberArray = [1, 2, 3, 4, 5];
let stringArray = ["apple", "banana", "cherry"];
let tuple = ["hello", 42, true];
let person = {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    createdAt: new Date()
};
// 2. FUNCTIONS
// Basic function
function greet(name) {
    return `Hello, ${name}!`;
}
// Function with optional parameters
function createUser(name, email) {
    return { name, email };
}
// Function with default parameters
function multiply(a, b = 1) {
    return a * b;
}
// Function with rest parameters
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
// Generic functions
function identity(arg) {
    return arg;
}
function firstElement(arr) {
    return arr[0];
}
// 3. CLASSES
class Animal {
    constructor(name, age, species) {
        this.name = name;
        this.age = age;
        this.species = species;
    }
    makeSound() {
        console.log("Some animal sound");
    }
    getInfo() {
        return `${this.name} is a ${this.age}-year-old ${this.species}`;
    }
    // Static method
    static createAnimal(name, species) {
        return new Animal(name, 0, species);
    }
    // Getter
    get fullInfo() {
        return `${this.getInfo()} - Created: ${new Date().toLocaleDateString()}`;
    }
    // Setter
    set updateAge(newAge) {
        if (newAge >= 0) {
            this.age = newAge;
        }
    }
}
class Dog extends Animal {
    constructor(name, age, breed) {
        super(name, age, "Canis familiaris");
        this.breed = breed;
    }
    makeSound() {
        console.log("Woof! Woof!");
    }
    getBreed() {
        return this.breed;
    }
}
// Abstract class
class Vehicle {
    constructor(brand, model, year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }
    getInfo() {
        return `${this.year} ${this.brand} ${this.model}`;
    }
}
class Car extends Vehicle {
    constructor(brand, model, year, fuelType) {
        super(brand, model, year);
        this.fuelType = fuelType;
    }
    startEngine() {
        console.log("Car engine started");
    }
    stopEngine() {
        console.log("Car engine stopped");
    }
}
class Circle {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
    draw() {
        console.log(`Drawing circle at (${this.x}, ${this.y}) with radius ${this.radius}`);
    }
    getArea() {
        return Math.PI * this.radius ** 2;
    }
    move(x, y) {
        this.x = x;
        this.y = y;
    }
    getPosition() {
        return { x: this.x, y: this.y };
    }
}
// 6. GENERICS
class Container {
    constructor() {
        this.items = [];
    }
    add(item) {
        this.items.push(item);
    }
    remove(item) {
        const index = this.items.indexOf(item);
        if (index > -1) {
            this.items.splice(index, 1);
        }
    }
    getAll() {
        return [...this.items];
    }
}
function logLength(arg) {
    console.log(arg.length);
    return arg;
}
// 11. TYPE GUARDS
function isString(value) {
    return typeof value === "string";
}
function isNumber(value) {
    return typeof value === "number";
}
function isPerson(obj) {
    return (typeof obj === "object" &&
        obj !== null &&
        "id" in obj &&
        "name" in obj &&
        "email" in obj);
}
function handleResult(result) {
    if (result.success) {
        // TypeScript knows result is SuccessResult here
        console.log("Success:", result.data);
    }
    else {
        // TypeScript knows result is ErrorResult here
        console.log("Error:", result.error);
    }
}
// 13. NAMESPACES
var MathUtils;
(function (MathUtils) {
    function add(a, b) {
        return a + b;
    }
    MathUtils.add = add;
    function subtract(a, b) {
        return a - b;
    }
    MathUtils.subtract = subtract;
    MathUtils.PI = 3.14159;
})(MathUtils || (MathUtils = {}));
// 14. MODULES (Export/Import examples)
exports.VERSION = "1.0.0";
function formatNumber(num, decimals = 2) {
    return num.toFixed(decimals);
}
class ApiClient {
    constructor(config) {
        this.config = config;
    }
    async fetch(url) {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({});
            }, 100);
        });
    }
}
exports.ApiClient = ApiClient;
// 15. ENUMS
var Color;
(function (Color) {
    Color["Red"] = "red";
    Color["Green"] = "green";
    Color["Blue"] = "blue";
})(Color || (Color = {}));
var StatusCode;
(function (StatusCode) {
    StatusCode[StatusCode["OK"] = 200] = "OK";
    StatusCode[StatusCode["NotFound"] = 404] = "NotFound";
    StatusCode[StatusCode["InternalError"] = 500] = "InternalError";
})(StatusCode || (StatusCode = {}));
// 16. DECORATORS (Experimental)
// Note: Requires experimentalDecorators in tsconfig.json
// 17. ADVANCED PATTERNS
// Singleton Pattern
class DatabaseConnection {
    constructor(connectionString) {
        this.connectionString = connectionString;
    }
    static getInstance(connectionString) {
        if (!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection(connectionString || "default");
        }
        return DatabaseConnection.instance;
    }
    connect() {
        console.log(`Connecting to database: ${this.connectionString}`);
    }
}
class ProductFactory {
    static createProduct(type) {
        switch (type) {
            case "basic":
                return { name: "Basic Product", price: 10 };
            case "premium":
                return { name: "Premium Product", price: 50 };
        }
    }
}
// 18. ASYNC/AWAIT
async function fetchUserData(id) {
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
function* numberGenerator() {
    yield 1;
    yield 2;
    yield 3;
}
function createUserId(id) {
    return id;
}
function createEmail(email) {
    return email;
}
// 25. TYPE PREDICATES
function isArrayOf(arr, predicate) {
    return Array.isArray(arr) && arr.every(predicate);
}
// 26. ASSERTION FUNCTIONS
function assertIsString(value) {
    if (typeof value !== "string") {
        throw new Error("Value must be a string");
    }
}
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
const successResult = { success: true, data: "Success data" };
const errorResult = { success: false, error: "Error message" };
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
const partialPerson = { name: "John" };
console.log("Partial person:", partialPerson);
// Type predicates
const stringArray = ["hello", "world", "typescript"];
if (isArrayOf(stringArray, isString)) {
    console.log("String array:", stringArray.join(", "));
}
console.log("=== END OF COMPREHENSIVE EXAMPLES ===");
