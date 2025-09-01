// ========================================
// OBJECT-ORIENTED PROGRAMMING EXAMPLES IN TYPESCRIPT
// ========================================
// This file demonstrates all OOP concepts including:
// - Encapsulation (Data hiding and bundling)
// - Inheritance (Code reuse and hierarchy)
// - Polymorphism (Multiple forms and behaviors)
// - Abstraction (Hiding complexity)
// - Design Patterns (Common OOP patterns)

// ========================================
// 1. ENCAPSULATION - Data Hiding and Bundling
// ========================================

/**
 * BankAccount class demonstrating encapsulation
 * - Private properties are hidden from external access
 * - Public methods provide controlled access to data
 * - Data and methods that operate on it are bundled together
 */
class BankAccount {
    // Private properties - hidden from external access
    private accountNumber: string;
    private balance: number;
    private transactionHistory: Transaction[] = [];

    // Protected property - accessible within class and subclasses
    protected accountType: string;

    // Public property - accessible from anywhere
    public readonly createdAt: Date;

    constructor(accountNumber: string, initialBalance: number = 0, accountType: string = "Savings") {
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
        this.accountType = accountType;
        this.createdAt = new Date();
    }

    // Public methods - controlled access to private data
    public getBalance(): number {
        return this.balance;
    }

    public getAccountNumber(): string {
        return this.accountNumber;
    }

    public deposit(amount: number): boolean {
        if (amount > 0) {
            this.balance += amount;
            this.addTransaction("deposit", amount);
            return true;
        }
        return false;
    }

    public withdraw(amount: number): boolean {
        if (amount > 0 && amount <= this.balance) {
            this.balance -= amount;
            this.addTransaction("withdrawal", -amount);
            return true;
        }
        return false;
    }

    public getTransactionHistory(): Transaction[] {
        return [...this.transactionHistory]; // Return copy to prevent external modification
    }

    // Private method - internal implementation detail
    private addTransaction(type: string, amount: number): void {
        const transaction: Transaction = {
            id: Date.now().toString(),
            type,
            amount,
            timestamp: new Date(),
            balanceAfter: this.balance
        };
        this.transactionHistory.push(transaction);
    }

    // Protected method - accessible in subclasses
    protected getAccountType(): string {
        return this.accountType;
    }
}

// Interface for transaction data
interface Transaction {
    id: string;
    type: string;
    amount: number;
    timestamp: Date;
    balanceAfter: number;
}

// ========================================
// 2. INHERITANCE - Code Reuse and Hierarchy
// ========================================

/**
 * Base class for all animals
 * Demonstrates inheritance and method overriding
 */
abstract class Animal {
    // Protected properties - accessible in subclasses
    protected name: string;
    protected age: number;
    protected species: string;

    constructor(name: string, age: number, species: string) {
        this.name = name;
        this.age = age;
        this.species = species;
    }

    // Abstract method - must be implemented by subclasses
    abstract makeSound(): void;

    // Virtual method - can be overridden by subclasses
    public move(): void {
        console.log(`${this.name} is moving`);
    }

    // Concrete method - shared implementation
    public sleep(): void {
        console.log(`${this.name} is sleeping`);
    }

    public getInfo(): string {
        return `${this.name} is a ${this.age}-year-old ${this.species}`;
    }

    // Getter and setter for encapsulation
    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        if (name.trim().length > 0) {
            this.name = name;
        }
    }
}

/**
 * Dog class inheriting from Animal
 * Demonstrates method overriding and extension
 */
class Dog extends Animal {
    private breed: string;
    private isTrained: boolean;

    constructor(name: string, age: number, breed: string, isTrained: boolean = false) {
        super(name, age, "Canis familiaris"); // Call parent constructor
        this.breed = breed;
        this.isTrained = isTrained;
    }

    // Method overriding - provides specific implementation
    public makeSound(): void {
        console.log(`${this.name} says: Woof! Woof!`);
    }

    // Method overriding with super call
    public move(): void {
        console.log(`${this.name} is running on four legs`);
        super.move(); // Call parent method
    }

    // New method specific to Dog
    public fetch(): void {
        console.log(`${this.name} is fetching the ball`);
    }

    public train(): void {
        this.isTrained = true;
        console.log(`${this.name} has been trained`);
    }

    public isTrainedDog(): boolean {
        return this.isTrained;
    }

    public getBreed(): string {
        return this.breed;
    }

    // Override getInfo to include breed
    public getInfo(): string {
        return `${super.getInfo()} of breed ${this.breed}`;
    }
}

/**
 * Cat class inheriting from Animal
 * Demonstrates different implementation of abstract method
 */
class Cat extends Animal {
    private color: string;
    private isIndoor: boolean;

    constructor(name: string, age: number, color: string, isIndoor: boolean = true) {
        super(name, age, "Felis catus");
        this.color = color;
        this.isIndoor = isIndoor;
    }

    // Different implementation of abstract method
    public makeSound(): void {
        console.log(`${this.name} says: Meow! Meow!`);
    }

    // Method overriding
    public move(): void {
        console.log(`${this.name} is walking gracefully`);
    }

    // New method specific to Cat
    public purr(): void {
        console.log(`${this.name} is purring`);
    }

    public getColor(): string {
        return this.color;
    }

    public isIndoorCat(): boolean {
        return this.isIndoor;
    }

    // Override getInfo to include color
    public getInfo(): string {
        return `${super.getInfo()} with ${this.color} color`;
    }
}

// ========================================
// 3. POLYMORPHISM - Multiple Forms and Behaviors
// ========================================

/**
 * Demonstrates polymorphism through method overriding
 * Same method name, different implementations
 */
class AnimalShelter {
    private animals: Animal[] = [];

    public addAnimal(animal: Animal): void {
        this.animals.push(animal);
        console.log(`Added ${animal.getName()} to the shelter`);
    }

    public makeAllAnimalsSound(): void {
        console.log("All animals making sounds:");
        this.animals.forEach(animal => {
            animal.makeSound(); // Polymorphic call - different behavior for each animal
        });
    }

    public getAllAnimalsInfo(): string[] {
        return this.animals.map(animal => animal.getInfo());
    }

    public feedAllAnimals(): void {
        this.animals.forEach(animal => {
            if (animal instanceof Dog) {
                console.log(`Feeding ${animal.getName()} with dog food`);
            } else if (animal instanceof Cat) {
                console.log(`Feeding ${animal.getName()} with cat food`);
            } else {
                console.log(`Feeding ${animal.getName()} with general food`);
            }
        });
    }
}

/**
 * Demonstrates polymorphism through interfaces
 */
interface Drawable {
    draw(): void;
    getArea(): number;
}

interface Movable {
    move(x: number, y: number): void;
    getPosition(): { x: number; y: number };
}

// Multiple interface implementation
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

class Rectangle implements Drawable, Movable {
    private x: number;
    private y: number;
    private width: number;
    private height: number;

    constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public draw(): void {
        console.log(`Drawing rectangle at (${this.x}, ${this.y}) with size ${this.width}x${this.height}`);
    }

    public getArea(): number {
        return this.width * this.height;
    }

    public move(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }

    public getPosition(): { x: number; y: number } {
        return { x: this.x, y: this.y };
    }
}

// Polymorphic function that works with any Drawable
function drawShape(shape: Drawable): void {
    shape.draw();
    console.log(`Area: ${shape.getArea()}`);
}

// ========================================
// 4. ABSTRACTION - Hiding Complexity
// ========================================

/**
 * Abstract class demonstrating abstraction
 * Hides complex implementation details
 */
abstract class DatabaseConnection {
    protected connectionString: string;
    protected isConnected: boolean = false;

    constructor(connectionString: string) {
        this.connectionString = connectionString;
    }

    // Abstract methods - implementation details hidden
    abstract connect(): Promise<void>;
    abstract disconnect(): Promise<void>;
    abstract executeQuery(query: string): Promise<any[]>;

    // Concrete methods - common functionality
    public isConnectedToDatabase(): boolean {
        return this.isConnected;
    }

    public getConnectionString(): string {
        return this.connectionString;
    }

    // Template method pattern
    public async executeTransaction(queries: string[]): Promise<boolean> {
        try {
            await this.connect();
            console.log("Transaction started");
            
            for (const query of queries) {
                await this.executeQuery(query);
            }
            
            console.log("Transaction committed");
            return true;
        } catch (error) {
            console.log("Transaction rolled back");
            return false;
        } finally {
            await this.disconnect();
        }
    }
}

/**
 * Concrete implementation of DatabaseConnection
 * Hides the complexity of PostgreSQL connection
 */
class PostgreSQLConnection extends DatabaseConnection {
    async connect(): Promise<void> {
        // Simulate complex PostgreSQL connection logic
        console.log(`Connecting to PostgreSQL: ${this.connectionString}`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.isConnected = true;
        console.log("PostgreSQL connected successfully");
    }

    async disconnect(): Promise<void> {
        console.log("Disconnecting from PostgreSQL");
        await new Promise(resolve => setTimeout(resolve, 500));
        this.isConnected = false;
        console.log("PostgreSQL disconnected");
    }

    async executeQuery(query: string): Promise<any[]> {
        if (!this.isConnected) {
            throw new Error("Not connected to database");
        }
        console.log(`Executing PostgreSQL query: ${query}`);
        // Simulate query execution
        return [{ result: "data" }];
    }
}

/**
 * Another concrete implementation
 * Hides the complexity of MySQL connection
 */
class MySQLConnection extends DatabaseConnection {
    async connect(): Promise<void> {
        console.log(`Connecting to MySQL: ${this.connectionString}`);
        await new Promise(resolve => setTimeout(resolve, 800));
        this.isConnected = true;
        console.log("MySQL connected successfully");
    }

    async disconnect(): Promise<void> {
        console.log("Disconnecting from MySQL");
        await new Promise(resolve => setTimeout(resolve, 300));
        this.isConnected = false;
        console.log("MySQL disconnected");
    }

    async executeQuery(query: string): Promise<any[]> {
        if (!this.isConnected) {
            throw new Error("Not connected to database");
        }
        console.log(`Executing MySQL query: ${query}`);
        return [{ result: "data" }];
    }
}

// ========================================
// 5. DESIGN PATTERNS
// ========================================

/**
 * Singleton Pattern - Ensure only one instance exists
 */
class Logger {
    private static instance: Logger;
    private logs: string[] = [];

    private constructor() {}

    public static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    public log(message: string): void {
        const timestamp = new Date().toISOString();
        const logEntry = `[${timestamp}] ${message}`;
        this.logs.push(logEntry);
        console.log(logEntry);
    }

    public getLogs(): string[] {
        return [...this.logs];
    }

    public clearLogs(): void {
        this.logs = [];
    }
}

/**
 * Factory Pattern - Create objects without specifying exact class
 */
interface Vehicle {
    start(): void;
    stop(): void;
    getInfo(): string;
}

class Car implements Vehicle {
    private brand: string;
    private model: string;

    constructor(brand: string, model: string) {
        this.brand = brand;
        this.model = model;
    }

    public start(): void {
        console.log(`${this.brand} ${this.model} car is starting`);
    }

    public stop(): void {
        console.log(`${this.brand} ${this.model} car is stopping`);
    }

    public getInfo(): string {
        return `${this.brand} ${this.model} Car`;
    }
}

class Motorcycle implements Vehicle {
    private brand: string;
    private model: string;

    constructor(brand: string, model: string) {
        this.brand = brand;
        this.model = model;
    }

    public start(): void {
        console.log(`${this.brand} ${this.model} motorcycle is starting`);
    }

    public stop(): void {
        console.log(`${this.brand} ${this.model} motorcycle is stopping`);
    }

    public getInfo(): string {
        return `${this.brand} ${this.model} Motorcycle`;
    }
}

class VehicleFactory {
    public static createVehicle(type: "car" | "motorcycle", brand: string, model: string): Vehicle {
        switch (type) {
            case "car":
                return new Car(brand, model);
            case "motorcycle":
                return new Motorcycle(brand, model);
            default:
                throw new Error(`Unknown vehicle type: ${type}`);
        }
    }
}

/**
 * Observer Pattern - One-to-many dependency between objects
 */
interface Observer {
    update(data: any): void;
}

class Subject {
    private observers: Observer[] = [];
    private state: any;

    public attach(observer: Observer): void {
        this.observers.push(observer);
    }

    public detach(observer: Observer): void {
        const index = this.observers.indexOf(observer);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    }

    public notify(): void {
        for (const observer of this.observers) {
            observer.update(this.state);
        }
    }

    public setState(state: any): void {
        this.state = state;
        this.notify();
    }

    public getState(): any {
        return this.state;
    }
}

class ConcreteObserver implements Observer {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    public update(data: any): void {
        console.log(`Observer ${this.name} received update:`, data);
    }
}

/**
 * Strategy Pattern - Define family of algorithms and make them interchangeable
 */
interface PaymentStrategy {
    pay(amount: number): void;
}

class CreditCardPayment implements PaymentStrategy {
    private cardNumber: string;
    private cardHolder: string;

    constructor(cardNumber: string, cardHolder: string) {
        this.cardNumber = cardNumber;
        this.cardHolder = cardHolder;
    }

    public pay(amount: number): void {
        console.log(`Paid $${amount} using Credit Card ending in ${this.cardNumber.slice(-4)}`);
    }
}

class PayPalPayment implements PaymentStrategy {
    private email: string;

    constructor(email: string) {
        this.email = email;
    }

    public pay(amount: number): void {
        console.log(`Paid $${amount} using PayPal account ${this.email}`);
    }
}

class CashPayment implements PaymentStrategy {
    public pay(amount: number): void {
        console.log(`Paid $${amount} in cash`);
    }
}

class ShoppingCart {
    private items: { name: string; price: number }[] = [];
    private paymentStrategy: PaymentStrategy;

    constructor(paymentStrategy: PaymentStrategy) {
        this.paymentStrategy = paymentStrategy;
    }

    public addItem(name: string, price: number): void {
        this.items.push({ name, price });
    }

    public setPaymentStrategy(strategy: PaymentStrategy): void {
        this.paymentStrategy = strategy;
    }

    public checkout(): void {
        const total = this.items.reduce((sum, item) => sum + item.price, 0);
        console.log(`Total: $${total}`);
        this.paymentStrategy.pay(total);
        this.items = [];
    }

    public getItems(): { name: string; price: number }[] {
        return [...this.items];
    }
}

// ========================================
// 6. COMPOSITION OVER INHERITANCE
// ========================================

/**
 * Demonstrates composition over inheritance
 * Using interfaces and composition for flexibility
 */
interface Flyable {
    fly(): void;
}

interface Swimmable {
    swim(): void;
}

interface Walkable {
    walk(): void;
}

class FlyingBehavior implements Flyable {
    public fly(): void {
        console.log("Flying through the air");
    }
}

class SwimmingBehavior implements Swimmable {
    public swim(): void {
        console.log("Swimming in water");
    }
}

class WalkingBehavior implements Walkable {
    public walk(): void {
        console.log("Walking on land");
    }
}

class Bird {
    private name: string;
    private flyingBehavior: Flyable;
    private walkingBehavior: Walkable;

    constructor(name: string) {
        this.name = name;
        this.flyingBehavior = new FlyingBehavior();
        this.walkingBehavior = new WalkingBehavior();
    }

    public fly(): void {
        this.flyingBehavior.fly();
    }

    public walk(): void {
        this.walkingBehavior.walk();
    }

    public getName(): string {
        return this.name;
    }
}

class Duck extends Bird {
    private swimmingBehavior: Swimmable;

    constructor(name: string) {
        super(name);
        this.swimmingBehavior = new SwimmingBehavior();
    }

    public swim(): void {
        this.swimmingBehavior.swim();
    }
}

// ========================================
// 7. INTERFACE SEGREGATION PRINCIPLE
// ========================================

/**
 * Demonstrates Interface Segregation Principle
 * Clients should not be forced to depend on interfaces they don't use
 */

// Bad design - fat interface
interface Worker {
    work(): void;
    eat(): void;
    sleep(): void;
}

// Good design - segregated interfaces
interface Workable {
    work(): void;
}

interface Eatable {
    eat(): void;
}

interface Sleepable {
    sleep(): void;
}

class Human implements Workable, Eatable, Sleepable {
    public work(): void {
        console.log("Human is working");
    }

    public eat(): void {
        console.log("Human is eating");
    }

    public sleep(): void {
        console.log("Human is sleeping");
    }
}

class Robot implements Workable {
    public work(): void {
        console.log("Robot is working");
    }
}

// ========================================
// 8. DEPENDENCY INVERSION PRINCIPLE
// ========================================

/**
 * Demonstrates Dependency Inversion Principle
 * High-level modules should not depend on low-level modules
 * Both should depend on abstractions
 */

// Abstraction (interface)
interface MessageSender {
    send(message: string): void;
}

// Low-level module
class EmailSender implements MessageSender {
    public send(message: string): void {
        console.log(`Sending email: ${message}`);
    }
}

class SMSSender implements MessageSender {
    public send(message: string): void {
        console.log(`Sending SMS: ${message}`);
    }
}

// High-level module depends on abstraction
class NotificationService {
    private messageSender: MessageSender;

    constructor(messageSender: MessageSender) {
        this.messageSender = messageSender;
    }

    public sendNotification(message: string): void {
        this.messageSender.send(message);
    }
}

// ========================================
// DEMONSTRATION
// ========================================

console.log("=== OBJECT-ORIENTED PROGRAMMING EXAMPLES ===");

// 1. Encapsulation demonstration
console.log("\n1. ENCAPSULATION:");
const account = new BankAccount("123456789", 1000);
console.log("Account balance:", account.getBalance());
account.deposit(500);
console.log("After deposit:", account.getBalance());
account.withdraw(200);
console.log("After withdrawal:", account.getBalance());
console.log("Transaction history:", account.getTransactionHistory());

// 2. Inheritance demonstration
console.log("\n2. INHERITANCE:");
const dog = new Dog("Buddy", 3, "Golden Retriever", true);
const cat = new Cat("Whiskers", 2, "Orange", true);

console.log(dog.getInfo());
dog.makeSound();
dog.fetch();
dog.train();

console.log(cat.getInfo());
cat.makeSound();
cat.purr();

// 3. Polymorphism demonstration
console.log("\n3. POLYMORPHISM:");
const shelter = new AnimalShelter();
shelter.addAnimal(dog);
shelter.addAnimal(cat);
shelter.makeAllAnimalsSound();
shelter.feedAllAnimals();

// Polymorphism with interfaces
const circle = new Circle(10, 20, 5);
const rectangle = new Rectangle(15, 25, 10, 8);

console.log("Drawing shapes:");
drawShape(circle);
drawShape(rectangle);

// 4. Abstraction demonstration
console.log("\n4. ABSTRACTION:");
const postgresConnection = new PostgreSQLConnection("postgresql://localhost:5432/mydb");
const mysqlConnection = new MySQLConnection("mysql://localhost:3306/mydb");

// Both use the same interface despite different implementations
await postgresConnection.executeTransaction([
    "CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(100))",
    "INSERT INTO users (name) VALUES ('John Doe')"
]);

await mysqlConnection.executeTransaction([
    "CREATE TABLE products (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100))",
    "INSERT INTO products (name) VALUES ('Product 1')"
]);

// 5. Design Patterns demonstration
console.log("\n5. DESIGN PATTERNS:");

// Singleton
const logger1 = Logger.getInstance();
const logger2 = Logger.getInstance();
console.log("Same logger instance:", logger1 === logger2);
logger1.log("This is a test message");

// Factory
const car = VehicleFactory.createVehicle("car", "Toyota", "Camry");
const motorcycle = VehicleFactory.createVehicle("motorcycle", "Honda", "CBR600RR");
car.start();
motorcycle.start();

// Observer
const subject = new Subject();
const observer1 = new ConcreteObserver("Observer 1");
const observer2 = new ConcreteObserver("Observer 2");

subject.attach(observer1);
subject.attach(observer2);
subject.setState("New state data");

// Strategy
const cart = new ShoppingCart(new CreditCardPayment("1234567890123456", "John Doe"));
cart.addItem("Laptop", 999);
cart.addItem("Mouse", 25);
cart.checkout();

cart.setPaymentStrategy(new PayPalPayment("john@example.com"));
cart.addItem("Keyboard", 75);
cart.checkout();

// 6. Composition demonstration
console.log("\n6. COMPOSITION OVER INHERITANCE:");
const duck = new Duck("Donald");
duck.fly();
duck.walk();
duck.swim();

// 7. Interface Segregation demonstration
console.log("\n7. INTERFACE SEGREGATION:");
const human = new Human();
const robot = new Robot();

human.work();
human.eat();
human.sleep();

robot.work();
// robot.eat(); // Error - Robot doesn't implement Eatable

// 8. Dependency Inversion demonstration
console.log("\n8. DEPENDENCY INVERSION:");
const emailNotification = new NotificationService(new EmailSender());
const smsNotification = new NotificationService(new SMSSender());

emailNotification.sendNotification("Hello via email!");
smsNotification.sendNotification("Hello via SMS!");

console.log("\n=== END OF OOP EXAMPLES ===");

