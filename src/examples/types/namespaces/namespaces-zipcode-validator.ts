/**
 * Validation Namespace - Zip Code Validator
 * 
 * Another example of extending a namespace across files.
 */

// In a real multi-file setup, you would use:
// /// <reference path="namespaces-validation.ts" />

namespace Validation {
  // Private regex - not exported
  const numberRegexp = /^[0-9]+$/;

  export class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string): boolean {
      return s.length === 5 && numberRegexp.test(s);
    }
  }

  export class ExtendedZipCodeValidator implements StringValidator {
    private zipRegexp = /^\d{5}(-\d{4})?$/;

    isAcceptable(s: string): boolean {
      return this.zipRegexp.test(s);
    }
  }
}

