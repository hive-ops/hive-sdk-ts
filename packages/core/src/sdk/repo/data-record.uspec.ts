import { Ok } from "neverthrow";
import { ColumnType, OutRecords } from "../../gen";
import { fromProtoOutRecords, RecordRow } from "./data-record";

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

    const recordRowsResult = fromProtoOutRecords(records, typeDef);
    expect(recordRowsResult.isOk()).toBeTruthy();
    expect((recordRowsResult as Ok<RecordRow[], Error>).value.length).toBe(5);
  });
});
