import { ColumnType } from "../../gen";
import { fromString, ToString } from "./value-converter";

describe("valueConverter", () => {
  const tests: {
    name: string;
    input: any;
    columnType: ColumnType;
    want1: string;
    want2: any;
  }[] = [
    {
      name: "int",
      input: 123,
      columnType: ColumnType.INTEGER,
      want1: "123",
      want2: 123,
    },
    {
      name: "float",
      input: 123.456,
      columnType: ColumnType.FLOAT,
      want1: "123.456",
      want2: 123.456,
    },
    {
      name: "string",
      input: "hello",
      columnType: ColumnType.TEXT,
      want1: "hello",
      want2: "hello",
    },
    {
      name: "boolean",
      input: true,
      columnType: ColumnType.BOOLEAN,
      want1: "1",
      want2: true,
    },
    {
      name: "timestamp",
      input: new Date("2023-01-01T12:34:56.789Z"),
      columnType: ColumnType.TIMESTAMP,
      want1: "2023-01-01T12:34:56.789Z",
      want2: new Date("2023-01-01T12:34:56.789Z"),
    },
    {
      name: "date",
      input: new Date("2023-01-01"),
      columnType: ColumnType.DATE,
      want1: "2023-01-01",
      want2: new Date("2023-01-01"),
    },
    {
      name: "time",
      input: new Date("2023-01-01T12:34:56.789Z"),
      columnType: ColumnType.TIME,
      want1: "12:34:56.789",
      want2: new Date("1900-01-01T12:34:56.789Z"),
    },
    {
      name: "blob",
      input: new Uint8Array([1, 2, 3]),
      columnType: ColumnType.BLOB,
      want1: Buffer.from([1, 2, 3]).toString("base64"),
      want2: new Uint8Array([1, 2, 3]),
    },
    {
      name: "json",
      input: { key: "value" },
      columnType: ColumnType.JSON,
      want1: JSON.stringify({ key: "value" }),
      want2: { key: "value" },
    },
  ];

  tests.forEach(({ name, input, columnType, want1, want2 }) => {
    it(`should convert ${name} to string`, () => {
      const result = ToString(input, columnType);
      expect(result).toBe(want1);
    });

    it(`should convert ${name} to value`, () => {
      const result = fromString(want1, columnType);
      expect(result).toEqual(want2);
    });
  });
});
