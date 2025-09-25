// Design Patterns in TypeScript: Singleton, Factory, Strategy, Observer, Adapter, Decorator

// 1) Singleton: single shared instance
class AppConfig {
    private static instance: AppConfig | null = null;
    private constructor(public readonly appName: string, public readonly version: string) {}
    public static getInstance(): AppConfig {
        if (!AppConfig.instance) {
            AppConfig.instance = new AppConfig('DemoApp', '1.0.0');
        }
        return AppConfig.instance;
    }
}

// BAD (Singleton): allows multiple instances
class BadConfig {
    constructor(public readonly name: string) {}
}

// 2) Factory: centralize object creation
interface Shape { draw(): void; }
class Circle implements Shape { public draw(): void { console.log('Draw Circle'); } }
class Square implements Shape { public draw(): void { console.log('Draw Square'); } }

class ShapeFactory {
    public static create(type: 'circle' | 'square'): Shape {
        if (type === 'circle') return new Circle();
        return new Square();
    }
}

// BAD (Factory): callers construct directly with branching
function drawBadShape(type: 'circle' | 'square'): void {
    if (type === 'circle') new Circle().draw(); else new Square().draw();
}

// 3) Strategy: swap algorithms at runtime
interface SortStrategy { sort(data: number[]): number[]; }
class QuickSort implements SortStrategy {
    public sort(data: number[]): number[] { return [...data].sort((a,b)=>a-b); }
}
class ReverseSort implements SortStrategy {
    public sort(data: number[]): number[] { return [...data].sort((a,b)=>b-a); }
}

class Sorter {
    constructor(private strategy: SortStrategy) {}
    public setStrategy(strategy: SortStrategy): void { this.strategy = strategy; }
    public sort(data: number[]): number[] { return this.strategy.sort(data); }
}

// BAD (Strategy): algorithm hard-coded, cannot change at runtime
class BadSorter {
    public sort(data: number[]): number[] { return [...data].sort((a,b)=>a-b); }
}

// 4) Observer: publish/subscribe
type Listener<T> = (value: T) => void;
class Observable<T> {
    private listeners: Set<Listener<T>> = new Set();
    public subscribe(listener: Listener<T>): () => void {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }
    public next(value: T): void {
        for (const listener of this.listeners) listener(value);
    }
}

// BAD (Observer): direct calls create tight coupling and no unsubscribe
class BadPublisher {
    public send(value: number, target: (v:number)=>void): void { target(value); }
}

// 5) Adapter: make incompatible interfaces work together
class LegacyApi {
    public requestLegacyResource(): string { return 'legacy-data'; }
}

interface ModernApi {
    getResource(): string;
}

class LegacyToModernAdapter implements ModernApi {
    constructor(private readonly legacy: LegacyApi) {}
    public getResource(): string { return this.legacy.requestLegacyResource(); }
}

// BAD (Adapter): forces callers to use legacy API directly
function getBadModernResource(): string { return new LegacyApi().requestLegacyResource(); }

// 6) Decorator: add behavior without modifying original code
interface Notifier { notify(message: string): void; }
class EmailNotifier implements Notifier {
    public notify(message: string): void { console.log(`Email: ${message}`); }
}

class SMSNotifier implements Notifier {
    constructor(private readonly wrappee: Notifier) {}
    public notify(message: string): void {
        this.wrappee.notify(message);
        console.log(`SMS: ${message}`);
    }
}

// BAD (Decorator): duplicated logic instead of composition
class BadEmailAndSMSNotifier {
    public notify(message: string): void {
        console.log(`Email: ${message}`);
        console.log(`SMS: ${message}`);
    }
}

// Demo
console.log('-- Design Patterns Demo --');

// Singleton
console.log('--- Singleton ---');
const badConfigA = new BadConfig('A');
const badConfigB = new BadConfig('B');
console.log('Bad singleton? (should be false):', badConfigA === badConfigB);
const configA = AppConfig.getInstance();
const configB = AppConfig.getInstance();
console.log('Singleton same?', configA === configB, configA.appName);

// Factory
console.log('--- Factory ---');
drawBadShape('circle');
ShapeFactory.create('circle').draw();
ShapeFactory.create('square').draw();

// Strategy
console.log('--- Strategy ---');
console.log('Bad sorter:', new BadSorter().sort([3,1,2]));
const sorter = new Sorter(new QuickSort());
console.log('Asc:', sorter.sort([3,1,2]));
sorter.setStrategy(new ReverseSort());
console.log('Desc:', sorter.sort([3,1,2]));

// Observer
console.log('--- Observer ---');
new BadPublisher().send(99, (v)=>console.log('bad obs', v));
const subject = new Observable<number>();
const unsubscribe = subject.subscribe((v)=>console.log('observer1', v));
subject.subscribe((v)=>console.log('observer2', v));
subject.next(1);
unsubscribe();
subject.next(2);

// Adapter
console.log('--- Adapter ---');
console.log('Bad modern resource:', getBadModernResource());
const modern: ModernApi = new LegacyToModernAdapter(new LegacyApi());
console.log('Modern resource:', modern.getResource());

// Decorator
console.log('--- Decorator ---');
new BadEmailAndSMSNotifier().notify('Build completed (bad)');
const notifier: Notifier = new SMSNotifier(new EmailNotifier());
notifier.notify('Build completed');


