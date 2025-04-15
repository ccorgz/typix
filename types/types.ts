export interface Field {
  name: string;
  type: string;
  validateValue?: (value: any) => boolean;
}

export interface Options {
  fields: Field[];
  strict: boolean;
}

export interface InvalidField {
  field: string;
  expectedType: string;
  receivedType:
    | "string"
    | "number"
    | "bigint"
    | "boolean"
    | "symbol"
    | "undefined"
    | "object"
    | "function";
  receivedValue: any;
  errorType: "value" | "typing";
}

export interface ValidationResult {
  message: string;
  isValid: boolean;
  expectedFields: InvalidField[];
}
