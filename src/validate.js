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
        errorType: value ? validateValue && !validateValue(value) ? "value" : "typing" : "value",
      });
    }
  }

  result.message =
    result.isValid === false
      ? "One or more field validations failed"
      : "Field validations were successfull";

  return {
    isValid: result.isValid,
    message: result.message,
    expectedFields: result.expectedFields,
  };
}

module.exports = validateTypix;
