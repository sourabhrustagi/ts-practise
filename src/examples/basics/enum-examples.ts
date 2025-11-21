/**
 * TypeScript Enum Examples
 * 
 * Comprehensive examples covering all TypeScript enum features:
 * - Numeric enums
 * - String enums
 * - Heterogeneous enums
 * - Computed and constant members
 * - Union enums and enum member types
 * - Enums at runtime
 * - Enums at compile time
 * - Reverse mappings
 * - const enums
 * - Ambient enums
 * - Objects vs Enums
 */

// ============================================================================
// 1. Numeric Enums
// ============================================================================

// Numeric enum with auto-increment starting from 1
enum Direction {
  Up = 1,
  Down,    // 2
  Left,    // 3
  Right,   // 4
}

// Direction.Up = 1, Direction.Down = 2, etc.
console.log(Direction.Up);    // 1
console.log(Direction.Down);  // 2
console.log(Direction.Left);  // 3
console.log(Direction.Right); // 4

// Numeric enum without initializers (starts from 0)
enum Status {
  Pending,   // 0
  Approved,  // 1
  Rejected,  // 2
}

console.log(Status.Pending);  // 0
console.log(Status.Approved); // 1
console.log(Status.Rejected); // 2

// Using numeric enums
enum UserResponse {
  No = 0,
  Yes = 1,
}

function respond(recipient: string, message: UserResponse): void {
  if (message === UserResponse.Yes) {
    console.log(`${recipient} said yes!`);
  } else {
    console.log(`${recipient} said no.`);
  }
}

respond("Princess Caroline", UserResponse.Yes);
respond("Bob", UserResponse.No);

// ============================================================================
// 2. String Enums
// ============================================================================

// String enums don't have auto-incrementing behavior
// Each member must be constant-initialized with a string literal
enum StringDirection {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}

// String enums serialize well and are readable at runtime
console.log(StringDirection.Up);    // "UP"
console.log(StringDirection.Down); // "DOWN"

// String enum with reference to another member
enum StringStatus {
  Success = "SUCCESS",
  Error = "ERROR",
  Warning = "WARNING",
  Info = "INFO",
}

function logMessage(level: StringStatus, message: string): void {
  console.log(`[${level}] ${message}`);
}

logMessage(StringStatus.Info, "Application started");
logMessage(StringStatus.Error, "Something went wrong");

// ============================================================================
// 3. Heterogeneous Enums
// ============================================================================

// Technically enums can be mixed with string and numeric members
// But it's not recommended unless you really need it
enum BooleanLikeHeterogeneousEnum {
  No = 0,
  Yes = "YES",
}

// This works but is not recommended
const answer1: BooleanLikeHeterogeneousEnum = BooleanLikeHeterogeneousEnum.No;
const answer2: BooleanLikeHeterogeneousEnum = BooleanLikeHeterogeneousEnum.Yes;

console.log(answer1); // 0
console.log(answer2); // "YES"

// ============================================================================
// 4. Computed and Constant Members
// ============================================================================

// Constant enum members:
// 1. First member with no initializer (value = 0)
enum E {
  X,  // Constant, value = 0
}

// 2. Member without initializer following a numeric constant
enum E1 {
  X,  // 0
  Y,  // 1 (constant)
  Z,  // 2 (constant)
}

enum E2 {
  A = 1,  // 1
  B,      // 2 (constant)
  C,      // 3 (constant)
}

// 3. Member initialized with a constant enum expression
enum FileAccess {
  // constant members
  None,                    // 0
  Read = 1 << 1,           // 2 (bit shift)
  Write = 1 << 2,          // 4 (bit shift)
  ReadWrite = Read | Write, // 6 (bitwise OR)
  // computed member
  G = "123".length,        // 3 (computed at runtime)
}

console.log(FileAccess.None);      // 0
console.log(FileAccess.Read);      // 2
console.log(FileAccess.Write);     // 4
console.log(FileAccess.ReadWrite); // 6
console.log(FileAccess.G);         // 3

// Constant enum expressions can include:
// - Literal enum expressions (string or numeric literals)
// - References to previously defined constant enum members
// - Parenthesized constant enum expressions
// - Unary operators: +, -, ~
// - Binary operators: +, -, *, /, %, <<, >>, >>>, &, |, ^

enum MathOperations {
  Add = 1 + 1,           // 2
  Subtract = 10 - 5,      // 5
  Multiply = 2 * 3,       // 6
  Divide = 20 / 4,        // 5
  Modulo = 10 % 3,        // 1
  BitwiseAnd = 5 & 3,     // 1
  BitwiseOr = 5 | 3,      // 7
  BitwiseXor = 5 ^ 3,     // 6
  LeftShift = 1 << 2,     // 4
  RightShift = 8 >> 2,    // 2
  UnaryMinus = -10,       // -10
  UnaryPlus = +10,        // 10
}

// Computed members (not constant)
function getValue(): number {
  return 42;
}

enum ComputedEnum {
  A = getValue(),  // Computed - calls function
  B = Math.PI,     // Computed - uses Math constant
}

// ============================================================================
// 5. Union Enums and Enum Member Types
// ============================================================================

// When all members in an enum have literal enum values, special semantics apply:
// 1. Enum members also become types
// 2. Enum types become a union of each enum member

enum ShapeKind {
  Circle,
  Square,
}

// Enum members become types
interface Circle {
  kind: ShapeKind.Circle;  // Type is ShapeKind.Circle (not just ShapeKind)
  radius: number;
}

interface Square {
  kind: ShapeKind.Square;  // Type is ShapeKind.Square
  sideLength: number;
}

// Type error: kind must be ShapeKind.Circle
// let c: Circle = {
//   kind: ShapeKind.Square,  // Error!
//   radius: 100,
// };

const correctCircle: Circle = {
  kind: ShapeKind.Circle,
  radius: 100,
};

const correctSquare: Square = {
  kind: ShapeKind.Square,
  sideLength: 50,
};

// Union enum - TypeScript knows the exact set of values
enum E {
  Foo,
  Bar,
}

function f(x: E): void {
  // TypeScript can catch logic errors
  // This condition will always be true (no overlap between E.Foo and E.Bar)
  // if (x !== E.Foo || x !== E.Bar) {
  //   // This comparison appears to be unintentional
  // }
  
  // Correct way to check
  if (x === E.Foo) {
    console.log("It's Foo");
  } else if (x === E.Bar) {
    console.log("It's Bar");
  }
}

f(E.Foo);
f(E.Bar);

// String enum with union types
enum LogLevel {
  ERROR = "ERROR",
  WARN = "WARN",
  INFO = "INFO",
  DEBUG = "DEBUG",
}

// Type is LogLevel.ERROR | LogLevel.WARN | LogLevel.INFO | LogLevel.DEBUG
function log(level: LogLevel, message: string): void {
  console.log(`[${level}] ${message}`);
}

log(LogLevel.ERROR, "Critical error occurred");
log(LogLevel.INFO, "Application started");

// ============================================================================
// 6. Enums at Runtime
// ============================================================================

// Enums are real objects that exist at runtime
enum RuntimeEnum {
  X,
  Y,
  Z,
}

// Can be passed around to functions
function f(obj: { X: number }): number {
  return obj.X;
}

// Works, since 'RuntimeEnum' has a property named 'X' which is a number
console.log(f(RuntimeEnum)); // 0

// Enums can be used in runtime checks
function processEnumValue(value: RuntimeEnum): string {
  switch (value) {
    case RuntimeEnum.X:
      return "X was selected";
    case RuntimeEnum.Y:
      return "Y was selected";
    case RuntimeEnum.Z:
      return "Z was selected";
    default:
      return "Unknown value";
  }
}

console.log(processEnumValue(RuntimeEnum.X));
console.log(processEnumValue(RuntimeEnum.Y));

// ============================================================================
// 7. Enums at Compile Time
// ============================================================================

// keyof keyword works differently for enums
// Use keyof typeof to get a Type that represents all Enum keys as strings

enum LogLevelEnum {
  ERROR,
  WARN,
  INFO,
  DEBUG,
}

/**
 * This is equivalent to:
 * type LogLevelStrings = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';
 */
type LogLevelStrings = keyof typeof LogLevelEnum;

function printImportant(key: LogLevelStrings, message: string): void {
  const num = LogLevelEnum[key];
  if (num <= LogLevelEnum.WARN) {
    console.log("Log level key is:", key);
    console.log("Log level value is:", num);
    console.log("Log level message is:", message);
  }
}

printImportant("ERROR", "This is a message");
printImportant("WARN", "Warning message");
// printImportant("INVALID", "Message"); // Error: not a valid key

// Getting all enum keys
const allKeys: LogLevelStrings[] = Object.keys(LogLevelEnum).filter(
  (key) => isNaN(Number(key))
) as LogLevelStrings[];

console.log("All log levels:", allKeys);

// Getting all enum values
const allValues: number[] = Object.values(LogLevelEnum).filter(
  (value) => typeof value === "number"
) as number[];

console.log("All log values:", allValues);

// ============================================================================
// 8. Reverse Mappings
// ============================================================================

// Numeric enums generate reverse mappings (value -> name)
enum ReverseEnum {
  A,  // 0
  B,  // 1
  C,  // 2
}

let a = ReverseEnum.A;        // 0
let nameOfA = ReverseEnum[a]; // "A" (reverse mapping)

console.log(a);        // 0
console.log(nameOfA); // "A"

// This works because numeric enums are compiled to:
// var ReverseEnum;
// (function (ReverseEnum) {
//   ReverseEnum[ReverseEnum["A"] = 0] = "A";
//   ReverseEnum[ReverseEnum["B"] = 1] = "B";
//   ReverseEnum[ReverseEnum["C"] = 2] = "C";
// })(ReverseEnum || (ReverseEnum = {}));

// String enums do NOT get reverse mappings
enum StringEnum {
  A = "a",
  B = "b",
  C = "c",
}

const stringA = StringEnum.A;
// const nameOfStringA = StringEnum[stringA]; // Error: Index signature is missing

// However, you can create a reverse lookup manually
function getEnumKeyByValue<T extends Record<string, string | number>>(
  enumObject: T,
  enumValue: T[keyof T]
): keyof T | undefined {
  return Object.keys(enumObject).find(
    (key) => enumObject[key] === enumValue
  ) as keyof T | undefined;
}

const key = getEnumKeyByValue(StringEnum, "a");
console.log(key); // "A"

// ============================================================================
// 9. const enums
// ============================================================================

// Const enums are completely removed during compilation
// Members are inlined at use sites
const enum ConstDirection {
  Up,
  Down,
  Left,
  Right,
}

// This code:
let constDirections = [
  ConstDirection.Up,
  ConstDirection.Down,
  ConstDirection.Left,
  ConstDirection.Right,
];

// Compiles to:
// let constDirections = [
//   0, /* ConstDirection.Up */
//   1, /* ConstDirection.Down */
//   2, /* ConstDirection.Left */
//   3, /* ConstDirection.Right */
// ];

console.log(constDirections); // [0, 1, 2, 3]

// Const enums can only use constant enum expressions
const enum ConstEnum {
  A = 1,
  B = A * 2,  // 2 (constant expression)
  C = 3 + 4,  // 7 (constant expression)
}

// Cannot use computed values
// const enum InvalidConstEnum {
//   A = "123".length,  // Error: Computed values are not allowed
// }

function useConstEnum(dir: ConstDirection): void {
  switch (dir) {
    case ConstDirection.Up:
      console.log("Going up");
      break;
    case ConstDirection.Down:
      console.log("Going down");
      break;
    case ConstDirection.Left:
      console.log("Going left");
      break;
    case ConstDirection.Right:
      console.log("Going right");
      break;
  }
}

useConstEnum(ConstDirection.Up);

// ============================================================================
// 10. Ambient Enums
// ============================================================================

// Ambient enums describe the shape of already existing enum types
// Used for type declarations

declare enum AmbientEnum {
  A = 1,
  B,      // 2 (computed in ambient enums if no initializer)
  C = 2,
}

// Important: In ambient enums, members without initializers are always computed
// (unlike regular enums where they can be constant if preceding member is constant)

// Ambient enums are useful when describing existing JavaScript code
// declare enum NodeJS {
//   ENOENT,
//   EACCES,
//   // ... other error codes
// }

// ============================================================================
// 11. Objects vs Enums
// ============================================================================

// Modern TypeScript alternative to enums using objects with 'as const'

// Using const enum
const enum EDirection {
  Up,
  Down,
  Left,
  Right,
}

// Using object with 'as const'
const ODirection = {
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3,
} as const;

// EDirection.Up is enum member (value: 0)
// ODirection.Up is property (value: 0)

console.log(EDirection.Up);   // 0
console.log(ODirection.Up);   // 0

// Using the enum as a parameter
function walk(dir: EDirection): void {
  console.log(`Walking ${dir}`);
}

// Using object requires extracting the values
type Direction = typeof ODirection[keyof typeof ODirection];
// type Direction = 0 | 1 | 2 | 3

function run(dir: Direction): void {
  console.log(`Running ${dir}`);
}

walk(EDirection.Left);
run(ODirection.Right);

// String enum alternative
enum EStringDirection {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}

// Object alternative
const OStringDirection = {
  Up: "UP",
  Down: "DOWN",
  Left: "LEFT",
  Right: "RIGHT",
} as const;

type StringDirection = typeof OStringDirection[keyof typeof OStringDirection];
// type StringDirection = "UP" | "DOWN" | "LEFT" | "RIGHT"

function move(dir: StringDirection): void {
  console.log(`Moving ${dir}`);
}

move(OStringDirection.Up);
move(OStringDirection.Down);

// Benefits of object approach:
// 1. Keeps codebase aligned with JavaScript
// 2. If enums are added to JavaScript, easier migration
// 3. No reverse mappings (sometimes cleaner)
// 4. More explicit type definitions

// Benefits of enum approach:
// 1. More concise syntax
// 2. Reverse mappings for numeric enums
// 3. Familiar pattern from other languages
// 4. Better IDE support in some cases

// ============================================================================
// 12. Practical Examples
// ============================================================================

// Example 1: HTTP Status Codes
enum HttpStatus {
  OK = 200,
  Created = 201,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  InternalServerError = 500,
}

function handleResponse(status: HttpStatus): void {
  if (status >= 200 && status < 300) {
    console.log("Success");
  } else if (status >= 400 && status < 500) {
    console.log("Client error");
  } else if (status >= 500) {
    console.log("Server error");
  }
}

handleResponse(HttpStatus.OK);
handleResponse(HttpStatus.NotFound);

// Example 2: User Roles
enum UserRole {
  Guest = "guest",
  User = "user",
  Moderator = "moderator",
  Admin = "admin",
}

function checkPermission(role: UserRole, action: string): boolean {
  switch (role) {
    case UserRole.Admin:
      return true; // Admins can do everything
    case UserRole.Moderator:
      return action !== "delete_user";
    case UserRole.User:
      return action === "view" || action === "edit_own";
    case UserRole.Guest:
      return action === "view";
    default:
      return false;
  }
}

console.log(checkPermission(UserRole.Admin, "delete_user"));       // true
console.log(checkPermission(UserRole.Moderator, "delete_user"));   // false
console.log(checkPermission(UserRole.Guest, "view"));             // true

// Example 3: File Permissions (bitwise flags)
enum FilePermission {
  None = 0,
  Read = 1 << 0,    // 1
  Write = 1 << 1,   // 2
  Execute = 1 << 2, // 4
}

function hasPermission(permissions: FilePermission, check: FilePermission): boolean {
  return (permissions & check) === check;
}

const userPermissions = FilePermission.Read | FilePermission.Write; // 3

console.log(hasPermission(userPermissions, FilePermission.Read));   // true
console.log(hasPermission(userPermissions, FilePermission.Write));  // true
console.log(hasPermission(userPermissions, FilePermission.Execute)); // false

// Example 4: State Machine
enum OrderStatus {
  Pending = "pending",
  Processing = "processing",
  Shipped = "shipped",
  Delivered = "delivered",
  Cancelled = "cancelled",
}

function canTransition(from: OrderStatus, to: OrderStatus): boolean {
  const validTransitions: Record<OrderStatus, OrderStatus[]> = {
    [OrderStatus.Pending]: [OrderStatus.Processing, OrderStatus.Cancelled],
    [OrderStatus.Processing]: [OrderStatus.Shipped, OrderStatus.Cancelled],
    [OrderStatus.Shipped]: [OrderStatus.Delivered],
    [OrderStatus.Delivered]: [],
    [OrderStatus.Cancelled]: [],
  };

  return validTransitions[from].includes(to);
}

console.log(canTransition(OrderStatus.Pending, OrderStatus.Processing)); // true
console.log(canTransition(OrderStatus.Pending, OrderStatus.Delivered));  // false
console.log(canTransition(OrderStatus.Shipped, OrderStatus.Delivered));  // true

// ============================================================================
// Export Examples
// ============================================================================

export {
  Direction,
  Status,
  UserResponse,
  StringDirection,
  StringStatus,
  BooleanLikeHeterogeneousEnum,
  FileAccess,
  MathOperations,
  ComputedEnum,
  ShapeKind,
  Circle,
  Square,
  E,
  LogLevel,
  RuntimeEnum,
  LogLevelEnum,
  LogLevelStrings,
  ReverseEnum,
  StringEnum,
  ConstDirection,
  ConstEnum,
  EDirection,
  ODirection,
  EStringDirection,
  OStringDirection,
  HttpStatus,
  UserRole,
  FilePermission,
  OrderStatus,
};

