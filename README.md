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
- Supports strict validation mode, where all fields must be present and match their types unless specified otherwise.
- Individual fields can have a `strict` property set to `false`, making them optional and skipping validation if the field is missing or `undefined`.

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

### 3. Using Field-Level Strictness

```typescript
import typix from "typix";

const options = {
  fields: [
    { name: "ID", type: "number" },
    { name: "NAME", type: "string", strict: false }, // NAME is optional
    { name: "AGE", type: "number" },
  ],
  strict: true,
};

const testData = {
  ID: 1,
  NAME: undefined, // Skipped due to strict: false
  AGE: 24,
};

const result = await typix.validate(options, testData);

console.log(result.isValid);  // true
console.log(result.message);  // "Field validations were successfull"
```

#### What Happens?
- The `NAME` field is optional because its `strict` property is `false`, so `undefined` is allowed.
- Other fields (`ID` and `AGE`) are still validated as mandatory due to the global `strict: true`.

### 4. Non-Strict Global Validation

```typescript
import typix from "typix";

const options = {
  fields: [
    { name: "ID", type: "number" },
    { name: "NAME", type: "string", strict: false },
    { name: "AGE", type: "number" },
  ],
  strict: false, // No fields are mandatory
};

const testData = {
  ID: undefined,
  NAME: undefined,
  AGE: undefined,
};

const result = await typix.validate(options, testData);

console.log(result.isValid);  // true
console.log(result.message);  // "Field validations were successfull"
```

#### What Happens?
- With `strict: false` at the global level, no fields are mandatory, and missing or `undefined` fields are skipped.

## Example Use Cases

1. **Strict Mode Validation:**
   - Ensure that all fields are present and match their expected types (unless `strict: false` is set on a field).
   - Custom value checks like ensuring `ID !== -1`.

2. **Flexible Validation:**
   - Skip missing fields with `strict: false` on individual fields or globally.
   - Customize validation logic for each field (e.g., ID range checks, non-empty string checks).

## Error Types

- **Typing Error**: When a field's type doesn't match the expected type.
- **Value Error**: When a field's value doesn't meet custom validation rules (e.g., `ID !== -1`).

## Security Considerations

✅ Strict validation mode ensures complete validation of object fields.  
✅ Custom validation logic gives flexibility to handle complex field rules.  
✅ Optional fields with `strict: false` allow for flexible validation scenarios.  
✅ Safe for use in form validation, API response checks, and object integrity validation.

## License

MIT License