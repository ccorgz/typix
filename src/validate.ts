import { Options, ValidationResult } from "../types/types";

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

  for (const { name, type, strict: fieldStrict, validateValue } of config.fields) {
    const value: any = data[name];
    let isValid: boolean = true;

    if (config.strict != false && fieldStrict != false) {
      if (!validateType(value, type)) {
        isValid = false;
      }
    } else if(fieldStrict != false && config.strict != false) {
      if (!(name in data) || !validateType(value, type)) {
        isValid = false;
      }
    }

    if (isValid && validateValue && !validateValue(value)) {
      isValid = false;
    }

    if (!isValid) {
      result.isValid = false;
      result.expectedFields.push({
        field: name,
        expectedType: type,
        receivedType: typeof value,
        receivedValue: value,
        errorType: validateValue && !validateValue(value) ? "value" : "typing",
      });
    }
  }

  result.message =
    result.isValid == false
      ? "One or more field validations failed"
      : "Field validations were successfull";

  return result;
}
