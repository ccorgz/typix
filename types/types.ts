export interface Field {
  name: string;
  type: string;
}

export interface Options {
  fields: Field[];
  strict: boolean;
}

export interface InvalidField {
  field: string;
  expectedType: string;
  receivedValue: any;
}

export interface ValidationResult {
  message: string;
  isValid: boolean;
  expectedFields: InvalidField[];
}
