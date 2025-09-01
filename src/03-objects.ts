// ========================================
// 3. OBJECT TYPES - TypeScript Object Features
// ========================================

// Basic Object Types
let personObject: { name: string; age: number; email?: string } = {
    name: "John Doe",
    age: 30,
    email: "john@example.com"
};

// Interfaces
interface User {
    id: number;
    name: string;
    email: string;
    isActive?: boolean;
    readonly createdAt: Date;
}

let userObject: User = {
    id: 1,
    name: "Jane Smith",
    email: "jane@example.com",
    isActive: true,
    createdAt: new Date()
};

// Interface Extensions
interface Employee extends User {
    department: string;
    salary: number;
    manager?: Employee;
}

let employee: Employee = {
    id: 2,
    name: "Bob Johnson",
    email: "bob@example.com",
    isActive: true,
    createdAt: new Date(),
    department: "Engineering",
    salary: 75000
};

// Multiple Interface Extensions
interface Address {
    street: string;
    city: string;
    country: string;
    zipCode: string;
}

interface ContactInfo {
    phone: string;
    website?: string;
}

interface FullProfile extends User, Address, ContactInfo {
    bio?: string;
}

let fullProfile: FullProfile = {
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

// Interface with Index Signatures
interface StringDictionary {
    [key: string]: string;
}

let colorDict: StringDictionary = {
    primary: "blue",
    secondary: "green",
    accent: "orange"
};

// Interface with Call Signatures
interface SearchFunction {
    (source: string, subString: string): boolean;
    (source: string, subString: string, startIndex: number): boolean;
}

let search: SearchFunction = (source: string, subString: string, startIndex?: number): boolean => {
    if (startIndex !== undefined) {
        return source.indexOf(subString, startIndex) !== -1;
    }
    return source.indexOf(subString) !== -1;
};

// Interface with Construct Signatures
interface ClockConstructor {
    new (hour: number, minute: number): ClockInterface;
}

interface ClockInterface {
    tick(): void;
    getTime(): string;
}

class DigitalClock implements ClockInterface {
    constructor(h: number, m: number) {}
    tick() {
        console.log("beep beep");
    }
    getTime() {
        return new Date().toLocaleTimeString();
    }
}

// Classes
class Animal {
    protected name: string;
    private age: number;
    readonly species: string;

    constructor(name: string, age: number, species: string) {
        this.name = name;
        this.age = age;
        this.species = species;
    }

    public makeSound(): void {
        console.log("Some animal sound");
    }

    protected getAge(): number {
        return this.age;
    }

    public getInfo(): string {
        return `${this.name} is a ${this.age}-year-old ${this.species}`;
    }
}

class Dog extends Animal {
    private breed: string;

    constructor(name: string, age: number, breed: string) {
        super(name, age, "Canis familiaris");
        this.breed = breed;
    }

    public makeSound(): void {
        console.log("Woof! Woof!");
    }

    public getBreed(): string {
        return this.breed;
    }

    public getFullInfo(): string {
        return `${this.getInfo()} of breed ${this.breed}`;
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

    abstract startEngine(): void;
    abstract stopEngine(): void;

    public getInfo(): string {
        return `${this.year} ${this.brand} ${this.model}`;
    }
}

class Car extends Vehicle {
    private fuelType: string;

    constructor(brand: string, model: string, year: number, fuelType: string) {
        super(brand, model, year);
        this.fuelType = fuelType;
    }

    public startEngine(): void {
        console.log("Car engine started");
    }

    public stopEngine(): void {
        console.log("Car engine stopped");
    }

    public getFuelType(): string {
        return this.fuelType;
    }
}

// Interface with Generic Types
interface Container<T> {
    value: T;
    getValue(): T;
    setValue(value: T): void;
}

class NumberContainer implements Container<number> {
    constructor(public value: number) {}

    getValue(): number {
        return this.value;
    }

    setValue(value: number): void {
        this.value = value;
    }
}

// Interface with Conditional Types
interface ConditionalUser<T extends "admin" | "user"> {
    id: number;
    name: string;
    role: T;
    permissions: T extends "admin" ? string[] : never;
}

let adminUser: ConditionalUser<"admin"> = {
    id: 1,
    name: "Admin User",
    role: "admin",
    permissions: ["read", "write", "delete"]
};

let regularUser: ConditionalUser<"user"> = {
    id: 2,
    name: "Regular User",
    role: "user"
} as ConditionalUser<"user">;

// Interface with Mapped Types
interface UserProfile {
    id: number;
    name: string;
    email: string;
    age: number;
}

type OptionalUserProfile = {
    [K in keyof UserProfile]?: UserProfile[K];
};

type ReadonlyUserProfile = {
    readonly [K in keyof UserProfile]: UserProfile[K];
};

type PartialUserProfile = Partial<UserProfile>;
type RequiredUserProfile = Required<UserProfile>;

// Interface with Template Literal Types
interface ApiResponse<T> {
    data: T;
    status: "success" | "error";
    message: string;
    timestamp: string;
}

type UserApiResponse = ApiResponse<UserProfile>;
type ErrorApiResponse = ApiResponse<{ error: string }>;

// Interface with Branded Types
interface ValidatedEmail {
    readonly email: string;
    readonly isValid: true;
}

interface ValidatedPhone {
    readonly phone: string;
    readonly isValid: true;
}

function validateEmail(email: string): ValidatedEmail | null {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? { email, isValid: true } : null;
}

function validatePhone(phone: string): ValidatedPhone | null {
    const phoneRegex = /^\+?[\d\s-()]{10,}$/;
    return phoneRegex.test(phone) ? { phone, isValid: true } : null;
}

// Interface with Intersection Types
interface HasId {
    id: number;
}

interface HasName {
    name: string;
}

interface HasEmail {
    email: string;
}

type CompleteUser = HasId & HasName & HasEmail;

let completeUser: CompleteUser = {
    id: 1,
    name: "John Doe",
    email: "john@example.com"
};

// Interface with Union Types
interface CircleShape {
    kind: "circle";
    radius: number;
}

interface RectangleShape {
    kind: "rectangle";
    width: number;
    height: number;
}

interface TriangleShape {
    kind: "triangle";
    base: number;
    height: number;
}

type GeometricShape = CircleShape | RectangleShape | TriangleShape;

function calculateArea(shape: GeometricShape): number {
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

// Interface with Indexed Access Types
interface Database {
    users: User[];
    posts: Post[];
    comments: Comment[];
}

interface Post {
    id: number;
    title: string;
    content: string;
    authorId: number;
}

interface Comment {
    id: number;
    content: string;
    postId: number;
    authorId: number;
}

type DatabaseEntity = Database[keyof Database][number];
type UserEntity = Database["users"][number];

// Interface with Utility Types
interface Config {
    apiUrl: string;
    timeout: number;
    retries: number;
    debug: boolean;
}

type PartialConfig = Partial<Config>;
type RequiredConfig = Required<Config>;
type ReadonlyConfig = Readonly<Config>;
type ConfigKeys = keyof Config;
type ConfigValues = Config[ConfigKeys];

// Interface with Conditional Types and Inference
type EventMap = {
    click: MouseEvent;
    keydown: KeyboardEvent;
    submit: SubmitEvent;
};

type EventHandlerType<T extends keyof EventMap> = (event: EventMap[T]) => void;

interface EventEmitter {
    on<T extends keyof EventMap>(event: T, handler: EventHandlerType<T>): void;
    emit<T extends keyof EventMap>(event: T, data: EventMap[T]): void;
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

const circle: CircleShape = { kind: "circle", radius: 5 };
const rectangle: RectangleShape = { kind: "rectangle", width: 4, height: 6 };
console.log("Circle area:", calculateArea(circle));
console.log("Rectangle area:", calculateArea(rectangle));
