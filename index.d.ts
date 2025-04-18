declare module "typix" {
  export interface Field {
    name: string;
    type: string;
    strict?: boolean;
    validateValue?: (value: any) => boolean;
  }

  export interface Options {
    fields: Field[];
    strict?: boolean;
  }

  export interface ExpectedField {
    field: string;
    expectedType: string;
    receivedType: string;
    receivedValue: any;
    errorType: "typing" | "value";
  }

  export interface ValidationResult {
    message: string;
    isValid: boolean;
    expectedFields: ExpectedField[];
  }

  export function validate<T extends Record<string, any>>(
    options: Partial<Options>,
    data: T
  ): Promise<ValidationResult>;

  export function createPass(pass: string): {
    hash: string;
    salt: string;
  };

  export function validatePass(
    pass: string,
    hash: string,
    salt: string
  ): boolean;
}
