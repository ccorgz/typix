import typix from "../src/index";
import { Options } from "../types/types";

const mockOptions: Options = {
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
  expect(result.message).toBe("Field validations were successfull");
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
  expect(result.message).toBe("One or more field validations failed");
  expect(result.expectedFields).toEqual([
    {
      field: "ID",
      expectedType: "number",
      receivedType: "string",
      receivedValue: "1",
      errorType: "typing",
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
  expect(result.message).toBe("One or more field validations failed");
  expect(result.expectedFields).toEqual([
    {
      field: "ID",
      expectedType: "number",
      receivedType: "number",
      receivedValue: -1,
      errorType: "value",
    },
  ]);
});
