# TypeScript Practice Examples

A comprehensive collection of TypeScript examples covering fundamental concepts, OOP principles, SOLID principles, and design patterns.

## Project Structure

```
src/
├── examples/
│   ├── types/           # Basic TypeScript types and features
│   │   └── everyday-types.ts
│   ├── oop/             # Object-Oriented Programming examples
│   │   └── oop-example.ts
│   ├── solid/           # SOLID principles examples
│   │   └── solid-examples.ts
│   └── patterns/        # Design patterns examples
│       └── design-patterns.ts
```

## Available Scripts

- `npm start` - Run basic TypeScript types examples
- `npm run start:oop` - Run OOP examples (encapsulation, inheritance, polymorphism, abstraction)
- `npm run start:solid` - Run SOLID principles examples
- `npm run start:patterns` - Run design patterns examples
- `npm run start:all` - Run all examples in sequence
- `npm run build` - Compile TypeScript to JavaScript

## Examples Covered

### Basic Types (`src/examples/types/`)
- Primitives, arrays, objects
- Functions, unions, intersections
- Type assertions, generics
- Enums, symbols, bigint

### OOP (`src/examples/oop/`)
- Encapsulation with private/protected fields
- Inheritance with abstract classes
- Polymorphism with interfaces
- Composition over inheritance
- Template Method pattern

### SOLID Principles (`src/examples/solid/`)
- **S**ingle Responsibility Principle
- **O**pen/Closed Principle
- **L**iskov Substitution Principle
- **I**nterface Segregation Principle
- **D**ependency Inversion Principle

### Design Patterns (`src/examples/patterns/`)
- Singleton
- Factory
- Strategy
- Observer
- Adapter
- Decorator

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run any example:
   ```bash
   npm run start:oop
   ```

3. Or run all examples:
   ```bash
   npm run start:all
   ```

## Requirements

- Node.js
- TypeScript 5.5.4+