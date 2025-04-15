
# Typix 🧹

A TypeScript library for validating object typings and values with custom rules, offering both strict type checking and value validation.

## 🔗 Repository

[GitHub – ccorgz/typix](https://github.com/ccorgz/typix)

## Installation

Install via npm:

```sh
npm install typix
```

Or using Yarn:

```sh
yarn add typix
```

## How It Works

### Type and Value Validation
`Typix` helps validate objects by checking their field types and values:
- Ensures the fields match the expected types.
- Allows custom value validation rules for each field (e.g., ensuring `ID` is not `-1`).
- Supports strict validation mode, where all fields must be present and match their types.

## Usage

### 1. Validating an Object

```typescript
import typix from "typix";

const options = {
  fields: [
    { name: "ID", type: "number", validateValue: (value) => value !== -1 }, // Custom rule for ID
    { name: "NAME", type: "string" },
    { name: "AGE", type: "number" },
  ],
  strict: true,
};

const testData = {
  ID: 1,
  NAME: "John Doe",
  AGE: 30,
};

const result = await typix.validate(options, testData);

console.log(result.isValid);  // true
console.log(result.message);  // "Field validations were successfull"
```

#### What Happens?
- `Typix` checks if the `ID` is a `number` and not equal to `-1`.
- Validates `NAME` as a `string` and `AGE` as a `number`.
- Returns a result with validation success or failure.

### 2. Handling Validation Failures

```typescript
import typix from "typix";

const options = {
  fields: [
    { name: "ID", type: "number", validateValue: (value) => value !== -1 },
    { name: "NAME", type: "string" },
    { name: "AGE", type: "number" },
  ],
  strict: true,
};

const testData = {
  ID: "1",  // Invalid type for ID
  NAME: "John Doe",
  AGE: 30,
};

const result = await typix.validate(options, testData);

console.log(result.isValid);  // false
console.log(result.message);  // "One or more field validations failed"
console.log(result.expectedFields);  // List of validation errors
```

#### What Happens?
- If the `ID` is of the wrong type (e.g., a string instead of a number), the validation will fail.
- A detailed message with the `expectedType`, `receivedValue`, and error type will be provided.

## Example Use Cases

1. **Strict Mode Validation:**
   - Ensure that all fields are present and match their expected types.
   - Custom value checks like ensuring `ID !== -1`.

2. **Flexible Validation:**
   - Skip missing fields (non-strict mode).
   - Customize validation logic for each field (e.g., ID range checks, non-empty string checks).

## Error Types

- **Typing Error**: When a field's type doesn't match the expected type.
- **Value Error**: When a field's value doesn't meet custom validation rules (e.g., `ID !== -1`).

## Security Considerations

✅ Strict validation mode ensures complete validation of object fields.  
✅ Custom validation logic gives flexibility to handle complex field rules.  
✅ Safe for use in form validation, API response checks, and object integrity validation.

## License

MIT License
