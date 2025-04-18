async function validateTypix(options, data) {
  const defaultOptions = {
    fields: [],
    strict: true,
  };

  const config = { ...defaultOptions, ...options };

  const result = {
    message: "One or more field validations failed",
    isValid: true,
    expectedFields: [],
  };

  function validateType(value, expectedType) {
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
  }

  for (const {
    name,
    type,
    strict: fieldStrict,
    validateValue,
    validateMessage,
  } of config.fields) {
    const value = data[name];
    let isValid = true;

    if (config.strict !== false && fieldStrict !== false) {
      if (!validateType(value, type)) {
        isValid = false;
      }
    } else if (fieldStrict !== false && config.strict !== false) {
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
        receivedType: value ? typeof value : null,
        receivedValue: value ? value : String(value),
        errorMessage: value
          ? validateValue && !validateValue(value) && validateMessage
            ? validateMessage
            : validateValue && !validateValue(value)
            ? "Error on value"
            : "Error on typing"
          : `Field "${name}" not informed`,
      });
    }
  }

  result.message =
    result.isValid === false
      ? "Field validations failed"
      : "Field validations completed";

  return {
    isValid: result.isValid,
    message: result.message,
    expectedFields: result.expectedFields,
  };
}

module.exports = validateTypix;
