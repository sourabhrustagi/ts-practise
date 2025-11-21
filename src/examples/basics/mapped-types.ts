/**
 * Mapped Types Examples
 * Demonstrates how to create new types based on existing types using mapped types
 * Based on TypeScript Handbook: Mapped Types
 */

// ============================================================================
// 1. INDEX SIGNATURES (Foundation for Mapped Types)
// ============================================================================

// Index signatures are used to declare types for properties not declared ahead of time
type OnlyBoolsAndHorses = {
  [key: string]: boolean | Horse;
};

interface Horse {
  name: string;
  breed: string;
}

const conforms: OnlyBoolsAndHorses = {
  del: true,
  rodney: false,
  thunder: { name: "Thunder", breed: "Arabian" },
};

// ============================================================================
// 2. BASIC MAPPED TYPES
// ============================================================================

// A mapped type is a generic type which uses a union of PropertyKeys
// (frequently created via keyof) to iterate through keys to create a type
type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};

// Example usage: Convert all properties to boolean
type Features = {
  darkMode: () => void;
  newUserProfile: () => void;
};

type FeatureOptions = OptionsFlags<Features>;
// Result:
// type FeatureOptions = {
//     darkMode: boolean;
//     newUserProfile: boolean;
// }

const featureConfig: FeatureOptions = {
  darkMode: true,
  newUserProfile: false,
};

// ============================================================================
// 3. MAPPING MODIFIERS - READONLY
// ============================================================================

// Remove 'readonly' attributes from a type's properties
type CreateMutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property];
};

type LockedAccount = {
  readonly id: string;
  readonly name: string;
};

type UnlockedAccount = CreateMutable<LockedAccount>;
// Result:
// type UnlockedAccount = {
//     id: string;
//     name: string;
// }

const account: UnlockedAccount = {
  id: "123",
  name: "John Doe",
};
account.id = "456"; // Now mutable!

// Add 'readonly' attributes (default behavior, but explicit with +)
type MakeReadonly<Type> = {
  +readonly [Property in keyof Type]: Type[Property];
};

type MutableConfig = {
  apiKey: string;
  timeout: number;
};

type ReadonlyConfig = MakeReadonly<MutableConfig>;

// ============================================================================
// 4. MAPPING MODIFIERS - OPTIONAL
// ============================================================================

// Remove 'optional' attributes from a type's properties
type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property];
};

type MaybeUser = {
  id: string;
  name?: string;
  age?: number;
};

type User = Concrete<MaybeUser>;
// Result:
// type User = {
//     id: string;
//     name: string;
//     age: number;
// }

const user: User = {
  id: "1",
  name: "Alice", // Required now
  age: 30, // Required now
};

// Make all properties optional
type MakeOptional<Type> = {
  [Property in keyof Type]?: Type[Property];
};

type RequiredUser = {
  id: string;
  name: string;
  email: string;
};

type OptionalUser = MakeOptional<RequiredUser>;

// ============================================================================
// 5. KEY REMAPPING VIA 'as'
// ============================================================================

// In TypeScript 4.1+, you can re-map keys in mapped types with an 'as' clause
// The 'as' clause allows you to transform the key type
// Example: Add prefix to all keys
type PrefixedKeys<Type, Prefix extends string> = {
  [Property in keyof Type as `${Prefix}${string & Property}`]: Type[Property];
};

type PrefixedUser = PrefixedKeys<Person, "user_">;
// Result:
// type PrefixedUser = {
//     user_name: string;
//     user_age: number;
//     user_location: string;
// }

// ============================================================================
// 6. KEY REMAPPING WITH TEMPLATE LITERAL TYPES
// ============================================================================

// Use template literal types to create new property names from prior ones
type Getters<Type> = {
  [Property in keyof Type as `get${Capitalize<string & Property>}`]: () => Type[Property];
};

interface Person {
  name: string;
  age: number;
  location: string;
}

type LazyPerson = Getters<Person>;
// Result:
// type LazyPerson = {
//     getName: () => string;
//     getAge: () => number;
//     getLocation: () => string;
// }

// Example implementation
class PersonClass implements LazyPerson {
  constructor(private person: Person) {}

  getName = () => this.person.name;
  getAge = () => this.person.age;
  getLocation = () => this.person.location;
}

// Create setters using template literals
type Setters<Type> = {
  [Property in keyof Type as `set${Capitalize<string & Property>}`]: (
    value: Type[Property]
  ) => void;
};

type PersonSetters = Setters<Person>;
// Result:
// type PersonSetters = {
//     setName: (value: string) => void;
//     setAge: (value: number) => void;
//     setLocation: (value: string) => void;
// }

// ============================================================================
// 7. FILTERING KEYS WITH CONDITIONAL TYPES
// ============================================================================

// Remove specific keys by producing 'never' via a conditional type
type RemoveKindField<Type> = {
  [Property in keyof Type as Exclude<Property, "kind">]: Type[Property];
};

interface Circle {
  kind: "circle";
  radius: number;
}

type KindlessCircle = RemoveKindField<Circle>;
// Result:
// type KindlessCircle = {
//     radius: number;
// }

const circle: KindlessCircle = {
  radius: 10,
  // kind is removed!
};

// Remove multiple keys
type RemoveFields<Type, Keys extends keyof Type> = {
  [Property in keyof Type as Exclude<Property, Keys>]: Type[Property];
};

interface UserWithMetadata {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

type UserWithoutTimestamps = RemoveFields<UserWithMetadata, "createdAt" | "updatedAt">;

// Filter keys based on property type
type StringKeysOnly<Type> = {
  [Property in keyof Type as Type[Property] extends string
    ? Property
    : never]: Type[Property];
};

interface MixedTypes {
  id: string;
  age: number;
  name: string;
  isActive: boolean;
}

type StringOnly = StringKeysOnly<MixedTypes>;
// Result:
// type StringOnly = {
//     id: string;
//     name: string;
// }

// ============================================================================
// 8. MAPPING OVER ARBITRARY UNIONS
// ============================================================================

// Map over unions of any type, not just string | number | symbol
type EventConfig<Events extends { kind: string }> = {
  [E in Events as E["kind"]]: (event: E) => void;
};

type SquareEvent = { kind: "square"; x: number; y: number };
type CircleEvent = { kind: "circle"; radius: number };

type Config = EventConfig<SquareEvent | CircleEvent>;
// Result:
// type Config = {
//     square: (event: SquareEvent) => void;
//     circle: (event: CircleEvent) => void;
// }

const eventHandlers: Config = {
  square: (event) => {
    console.log(`Square at (${event.x}, ${event.y})`);
  },
  circle: (event) => {
    console.log(`Circle with radius ${event.radius}`);
  },
};

// ============================================================================
// 9. MAPPED TYPES WITH CONDITIONAL TYPES
// ============================================================================

// Use conditional types within mapped types to transform property types
type ExtractPII<Type> = {
  [Property in keyof Type]: Type[Property] extends { pii: true } ? true : false;
};

type DBFields = {
  id: { format: "incrementing" };
  name: { type: string; pii: true };
  email: { type: string; pii: true };
  password: { type: string; pii: false };
};

type ObjectsNeedingGDPRDeletion = ExtractPII<DBFields>;
// Result:
// type ObjectsNeedingGDPRDeletion = {
//     id: false;
//     name: true;
//     email: true;
//     password: false;
// }

// Extract properties that match a condition
type ExtractByType<Type, Condition> = {
  [Property in keyof Type as Type[Property] extends Condition
    ? Property
    : never]: Type[Property];
};

interface ApiResponse {
  data: string[];
  status: number;
  message: string;
  timestamp: Date;
}

type StringProperties = ExtractByType<ApiResponse, string>;
// Result:
// type StringProperties = {
//     message: string;
// }

// ============================================================================
// 10. PRACTICAL EXAMPLES
// ============================================================================

// Example 1: Make all properties nullable
type Nullable<Type> = {
  [Property in keyof Type]: Type[Property] | null;
};

type Product = {
  id: string;
  name: string;
  price: number;
};

type NullableProduct = Nullable<Product>;

// Example 2: Create a partial deep clone (all properties optional and values can be functions)
type DeepPartial<Type> = {
  [Property in keyof Type]?: Type[Property] extends object
    ? DeepPartial<Type[Property]>
    : Type[Property];
};

interface NestedConfig {
  database: {
    host: string;
    port: number;
    credentials: {
      username: string;
      password: string;
    };
  };
  api: {
    baseUrl: string;
    timeout: number;
  };
}

type PartialConfig = DeepPartial<NestedConfig>;

// Example 3: Create a record type from a union
type UnionToRecord<Union extends string> = {
  [Key in Union]: Key;
};

type Theme = "light" | "dark" | "auto";

type ThemeRecord = UnionToRecord<Theme>;
// Result:
// type ThemeRecord = {
//     light: "light";
//     dark: "dark";
//     auto: "auto";
// }

// Example 4: Pick by value type
type PickByType<Type, ValueType> = {
  [Property in keyof Type as Type[Property] extends ValueType
    ? Property
    : never]: Type[Property];
};

interface MixedData {
  name: string;
  age: number;
  email: string;
  score: number;
  active: boolean;
}

type NumberFields = PickByType<MixedData, number>;
// Result:
// type NumberFields = {
//     age: number;
//     score: number;
// }

// Example 5: Create a type with all methods from a class
type MethodsOf<T> = {
  [K in keyof T as T[K] extends (...args: any[]) => any ? K : never]: T[K];
};

class Calculator {
  add(a: number, b: number): number {
    return a + b;
  }
  subtract(a: number, b: number): number {
    return a - b;
  }
  value: number = 0; // Not a method
}

type CalculatorMethods = MethodsOf<Calculator>;
// Result:
// type CalculatorMethods = {
//     add: (a: number, b: number) => number;
//     subtract: (a: number, b: number) => number;
// }

// ============================================================================
// 11. ADVANCED: COMBINING MULTIPLE MAPPED TYPE FEATURES
// ============================================================================

// Combine readonly, optional removal, and key remapping
type StrictConfig<Type> = {
  readonly [Property in keyof Type as `config_${string & Property}`]-?: Type[Property];
};

interface AppSettings {
  apiKey?: string;
  timeout?: number;
  debug?: boolean;
}

type StrictAppSettings = StrictConfig<AppSettings>;
// Result:
// type StrictAppSettings = {
//     readonly config_apiKey: string;
//     readonly config_timeout: number;
//     readonly config_debug: boolean;
// }

// Create a type that maps object to its getter/setter pairs
type GetterSetter<Type> = {
  [Property in keyof Type as `get${Capitalize<string & Property>}`]: () => Type[Property];
} & {
  [Property in keyof Type as `set${Capitalize<string & Property>}`]: (
    value: Type[Property]
  ) => void;
};

type PersonAccessors = GetterSetter<Person>;

// ============================================================================
// EXPORTS FOR TESTING
// ============================================================================

export {
  OptionsFlags,
  FeatureOptions,
  CreateMutable,
  UnlockedAccount,
  Concrete,
  User,
  Getters,
  LazyPerson,
  RemoveKindField,
  KindlessCircle,
  EventConfig,
  Config,
  ExtractPII,
  ObjectsNeedingGDPRDeletion,
  Nullable,
  DeepPartial,
  UnionToRecord,
  PickByType,
  MethodsOf,
  StrictConfig,
  GetterSetter,
};

