/**
 * Conditional Types Examples
 * 
 * Conditional types help describe the relation between the types of inputs and outputs.
 * They take the form: SomeType extends OtherType ? TrueType : FalseType
 */

// ============================================================================
// 1. Basic Conditional Types
// ============================================================================

interface Animal {
  live(): void;
}

interface Dog extends Animal {
  woof(): void;
}

// Dog extends Animal is true, so Example1 is number
type Example1 = Dog extends Animal ? number : string;
// type Example1 = number

// RegExp does not extend Animal, so Example2 is string
type Example2 = RegExp extends Animal ? number : string;
// type Example2 = string

// ============================================================================
// 2. Conditional Types with Generics
// ============================================================================

interface IdLabel {
  id: number;
}

interface NameLabel {
  name: string;
}

// Using conditional types to simplify function overloads
type NameOrId<T extends number | string> = T extends number
  ? IdLabel
  : NameLabel;

// Single function with conditional type instead of multiple overloads
function createLabel<T extends number | string>(idOrName: T): NameOrId<T> {
  if (typeof idOrName === "number") {
    return { id: idOrName } as NameOrId<T>;
  } else {
    return { name: idOrName } as NameOrId<T>;
  }
}

// Examples:
let a = createLabel("typescript");
// let a: NameLabel

let b = createLabel(2.8);
// let b: IdLabel

let c = createLabel(Math.random() ? "hello" : 42);
// let c: NameLabel | IdLabel

// ============================================================================
// 3. Conditional Type Constraints
// ============================================================================

// Without constraint - this would error
// type MessageOf<T> = T["message"]; // Error: Type '"message"' cannot be used to index type 'T'

// With constraint - works but requires all types to have message
type MessageOfWithConstraint<T extends { message: unknown }> = T["message"];

interface Email {
  message: string;
}

type EmailMessageContents1 = MessageOfWithConstraint<Email>;
// type EmailMessageContents1 = string

// Better approach: Conditional type that defaults to 'never' if no message property
type MessageOf<T> = T extends { message: unknown } ? T["message"] : never;

interface Dog {
  bark(): void;
}

type EmailMessageContents = MessageOf<Email>;
// type EmailMessageContents = string

type DogMessageContents = MessageOf<Dog>;
// type DogMessageContents = never

// Flatten example: flattens array types, leaves others alone
type Flatten<T> = T extends any[] ? T[number] : T;

// Extracts out the element type
type Str = Flatten<string[]>;
// type Str = string

// Leaves the type alone
type Num = Flatten<number>;
// type Num = number

// ============================================================================
// 4. Inferring Within Conditional Types
// ============================================================================

// Using 'infer' keyword to extract types from complex structures

// Flatten using infer instead of indexed access
type FlattenWithInfer<Type> = Type extends Array<infer Item> ? Item : Type;

type Str2 = FlattenWithInfer<string[]>;
// type Str2 = string

type Num2 = FlattenWithInfer<number>;
// type Num2 = number

// Extract return type from function types
type GetReturnType<Type> = Type extends (...args: never[]) => infer Return
  ? Return
  : never;

type NumReturn = GetReturnType<() => number>;
// type NumReturn = number

type StrReturn = GetReturnType<(x: string) => string>;
// type StrReturn = string

type Bools = GetReturnType<(a: boolean, b: boolean) => boolean[]>;
// type Bools = boolean[]

// Example with overloaded function
declare function stringOrNum(x: string): number;
declare function stringOrNum(x: number): string;
declare function stringOrNum(x: string | number): string | number;

type T1 = ReturnType<typeof stringOrNum>;
// type T1 = string | number
// Note: When inferring from overloaded functions, inference uses the last signature

// More infer examples:

// Extract parameter types
type GetFirstParameter<Type> = Type extends (arg: infer P) => any ? P : never;

type Param = GetFirstParameter<(x: string) => void>;
// type Param = string

// Extract array element type (alternative to Flatten)
type ArrayElement<T> = T extends (infer U)[] ? U : never;

type Element = ArrayElement<string[]>;
// type Element = string

// Extract promise type
type Awaited<T> = T extends Promise<infer U> ? U : T;

type PromiseResult = Awaited<Promise<string>>;
// type PromiseResult = string

type NonPromise = Awaited<string>;
// type NonPromise = string

// ============================================================================
// 5. Distributive Conditional Types
// ============================================================================

// When conditional types act on a generic type, they become distributive with unions
type ToArray<Type> = Type extends any ? Type[] : never;

// Distributive behavior: applies to each member of the union
type StrArrOrNumArr = ToArray<string | number>;
// type StrArrOrNumArr = string[] | number[]
// This is equivalent to: ToArray<string> | ToArray<number>
// Which becomes: string[] | number[]

// To avoid distributivity, wrap each side of extends with square brackets
type ToArrayNonDist<Type> = [Type] extends [any] ? Type[] : never;

// Now 'ArrOfStrOrNum' is no longer a union
type ArrOfStrOrNum = ToArrayNonDist<string | number>;
// type ArrOfStrOrNum = (string | number)[]

// More examples of distributive behavior:

// Distributive: filters out null and undefined
type NonNullable<T> = T extends null | undefined ? never : T;

type Clean = NonNullable<string | number | null | undefined>;
// type Clean = string | number
// This distributes as:
// NonNullable<string> | NonNullable<number> | NonNullable<null> | NonNullable<undefined>
// Which becomes: string | number | never | never = string | number

// Non-distributive version
type NonNullableNonDist<T> = [T] extends [null | undefined] ? never : T;

type CleanNonDist = NonNullableNonDist<string | number | null | undefined>;
// type CleanNonDist = string | number | null | undefined
// Since [string | number | null | undefined] does not extend [null | undefined],
// we get the original union back

// ============================================================================
// 6. Practical Examples Combining Concepts
// ============================================================================

// Extract function return type (more robust version)
type ReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : any;

// Extract function parameters as a tuple
type Parameters<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;

type FuncParams = Parameters<(a: string, b: number) => void>;
// type FuncParams = [string, number]

// Extract constructor parameters
type ConstructorParameters<T extends abstract new (...args: any) => any> =
  T extends abstract new (...args: infer P) => any ? P : never;

class Example {
  constructor(public name: string, public age: number) {}
}

type ConstructorParams = ConstructorParameters<typeof Example>;
// type ConstructorParams = [string, number]

// Extract instance type from constructor
type InstanceType<T extends abstract new (...args: any) => any> =
  T extends abstract new (...args: any) => infer R ? R : any;

type Instance = InstanceType<typeof Example>;
// type Instance = Example

// Check if a type is a function
type IsFunction<T> = T extends (...args: any) => any ? true : false;

type IsFunc = IsFunction<(x: number) => string>;
// type IsFunc = true

type IsNotFunc = IsFunction<string>;
// type IsNotFunc = false

// Extract property names that are functions
type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends (...args: any) => any ? K : never;
}[keyof T];

interface MyObject {
  name: string;
  greet: () => void;
  calculate: (x: number) => number;
  age: number;
}

type FuncProps = FunctionPropertyNames<MyObject>;
// type FuncProps = "greet" | "calculate"

// Export types for use in other files
export type {
  Example1,
  Example2,
  NameOrId,
  MessageOf,
  Flatten,
  FlattenWithInfer,
  GetReturnType,
  ToArray,
  ToArrayNonDist,
  NonNullable,
};

// Export functions for use in other files
export { createLabel };

