/**
 * TypeScript Utility Types Examples
 * 
 * TypeScript provides several utility types to facilitate common type transformations.
 * These utilities are available globally.
 */

// ============================================================================
// Awaited<Type> - Released: 4.5
// ============================================================================
/**
 * This type is meant to model operations like await in async functions, 
 * or the .then() method on Promises - specifically, the way that they 
 * recursively unwrap Promises.
 */

// Basic example
type A = Awaited<Promise<string>>;
// type A = string

type B = Awaited<Promise<Promise<number>>>;
// type B = number

type C = Awaited<boolean | Promise<number>>;
// type C = number | boolean

// Example with async function
async function fetchUser(): Promise<{ id: number; name: string }> {
  return { id: 1, name: "John" };
}

type User = Awaited<ReturnType<typeof fetchUser>>;
// type User = { id: number; name: string }

// ============================================================================
// Partial<Type> - Released: 2.1
// ============================================================================
/**
 * Constructs a type with all properties of Type set to optional.
 * This utility will return a type that represents all subsets of a given type.
 */

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>): Todo {
  return { ...todo, ...fieldsToUpdate };
}

const todo1: Todo = {
  title: "organize desk",
  description: "clear clutter",
  completed: false,
};

const todo2 = updateTodo(todo1, {
  description: "throw out trash",
});

// Partial allows updating only some fields
const todo3 = updateTodo(todo1, {
  completed: true,
});

// ============================================================================
// Required<Type> - Released: 2.8
// ============================================================================
/**
 * Constructs a type consisting of all properties of Type set to required.
 * The opposite of Partial.
 */

interface Props {
  a?: number;
  b?: string;
  c?: boolean;
}

const obj: Props = { a: 5 }; // OK - optional properties

// Required makes all properties mandatory
const obj2: Required<Props> = { 
  a: 5, 
  b: "hello", 
  c: true 
};
// const obj3: Required<Props> = { a: 5 }; // Error: Property 'b' is missing

// ============================================================================
// Readonly<Type> - Released: 2.1
// ============================================================================
/**
 * Constructs a type with all properties of Type set to readonly,
 * meaning the properties of the constructed type cannot be reassigned.
 */

interface Todo {
  title: string;
  description: string;
}

const todo: Readonly<Todo> = {
  title: "Delete inactive users",
  description: "Remove users who haven't logged in for 90 days",
};

// todo.title = "Hello"; // Error: Cannot assign to 'title' because it is a read-only property

// This utility is useful for representing assignment expressions that will fail at runtime
function freeze<T>(obj: T): Readonly<T> {
  return Object.freeze(obj);
}

const frozenTodo = freeze({
  title: "Read-only todo",
  description: "This cannot be modified",
});

// ============================================================================
// Record<Keys, Type> - Released: 2.1
// ============================================================================
/**
 * Constructs an object type whose property keys are Keys and whose 
 * property values are Type. This utility can be used to map the 
 * properties of a type to another type.
 */

type CatName = "miffy" | "boris" | "mordred";

interface CatInfo {
  age: number;
  breed: string;
}

const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: "Persian" },
  boris: { age: 5, breed: "Maine Coon" },
  mordred: { age: 16, breed: "British Shorthair" },
};

// Record with string keys
type UserRoles = Record<string, boolean>;
const roles: UserRoles = {
  admin: true,
  user: false,
  guest: false,
};

// Record with number keys
type PageInfo = Record<number, string>;
const pages: PageInfo = {
  1: "Home",
  2: "About",
  3: "Contact",
};

// ============================================================================
// Pick<Type, Keys> - Released: 2.1
// ============================================================================
/**
 * Constructs a type by picking the set of properties Keys 
 * (string literal or union of string literals) from Type.
 */

interface Todo {
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}

type TodoPreview = Pick<Todo, "title" | "completed">;

const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};

// Pick creates a subset with only selected properties
type TodoSummary = Pick<Todo, "title" | "createdAt">;
const summary: TodoSummary = {
  title: "Task summary",
  createdAt: Date.now(),
};

// ============================================================================
// Omit<Type, Keys> - Released: 3.5
// ============================================================================
/**
 * Constructs a type by picking all properties from Type and then 
 * removing Keys (string literal or union of string literals). 
 * The opposite of Pick.
 */

interface Todo {
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}

type TodoPreview = Omit<Todo, "description">;

const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
  createdAt: 1615544252770,
};

type TodoInfo = Omit<Todo, "completed" | "createdAt">;

const todoInfo: TodoInfo = {
  title: "Pick up kids",
  description: "Kindergarten closes at 5pm",
};

// ============================================================================
// Exclude<UnionType, ExcludedMembers> - Released: 2.8
// ============================================================================
/**
 * Constructs a type by excluding from UnionType all union members 
 * that are assignable to ExcludedMembers.
 */

type T0 = Exclude<"a" | "b" | "c", "a">;
// type T0 = "b" | "c"

type T1 = Exclude<"a" | "b" | "c", "a" | "b">;
// type T1 = "c"

type T2 = Exclude<string | number | (() => void), Function>;
// type T2 = string | number

type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; x: number }
  | { kind: "triangle"; x: number; y: number };

type T3 = Exclude<Shape, { kind: "circle" }>;
// type T3 = { kind: "square"; x: number } | { kind: "triangle"; x: number; y: number }

// Practical example: Exclude null and undefined from a type
type NonNullableStrings = Exclude<string | null | undefined, null | undefined>;
// type NonNullableStrings = string

// ============================================================================
// Extract<Type, Union> - Released: 2.8
// ============================================================================
/**
 * Constructs a type by extracting from Type all union members 
 * that are assignable to Union.
 */

type T0 = Extract<"a" | "b" | "c", "a" | "f">;
// type T0 = "a"

type T1 = Extract<string | number | (() => void), Function>;
// type T1 = () => void

type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; x: number }
  | { kind: "triangle"; x: number; y: number };

type T2 = Extract<Shape, { kind: "circle" }>;
// type T2 = { kind: "circle"; radius: number }

// Practical example: Extract only function types
type FunctionTypes = Extract<string | number | (() => void) | boolean, Function>;
// type FunctionTypes = () => void

// ============================================================================
// NonNullable<Type> - Released: 2.8
// ============================================================================
/**
 * Constructs a type by excluding null and undefined from Type.
 */

type T0 = NonNullable<string | number | undefined>;
// type T0 = string | number

type T1 = NonNullable<string[] | null | undefined>;
// type T1 = string[]

type T2 = NonNullable<number | null | undefined | string>;
// type T2 = number | string

// Practical example: Ensure a value is not null or undefined
function processValue<T>(value: NonNullable<T>): void {
  // value is guaranteed to not be null or undefined
  console.log(value);
}

// ============================================================================
// Parameters<Type> - Released: 3.1
// ============================================================================
/**
 * Constructs a tuple type from the types used in the parameters 
 * of a function type Type.
 * For overloaded functions, this will be the parameters of the last signature.
 */

declare function f1(arg: { a: number; b: string }): void;

type T0 = Parameters<() => string>;
// type T0 = []

type T1 = Parameters<(s: string) => void>;
// type T1 = [s: string]

type T2 = Parameters<<T>(arg: T) => T>;
// type T2 = [arg: unknown]

type T3 = Parameters<typeof f1>;
// type T3 = [arg: { a: number; b: string }]

type T4 = Parameters<any>;
// type T4 = unknown[]

type T5 = Parameters<never>;
// type T5 = never

// Practical example: Extract function parameters
function createUser(name: string, age: number, email: string): void {
  // ...
}

type CreateUserParams = Parameters<typeof createUser>;
// type CreateUserParams = [name: string, age: number, email: string]

// Use with spread operator
function callCreateUser(...args: Parameters<typeof createUser>) {
  createUser(...args);
}

// ============================================================================
// ConstructorParameters<Type> - Released: 3.1
// ============================================================================
/**
 * Constructs a tuple or array type from the types of a constructor function type.
 * It produces a tuple type with all the parameter types 
 * (or the type never if Type is not a function).
 */

type T0 = ConstructorParameters<ErrorConstructor>;
// type T0 = [message?: string]

type T1 = ConstructorParameters<FunctionConstructor>;
// type T1 = string[]

type T2 = ConstructorParameters<RegExpConstructor>;
// type T2 = [pattern: string | RegExp, flags?: string]

class C {
  constructor(a: number, b: string) {}
}

type T3 = ConstructorParameters<typeof C>;
// type T3 = [a: number, b: string]

type T4 = ConstructorParameters<any>;
// type T4 = unknown[]

// Practical example: Extract class constructor parameters
class User {
  constructor(
    public name: string,
    public age: number,
    public email: string
  ) {}
}

type UserConstructorParams = ConstructorParameters<typeof User>;
// type UserConstructorParams = [name: string, age: number, email: string]

// Create instance using constructor parameters
function createUserInstance(...args: ConstructorParameters<typeof User>): User {
  return new User(...args);
}

// ============================================================================
// ReturnType<Type> - Released: 2.8
// ============================================================================
/**
 * Constructs a type consisting of the return type of function Type.
 * For overloaded functions, this will be the return type of the last signature.
 */

declare function f1(): { a: number; b: string };

type T0 = ReturnType<() => string>;
// type T0 = string

type T1 = ReturnType<(s: string) => void>;
// type T1 = void

type T2 = ReturnType<<T>() => T>;
// type T2 = unknown

type T3 = ReturnType<<T extends U, U extends number[]>() => T>;
// type T3 = number[]

type T4 = ReturnType<typeof f1>;
// type T4 = { a: number; b: string }

type T5 = ReturnType<any>;
// type T5 = any

type T6 = ReturnType<never>;
// type T6 = never

// Practical example: Extract function return type
async function fetchData(): Promise<{ id: number; name: string }> {
  return { id: 1, name: "John" };
}

type FetchDataReturn = ReturnType<typeof fetchData>;
// type FetchDataReturn = Promise<{ id: number; name: string }>

// Combine with Awaited for async functions
type Data = Awaited<ReturnType<typeof fetchData>>;
// type Data = { id: number; name: string }

// ============================================================================
// InstanceType<Type> - Released: 2.8
// ============================================================================
/**
 * Constructs a type consisting of the instance type of a constructor function in Type.
 */

class C {
  x = 0;
  y = 0;
}

type T0 = InstanceType<typeof C>;
// type T0 = C

type T1 = InstanceType<any>;
// type T1 = any

type T2 = InstanceType<never>;
// type T2 = never

// Practical example: Extract class instance type
class User {
  constructor(
    public name: string,
    public age: number
  ) {}
  
  greet() {
    return `Hello, I'm ${this.name}`;
  }
}

type UserInstance = InstanceType<typeof User>;
// type UserInstance = User

// Use in factory functions
function createInstance<T extends new (...args: any[]) => any>(
  Constructor: T,
  ...args: ConstructorParameters<T>
): InstanceType<T> {
  return new Constructor(...args);
}

const user = createInstance(User, "John", 30);
// user is of type User

// ============================================================================
// NoInfer<Type> - Released: 5.4
// ============================================================================
/**
 * Blocks inferences to the contained type. Other than blocking inferences,
 * NoInfer<Type> is identical to Type.
 */

function createStreetLight<C extends string>(
  colors: C[],
  defaultColor?: NoInfer<C>,
) {
  // ...
}

createStreetLight(["red", "yellow", "green"], "red");  // OK
// createStreetLight(["red", "yellow", "green"], "blue");  // Error: "blue" is not assignable

// Without NoInfer, TypeScript might infer the wrong type
function createList<T extends string>(
  items: T[],
  defaultItem?: T,
) {
  // T could be inferred from defaultItem
}

// With NoInfer, we force TypeScript to infer only from the array
function createListWithNoInfer<T extends string>(
  items: T[],
  defaultItem?: NoInfer<T>,
) {
  // T is inferred only from items, not from defaultItem
}

// ============================================================================
// ThisParameterType<Type> - Released: 3.3
// ============================================================================
/**
 * Extracts the type of the this parameter for a function type,
 * or unknown if the function type has no this parameter.
 */

function toHex(this: Number) {
  return this.toString(16);
}

function numberToString(n: ThisParameterType<typeof toHex>) {
  return toHex.apply(n);
}

// Example with class methods
class Calculator {
  value: number;
  
  constructor(value: number) {
    this.value = value;
  }
  
  add(this: Calculator, num: number): number {
    return this.value + num;
  }
}

type CalculatorThis = ThisParameterType<typeof Calculator.prototype.add>;
// type CalculatorThis = Calculator

// ============================================================================
// OmitThisParameter<Type> - Released: 3.3
// ============================================================================
/**
 * Removes the this parameter from Type. If Type has no explicitly declared 
 * this parameter, the result is simply Type. Otherwise, a new function type 
 * with no this parameter is created from Type. Generics are erased and only 
 * the last overload signature is propagated into the new function type.
 */

function toHex(this: Number) {
  return this.toString(16);
}

const fiveToHex: OmitThisParameter<typeof toHex> = toHex.bind(5);

console.log(fiveToHex()); // "5"

// Example: Convert method to standalone function
class User {
  name: string;
  
  constructor(name: string) {
    this.name = name;
  }
  
  greet(this: User): string {
    return `Hello, I'm ${this.name}`;
  }
}

type GreetFunction = OmitThisParameter<typeof User.prototype.greet>;
// type GreetFunction = () => string

const greetStandalone: GreetFunction = User.prototype.greet.bind(new User("John"));

// ============================================================================
// ThisType<Type> - Released: 2.3
// ============================================================================
/**
 * This utility does not return a transformed type. Instead, it serves as a 
 * marker for a contextual this type. Note that the noImplicitThis flag 
 * must be enabled to use this utility.
 */

type ObjectDescriptor<D, M> = {
  data?: D;
  methods?: M & ThisType<D & M>; // Type of 'this' in methods is D & M
};

function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {
  let data: object = desc.data || {};
  let methods: object = desc.methods || {};
  return { ...data, ...methods } as D & M;
}

let obj = makeObject({
  data: { x: 0, y: 0 },
  methods: {
    moveBy(dx: number, dy: number) {
      this.x += dx; // Strongly typed this
      this.y += dy; // Strongly typed this
    },
  },
});

obj.x = 10;
obj.y = 20;
obj.moveBy(5, 5);

// Example: Creating a builder pattern with ThisType
interface Builder<T> {
  data: T;
  methods: ThisType<{ getValue(): T; setValue(value: T): void } & T>;
}

function createBuilder<T>(builder: Builder<T>) {
  return {
    ...builder.data,
    ...builder.methods,
  };
}

// ============================================================================
// Intrinsic String Manipulation Types
// ============================================================================

// Uppercase<StringType>
type UppercaseExample1 = Uppercase<"hello">;
// type UppercaseExample1 = "HELLO"

type UppercaseExample2 = Uppercase<"world" | "typescript">;
// type UppercaseExample2 = "WORLD" | "TYPESCRIPT"

// Lowercase<StringType>
type LowercaseExample1 = Lowercase<"HELLO">;
// type LowercaseExample1 = "hello"

type LowercaseExample2 = Lowercase<"WORLD" | "TYPESCRIPT">;
// type LowercaseExample2 = "world" | "typescript"

// Capitalize<StringType>
type CapitalizeExample1 = Capitalize<"hello">;
// type CapitalizeExample1 = "Hello"

type CapitalizeExample2 = Capitalize<"hello" | "world">;
// type CapitalizeExample2 = "Hello" | "World"

// Uncapitalize<StringType>
type UncapitalizeExample1 = Uncapitalize<"Hello">;
// type UncapitalizeExample1 = "hello"

type UncapitalizeExample2 = Uncapitalize<"Hello" | "World">;
// type UncapitalizeExample2 = "hello" | "world"

// Practical example: Transform object keys
type UserConfig = {
  firstName: string;
  lastName: string;
  email: string;
};

// Transform keys to uppercase
type UppercaseKeys<T> = {
  [K in keyof T as Uppercase<string & K>]: T[K];
};

type UserConfigUppercase = UppercaseKeys<UserConfig>;
// type UserConfigUppercase = {
//   FIRSTNAME: string;
//   LASTNAME: string;
//   EMAIL: string;
// }

// Transform keys to lowercase
type LowercaseKeys<T> = {
  [K in keyof T as Lowercase<string & K>]: T[K];
};

type UserConfigLowercase = LowercaseKeys<UserConfig>;
// type UserConfigLowercase = {
//   firstname: string;
//   lastname: string;
//   email: string;
// }

// Transform keys to capitalized
type CapitalizeKeys<T> = {
  [K in keyof T as Capitalize<string & K>]: T[K];
};

type UserConfigCapitalized = CapitalizeKeys<UserConfig>;
// type UserConfigCapitalized = {
//   FirstName: string;
//   LastName: string;
//   Email: string;
// }

// ============================================================================
// Complex Utility Type Combinations
// ============================================================================

// Example: Combining multiple utility types
interface ComplexUser {
  id: number;
  name: string;
  email?: string;
  age?: number;
  createdAt: Date;
  updatedAt?: Date;
}

// Create a type for user updates (partial, excluding id and createdAt)
type UserUpdate = Omit<Partial<ComplexUser>, "id" | "createdAt">;
// All fields optional except id and createdAt are excluded

// Create a read-only version of user
type ReadonlyUser = Readonly<ComplexUser>;

// Create a type for user creation (omit id and timestamps)
type UserCreate = Omit<ComplexUser, "id" | "createdAt" | "updatedAt">;

// Extract only required fields
type RequiredUserFields = Required<Pick<ComplexUser, "id" | "name">>;

// Example: API response type
async function fetchUser(id: number): Promise<ComplexUser> {
  // Implementation
  return {} as ComplexUser;
}

type FetchUserResponse = Awaited<ReturnType<typeof fetchUser>>;
// type FetchUserResponse = ComplexUser

// Example: Function wrapper that preserves types
function withLogging<T extends (...args: any[]) => any>(
  fn: T
): (...args: Parameters<T>) => ReturnType<T> {
  return (...args: Parameters<T>): ReturnType<T> => {
    console.log("Calling function with args:", args);
    const result = fn(...args);
    console.log("Function returned:", result);
    return result;
  };
}

// Example: Extract and transform types
type ExtractFunction<T> = T extends (...args: any[]) => any ? T : never;
type FunctionNames<T> = {
  [K in keyof T]: ExtractFunction<T[K]> extends never ? never : K;
}[keyof T];

interface MyApi {
  getName(): string;
  getAge(): number;
  data: string;
  count: number;
}

type ApiFunctionNames = FunctionNames<MyApi>;
// type ApiFunctionNames = "getName" | "getAge"

// ============================================================================
// Export for use in other files
// ============================================================================

export {
  // Utility types examples
  updateTodo,
  createUserInstance,
  callCreateUser,
  createInstance,
  withLogging,
};

