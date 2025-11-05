/**
 * Validation Namespace - Base Interface
 * 
 * This file demonstrates the base of a multi-file namespace.
 * In a real project, this would be split across multiple files.
 */

namespace Validation {
  export interface StringValidator {
    isAcceptable(s: string): boolean;
  }

  // Common validation utilities
  export namespace Utils {
    export function isEmpty(str: string): boolean {
      return str.trim().length === 0;
    }

    export function hasLength(str: string, min: number, max?: number): boolean {
      if (str.length < min) return false;
      if (max !== undefined && str.length > max) return false;
      return true;
    }
  }
}

