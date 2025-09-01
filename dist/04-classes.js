"use strict";
// ========================================
// 4. CLASSES - TypeScript Class Features
// ========================================
// Basic Class
class Person {
    // Constructor
    constructor(id, name, age) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.createdAt = new Date();
    }
    // Methods
    getInfo() {
        return `${this.name} (ID: ${this.id}) is ${this.age} years old`;
    }
    getAge() {
        return this.age;
    }
    getId() {
        return this.id;
    }
    // Static method
    static createPerson(name, age) {
        return new Person(Math.floor(Math.random() * 1000), name, age);
    }
    // Getter
    get fullInfo() {
        return `${this.getInfo()} - Created: ${this.createdAt.toLocaleDateString()}`;
    }
    // Setter
    set updateAge(newAge) {
        if (newAge >= 0) {
            this.age = newAge;
        }
    }
}
// Class Inheritance
class Employee extends Person {
    constructor(id, name, age, salary, department) {
        super(id, name, age);
        this.salary = salary;
        this.department = department;
    }
    getSalary() {
        return this.salary;
    }
    getInfo() {
        return `${super.getInfo()} - Department: ${this.department}`;
    }
    // Method override
    getFullInfo() {
        return `${this.getInfo()} - Salary: $${this.salary}`;
    }
}
// Abstract Classes
class Vehicle {
    constructor(brand, model, year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }
    // Concrete method
    getInfo() {
        return `${this.year} ${this.brand} ${this.model}`;
    }
    // Protected method
    getBrand() {
        return this.brand;
    }
}
class Car extends Vehicle {
    constructor(brand, model, year, fuelType) {
        super(brand, model, year);
        this.isRunning = false;
        this.fuelType = fuelType;
    }
    startEngine() {
        this.isRunning = true;
        console.log(`${this.getBrand()} engine started`);
    }
    stopEngine() {
        this.isRunning = false;
        console.log(`${this.getBrand()} engine stopped`);
    }
    getFuelType() {
        return this.fuelType;
    }
    isEngineRunning() {
        return this.isRunning;
    }
}
class Motorcycle extends Vehicle {
    constructor(brand, model, year, engineSize) {
        super(brand, model, year);
        this.engineSize = engineSize;
    }
    startEngine() {
        console.log(`${this.getBrand()} motorcycle engine started`);
    }
    stopEngine() {
        console.log(`${this.getBrand()} motorcycle engine stopped`);
    }
    getEngineSize() {
        return this.engineSize;
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
// Generic Classes
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
    getCount() {
        return this.items.length;
    }
}
class LengthContainer {
    constructor() {
        this.items = [];
    }
    add(item) {
        this.items.push(item);
    }
    getTotalLength() {
        return this.items.reduce((total, item) => total + item.length, 0);
    }
}
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
    disconnect() {
        console.log("Disconnecting from database");
    }
}
// Class with Decorators (TypeScript experimental feature)
// Note: This requires experimentalDecorators to be enabled in tsconfig.json
// Class with Accessor Decorators
class UserAccount {
    constructor(username, email) {
        this._username = username;
        this._email = email;
    }
    get username() {
        return this._username;
    }
    set username(value) {
        if (value.length >= 3) {
            this._username = value;
        }
        else {
            throw new Error("Username must be at least 3 characters long");
        }
    }
    get email() {
        return this._email;
    }
    set email(value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(value)) {
            this._email = value;
        }
        else {
            throw new Error("Invalid email format");
        }
    }
}
// Class with Method Overloading
class Calculator {
    add(a, b) {
        if (typeof a === "number" && typeof b === "number") {
            return a + b;
        }
        else if (typeof a === "string" && typeof b === "string") {
            return a + b;
        }
        throw new Error("Invalid arguments");
    }
}
// Class with Index Signatures
class Dictionary {
    constructor() {
        this.data = {};
    }
    set(key, value) {
        this.data[key] = value;
    }
    get(key) {
        return this.data[key];
    }
    has(key) {
        return key in this.data;
    }
    delete(key) {
        if (this.has(key)) {
            delete this.data[key];
            return true;
        }
        return false;
    }
    keys() {
        return Object.keys(this.data);
    }
    values() {
        return Object.values(this.data);
    }
}
// Class with Readonly Properties
class Configuration {
    constructor(apiUrl, timeout, maxRetries) {
        this.apiUrl = apiUrl;
        this.timeout = timeout;
        this.maxRetries = maxRetries;
    }
    getConfig() {
        return {
            apiUrl: this.apiUrl,
            timeout: this.timeout,
            maxRetries: this.maxRetries
        };
    }
}
console.log("=== TypeScript Classes Examples ===");
// Basic class usage
const person = new Person(1, "John Doe", 30);
console.log("Person info:", person.getInfo());
console.log("Person full info:", person.fullInfo);
person.updateAge = 31;
console.log("Updated age:", person.age);
// Static method
const staticPerson = Person.createPerson("Jane Smith", 25);
console.log("Static person:", staticPerson.getInfo());
// Inheritance
const employee = new Employee(2, "Bob Johnson", 35, 75000, "Engineering");
console.log("Employee info:", employee.getFullInfo());
// Abstract class
const car = new Car("Toyota", "Camry", 2022, "Gasoline");
car.startEngine();
console.log("Car info:", car.getInfo());
console.log("Engine running:", car.isEngineRunning());
const motorcycle = new Motorcycle("Honda", "CBR600RR", 2021, 600);
motorcycle.startEngine();
console.log("Motorcycle info:", motorcycle.getInfo());
// Interface implementation
const circle = new Circle(10, 20, 5);
circle.draw();
console.log("Circle area:", circle.getArea());
circle.move(15, 25);
console.log("New position:", circle.getPosition());
// Generic class
const numberContainer = new Container();
numberContainer.add(1);
numberContainer.add(2);
numberContainer.add(3);
console.log("Number container:", numberContainer.getAll());
const stringContainer = new Container();
stringContainer.add("hello");
stringContainer.add("world");
console.log("String container:", stringContainer.getAll());
// Generic constraints
const lengthContainer = new LengthContainer();
lengthContainer.add("hello");
lengthContainer.add("world");
console.log("Total length:", lengthContainer.getTotalLength());
// Singleton
const db1 = DatabaseConnection.getInstance("postgresql://localhost:5432/mydb");
const db2 = DatabaseConnection.getInstance();
console.log("Same instance:", db1 === db2);
db1.connect();
// User account with accessors
const userAccount = new UserAccount("john_doe", "john@example.com");
console.log("Username:", userAccount.username);
console.log("Email:", userAccount.email);
// Calculator with method overloading
const calculator = new Calculator();
console.log("Number addition:", calculator.add(5, 3));
console.log("String concatenation:", calculator.add("Hello", " World"));
// Dictionary
const dict = new Dictionary();
dict.set("key1", "value1");
dict.set("key2", "value2");
console.log("Dictionary keys:", dict.keys());
console.log("Dictionary values:", dict.values());
console.log("Has key1:", dict.has("key1"));
// Configuration
const config = new Configuration("https://api.example.com", 5000, 3);
console.log("Configuration:", config.getConfig());
