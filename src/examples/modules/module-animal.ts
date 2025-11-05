/**
 * Example module demonstrating type exports
 */

export type Cat = {
  breed: string;
  yearOfBirth: number;
};

export interface Dog {
  breeds: string[];
  yearOfBirth: number;
}

// Export a value that can be used
export const createCatName = (): string => "fluffy";

// Export a type that uses the value
export type Animal = Cat | Dog;

