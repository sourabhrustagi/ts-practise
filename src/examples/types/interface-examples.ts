/**
 * TypeScript Interface Examples
 * 
 * Comprehensive examples covering all TypeScript interface features including:
 * - Common syntax (properties, methods, optional, readonly)
 * - Extension
 * - Function properties
 * - Callable interfaces
 * - Construct signatures
 * - Index signatures
 * - Generics
 * - Overloads
 * - Get & Set
 * - Extension via merging
 * - Class conformance
 */

// ============================================================================
// 1. Common Syntax - Basic Interface
// ============================================================================

// Used to describe the shape of objects, and can be extended by others
// Almost everything in JavaScript is an object and interface is built to match their runtime behavior

interface JSONResponse {
  version: number; // Field
  
  /** In bytes */ // JSDoc comment attached to show in editors
  payloadSize: number;
  
  outOfStock?: boolean; // This property might not be on the object
  
  // Two ways to describe a property which is a function
  update: (retryTimes: number) => void; // Arrow func field
  updateMethod(retryTimes: number): void; // Function method
  
  readonly body: string; // Tells TypeScript that a property can not be changed
}

// ============================================================================
// 2. Extension
// ============================================================================

interface Response {
  status: number;
  statusText: string;
}

interface HTTPAble {
  headers: Record<string, string>;
}

// Optionally take properties from existing interface or type
interface JSONResponseExtended extends Response, HTTPAble {
  data: any;
}

const response: JSONResponseExtended = {
  status: 200,
  statusText: "OK",
  headers: { "Content-Type": "application/json" },
  data: { message: "Success" },
};

// ============================================================================
// 3. Callable Interface
// ============================================================================

// You can call this object via () - (functions in JS are objects which can be called)
interface CallableFunction {
  (x: number, y: number): number;
}

const add: CallableFunction = (x, y) => x + y;
console.log(add(5, 3)); // 8

// Callable interface with properties
interface CallableWithProperties {
  (name: string): string;
  description: string;
  version: number;
}

const greet: CallableWithProperties = Object.assign(
  (name: string) => `Hello, ${name}!`,
  {
    description: "A greeting function",
    version: 1,
  }
);

console.log(greet("Alice")); // "Hello, Alice!"
console.log(greet.description); // "A greeting function"

// ============================================================================
// 4. Construct Signature
// ============================================================================

// You can use 'new' on the object this interface describes
interface Constructable {
  new (s: string): { value: string };
}

class MyClass {
  constructor(public value: string) {}
}

function createInstance(ctor: Constructable, value: string) {
  return new ctor(value);
}

const instance = createInstance(MyClass, "hello");
console.log(instance.value); // "hello"

// ============================================================================
// 5. Index Signature
// ============================================================================

// Any property not described already is assumed to exist, and all properties must be numbers
interface NumberDictionary {
  [key: string]: number;
  length: number; // OK, length is a number
  // name: string; // Error: Property 'name' of type 'string' is not assignable to 'string' index type 'number'
}

const dict: NumberDictionary = {
  length: 0,
  one: 1,
  two: 2,
  three: 3,
};

// Readonly index signature
interface ReadonlyStringArray {
  readonly [index: number]: string;
}

const readonlyArray: ReadonlyStringArray = ["red", "green", "blue"];
// readonlyArray[2] = "Mallory"; // Error: Index signature in type 'ReadonlyStringArray' only permits reading

// ============================================================================
// 6. Generics
// ============================================================================

// Declare a type which can change in your interface
interface APICall<Response> {
  data: Response; // Used here
}

interface ArtworkCall {
  status: number;
  title: string;
  artist: string;
}

const api: APICall<ArtworkCall> = {
  data: {
    status: 200,
    title: "Starry Night",
    artist: "Van Gogh",
  },
};

console.log(api.data.title); // "Starry Night"

// Constraining Generics
// You can constrain what types are accepted into the generic parameter via the extends keyword
interface APICallConstrained<Response extends { status: number }> {
  // Sets a constraint on the type which means only types with a 'status' property can be used
  data: Response;
}

const constrainedApi: APICallConstrained<ArtworkCall> = {
  data: {
    status: 200,
    title: "The Scream",
    artist: "Munch",
  },
};

console.log(constrainedApi.data.status); // 200

// Multiple type parameters
interface Pair<T, U> {
  first: T;
  second: U;
}

const pair: Pair<string, number> = {
  first: "hello",
  second: 42,
};

// ============================================================================
// 7. Overloads
// ============================================================================

// A callable interface can have multiple definitions for different sets of parameters
interface Expect {
  (matcher: boolean): string;
  (matcher: string): boolean;
}

// Implementation would need to handle both cases
const expectFunction: Expect = ((matcher: boolean | string) => {
  if (typeof matcher === "boolean") {
    return matcher ? "true" : "false";
  } else {
    return matcher.length > 0;
  }
}) as Expect;

console.log(expectFunction(true)); // "true"
console.log(expectFunction("hello")); // true

// ============================================================================
// 8. Get & Set
// ============================================================================

// Objects can have custom getters or setters
interface Ruler {
  get size(): number;
  set size(value: number | string);
}

class RulerImpl implements Ruler {
  private _size: number = 0;
  
  get size(): number {
    return this._size;
  }
  
  set size(value: number | string) {
    if (typeof value === "string") {
      this._size = parseInt(value, 10);
    } else {
      this._size = value;
    }
  }
}

const r: Ruler = new RulerImpl();
r.size = 12;
console.log(r.size); // 12
r.size = "36";
console.log(r.size); // 36

// ============================================================================
// 9. Extension via Merging
// ============================================================================

// Interfaces are merged, so multiple declarations will add new fields to the type definition
// Note: For merging to work, both declarations must have the same type parameters (or none)
interface APICallMerged {
  data: Response;
}

interface APICallMerged {
  error?: Error;
}

// Now APICallMerged has both 'data' and 'error' properties
const apiCall: APICallMerged = {
  data: {
    status: 200,
    statusText: "OK",
  },
  error: undefined,
};

// Another merging example
interface Window {
  customProperty: string;
}

// If you're in a browser environment, you could augment the Window interface
// declare global {
//   interface Window {
//     myCustomMethod(): void;
//   }
// }

// ============================================================================
// 10. Class Conformance
// ============================================================================

// You can ensure a class conforms to an interface via implements
interface Syncable {
  sync(): void;
}

class Account implements Syncable {
  id: string;
  name: string;
  
  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
  
  sync(): void {
    console.log(`Syncing account ${this.id}`);
  }
}

const account = new Account("123", "Alice");
account.sync(); // "Syncing account 123"

// Implementing multiple interfaces
interface Serializable {
  serialize(): string;
}

interface Updatable {
  update(data: any): void;
}

class UserAccount implements Syncable, Serializable, Updatable {
  id: string;
  name: string;
  email: string;
  
  constructor(id: string, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
  
  sync(): void {
    console.log(`Syncing user ${this.id}`);
  }
  
  serialize(): string {
    return JSON.stringify({ id: this.id, name: this.name, email: this.email });
  }
  
  update(data: Partial<UserAccount>): void {
    if (data.name) this.name = data.name;
    if (data.email) this.email = data.email;
  }
}

// ============================================================================
// 11. Complex Examples
// ============================================================================

// Event emitter interface
interface EventEmitter<T> {
  on(event: string, callback: (data: T) => void): void;
  emit(event: string, data: T): void;
  off(event: string, callback: (data: T) => void): void;
}

// Repository pattern interface
interface Repository<T extends { id: string }> {
  findById(id: string): T | undefined;
  findAll(): T[];
  save(entity: T): void;
  delete(id: string): void;
}

// Generic repository implementation
class InMemoryRepository<T extends { id: string }> implements Repository<T> {
  private entities: Map<string, T> = new Map();
  
  findById(id: string): T | undefined {
    return this.entities.get(id);
  }
  
  findAll(): T[] {
    return Array.from(this.entities.values());
  }
  
  save(entity: T): void {
    this.entities.set(entity.id, entity);
  }
  
  delete(id: string): void {
    this.entities.delete(id);
  }
}

interface Product {
  id: string;
  name: string;
  price: number;
}

const productRepo: Repository<Product> = new InMemoryRepository<Product>();
productRepo.save({ id: "1", name: "Laptop", price: 999 });
productRepo.save({ id: "2", name: "Mouse", price: 29 });

console.log(productRepo.findAll()); // Array of products

// ============================================================================
// 12. Interface with Optional Chaining
// ============================================================================

interface Config {
  api?: {
    baseUrl?: string;
    timeout?: number;
  };
  database?: {
    host?: string;
    port?: number;
  };
}

function getApiBaseUrl(config: Config): string {
  return config.api?.baseUrl ?? "https://api.example.com";
}

// ============================================================================
// Export Examples
// ============================================================================

export {
  JSONResponse,
  Response,
  HTTPAble,
  JSONResponseExtended,
  CallableFunction,
  CallableWithProperties,
  Constructable,
  NumberDictionary,
  ReadonlyStringArray,
  APICall,
  ArtworkCall,
  APICallConstrained,
  Pair,
  Expect,
  Ruler,
  Syncable,
  Serializable,
  Updatable,
  Account,
  UserAccount,
  EventEmitter,
  Repository,
  InMemoryRepository,
  Product,
  Config,
};

