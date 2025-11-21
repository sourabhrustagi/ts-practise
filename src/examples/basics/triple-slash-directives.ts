/**
 * TypeScript Triple-Slash Directives Examples
 * 
 * Comprehensive examples covering all TypeScript triple-slash directive features:
 * 
 * Triple-slash directives are single-line comments containing a single XML tag.
 * They are only valid at the top of their containing file and must be preceded
 * only by other comments (including other triple-slash directives).
 * 
 * Directive Types:
 * - /// <reference path="..." /> - File dependencies
 * - /// <reference types="..." /> - Package type dependencies
 * - /// <reference lib="..." /> - Built-in lib file references
 * - /// <reference no-default-lib="true"/> - Exclude default library
 * - /// <amd-module /> - AMD module naming
 * - /// <amd-dependency /> - AMD dependencies (deprecated)
 * - preserve="true" - Preserve directives in output
 */

// ============================================================================
// Important Notes:
// ============================================================================
// 
// 1. Triple-slash directives MUST be at the top of the file
// 2. They can only be preceded by single or multi-line comments
// 3. If encountered after statements, they are treated as regular comments
// 4. As of TypeScript 5.5, directives are not emitted unless preserve="true"
// 5. The compiler does not generate reference directives automatically
//

// ============================================================================
// 1. /// <reference path="..." />
// ============================================================================

// This directive declares a dependency on another TypeScript file
// The path is resolved relative to the containing file

// Example: Reference a type definition file
// /// <reference path="./types/utility-types.d.ts" />

// Example: Reference a file in a parent directory
// /// <reference path="../shared/common-types.ts" />

// Example: Reference a file with absolute path (relative to project root)
// /// <reference path="src/types/global.d.ts" />

// Usage of types from referenced file
// const myUtil: UtilityType = createUtility();
// const common: CommonType = getCommon();

// Note: The referenced file will be included in compilation
// and processed before the current file

// ============================================================================
// 2. /// <reference types="..." />
// ============================================================================

// This directive declares a dependency on a package's type definitions
// Similar to importing @types packages

// Example: Reference Node.js types (requires @types/node to be installed)
// /// <reference types="node" />

// Example: Reference Jest types (requires @types/jest to be installed)
// /// <reference types="jest" />

// Example: Reference multiple type packages
// /// <reference types="mocha" />
// /// <reference types="chai" />

// Usage of types from referenced packages
// const fs: NodeJS.fs = require('fs');
// const test: jest.Describe = describe('test', () => {});

// Note: For .ts files, prefer using types in tsconfig.json or command line
// This directive is mainly useful in .d.ts declaration files

// ============================================================================
// 3. /// <reference lib="..." />
// ============================================================================

// This directive explicitly includes a built-in lib file
// Built-in lib files are referenced by name (e.g., "es2015", not "lib.es2015.d.ts")

// Example: Include ES2015 library
/// <reference lib="es2015" />

// Example: Include ES2017 String library
/// <reference lib="es2017.string" />

// Example: Include DOM library
/// <reference lib="dom" />

// Example: Include multiple libraries
/// <reference lib="es2015" />
/// <reference lib="es2017" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

// Usage of types from referenced libraries
// const symbol: Symbol = Symbol('test');
// const padded: string = "foo".padStart(4); // From es2017.string
// const element: HTMLElement = document.createElement('div'); // From dom

// Note: This is equivalent to specifying lib in tsconfig.json
// For example: /// <reference lib="es2017.string" /> is like --lib es2017.string

// ============================================================================
// 4. /// <reference no-default-lib="true"/>
// ============================================================================

// This directive marks a file as a default library and excludes it from compilation
// You'll see this at the top of lib.d.ts and its variants

// Example: Exclude default library
/// <reference no-default-lib="true"/>

// Note: This is similar to passing --noLib on the command line
// When skipDefaultLibCheck is used, the compiler only skips checking files
// with this directive

// This is typically used in library declaration files to prevent
// including the default TypeScript library

// ============================================================================
// 5. /// <amd-module />
// ============================================================================

// This directive allows naming AMD modules (otherwise they are anonymous)
// Useful when other tools need to process the resulting modules

// Example: Named AMD module
/// <amd-module name="MyNamedModule"/>

// When compiled with --module amd, this will generate:
// define("MyNamedModule", ["require", "exports"], function (require, exports) {
//   // module code
// });

// Note: Only one /// <amd-module /> directive is allowed per file
// If you need multiple named modules, use separate files

// Example class for AMD module demonstration
class MyClassExample {
  value: string;
  
  constructor(value: string) {
    this.value = value;
  }
}

// ============================================================================
// 6. /// <amd-dependency /> (Deprecated)
// ============================================================================

// NOTE: This directive has been deprecated. Use import "moduleName"; instead.

// Example (deprecated): AMD dependency
// /// <amd-dependency path="legacy/moduleA" />

// Example (deprecated): AMD dependency with name
// /// <amd-dependency path="legacy/moduleA" name="moduleA"/>
// declare var moduleA: MyType;
// moduleA.callStuff();

// Modern alternative: Use import statements
import "legacy/moduleA";

// ============================================================================
// 7. preserve="true"
// ============================================================================

// As of TypeScript 5.5, triple-slash directives are not emitted to output
// unless marked with preserve="true"

// Example: Preserved reference path (commented for demonstration)
// /// <reference path="./types/utility-types.d.ts" preserve="true" />

// Example: Preserved types reference (commented for demonstration)
// /// <reference types="node" preserve="true" />

// Example: Preserved lib reference
/// <reference lib="es2017.string" preserve="true" />

// Example: Preserved AMD module (comment only - only one allowed per file)
// /// <amd-module name="PreservedModule" preserve="true"/>

// Without preserve="true", these directives are removed from output
// With preserve="true", they are kept in the generated JavaScript files

// ============================================================================
// 8. Multiple Directives
// ============================================================================

// You can use multiple triple-slash directives at the top of a file
// They are processed in order

// Example of multiple directives (commented out since files don't exist):
// /// <reference lib="es2015" />
// /// <reference lib="dom" />
// /// <reference types="node" />
// /// <reference path="./types/custom.d.ts" />
// Note: Only one /// <amd-module /> directive allowed per file
// /// <amd-module name="MyModule"/>

// ============================================================================
// 9. Order of Processing
// ============================================================================

// The compiler performs a preprocessing pass:
// 1. Starts with root files (from command-line or tsconfig.json)
// 2. Processes files in order they are specified
// 3. Before adding a file, all triple-slash references are processed
// 4. References are resolved in depth-first manner
// 5. Relative paths are resolved relative to the containing file

// Example dependency chain:
// file1.ts
//   /// <reference path="file2.ts" />
//   /// <reference path="file3.ts" />
// 
// file2.ts
//   /// <reference path="file4.ts" />
// 
// Processing order: file1.ts -> file2.ts -> file4.ts -> file3.ts

// ============================================================================
// 10. Common Use Cases
// ============================================================================

// Use Case 1: Declaration files that extend global types
/// <reference types="node" />
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CUSTOM_VAR: string;
    }
  }
}

// Use Case 2: Including specific library features
/// <reference lib="es2017.string" />
// Now you can use string methods like padStart, padEnd

// Use Case 3: File dependencies in large projects
/// <reference path="../shared/types.ts" />
/// <reference path="../shared/utils.ts" />

// Use Case 4: AMD module naming for bundlers
/// <amd-module name="MyApp/Components/Button" preserve="true"/>

// ============================================================================
// 11. Errors and Restrictions
// ============================================================================

// Error cases:
// 1. Referencing a file that doesn't exist
//    /// <reference path="non-existent.ts" /> // Error!

// 2. Self-reference
//    /// <reference path="./current-file.ts" /> // Error!

// 3. Directive after statements (treated as regular comment)
//    const x = 5;
//    /// <reference path="file.ts" /> // Not a directive, just a comment!

// 4. Invalid directive syntax
//    /// <reference path="file.ts"> // Missing closing />
//    /// <reference path="file.ts" /> // Valid

// ============================================================================
// 12. Using --noResolve
// ============================================================================

// When --noResolve is specified:
// - Triple-slash references are ignored
// - They don't add new files
// - They don't change file order

// This is useful when you want to control exactly which files are compiled

// ============================================================================
// 13. Real-World Examples
// ============================================================================

// Example 1: Declaration file with dependencies (commented for demonstration)
// /// <reference types="node" />
// /// <reference lib="dom" />
// /// <reference path="./api-types.d.ts" />

// Example module declaration (commented to avoid errors)
// declare module "my-module" {
//   export function processData(data: string): void;
// }

// Example 2: AMD module with name preservation
// Note: This example uses a different module name to avoid conflict
// In a real file, you would only have one /// <amd-module /> directive
// /// <amd-module name="MyApp/Utils" preserve="true"/>
/// <reference lib="es2015" />

export function formatDate(date: Date): string {
  return date.toISOString();
}

// Example 3: Extending built-in types
/// <reference lib="es2015" />
/// <reference lib="dom" />

// Example of extending String prototype (commented to avoid runtime errors)
// interface String {
//   customMethod(): string;
// }
// 
// String.prototype.customMethod = function() {
//   return this.toUpperCase();
// };

// ============================================================================
// 14. Best Practices
// ============================================================================

// 1. Use /// <reference types="..." /> in .d.ts files
//    Use types in tsconfig.json for .ts files

// 2. Use /// <reference lib="..." /> when you need specific library features
//    in declaration files

// 3. Use /// <reference path="..." /> sparingly
//    Prefer import/export statements for module dependencies

// 4. Use preserve="true" only when you need directives in output
//    (e.g., for tools that process the output)

// 5. Keep directives at the top of the file
//    Don't place them after code statements

// 6. Use /// <amd-module /> when building for AMD with bundlers
//    that need named modules

// ============================================================================
// Export Examples
// ============================================================================

// Export removed to avoid conflicts - this is an example file
// export { MyClass };

// Note: This file demonstrates triple-slash directives.
// In practice, many of these directives are more commonly used in:
// - Declaration files (.d.ts)
// - Library files
// - Files that need specific compiler behavior
// 
// For regular TypeScript files, prefer:
// - import/export for module dependencies
// - tsconfig.json for compiler options
// - @types packages installed via npm

