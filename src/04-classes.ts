// ========================================
// 4. CLASSES - TypeScript Class Features
// ========================================

// Basic Class
class Person {
    // Properties
    private id: number;
    protected name: string;
    public age: number;
    readonly createdAt: Date;

    // Constructor
    constructor(id: number, name: string, age: number) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.createdAt = new Date();
    }

    // Methods
    public getInfo(): string {
        return `${this.name} (ID: ${this.id}) is ${this.age} years old`;
    }

    protected getAge(): number {
        return this.age;
    }

    private getId(): number {
        return this.id;
    }

    // Static method
    static createPerson(name: string, age: number): Person {
        return new Person(Math.floor(Math.random() * 1000), name, age);
    }

    // Getter
    get fullInfo(): string {
        return `${this.getInfo()} - Created: ${this.createdAt.toLocaleDateString()}`;
    }

    // Setter
    set updateAge(newAge: number) {
        if (newAge >= 0) {
            this.age = newAge;
        }
    }
}

// Class Inheritance
class Employee extends Person {
    private salary: number;
    public department: string;

    constructor(id: number, name: string, age: number, salary: number, department: string) {
        super(id, name, age);
        this.salary = salary;
        this.department = department;
    }

    public getSalary(): number {
        return this.salary;
    }

    public getInfo(): string {
        return `${super.getInfo()} - Department: ${this.department}`;
    }

    // Method override
    public getFullInfo(): string {
        return `${this.getInfo()} - Salary: $${this.salary}`;
    }
}

// Abstract Classes
abstract class Vehicle {
    protected brand: string;
    protected model: string;
    protected year: number;

    constructor(brand: string, model: string, year: number) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }

    // Abstract method - must be implemented by subclasses
    abstract startEngine(): void;
    abstract stopEngine(): void;

    // Concrete method
    public getInfo(): string {
        return `${this.year} ${this.brand} ${this.model}`;
    }

    // Protected method
    protected getBrand(): string {
        return this.brand;
    }
}

class Car extends Vehicle {
    private fuelType: string;
    private isRunning: boolean = false;

    constructor(brand: string, model: string, year: number, fuelType: string) {
        super(brand, model, year);
        this.fuelType = fuelType;
    }

    public startEngine(): void {
        this.isRunning = true;
        console.log(`${this.getBrand()} engine started`);
    }

    public stopEngine(): void {
        this.isRunning = false;
        console.log(`${this.getBrand()} engine stopped`);
    }

    public getFuelType(): string {
        return this.fuelType;
    }

    public isEngineRunning(): boolean {
        return this.isRunning;
    }
}

class Motorcycle extends Vehicle {
    private engineSize: number;

    constructor(brand: string, model: string, year: number, engineSize: number) {
        super(brand, model, year);
        this.engineSize = engineSize;
    }

    public startEngine(): void {
        console.log(`${this.getBrand()} motorcycle engine started`);
    }

    public stopEngine(): void {
        console.log(`${this.getBrand()} motorcycle engine stopped`);
    }

    public getEngineSize(): number {
        return this.engineSize;
    }
}

// Interfaces with Classes
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

// Generic Classes
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

    public getCount(): number {
        return this.items.length;
    }
}

// Class with Generic Constraints
interface Lengthwise {
    length: number;
}

class LengthContainer<T extends Lengthwise> {
    private items: T[] = [];

    public add(item: T): void {
        this.items.push(item);
    }

    public getTotalLength(): number {
        return this.items.reduce((total, item) => total + item.length, 0);
    }
}

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

    public disconnect(): void {
        console.log("Disconnecting from database");
    }
}

// Class with Decorators (TypeScript experimental feature)
// Note: This requires experimentalDecorators to be enabled in tsconfig.json

// Class with Accessor Decorators
class UserAccount {
    private _username: string;
    private _email: string;

    constructor(username: string, email: string) {
        this._username = username;
        this._email = email;
    }

    get username(): string {
        return this._username;
    }

    set username(value: string) {
        if (value.length >= 3) {
            this._username = value;
        } else {
            throw new Error("Username must be at least 3 characters long");
        }
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(value)) {
            this._email = value;
        } else {
            throw new Error("Invalid email format");
        }
    }
}

// Class with Method Overloading
class Calculator {
    public add(a: number, b: number): number;
    public add(a: string, b: string): string;
    public add(a: number | string, b: number | string): number | string {
        if (typeof a === "number" && typeof b === "number") {
            return a + b;
        } else if (typeof a === "string" && typeof b === "string") {
            return a + b;
        }
        throw new Error("Invalid arguments");
    }
}

// Class with Index Signatures
class Dictionary<T> {
    private data: { [key: string]: T } = {};

    public set(key: string, value: T): void {
        this.data[key] = value;
    }

    public get(key: string): T | undefined {
        return this.data[key];
    }

    public has(key: string): boolean {
        return key in this.data;
    }

    public delete(key: string): boolean {
        if (this.has(key)) {
            delete this.data[key];
            return true;
        }
        return false;
    }

    public keys(): string[] {
        return Object.keys(this.data);
    }

    public values(): T[] {
        return Object.values(this.data);
    }
}

// Class with Readonly Properties
class Configuration {
    public readonly apiUrl: string;
    public readonly timeout: number;
    public readonly maxRetries: number;

    constructor(apiUrl: string, timeout: number, maxRetries: number) {
        this.apiUrl = apiUrl;
        this.timeout = timeout;
        this.maxRetries = maxRetries;
    }

    public getConfig(): { apiUrl: string; timeout: number; maxRetries: number } {
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
const numberContainer = new Container<number>();
numberContainer.add(1);
numberContainer.add(2);
numberContainer.add(3);
console.log("Number container:", numberContainer.getAll());

const stringContainer = new Container<string>();
stringContainer.add("hello");
stringContainer.add("world");
console.log("String container:", stringContainer.getAll());

// Generic constraints
const lengthContainer = new LengthContainer<string>();
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
const dict = new Dictionary<string>();
dict.set("key1", "value1");
dict.set("key2", "value2");
console.log("Dictionary keys:", dict.keys());
console.log("Dictionary values:", dict.values());
console.log("Has key1:", dict.has("key1"));

// Configuration
const config = new Configuration("https://api.example.com", 5000, 3);
console.log("Configuration:", config.getConfig());


