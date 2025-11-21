/**
 * Indexed Access Types Examples
 * 
 * Indexed access types allow you to look up a specific property on another type
 * using bracket notation, similar to how you access object properties in JavaScript.
 */

// ============================================================================
// Basic Indexed Access Type
// ============================================================================

type Person = { age: number; name: string; alive: boolean };

// Get the type of a specific property
type Age = Person["age"];
// type Age = number

type Name = Person["name"];
// type Name = string

type Alive = Person["alive"];
// type Alive = boolean

// ============================================================================
// Using Union Types for Indexing
// ============================================================================

// Get the union of multiple property types
type I1 = Person["age" | "name"];
// type I1 = string | number

type I2 = Person["name" | "alive"];
// type I2 = string | boolean

// ============================================================================
// Using keyof for Indexing
// ============================================================================

// Get the union of all property types
type I3 = Person[keyof Person];
// type I3 = string | number | boolean

// This is equivalent to:
// type I3 = Person["age" | "name" | "alive"];

// ============================================================================
// Using Type Alias for Indexing
// ============================================================================

type AliveOrName = "alive" | "name";
type I4 = Person[AliveOrName];
// type I4 = string | boolean

type SingleKey = "age";
type I5 = Person[SingleKey];
// type I5 = number

// ============================================================================
// Error: Indexing Non-Existent Property
// ============================================================================

// The following would cause a TypeScript error:
// type I6 = Person["alve"];
// Error: Property 'alve' does not exist on type 'Person'.

// ============================================================================
// Indexing Arrays with typeof
// ============================================================================

const MyArray = [
  { name: "Alice", age: 15 },
  { name: "Bob", age: 23 },
  { name: "Eve", age: 38 },
];

// Get the element type of an array
type PersonFromArray = typeof MyArray[number];
// type PersonFromArray = {
//     name: string;
//     age: number;
// }

// Get a specific property type from array elements
type AgeFromArray = typeof MyArray[number]["age"];
// type AgeFromArray = number

// Or using the type alias we created
type AgeFromArray2 = PersonFromArray["age"];
// type AgeFromArray2 = number

// ============================================================================
// Restriction: Cannot Use const Values Directly
// ============================================================================

// The following would cause a TypeScript error:
// const key = "age";
// type Age = Person[key];
// Error: Type 'key' cannot be used as an index type.
// 'key' refers to a value, but is being used as a type here. Did you mean 'typeof key'?

// However, you can use a type alias for a similar style:
type key = "age";
type Age2 = Person[key];
// This works because 'key' is a type, not a value

// ============================================================================
// Practical Examples
// ============================================================================

// Example 1: API Response Types
type ApiResponse = {
  user: {
    id: number;
    email: string;
    profile: {
      firstName: string;
      lastName: string;
      age: number;
    };
  };
  status: "success" | "error";
  timestamp: number;
};

type User = ApiResponse["user"];
// type User = { id: number; email: string; profile: { ... } }

type UserProfile = ApiResponse["user"]["profile"];
// type UserProfile = { firstName: string; lastName: string; age: number }

type ProfileAge = ApiResponse["user"]["profile"]["age"];
// type ProfileAge = number

type Status = ApiResponse["status"];
// type Status = "success" | "error"

// Example 2: Configuration Object
type AppConfig = {
  database: {
    host: string;
    port: number;
    name: string;
  };
  server: {
    port: number;
    env: "development" | "production";
  };
  features: {
    logging: boolean;
    analytics: boolean;
  };
};

type DatabaseConfig = AppConfig["database"];
// type DatabaseConfig = { host: string; port: number; name: string }

type ServerPort = AppConfig["server"]["port"];
// type ServerPort = number

type Environment = AppConfig["server"]["env"];
// type Environment = "development" | "production"

// Example 3: Tuple Types
type Tuple = [string, number, boolean];

type FirstElement = Tuple[0];
// type FirstElement = string

type SecondElement = Tuple[1];
// type SecondElement = number

type AllElements = Tuple[number];
// type AllElements = string | number | boolean

// Example 4: Nested Object Access
type Company = {
  name: string;
  employees: Array<{
    id: number;
    name: string;
    department: {
      id: number;
      name: string;
      budget: number;
    };
  }>;
  revenue: number;
};

type Employee = Company["employees"][number];
// type Employee = { id: number; name: string; department: { ... } }

type Department = Company["employees"][number]["department"];
// type Department = { id: number; name: string; budget: number }

type DepartmentName = Company["employees"][number]["department"]["name"];
// type DepartmentName = string

// Example 5: Conditional Type with Indexed Access
type OptionalKeys<T> = {
  [K in keyof T]: {} extends Pick<T, K> ? K : never;
}[keyof T];

type RequiredKeys<T> = {
  [K in keyof T]: {} extends Pick<T, K> ? never : K;
}[keyof T];

type ExampleType = {
  required: string;
  optional?: number;
  alsoRequired: boolean;
};

type Optional = OptionalKeys<ExampleType>;
// type Optional = "optional"

type Required = RequiredKeys<ExampleType>;
// type Required = "required" | "alsoRequired"

// ============================================================================
// Utility Functions Using Indexed Access Types
// ============================================================================

// Function that extracts a property type from an object
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person: Person = { age: 30, name: "John", alive: true };

const age: Age = getProperty(person, "age");
// age is of type number

const name: Name = getProperty(person, "name");
// name is of type string

// ============================================================================
// Export for use in other files
// ============================================================================

export {
  Person,
  Age,
  Name,
  Alive,
  PersonFromArray,
  AgeFromArray,
  ApiResponse,
  User,
  UserProfile,
  AppConfig,
  DatabaseConfig,
  Company,
  Employee,
  Department,
  getProperty,
};

