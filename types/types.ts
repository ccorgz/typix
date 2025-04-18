export type Field =
  | {
      name: string;
      type: string;
      strict: false | undefined;
      validateValue?: never;
      validateMessage?: never;
    }
  | {
      name: string;
      type: string;
      strict: true;
      validateValue: (value: any) => boolean;
      validateMessage: string;
    }
  | {
      name: string;
      type: string;
      strict: true;
      validateValue?: undefined;
      validateMessage?: undefined;
    };

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
