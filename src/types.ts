let username: string = "Alice";
console.log(username);
let age: number = 24;
console.log(age);
const isActive: Boolean = true;
console.log(isActive);
let largeNum: bigint = 9007199254740991n;
console.log(largeNum);
let uniqueId: symbol = Symbol("id");
console.log(uniqueId);
let nothing: null = null;
console.log(nothing);
let noAssigned: undefined = undefined;
console.log(noAssigned);
let user: { name: string; age: number } = {
    name: "John",
    age: 30
};
console.log(user);
export let numbers: number[] = [1, 2, 3, 4];
console.log(numbers);
export let fruits: Array<String> = ["Apple", "Banana", "Mango"];
console.log(fruits);
let person: [string, number] = ["Alice", 25];
console.log(person);

enum Direction {
    North,
    South,
    East,
    West
}

let dir: Direction = Direction.North;
console.log(dir);
let id: number | string = 101;
id = "A102";
console.log(id);
type Address = { city: string };
type Person = { name: string } & Address;
const john: Person = {
    name: "John",
    city: "New York"
}
console.log(john);
type Status = "success" | "error" | "loading";
let currentStatus: Status = "success";
console.log(currentStatus);

function add(a: number, b: number): number {
    return a + b;
}

console.log(add(1, 2));
type Greet = (name: string) => string;
const greet: Greet = (name) => `Hello, ${name}`;
console.log(greet("Alice"));

let anything: any = 5;
anything = "Hello";

let unknownValue: unknown = 10;
console.log(unknownValue);

function throwError(message: string): never {
    throw new Error(message);
}

// console.log(throwError("sd"));

function logMessage(msg: string): void {
    console.log(msg);
}

logMessage("asd");

function identity<T>(arg: T): T {
    return arg;
}

let output = identity<string>("Jello");
console.log(output);
let numOutput = identity<number>(123);
console.log(numOutput);

class Box<T> {
    content: T;

    constructor(content: T) {
        this.content = content;
    }
}

const stringBox = new Box<string>("Content");
console.log(stringBox);

type Point = {
    x: number;
    y: number;
};

interface User {
    name: string;
    age: number;
}

const p: Point = {x: 10, y: 20};
console.log(p);
const user2: User = {name: "Alice", age: 30};
console.log(user2);

interface Todo {
    title: string;
    description: string;
    completed: boolean;
}

const task: Readonly<Todo> = {
    title: "Learn TS",
    description: "Practise Typescript daily",
    completed: false
};

console.log(task);

const updateTask: Partial<Todo> = {
    completed: true
};

console.log(updateTask);

type TaskTitle = Pick<Todo, "title">;
type TaskWithoutDesc = Omit<Todo, "description">;

type Roles = "admin" | "user" | "guest";
type Permissions2 = Record<Roles, boolean>;

const rolePermissions: Permissions2 = {
    admin: true,
    user: false,
    guest: false
};

type T0 = Exclude<"a" | "b" | "c", "a">;
type T1 = Exclude<"a" | "b" | "c", "a" | "f">;
type T2 = NonNullable<string | number | undefined>;