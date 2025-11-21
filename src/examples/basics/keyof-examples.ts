/**
 * Keyof Type Operator Examples
 * Demonstrates the keyof type operator and its various use cases
 * Based on TypeScript Handbook: The keyof type operator
 */

console.log("-- Keyof Type Operator Examples --\n");

// ============================================================================
// 1. BASIC KEYOF USAGE
// ============================================================================
console.log("--- 1) BASIC KEYOF USAGE ---");

// Basic object type
type PointType = { x: number; y: number };

// keyof produces a union of the object's keys
type PointKey = keyof PointType;
// type PointKey = "x" | "y"

// Example usage
const pointExample: PointType = { x: 10, y: 20 };

function getPointValue(pt: PointType, key: PointKey): number {
  return pt[key];
}

console.log("Point x:", getPointValue(pointExample, "x")); // 10
console.log("Point y:", getPointValue(pointExample, "y")); // 20
// getPointValue(pointExample, "z"); // Error: Argument of type '"z"' is not assignable to parameter of type '"x" | "y"'

// ============================================================================
// 2. KEYOF WITH INTERFACES
// ============================================================================
console.log("\n--- 2) KEYOF WITH INTERFACES ---");

interface UserExample {
  id: number;
  name: string;
  email: string;
  age: number;
}

type UserKeys = keyof UserExample;
// type UserKeys = "id" | "name" | "email" | "age"

function getUserProperty(user: UserExample, key: UserKeys): string | number {
  return user[key];
}

const userExample: UserExample = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  age: 30,
};

console.log("User name:", getUserProperty(userExample, "name")); // "Alice"
console.log("User age:", getUserProperty(userExample, "age")); // 30

// ============================================================================
// 3. KEYOF WITH NUMBER INDEX SIGNATURE
// ============================================================================
console.log("\n--- 3) KEYOF WITH NUMBER INDEX SIGNATURE ---");

type Arrayish = { [n: number]: unknown };
type ArrayishKey = keyof Arrayish;
// type ArrayishKey = number

// When you have a number index signature, keyof returns 'number'
const arrayish: Arrayish = {
  0: "first",
  1: "second",
  2: "third",
};

function getArrayishValue(arr: Arrayish, index: ArrayishKey): unknown {
  return arr[index];
}

console.log("Arrayish[0]:", getArrayishValue(arrayish, 0)); // "first"
console.log("Arrayish[1]:", getArrayishValue(arrayish, 1)); // "second"
console.log("Arrayish[2]:", getArrayishValue(arrayish, 2)); // "third"

// ============================================================================
// 4. KEYOF WITH STRING INDEX SIGNATURE
// ============================================================================
console.log("\n--- 4) KEYOF WITH STRING INDEX SIGNATURE ---");

type Mapish = { [k: string]: boolean };
type M = keyof Mapish;
// type M = string | number

// Note: With string index signature, keyof returns string | number
// This is because JavaScript object keys are always coerced to strings
// So obj[0] is the same as obj["0"]

const mapish: Mapish = {
  "key1": true,
  "key2": false,
  "0": true, // numeric string key
  1: false, // numeric key (coerced to string "1")
};

function getMapishValue(map: Mapish, key: M): boolean {
  return map[key];
}

console.log("Mapish['key1']:", getMapishValue(mapish, "key1")); // true
console.log("Mapish['0']:", getMapishValue(mapish, "0")); // true
console.log("Mapish[1]:", getMapishValue(mapish, 1)); // false (1 is coerced to "1")
console.log("Mapish['1']:", getMapishValue(mapish, "1")); // false (same as above)

// ============================================================================
// 5. KEYOF WITH MIXED PROPERTIES AND INDEX SIGNATURES
// ============================================================================
console.log("\n--- 5) KEYOF WITH MIXED PROPERTIES AND INDEX SIGNATURES ---");

interface MixedType {
  name: string; // specific property
  age: number; // specific property
  [key: string]: string | number; // string index signature
}

type MixedKeys = keyof MixedType;
// type MixedKeys = string | number
// When there's a string index signature, keyof returns string | number
// The specific properties (name, age) are included in the string index

const mixed: MixedType = {
  name: "Bob",
  age: 25,
  city: "New York",
  zip: 10001,
};

function getMixedValue(obj: MixedType, key: MixedKeys): string | number {
  return obj[key];
}

console.log("Mixed name:", getMixedValue(mixed, "name")); // "Bob"
console.log("Mixed age:", getMixedValue(mixed, "age")); // 25
console.log("Mixed city:", getMixedValue(mixed, "city")); // "New York"
console.log("Mixed zip:", getMixedValue(mixed, "zip")); // 10001

// ============================================================================
// 6. KEYOF WITH READONLY AND OPTIONAL PROPERTIES
// ============================================================================
console.log("\n--- 6) KEYOF WITH READONLY AND OPTIONAL PROPERTIES ---");

interface Config {
  readonly apiKey: string;
  baseUrl: string;
  timeout?: number;
  retries?: number;
}

type ConfigKeys = keyof Config;
// type ConfigKeys = "apiKey" | "baseUrl" | "timeout" | "retries"
// keyof includes all keys regardless of readonly or optional modifiers

function getConfigValue(config: Config, key: ConfigKeys): string | number | undefined {
  return config[key];
}

const config: Config = {
  apiKey: "secret-key",
  baseUrl: "https://api.example.com",
  timeout: 5000,
};

console.log("Config apiKey:", getConfigValue(config, "apiKey")); // "secret-key"
console.log("Config baseUrl:", getConfigValue(config, "baseUrl")); // "https://api.example.com"
console.log("Config timeout:", getConfigValue(config, "timeout")); // 5000
console.log("Config retries:", getConfigValue(config, "retries")); // undefined

// ============================================================================
// 7. PRACTICAL USE CASE: TYPE-SAFE PROPERTY ACCESSOR
// ============================================================================
console.log("\n--- 7) PRACTICAL USE CASE: TYPE-SAFE PROPERTY ACCESSOR ---");

interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

// Generic function that ensures type safety when accessing object properties
function getPropertyWithKeyof<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const product: Product = {
  id: 101,
  name: "Laptop",
  price: 999.99,
  inStock: true,
};

// TypeScript knows the return type based on the key
const productName: string = getPropertyWithKeyof(product, "name"); // Type is string
const productPrice: number = getPropertyWithKeyof(product, "price"); // Type is number
const productInStock: boolean = getPropertyWithKeyof(product, "inStock"); // Type is boolean

console.log("Product name:", productName); // "Laptop"
console.log("Product price:", productPrice); // 999.99
console.log("Product in stock:", productInStock); // true

// ============================================================================
// 8. PRACTICAL USE CASE: TYPE-SAFE PROPERTY SETTER
// ============================================================================
console.log("\n--- 8) PRACTICAL USE CASE: TYPE-SAFE PROPERTY SETTER ---");

function setProperty<T, K extends keyof T>(obj: T, key: K, value: T[K]): void {
  obj[key] = value;
}

const product2: Product = {
  id: 102,
  name: "Mouse",
  price: 29.99,
  inStock: false,
};

setProperty(product2, "name", "Wireless Mouse");
setProperty(product2, "price", 39.99);
setProperty(product2, "inStock", true);

// TypeScript ensures type safety - these would cause errors:
// setProperty(product2, "name", 123); // Error: Type 'number' is not assignable to type 'string'
// setProperty(product2, "invalidKey", "value"); // Error: Argument of type '"invalidKey"' is not assignable

console.log("Updated product:", product2);

// ============================================================================
// 9. KEYOF WITH UNION TYPES
// ============================================================================
console.log("\n--- 9) KEYOF WITH UNION TYPES ---");

type TypeA = { a: string; b: number };
type TypeB = { c: boolean; d: string };

type UnionKeys = keyof (TypeA | TypeB);
// type UnionKeys = keyof TypeA & keyof TypeB
// This results in the intersection of keys, which is typically "never" if types don't share keys
// In this case, it would be "never" since TypeA and TypeB have no common keys

// If types share keys, those keys are included
type TypeC = { a: string; b: number };
type TypeD = { a: string; c: boolean };

type SharedKeys = keyof (TypeC | TypeD);
// type SharedKeys = "a" (the common key)

// ============================================================================
// 10. KEYOF WITH INTERSECTION TYPES
// ============================================================================
console.log("\n--- 10) KEYOF WITH INTERSECTION TYPES ---");

type E = { a: string; b: number };
type F = { c: boolean; d: string };

type IntersectionKeys = keyof (E & F);
// type IntersectionKeys = "a" | "b" | "c" | "d"
// Intersection includes all keys from both types

const intersection: E & F = {
  a: "hello",
  b: 42,
  c: true,
  d: "world",
};

type IntersectionKey = keyof typeof intersection;
// type IntersectionKey = "a" | "b" | "c" | "d"

console.log("Intersection keys:", Object.keys(intersection));
// ["a", "b", "c", "d"]

// ============================================================================
// 11. KEYOF WITH GENERIC TYPES
// ============================================================================
console.log("\n--- 11) KEYOF WITH GENERIC TYPES ---");

// Generic function that works with any object type
function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach(key => {
    result[key] = obj[key];
  });
  return result;
}

interface PersonExample {
  id: number;
  name: string;
  email: string;
  age: number;
  city: string;
}

const personExample: PersonExample = {
  id: 1,
  name: "Charlie",
  email: "charlie@example.com",
  age: 28,
  city: "Boston",
};

// Pick only specific properties
const personInfo = pick(personExample, ["name", "email"]);
// Type is { name: string; email: string }

console.log("Picked person info:", personInfo); // { name: "Charlie", email: "charlie@example.com" }

// ============================================================================
// 12. KEYOF WITH CLASS TYPES
// ============================================================================
console.log("\n--- 12) KEYOF WITH CLASS TYPES ---");

class CarVehicle {
  make: string;
  model: string;
  year: number;

  constructor(make: string, model: string, year: number) {
    this.make = make;
    this.model = model;
    this.year = year;
  }

  getInfo(): string {
    return `${this.year} ${this.make} ${this.model}`;
  }
}

type VehicleKeys = keyof CarVehicle;
// type VehicleKeys = "make" | "model" | "year" | "getInfo"
// Note: keyof includes both properties and methods

const carVehicle = new CarVehicle("Toyota", "Camry", 2023);

// For property access, we can narrow the type to only property keys
type VehiclePropertyKeys = "make" | "model" | "year";

function getVehicleProperty(vehicle: CarVehicle, key: VehiclePropertyKeys): string | number {
  return vehicle[key];
}

console.log("Vehicle make:", getVehicleProperty(carVehicle, "make")); // "Toyota"
console.log("Vehicle model:", getVehicleProperty(carVehicle, "model")); // "Camry"
console.log("Vehicle year:", getVehicleProperty(carVehicle, "year")); // 2023
console.log("Vehicle info:", carVehicle.getInfo()); // "2023 Toyota Camry"

// ============================================================================
// 13. KEYOF WITH NESTED OBJECTS
// ============================================================================
console.log("\n--- 13) KEYOF WITH NESTED OBJECTS ---");

interface Address {
  street: string;
  city: string;
  zipCode: string;
}

interface Company {
  name: string;
  address: Address;
  employees: number;
}

type CompanyKeys = keyof Company;
// type CompanyKeys = "name" | "address" | "employees"

const company: Company = {
  name: "Tech Corp",
  address: {
    street: "123 Main St",
    city: "San Francisco",
    zipCode: "94102",
  },
  employees: 150,
};

function getCompanyProperty(company: Company, key: CompanyKeys): string | Address | number {
  return company[key];
}

console.log("Company name:", getCompanyProperty(company, "name")); // "Tech Corp"
console.log("Company address:", getCompanyProperty(company, "address"));
// { street: "123 Main St", city: "San Francisco", zipCode: "94102" }
console.log("Company employees:", getCompanyProperty(company, "employees")); // 150

// ============================================================================
// 14. KEYOF WITH CONST OBJECTS
// ============================================================================
console.log("\n--- 14) KEYOF WITH CONST OBJECTS ---");

const statusCodes = {
  OK: 200,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
} as const;

// When using 'as const', the values become literal types
type StatusCodeKeys = keyof typeof statusCodes;
// type StatusCodeKeys = "OK" | "NOT_FOUND" | "SERVER_ERROR"

function getStatusCode(key: StatusCodeKeys): number {
  return statusCodes[key];
}

console.log("Status OK:", getStatusCode("OK")); // 200
console.log("Status NOT_FOUND:", getStatusCode("NOT_FOUND")); // 404
console.log("Status SERVER_ERROR:", getStatusCode("SERVER_ERROR")); // 500

// ============================================================================
// 15. REAL-WORLD EXAMPLE: API RESPONSE VALIDATION
// ============================================================================
console.log("\n--- 15) REAL-WORLD EXAMPLE: API RESPONSE VALIDATION ---");

interface ApiResponse {
  status: "success" | "error";
  data?: unknown;
  message?: string;
  timestamp: number;
}

type ApiResponseKeys = keyof ApiResponse;

// Function to validate that all required keys are present
function validateApiResponse(response: Partial<ApiResponse>): response is ApiResponse {
  const requiredKeys: Array<keyof ApiResponse> = ["status", "timestamp"];
  return requiredKeys.every(key => key in response);
}

const validResponse: ApiResponse = {
  status: "success",
  data: { userId: 123 },
  timestamp: Date.now(),
};

const invalidResponse: Partial<ApiResponse> = {
  status: "success",
  // missing timestamp
};

console.log("Valid response:", validateApiResponse(validResponse)); // true
console.log("Invalid response:", validateApiResponse(invalidResponse)); // false

console.log("\n-- Keyof Type Operator Examples Complete --");

