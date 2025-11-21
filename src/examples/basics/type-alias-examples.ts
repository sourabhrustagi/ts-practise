/**
 * TypeScript Type Alias Examples
 * 
 * Comprehensive examples covering all TypeScript type alias features including:
 * - Type vs Interface
 * - Primitive types
 * - Object literal types
 * - Tuple types
 * - Union types
 * - Intersection types
 * - Type indexing
 * - Type from value (typeof)
 * - Type from function return
 * - Type from module
 * - Mapped types
 * - Conditional types
 * - Template union types
 */

// ============================================================================
// 1. Type vs Interface
// ============================================================================

// Key differences:
// - Interfaces can only describe object shapes
// - Interfaces can be extended by declaring it multiple times (declaration merging)
// - In performance critical types, interface comparison checks can be faster
// - Types support more rich type-system features than interfaces

// Type alias for object
type PersonType = {
  name: string;
  age: number;
};

// Interface for object
interface PersonInterface {
  name: string;
  age: number;
}

// Types can represent unions, intersections, primitives, tuples, etc.
// Interfaces can only represent object shapes

// ============================================================================
// 2. Think of Types Like Variables
// ============================================================================

// Much like how you can create variables with the same name in different scopes,
// a type has similar semantics

{
  type LocalType = string;
  const value: LocalType = "hello";
}

{
  type LocalType = number; // Different scope, same name
  const value: LocalType = 42;
}

// ============================================================================
// 3. Primitive Type
// ============================================================================

// Useful for documentation mainly
type SanitizedInput = string;
type MissingNo = 404;
type UserID = string;
type Email = string;

function processInput(input: SanitizedInput): void {
  console.log("Processing:", input);
}

// ============================================================================
// 4. Object Literal Type
// ============================================================================

type Location = {
  x: number;
  y: number;
};

type JSONResponse = {
  version: number; // Field
  /** In bytes */ // Attached docs
  payloadSize: number;
  outOfStock?: boolean; // Optional
  update: (retryTimes: number) => void; // Arrow func field
  updateMethod(retryTimes: number): void; // Function
  (): JSONResponse; // Type is callable
  [key: string]: number; // Accepts any index
  new (s: string): JSONResponse; // Newable
  readonly body: string; // Readonly property
};

// ============================================================================
// 5. Tuple Type
// ============================================================================

// A tuple is a special-cased array with known types at specific indexes
type Data = [
  location: Location,
  timestamp: string,
];

type StringNumberPair = [string, number];

function processData(data: Data): void {
  const [location, timestamp] = data;
  console.log(`Location: (${location.x}, ${location.y}), Time: ${timestamp}`);
}

// Optional tuple elements
type Either2dOr3d = [number, number, number?];

// Rest elements in tuples
type StringNumberBooleans = [string, number, ...boolean[]];

// ============================================================================
// 6. Union Type
// ============================================================================

// Describes a type which is one of many options, for example a list of known strings
type Size = "small" | "medium" | "large";

type Status = "pending" | "approved" | "rejected";

type ID = string | number;

function getSize(size: Size): string {
  return `Size is ${size}`;
}

// Union of object types
type SuccessResponse = {
  status: 200;
  data: any;
};

type ErrorResponse = {
  status: 400 | 500;
  error: string;
};

type APIResponse = SuccessResponse | ErrorResponse;

function handleResponse(response: APIResponse): void {
  if (response.status === 200) {
    console.log("Success:", response.data);
  } else {
    console.log("Error:", response.error);
  }
}

// ============================================================================
// 7. Intersection Types
// ============================================================================

// A way to merge/extend types
type LocationX = { x: number };
type LocationY = { y: number };

type LocationXY = LocationX & LocationY;
// Result: { x: number, y: number }

const point: LocationXY = { x: 10, y: 20 };

// Intersection with union
type Colorful = { color: string };
type Circle = { radius: number };

type ColorfulCircle = Colorful & Circle;

function draw(circle: ColorfulCircle): void {
  console.log(`Drawing ${circle.color} circle with radius ${circle.radius}`);
}

// ============================================================================
// 8. Type Indexing
// ============================================================================

// A way to extract and name from a subset of a type
type Response = {
  data: {
    users: Array<{ id: string; name: string }>;
    count: number;
  };
  metadata: {
    timestamp: string;
    version: string;
  };
};

type Data = Response["data"];
// Result: { users: Array<{ id: string; name: string }>, count: number }

type Metadata = Response["metadata"];
// Result: { timestamp: string; version: string }

type Users = Response["data"]["users"];
// Result: Array<{ id: string; name: string }>

// Indexing with union
type DataOrMetadata = Response["data" | "metadata"];

// ============================================================================
// 9. Type from Value (typeof)
// ============================================================================

// Re-use the type from an existing JavaScript runtime value via the typeof operator

const data = {
  name: "Alice",
  age: 30,
  email: "alice@example.com",
};

type Data = typeof data;
// Result: { name: string; age: number; email: string }

// Using typeof with functions
function createUser(name: string, age: number) {
  return {
    name,
    age,
    createdAt: new Date(),
  };
}

type User = ReturnType<typeof createUser>;
// Result: { name: string; age: number; createdAt: Date }

// ============================================================================
// 10. Type from Function Return
// ============================================================================

// Re-use the return value from a function as a type

const createFixtures = () => {
  return {
    users: [
      { id: "1", name: "Alice" },
      { id: "2", name: "Bob" },
    ],
    settings: {
      theme: "dark",
      language: "en",
    },
  };
};

type Fixtures = ReturnType<typeof createFixtures>;

function test(fixture: Fixtures): void {
  console.log("Testing with fixtures:", fixture);
}

// ============================================================================
// 11. Type from Module
// ============================================================================

// Import types from modules
// const data: import("./data").data

// This is useful when you need to reference a type from another module
// without importing it directly

// Example (commented out as it would require actual module):
// type DataFromModule = import("./other-module").SomeType;

// ============================================================================
// 12. Mapped Types
// ============================================================================

// Acts like a map statement for the type system, allowing an input type
// to change the structure of the new type

type Artist = { name: string; bio: string };

// Loop through each field in the type generic parameter "Type"
// Sets type as a function with original type as param
type Subscriber<Type> = {
  [Property in keyof Type]: (newValue: Type[Property]) => void;
};

type ArtistSub = Subscriber<Artist>;
// Result:
// {
//   name: (nv: string) => void;
//   bio: (nv: string) => void;
// }

// Readonly mapped type
type ReadonlyType<T> = {
  readonly [P in keyof T]: T[P];
};

type ReadonlyArtist = ReadonlyType<Artist>;
// Result: { readonly name: string; readonly bio: string }

// Partial mapped type
type PartialType<T> = {
  [P in keyof T]?: T[P];
};

type PartialArtist = PartialType<Artist>;
// Result: { name?: string; bio?: string }

// Pick mapped type
type PickType<T, K extends keyof T> = {
  [P in K]: T[P];
};

type ArtistName = PickType<Artist, "name">;
// Result: { name: string }

// ============================================================================
// 13. Conditional Types
// ============================================================================

// Acts as 'if statements' inside the type system. Created via generics, and then
// commonly used to reduce the number of options in a type union

type HasFourLegs<Animal> = Animal extends { legs: 4 } ? Animal : never;

type Bird = { legs: 2; name: string };
type Dog = { legs: 4; name: string };
type Ant = { legs: 6; name: string };
type Wolf = { legs: 4; name: string };

type Animals = Bird | Dog | Ant | Wolf;
type FourLegs = HasFourLegs<Animals>;
// Result: Dog | Wolf

// Extract non-nullable types
type NonNullable<T> = T extends null | undefined ? never : T;

type MaybeString = string | null | undefined;
type DefinitelyString = NonNullable<MaybeString>;
// Result: string

// Extract array element type
type ArrayElement<T> = T extends (infer U)[] ? U : never;

type Numbers = number[];
type Number = ArrayElement<Numbers>;
// Result: number

// Extract function return type
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

// Extract function parameters
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;

function example(a: string, b: number): boolean {
  return true;
}

type ExampleParams = Parameters<typeof example>;
// Result: [string, number]

type ExampleReturn = ReturnType<typeof example>;
// Result: boolean

// ============================================================================
// 14. Template Union Types
// ============================================================================

// A template string can be used to combine and manipulate text inside the type system

type SupportedLangs = "en" | "pt" | "zh";
type FooterLocaleIDs = "header" | "footer";

type AllLocaleIDs = `${SupportedLangs}_${FooterLocaleIDs}_id`;
// Result:
// "en_header_id" | "en_footer_id"
// | "pt_header_id" | "pt_footer_id"
// | "zh_header_id" | "zh_footer_id"

// Template literal with string manipulation
type EventName<T extends string> = `on${Capitalize<T>}`;
type ClickEvent = EventName<"click">;
// Result: "onClick"

type GetterName<T extends string> = `get${Capitalize<T>}`;
type NameGetter = GetterName<"name">;
// Result: "getName"

// Complex template unions
type Direction = "top" | "bottom" | "left" | "right";
type Property = "margin" | "padding";

type CSSProperty = `${Property}-${Direction}`;
// Result:
// "margin-top" | "margin-bottom" | "margin-left" | "margin-right"
// | "padding-top" | "padding-bottom" | "padding-left" | "padding-right"

// ============================================================================
// 15. Complex Examples
// ============================================================================

// Utility type: Make all properties optional recursively
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type ComplexObject = {
  user: {
    name: string;
    age: number;
    address: {
      street: string;
      city: string;
    };
  };
  settings: {
    theme: string;
  };
};

type PartialComplex = DeepPartial<ComplexObject>;
// All properties are now optional, including nested ones

// Utility type: Extract keys of a specific type
type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

type User = {
  name: string;
  age: number;
  email: string;
  active: boolean;
};

type StringKeys = KeysOfType<User, string>;
// Result: "name" | "email"

// Utility type: Omit by value type
type OmitByType<T, U> = {
  [K in keyof T as T[K] extends U ? never : K]: T[K];
};

type UserWithoutStrings = OmitByType<User, string>;
// Result: { age: number; active: boolean }

// ============================================================================
// Export Examples
// ============================================================================

export {
  PersonType,
  Location,
  Data,
  Size,
  Status,
  APIResponse,
  LocationXY,
  ColorfulCircle,
  Response,
  Data as ResponseData,
  Metadata,
  Users,
  Artist,
  ArtistSub,
  ReadonlyArtist,
  PartialArtist,
  ArtistName,
  Animals,
  FourLegs,
  AllLocaleIDs,
  ClickEvent,
  NameGetter,
  CSSProperty,
  DeepPartial,
  ComplexObject,
  PartialComplex,
  KeysOfType,
  User,
  StringKeys,
  OmitByType,
  UserWithoutStrings,
};

