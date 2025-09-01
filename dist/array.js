"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
console.log(types_1.numbers);
console.log(types_1.fruits);
console.log(types_1.numbers[0]);
console.log(types_1.fruits[1]);
types_1.numbers[2] = 10;
console.log(types_1.numbers);
types_1.numbers.push(6);
console.log(types_1.numbers);
types_1.fruits.unshift("Mango");
console.log(types_1.fruits);
types_1.numbers.pop();
console.log(types_1.numbers);
types_1.fruits.shift();
console.log(types_1.fruits);
for (let i = 0; i < types_1.fruits.length; i++) {
    console.log(types_1.fruits[i]);
}
types_1.fruits.forEach((fruit) => console.log(fruit));
for (let fruit of types_1.fruits) {
    console.log(fruit);
}
let doubledNumbers = types_1.numbers.map((n) => n * 2);
console.log(doubledNumbers);
let evenNumbers = types_1.numbers.filter((n) => n % 2 === 0);
console.log(evenNumbers);
let sum = types_1.numbers.reduce((acc, n) => acc + n, 0);
console.log(sum);
let user = ["John", 30];
console.log(user[0]);
console.log(user[1]);
