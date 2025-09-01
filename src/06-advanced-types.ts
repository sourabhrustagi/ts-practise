// ========================================
// 6. ADVANCED TYPES - TypeScript Advanced Type Features
// ========================================

// Utility Types
interface User {
    id: number;
    name: string;
    email: string;
    age: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt?: Date;
}

// Partial<T> - Makes all properties optional
type PartialUser = Partial<User>;

// Required<T> - Makes all properties required
type RequiredUser = Required<User>;

// Readonly<T> - Makes all properties readonly
type ReadonlyUser = Readonly<User>;

// Pick<T, K> - Picks specific properties
type UserBasicInfo = Pick<User, 'id' | 'name' | 'email'>;

// Omit<T, K> - Omits specific properties
type UserWithoutTimestamps = Omit<User, 'createdAt' | 'updatedAt'>;

// Record<K, T> - Creates object type with specific keys and values
type UserRoles = Record<string, User>;

// Exclude<T, U> - Excludes types from union
type NonNullableUser = Exclude<User | null | undefined, null | undefined>;

// Extract<T, U> - Extracts types from union
type StringOrNumber = Extract<string | number | boolean, string | number>;

// NonNullable<T> - Removes null and undefined
type NonNullableString = NonNullable<string | null | undefined>;

// ReturnType<T> - Gets return type of function
type AddFunctionReturn = ReturnType<typeof add>;

function add(a: number, b: number): number {
    return a + b;
}

// Parameters<T> - Gets parameters of function
type AddFunctionParams = Parameters<typeof add>;

// InstanceType<T> - Gets instance type of class
class UserClass {
    constructor(public name: string) {}
}
type UserInstance = InstanceType<typeof UserClass>;

// ConstructorParameters<T> - Gets constructor parameters
type UserClassParams = ConstructorParameters<typeof UserClass>;

// ThisType<T> - Specifies the type of 'this' in a function
interface CalculatorContext {
    value: number;
    add(x: number): void;
}

function calculator(this: CalculatorContext, x: number) {
    this.value += x;
}

// Conditional Types
type IsString<T> = T extends string ? true : false;
type IsNumber<T> = T extends number ? true : false;
type IsArray<T> = T extends any[] ? true : false;

// Conditional type with inference
type ArrayElement<T> = T extends (infer U)[] ? U : never;
type StringArrayElement = ArrayElement<string[]>; // string
type NumberArrayElement = ArrayElement<number[]>; // number

// Conditional type with multiple conditions
type TypeName<T> = T extends string
    ? "string"
    : T extends number
    ? "number"
    : T extends boolean
    ? "boolean"
    : T extends undefined
    ? "undefined"
    : T extends Function
    ? "function"
    : "object";

// Conditional type with distributive property
type ToArray<T> = T extends any ? T[] : never;
type StringOrNumberArray = ToArray<string | number>; // string[] | number[]

// Non-distributive conditional type
type ToArrayNonDist<T> = [T] extends [any] ? T[] : never;
type StringOrNumberArrayNonDist = ToArrayNonDist<string | number>; // (string | number)[]

// Mapped Types
type Optional<T> = {
    [K in keyof T]?: T[K];
};

type Required<T> = {
    [K in keyof T]-?: T[K];
};

type Readonly<T> = {
    readonly [K in keyof T]: T[K];
};

type Mutable<T> = {
    -readonly [K in keyof T]: T[K];
};

// Mapped type with conditional
type ConditionalOptional<T> = {
    [K in keyof T]: T[K] extends string ? T[K] : T[K] | undefined;
};

// Mapped type with template literal
type EventHandlers<T> = {
    [K in keyof T as `on${Capitalize<string & K>}`]: (event: T[K]) => void;
};

type DOMEvents = {
    click: MouseEvent;
    keydown: KeyboardEvent;
    submit: SubmitEvent;
};

type DOMEventHandlers = EventHandlers<DOMEvents>;

// Template Literal Types
type EmailLocale = "en" | "es" | "fr";
type EmailTemplate = `welcome_${EmailLocale}`;
type EmailSubject = `Welcome to our service - ${EmailLocale}`;

// Template literal with inference
type ExtractRouteParams<T extends string> = T extends `${string}:${infer Param}/${infer Rest}`
    ? Param | ExtractRouteParams<Rest>
    : T extends `${string}:${infer Param}`
    ? Param
    : never;

type RouteParams = ExtractRouteParams<"/users/:id/posts/:postId/comments/:commentId">;

// Template literal with conditional
type ConditionalTemplate<T> = T extends string
    ? `Hello ${T}`
    : T extends number
    ? `Number ${T}`
    : `Unknown ${T}`;

// Template literal with union
type ActionType = "create" | "update" | "delete";
type ResourceType = "user" | "post" | "comment";
type ActionTemplate = `${ActionType}_${ResourceType}`;

// Branded Types
type UserId = number & { readonly brand: unique symbol };
type Email = string & { readonly brand: unique symbol };
type Password = string & { readonly brand: unique symbol };

function createUserId(id: number): UserId {
    return id as UserId;
}

function createEmail(email: string): Email {
    return email as Email;
}

function createPassword(password: string): Password {
    return password as Password;
}

// Intersection Types
interface HasId {
    id: number;
}

interface HasName {
    name: string;
}

interface HasEmail {
    email: string;
}

type CompleteUser = HasId & HasName & HasEmail;

// Intersection with conditional
type ConditionalIntersection<T> = T extends string
    ? HasId & HasName
    : T extends number
    ? HasId & HasEmail
    : HasName & HasEmail;

// Union Types
type Status = "loading" | "success" | "error";
type ID = string | number;
type Result<T> = { success: true; data: T } | { success: false; error: string };

// Union with conditional
type ConditionalUnion<T> = T extends string
    ? "string_result"
    : T extends number
    ? "number_result"
    : "unknown_result";

// Indexed Access Types
interface Database {
    users: User[];
    posts: Post[];
    comments: Comment[];
}

interface Post {
    id: number;
    title: string;
    content: string;
    authorId: number;
}

interface Comment {
    id: number;
    content: string;
    postId: number;
    authorId: number;
}

type DatabaseEntity = Database[keyof Database][number];
type UserEntity = Database["users"][number];
type PostEntity = Database["posts"][number];

// Indexed access with conditional
type ConditionalIndex<T, K extends keyof T> = T[K] extends (infer U)[]
    ? U
    : T[K];

// Recursive Types
type JSONValue = 
    | string
    | number
    | boolean
    | null
    | JSONValue[]
    | { [key: string]: JSONValue };

// Recursive type with conditional
type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

// Recursive type with inference
type DeepReadonly<T> = {
    readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

// Type Guards with Advanced Types
function isUser(obj: unknown): obj is User {
    return (
        typeof obj === "object" &&
        obj !== null &&
        "id" in obj &&
        "name" in obj &&
        "email" in obj
    );
}

function isUserArray(arr: unknown): arr is User[] {
    return Array.isArray(arr) && arr.every(isUser);
}

// Type predicates with conditional types
function isStringArray(arr: unknown): arr is string[] {
    return Array.isArray(arr) && arr.every(item => typeof item === "string");
}

// Advanced Type Guards
type TypeGuard<T> = (value: unknown) => value is T;

function createTypeGuard<T>(predicate: (value: unknown) => boolean): TypeGuard<T> {
    return predicate as TypeGuard<T>;
}

const isNumberArray = createTypeGuard<number[]>(
    (value): value is number[] => Array.isArray(value) && value.every(item => typeof item === "number")
);

// Conditional Type Guards
type ConditionalTypeGuard<T, U> = T extends U ? (value: T) => value is U : never;

// Mapped Type Guards
type TypeGuardMap<T> = {
    [K in keyof T]: TypeGuard<T[K]>;
};

// Template Literal Type Guards
type EventName = "click" | "hover" | "focus";
type EventHandlerName = `on${Capitalize<EventName>}`;

function isEventHandler(name: string): name is EventHandlerName {
    return /^on[A-Z]/.test(name);
}

// Advanced Utility Types
type DeepRequired<T> = {
    [K in keyof T]-?: T[K] extends object ? DeepRequired<T[K]> : T[K];
};

type DeepPick<T, K extends string> = K extends keyof T
    ? { [P in K]: T[P] }
    : K extends `${infer First}.${infer Rest}`
    ? First extends keyof T
        ? { [P in First]: DeepPick<T[P], Rest> }
        : never
    : never;

type DeepOmit<T, K extends string> = K extends keyof T
    ? Omit<T, K>
    : K extends `${infer First}.${infer Rest}`
    ? First extends keyof T
        ? { [P in First]: DeepOmit<T[P], Rest> }
        : T
    : T;

// Conditional Utility Types
type ConditionalPick<T, U> = {
    [K in keyof T as T[K] extends U ? K : never]: T[K];
};

type ConditionalOmit<T, U> = {
    [K in keyof T as T[K] extends U ? never : K]: T[K];
};

// Template Literal Utility Types
type CamelCase<S extends string> = S extends `${infer P1}_${infer P2}${infer P3}`
    ? `${Lowercase<P1>}${Uppercase<P2>}${CamelCase<P3>}`
    : Lowercase<S>;

type SnakeCase<S extends string> = S extends `${infer T}${infer U}`
    ? `${T extends Capitalize<T> ? "_" : ""}${Lowercase<T>}${SnakeCase<U>}`
    : S;

// Advanced Conditional Types
type If<C extends boolean, T, F> = C extends true ? T : F;

type IsEqual<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2)
    ? true
    : false;

type IsNever<T> = [T] extends [never] ? true : false;

type IsAny<T> = 0 extends (1 & T) ? true : false;

// Advanced Mapped Types
type Writable<T> = {
    -readonly [K in keyof T]: T[K];
};

type Optional<T> = {
    [K in keyof T]?: T[K];
};

type Required<T> = {
    [K in keyof T]-?: T[K];
};

// Advanced Template Literal Types
type Join<T extends string[], D extends string> = T extends []
    ? ""
    : T extends [infer F]
    ? F
    : T extends [infer F, ...infer R]
    ? F extends string
        ? R extends string[]
            ? `${F}${D}${Join<R, D>}`
            : never
        : never
    : string;

type Split<S extends string, D extends string> = S extends ""
    ? []
    : S extends `${infer T}${D}${infer U}`
    ? [T, ...Split<U, D>]
    : [S];

console.log("=== TypeScript Advanced Types Examples ===");

// Utility types examples
const partialUser: PartialUser = { name: "John" };
const requiredUser: RequiredUser = {
    id: 1,
    name: "John",
    email: "john@example.com",
    age: 30,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
};

const userBasicInfo: UserBasicInfo = {
    id: 1,
    name: "John",
    email: "john@example.com"
};

// Conditional types examples
type StringTest = IsString<string>; // true
type NumberTest = IsNumber<number>; // true
type ArrayTest = IsArray<string[]>; // true

// Template literal types examples
const emailTemplate: EmailTemplate = "welcome_en";
const actionTemplate: ActionTemplate = "create_user";

// Branded types examples
const userId = createUserId(123);
const userEmail = createEmail("user@example.com");

// Type guards examples
const userData = { id: 1, name: "John", email: "john@example.com", age: 30, isActive: true, createdAt: new Date() };
console.log("Is user:", isUser(userData));
console.log("Is number array:", isNumberArray([1, 2, 3, 4, 5]));

// Advanced utility types examples
type DeepPartialUser = DeepPartial<User>;
type DeepReadonlyUser = DeepReadonly<User>;

console.log("Partial user:", partialUser);
console.log("User basic info:", userBasicInfo);
console.log("Email template:", emailTemplate);
console.log("Action template:", actionTemplate);
console.log("User ID:", userId);
console.log("User email:", userEmail);


