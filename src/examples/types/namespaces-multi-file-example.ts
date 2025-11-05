/**
 * Multi-File Namespace Example
 * 
 * This file demonstrates how namespaces work when split across multiple files.
 * In a real project, you would use reference tags to establish dependencies.
 * 
 * Example compilation:
 *   tsc --outFile sample.js namespaces-validation.ts namespaces-letters-validator.ts namespaces-zipcode-validator.ts namespaces-multi-file-example.ts
 * 
 * Or using reference tags in each file:
 *   /// <reference path="namespaces-validation.ts" />
 *   /// <reference path="namespaces-letters-validator.ts" />
 *   /// <reference path="namespaces-zipcode-validator.ts" />
 *   tsc --outFile sample.js namespaces-multi-file-example.ts
 */

// In a real multi-file setup, you would use reference tags:
// /// <reference path="namespaces-validation.ts" />
// /// <reference path="namespaces-letters-validator.ts" />
// /// <reference path="namespaces-zipcode-validator.ts" />

// The Validation namespace is now merged from all files
// We can use all validators and utilities

// Test strings
let strings = [
  "Hello",
  "98052",
  "101",
  "12345-6789",
  "ABC123",
  "Valid",
];

// Create validators dictionary
let validators: { [s: string]: Validation.StringValidator } = {};

validators["ZIP code"] = new Validation.ZipCodeValidator();
validators["Extended ZIP code"] = new Validation.ExtendedZipCodeValidator();
validators["Letters only"] = new Validation.LettersOnlyValidator();
validators["Alpha-numeric"] = new Validation.AlphaNumericValidator();

// Test each string against each validator
for (let s of strings) {
  console.log(`\nTesting "${s}":`);
  for (let name in validators) {
    let isMatch = validators[name].isAcceptable(s);
    console.log(`  ${name}: ${isMatch ? "✓ matches" : "✗ does not match"}`);
  }
}

// Use namespace utilities
console.log("\nUsing Validation.Utils:");
console.log(`Empty string: ${Validation.Utils.isEmpty("")}`); // true
console.log(`Has length 3-5: ${Validation.Utils.hasLength("Hello", 3, 5)}`); // false (length is 5, but we check < max)
console.log(`Has length 3-10: ${Validation.Utils.hasLength("Hello", 3, 10)}`); // true

// ============================================================================
// NOTES ON MULTI-FILE NAMESPACES
// ============================================================================

/*
Compiling Multi-File Namespaces:

1. Using outFile option (creates single output file):
   tsc --outFile sample.js Validation.ts LettersOnlyValidator.ts ZipCodeValidator.ts Test.ts
   
   The compiler automatically orders files based on reference tags.

2. Per-file compilation (default, creates multiple JS files):
   tsc Validation.ts LettersOnlyValidator.ts ZipCodeValidator.ts Test.ts
   
   Then load in HTML in order:
   <script src="Validation.js"></script>
   <script src="LettersOnlyValidator.js"></script>
   <script src="ZipCodeValidator.js"></script>
   <script src="Test.js"></script>

3. Using reference tags:
   /// <reference path="Validation.ts" />
   
   This tells the compiler about dependencies between files.

Modern Approach:
   - For new projects, prefer ES Modules (import/export) over namespaces
   - Namespaces are still useful for organizing code and type definitions
   - Use namespaces for ambient declarations of JavaScript libraries
*/

export {};

