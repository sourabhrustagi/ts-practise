// ========================================
// 5. MODULES - TypeScript Module Features
// ========================================

// Named Exports
export const PI = 3.14159;
export const E = 2.71828;

export function add(a: number, b: number): number {
    return a + b;
}

export function subtract(a: number, b: number): number {
    return a - b;
}

export function multiply(a: number, b: number): number {
    return a * b;
}

export function divide(a: number, b: number): number {
    if (b === 0) {
        throw new Error("Division by zero");
    }
    return a / b;
}

// Type Exports
export interface Point {
    x: number;
    y: number;
}

export interface Circle {
    center: Point;
    radius: number;
}

export interface Rectangle {
    topLeft: Point;
    width: number;
    height: number;
}

export type Shape = Circle | Rectangle;

// Class Exports
export class Calculator {
    private history: string[] = [];

    public add(a: number, b: number): number {
        const result = a + b;
        this.history.push(`${a} + ${b} = ${result}`);
        return result;
    }

    public subtract(a: number, b: number): number {
        const result = a - b;
        this.history.push(`${a} - ${b} = ${result}`);
        return result;
    }

    public multiply(a: number, b: number): number {
        const result = a * b;
        this.history.push(`${a} * ${b} = ${result}`);
        return result;
    }

    public divide(a: number, b: number): number {
        if (b === 0) {
            throw new Error("Division by zero");
        }
        const result = a / b;
        this.history.push(`${a} / ${b} = ${result}`);
        return result;
    }

    public getHistory(): string[] {
        return [...this.history];
    }

    public clearHistory(): void {
        this.history = [];
    }
}

// Enum Exports
export enum MathOperation {
    ADD = "add",
    SUBTRACT = "subtract",
    MULTIPLY = "multiply",
    DIVIDE = "divide"
}

export enum ShapeType {
    CIRCLE = "circle",
    RECTANGLE = "rectangle"
}

// Default Export
export default class MathUtils {
    static calculateArea(shape: Shape): number {
        if ('radius' in shape) {
            return Math.PI * shape.radius ** 2;
        } else {
            return shape.width * shape.height;
        }
    }

    static calculatePerimeter(shape: Shape): number {
        if ('radius' in shape) {
            return 2 * Math.PI * shape.radius;
        } else {
            return 2 * (shape.width + shape.height);
        }
    }

    static isPointInShape(point: Point, shape: Shape): boolean {
        if ('radius' in shape) {
            const distance = Math.sqrt(
                (point.x - shape.center.x) ** 2 + (point.y - shape.center.y) ** 2
            );
            return distance <= shape.radius;
        } else {
            return (
                point.x >= shape.topLeft.x &&
                point.x <= shape.topLeft.x + shape.width &&
                point.y >= shape.topLeft.y &&
                point.y <= shape.topLeft.y + shape.height
            );
        }
    }
}

// Re-exporting
export { MathUtils as GeometryUtils } from './math-utils';

// Namespace (Alternative to modules)
export namespace Geometry {
    export interface Point {
        x: number;
        y: number;
    }

    export interface Circle {
        center: Point;
        radius: number;
    }

    export function distance(p1: Point, p2: Point): number {
        return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
    }

    export function area(shape: Circle): number {
        return Math.PI * shape.radius ** 2;
    }
}

// Module Augmentation
declare module './math-utils' {
    interface MathUtils {
        factorial(n: number): number;
    }
}

// Utility Functions
export function formatNumber(num: number, decimals: number = 2): string {
    return num.toFixed(decimals);
}

export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

export function random(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

export function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Async Functions
export async function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function fetchData(url: string): Promise<any> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

// Generic Functions
export function identity<T>(arg: T): T {
    return arg;
}

export function first<T>(arr: T[]): T | undefined {
    return arr[0];
}

export function last<T>(arr: T[]): T | undefined {
    return arr[arr.length - 1];
}

export function reverse<T>(arr: T[]): T[] {
    return [...arr].reverse();
}

// Higher-Order Functions
export function map<T, U>(arr: T[], fn: (item: T, index: number) => U): U[] {
    return arr.map(fn);
}

export function filter<T>(arr: T[], fn: (item: T, index: number) => boolean): T[] {
    return arr.filter(fn);
}

export function reduce<T, U>(arr: T[], fn: (acc: U, item: T, index: number) => U, initial: U): U {
    return arr.reduce(fn, initial);
}

// Type Guards
export function isNumber(value: unknown): value is number {
    return typeof value === 'number';
}

export function isString(value: unknown): value is string {
    return typeof value === 'string';
}

export function isArray(value: unknown): value is any[] {
    return Array.isArray(value);
}

export function isObject(value: unknown): value is object {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

// Constants
export const MATH_CONSTANTS = {
    PI: Math.PI,
    E: Math.E,
    SQRT2: Math.SQRT2,
    SQRT1_2: Math.SQRT1_2,
    LN2: Math.LN2,
    LN10: Math.LN10,
    LOG2E: Math.LOG2E,
    LOG10E: Math.LOG10E
} as const;

export const SHAPE_TYPES = {
    CIRCLE: 'circle',
    RECTANGLE: 'rectangle',
    TRIANGLE: 'triangle',
    SQUARE: 'square'
} as const;

// Type Aliases
export type MathFunction = (a: number, b: number) => number;
export type ShapeCalculator = (shape: Shape) => number;
export type PointCalculator = (p1: Point, p2: Point) => number;

// Interface Extensions
export interface ExtendedPoint extends Point {
    z?: number;
    label?: string;
}

export interface ExtendedCircle extends Circle {
    color?: string;
    borderWidth?: number;
}

// Union Types
export type NumberOrString = number | string;
export type ShapeOrPoint = Shape | Point;
export type MathResult = number | string | boolean;

// Intersection Types
export type PointWithLabel = Point & { label: string };
export type CircleWithColor = Circle & { color: string };

// Conditional Types
export type ArrayElement<T> = T extends (infer U)[] ? U : never;
export type NonNullable<T> = T extends null | undefined ? never : T;

// Mapped Types
export type Optional<T> = {
    [K in keyof T]?: T[K];
};

export type Required<T> = {
    [K in keyof T]-?: T[K];
};

export type Readonly<T> = {
    readonly [K in keyof T]: T[K];
};

// Template Literal Types
export type EventName = 'click' | 'hover' | 'focus';
export type EventHandler = `on${Capitalize<EventName>}`;

// Branded Types
export type UserId = number & { readonly brand: unique symbol };
export type Email = string & { readonly brand: unique symbol };

export function createUserId(id: number): UserId {
    return id as UserId;
}

export function createEmail(email: string): Email {
    return email as Email;
}

console.log("=== TypeScript Modules Examples ===");
console.log("PI:", PI);
console.log("E:", E);
console.log("Add function:", add(5, 3));
console.log("Subtract function:", subtract(10, 4));
console.log("Multiply function:", multiply(6, 7));
console.log("Divide function:", divide(20, 5));

const calculator = new Calculator();
console.log("Calculator add:", calculator.add(10, 5));
console.log("Calculator history:", calculator.getHistory());

const point: Point = { x: 10, y: 20 };
const circle: Circle = { center: point, radius: 5 };
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


