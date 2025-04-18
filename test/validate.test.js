const typix = require("../src/typix");

const mockOptions = {
  fields: [
    { name: "ID", type: "number", validateValue: (value) => value !== -1 },
    { name: "NAME", type: "string" },
    { name: "AGE", type: "number" },
  ],
  strict: true,
};

test("should validate a correct object", async () => {
  const testData = {
    ID: 1,
    NAME: "CCORGZ",
    AGE: 24,
  };
  const result = await typix.validate(mockOptions, testData);
  expect(result.isValid).toBe(true);
  expect(result.message).toBe("Field validations completed");
  expect(result.expectedFields).toEqual([]);
});

test("should validate a wrong object with wrong ID typing", async () => {
  const testData = {
    ID: "1",
    NAME: "CCORGZ",
    AGE: 24,
  };
  const result = await typix.validate(mockOptions, testData);
  expect(result.isValid).toBe(false);
  expect(result.message).toBe("Field validations failed");
  expect(result.expectedFields).toEqual([
    {
      field: "ID",
      expectedType: "number",
      receivedType: "string",
      receivedValue: "1",
      errorMessage: "Error on typing",
    },
  ]);
});

test("should validate a wrong object with wrong ID value", async () => {
  const testData = {
    ID: -1,
    NAME: "CCORGZ",
    AGE: 24,
  };
  const result = await typix.validate(mockOptions, testData);
  expect(result.isValid).toBe(false);
  expect(result.message).toBe("Field validations failed");
  expect(result.expectedFields).toEqual([
    {
      field: "ID",
      expectedType: "number",
      receivedType: "number",
      receivedValue: -1,
      errorMessage: "Error on value",
    },
  ]);
});

test("should not validate a field when field strict is false", async () => {
  const mockOptionsWithStrict = {
    fields: [
      { name: "ID", type: "number" },
      { name: "NAME", type: "string", strict: false },
      { name: "AGE", type: "number" },
    ],
    strict: true,
  };

  const testData = {
    ID: 1,
    NAME: undefined,
    AGE: 24,
  };
  const result = await typix.validate(mockOptionsWithStrict, testData);
  expect(result.isValid).toBe(true);
  expect(result.message).toBe("Field validations completed");
  expect(result.expectedFields).toEqual([]);
});

test("should not validate any field when options strict is false", async () => {
  const mockOptionsWithStrict = {
    fields: [
      { name: "ID", type: "number" },
      { name: "NAME", type: "string", strict: false },
      { name: "AGE", type: "number" },
    ],
    strict: false,
  };

  const testData = {
    ID: undefined,
    NAME: undefined,
    AGE: undefined,
  };
  const result = await typix.validate(mockOptionsWithStrict, testData);
  expect(result.isValid).toBe(true);
  expect(result.message).toBe("Field validations completed");
  expect(result.expectedFields).toEqual([]);
});

test("should return when NAME field length is under 10", async () => {
  const mockOptionsWithStrict = {
    fields: [
      { name: "ID", type: "number" },
      { name: "NAME", type: "string", validateValue: (value) => value.length < 10 },
      { name: "AGE", type: "number" },
    ],
    strict: true,
  };

  const testData = {
    ID: 1,
    NAME: "CORGOZINH",
    AGE: 24,
  };
  const result = await typix.validate(mockOptionsWithStrict, testData);
  expect(result.isValid).toBe(true);
  expect(result.message).toBe("Field validations completed");
  expect(result.expectedFields).toEqual([]);
});
