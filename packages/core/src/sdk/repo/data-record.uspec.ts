import { ColumnType, OutRecords } from "../../gen";
import { fromProtoOutRecords } from "./data-record";

describe("dataRecord", () => {
  it(" successfully convert OutRecord to RowRecords", () => {
    const records: OutRecords = new OutRecords({
      records: {
        id: {
          values: ["1", "2", "3", "4", "5"],
        },
        name: {
          values: ["a", "b", "c", "d", "e"],
        },
      },
    });
    const typeDef: { [key: string]: ColumnType } = {
      id: ColumnType.INTEGER,
      name: ColumnType.TEXT,
    };

    const recordRows = fromProtoOutRecords(records, typeDef);
    expect(recordRows.length).toBe(5);
  });
});
