import { create } from "@bufbuild/protobuf";
import { ColumnType, FieldValue, FieldValueSchema, Record, RecordSchema } from "../../gen";
import { ColumnTypeMap, Metadata, ValueType } from "./types";
import { fromString, toString } from "./value-converter";

export const marshalRecord = <S, T extends Metadata & S>(obj: S, columnTypeMap: ColumnTypeMap<T>): Record => {
  const record: { [key: string]: FieldValue } = {};
  for (const columnName of Object.keys(obj as object)) {
    const valStr = toString(obj[columnName as keyof S], columnTypeMap[columnName as keyof T]);
    record[columnName] = create(FieldValueSchema, {
      value: valStr || "",
      isNil: valStr === undefined,
    });
  }

  return create(RecordSchema, {
    record: record,
  });
};

export const unmarshalRecord = <T>(record: Record, columnTypeMap: ColumnTypeMap<T>): T => {
  const objMap: { [key: string]: any } = {};
  for (const [key, fieldValue] of Object.entries(record.record)) {
    const columnType = columnTypeMap[key as keyof T];

    if (!columnType) {
      throw new Error(`column type for key ${key} not found in columnTypeMap`);
    }

    objMap[key] = fromString(fieldValue.value, columnType);
  }

  return objMap as T;
};

export type ColumnValue = FieldValue & {
  type: ColumnType;
  value: ValueType;
};

export type RecordRow = {
  [key: string]: ColumnValue;
};

export const convertRecordToRecordRow = <T>(record: Record, columnTypeMap: ColumnTypeMap<T>): RecordRow => {
  const recordRow: RecordRow = {};
  for (const [key, fieldValue] of Object.entries(record.record)) {
    const columnType = columnTypeMap[key as keyof T];

    let tValue: any;

    if (columnType === ColumnType.JSON) {
      tValue = fieldValue.value;
    } else {
      tValue = fromString(fieldValue.value, columnType);
    }

    recordRow[key] = Object.assign(Object.create(Object.getPrototypeOf(fieldValue)), fieldValue, {
      type: columnType,
      value: tValue,
    });
  }

  return recordRow;
};
