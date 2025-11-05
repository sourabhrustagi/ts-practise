/**
 * Validation Namespace - Letters Only Validator
 * 
 * This demonstrates how to extend a namespace across multiple files.
 * In TypeScript, you can split a namespace across files using the same
 * namespace name. The compiler will merge them.
 */

// In a real multi-file setup, you would use:
// /// <reference path="namespaces-validation.ts" />

namespace Validation {
  // Private regex - not exported, only accessible within this namespace file
  const lettersRegexp = /^[A-Za-z]+$/;

  export class LettersOnlyValidator implements StringValidator {
    isAcceptable(s: string): boolean {
      return lettersRegexp.test(s);
    }
  }

  export class AlphaNumericValidator implements StringValidator {
    private alphaNumericRegexp = /^[A-Za-z0-9]+$/;

    isAcceptable(s: string): boolean {
      return this.alphaNumericRegexp.test(s);
    }
  }
}

