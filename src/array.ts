import {fruits, numbers} from "./types";

console.log(numbers);

console.log(fruits);

console.log(numbers[0]);
console.log(fruits[1]);

numbers[2] = 10;
console.log(numbers);

numbers.push(6);
console.log(numbers);

fruits.unshift("Mango");
console.log(fruits);

numbers.pop();
console.log(numbers);

fruits.shift();
console.log(fruits);

for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}

fruits.forEach((fruit) => console.log(fruit));

for (let fruit of fruits) {
    console.log(fruit);
}

let doubledNumbers = numbers.map((n) => n * 2);
console.log(doubledNumbers);

let evenNumbers = numbers.filter((n) => n % 2 === 0);
console.log(evenNumbers);
let sum = numbers.reduce((acc, n) => acc + n, 0);
console.log(sum);

let user: [string, number] = ["John", 30];
console.log(user[0]);
console.log(user[1]);