// SOLID in TypeScript: SRP, OCP, LSP, ISP, DIP

// 1) SRP - Single Responsibility Principle
// Each class should have one reason to change.

// BAD: Violates SRP - handles both validation AND formatting
class BadEmailHandler {
    public processEmail(email: string): string {
        // Validation logic
        if (!email.includes('@')) {
            throw new Error('Invalid email format');
        }
        if (email.length < 5) {
            throw new Error('Email too short');
        }
        
        // Formatting logic
        return email.toLowerCase().trim();
    }
}

// GOOD: Separated concerns - each class has one responsibility
class EmailValidator {
    public isValid(email: string): boolean {
        return email.includes('@') && email.length >= 5;
    }
}

class EmailFormatter {
    public format(email: string): string {
        return email.toLowerCase().trim();
    }
}

class EmailService {
    constructor(
        private readonly validator: EmailValidator,
        private readonly formatter: EmailFormatter
    ) {}
    
    public processEmail(email: string): string {
        if (!this.validator.isValid(email)) {
            throw new Error('Invalid email');
        }
        return this.formatter.format(email);
    }
}

// Another SRP example: File operations
class TextFileReader {
    public readFile(filename: string): string {
        // Simulate file reading
        return `Content of ${filename}`;
    }
}

class TextFileWriter {
    public writeFile(filename: string, content: string): void {
        console.log(`Writing to ${filename}: ${content}`);
    }
}

class FileProcessor {
    constructor(
        private readonly reader: TextFileReader,
        private readonly writer: TextFileWriter
    ) {}
    
    public copyFile(source: string, destination: string): void {
        const content = this.reader.readFile(source);
        this.writer.writeFile(destination, content);
    }
}

// 2) OCP - Open/Closed Principle
// Extend behavior via new classes rather than modifying existing ones.
interface DiscountPolicy {
    apply(total: number): number;
}

class NoDiscount implements DiscountPolicy {
    public apply(total: number): number { return total; }
}

class PercentageDiscount implements DiscountPolicy {
    constructor(private readonly percent: number) {}
    public apply(total: number): number { return total * (1 - this.percent); }
}

function checkout(total: number, policy: DiscountPolicy): number {
    return policy.apply(total);
}

// BAD (OCP): branching logic that must be modified for each new type
function badCheckout(total: number, type: 'none' | 'percent20'): number {
    if (type === 'none') return total;
    // next change requires editing this function (violates OCP)
    if (type === 'percent20') return total * 0.8;
    return total; // fallback
}

// 3) LSP - Liskov Substitution Principle
// Subtypes must be substitutable for their base types without breaking expectations.
abstract class Bird {
    public abstract speak(): string;
}

class Sparrow extends Bird { public speak(): string { return 'chirp'; } }

// Bad example would be forcing all birds to fly; instead, we only require speak().
class Penguin extends Bird { public speak(): string { return 'honk'; } }

function makeItSpeak(bird: Bird): void {
    console.log(bird.speak());
}

// BAD (LSP): Forcing a capability not all subtypes have
interface BadBirdInterface { fly(): void; }
class BadPenguin implements BadBirdInterface { 
    public fly(): void { throw new Error('Penguins cannot fly'); } 
}

// 4) ISP - Interface Segregation Principle
// Many small, specific interfaces are better than one large, general-purpose interface.
interface Printer {
    print(document: string): void;
}

interface Scanner {
    scan(): string;
}

class SimplePrinter implements Printer {
    public print(document: string): void {
        console.log(`Printing: ${document}`);
    }
}

class MultiFunctionPrinter implements Printer, Scanner {
    public print(document: string): void { console.log(`MFP Print: ${document}`); }
    public scan(): string { const result = 'scanned-data'; console.log('MFP Scan'); return result; }
}

// BAD (ISP): Fat interface forcing clients to implement unused methods
interface FatDevice {
    print(document: string): void;
    scan(): string;
    fax(document: string): void;
}
class CheapPrinter implements FatDevice {
    public print(document: string): void { console.log(`Cheap print: ${document}`); }
    public scan(): string { throw new Error('Scan not supported'); }
    public fax(document: string): void { throw new Error('Fax not supported'); }
}

// 5) DIP - Dependency Inversion Principle
// High-level modules should depend on abstractions, not concretions.
interface Logger {
    info(message: string): void;
}

class ConsoleLogger implements Logger {
    public info(message: string): void { console.log(`INFO: ${message}`); }
}

class FileLogger implements Logger { // demo only
    public info(message: string): void { console.log(`[file] ${message}`); }
}

class OrderService {
    constructor(private readonly logger: Logger) {}
    public placeOrder(amount: number): void {
        this.logger.info(`Order placed: $${amount}`);
    }
}

// BAD (DIP): High-level module depends on concrete implementation
class BadOrderService {
    private readonly logger = new ConsoleLogger(); // concrete dependency
    public placeOrder(amount: number): void {
        this.logger.info(`[BAD] Order placed: $${amount}`);
    }
}

// Demo
console.log('-- SOLID Demo --');
// SRP - Bad vs Good examples
console.log('--- SRP Examples ---');

// Bad example (violates SRP)
try {
    const badHandler = new BadEmailHandler();
    console.log('Bad handler result:', badHandler.processEmail('  USER@EXAMPLE.COM  '));
} catch (error) {
    console.log('Bad handler error:', (error as Error).message);
}

// Good example (follows SRP)
const validator = new EmailValidator();
const formatter = new EmailFormatter();
const emailService = new EmailService(validator, formatter);

try {
    console.log('Good handler result:', emailService.processEmail('  USER@EXAMPLE.COM  '));
} catch (error) {
    console.log('Good handler error:', (error as Error).message);
}

// File operations SRP example
const fileReader = new TextFileReader();
const fileWriter = new TextFileWriter();
const fileProcessor = new FileProcessor(fileReader, fileWriter);
fileProcessor.copyFile('source.txt', 'destination.txt');

// OCP
console.log('--- OCP Examples ---');
console.log('Bad checkout (percent20):', badCheckout(100, 'percent20'));
console.log('No discount:', checkout(100, new NoDiscount()));
console.log('20% off:', checkout(100, new PercentageDiscount(0.2)));

// LSP
console.log('--- LSP Examples ---');
try { new BadPenguin().fly(); } catch (e) { console.log('Bad LSP error:', (e as Error).message); }
makeItSpeak(new Sparrow());
makeItSpeak(new Penguin());

// ISP
console.log('--- ISP Examples ---');
try { new CheapPrinter().scan(); } catch (e) { console.log('Bad ISP error:', (e as Error).message); }
const printer: Printer = new SimplePrinter();
printer.print('Hello');
const mfp: MultiFunctionPrinter = new MultiFunctionPrinter();
mfp.print('Doc');
console.log('Scanned:', mfp.scan());

// DIP
console.log('--- DIP Examples ---');
new BadOrderService().placeOrder(25);
const orderServiceA = new OrderService(new ConsoleLogger());
const orderServiceB = new OrderService(new FileLogger());
orderServiceA.placeOrder(50);
orderServiceB.placeOrder(75);


