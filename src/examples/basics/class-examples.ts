/**
 * TypeScript Class Examples
 * 
 * Comprehensive examples covering all TypeScript class features based on the official TypeScript documentation:
 * 
 * Class Members:
 * - Fields (with and without initializers, readonly, strictPropertyInitialization)
 * - Constructors (with defaults, overloads, super calls)
 * - Methods (standard and arrow functions)
 * - Getters / Setters (with different types)
 * - Index Signatures
 * 
 * Class Heritage:
 * - implements Clauses (single and multiple interfaces)
 * - extends Clauses (inheritance, method overriding)
 * - Type-only Field Declarations
 * - Initialization Order
 * 
 * Member Visibility:
 * - public (default)
 * - protected (with cross-hierarchy access rules)
 * - private (soft private vs #hard private)
 * 
 * Static Members:
 * - Static fields and methods
 * - Static blocks
 * - Static visibility modifiers
 * 
 * Generic Classes:
 * - Basic generics
 * - Generic constraints
 * - Static members in generic classes
 * 
 * this at Runtime:
 * - Arrow functions to preserve 'this'
 * - this parameters
 * - this types
 * - this-based type guards
 * 
 * Other Features:
 * - Parameter Properties
 * - Class Expressions
 * - Constructor Signatures
 * - Abstract Classes and Members
 * - Relationships Between Classes
 */

// ============================================================================
// 1. Basic Class with Fields
// ============================================================================

// Empty class
class EmptyPoint {}

// Class with fields
class BasicPoint {
  x: number;
  y: number;
  
  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }
}

const pt = new BasicPoint();
// pt.x and pt.y are initialized in constructor

// Fields with initializers
class PointWithDefaults {
  x = 0;
  y = 0;
}

const pt2 = new PointWithDefaults();
console.log(`${pt2.x}, ${pt2.y}`); // Prints 0, 0

// Type inference from initializers
// const pt3 = new PointWithDefaults();
// pt3.x = "0"; // Error: Type 'string' is not assignable to type 'number'

// ============================================================================
// 2. strictPropertyInitialization
// ============================================================================

// BadGreeter - without initializer (error in strict mode)
// class BadGreeter {
//   name: string; // Error: Property 'name' has no initializer
// }

// GoodGreeter - initialized in constructor
class GoodGreeter {
  name: string;

  constructor() {
    this.name = "hello";
  }
}

// Using definite assignment assertion
class OKGreeter {
  // Not initialized, but no error
  name!: string;
}

// ============================================================================
// 3. Readonly Fields
// ============================================================================

class ReadonlyGreeter {
  readonly name: string = "world";

  constructor(otherName?: string) {
    if (otherName !== undefined) {
      this.name = otherName;
    }
  }

  // err() {
  //   this.name = "not ok"; // Error: Cannot assign to 'name' because it is a read-only property
  // }
}

const readonlyGreeter = new ReadonlyGreeter();
// readonlyGreeter.name = "also not ok"; // Error: Cannot assign to 'name' because it is a read-only property

// ============================================================================
// 4. Constructors
// ============================================================================

class PointWithConstructor {
  x: number;
  y: number;

  // Normal signature with defaults
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}

// Constructor overloads
class PointWithOverloads {
  x: number = 0;
  y: number = 0;

  constructor(x: number, y: number);
  constructor(xy: string);
  constructor(x: string | number, y: number = 0) {
    if (typeof x === "string") {
      const parts = x.split(",");
      this.x = parseFloat(parts[0]);
      this.y = parseFloat(parts[1]);
    } else {
      this.x = x;
      this.y = y;
    }
  }
}

// ============================================================================
// 5. Super Calls
// ============================================================================

class BaseExample {
  k = 4;
}

class DerivedExample extends BaseExample {
  constructor() {
    super(); // Must call super() before accessing 'this'
    console.log(this.k); // Now it's safe
  }
}

// ============================================================================
// 6. Methods
// ============================================================================

class PointWithMethods {
  x = 10;
  y = 10;

  scale(n: number): void {
    this.x *= n;
    this.y *= n;
  }

  getDistance(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
}

const pt3 = new PointWithMethods();
pt3.scale(2);
console.log(pt3.getDistance());

// Important: unqualified name in method refers to enclosing scope
let xVar: number = 0;

class CExample {
  x: string = "hello";

  m() {
    // This is trying to modify 'xVar' from line above, not the class property
    // xVar = "world"; // Error: Type 'string' is not assignable to type 'number'
  }
}

// ============================================================================
// 7. Getters / Setters
// ============================================================================

class CWithAccessors {
  _length = 0;

  get length(): number {
    return this._length;
  }

  set length(value: number) {
    this._length = value;
  }
}

// Getter without setter = readonly
class ReadOnlyGetter {
  private _value = 0;

  get value(): number {
    return this._value;
  }
}

// Different types for getter and setter (TypeScript 4.3+)
class ThingWithDifferentTypes {
  _size = 0;

  get size(): number {
    return this._size;
  }

  set size(value: string | number | boolean) {
    let num = Number(value);

    if (!isFinite(num)) {
      this._size = 0;
      return;
    }

    this._size = num;
  }
}

// ============================================================================
// 8. Index Signatures
// ============================================================================

class MyClassWithIndex {
  [s: string]: boolean | ((s: string) => boolean);

  check(s: string): boolean {
    return this[s] as boolean;
  }
}

// ============================================================================
// 9. private x vs #private
// ============================================================================

// private x - Type-only addition, no runtime enforcement
class Bag {
  private item: any; // Type-only private
  
  constructor(item: any) {
    this.item = item;
  }
  
  getItem(): any {
    return this.item;
  }
}

const bag = new Bag("secret");
// bag.item; // Error: Property 'item' is private and only accessible within class 'Bag'
// But at runtime, this can still be accessed if you bypass TypeScript

// #private - Runtime private with JavaScript engine enforcement
// Note: Requires ES2015+ target. Using private with _ for compatibility
class SecureBag {
  private _item: any; // Runtime private (using private instead of # for compatibility)

  constructor(item: any) {
    this._item = item;
  }

  getItem(): any {
    return this._item;
  }
}

const secureBag = new SecureBag("secret");
// secureBag._item; // Error: Property '_item' is private
// Note: For true runtime privacy with #, set target to ES2015+

// ============================================================================
// 10. this at Runtime - Arrow Functions
// ============================================================================

// The value of 'this' inside a function depends on how the function is called
class MyClassWithThisIssue {
  name: string = "MyClass";

  getName(): string {
    return this.name;
  }
}

const myClass = new MyClassWithThisIssue();
const obj = {
  name: "obj",
  getName: myClass.getName,
};

// Prints "obj", not "MyClass"
console.log(obj.getName());

// Solution: Use arrow function to preserve 'this'
class MyClassWithArrow {
  name: string = "MyClass";

  getName = (): string => {
    return this.name;
  };
}

const c = new MyClassWithArrow();
const getNameFunc = c.getName;
// Prints "MyClass" instead of crashing
console.log(getNameFunc());

// ============================================================================
// 11. this Parameters
// ============================================================================

class MyClassWithThisParam {
  name: string = "MyClass";

  getName(this: MyClassWithThisParam): string {
    return this.name;
  }
}

const c2 = new MyClassWithThisParam();
c2.getName(); // OK

// const g2 = c2.getName;
// g2(); // Error: The 'this' context of type 'void' is not assignable

// ============================================================================
// 12. this Types
// ============================================================================

class BoxWithThis {
  contents: string = "";

  set(value: string): this {
    this.contents = value;
    return this;
  }
}

class ClearableBox extends BoxWithThis {
  clear(): void {
    this.contents = "";
  }
}

const clearableBox = new ClearableBox();
const clearableBoxSet = clearableBox.set("hello");
// const clearableBoxSet: ClearableBox (not just BoxWithThis)

// Using this in parameter type
class BoxWithThisParam {
  content: string = "";

  sameAs(other: this): boolean {
    return other.content === this.content;
  }
}

class DerivedBox extends BoxWithThisParam {
  otherContent: string = "?";
}

const baseBox = new BoxWithThisParam();
const derivedBox = new DerivedBox();
// derivedBox.sameAs(baseBox); // Error: Argument of type 'BoxWithThisParam' is not assignable

// ============================================================================
// 13. this-based Type Guards
// ============================================================================

class FileSystemObject {
  path: string;
  networked: boolean;

  constructor(path: string, networked: boolean) {
    this.path = path;
    this.networked = networked;
  }

  isFile(): this is FileRep {
    return this instanceof FileRep;
  }

  isDirectory(): this is Directory {
    return this instanceof Directory;
  }

  isNetworked(): this is Networked & this {
    return this.networked;
  }
}

class FileRep extends FileSystemObject {
  content: string;

  constructor(path: string, content: string) {
    super(path, false);
    this.content = content;
  }
}

class Directory extends FileSystemObject {
  children: FileSystemObject[] = [];

  constructor(path: string, networked: boolean) {
    super(path, networked);
  }
}

interface Networked {
  host: string;
}

const fso: FileSystemObject = new FileRep("foo/bar.txt", "foo");

if (fso.isFile()) {
  console.log(fso.content); // Type narrowed to FileRep
} else if (fso.isDirectory()) {
  console.log(fso.children); // Type narrowed to Directory
}

// Lazy validation example
class BoxWithValue<T> {
  value?: T;

  hasValue(): this is { value: T } {
    return this.value !== undefined;
  }
}

const box = new BoxWithValue<string>();
box.value = "Gameboy";

if (box.hasValue()) {
  console.log(box.value); // Type narrowed: value is definitely string
}

// ============================================================================
// 14. implements Clauses
// ============================================================================

// A class can be used as both a type or a value
class SimpleUser {
  id: string;
  name: string;
  
  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}

interface Pingable {
  ping(): void;
}

class Sonar implements Pingable {
  ping() {
    console.log("ping!");
  }
}

// class Ball implements Pingable {
//   // Error: Property 'ping' is missing in type 'Ball'
//   pong() {
//     console.log("pong!");
//   }
// }

// Multiple interfaces
interface Flyable {
  fly(): void;
}

interface Swimmable {
  swim(): void;
}

class Duck implements Flyable, Swimmable {
  fly() {
    console.log("Flying!");
  }

  swim() {
    console.log("Swimming!");
  }
}

// Important: implements doesn't change type inference
interface Checkable {
  check(name: string): boolean;
}

class NameChecker implements Checkable {
  check(s: string) {
    // Parameter 's' needs explicit type annotation
    // implements doesn't influence type inference
    return s.toLowerCase() === "ok";
  }
}

// Implementing interface with optional property doesn't create it
interface AInterface {
  x: number;
  y?: number;
}

class CImplementsA implements AInterface {
  x = 0;
}

const cInstance = new CImplementsA();
// cInstance.y = 10; // Error: Property 'y' does not exist on type 'CImplementsA'

// ============================================================================
// 15. extends Clauses
// ============================================================================

interface Updatable {
  update(): void;
}

interface Serializable {
  serialize(): string;
}

class Account {
  id: string;
  
  constructor(id: string) {
    this.id = id;
  }
}

class AnimalBase {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  move() {
    console.log(`${this.name} is moving along!`);
  }
}

class DogBase extends AnimalBase {
  breed: string;

  constructor(name: string, breed: string) {
    super(name);
    this.breed = breed;
  }

  woof(times: number) {
    for (let i = 0; i < times; i++) {
      console.log("woof!");
    }
  }
}

const dogBase = new DogBase("Buddy", "Golden Retriever");
dogBase.move(); // Base class method
dogBase.woof(3); // Derived class method

// ============================================================================
// 16. Overriding Methods
// ============================================================================

class BaseGreeter {
  greet() {
    console.log("Hello, world!");
  }
}

class DerivedGreeter extends BaseGreeter {
  greet(name?: string) {
    if (name === undefined) {
      super.greet();
    } else {
      console.log(`Hello, ${name.toUpperCase()}`);
    }
  }
}

const derivedGreeter = new DerivedGreeter();
derivedGreeter.greet();
derivedGreeter.greet("reader");

// Legal to refer to derived class through base class reference
const baseGreeterRef: BaseGreeter = derivedGreeter;
baseGreeterRef.greet(); // No problem

// ============================================================================
// 17. Type-only Field Declarations
// ============================================================================

interface AnimalType {
  dateOfBirth: any;
}

interface DogType extends AnimalType {
  breed: string;
}

class AnimalHouse {
  resident: AnimalType;

  constructor(animal: AnimalType) {
    this.resident = animal;
  }
}

class DogHouse extends AnimalHouse {
  // Does not emit JavaScript code, only ensures types are correct
  declare resident: DogType;

  constructor(dog: DogType) {
    super(dog);
  }
}

// ============================================================================
// 18. Initialization Order
// ============================================================================

class BaseInit {
  name = "base";

  constructor() {
    console.log("My name is " + this.name);
  }
}

class DerivedInit extends BaseInit {
  name = "derived";
}

// Prints "base", not "derived"
// Order: base fields -> base constructor -> derived fields -> derived constructor
const di = new DerivedInit();

// ============================================================================
// 19. Common Syntax - Class Declaration
// ============================================================================

// Subclasses this class (extends Account)
// Ensures that the class conforms to a set of interfaces or types (implements)
class UserAccountExample extends Account implements Updatable, Serializable {
  // Fields
  // id: string; // Inherited from Account, don't redeclare
  displayName?: boolean; // An optional field
  name!: string; // A 'trust me, it's there' field (definite assignment assertion)
  private _attributes: Record<string, any> = {}; // A private field (using Record instead of Map for compatibility)
  roles = ["user"]; // A field with a default
  readonly createdAt = new Date(); // A readonly field with a default

  // Constructor
  constructor(id: string, email: string) {
    super(id); // Call parent constructor
    this.email = email; // In strict: true this code is checked against the fields
    this.name = "Default"; // Satisfies definite assignment
  }
  
  email: string;
  
  // Methods
  setName(name: string): void {
    this.name = name;
  }
  
  // Arrow function field (method)
  verifyName = (name: string): boolean => {
    return this.name === name;
  };
  
  // Overloaded Methods
  sync(): Promise<Record<string, never>>;
  sync(cb: ((result: string) => void)): void;
  sync(cb?: ((result: string) => void)): void | Promise<Record<string, never>> {
    if (cb) {
      cb("success");
      return;
    }
    return Promise.resolve({});
  }
  
  // Getters and Setters
  private _accountID: string = "";
  
  get accountID(): string {
    return this._accountID;
  }
  
  set accountID(value: string) {
    this._accountID = value;
  }
  
  // Access Modifiers
  private makeRequest(): void {
    // Private access is just to this class
    console.log("Making request");
  }
  
  protected handleRequest(): void {
    // Protected allows access to subclasses
    console.log("Handling request");
  }
  
  public publicMethod(): void {
    // Public is the default
    this.makeRequest(); // Can access private within class
  }
  
  // Implementation of interfaces
  update(): void {
    console.log("Updating user account");
  }
  
  serialize(): string {
    return JSON.stringify({ id: this.id, name: this.name });
  }
}

// Static Members
class UserRegistry {
  private static _userCount = 0; // Private static field (using _ instead of #)
  static users: SimpleUser[] = []; // Static field

  static registerUser(user: SimpleUser): void {
    // Static method
    UserRegistry._userCount++;
    UserRegistry.users.push(user);
  }

  static getUserCount(): number {
    return UserRegistry._userCount;
  }

  // Static Blocks - for setting up static vars
  static {
    // 'this' refers to the static class
    UserRegistry._userCount = 0;
    console.log("UserRegistry initialized");
  }
}

// ============================================================================
// 20. Member Visibility - public (default)
// ============================================================================

class PublicGreeter {
  public greet() {
    console.log("hi!");
  }
}

const pg = new PublicGreeter();
pg.greet();

// ============================================================================
// 21. Member Visibility - protected
// ============================================================================

class ProtectedGreeter {
  public greet() {
    console.log("Hello, " + this.getName());
  }

  protected getName(): string {
    return "hi";
  }
}

class SpecialGreeter extends ProtectedGreeter {
  public howdy() {
    // OK to access protected member here
    console.log("Howdy, " + this.getName());
  }
}

const sg = new SpecialGreeter();
sg.greet(); // OK
// sg.getName(); // Error: Property 'getName' is protected

// Exposure of protected members
class BaseWithProtected {
  protected m = 10;
}

class DerivedWithPublic extends BaseWithProtected {
  // No modifier, so default is 'public'
  m = 15;
}

const dwp = new DerivedWithPublic();
console.log(dwp.m); // OK, now public

// Cross-hierarchy protected access
class Base1 {
  protected x: number = 1;
}

class Derived1 extends Base1 {
  protected x1: number = 5; // Renamed to avoid duplicate
}

class Derived2 extends Base1 {
  f1(other: Derived2) {
    other.x = 10; // OK - same class
  }

  // f2(other: Derived1) {
  //   other.x1 = 10; // Error: Property 'x1' is protected and only accessible within class 'Derived1'
  // }
}

// ============================================================================
// 22. Member Visibility - private
// ============================================================================

class PrivateBase {
  private x = 0;

  public getX(): number {
    return this.x;
  }
}

// const pb = new PrivateBase();
// console.log(pb.x); // Error: Property 'x' is private

class PrivateDerived extends PrivateBase {
  // showX() {
  //   console.log(this.x); // Error: Property 'x' is private
  // }
}

// Cross-instance private access (TypeScript allows this)
class AClass {
  private x = 10;

  public sameAs(other: AClass): boolean {
    // No error - TypeScript allows cross-instance private access
    return other.x === this.x;
  }
}

// ============================================================================
// 23. Parameter Properties
// ============================================================================

// A TypeScript specific extension which automatically sets an instance field
// to the input parameter
class Location {
  // public x and public y automatically create instance fields
  constructor(public x: number, public y: number) {
    // No need to write: this.x = x; this.y = y;
  }
}

const loc = new Location(20, 40);
console.log(loc.x); // 20
console.log(loc.y); // 40

// Parameter properties work with all access modifiers
class Person {
  constructor(
    public name: string,
    private age: number,
    protected email: string,
    readonly id: string
  ) {
    // All fields are automatically assigned
  }
  
  getAge(): number {
    return this.age; // Can access private within class
  }
}

const personInstance = new Person("Alice", 30, "alice@example.com", "123");
console.log(personInstance.name); // "Alice"
// personInstance.age; // Error: Property 'age' is private
// personInstance.id = "456"; // Error: Cannot assign to 'id' because it is a read-only property

// ============================================================================
// 24. Class Expressions
// ============================================================================

const SomeClass = class<Type> {
  content: Type;

  constructor(value: Type) {
    this.content = value;
  }
};

const m = new SomeClass("Hello, world");
// const m: SomeClass<string>

// ============================================================================
// 25. Constructor Signatures
// ============================================================================

class PointWithTimestamp {
  createdAt: number;
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.createdAt = Date.now();
    this.x = x;
    this.y = y;
  }
}

type PointInstance = InstanceType<typeof PointWithTimestamp>;

function moveRight(point: PointInstance): void {
  point.x += 5;
}

const point = new PointWithTimestamp(3, 4);
moveRight(point);
console.log(point.x); // => 8

// ============================================================================
// 26. Abstract Classes and Members
// ============================================================================

// A class can be declared as not implementable, but existing to be subclassed
abstract class BaseAbstract {
  // Abstract method - must be implemented by subclasses
  abstract getName(): string;

  // Concrete method - can be used as-is
  printName(): void {
    console.log("Hello, " + this.getName());
  }

  // Regular method
  move(): void {
    console.log("The animal moves");
  }
}

// Cannot instantiate abstract class
// const animal = new BaseAbstract(); // Error: Cannot create an instance of an abstract class

// Implementation of abstract class
class DerivedFromAbstract extends BaseAbstract {
  private name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }

  // Must implement abstract method
  getName(): string {
    return this.name;
  }

  // Can override concrete methods
  move(): void {
    console.log("The dog runs");
    super.move(); // Call parent implementation
  }
}

const abstractDog = new DerivedFromAbstract("Buddy");
abstractDog.printName(); // "Hello, Buddy"
abstractDog.move(); // "The dog runs" then "The animal moves"

// Abstract class with abstract and concrete properties
abstract class Shape {
  abstract readonly name: string;
  protected x: number = 0;
  protected y: number = 0;
  
  abstract getArea(): number;
  
  move(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }
}

class Circle extends Shape {
  readonly name: string = "Circle";
  private radius: number;
  
  constructor(radius: number) {
    super();
    this.radius = radius;
  }
  
  getArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}

// ============================================================================
// 27. Abstract Construct Signatures
// ============================================================================

function greet(ctor: new () => BaseAbstract): void {
  const instance = new ctor();
  instance.printName();
}

// greet(DerivedFromAbstract); // OK
// greet(BaseAbstract); // Error: Cannot assign an abstract constructor type

// ============================================================================
// 28. Relationships Between Classes
// ============================================================================

// Structural typing - classes are compared structurally
class Point1 {
  x = 0;
  y = 0;
}

class Point2 {
  x = 0;
  y = 0;
}

// OK - structurally identical
const p: Point1 = new Point2();

// Subtype relationships
class PersonClass {
  name: string = "";
  age: number = 0;
}

class EmployeeClass {
  name: string = "";
  age: number = 0;
  salary: number = 0;
}

// OK - EmployeeClass has all properties of PersonClass
const personStruct: PersonClass = new EmployeeClass();

// Empty classes (don't do this in practice!)
class Empty {}

function fn(x: Empty) {
  // can't do anything with 'x'
}

// All OK - empty class is supertype of everything
// fn(window);
// fn({});
// fn(fn);

// ============================================================================
// 29. Inheriting Built-in Types
// ============================================================================

// Note: For ES2015+, subclassing Error, Array, etc. works correctly
// For ES5, you may need to manually set the prototype

class MsgError extends Error {
  constructor(m: string) {
    super(m);

    // Set the prototype explicitly for ES5 compatibility
    Object.setPrototypeOf(this, MsgError.prototype);
  }

  sayHello() {
    return "hello " + this.message;
  }
}

// ============================================================================
// 30. Decorators (Experimental)
// ============================================================================

// Note: Decorators are experimental and require specific tsconfig settings
// Enable with: "experimentalDecorators": true in tsconfig.json

// Example decorator implementations (commented out as they require decorator support)
/*
// Class decorator
function Syncable(target: any) {
  console.log("Class decorated:", target.name);
}

// Method decorator
function triggersSync(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  console.log("Method decorated:", propertyKey);
}

// Accessor decorator
function preferCache(value: boolean) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("Accessor decorated:", propertyKey, value);
  };
}

// Parameter decorator
function required(target: any, propertyKey: string, parameterIndex: number) {
  console.log("Parameter decorated:", propertyKey, parameterIndex);
}

@Syncable
class DecoratedUser {
  @triggersSync()
  save(): void {
    console.log("Saving user");
  }
  
  @preferCache(false)
  get displayName(): string {
    return "User";
  }
  
  update(@required info: Partial<DecoratedUser>): void {
    console.log("Updating user");
  }
}
*/

// ============================================================================
// 31. Generics in Classes
// ============================================================================

// Declare a type which can change in your class methods
class Box<Type> {
  contents: Type; // Used here
  
  constructor(value: Type) {
    this.contents = value;
  }
  
  getContents(): Type {
    return this.contents;
  }
  
  setContents(value: Type): void {
    this.contents = value;
  }
}

const stringBox = new Box("a package");
console.log(stringBox.contents); // "a package"
console.log(stringBox.getContents()); // "a package"

const numberBox = new Box<number>(42);
console.log(numberBox.contents); // 42

// Generic class with constraints
interface HasLength {
  length: number;
}

class Container<T extends HasLength> {
  items: T[] = [];
  
  add(item: T): void {
    this.items.push(item);
  }
  
  getTotalLength(): number {
    return this.items.reduce((sum, item) => sum + item.length, 0);
  }
}

const stringContainer = new Container<string>();
stringContainer.add("hello");
stringContainer.add("world");
console.log(stringContainer.getTotalLength()); // 10

const arrayContainer = new Container<number[]>();
arrayContainer.add([1, 2, 3]);
arrayContainer.add([4, 5]);
console.log(arrayContainer.getTotalLength()); // 5

// Multiple type parameters
class Pair<T, U> {
  first: T;
  second: U;
  
  constructor(first: T, second: U) {
    this.first = first;
    this.second = second;
  }
  
  swap(): Pair<U, T> {
    return new Pair(this.second, this.first);
  }
}

const pair = new Pair<string, number>("hello", 42);
console.log(pair.first); // "hello"
console.log(pair.second); // 42

const swapped = pair.swap();
console.log(swapped.first); // 42
console.log(swapped.second); // "hello"

// Static members in generic classes
class StaticGeneric<T> {
  // Note: Static members cannot reference class type parameters
  // static defaultValue: T; // Error: Static members cannot reference class type parameters
  
  // But we can use static methods with generics
  static create<U>(value: U): StaticGeneric<U> {
    return new StaticGeneric(value);
  }
  
  constructor(public value: T) {}
}

// ============================================================================
// 10. Complete Example: User Management System
// ============================================================================

interface Identifiable {
  id: string;
}

interface Timestamped {
  createdAt: Date;
  updatedAt: Date;
}

abstract class BaseEntity implements Identifiable, Timestamped {
  readonly id: string;
  readonly createdAt: Date;
  updatedAt: Date;
  
  constructor(id: string) {
    this.id = id; // Initialize id in constructor
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
  
  abstract serialize(): string;
  
  updateTimestamp(): void {
    this.updatedAt = new Date();
  }
}

class User extends BaseEntity {
  private _email: string;
  public name: string;
  protected roles: string[] = [];
  
  constructor(id: string, name: string, email: string) {
    super(id);
    this.name = name;
    this._email = email;
  }
  
  get email(): string {
    return this._email;
  }
  
  set email(value: string) {
    if (value.includes("@")) {
      this._email = value;
      this.updateTimestamp();
    } else {
      throw new Error("Invalid email");
    }
  }
  
  addRole(role: string): void {
    if (!this.roles.includes(role)) {
      this.roles.push(role);
      this.updateTimestamp();
    }
  }
  
  serialize(): string {
    return JSON.stringify({
      id: this.id,
      name: this.name,
      email: this._email,
      roles: this.roles,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    });
  }
  
  static createAdmin(id: string, name: string, email: string): User {
    const user = new User(id, name, email);
    user.addRole("admin");
    return user;
  }
}

// ============================================================================
// Export Examples
// ============================================================================

export {
  EmptyPoint,
  BasicPoint,
  PointWithDefaults,
  GoodGreeter,
  OKGreeter,
  SimpleUser,
  Bag,
  SecureBag,
  MyClassWithIndex,
  MyClassWithThisIssue,
  MyClassWithArrow,
  MyClassWithThisParam,
  Account,
  UserAccountExample,
  Location,
  AnimalBase,
  DogBase,
  Shape,
  Circle,
  Box,
  Container,
  Pair,
  BaseEntity,
  User as UserEntity,
};
