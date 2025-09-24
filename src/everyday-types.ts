/*
  Everyday Types - runnable examples covering:
  - Primitives: string, number, boolean
  - Arrays
  - any and noImplicitAny
  - Type annotations and inference
  - Functions: params, returns, promises, anonymous/contextual typing
  - Object types and optional properties
  - Union types and narrowing
  - Type aliases and interfaces (with differences)
  - Type assertions
  - Literal types and literal inference (including as const)
  - null/undefined with strictNullChecks and non-null assertion
  - Enums (brief)
  - Less common primitives: bigint, symbol
*/

// ---------- Primitives ----------
const message: string = "Hello, world";
const answer: number = 42;
const isActive: boolean = true;

// ---------- Arrays ----------
const numbers: number[] = [1, 2, 3];
const names: Array<string> = ["Alice", "Bob", "Eve"];

// ---------- any ----------
let mystery: any = { x: 0 };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(mystery as any).foo?.();
mystery = "hello";
const coercedNumber: number = mystery; // allowed because mystery is any

// ---------- Type annotations & inference ----------
let myNameExplicit: string = "Alice";
let myNameInferred = "Alice"; // inferred string

// ---------- Functions ----------
function greet(name: string): void {
  console.log("Hello, " + name.toUpperCase() + "!!");
}

function getFavoriteNumber(): number {
  return 26;
}

async function getFavoriteNumberAsync(): Promise<number> {
  return 26;
}

// Anonymous/contextual typing
["Alice", "Bob", "Eve"].forEach((s) => {
  console.log(s.toUpperCase());
});

// ---------- Object types & optional properties ----------
function printCoord(pt: { x: number; y: number }): void {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

function printName(obj: { first: string; last?: string }): void {
  if (obj.last !== undefined) {
    console.log(obj.first + " " + obj.last.toUpperCase());
  } else {
    console.log(obj.first);
  }
  console.log(obj.last?.toUpperCase());
}

// ---------- Union types & narrowing ----------
function printId(id: number | string): void {
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id);
  }
}

function welcomePeople(x: string[] | string): void {
  if (Array.isArray(x)) {
    console.log("Hello, " + x.join(" and "));
  } else {
    console.log("Welcome lone traveler " + x);
  }
}

function getFirstThree(x: number[] | string): number[] | string {
  return x.slice(0, 3);
}

// ---------- Type aliases & interfaces ----------
type Point = { x: number; y: number };
function printCoordAlias(pt: Point): void {
  console.log("x: " + pt.x + ", y: " + pt.y);
}

interface PointI { x: number; y: number }
function printCoordInterface(pt: PointI): void {
  console.log("x: " + pt.x + ", y: " + pt.y);
}

// Differences demo
interface Animal { name: string }
interface Bear extends Animal { honey: boolean }

type AnimalT = { name: string }
type BearT = AnimalT & { honey: boolean }

// ---------- Type assertions ----------
// Example using DOM types guarded behind existence checks to keep Node-friendly runtime
function asCanvas(element: unknown): void {
  // In real browser code:
  // const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
  if (typeof element === "object" && element !== null) {
    const assumed = element as { id?: string };
    console.log(assumed.id ?? "no-id");
  }
}

// ---------- Literal types & inference ----------
let changingString = "Hello World";
changingString = "Olá Mundo";

const constantString = "Hello World" as const;

function printText(s: string, alignment: "left" | "right" | "center"): void {
  console.log(`${alignment}: ${s}`);
}

function compare(a: string, b: string): -1 | 0 | 1 {
  return a === b ? 0 : a > b ? 1 : -1;
}

interface Options { width: number }
function configure(x: Options | "auto"): void {
  console.log(typeof x === "string" ? "auto" : `width=${x.width}`);
}

// Literal inference pitfalls and fixes
function handleRequest(url: string, method: "GET" | "POST"): void {
  console.log(`${method} ${url}`);
}

const req1 = { url: "https://example.com", method: "GET" as const };
handleRequest(req1.url, req1.method);

const req2 = { url: "https://example.com", method: "GET" } as const;
handleRequest(req2.url, req2.method);

// ---------- null and undefined, non-null assertion ----------
function doSomething(x: string | null): void {
  if (x === null) {
    // do nothing
  } else {
    console.log("Hello, " + x.toUpperCase());
  }
}

function liveDangerously(x?: number | null): void {
  console.log(x!.toFixed());
}

// ---------- Enums (brief) ----------
// Prefer union literals, but demo enum existence
enum Direction { Up = "UP", Down = "DOWN", Left = "LEFT", Right = "RIGHT" }

// ---------- Less common primitives ----------
const oneHundred: bigint = BigInt(100);
const anotherHundred: bigint = 100n;

const firstName: symbol = Symbol("name");
const secondName: symbol = Symbol("name");
const areSame = firstName === secondName; // always false

// ---------- Demo runner ----------
function run(): void {
  console.log("-- Primitives --", message, answer, isActive);
  console.log("-- Arrays --", numbers, names);
  greet("TypeScript");
  console.log("favorite:", getFavoriteNumber());
  getFavoriteNumberAsync().then((n) => console.log("favorite async:", n));

  printCoord({ x: 3, y: 7 });
  printName({ first: "Bob" });
  printName({ first: "Alice", last: "Alisson" });

  printId(101);
  printId("202");
  welcomePeople(["Alice", "Bob"]);
  welcomePeople("Eve");
  console.log(getFirstThree([1, 2, 3, 4]));
  console.log(getFirstThree("abcdef"));

  printCoordAlias({ x: 100, y: 100 });
  printCoordInterface({ x: 10, y: 20 });

  const bear: Bear = { name: "Winnie", honey: true };
  const bearT: BearT = { name: "Pooh", honey: true };
  console.log(bear, bearT);

  asCanvas({ id: "main_canvas" });

  printText("Hello, world", "left");
  console.log(compare("a", "b"));
  configure({ width: 100 });
  configure("auto");

  doSomething("Hello");
  // liveDangerously(); // would throw at runtime if undefined/null

  console.log(Direction.Up);
  console.log(oneHundred, anotherHundred);
  console.log("symbols equal?", areSame);
}

run();
