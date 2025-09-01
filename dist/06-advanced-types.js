"use strict";
// ========================================
// 6. ADVANCED TYPES - TypeScript Advanced Type Features
// ========================================
function add(a, b) {
    return a + b;
}
// InstanceType<T> - Gets instance type of class
class UserClass {
    constructor(name) {
        this.name = name;
    }
}
function calculator(x) {
    this.value += x;
}
function createUserId(id) {
    return id;
}
function createEmail(email) {
    return email;
}
function createPassword(password) {
    return password;
}
// Type Guards with Advanced Types
function isUser(obj) {
    return (typeof obj === "object" &&
        obj !== null &&
        "id" in obj &&
        "name" in obj &&
        "email" in obj);
}
function isUserArray(arr) {
    return Array.isArray(arr) && arr.every(isUser);
}
// Type predicates with conditional types
function isStringArray(arr) {
    return Array.isArray(arr) && arr.every(item => typeof item === "string");
}
function createTypeGuard(predicate) {
    return predicate;
}
const isNumberArray = createTypeGuard((value) => Array.isArray(value) && value.every(item => typeof item === "number"));
function isEventHandler(name) {
    return /^on[A-Z]/.test(name);
}
console.log("=== TypeScript Advanced Types Examples ===");
// Utility types examples
const partialUser = { name: "John" };
const requiredUser = {
    id: 1,
    name: "John",
    email: "john@example.com",
    age: 30,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
};
const userBasicInfo = {
    id: 1,
    name: "John",
    email: "john@example.com"
};
// Template literal types examples
const emailTemplate = "welcome_en";
const actionTemplate = "create_user";
// Branded types examples
const userId = createUserId(123);
const userEmail = createEmail("user@example.com");
// Type guards examples
const userData = { id: 1, name: "John", email: "john@example.com", age: 30, isActive: true, createdAt: new Date() };
console.log("Is user:", isUser(userData));
console.log("Is number array:", isNumberArray([1, 2, 3, 4, 5]));
console.log("Partial user:", partialUser);
console.log("User basic info:", userBasicInfo);
console.log("Email template:", emailTemplate);
console.log("Action template:", actionTemplate);
console.log("User ID:", userId);
console.log("User email:", userEmail);
