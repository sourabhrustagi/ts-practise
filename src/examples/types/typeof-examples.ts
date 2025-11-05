/**
 * typeof Type Operator Examples
 * 
 * TypeScript adds a typeof operator you can use in a type context to refer to 
 * the type of a variable or property.
 */

// ============================================================================
// Basic typeof Usage
// ============================================================================

// Basic type inference with typeof
let s = "hello";
let n: typeof s; // n has type: string

// typeof with different variable types
let num = 42;
let bool = true;
let arr = [1, 2, 3];
let obj = { name: "John", age: 30 };

type NumType = typeof num;      // number
type BoolType = typeof bool;     // boolean
type ArrType = typeof arr;       // number[]
type ObjType = typeof obj;       // { name: string; age: number; }

// ============================================================================
// typeof with Functions
// ============================================================================

// Simple function
function greet(name: string): string {
    return `Hello, ${name}!`;
}

// Using typeof to get the function type
type GreetFunction = typeof greet;
// GreetFunction is: (name: string) => string

// Function that returns an object
function createUser() {
    return { 
        id: 1, 
        name: "Alice", 
        email: "alice@example.com",
        active: true
    };
}

// Using typeof to capture the return type
type UserReturnType = ReturnType<typeof createUser>;
// UserReturnType is: { id: number; name: string; email: string; active: boolean; }

// ============================================================================
// typeof with ReturnType Utility
// ============================================================================

// Example: Predicate function
type Predicate = (x: unknown) => boolean;
type K = ReturnType<Predicate>; // K is: boolean

// Real-world example
function fetchUser(id: number) {
    return {
        id: id,
        name: "John Doe",
        age: 30,
        isActive: true
    };
}

// Error: 'fetchUser' refers to a value, but is being used as a type here
// type P = ReturnType<fetchUser>; // ❌ This would cause an error

// Correct: Use typeof to get the type first
type P = ReturnType<typeof fetchUser>;
// P is: { id: number; name: string; age: number; isActive: boolean; }

// ============================================================================
// typeof with Complex Functions
// ============================================================================

// Async function example
async function fetchData(url: string): Promise<{ data: any; status: number }> {
    return {
        data: { result: "success" },
        status: 200
    };
}

type FetchDataReturn = ReturnType<typeof fetchData>;
// FetchDataReturn is: Promise<{ data: any; status: number }>

// Function with multiple overloads
function format(value: string): string;
function format(value: number): string;
function format(value: string | number): string {
    return String(value);
}

type FormatFunction = typeof format;
// FormatFunction captures the overloaded function signature

// ============================================================================
// typeof with Object Properties
// ============================================================================

const config = {
    apiUrl: "https://api.example.com",
    timeout: 5000,
    retries: 3,
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer token"
    }
};

// Get type of entire config object
type ConfigType = typeof config;
// ConfigType is: { apiUrl: string; timeout: number; retries: number; headers: {...} }

// Get type of specific property
type ApiUrlType = typeof config.apiUrl;      // string
type TimeoutType = typeof config.timeout;    // number
type HeadersType = typeof config.headers;    // { "Content-Type": string; "Authorization": string; }

// ============================================================================
// typeof with Arrays
// ============================================================================

const colors = ["red", "green", "blue"] as const;
type ColorsType = typeof colors;
// ColorsType is: readonly ["red", "green", "blue"]

// Get type of array element
type ColorType = typeof colors[number];
// ColorType is: "red" | "green" | "blue"

// ============================================================================
// typeof Combined with Other Type Operators
// ============================================================================

// Combining typeof with keyof
type ConfigKeys = keyof typeof config;
// ConfigKeys is: "apiUrl" | "timeout" | "retries" | "headers"

// Combining typeof with Parameters utility
function calculate(a: number, b: number, operation: "add" | "subtract"): number {
    return operation === "add" ? a + b : a - b;
}

type CalculateParams = Parameters<typeof calculate>;
// CalculateParams is: [a: number, b: number, operation: "add" | "subtract"]

// Extract parameter types
type FirstParam = Parameters<typeof calculate>[0];  // number
type SecondParam = Parameters<typeof calculate>[1]; // number
type OperationParam = Parameters<typeof calculate>[2]; // "add" | "subtract"

// ============================================================================
// typeof Limitations
// ============================================================================

// ✅ Legal: typeof on identifiers (variable names)
let msg = "Hello";
type MsgType = typeof msg; // ✅ Works

// ✅ Legal: typeof on properties
type MsgLength = typeof msg.length; // ✅ Works (but msg.length is a number, so this is just number)

// ❌ Illegal: typeof on function calls
// let shouldContinue: typeof msgbox("Are you sure?"); 
// Error: ',' expected. Cannot use typeof on function call expressions

// ✅ Legal: typeof on function name (not call)
function msgbox(message: string): boolean {
    return confirm(message);
}

type MsgboxType = typeof msgbox; // ✅ Works: (message: string) => boolean
type MsgboxReturn = ReturnType<typeof msgbox>; // ✅ Works: boolean

// ============================================================================
// Practical Examples
// ============================================================================

// Example 1: Type-safe API client
const apiClient = {
    get: async (url: string) => ({ data: {}, status: 200 }),
    post: async (url: string, body: any) => ({ data: {}, status: 201 }),
    delete: async (url: string) => ({ status: 204 })
};

type ApiClient = typeof apiClient;
type GetMethod = typeof apiClient.get;
type GetReturn = ReturnType<typeof apiClient.get>;

// Example 2: Event handler types
function handleClick(event: MouseEvent) {
    console.log("Clicked!");
}

function handleKeyPress(event: KeyboardEvent) {
    console.log("Key pressed!");
}

const eventHandlers = {
    click: handleClick,
    keypress: handleKeyPress
};

type EventHandlers = typeof eventHandlers;
type ClickHandler = typeof eventHandlers.click;
type ClickHandlerParams = Parameters<typeof eventHandlers.click>; // [MouseEvent]

// Example 3: Configuration validation
const appConfig = {
    environment: "production" as const,
    debug: false,
    features: {
        analytics: true,
        logging: true
    }
};

type AppConfig = typeof appConfig;
type Environment = typeof appConfig.environment; // "production"
type Features = typeof appConfig.features; // { analytics: boolean; logging: boolean; }

// ============================================================================
// Export for testing/usage
// ============================================================================

export {
    // Types
    GreetFunction,
    UserReturnType,
    P,
    ConfigType,
    ColorsType,
    ColorType,
    ApiClient,
    EventHandlers,
    AppConfig,
    
    // Functions
    greet,
    createUser,
    fetchUser,
    fetchData,
    format,
    calculate,
    msgbox,
    handleClick,
    handleKeyPress,
    
    // Variables
    config,
    colors,
    apiClient,
    eventHandlers,
    appConfig
};

