"use strict";
// ========================================
// 5. MODULES - TypeScript Module Features
// ========================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.SHAPE_TYPES = exports.MATH_CONSTANTS = exports.Geometry = exports.GeometryUtils = exports.ShapeType = exports.MathOperation = exports.Calculator = exports.E = exports.PI = void 0;
exports.add = add;
exports.subtract = subtract;
exports.multiply = multiply;
exports.divide = divide;
exports.formatNumber = formatNumber;
exports.clamp = clamp;
exports.random = random;
exports.randomInt = randomInt;
exports.delay = delay;
exports.fetchData = fetchData;
exports.identity = identity;
exports.first = first;
exports.last = last;
exports.reverse = reverse;
exports.map = map;
exports.filter = filter;
exports.reduce = reduce;
exports.isNumber = isNumber;
exports.isString = isString;
exports.isArray = isArray;
exports.isObject = isObject;
exports.createUserId = createUserId;
exports.createEmail = createEmail;
// Named Exports
exports.PI = 3.14159;
exports.E = 2.71828;
function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    if (b === 0) {
        throw new Error("Division by zero");
    }
    return a / b;
}
// Class Exports
class Calculator {
    constructor() {
        this.history = [];
    }
    add(a, b) {
        const result = a + b;
        this.history.push(`${a} + ${b} = ${result}`);
        return result;
    }
    subtract(a, b) {
        const result = a - b;
        this.history.push(`${a} - ${b} = ${result}`);
        return result;
    }
    multiply(a, b) {
        const result = a * b;
        this.history.push(`${a} * ${b} = ${result}`);
        return result;
    }
    divide(a, b) {
        if (b === 0) {
            throw new Error("Division by zero");
        }
        const result = a / b;
        this.history.push(`${a} / ${b} = ${result}`);
        return result;
    }
    getHistory() {
        return [...this.history];
    }
    clearHistory() {
        this.history = [];
    }
}
exports.Calculator = Calculator;
// Enum Exports
var MathOperation;
(function (MathOperation) {
    MathOperation["ADD"] = "add";
    MathOperation["SUBTRACT"] = "subtract";
    MathOperation["MULTIPLY"] = "multiply";
    MathOperation["DIVIDE"] = "divide";
})(MathOperation || (exports.MathOperation = MathOperation = {}));
var ShapeType;
(function (ShapeType) {
    ShapeType["CIRCLE"] = "circle";
    ShapeType["RECTANGLE"] = "rectangle";
})(ShapeType || (exports.ShapeType = ShapeType = {}));
// Default Export
class MathUtils {
    static calculateArea(shape) {
        if ('radius' in shape) {
            return Math.PI * shape.radius ** 2;
        }
        else {
            return shape.width * shape.height;
        }
    }
    static calculatePerimeter(shape) {
        if ('radius' in shape) {
            return 2 * Math.PI * shape.radius;
        }
        else {
            return 2 * (shape.width + shape.height);
        }
    }
    static isPointInShape(point, shape) {
        if ('radius' in shape) {
            const distance = Math.sqrt((point.x - shape.center.x) ** 2 + (point.y - shape.center.y) ** 2);
            return distance <= shape.radius;
        }
        else {
            return (point.x >= shape.topLeft.x &&
                point.x <= shape.topLeft.x + shape.width &&
                point.y >= shape.topLeft.y &&
                point.y <= shape.topLeft.y + shape.height);
        }
    }
}
exports.default = MathUtils;
// Re-exporting
var math_utils_1 = require("./math-utils");
Object.defineProperty(exports, "GeometryUtils", { enumerable: true, get: function () { return math_utils_1.MathUtils; } });
// Namespace (Alternative to modules)
var Geometry;
(function (Geometry) {
    function distance(p1, p2) {
        return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
    }
    Geometry.distance = distance;
    function area(shape) {
        return Math.PI * shape.radius ** 2;
    }
    Geometry.area = area;
})(Geometry || (exports.Geometry = Geometry = {}));
// Utility Functions
function formatNumber(num, decimals = 2) {
    return num.toFixed(decimals);
}
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}
function random(min, max) {
    return Math.random() * (max - min) + min;
}
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Async Functions
async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }
    catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
// Generic Functions
function identity(arg) {
    return arg;
}
function first(arr) {
    return arr[0];
}
function last(arr) {
    return arr[arr.length - 1];
}
function reverse(arr) {
    return [...arr].reverse();
}
// Higher-Order Functions
function map(arr, fn) {
    return arr.map(fn);
}
function filter(arr, fn) {
    return arr.filter(fn);
}
function reduce(arr, fn, initial) {
    return arr.reduce(fn, initial);
}
// Type Guards
function isNumber(value) {
    return typeof value === 'number';
}
function isString(value) {
    return typeof value === 'string';
}
function isArray(value) {
    return Array.isArray(value);
}
function isObject(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}
// Constants
exports.MATH_CONSTANTS = {
    PI: Math.PI,
    E: Math.E,
    SQRT2: Math.SQRT2,
    SQRT1_2: Math.SQRT1_2,
    LN2: Math.LN2,
    LN10: Math.LN10,
    LOG2E: Math.LOG2E,
    LOG10E: Math.LOG10E
};
exports.SHAPE_TYPES = {
    CIRCLE: 'circle',
    RECTANGLE: 'rectangle',
    TRIANGLE: 'triangle',
    SQUARE: 'square'
};
function createUserId(id) {
    return id;
}
function createEmail(email) {
    return email;
}
console.log("=== TypeScript Modules Examples ===");
console.log("PI:", exports.PI);
console.log("E:", exports.E);
console.log("Add function:", add(5, 3));
console.log("Subtract function:", subtract(10, 4));
console.log("Multiply function:", multiply(6, 7));
console.log("Divide function:", divide(20, 5));
const calculator = new Calculator();
console.log("Calculator add:", calculator.add(10, 5));
console.log("Calculator history:", calculator.getHistory());
const point = { x: 10, y: 20 };
const circle = { center: point, radius: 5 };
console.log("Point:", point);
console.log("Circle:", circle);
const mathUtils = new MathUtils();
console.log("Circle area:", MathUtils.calculateArea(circle));
console.log("Circle perimeter:", MathUtils.calculatePerimeter(circle));
console.log("Geometry distance:", Geometry.distance(point, { x: 15, y: 25 }));
console.log("Geometry area:", Geometry.area(circle));
console.log("Format number:", formatNumber(3.14159, 3));
console.log("Clamp value:", clamp(15, 0, 10));
console.log("Random number:", random(1, 100));
console.log("Random integer:", randomInt(1, 10));
console.log("Is number:", isNumber(42));
console.log("Is string:", isString("hello"));
console.log("Is array:", isArray([1, 2, 3]));
console.log("Is object:", isObject({ key: "value" }));
const numbers = [1, 2, 3, 4, 5];
console.log("Map result:", map(numbers, x => x * 2));
console.log("Filter result:", filter(numbers, x => x > 2));
console.log("Reduce result:", reduce(numbers, (acc, x) => acc + x, 0));
