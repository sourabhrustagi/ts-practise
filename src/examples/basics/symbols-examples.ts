/**
 * TypeScript Symbols Examples
 * 
 * Starting with ECMAScript 2015, symbol is a primitive data type,
 * just like number and string.
 * 
 * This file demonstrates:
 * - Basic Symbol creation and uniqueness
 * - Symbols as object property keys
 * - Computed property declarations with symbols
 * - unique symbol type
 * - Well-known Symbols (built-in symbols)
 */

// ============================================================================
// 1. BASIC SYMBOL CREATION
// ============================================================================

/**
 * Symbol values are created by calling the Symbol constructor.
 * Symbols are immutable and unique.
 */

console.log("=== BASIC SYMBOL CREATION ===");

// Creating symbols
let basicSym1 = Symbol();
let basicSym2 = Symbol("key"); // optional string key
let basicSym3 = Symbol("key");

console.log("basicSym1:", basicSym1);
console.log("basicSym2:", basicSym2);
console.log("basicSym3:", basicSym3);

// Symbols are unique - even with the same key
console.log("basicSym2 === basicSym3:", basicSym2 === basicSym3); // false, symbols are unique

// Symbol description
const symWithDescription = Symbol("My unique identifier");
console.log("Symbol description:", symWithDescription.toString()); // "Symbol(My unique identifier)"
console.log("Symbol description (alternative):", String(symWithDescription));

// ============================================================================
// 2. SYMBOLS AS OBJECT PROPERTY KEYS
// ============================================================================

/**
 * Just like strings, symbols can be used as keys for object properties.
 * Symbol properties are not enumerable by default.
 */

console.log("\n=== SYMBOLS AS OBJECT PROPERTY KEYS ===");

const sym = Symbol();
let obj: { [key: string]: any; [sym]: string } = {
  [sym]: "value",
  regularKey: "regular value",
};

console.log("obj[sym]:", obj[sym]); // "value"
console.log("obj.regularKey:", obj.regularKey); // "regular value"

// Symbol properties are not enumerable
console.log("Object.keys(obj):", Object.keys(obj)); // ["regularKey"] - sym is not included
console.log("Object.getOwnPropertySymbols(obj):", Object.getOwnPropertySymbols(obj)); // [Symbol()]

// Accessing all properties (including symbols)
const allKeys = [...Object.keys(obj), ...Object.getOwnPropertySymbols(obj)];
console.log("All keys:", allKeys);

// Using Reflect to get all property keys
const allOwnKeys = Reflect.ownKeys(obj);
console.log("Reflect.ownKeys(obj):", allOwnKeys);

// ============================================================================
// 3. COMPUTED PROPERTY DECLARATIONS
// ============================================================================

/**
 * Symbols can be combined with computed property declarations to declare
 * object properties and class members.
 */

console.log("\n=== COMPUTED PROPERTY DECLARATIONS ===");

const getClassNameSymbol = Symbol();
class C {
  [getClassNameSymbol]() {
    return "C";
  }

  public name = "Class C";

  getClassName() {
    return this[getClassNameSymbol]();
  }
}

let c = new C();
let className = c[getClassNameSymbol](); // "C"
console.log("ClassName:", className);
console.log("Via method:", c.getClassName());

// Using symbols for private-like properties
const privateDataSymbol = Symbol("privateData");
class Example {
  [privateDataSymbol]: string = "This is private";

  getPrivateData(): string {
    return this[privateDataSymbol];
  }

  setPrivateData(value: string): void {
    this[privateDataSymbol] = value;
  }
}

const example = new Example();
console.log("Private data:", example.getPrivateData());
example.setPrivateData("Updated private data");
console.log("Updated private data:", example.getPrivateData());

// ============================================================================
// 4. UNIQUE SYMBOL TYPE
// ============================================================================

/**
 * unique symbol is a subtype of symbol, and are produced only from calling
 * Symbol() or Symbol.for(), or from explicit type annotations.
 * This type is only allowed on const declarations and readonly static properties.
 */

console.log("\n=== UNIQUE SYMBOL TYPE ===");

// Declaring unique symbols
// Note: declare const is used for type-only declarations
// declare const uniqueSym1: unique symbol;

// Works - const declaration with unique symbol type
const uniqueSymA: unique symbol = Symbol();
const uniqueSymB: unique symbol = Symbol();

// Works - refers to a unique symbol, but its identity is tied to the declaration
// let uniqueSymC: typeof uniqueSymA = uniqueSymA; // Would work

// Also works - static readonly property
class UniqueSymbolClass {
  static readonly StaticSymbol: unique symbol = Symbol();

  getStaticSymbol() {
    return UniqueSymbolClass.StaticSymbol;
  }
}

console.log("Static unique symbol:", UniqueSymbolClass.StaticSymbol);

// Each unique symbol has a completely separate identity
// No two unique symbol types are assignable or comparable to each other
const regularSym1 = Symbol();
const regularSym2 = Symbol();

// TypeScript will warn that this comparison appears to be unintentional
// if (regularSym1 === regularSym2) {
//   // This comparison appears to be unintentional because the types
//   // 'typeof regularSym1' and 'typeof regularSym2' have no overlap.
// }

// ============================================================================
// 5. SYMBOL.FOR() AND SYMBOL.KEYFOR()
// ============================================================================

console.log("\n=== SYMBOL.FOR() AND SYMBOL.KEYFOR() ===");

// Symbol.for() creates or retrieves a symbol from the global symbol registry
const globalSym1 = Symbol.for("shared");
const globalSym2 = Symbol.for("shared");

// Note: TypeScript may show a warning, but this is intentional - Symbol.for() returns the same symbol
console.log("globalSym1 === globalSym2:", (globalSym1 as any) === (globalSym2 as any)); // true - same symbol!

// Symbol.keyFor() retrieves the key for a symbol from the global registry
const key = Symbol.keyFor(globalSym1);
console.log("Key for globalSym1:", key); // "shared"

// Regular symbols are not in the registry
const regularSym = Symbol("regular");
console.log("Symbol.keyFor(regularSym):", Symbol.keyFor(regularSym)); // undefined

// ============================================================================
// 6. WELL-KNOWN SYMBOLS: Symbol.iterator
// ============================================================================

/**
 * A method that returns the default iterator for an object.
 * Called by the semantics of the for-of statement.
 */

console.log("\n=== Symbol.iterator ===");

class NumberRange implements Iterable<number> {
  constructor(
    private start: number,
    private end: number,
    private step: number = 1
  ) {}

  *[Symbol.iterator](): Iterator<number> {
    for (let i = this.start; i < this.end; i += this.step) {
      yield i;
    }
  }
}

const range = new NumberRange(1, 6);
console.log("NumberRange iteration:");
for (const num of range) {
  console.log(num); // 1, 2, 3, 4, 5
}

// Converting to array
const rangeArray = [...range];
console.log("Range as array:", rangeArray);

// ============================================================================
// 7. WELL-KNOWN SYMBOLS: Symbol.asyncIterator
// ============================================================================

/**
 * A method that returns async iterator for an object, compatible to be used
 * with for await..of loop.
 */

console.log("\n=== Symbol.asyncIterator ===");

class AsyncNumberRange {
  constructor(
    private start: number,
    private end: number,
    private step: number = 1
  ) {}

  async *["Symbol.asyncIterator" as any]() {
    for (let i = this.start; i < this.end; i += this.step) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      yield i;
    }
  }
}

async function demonstrateAsyncIterator() {
  console.log("AsyncNumberRange iteration:");
  const asyncRange = new AsyncNumberRange(1, 4);
  for await (const num of asyncRange as any) {
    console.log(num);
  }
}
// Uncomment to run: demonstrateAsyncIterator();

// ============================================================================
// 8. WELL-KNOWN SYMBOLS: Symbol.hasInstance
// ============================================================================

/**
 * A method that determines if a constructor object recognizes an object as
 * one of the constructor's instances. Called by the semantics of the
 * instanceof operator.
 */

console.log("\n=== Symbol.hasInstance ===");

class MyArray {
  static [Symbol.hasInstance](instance: any): boolean {
    return Array.isArray(instance);
  }
}

const arr = [1, 2, 3];
console.log("arr instanceof MyArray:", arr instanceof MyArray); // true
console.log("arr instanceof Array:", arr instanceof Array); // true

class EvenNumber {
  static [Symbol.hasInstance](instance: any): boolean {
    return typeof instance === "number" && instance % 2 === 0;
  }
}

// Note: Using type assertion for primitive instanceof (which works at runtime)
console.log("4 instanceof EvenNumber:", (4 as any) instanceof EvenNumber); // true
console.log("5 instanceof EvenNumber:", (5 as any) instanceof EvenNumber); // false

// ============================================================================
// 9. WELL-KNOWN SYMBOLS: Symbol.isConcatSpreadable
// ============================================================================

/**
 * A Boolean value indicating that an object should be flattened to its
 * array elements by Array.prototype.concat.
 */

console.log("\n=== Symbol.isConcatSpreadable ===");

const array1 = [1, 2, 3];
const array2 = [4, 5, 6];

// Default behavior - arrays are spread
const concat1 = array1.concat(array2);
console.log("Default concat:", concat1); // [1, 2, 3, 4, 5, 6]

// Preventing spreading
const array3 = [7, 8, 9];
(array3 as any)[Symbol.isConcatSpreadable] = false;
const concat2 = array1.concat(array3 as any);
console.log("Concat without spreading:", concat2); // [1, 2, 3, [7, 8, 9]]

// Enabling spreading for non-array objects
const arrayLike = {
  0: "a",
  1: "b",
  2: "c",
  length: 3,
};
(arrayLike as any)[Symbol.isConcatSpreadable] = true;
const concat3 = array1.concat(arrayLike as any);
console.log("Concat with array-like:", concat3); // [1, 2, 3, "a", "b", "c"]

// ============================================================================
// 10. WELL-KNOWN SYMBOLS: Symbol.match
// ============================================================================

/**
 * A regular expression method that matches the regular expression against a string.
 * Called by the String.prototype.match method.
 */

console.log("\n=== Symbol.match ===");

class CustomMatcher {
  constructor(private pattern: string) {}

  [Symbol.match](str: string): RegExpMatchArray | null {
    const index = str.indexOf(this.pattern);
    if (index === -1) return null;
    return {
      0: this.pattern,
      index: index,
      input: str,
      groups: undefined,
      length: 1,
    } as unknown as RegExpMatchArray;
  }
}

const matcher = new CustomMatcher("hello");
const result = "world hello".match(matcher as any);
console.log("Custom match result:", result);

// ============================================================================
// 11. WELL-KNOWN SYMBOLS: Symbol.replace
// ============================================================================

/**
 * A regular expression method that replaces matched substrings of a string.
 * Called by the String.prototype.replace method.
 */

console.log("\n=== Symbol.replace ===");

class CustomReplacer {
  constructor(private pattern: string, private replacement: string) {}

  [Symbol.replace](str: string): string {
    return str.replace(new RegExp(this.pattern, "g"), this.replacement);
  }
}

const replacer = new CustomReplacer("world", "TypeScript");
// Note: replace() method signature, but we're using custom implementation
const replaced = (replacer as any)[Symbol.replace]("hello world");
console.log("Custom replace:", replaced); // "hello TypeScript"

// ============================================================================
// 12. WELL-KNOWN SYMBOLS: Symbol.search
// ============================================================================

/**
 * A regular expression method that returns the index within a string that
 * matches the regular expression. Called by the String.prototype.search method.
 */

console.log("\n=== Symbol.search ===");

class CustomSearcher {
  constructor(private pattern: string) {}

  [Symbol.search](str: string): number {
    return str.indexOf(this.pattern);
  }
}

const searcher = new CustomSearcher("world");
// Note: search() method signature, but we're using custom implementation
const searchIndex = (searcher as any)[Symbol.search]("hello world");
console.log("Custom search index:", searchIndex); // 6

// ============================================================================
// 13. WELL-KNOWN SYMBOLS: Symbol.split
// ============================================================================

/**
 * A regular expression method that splits a string at the indices that match
 * the regular expression. Called by the String.prototype.split method.
 */

console.log("\n=== Symbol.split ===");

class CustomSplitter {
  constructor(private delimiter: string) {}

  [Symbol.split](str: string): string[] {
    return str.split(this.delimiter);
  }
}

const splitter = new CustomSplitter(",");
const splitResult = "a,b,c".split(splitter as any);
console.log("Custom split:", splitResult); // ["a", "b", "c"]

// ============================================================================
// 14. WELL-KNOWN SYMBOLS: Symbol.species
// ============================================================================

/**
 * A function valued property that is the constructor function that is used
 * to create derived objects.
 */

console.log("\n=== Symbol.species ===");

class MyArrayClass extends Array {
  static get [Symbol.species]() {
    return Array; // Use Array instead of MyArrayClass for derived objects
  }
}

const myArray = new MyArrayClass();
myArray.push(1, 2, 3);
const mapped = myArray.map((x) => x * 2);

console.log("myArray instanceof MyArrayClass:", myArray instanceof MyArrayClass); // true
console.log("mapped instanceof MyArrayClass:", mapped instanceof MyArrayClass); // false
console.log("mapped instanceof Array:", mapped instanceof Array); // true

// ============================================================================
// 15. WELL-KNOWN SYMBOLS: Symbol.toPrimitive
// ============================================================================

/**
 * A method that converts an object to a corresponding primitive value.
 * Called by the ToPrimitive abstract operation.
 */

console.log("\n=== Symbol.toPrimitive ===");

class Temperature {
  constructor(private celsius: number) {}

  [Symbol.toPrimitive](hint: "string" | "number" | "default"): string | number {
    if (hint === "number") {
      return this.celsius;
    }
    if (hint === "string") {
      return `${this.celsius}°C`;
    }
    return this.celsius; // default
  }
}

const temp = new Temperature(25);
console.log("Number coercion:", +temp); // 25
console.log("String coercion:", String(temp)); // "25°C"
// Default coercion uses Symbol.toPrimitive with "default" hint
console.log("Default coercion:", Number(temp) + 5); // 30

// ============================================================================
// 16. WELL-KNOWN SYMBOLS: Symbol.toStringTag
// ============================================================================

/**
 * A String value that is used in the creation of the default string description
 * of an object. Called by the built-in method Object.prototype.toString.
 */

console.log("\n=== Symbol.toStringTag ===");

class CustomClass {
  [Symbol.toStringTag] = "CustomClass";

  toString(): string {
    return `[object ${this[Symbol.toStringTag]}]`;
  }
}

const custom = new CustomClass();
console.log("Object.prototype.toString:", Object.prototype.toString.call(custom)); // "[object CustomClass]"
console.log("Custom toString:", custom.toString());

class MyCollection {
  [Symbol.toStringTag] = "MyCollection";
}

const collection = new MyCollection();
console.log("Collection toString:", Object.prototype.toString.call(collection)); // "[object MyCollection]"

// ============================================================================
// 17. WELL-KNOWN SYMBOLS: Symbol.unscopables
// ============================================================================

/**
 * An Object whose own property names are property names that are excluded from
 * the 'with' environment bindings of the associated objects.
 */

console.log("\n=== Symbol.unscopables ===");

// Note: 'with' statement is deprecated, but Symbol.unscopables still exists
const objWithUnscopables: any = {
  a: 1,
  b: 2,
  c: 3,
};

objWithUnscopables[Symbol.unscopables] = {
  b: true, // 'b' is excluded from 'with' bindings
};

// Example of what unscopables does (though 'with' is deprecated)
// with (objWithUnscopables) {
//   console.log(a); // 1
//   console.log(b); // ReferenceError (if unscopables excludes b)
//   console.log(c); // 3
// }

// Modern usage: preventing certain properties from being accessed in with statements
console.log("Unscopables object:", objWithUnscopables[Symbol.unscopables]);

// ============================================================================
// 18. PRACTICAL EXAMPLES: Private Properties
// ============================================================================

console.log("\n=== PRACTICAL EXAMPLES: Private Properties ===");

// Using symbols to create truly private properties (not accessible via Object.keys)
const _privateData = Symbol("privateData");
const _privateMethod = Symbol("privateMethod");

class DataContainer {
  public publicData: string = "public";

  [_privateData]: string = "private";

  [_privateMethod](): string {
    return "This is a private method";
  }

  getPrivateData(): string {
    return this[_privateData];
  }

  callPrivateMethod(): string {
    return this[_privateMethod]();
  }
}

const container = new DataContainer();
console.log("Public data:", container.publicData);
console.log("Private data:", container.getPrivateData());
console.log("Private method:", container.callPrivateMethod());

// Symbol properties are not enumerable
console.log("Object.keys:", Object.keys(container)); // ["publicData"]
console.log("Symbols:", Object.getOwnPropertySymbols(container)); // [Symbol(privateData), Symbol(privateMethod)]

// ============================================================================
// 19. PRACTICAL EXAMPLES: Metadata Storage
// ============================================================================

console.log("\n=== PRACTICAL EXAMPLES: Metadata Storage ===");

// Using symbols to store metadata without polluting the object's property space
const metadataSymbol = Symbol("metadata");

interface Metadata {
  version: number;
  author: string;
  createdAt: Date;
}

function attachMetadata(obj: any, metadata: Metadata): void {
  obj[metadataSymbol] = metadata;
}

function getMetadata(obj: any): Metadata | undefined {
  return obj[metadataSymbol];
}

const myObject: any = { name: "My Object" };
attachMetadata(myObject, {
  version: 1.0,
  author: "Developer",
  createdAt: new Date(),
});

console.log("Object:", myObject);
console.log("Metadata:", getMetadata(myObject));
console.log("Object keys:", Object.keys(myObject)); // ["name"] - metadata not visible

// ============================================================================
// 20. PRACTICAL EXAMPLES: Event Emitter Pattern
// ============================================================================

console.log("\n=== PRACTICAL EXAMPLES: Event Emitter Pattern ===");

const listenersSymbol = Symbol("listeners");

class SimpleEventEmitter {
  [listenersSymbol]: Map<string, Function[]> = new Map();

  on(event: string, listener: Function): void {
    if (!this[listenersSymbol].has(event)) {
      this[listenersSymbol].set(event, []);
    }
    this[listenersSymbol].get(event)!.push(listener);
  }

  emit(event: string, ...args: any[]): void {
    const listeners = this[listenersSymbol].get(event);
    if (listeners) {
      listeners.forEach((listener) => listener(...args));
    }
  }

  off(event: string, listener: Function): void {
    const listeners = this[listenersSymbol].get(event);
    if (listeners) {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }
}

const emitter = new SimpleEventEmitter();
emitter.on("data", (data: string) => {
  console.log("Received data:", data);
});

emitter.emit("data", "Hello from emitter!");
console.log("Listeners symbol:", Object.getOwnPropertySymbols(emitter));

// ============================================================================
// 21. SUMMARY
// ============================================================================

console.log("\n=== SUMMARY ===");
console.log("Key concepts demonstrated:");
console.log("1. Basic Symbol creation and uniqueness");
console.log("2. Symbols as object property keys");
console.log("3. Computed property declarations");
console.log("4. unique symbol type");
console.log("5. Symbol.for() and Symbol.keyFor()");
console.log("6. Well-known Symbols:");
console.log("   - Symbol.iterator");
console.log("   - Symbol.asyncIterator");
console.log("   - Symbol.hasInstance");
console.log("   - Symbol.isConcatSpreadable");
console.log("   - Symbol.match");
console.log("   - Symbol.replace");
console.log("   - Symbol.search");
console.log("   - Symbol.split");
console.log("   - Symbol.species");
console.log("   - Symbol.toPrimitive");
console.log("   - Symbol.toStringTag");
console.log("   - Symbol.unscopables");
console.log("7. Practical examples (private properties, metadata, events)");

export {};

