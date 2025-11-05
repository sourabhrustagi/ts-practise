# TypeScript Practice Project

A comprehensive collection of TypeScript examples covering various concepts, patterns, and best practices.

## 📁 Project Structure

```
src/examples/
├── types/          # TypeScript type system features
│   ├── everyday-types.ts
│   ├── decorators-examples.ts
│   ├── iterators-generators-examples.ts
│   ├── symbols-examples.ts
│   ├── generics-examples.ts
│   ├── conditional-types.ts
│   ├── mapped-types.ts
│   └── ... (other type-related examples)
│
├── modules/        # ES Module system examples
│   ├── module-examples.ts
│   ├── module-hello.ts
│   ├── module-maths.ts
│   └── ... (module-related examples)
│
├── namespaces/     # Namespace examples
│   ├── namespaces.ts
│   ├── namespace-example.ts
│   └── ... (namespace-related examples)
│
├── mixins/         # Mixin pattern examples
│   ├── mixins.ts
│   └── mixins-practical-examples.ts
│
├── oop/            # Object-oriented programming
│   └── oop-example.ts
│
├── patterns/       # Design patterns
│   └── design-patterns.ts
│
└── solid/          # SOLID principles
    └── solid-examples.ts
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Building

```bash
npm run build
```

### Running Examples

Run specific examples:

```bash
# Everyday types
npm start

# TypeScript basics
npm run start:basics

# OOP examples
npm run start:oop

# SOLID principles
npm run start:solid

# Design patterns
npm run start:patterns

# Advanced type examples
npm run start:narrowing
npm run start:generics
npm run start:keyof
npm run start:decorators
npm run start:iterators
npm run start:symbols

# Run all examples
npm run start:all
```

## 📚 Topics Covered

### Type System
- **Primitives**: string, number, boolean
- **Arrays and Tuples**
- **Union and Intersection Types**
- **Type Aliases and Interfaces**
- **Literal Types**
- **Generics**
- **Conditional Types**
- **Mapped Types**
- **Utility Types**
- **Type Narrowing**
- **Type Assertions**
- **Decorators**
- **Symbols**
- **Iterators and Generators**

### Code Organization
- **ES Modules**: Import/Export patterns
- **Namespaces**: Namespace declarations and usage
- **Mixins**: Composition patterns

### Programming Concepts
- **OOP**: Classes, inheritance, polymorphism
- **SOLID Principles**: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion
- **Design Patterns**: Common design patterns in TypeScript

## 🛠️ Configuration

The project uses TypeScript with the following key configurations:

- **Target**: ES2020
- **Module**: ES2020
- **Strict Mode**: Enabled
- **Experimental Decorators**: Enabled
- **Decorator Metadata**: Enabled

See `tsconfig.json` for full configuration details.

## 📝 Notes

- All examples are self-contained and can be run independently
- Examples include both correct implementations and common mistakes
- The codebase follows TypeScript best practices
- Some examples may have intentional errors for demonstration purposes

## 🤝 Contributing

Feel free to add more examples or improve existing ones. Make sure to:

1. Follow the existing code style
2. Add appropriate comments
3. Test your examples
4. Update this README if adding new categories

## 📄 License

This project is for educational purposes.
