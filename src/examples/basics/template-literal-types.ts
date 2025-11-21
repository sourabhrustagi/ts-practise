/**
 * Template Literal Types Examples
 * Demonstrates template literal types and their usage in TypeScript
 * Based on TypeScript Handbook: Template Literal Types
 */

// ============================================================================
// 1. BASIC TEMPLATE LITERAL TYPES
// ============================================================================

// Template literal types build on string literal types
// They have the same syntax as template literal strings in JavaScript

type World = "world";
type Greeting = `hello ${World}`;
// type Greeting = "hello world"

// Example usage
const greeting: Greeting = "hello world"; // ✅ Valid
// const invalidGreeting: Greeting = "hello"; // ❌ Error: Type '"hello"' is not assignable to type '"hello world"'

// ============================================================================
// 2. TEMPLATE LITERALS WITH UNIONS
// ============================================================================

// When a union is used in the interpolated position, the type is the set of
// every possible string literal that could be represented by each union member

type EmailLocaleIDs = "welcome_email" | "email_heading";
type FooterLocaleIDs = "footer_title" | "footer_sendoff";

type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;
// type AllLocaleIDs = "welcome_email_id" | "email_heading_id" | "footer_title_id" | "footer_sendoff_id"

// Valid examples
const welcomeId: AllLocaleIDs = "welcome_email_id"; // ✅
const footerId: AllLocaleIDs = "footer_sendoff_id"; // ✅
// const invalidId: AllLocaleIDs = "invalid_id"; // ❌ Error

// ============================================================================
// 3. CROSS MULTIPLICATION WITH UNIONS
// ============================================================================

// For each interpolated position in the template literal, the unions are cross multiplied

type AllLocaleIDs2 = `${EmailLocaleIDs | FooterLocaleIDs}_id`;
type Lang = "en" | "ja" | "pt";

type LocaleMessageIDs = `${Lang}_${AllLocaleIDs2}`;
// type LocaleMessageIDs = 
//   "en_welcome_email_id" | "en_email_heading_id" | "en_footer_title_id" | "en_footer_sendoff_id" |
//   "ja_welcome_email_id" | "ja_email_heading_id" | "ja_footer_title_id" | "ja_footer_sendoff_id" |
//   "pt_welcome_email_id" | "pt_email_heading_id" | "pt_footer_title_id" | "pt_footer_sendoff_id"

// Valid examples
const enWelcome: LocaleMessageIDs = "en_welcome_email_id"; // ✅
const jaFooter: LocaleMessageIDs = "ja_footer_title_id"; // ✅
const ptHeading: LocaleMessageIDs = "pt_email_heading_id"; // ✅

// ============================================================================
// 4. STRING UNIONS IN TYPES - makeWatchedObject Example
// ============================================================================

// The power in template literals comes when defining a new string based on
// information inside a type

// Base type for the watched object
type PropEventSource<Type> = {
  on(eventName: `${string & keyof Type}Changed`, callback: (newValue: any) => void): void;
};

// Create a "watched object" with an `on` method
// so that you can watch for changes to properties
declare function makeWatchedObject<Type>(obj: Type): Type & PropEventSource<Type>;

// Example usage
const watchedPerson = makeWatchedObject({
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26,
});

// Valid - firstNameChanged is a valid event name
// Note: This is a type declaration for demonstration purposes
// In a real implementation, makeWatchedObject would return an object with the 'on' method
watchedPerson.on("firstNameChanged", () => {
  console.log("firstName changed!");
});

// Invalid - "firstName" is not a valid event name (missing "Changed")
// watchedPerson.on("firstName", () => {}); 
// Error: Argument of type '"firstName"' is not assignable to parameter of type 
//        '"firstNameChanged" | "lastNameChanged" | "ageChanged"'.

// Invalid - typo in event name
// watchedPerson.on("frstNameChanged", () => {});
// Error: Argument of type '"frstNameChanged"' is not assignable to parameter of type 
//        '"firstNameChanged" | "lastNameChanged" | "ageChanged"'.

// ============================================================================
// 5. INFERENCE WITH TEMPLATE LITERALS
// ============================================================================

// Using generics to infer the correct type for the callback parameter
// based on the property name in the event

type PropEventSourceWithInference<Type> = {
  on<Key extends string & keyof Type>(
    eventName: `${Key}Changed`,
    callback: (newValue: Type[Key]) => void
  ): void;
};

declare function makeWatchedObjectWithInference<Type>(
  obj: Type
): Type & PropEventSourceWithInference<Type>;

// Example with type inference
const personWithInference = makeWatchedObjectWithInference({
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26,
});

// TypeScript infers that newName is string
personWithInference.on("firstNameChanged", (newName) => {
  // (parameter) newName: string
  console.log(`new name is ${newName.toUpperCase()}`);
});

// TypeScript infers that newAge is number
personWithInference.on("ageChanged", (newAge) => {
  // (parameter) newAge: number
  if (newAge < 0) {
    console.warn("warning! negative age");
  }
});

// TypeScript infers that newLastName is string
personWithInference.on("lastNameChanged", (newLastName) => {
  // (parameter) newLastName: string
  console.log(`last name changed to: ${newLastName}`);
});

// ============================================================================
// 6. INTRINSIC STRING MANIPULATION TYPES
// ============================================================================

// TypeScript includes built-in types for string manipulation
// These types come built-in to the compiler for performance

// ============================================================================
// 6.1. Uppercase<StringType>
// ============================================================================

// Converts each character in the string to the uppercase version

type Greeting2 = "Hello, world";
type ShoutyGreeting = Uppercase<Greeting2>;
// type ShoutyGreeting = "HELLO, WORLD"

const shout: ShoutyGreeting = "HELLO, WORLD"; // ✅

// Practical example: Creating cache keys
type ASCIICacheKey<Str extends string> = `ID-${Uppercase<Str>}`;
type MainID = ASCIICacheKey<"my_app">;
// type MainID = "ID-MY_APP"

const cacheKey: MainID = "ID-MY_APP"; // ✅

// ============================================================================
// 6.2. Lowercase<StringType>
// ============================================================================

// Converts each character in the string to the lowercase equivalent

type Greeting3 = "Hello, world";
type QuietGreeting = Lowercase<Greeting3>;
// type QuietGreeting = "hello, world"

const quiet: QuietGreeting = "hello, world"; // ✅

// Practical example: Creating lowercase cache keys
type ASCIICacheKeyLower<Str extends string> = `id-${Lowercase<Str>}`;
type MainIDLower = ASCIICacheKeyLower<"MY_APP">;
// type MainIDLower = "id-my_app"

const cacheKeyLower: MainIDLower = "id-my_app"; // ✅

// ============================================================================
// 6.3. Capitalize<StringType>
// ============================================================================

// Converts the first character in the string to an uppercase equivalent

type LowercaseGreeting = "hello, world";
type Greeting4 = Capitalize<LowercaseGreeting>;
// type Greeting4 = "Hello, world"

const capitalized: Greeting4 = "Hello, world"; // ✅

// Example with function names
type MethodName = "get" | "set" | "delete";
type CapitalizedMethod = Capitalize<MethodName>;
// type CapitalizedMethod = "Get" | "Set" | "Delete"

const method: CapitalizedMethod = "Get"; // ✅

// ============================================================================
// 6.4. Uncapitalize<StringType>
// ============================================================================

// Converts the first character in the string to a lowercase equivalent

type UppercaseGreeting = "HELLO WORLD";
type UncomfortableGreeting = Uncapitalize<UppercaseGreeting>;
// type UncomfortableGreeting = "hELLO WORLD"

const uncap: UncomfortableGreeting = "hELLO WORLD"; // ✅

// Example: Converting class names to instance names
type ClassName = "User" | "Product" | "Order";
type InstanceName = Uncapitalize<ClassName>;
// type InstanceName = "user" | "product" | "order"

const instanceName: InstanceName = "user"; // ✅

// ============================================================================
// 7. ADVANCED EXAMPLES
// ============================================================================

// ============================================================================
// 7.1. Combining Multiple String Manipulation Types
// ============================================================================

type EventType = "click" | "hover" | "focus";
type HandlerName<Event extends string> = `on${Capitalize<Event>}`;
type EventHandlers = HandlerName<EventType>;
// type EventHandlers = "onClick" | "onHover" | "onFocus"

const onClick: EventHandlers = "onClick"; // ✅
const onHover: EventHandlers = "onHover"; // ✅

// ============================================================================
// 7.2. Creating API Endpoint Types
// ============================================================================

type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";
type Resource = "user" | "product" | "order";

type APIEndpoint = `/${Resource}/${Uppercase<HTTPMethod>}`;
// type APIEndpoint = 
//   "/user/GET" | "/user/POST" | "/user/PUT" | "/user/DELETE" |
//   "/product/GET" | "/product/POST" | "/product/PUT" | "/product/DELETE" |
//   "/order/GET" | "/order/POST" | "/order/PUT" | "/order/DELETE"

const userGetEndpoint: APIEndpoint = "/user/GET"; // ✅
const productPostEndpoint: APIEndpoint = "/product/POST"; // ✅

// ============================================================================
// 7.3. Creating CSS Property Types
// ============================================================================

type CSSProperty = "margin" | "padding" | "border";
type CSSSide = "top" | "right" | "bottom" | "left";

type CSSPropertyWithSide = `${CSSProperty}-${CSSSide}`;
// type CSSPropertyWithSide = 
//   "margin-top" | "margin-right" | "margin-bottom" | "margin-left" |
//   "padding-top" | "padding-right" | "padding-bottom" | "padding-left" |
//   "border-top" | "border-right" | "border-bottom" | "border-left"

const marginTop: CSSPropertyWithSide = "margin-top"; // ✅
const paddingLeft: CSSPropertyWithSide = "padding-left"; // ✅

// ============================================================================
// 7.4. Creating Type-Safe Event System
// ============================================================================

type EventName = "load" | "error" | "success";
type EventHandler<Event extends EventName> = `handle${Capitalize<Event>}`;

type EventHandlers2 = EventHandler<EventName>;
// type EventHandlers2 = "handleLoad" | "handleError" | "handleSuccess"

// Example: Type-safe event emitter
type EventEmitter<T extends Record<string, any>> = {
  on<Event extends keyof T & string>(
    event: `${Event}Changed`,
    handler: (data: T[Event]) => void
  ): void;
};

interface UserData {
  name: string;
  age: number;
  email: string;
}

declare function createEventEmitter<T extends Record<string, any>>(
  data: T
): EventEmitter<T>;

const userEmitter = createEventEmitter<UserData>({
  name: "John",
  age: 30,
  email: "john@example.com",
});

// Type-safe event listeners
userEmitter.on("nameChanged", (newName) => {
  // newName is inferred as string
  console.log(`Name changed to: ${newName}`);
});

userEmitter.on("ageChanged", (newAge) => {
  // newAge is inferred as number
  console.log(`Age changed to: ${newAge}`);
});

// ============================================================================
// 7.5. Creating Path Types
// ============================================================================

type PathSegment = "users" | "posts" | "comments";
type PathID = `${PathSegment}/${string}`;
// type PathID = "users/${string}" | "posts/${string}" | "comments/${string}"

// More specific path types
type SpecificPath = `${PathSegment}/${number}`;
// type SpecificPath = "users/${number}" | "posts/${number}" | "comments/${number}"

// ============================================================================
// 7.6. Creating Action Types (Redux-style)
// ============================================================================

type ActionType = "fetch" | "create" | "update" | "delete";
type Resource2 = "user" | "product";

type Action = `${Uppercase<ActionType>}_${Capitalize<Resource2>}`;
// type Action = 
//   "FETCH_User" | "FETCH_Product" |
//   "CREATE_User" | "CREATE_Product" |
//   "UPDATE_User" | "UPDATE_Product" |
//   "DELETE_User" | "DELETE_Product"

const fetchUserAction: Action = "FETCH_User"; // ✅
const createProductAction: Action = "CREATE_Product"; // ✅

// ============================================================================
// 7.7. Utility Type for Creating Getter/Setter Names
// ============================================================================

type GetterName<Prop extends string> = `get${Capitalize<Prop>}`;
type SetterName<Prop extends string> = `set${Capitalize<Prop>}`;

type PropertyName = "name" | "age" | "email";

type Getters = GetterName<PropertyName>;
// type Getters = "getName" | "getAge" | "getEmail"

type Setters = SetterName<PropertyName>;
// type Setters = "setName" | "setAge" | "setEmail"

const getName: Getters = "getName"; // ✅
const setAge: Setters = "setAge"; // ✅

// ============================================================================
// 8. COMPLEX NESTED TEMPLATE LITERALS
// ============================================================================

type Theme = "light" | "dark";
type Component = "button" | "input" | "card";
type Variant = "primary" | "secondary" | "tertiary";

type ThemeComponentVariant = `${Theme}-${Component}-${Variant}`;
// Creates 18 combinations (2 themes × 3 components × 3 variants)

const lightButtonPrimary: ThemeComponentVariant = "light-button-primary"; // ✅
const darkInputSecondary: ThemeComponentVariant = "dark-input-secondary"; // ✅

// ============================================================================
// 9. CONDITIONAL TEMPLATE LITERALS
// ============================================================================

// You can combine template literals with conditional types

type ConditionalPath<T extends string> = T extends "api"
  ? `${T}/${string}`
  : `${T}-${string}`;

type ApiPath = ConditionalPath<"api">;
// type ApiPath = "api/${string}"

type OtherPath = ConditionalPath<"admin">;
// type OtherPath = "admin-${string}"

// ============================================================================
// 10. EXTRACTING TYPES FROM TEMPLATE LITERALS
// ============================================================================

// Extract the base type from a template literal type

type ExtractEventName<T extends string> = T extends `${infer Base}Changed`
  ? Base
  : never;

type EventName2 = ExtractEventName<"firstNameChanged">;
// type EventName2 = "firstName"

type EventName3 = ExtractEventName<"ageChanged">;
// type EventName3 = "age"

// Extract multiple parts
type ExtractPathParts<T extends string> = T extends `${infer Segment}/${infer Rest}`
  ? [Segment, Rest]
  : never;

type PathParts = ExtractPathParts<"users/123">;
// type PathParts = ["users", "123"]

// ============================================================================
// SUMMARY
// ============================================================================

/*
Template Literal Types provide powerful ways to:

1. Create new string literal types by concatenating existing ones
2. Generate union types from template literals with unions
3. Cross-multiply unions in template literals
4. Create type-safe APIs based on object properties
5. Use intrinsic string manipulation types (Uppercase, Lowercase, Capitalize, Uncapitalize)
6. Extract and transform string types using template literals
7. Build complex type-safe systems (event handlers, API endpoints, CSS properties, etc.)

Key Benefits:
- Type safety at compile time
- Autocomplete support
- Prevents typos and invalid strings
- Makes code self-documenting
- Enables powerful type inference
*/

