/*
  TypeScript Narrowing Examples
  
  This file demonstrates various TypeScript narrowing techniques:
  - typeof type guards
  - Truthiness narrowing
  - Equality narrowing
  - in operator narrowing
  - instanceof narrowing
  - Assignments
  - Control flow analysis
  - Type predicates
  - Discriminated unions
  - never type and exhaustiveness checking
*/

// ========== 1. typeof Type Guards ==========

function padLeft(padding: number | string, input: string): string {
  if (typeof padding === "number") {
    // TypeScript has narrowed padding to 'number' here
    return Array(padding + 1).join(" ") + input;
  }
  // TypeScript has narrowed padding to 'string' here
  return padding + input;
}

function printAll(strs: string | string[] | null): void {
  if (typeof strs === "object") {
    // Note: typeof null is "object" in JavaScript!
    // strs is narrowed to string[] | null here
    if (strs !== null) {
      for (const s of strs) {
        console.log(s);
      }
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  }
}

// ========== 2. Truthiness Narrowing ==========

function getUsersOnlineMessage(numUsersOnline: number): string {
  if (numUsersOnline) {
    // numUsersOnline is truthy (not 0)
    return `There are ${numUsersOnline} online now!`;
  }
  return "Nobody's here. :(";
}

// Truthiness checking with null/undefined
function printAllWithTruthiness(strs: string | string[] | null): void {
  if (strs && typeof strs === "object") {
    // strs is truthy AND an object, so it must be string[]
    for (const s of strs) {
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  }
}

// Boolean negation narrowing
function multiplyAll(
  values: number[] | undefined,
  factor: number
): number[] | undefined {
  if (!values) {
    // values is narrowed to undefined here
    return values;
  } else {
    // values is narrowed to number[] here
    return values.map((x) => x * factor);
  }
}

// ========== 3. Equality Narrowing ==========

function example(x: string | number, y: string | boolean): void {
  if (x === y) {
    // Both x and y must be strings (the only common type)
    x.toUpperCase();
    y.toLowerCase();
  } else {
    console.log(x); // x: string | number
    console.log(y); // y: string | boolean
  }
}

// Checking against null
function printAllWithNullCheck(strs: string | string[] | null): void {
  if (strs !== null) {
    if (typeof strs === "object") {
      // strs is narrowed to string[] here
      for (const s of strs) {
        console.log(s);
      }
    } else if (typeof strs === "string") {
      // strs is narrowed to string here
      console.log(strs);
    }
  }
}

// Loose equality (== and !=) also narrows
interface Container {
  value: number | null | undefined;
}

function multiplyValue(container: Container, factor: number): void {
  // != null checks for both null AND undefined
  if (container.value != null) {
    // container.value is narrowed to number here
    console.log(container.value);
    container.value *= factor;
  }
}

// ========== 4. in Operator Narrowing ==========

type NarrowingFish = { swim: () => void };
type NarrowingBird = { fly: () => void };

function move(animal: NarrowingFish | NarrowingBird): void {
  if ("swim" in animal) {
    // animal is narrowed to NarrowingFish here
    return animal.swim();
  }
  // animal is narrowed to NarrowingBird here
  return animal.fly();
}

// Optional properties exist in both sides
type NarrowingHuman = { swim?: () => void; fly?: () => void };

function moveWithHuman(animal: NarrowingFish | NarrowingBird | NarrowingHuman): void {
  if ("swim" in animal) {
    // animal is narrowed to NarrowingFish | NarrowingHuman
    if (animal.swim) {
      animal.swim();
    }
  } else {
    // animal is narrowed to NarrowingBird | NarrowingHuman
    if (animal.fly) {
      animal.fly();
    }
  }
}

// ========== 5. instanceof Narrowing ==========

function logValue(x: Date | string): void {
  if (x instanceof Date) {
    // x is narrowed to Date here
    console.log(x.toUTCString());
  } else {
    // x is narrowed to string here
    console.log(x.toUpperCase());
  }
}

// Example with custom classes
class Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class Dog extends Animal {
  breed: string;
  constructor(name: string, breed: string) {
    super(name);
    this.breed = breed;
  }
  bark(): void {
    console.log("Woof!");
  }
}

function handleAnimal(animal: Animal | string): void {
  if (animal instanceof Dog) {
    // animal is narrowed to Dog here
    animal.bark();
    console.log(animal.breed);
  } else if (animal instanceof Animal) {
    // animal is narrowed to Animal (but not Dog) here
    console.log(animal.name);
  } else {
    // animal is narrowed to string here
    console.log(animal.toUpperCase());
  }
}

// ========== 6. Assignments ==========

function assignmentExample(): void {
  let x = Math.random() < 0.5 ? 10 : "hello world!";
  // x: string | number

  x = 1;
  // x is narrowed to number here
  console.log(x);

  x = "goodbye!";
  // x is narrowed to string here
  console.log(x);

  // TypeScript checks against the declared type, not the observed type
  // x = true; // Error: Type 'boolean' is not assignable to type 'string | number'
}

// ========== 7. Control Flow Analysis ==========

function padLeftWithControlFlow(padding: number | string, input: string): string {
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + input;
    // TypeScript knows this returns, so the rest is unreachable for number
  }
  // padding is narrowed to string here (number branch returned)
  return padding + input;
}

function controlFlowExample(): string | number {
  let x: string | number | boolean;

  x = Math.random() < 0.5;
  // x: boolean

  if (Math.random() < 0.5) {
    x = "hello";
    // x: string
    console.log(x);
  } else {
    x = 100;
    // x: number
    console.log(x);
  }

  // x: string | number (after branches merge)
  return x;
}

// ========== 8. Type Predicates ==========

function isFish(pet: NarrowingFish | NarrowingBird): pet is NarrowingFish {
  return (pet as NarrowingFish).swim !== undefined;
}

// Using the type predicate
function usePet(pet: NarrowingFish | NarrowingBird): void {
  if (isFish(pet)) {
    // pet is narrowed to NarrowingFish here
    pet.swim();
  } else {
    // pet is narrowed to NarrowingBird here
    pet.fly();
  }
}

// Type predicate in filter
function getSmallPet(): NarrowingFish | NarrowingBird {
  return Math.random() < 0.5
    ? { swim: () => console.log("swimming") }
    : { fly: () => console.log("flying") };
}

const zoo: (NarrowingFish | NarrowingBird)[] = [
  getSmallPet(),
  getSmallPet(),
  getSmallPet(),
];

const underWater1: NarrowingFish[] = zoo.filter(isFish);
// or equivalently:
const underWater2: NarrowingFish[] = zoo.filter(isFish) as NarrowingFish[];

// More complex predicate
const underWater3: NarrowingFish[] = zoo.filter((pet): pet is NarrowingFish => {
  if ("swim" in pet) {
    return true;
  }
  return false;
});

// ========== 9. Discriminated Unions ==========

interface NarrowingCircle {
  kind: "circle";
  radius: number;
}

interface NarrowingSquare {
  kind: "square";
  sideLength: number;
}

type NarrowingShape = NarrowingCircle | NarrowingSquare;

function getArea(shape: NarrowingShape): number {
  switch (shape.kind) {
    case "circle":
      // shape is narrowed to NarrowingCircle here
      return Math.PI * shape.radius ** 2;
    case "square":
      // shape is narrowed to NarrowingSquare here
      return shape.sideLength ** 2;
  }
}

// Using if/else with discriminated unions
function getAreaIfElse(shape: NarrowingShape): number {
  if (shape.kind === "circle") {
    // shape is narrowed to NarrowingCircle
    return Math.PI * shape.radius ** 2;
  } else {
    // shape is narrowed to NarrowingSquare
    return shape.sideLength ** 2;
  }
}

// Example with more shapes
interface NarrowingRectangle {
  kind: "rectangle";
  width: number;
  height: number;
}

type ExtendedNarrowingShape = NarrowingCircle | NarrowingSquare | NarrowingRectangle;

function getAreaExtended(shape: ExtendedNarrowingShape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    case "rectangle":
      return shape.width * shape.height;
  }
}

// ========== 10. never Type and Exhaustiveness Checking ==========

function getAreaWithNever(shape: NarrowingShape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    default:
      // TypeScript ensures all cases are handled
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }
}

// If we add a new shape type, TypeScript will error:
interface NarrowingTriangle {
  kind: "triangle";
  sideLength: number;
}

type NarrowingShapeWithTriangle = NarrowingCircle | NarrowingSquare | NarrowingTriangle;

// This function intentionally has an error to demonstrate exhaustiveness checking
// Uncomment to see the TypeScript error:
/*
function getAreaWithTriangle(shape: NarrowingShapeWithTriangle): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    default:
      // TypeScript error: Type 'NarrowingTriangle' is not assignable to type 'never'
      // This tells us we forgot to handle the 'triangle' case!
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }
}
*/

// Fixed version:
function getAreaWithTriangleFixed(shape: NarrowingShapeWithTriangle): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    case "triangle":
      // Equilateral triangle: area = (sqrt(3)/4) * side^2
      return (Math.sqrt(3) / 4) * shape.sideLength ** 2;
    default:
      // Now this is safe - all cases are handled
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }
}

// ========== Demo Runner ==========

function run(): void {
  console.log("=== TypeScript Narrowing Examples ===\n");

  console.log("--- 1. typeof Type Guards ---");
  console.log(padLeft(5, "hello"));
  console.log(padLeft("---", "hello"));
  printAll(["a", "b", "c"]);
  printAll("single string");
  printAll(null);

  console.log("\n--- 2. Truthiness Narrowing ---");
  console.log(getUsersOnlineMessage(5));
  console.log(getUsersOnlineMessage(0));
  printAllWithTruthiness(["x", "y"]);
  console.log(multiplyAll([1, 2, 3], 2));
  console.log(multiplyAll(undefined, 2));

  console.log("\n--- 3. Equality Narrowing ---");
  example("hello", "world");
  example(42, true);
  printAllWithNullCheck(["a", "b"]);
  const container: Container = { value: 10 };
  multiplyValue(container, 2);
  console.log("Container value:", container.value);

  console.log("\n--- 4. in Operator Narrowing ---");
  const fish: NarrowingFish = { swim: () => console.log("Swimming!") };
  const bird: NarrowingBird = { fly: () => console.log("Flying!") };
  move(fish);
  move(bird);

  console.log("\n--- 5. instanceof Narrowing ---");
  logValue(new Date());
  logValue("hello world");
  const dog = new Dog("Buddy", "Golden Retriever");
  const animal = new Animal("Generic");
  handleAnimal(dog);
  handleAnimal(animal);
  handleAnimal("string value");

  console.log("\n--- 6. Assignments ---");
  assignmentExample();

  console.log("\n--- 7. Control Flow Analysis ---");
  console.log(padLeftWithControlFlow(3, "test"));
  console.log("Control flow result:", controlFlowExample());

  console.log("\n--- 8. Type Predicates ---");
  const pet1 = getSmallPet();
  usePet(pet1);
  console.log("Filtered fish:", underWater1.length);

  console.log("\n--- 9. Discriminated Unions ---");
  const circle: NarrowingCircle = { kind: "circle", radius: 5 };
  const square: NarrowingSquare = { kind: "square", sideLength: 4 };
  console.log("Circle area:", getArea(circle));
  console.log("Square area:", getArea(square));
  console.log("Circle area (if/else):", getAreaIfElse(circle));

  const rectangle: NarrowingRectangle = { kind: "rectangle", width: 3, height: 4 };
  console.log("Rectangle area:", getAreaExtended(rectangle));

  console.log("\n--- 10. never Type and Exhaustiveness Checking ---");
  console.log("Circle area (with never):", getAreaWithNever(circle));
  const triangle: NarrowingTriangle = { kind: "triangle", sideLength: 5 };
  console.log("Triangle area:", getAreaWithTriangleFixed(triangle));

  console.log("\n--- 11. Expressions Narrowing ---");
  const input = getUserInput();
  // input: string | number
  const inputLength =
    (typeof input === "string" && input.length) || input;
  // input.length shows input is narrowed to string in that expression
  
  console.log("\n--- 12. Assignment with 'as const' ---");
  // Widened type (default behavior)
  const data1 = {
    name: "Zagreus",
  };
  // typeof data1 = { name: string }
  console.log("Widened data1:", data1);
  
  // Literal type with 'as const'
  const data2 = {
    name: "Zagreus",
  } as const;
  // typeof data2 = { name: "Zagreus" }
  console.log("Literal data2:", data2);
  
  // Tracks through related variables
  const response = getResponse();
  const isSuccessResponse = response instanceof SuccessResponse;
  if (isSuccessResponse) {
    console.log("Success response data:", response.data);
  }
  
  // Re-assignment updates types
  let data: string | number = getUserInput();
  // data: string | number
  data = "Hello";
  // data: string
  console.log("Re-assigned data:", data);
  
  console.log("\n--- 13. Assertion Functions ---");
  const res = getResponse();
  // res: SuccessResponse | ErrorResponse
  assertResponse(res);
  // res: SuccessResponse (after assertion)
  console.log("Asserted response:", res.data);
  
  console.log("\n=== All Examples Complete ===");
}

// ========== 11. Expressions (Narrowing on same line) ==========

function getUserInput(): string | number {
  return Math.random() < 0.5 ? "hello" : 42;
}

// Narrowing also occurs on the same line as code, when doing boolean operations
function exampleExpressions(): void {
  const input = getUserInput();
  // input: string | number
  
  // input.length shows input is narrowed to string in that expression
  const inputLength =
    (typeof input === "string" && input.length) || input;
  //          ^^^^^^ input is narrowed to string here
}

// ========== 12. Assignment with 'as const' ==========

// Subfields in objects are treated as though they can be mutated, and during
// assignment the type will be 'widened' to a non-literal version.
// The prefix 'as const' locks all types to their literal versions.

// Example 1: Widened (default behavior)
const data1 = {
  name: "Zagreus",
};
// typeof data1 = { name: string }

// Example 2: Literal with 'as const'
const data2 = {
  name: "Zagreus",
} as const;
// typeof data2 = { name: "Zagreus" }

// Tracks through related variables
class SuccessResponse {
  data: any;
  constructor(data: any) {
    this.data = data;
  }
}

class ErrorResponse {
  error: string;
  constructor(error: string) {
    this.error = error;
  }
}

function getResponse(): SuccessResponse | ErrorResponse {
  return Math.random() < 0.5
    ? new SuccessResponse({ message: "Success" })
    : new ErrorResponse("Error occurred");
}

// CFA tracks through related variables
function tracksThroughVariables(): void {
  const response = getResponse();
  // response: SuccessResponse | ErrorResponse
  
  const isSuccessResponse = response instanceof SuccessResponse;
  // TypeScript tracks this relationship
  
  if (isSuccessResponse) {
    // response: SuccessResponse (narrowed based on isSuccessResponse)
    console.log(response.data);
  }
}

// Re-assignment updates types
function reassignmentExample(): void {
  let data: string | number = getUserInput();
  // data: string | number
  
  data = "Hello";
  // data: string (narrowed after assignment)
  
  console.log(data.toUpperCase());
}

// ========== 13. Assertion Functions ==========

// A function describing CFA changes affecting the current scope,
// because it throws instead of returning false

function assertResponse(obj: any): asserts obj is SuccessResponse {
  if (!(obj instanceof SuccessResponse)) {
    throw new Error("Not a success!");
  }
}

// Usage
function assertionExample(): void {
  const res = getResponse();
  // res: SuccessResponse | ErrorResponse
  
  assertResponse(res);
  // res: SuccessResponse (assertion function changes the current scope)
  
  // Now we can safely access .data
  console.log(res.data);
}

// Assertion function with parameter
function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== "string") {
    throw new Error("Value is not a string");
  }
}

function useAssertion(): void {
  const value: unknown = getUserInput();
  
  assertIsString(value);
  // value: string (after assertion)
  
  console.log(value.toUpperCase()); // Safe to use string methods
}

run();

