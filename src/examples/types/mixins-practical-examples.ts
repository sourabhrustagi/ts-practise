/**
 * Mixins - Practical Real-World Examples
 * 
 * This file demonstrates practical, real-world use cases for mixins
 * in different application domains.
 */

// ============================================================================
// TYPE DEFINITIONS FOR MIXINS
// ============================================================================

type Constructor = new (...args: any[]) => {};
type GConstructor<T = {}> = new (...args: any[]) => T;

// ============================================================================
// EXAMPLE 1: Database Model Mixins
// ============================================================================

// Base model class
class Model {
  id: string | null = null;
}

// Timestamp mixin - adds created/updated timestamps
function WithTimestamps<TBase extends Constructor>(Base: TBase) {
  return class WithTimestamps extends Base {
    createdAt: Date = new Date();
    updatedAt: Date = new Date();

    updateTimestamp(): void {
      this.updatedAt = new Date();
    }
  };
}

// Soft delete mixin - adds soft delete functionality
function WithSoftDelete<TBase extends Constructor>(Base: TBase) {
  return class WithSoftDelete extends Base {
    deletedAt: Date | null = null;

    softDelete(): void {
      this.deletedAt = new Date();
    }

    restore(): void {
      this.deletedAt = null;
    }

    get isDeleted(): boolean {
      return this.deletedAt !== null;
    }
  };
}

// Versioning mixin - adds version tracking
function WithVersioning<TBase extends Constructor>(Base: TBase) {
  return class WithVersioning extends Base {
    version = 1;

    incrementVersion(): void {
      this.version++;
    }
  };
}

// Compose different model types
const TimestampedModel = WithTimestamps(Model);
const SoftDeletableModel = WithSoftDelete(Model);
const FullModel = WithVersioning(WithSoftDelete(WithTimestamps(Model)));

// Usage
const user = new FullModel();
user.id = "user123";
user.updateTimestamp();
user.incrementVersion();
console.log(user.createdAt);
console.log(user.version); // 1

// ============================================================================
// EXAMPLE 2: HTTP Request Mixins
// ============================================================================

// Base request class
class HttpRequest {
  url: string;
  method: string;

  constructor(url: string, method: string = "GET") {
    this.url = url;
    this.method = method;
  }
}

// Authentication mixin
function WithAuthentication<TBase extends Constructor>(Base: TBase) {
  return class WithAuthentication extends Base {
    _token: string | null = null;
    _headers: Record<string, string> = {};

    setAuthToken(token: string): void {
      this._token = token;
      this._headers["Authorization"] = `Bearer ${token}`;
    }

    getAuthHeaders(): Record<string, string> {
      return { ...this._headers };
    }
  };
}

// Retry mixin
function WithRetry<TBase extends Constructor>(Base: TBase) {
  return class WithRetry extends Base {
    _maxRetries = 3;
    _retryDelay = 1000;

    setRetryConfig(maxRetries: number, delay: number): void {
      this._maxRetries = maxRetries;
      this._retryDelay = delay;
    }

    async executeWithRetry<T>(
      fn: () => Promise<T>
    ): Promise<T> {
      let lastError: Error | null = null;
      
      for (let i = 0; i < this._maxRetries; i++) {
        try {
          return await fn();
        } catch (error) {
          lastError = error as Error;
          if (i < this._maxRetries - 1) {
            await new Promise((resolve) => setTimeout(resolve, this._retryDelay));
          }
        }
      }
      
      throw lastError || new Error("Retry failed");
    }
  };
}

// Caching mixin
function WithCaching<TBase extends Constructor>(Base: TBase) {
  return class WithCaching extends Base {
    _cache: Map<string, { data: any; expires: number }> = new Map();
    _defaultTTL = 60000; // 1 minute

    setCache(key: string, data: any, ttl?: number): void {
      const expires = Date.now() + (ttl || this._defaultTTL);
      this._cache.set(key, { data, expires });
    }

    getCache(key: string): any | null {
      const cached = this._cache.get(key);
      if (!cached) return null;
      
      if (Date.now() > cached.expires) {
        this._cache.delete(key);
        return null;
      }
      
      return cached.data;
    }

    clearCache(): void {
      this._cache.clear();
    }
  };
}

// Compose request types
const AuthenticatedRequest = WithAuthentication(HttpRequest);
const RetryableRequest = WithRetry(HttpRequest);
const FullRequest = WithCaching(WithRetry(WithAuthentication(HttpRequest)));

// Usage
const apiRequest = new FullRequest("https://api.example.com/data", "GET");
apiRequest.setAuthToken("abc123");
apiRequest.setRetryConfig(5, 2000);
apiRequest.setCache("data", { result: "success" }, 300000);

// ============================================================================
// EXAMPLE 3: Form Field Mixins
// ============================================================================

// Base field class
class FormField {
  name: string;
  value: any;

  constructor(name: string) {
    this.name = name;
  }
}

// Validation mixin
function WithValidation<TBase extends Constructor>(Base: TBase) {
  return class WithValidation extends Base {
    _validators: Array<(value: any) => boolean | string> = [];
    _errors: string[] = [];

    addValidator(validator: (value: any) => boolean | string): void {
      this._validators.push(validator);
    }

    validate(): boolean {
      this._errors = [];
      const value = (this as any).value;
      
      for (const validator of this._validators) {
        const result = validator(value);
        if (result !== true) {
          this._errors.push(typeof result === "string" ? result : "Validation failed");
        }
      }
      
      return this._errors.length === 0;
    }

    get errors(): string[] {
      return [...this._errors];
    }

    get isValid(): boolean {
      return this._errors.length === 0;
    }
  };
}

// Dirty tracking mixin
function WithDirtyTracking<TBase extends Constructor>(Base: TBase) {
  return class WithDirtyTracking extends Base {
    _originalValue: any;
    _isDirty = false;

    initialize(value: any): void {
      this._originalValue = value;
      (this as any).value = value;
      this._isDirty = false;
    }

    markDirty(): void {
      this._isDirty = true;
    }

    get isDirty(): boolean {
      return this._isDirty || (this as any).value !== this._originalValue;
    }

    reset(): void {
      (this as any).value = this._originalValue;
      this._isDirty = false;
    }
  };
}

// Focus mixin
function WithFocus<TBase extends Constructor>(Base: TBase) {
  return class WithFocus extends Base {
    _focused = false;

    focus(): void {
      this._focused = true;
    }

    blur(): void {
      this._focused = false;
    }

    get isFocused(): boolean {
      return this._focused;
    }
  };
}

// Compose field types
const ValidatedField = WithValidation(FormField);
const FullField = WithFocus(WithDirtyTracking(WithValidation(FormField)));

// Usage
const emailField = new FullField("email");
emailField.initialize("");
emailField.addValidator((value) => {
  if (!value) return "Email is required";
  if (!value.includes("@")) return "Email must contain @";
  return true;
});

emailField.value = "invalid";
emailField.validate();
console.log(emailField.errors); // ["Email must contain @"]
console.log(emailField.isDirty); // true

emailField.value = "user@example.com";
emailField.validate();
console.log(emailField.isValid); // true

// ============================================================================
// EXAMPLE 4: State Management Mixins
// ============================================================================

// Base state class
class State {
  // Empty base
}

// Redux-like action mixin
function WithActions<TBase extends Constructor>(Base: TBase) {
  return class WithActions extends Base {
    _actions: Map<string, Function> = new Map();

    registerAction(type: string, handler: Function): void {
      this._actions.set(type, handler);
    }

    dispatch(type: string, payload?: any): void {
      const handler = this._actions.get(type);
      if (handler) {
        handler(payload);
      }
    }
  };
}

// Observable mixin - allows subscribing to state changes
function WithObservable<TBase extends Constructor>(Base: TBase) {
  return class WithObservable extends Base {
    _subscribers: Set<(state: any) => void> = new Set();

    subscribe(callback: (state: any) => void): () => void {
      this._subscribers.add(callback);
      return () => {
        this._subscribers.delete(callback);
      };
    }

    notify(): void {
      this._subscribers.forEach((callback) => {
        callback(this);
      });
    }
  };
}

// Undo/Redo mixin
function WithHistory<TBase extends Constructor>(Base: TBase) {
  return class WithHistory extends Base {
    _history: any[] = [];
    _historyIndex = -1;

    saveState(): void {
      // Remove any "future" history if we're not at the end
      this._history = this._history.slice(0, this._historyIndex + 1);
      this._history.push(JSON.parse(JSON.stringify(this)));
      this._historyIndex++;
    }

    undo(): boolean {
      if (this._historyIndex > 0) {
        this._historyIndex--;
        Object.assign(this, this._history[this._historyIndex]);
        return true;
      }
      return false;
    }

    redo(): boolean {
      if (this._historyIndex < this._history.length - 1) {
        this._historyIndex++;
        Object.assign(this, this._history[this._historyIndex]);
        return true;
      }
      return false;
    }

    canUndo(): boolean {
      return this._historyIndex > 0;
    }

    canRedo(): boolean {
      return this._historyIndex < this._history.length - 1;
    }
  };
}

// Compose state types
const ObservableState = WithObservable(State);
const FullState = WithHistory(WithObservable(WithActions(State)));

// Usage
class CounterState extends FullState {
  count = 0;

  increment(): void {
    this.count++;
    this.saveState();
    this.notify();
  }

  decrement(): void {
    this.count--;
    this.saveState();
    this.notify();
  }
}

const counter = new CounterState();
counter.saveState(); // Initial state

counter.subscribe((state) => {
  console.log(`Count changed to: ${state.count}`);
});

counter.increment(); // Count changed to: 1
counter.increment(); // Count changed to: 2
counter.undo(); // Count changed to: 1
counter.redo(); // Count changed to: 2

// ============================================================================
// EXAMPLE 5: Logger Mixins
// ============================================================================

// Base logger class
class Logger {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

// Log level mixin
function WithLogLevels<TBase extends Constructor>(Base: TBase) {
  return class WithLogLevels extends Base {
    _level: "debug" | "info" | "warn" | "error" = "info";

    setLevel(level: "debug" | "info" | "warn" | "error"): void {
      this._level = level;
    }

    get level(): string {
      return this._level;
    }
  };
}

// Timestamp mixin for logs
function WithLogTimestamps<TBase extends Constructor>(Base: TBase) {
  return class WithLogTimestamps extends Base {
    logWithTimestamp(message: string, level: string): void {
      const timestamp = new Date().toISOString();
      console.log(`[${timestamp}] [${level.toUpperCase()}] ${(this as any).name}: ${message}`);
    }
  };
}

// File output mixin (simulated)
function WithFileOutput<TBase extends Constructor>(Base: TBase) {
  return class WithFileOutput extends Base {
    _logFile: string[] = [];

    writeToFile(message: string): void {
      this._logFile.push(message);
    }

    getLogFile(): string[] {
      return [...this._logFile];
    }

    clearLogFile(): void {
      this._logFile = [];
    }
  };
}

// Compose logger types
const TimestampedLogger = WithLogTimestamps(Logger);
const FullLogger = WithFileOutput(WithLogTimestamps(WithLogLevels(Logger)));

// Usage
const logger = new FullLogger("AppLogger");
logger.setLevel("debug");
logger.logWithTimestamp("Application started", "info");
logger.writeToFile("Application started");
console.log(logger.getLogFile());

// ============================================================================
// EXAMPLE 6: Constrained Mixin - Payment Processing
// ============================================================================

// Interface for payment processors
interface PaymentProcessor {
  processPayment(amount: number): Promise<boolean>;
  refund(transactionId: string): Promise<boolean>;
}

type PaymentProcessorConstructor = GConstructor<PaymentProcessor>;

// Base payment processor
class BasePaymentProcessor implements PaymentProcessor {
  async processPayment(amount: number): Promise<boolean> {
    console.log(`Processing payment of $${amount}`);
    return true;
  }

  async refund(transactionId: string): Promise<boolean> {
    console.log(`Processing refund for transaction ${transactionId}`);
    return true;
  }
}

// Transaction logging mixin - only works with PaymentProcessor
function WithTransactionLogging<TBase extends PaymentProcessorConstructor>(
  Base: TBase
) {
  return class WithTransactionLogging extends Base {
    _transactions: Array<{ id: string; amount: number; type: string }> = [];

    async processPayment(amount: number): Promise<boolean> {
      const result = await super.processPayment(amount);
      if (result) {
        this._transactions.push({
          id: `txn_${Date.now()}`,
          amount,
          type: "payment",
        });
      }
      return result;
    }

    async refund(transactionId: string): Promise<boolean> {
      const result = await super.refund(transactionId);
      if (result) {
        const transaction = this._transactions.find((t) => t.id === transactionId);
        if (transaction) {
          this._transactions.push({
            id: `refund_${Date.now()}`,
            amount: -transaction.amount,
            type: "refund",
          });
        }
      }
      return result;
    }

    getTransactionHistory(): Array<{ id: string; amount: number; type: string }> {
      return [...this._transactions];
    }
  };
}

// Compose payment processor
const LoggedPaymentProcessor = WithTransactionLogging(BasePaymentProcessor);

// Usage
const processor = new LoggedPaymentProcessor();
await processor.processPayment(100);
await processor.processPayment(50);
const history = processor.getTransactionHistory();
console.log(history);

// ============================================================================
// BEST PRACTICES FOR MIXINS
// ============================================================================

/*
1. Keep mixins small and focused - each mixin should add one specific capability
2. Use constrained mixins when you need to ensure base classes have required properties
3. Document mixin dependencies clearly
4. Consider the order of mixin application - later mixins can override earlier ones
5. Use ES2020 private fields (#field) for private state in mixins
6. Test mixin combinations thoroughly
7. Consider naming conventions to make mixin composition clear
8. Use interfaces to document expected mixin behavior
9. Be aware of limitations with decorators and static properties
10. Consider performance implications when composing many mixins
*/

export {};

