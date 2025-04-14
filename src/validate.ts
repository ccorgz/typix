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

export async function validate<T extends Record<string, any>>(
  options: Partial<Options>,
  data: T
): Promise<ValidationResult> {
  const defaultOptions: Options = {
    fields: [],
    strict: true,
  };

  const config: Options = { ...defaultOptions, ...options };

  const result: ValidationResult = {
    message: "One or more field validations failed",
    isValid: true,
    expectedFields: [],
  };

  const validateType = (value: any, expectedType: string): boolean => {
    if (value === null || value === undefined || value === "") {
      return false;
    }
    switch (expectedType.toLowerCase()) {
      case "string":
        return typeof value === "string";
      case "number":
        return typeof value === "number" && !isNaN(value);
      case "boolean":
        return typeof value === "boolean";
      case "array":
        return Array.isArray(value);
      case "object":
        return (
          typeof value === "object" && value !== null && !Array.isArray(value)
        );
      default:
        return true;
    }
  };

  for (const { name, type } of config.fields) {
    const value: any = data[name];
    let isValid: boolean = true;

    if (config.strict) {
      if (!validateType(value, type)) {
        isValid = false;
      }
    } else {
      if (!(name in data) || !validateType(value, type)) {
        isValid = false;
      }
    }

    if (!isValid) {
      result.isValid = false;
      result.expectedFields.push({
        field: name,
        expectedType: type,
        receivedValue: value,
      });
    }
  }
  result.message =
    result.isValid == false
      ? "One or more field validations failed"
      : "Field validations were successfull";

  return result;
}
