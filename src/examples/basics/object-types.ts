/**
 * Object Types Examples
 * Demonstrates various ways to define and work with object types in TypeScript
 */

// ============================================================================
// 1. Anonymous Object Types
// ============================================================================

function greet(person: { name: string; age: number }) {
  return "Hello " + person.name;
}

// ============================================================================
// 2. Named Types with Interface
// ============================================================================

interface Person {
  name: string;
  age: number;
}

function greetWithInterface(person: Person) {
  return "Hello " + person.name;
}

// ============================================================================
// 3. Named Types with Type Alias
// ============================================================================

type PersonType = {
  name: string;
  age: number;
};

function greetWithType(person: PersonType) {
  return "Hello " + person.name;
}

// ============================================================================
// 4. Optional Properties
// ============================================================================

interface PaintOptions {
  shape: string;
  xPos?: number;
  yPos?: number;
}

function paintShape(opts: PaintOptions) {
  // xPos and yPos are potentially undefined
  let xPos = opts.xPos === undefined ? 0 : opts.xPos;
  let yPos = opts.yPos === undefined ? 0 : opts.yPos;
  
  console.log(`Painting ${opts.shape} at (${xPos}, ${yPos})`);
}

// Using destructuring with default values
function paintShapeWithDefaults({ shape, xPos = 0, yPos = 0 }: PaintOptions) {
  console.log("x coordinate at", xPos);
  console.log("y coordinate at", yPos);
}

// Example usage
const shape = "circle";
paintShape({ shape });
paintShape({ shape, xPos: 100 });
paintShape({ shape, yPos: 100 });
paintShape({ shape, xPos: 100, yPos: 100 });

// ============================================================================
// 5. Readonly Properties
// ============================================================================

interface SomeType {
  readonly prop: string;
}

function doSomethingWithReadonly(obj: SomeType) {
  // We can read from 'obj.prop'
  console.log(`prop has the value '${obj.prop}'.`);
  
  // But we can't re-assign it
  // obj.prop = "hello"; // Error: Cannot assign to 'prop' because it is a read-only property
}

// Readonly doesn't mean immutable contents
interface Home {
  readonly resident: { name: string; age: number };
}

function visitForBirthday(home: Home) {
  // We can read and update properties from 'home.resident'
  console.log(`Happy birthday ${home.resident.name}!`);
  home.resident.age++;
  
  // But we can't write to the 'resident' property itself
  // home.resident = { name: "Victor", age: 42 }; // Error
}

// Readonly compatibility
interface Person {
  name: string;
  age: number;
}

interface ReadonlyPerson {
  readonly name: string;
  readonly age: number;
}

let writablePerson: Person = {
  name: "Person McPersonface",
  age: 42,
};

// Works - readonly properties can change via aliasing
let readonlyPerson: ReadonlyPerson = writablePerson;
console.log(readonlyPerson.age); // prints '42'
writablePerson.age++;
console.log(readonlyPerson.age); // prints '43'

// ============================================================================
// 6. Index Signatures
// ============================================================================

interface StringArray {
  [index: number]: string;
}

function getStringArray(): StringArray {
  return ["hello", "world", "typescript"];
}

const stringArrayInstance: StringArray = getStringArray();
const secondItem = stringArrayInstance[1]; // string

// Dictionary pattern
interface NumberDictionary {
  [index: string]: number;
  length: number; // ok
  // name: string; // Error: Property 'name' of type 'string' is not assignable to 'string' index type 'number'
}

// Union types in index signature
interface NumberOrStringDictionary {
  [index: string]: number | string;
  length: number; // ok, length is a number
  name: string; // ok, name is a string
}

// Readonly index signatures
interface ReadonlyStringArray {
  readonly [index: number]: string;
}

function getReadOnlyStringArray(): ReadonlyStringArray {
  return ["red", "green", "blue"];
}

let readonlyArray: ReadonlyStringArray = getReadOnlyStringArray();
// readonlyArray[2] = "Mallory"; // Error: Index signature in type 'ReadonlyStringArray' only permits reading

// ============================================================================
// 7. Excess Property Checks
// ============================================================================

interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  return {
    color: config.color || "red",
    area: config.width ? config.width * config.width : 20,
  };
}

// This will cause an error due to excess property checking
// let mySquare = createSquare({ colour: "red", width: 100 }); // Error: 'colour' does not exist

// Workaround 1: Type assertion
let mySquare1 = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);

// Workaround 2: Index signature
interface SquareConfigWithIndex {
  color?: string;
  width?: number;
  [propName: string]: unknown;
}

function createSquareWithIndex(config: SquareConfigWithIndex): { color: string; area: number } {
  return {
    color: config.color || "red",
    area: config.width ? config.width * config.width : 20,
  };
}

let mySquare2 = createSquareWithIndex({ colour: "red", width: 100 }); // OK

// Workaround 3: Assign to another variable
let squareOptions = { colour: "red", width: 100 };
let mySquare3 = createSquare(squareOptions); // OK

// ============================================================================
// 8. Extending Types (Interface Extension)
// ============================================================================

interface BasicAddress {
  name?: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
}

interface AddressWithUnit extends BasicAddress {
  unit: string;
}

const address: AddressWithUnit = {
  street: "123 Main St",
  city: "New York",
  country: "USA",
  postalCode: "10001",
  unit: "4B",
};

// Multiple interface extension
interface Colorful {
  color: string;
}

interface Circle {
  radius: number;
}

interface ColorfulCircleInterface extends Colorful, Circle {}

const cc: ColorfulCircleInterface = {
  color: "red",
  radius: 42,
};

// ============================================================================
// 9. Intersection Types
// ============================================================================

// Note: Colorful and Circle interfaces are already defined above
// Using intersection type instead of interface extension
type ColorfulCircleType = Colorful & Circle;

function draw(circle: Colorful & Circle) {
  console.log(`Color was ${circle.color}`);
  console.log(`Radius was ${circle.radius}`);
}

// OK
draw({ color: "blue", radius: 42 });

// Error: typo in property name
// draw({ color: "red", raidus: 42 }); // Error: 'raidus' does not exist

// Intersection type conflict example
interface Person1 {
  name: string;
}

interface Person2 {
  name: number;
}

type Staff = Person1 & Person2;
// Staff.name would be of type 'never' because it can't be both string and number

// ============================================================================
// 10. Generic Object Types
// ============================================================================

// Basic generic Box
interface Box<Type> {
  contents: Type;
}

let box: Box<string> = { contents: "hello" };
let numberBox: Box<number> = { contents: 42 };

// Generic function with Box
function setContents<Type>(box: Box<Type>, newContents: Type) {
  box.contents = newContents;
}

setContents(box, "world");
setContents(numberBox, 100);

// Generic type alias
type BoxType<Type> = {
  contents: Type;
};

// Generic helper types
type OrNull<Type> = Type | null;

type OneOrMany<Type> = Type | Type[];

type OneOrManyOrNull<Type> = OrNull<OneOrMany<Type>>;

type OneOrManyOrNullStrings = OneOrManyOrNull<string>;

// ============================================================================
// 11. Array Type
// ============================================================================

function doSomethingWithArray(value: Array<string>) {
  // ...
}

let stringArray: string[] = ["hello", "world"];

// Either of these work!
doSomethingWithArray(stringArray);
doSomethingWithArray(new Array("hello", "world"));

// Note: Array is a built-in generic type in TypeScript: Array<Type>
// The shorthand syntax string[] is equivalent to Array<string>

// ============================================================================
// 12. ReadonlyArray Type
// ============================================================================

function doStuff(values: ReadonlyArray<string>) {
  // We can read from 'values'...
  const copy = values.slice();
  console.log(`The first value is ${values[0]}`);
  
  // ...but we can't mutate 'values'
  // values.push("hello!"); // Error: Property 'push' does not exist on type 'readonly string[]'
}

const roArray: ReadonlyArray<string> = ["red", "green", "blue"];

// Shorthand syntax: readonly Type[]
function doStuffShorthand(values: readonly string[]) {
  const copy = values.slice();
  console.log(`The first value is ${values[0]}`);
  // values.push("hello!"); // Error
}

// Assignability is not bidirectional
let x: readonly string[] = [];
let y: string[] = [];

x = y; // OK
// y = x; // Error: The type 'readonly string[]' is 'readonly' and cannot be assigned to the mutable type 'string[]'

// ============================================================================
// 13. Tuple Types
// ============================================================================

type StringNumberPair = [string, number];

function doSomethingWithPair(pair: [string, number]) {
  const a = pair[0]; // string
  const b = pair[1]; // number
  // const c = pair[2]; // Error: Tuple type '[string, number]' of length '2' has no element at index '2'
}

doSomethingWithPair(["hello", 42]);

// Destructuring tuples
function doSomethingWithTuple(stringHash: [string, number]) {
  const [inputString, hash] = stringHash;
  
  console.log(inputString); // string
  console.log(hash); // number
}

// Optional tuple elements
type Either2dOr3d = [number, number, number?];

function setCoordinate(coord: Either2dOr3d) {
  const [x, y, z] = coord;
  // z: number | undefined
  
  console.log(`Provided coordinates had ${coord.length} dimensions`); // length: 2 | 3
}

setCoordinate([1, 2]);
setCoordinate([1, 2, 3]);

// Rest elements in tuples
type StringNumberBooleans = [string, number, ...boolean[]];
type StringBooleansNumber = [string, ...boolean[], number];
type BooleansStringNumber = [...boolean[], string, number];

const a: StringNumberBooleans = ["hello", 1];
const b: StringNumberBooleans = ["beautiful", 2, true];
const c: StringNumberBooleans = ["world", 3, true, false, true, false, true];

// Tuples with rest parameters
function readButtonInput(...args: [string, number, ...boolean[]]) {
  const [name, version, ...input] = args;
  console.log(`Button: ${name}, Version: ${version}, Inputs: ${input.length}`);
}

readButtonInput("Submit", 1, true, false, true);

// Equivalent to:
function readButtonInputEquivalent(name: string, version: number, ...input: boolean[]) {
  console.log(`Button: ${name}, Version: ${version}, Inputs: ${input.length}`);
}

// ============================================================================
// 14. Readonly Tuple Types
// ============================================================================

function doSomethingWithReadonlyPair(pair: readonly [string, number]) {
  // pair[0] = "hello!"; // Error: Cannot assign to '0' because it is a read-only property
  console.log(pair[0], pair[1]);
}

// Const assertions infer readonly tuple types
let point = [3, 4] as const;

function distanceFromOrigin([x, y]: [number, number]) {
  return Math.sqrt(x ** 2 + y ** 2);
}

// This would cause an error:
// distanceFromOrigin(point); // Error: Argument of type 'readonly [3, 4]' is not assignable to parameter of type '[number, number]'

// Solution: Use readonly in the function signature
function distanceFromOriginReadonly([x, y]: readonly [number, number]) {
  return Math.sqrt(x ** 2 + y ** 2);
}

distanceFromOriginReadonly(point); // OK

// ============================================================================
// Example Usage and Testing
// ============================================================================

// Example 1: Complete person management
interface Employee extends Person {
  employeeId: string;
  department: string;
  salary?: number;
}

function createEmployee(employee: Employee): Employee {
  return employee;
}

const emp: Employee = {
  name: "John Doe",
  age: 30,
  employeeId: "EMP001",
  department: "Engineering",
  salary: 75000,
};

// Example 2: Generic container
interface Container<T> {
  items: T[];
  add(item: T): void;
  get(index: number): T | undefined;
}

class BoxContainer<T> implements Container<T> {
  items: T[] = [];
  
  add(item: T): void {
    this.items.push(item);
  }
  
  get(index: number): T | undefined {
    return this.items[index];
  }
}

const stringContainer = new BoxContainer<string>();
stringContainer.add("hello");
stringContainer.add("world");

// Example 3: Complex tuple usage
type UserInfo = [string, number, ...string[]]; // name, age, email, phone, etc.

function processUserInfo(...info: UserInfo) {
  const [name, age, ...contacts] = info;
  console.log(`User: ${name}, Age: ${age}, Contacts: ${contacts.join(", ")}`);
}

processUserInfo("Alice", 25, "alice@example.com", "123-456-7890");

// Export examples for use in other files
export {
  greet,
  greetWithInterface,
  greetWithType,
  paintShape,
  paintShapeWithDefaults,
  doSomethingWithReadonly,
  visitForBirthday,
  createSquare,
  createSquareWithIndex,
  draw,
  setContents,
  doStuff,
  doStuffShorthand,
  doSomethingWithArray,
  doSomethingWithPair,
  doSomethingWithTuple,
  setCoordinate,
  readButtonInput,
  type Person,
  type PersonType,
  type PaintOptions,
  type Employee,
  type Box,
  type ColorfulCircleInterface,
  type ColorfulCircleType,
  type StringNumberPair,
  type Either2dOr3d,
  type StringNumberBooleans,
  type Container,
};

