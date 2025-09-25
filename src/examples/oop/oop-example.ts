// OOP in TypeScript: encapsulation, inheritance, polymorphism, abstraction, interfaces, composition

// Interface: defines a contract without implementation (supports abstraction)
interface Drivable {
    start(): void;
    stop(): void;
    accelerate(amount: number): void;
}

// Composition: Engine is a separate component used by Vehicles
class Engine {
    private running: boolean = false; // encapsulated state
    private rpm: number = 0;

    public turnOn(): void {
        this.running = true;
        this.rpm = 800;
        console.log("Engine: on");
    }

    public turnOff(): void {
        this.running = false;
        this.rpm = 0;
        console.log("Engine: off");
    }

    public increaseRpm(delta: number): void {
        if (!this.running) {
            console.log("Engine: cannot increase RPM while off");
            return;
        }
        this.rpm += delta;
        console.log(`Engine: rpm=${this.rpm}`);
    }

    public isRunning(): boolean {
        return this.running;
    }
}

// Abstraction via abstract class: provides shared behavior with required overrides
abstract class Vehicle implements Drivable {
    protected readonly make: string; // protected: visible to subclasses
    protected readonly model: string;
    private readonly engine: Engine; // encapsulation + composition
    private speed: number = 0; // encapsulated state

    constructor(make: string, model: string, engine: Engine) {
        this.make = make;
        this.model = model;
        this.engine = engine;
    }

    // Template Method pattern: final public flow, subclasses customize hooks
    public start(): void {
        if (!this.engine.isRunning()) {
            this.engine.turnOn();
        }
        this.onStart(); // hook for subclasses
    }

    public stop(): void {
        this.speed = 0;
        this.engine.turnOff();
        this.onStop();
    }

    public accelerate(amount: number): void {
        if (!this.engine.isRunning()) {
            console.log(`${this.fullName()}: cannot accelerate while off`);
            return;
        }
        this.speed += amount;
        this.engine.increaseRpm(amount * 100);
        console.log(`${this.fullName()}: speed=${this.speed}km/h`);
    }

    // Polymorphic behavior required from subclasses
    protected abstract onStart(): void;
    protected abstract onStop(): void;

    // Encapsulated helper
    protected fullName(): string {
        return `${this.make} ${this.model}`;
    }
}

// Inheritance: Car extends Vehicle
class Car extends Vehicle {
    private readonly doors: number;

    constructor(make: string, model: string, doors: number, engine: Engine) {
        super(make, model, engine);
        this.doors = doors;
    }

    protected onStart(): void {
        console.log(`${this.fullName()} (Car): ready with ${this.doors} doors`);
    }

    protected onStop(): void {
        console.log(`${this.fullName()} (Car): parked`);
    }
}

// Inheritance: Motorcycle extends Vehicle with overridden behavior
class Motorcycle extends Vehicle {
    constructor(make: string, model: string, engine: Engine) {
        super(make, model, engine);
    }

    protected onStart(): void {
        console.log(`${this.fullName()} (Motorcycle): helmet on`);
    }

    protected onStop(): void {
        console.log(`${this.fullName()} (Motorcycle): kickstand down`);
    }
}

// Polymorphism in action: operate any Drivable
function demoDrive(vehicle: Drivable): void {
    vehicle.start();
    vehicle.accelerate(10);
    vehicle.accelerate(20);
    vehicle.stop();
}

// Demo
console.log("-- OOP Demo --");
const civic = new Car("Honda", "Civic", 4, new Engine());
const ninja = new Motorcycle("Kawasaki", "Ninja 400", new Engine());

demoDrive(civic);
demoDrive(ninja);

// Encapsulation showcase: the following properties are not accessible
// civic.speed; // Error: Property 'speed' is private
// civic.engine; // Error: Property 'engine' is private


// --- OOP: Bad vs Good examples for each principle ---
console.log("--- OOP Bad vs Good Examples ---");

// 1) ENCAPSULATION: Bad vs Good
console.log("--- 1) ENCAPSULATION ---");

// BAD: Public mutable state, no data hiding
class BadBankAccount {
    public balance: number = 0; // anyone can modify directly
    public accountNumber: string = ""; // exposed sensitive data
    
    public withdraw(amount: number): void {
        this.balance -= amount; // no validation
    }
}

// GOOD: Private state with controlled access
class GoodBankAccount {
    private balance: number = 0;
    private readonly accountNumber: string;
    
    constructor(accountNumber: string, initialBalance: number = 0) {
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
    }
    
    public getBalance(): number { return this.balance; }
    public getAccountNumber(): string { return this.accountNumber; }
    
    public withdraw(amount: number): boolean {
        if (amount > 0 && amount <= this.balance) {
            this.balance -= amount;
            return true;
        }
        return false;
    }
    
    public deposit(amount: number): boolean {
        if (amount > 0) {
            this.balance += amount;
            return true;
        }
        return false;
    }
}

// 2) INHERITANCE: Bad vs Good
console.log("--- 2) INHERITANCE ---");

// BAD: Deep inheritance hierarchy, fragile base class
class BadAnimal {
    public name: string = "";
    public speak(): string { return "Some sound"; }
    public fly(): void { console.log("Flying"); } // not all animals fly
    public swim(): void { console.log("Swimming"); } // not all animals swim
}

class BadBird extends BadAnimal {
    public speak(): string { return "Tweet"; }
    // forced to inherit fly() and swim() even if not needed
}

class BadFish extends BadAnimal {
    public speak(): string { return "Blub"; }
    // forced to inherit fly() and swim() even if not needed
}

// GOOD: Proper inheritance with focused base class
abstract class GoodAnimal {
    constructor(protected name: string) {}
    public abstract speak(): string;
    public getName(): string { return this.name; }
}

class GoodBird extends GoodAnimal {
    public speak(): string { return "Tweet"; }
    public fly(): void { console.log(`${this.name} is flying`); }
}

class GoodFish extends GoodAnimal {
    public speak(): string { return "Blub"; }
    public swim(): void { console.log(`${this.name} is swimming`); }
}

// 3) POLYMORPHISM: Bad vs Good
console.log("--- 3) POLYMORPHISM ---");

// BAD: Type checking with if-else chains
function badProcessAnimal(animal: any): void {
    if (animal instanceof BadBird) {
        console.log("Bird says:", animal.speak());
        animal.fly();
    } else if (animal instanceof BadFish) {
        console.log("Fish says:", animal.speak());
        animal.swim();
    } else {
        console.log("Unknown animal");
    }
}

// GOOD: Polymorphic behavior through interfaces/abstract classes
function goodProcessAnimal(animal: GoodAnimal): void {
    console.log(`${animal.getName()} says: ${animal.speak()}`);
    // Polymorphic behavior - each animal handles its own actions
    if (animal instanceof GoodBird) animal.fly();
    if (animal instanceof GoodFish) animal.swim();
}

// 4) ABSTRACTION: Bad vs Good
console.log("--- 4) ABSTRACTION ---");

// BAD: Concrete implementation details exposed
class BadDatabase {
    public connect(): void {
        console.log("Connecting to MySQL database...");
        console.log("Opening connection pool...");
        console.log("Setting up connection parameters...");
    }
    
    public query(sql: string): any[] {
        console.log("Executing SQL:", sql);
        console.log("Parsing result set...");
        console.log("Converting to objects...");
        return [];
    }
}

// GOOD: Abstract interface hiding implementation details
interface Database {
    connect(): void;
    query(sql: string): any[];
    disconnect(): void;
}

class MySQLDatabase implements Database {
    public connect(): void { console.log("MySQL connected"); }
    public query(sql: string): any[] { console.log("MySQL query:", sql); return []; }
    public disconnect(): void { console.log("MySQL disconnected"); }
}

class PostgreSQLDatabase implements Database {
    public connect(): void { console.log("PostgreSQL connected"); }
    public query(sql: string): any[] { console.log("PostgreSQL query:", sql); return []; }
    public disconnect(): void { console.log("PostgreSQL disconnected"); }
}

// 5) COMPOSITION: Bad vs Good
console.log("--- 5) COMPOSITION ---");

// BAD: Tight coupling, hard to test/modify
class BadCar {
    private engine: any; // tightly coupled to specific engine
    private wheels: any; // tightly coupled to specific wheels
    
    public start(): void {
        console.log("Starting car with specific engine...");
        console.log("Checking specific wheels...");
    }
}

// GOOD: Composition with interfaces, loose coupling
interface CarEngine {
    start(): void;
    stop(): void;
}

interface Wheels {
    rotate(): void;
}

class V8Engine implements CarEngine {
    public start(): void { console.log("V8 engine started"); }
    public stop(): void { console.log("V8 engine stopped"); }
}

class ElectricEngine implements CarEngine {
    public start(): void { console.log("Electric engine started"); }
    public stop(): void { console.log("Electric engine stopped"); }
}

class AlloyWheels implements Wheels {
    public rotate(): void { console.log("Alloy wheels rotating"); }
}

class GoodCar {
    constructor(
        private readonly engine: CarEngine,
        private readonly wheels: Wheels
    ) {}
    
    public start(): void {
        this.engine.start();
        this.wheels.rotate();
        console.log("Car is ready to drive");
    }
}

// Demo all examples
console.log("--- DEMO RESULTS ---");

// Encapsulation demo
const badAccount = new BadBankAccount();
badAccount.balance = 1000; // direct access - bad
badAccount.withdraw(500);
console.log("Bad account balance:", badAccount.balance);

const goodAccount = new GoodBankAccount("12345", 1000);
console.log("Good account balance:", goodAccount.getBalance());
goodAccount.withdraw(500);
console.log("After withdrawal:", goodAccount.getBalance());

// Inheritance demo
const badBird = new BadBird();
badBird.name = "Tweety";
badBird.speak(); // works but inherits unnecessary methods

const goodBird = new GoodBird("Tweety");
goodBird.speak();
goodBird.fly();

// Polymorphism demo
const badAnimals = [new BadBird(), new BadFish()];
badAnimals.forEach(badProcessAnimal);

const goodAnimals = [new GoodBird("Robin"), new GoodFish("Nemo")];
goodAnimals.forEach(goodProcessAnimal);

// Abstraction demo
const badDb = new BadDatabase();
badDb.connect();
badDb.query("SELECT * FROM users");

const goodDb: Database = new MySQLDatabase();
goodDb.connect();
goodDb.query("SELECT * FROM users");

// Composition demo
const badCar = new BadCar();
badCar.start();

const goodCar = new GoodCar(new V8Engine(), new AlloyWheels());
goodCar.start();


