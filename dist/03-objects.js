"use strict";
// ========================================
// 3. OBJECT TYPES - TypeScript Object Features
// ========================================
// Basic Object Types
let personObject = {
    name: "John Doe",
    age: 30,
    email: "john@example.com"
};
let userObject = {
    id: 1,
    name: "Jane Smith",
    email: "jane@example.com",
    isActive: true,
    createdAt: new Date()
};
let employee = {
    id: 2,
    name: "Bob Johnson",
    email: "bob@example.com",
    isActive: true,
    createdAt: new Date(),
    department: "Engineering",
    salary: 75000
};
let fullProfile = {
    id: 3,
    name: "Alice Brown",
    email: "alice@example.com",
    isActive: true,
    createdAt: new Date(),
    street: "123 Main St",
    city: "New York",
    country: "USA",
    zipCode: "10001",
    phone: "+1-555-0123",
    website: "alicebrown.com",
    bio: "Software engineer passionate about TypeScript"
};
let colorDict = {
    primary: "blue",
    secondary: "green",
    accent: "orange"
};
let search = (source, subString, startIndex) => {
    if (startIndex !== undefined) {
        return source.indexOf(subString, startIndex) !== -1;
    }
    return source.indexOf(subString) !== -1;
};
class DigitalClock {
    constructor(h, m) { }
    tick() {
        console.log("beep beep");
    }
    getTime() {
        return new Date().toLocaleTimeString();
    }
}
// Classes
class Animal {
    constructor(name, age, species) {
        this.name = name;
        this.age = age;
        this.species = species;
    }
    makeSound() {
        console.log("Some animal sound");
    }
    getAge() {
        return this.age;
    }
    getInfo() {
        return `${this.name} is a ${this.age}-year-old ${this.species}`;
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
    getFullInfo() {
        return `${this.getInfo()} of breed ${this.breed}`;
    }
}
// Abstract Classes
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
    getFuelType() {
        return this.fuelType;
    }
}
class NumberContainer {
    constructor(value) {
        this.value = value;
    }
    getValue() {
        return this.value;
    }
    setValue(value) {
        this.value = value;
    }
}
let adminUser = {
    id: 1,
    name: "Admin User",
    role: "admin",
    permissions: ["read", "write", "delete"]
};
let regularUser = {
    id: 2,
    name: "Regular User",
    role: "user"
};
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? { email, isValid: true } : null;
}
function validatePhone(phone) {
    const phoneRegex = /^\+?[\d\s-()]{10,}$/;
    return phoneRegex.test(phone) ? { phone, isValid: true } : null;
}
let completeUser = {
    id: 1,
    name: "John Doe",
    email: "john@example.com"
};
function calculateArea(shape) {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "rectangle":
            return shape.width * shape.height;
        case "triangle":
            return 0.5 * shape.base * shape.height;
        default:
            return 0;
    }
}
console.log("=== TypeScript Objects Examples ===");
console.log("Person:", personObject);
console.log("User:", userObject);
console.log("Employee:", employee);
console.log("Full Profile:", fullProfile);
console.log("Colors:", colorDict);
const dog = new Dog("Buddy", 3, "Golden Retriever");
console.log("Dog info:", dog.getFullInfo());
dog.makeSound();
const car = new Car("Toyota", "Camry", 2022, "Gasoline");
console.log("Car info:", car.getInfo());
car.startEngine();
const numberContainer = new NumberContainer(42);
console.log("Container value:", numberContainer.getValue());
console.log("Admin user:", adminUser);
console.log("Regular user:", regularUser);
const validatedEmail = validateEmail("test@example.com");
console.log("Validated email:", validatedEmail);
console.log("Complete user:", completeUser);
const circle = { kind: "circle", radius: 5 };
const rectangle = { kind: "rectangle", width: 4, height: 6 };
console.log("Circle area:", calculateArea(circle));
console.log("Rectangle area:", calculateArea(rectangle));
