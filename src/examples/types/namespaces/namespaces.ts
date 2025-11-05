/**
 * Namespaces - Comprehensive examples
 * 
 * Namespaces (previously called "internal modules") provide a way to organize
 * code and avoid naming collisions. They are particularly useful for organizing
 * code that doesn't need to be modularized using ES6 modules.
 * 
 * Note: In modern TypeScript, ES Modules are preferred over namespaces for
 * new code. However, namespaces are still useful for organizing code and
 * working with legacy JavaScript libraries.
 * 
 * Based on TypeScript Handbook: Namespaces
 */

// ============================================================================
// BASIC NAMESPACE - First Steps
// ============================================================================

// Validators in a single file (without namespace)
interface StringValidator {
  isAcceptable(s: string): boolean;
}

let lettersRegexp = /^[A-Za-z]+$/;
let numberRegexp = /^[0-9]+$/;

class LettersOnlyValidator implements StringValidator {
  isAcceptable(s: string) {
    return lettersRegexp.test(s);
  }
}

class ZipCodeValidator implements StringValidator {
  isAcceptable(s: string) {
    return s.length === 5 && numberRegexp.test(s);
  }
}

// ============================================================================
// NAMESPACING - Organizing Validators
// ============================================================================

// Wrapping validators in a namespace
namespace Validation {
  export interface StringValidator {
    isAcceptable(s: string): boolean;
  }

  // Private implementation details - not exported
  const lettersRegexp = /^[A-Za-z]+$/;
  const numberRegexp = /^[0-9]+$/;

  // Exported classes - visible outside namespace
  export class LettersOnlyValidator implements StringValidator {
    isAcceptable(s: string) {
      return lettersRegexp.test(s);
    }
  }

  export class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
      return s.length === 5 && numberRegexp.test(s);
    }
  }

  // Additional validators
  export class EmailValidator implements StringValidator {
    private emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    isAcceptable(s: string) {
      return this.emailRegexp.test(s);
    }
  }

  export class PhoneValidator implements StringValidator {
    private phoneRegexp = /^\(\d{3}\)\s\d{3}-\d{4}$/;

    isAcceptable(s: string) {
      return this.phoneRegexp.test(s);
    }
  }
}

// Usage outside namespace - need to qualify with namespace name
let strings = ["Hello", "98052", "101", "user@example.com", "(555) 123-4567"];
let validators: { [s: string]: Validation.StringValidator } = {};

validators["ZIP code"] = new Validation.ZipCodeValidator();
validators["Letters only"] = new Validation.LettersOnlyValidator();
validators["Email"] = new Validation.EmailValidator();
validators["Phone"] = new Validation.PhoneValidator();

// Test each string against each validator
for (let s of strings) {
  for (let name in validators) {
    let isMatch = validators[name].isAcceptable(s);
    console.log(`'${s}' ${isMatch ? "matches" : "does not match"} '${name}'.`);
  }
}

// ============================================================================
// NESTED NAMESPACES
// ============================================================================

namespace Geometry {
  export namespace Shapes {
    export class Point {
      constructor(public x: number, public y: number) {}
    }

    export class Circle {
      constructor(public center: Point, public radius: number) {}

      area(): number {
        return Math.PI * this.radius * this.radius;
      }
    }

    export class Rectangle {
      constructor(
        public topLeft: Point,
        public bottomRight: Point
      ) {}

      area(): number {
        const width = this.bottomRight.x - this.topLeft.x;
        const height = this.topLeft.y - this.bottomRight.y;
        return Math.abs(width * height);
      }
    }
  }

  export namespace Utils {
    export function distance(p1: Geometry.Shapes.Point, p2: Geometry.Shapes.Point): number {
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      return Math.sqrt(dx * dx + dy * dy);
    }
  }
}

// Usage of nested namespaces
const point1 = new Geometry.Shapes.Point(0, 0);
const point2 = new Geometry.Shapes.Point(3, 4);
const circle = new Geometry.Shapes.Circle(point1, 5);
const rectangle = new Geometry.Shapes.Rectangle(point1, point2);

console.log(circle.area()); // ~78.54
console.log(rectangle.area()); // 12
console.log(Geometry.Utils.distance(point1, point2)); // 5

// ============================================================================
// NAMESPACE ALIASES
// ============================================================================

// Using import alias to create shorter names
import Shapes = Geometry.Shapes;
import Utils = Geometry.Utils;

// Now we can use shorter names
const point3 = new Shapes.Point(1, 1);
const circle2 = new Shapes.Circle(point3, 10);
const dist = Utils.distance(point1, point3);

// More complex alias example
namespace MyCompany {
  export namespace Products {
    export namespace Electronics {
      export namespace Phones {
        export class SmartPhone {
          model: string = "Default";
        }
      }
    }
  }
}

// Create alias for deeply nested namespace
import SmartPhone = MyCompany.Products.Electronics.Phones.SmartPhone;

const phone = new SmartPhone();
// Much easier than: new MyCompany.Products.Electronics.Phones.SmartPhone()

// ============================================================================
// NAMESPACE WITH FUNCTIONS AND CONSTANTS
// ============================================================================

namespace MathUtils {
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
    if (b === 0) throw new Error("Division by zero");
    return a / b;
  }

  // Private helper function - not exported
  function validateNumber(n: number): boolean {
    return !isNaN(n) && isFinite(n);
  }

  // Exported utility that uses private function
  export function safeDivide(a: number, b: number): number {
    if (!validateNumber(a) || !validateNumber(b)) {
      throw new Error("Invalid number");
    }
    return divide(a, b);
  }
}

// Usage
console.log(MathUtils.PI);
console.log(MathUtils.add(5, 3)); // 8
console.log(MathUtils.multiply(4, 7)); // 28

// ============================================================================
// NAMESPACE WITH ENUMS AND TYPES
// ============================================================================

namespace Colors {
  export enum RGB {
    Red = "red",
    Green = "green",
    Blue = "blue",
  }

  export type ColorValue = string | RGB;

  export interface ColorPalette {
    primary: ColorValue;
    secondary: ColorValue;
    accent: ColorValue;
  }

  export function createPalette(
    primary: ColorValue,
    secondary: ColorValue,
    accent: ColorValue
  ): ColorPalette {
    return { primary, secondary, accent };
  }
}

// Usage
const palette = Colors.createPalette(
  Colors.RGB.Red,
  Colors.RGB.Green,
  "#FF0000"
);

// ============================================================================
// NAMESPACE MERGING (Multiple Declarations)
// ============================================================================

namespace Config {
  export interface AppConfig {
    apiUrl: string;
    timeout: number;
  }
}

namespace Config {
  export interface DatabaseConfig {
    host: string;
    port: number;
  }

  export function getAppConfig(): AppConfig {
    return {
      apiUrl: "https://api.example.com",
      timeout: 5000,
    };
  }
}

// Both interfaces are available in the merged namespace
const appConfig: Config.AppConfig = Config.getAppConfig();
const dbConfig: Config.DatabaseConfig = {
  host: "localhost",
  port: 5432,
};

// ============================================================================
// NAMESPACE WITH INTERFACES AND CLASSES
// ============================================================================

namespace DataAccess {
  export interface IDatabase {
    connect(): void;
    disconnect(): void;
    query(sql: string): any;
  }

  export class Database implements IDatabase {
    private connected = false;

    connect(): void {
      this.connected = true;
      console.log("Database connected");
    }

    disconnect(): void {
      this.connected = false;
      console.log("Database disconnected");
    }

    query(sql: string): any {
      if (!this.connected) {
        throw new Error("Database not connected");
      }
      console.log(`Executing: ${sql}`);
      return [];
    }
  }

  export class Repository<T> {
    constructor(private db: IDatabase, private tableName: string) {}

    findAll(): T[] {
      return this.db.query(`SELECT * FROM ${this.tableName}`);
    }

    findById(id: number): T | null {
      const results = this.db.query(`SELECT * FROM ${this.tableName} WHERE id = ${id}`);
      return results.length > 0 ? results[0] : null;
    }
  }
}

// Usage
const db = new DataAccess.Database();
db.connect();
const userRepo = new DataAccess.Repository<User>(db, "users");
const users = userRepo.findAll();

interface User {
  id: number;
  name: string;
}

// ============================================================================
// NAMESPACE WITH STATIC MEMBERS
// ============================================================================

namespace Factory {
  export class ProductFactory {
    private static instance: ProductFactory;

    static getInstance(): ProductFactory {
      if (!ProductFactory.instance) {
        ProductFactory.instance = new ProductFactory();
      }
      return ProductFactory.instance;
    }

    createProduct(type: string): Product {
      switch (type) {
        case "book":
          return new Book();
        case "electronic":
          return new Electronic();
        default:
          throw new Error(`Unknown product type: ${type}`);
      }
    }
  }

  export interface Product {
    name: string;
    price: number;
  }

  class Book implements Product {
    name = "Book";
    price = 19.99;
  }

  class Electronic implements Product {
    name = "Electronic";
    price = 99.99;
  }
}

// Usage
const factory = Factory.ProductFactory.getInstance();
const book = factory.createProduct("book");
const electronic = factory.createProduct("electronic");

// ============================================================================
// AMBIENT NAMESPACES - Declaring External Libraries
// ============================================================================

// Ambient namespace declaration for a JavaScript library
// This would typically be in a .d.ts file

declare namespace D3 {
  export interface Selectors {
    select: {
      (selector: string): Selection;
      (element: EventTarget): Selection;
    };
  }

  export interface Event {
    x: number;
    y: number;
  }

  export interface Base extends Selectors {
    event: Event;
  }

  export interface Selection {
    append(type: string): Selection;
    attr(name: string, value: string): Selection;
    style(name: string, value: string): Selection;
  }
}

declare var d3: D3.Base;

// Usage (would work if d3 library is loaded)
// const selection = d3.select("#my-element");
// selection.append("div").attr("class", "container");

// ============================================================================
// AMBIENT NAMESPACE - jQuery Example
// ============================================================================

declare namespace jQuery {
  export interface AjaxSettings {
    url: string;
    method?: string;
    data?: any;
    success?: (data: any) => void;
    error?: (error: any) => void;
  }

  export interface jQuery {
    (selector: string): jQuery;
    ajax(settings: AjaxSettings): void;
    html(): string;
    html(content: string): jQuery;
    on(event: string, handler: (e: Event) => void): jQuery;
  }
}

declare var $: jQuery.jQuery;
declare var jQuery: jQuery.jQuery;

// Usage (would work if jQuery is loaded)
// $("#my-element").html("Hello World");
// $.ajax({
//   url: "/api/data",
//   method: "GET",
//   success: (data) => console.log(data)
// });

// ============================================================================
// PRACTICAL EXAMPLE: API Client Namespace
// ============================================================================

namespace API {
  export interface RequestOptions {
    method?: string;
    headers?: Record<string, string>;
    body?: any;
  }

  export interface Response<T> {
    data: T;
    status: number;
    statusText: string;
  }

  export class Client {
    private baseUrl: string;
    private defaultHeaders: Record<string, string>;

    constructor(baseUrl: string, defaultHeaders?: Record<string, string>) {
      this.baseUrl = baseUrl;
      this.defaultHeaders = defaultHeaders || {};
    }

    async request<T>(
      endpoint: string,
      options?: RequestOptions
    ): Promise<Response<T>> {
      const url = `${this.baseUrl}${endpoint}`;
      const headers = { ...this.defaultHeaders, ...options?.headers };

      // Simulated request
      return {
        data: {} as T,
        status: 200,
        statusText: "OK",
      };
    }

    async get<T>(endpoint: string): Promise<Response<T>> {
      return this.request<T>(endpoint, { method: "GET" });
    }

    async post<T>(endpoint: string, body?: any): Promise<Response<T>> {
      return this.request<T>(endpoint, { method: "POST", body });
    }
  }

  export namespace Endpoints {
    export const USERS = "/users";
    export const POSTS = "/posts";
    export const COMMENTS = "/comments";
  }
}

// Usage
const apiClient = new API.Client("https://api.example.com", {
  "Content-Type": "application/json",
});

interface User {
  id: number;
  name: string;
}

const response = await apiClient.get<User>(API.Endpoints.USERS);

// ============================================================================
// PRACTICAL EXAMPLE: Utility Functions Namespace
// ============================================================================

namespace Utils {
  export namespace String {
    export function capitalize(str: string): string {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    export function truncate(str: string, length: number): string {
      if (str.length <= length) return str;
      return str.slice(0, length) + "...";
    }

    export function reverse(str: string): string {
      return str.split("").reverse().join("");
    }
  }

  export namespace Array {
    export function unique<T>(arr: T[]): T[] {
      return Array.from(new Set(arr));
    }

    export function chunk<T>(arr: T[], size: number): T[][] {
      const chunks: T[][] = [];
      for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size));
      }
      return chunks;
    }

    export function shuffle<T>(arr: T[]): T[] {
      const shuffled = [...arr];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    }
  }

  export namespace Date {
    export function format(date: Date, format: string): string {
      // Simplified implementation
      return date.toISOString();
    }

    export function addDays(date: Date, days: number): Date {
      const result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    }

    export function isToday(date: Date): boolean {
      const today = new Date();
      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    }
  }
}

// Usage
const capitalized = Utils.String.capitalize("hello world"); // "Hello world"
const truncated = Utils.String.truncate("This is a long string", 10); // "This is a ..."

const uniqueNumbers = Utils.Array.unique([1, 2, 2, 3, 3, 4]); // [1, 2, 3, 4]
const chunks = Utils.Array.chunk([1, 2, 3, 4, 5, 6], 2); // [[1, 2], [3, 4], [5, 6]]

const tomorrow = Utils.Date.addDays(new Date(), 1);
const isToday = Utils.Date.isToday(new Date());

// ============================================================================
// BEST PRACTICES
// ============================================================================

/*
1. Use namespaces to organize code and avoid naming collisions
2. Export only what needs to be used outside the namespace
3. Keep implementation details private (don't export them)
4. Use nested namespaces for deeper organization
5. Use aliases (import q = x.y.z) to simplify long namespace paths
6. For modern code, prefer ES Modules over namespaces
7. Use ambient namespaces to declare types for JavaScript libraries
8. Consider splitting large namespaces across multiple files
9. Use namespace merging when extending functionality across files
10. Document your namespaces and exported members clearly
*/

export {};

