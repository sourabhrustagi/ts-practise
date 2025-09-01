"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fruits = exports.numbers = void 0;
let username = "Alice";
console.log(username);
let age = 24;
console.log(age);
const isActive = true;
console.log(isActive);
let largeNum = 9007199254740991n;
console.log(largeNum);
let uniqueId = Symbol("id");
console.log(uniqueId);
let nothing = null;
console.log(nothing);
let noAssigned = undefined;
console.log(noAssigned);
let user = {
    name: "John",
    age: 30
};
console.log(user);
exports.numbers = [1, 2, 3, 4];
console.log(exports.numbers);
exports.fruits = ["Apple", "Banana", "Mango"];
console.log(exports.fruits);
let person = ["Alice", 25];
console.log(person);
var Direction;
(function (Direction) {
    Direction[Direction["North"] = 0] = "North";
    Direction[Direction["South"] = 1] = "South";
    Direction[Direction["East"] = 2] = "East";
    Direction[Direction["West"] = 3] = "West";
})(Direction || (Direction = {}));
let dir = Direction.North;
console.log(dir);
let id = 101;
id = "A102";
console.log(id);
const john = {
    name: "John",
    city: "New York"
};
console.log(john);
let currentStatus = "success";
console.log(currentStatus);
function add(a, b) {
    return a + b;
}
console.log(add(1, 2));
const greet = (name) => `Hello, ${name}`;
console.log(greet("Alice"));
let anything = 5;
anything = "Hello";
let unknownValue = 10;
console.log(unknownValue);
function throwError(message) {
    throw new Error(message);
}
// console.log(throwError("sd"));
function logMessage(msg) {
    console.log(msg);
}
logMessage("asd");
function identity(arg) {
    return arg;
}
let output = identity("Jello");
console.log(output);
let numOutput = identity(123);
console.log(numOutput);
class Box {
    constructor(content) {
        this.content = content;
    }
}
const stringBox = new Box("Content");
console.log(stringBox);
const p = { x: 10, y: 20 };
console.log(p);
const user2 = { name: "Alice", age: 30 };
console.log(user2);
const task = {
    title: "Learn TS",
    description: "Practise Typescript daily",
    completed: false
};
console.log(task);
const updateTask = {
    completed: true
};
console.log(updateTask);
const rolePermissions = {
    admin: true,
    user: false,
    guest: false
};
