import { ColumnType, OutRecord, OutRecords, Records, TableMetadata } from "../../gen";
import { getVespaColumnName, isVespaColumn } from "../utilities/utils";
import { ValueType } from "./types";
import { fromString } from "./value-converter";

export type RecordColumn = {
  name: string;
  type: ColumnType;
  value: ValueType;
};

export type RecordRow = {
  [key: string]: RecordColumn;
};

export const getTypeDef = (tableMetadata: TableMetadata): { [key: string]: ColumnType } => {
  return tableMetadata.columns.reduce((acc, column) => {
    acc[column.name] = column.type;
    return acc;
  }, {} as { [key: string]: ColumnType });
};

export const fromProtoInRecords = (records: Records, typeDef: { [key: string]: ColumnType }): RecordRow[] => {
  const recordRows: RecordRow[] = [];
  for (const recordItem of records.items) {
    const recordRow: RecordRow = {};
    for (const [i, columnName] of records.columnNames.entries()) {
      const columnType = typeDef[columnName] || ColumnType.TEXT;
      recordRow[columnName] = {
        name: columnName,
        type: columnType,
        value: recordItem.values[i],
      };
    }
    recordRows.push(recordRow);
  }
  return recordRows;
};

export const fromProtoOutRecords = (records: OutRecords, typeDef: { [key: string]: ColumnType }): RecordRow[] => {
  const recordRows: RecordRow[] = [];

  const recordsData: {
    [key: string]: {
      name: string;
      type: ColumnType;
      values: ValueType[];
    };
  } = {};

  for (const [key, values] of Object.entries(records.records)) {
    for (const value of values.values) {
      const columnType = typeDef[key] || ColumnType.TEXT;

      const dataValues = recordsData[key] || {
        name: key,
        type: columnType,
        values: [],
      };

      if (isVespaColumn(key)) {
        dataValues.values.push(value);
      } else {
        dataValues.values.push(fromString(value, columnType));
      }
      recordsData[key] = dataValues;
    }
  }

  const recordsDataValues = Object.values(recordsData);
  if (recordsDataValues.length === 0) {
    return [];
  }
  const lengths = recordsDataValues.map((values) => values.values.length);
  if (lengths.some((length) => length !== lengths[0])) {
    throw new Error("lengths of slices are not equal: " + lengths);
  }

  if (lengths.length === 0) {
    return [];
  }

  for (let i = 0; i < lengths[0]; i++) {
    const recordRow: RecordRow = {};
    for (const [key, values] of Object.entries(recordsData)) {
      const columnName = isVespaColumn(key) ? getVespaColumnName(key) : key;
      recordRow[columnName] = {
        name: columnName,
        type: values.type,
        value: values.values[i],
      };
    }
    recordRows.push(recordRow);
  }

  return recordRows;
};

export const fromProtoOutRecord = (record: OutRecord, typeDef: { [key: string]: ColumnType }): RecordRow => {
  const recordRow: RecordRow = {};

  for (const [key, value] of Object.entries(record.record)) {
    const columnType = typeDef[key] || ColumnType.TEXT;

    const columnName = isVespaColumn(key) ? getVespaColumnName(key) : key;
    const columnValue = isVespaColumn(key) ? value : fromString(value, columnType);

    recordRow[columnName] = {
      name: columnName,
      type: columnType,
      value: columnValue,
    };
  }

  return recordRow;
};
