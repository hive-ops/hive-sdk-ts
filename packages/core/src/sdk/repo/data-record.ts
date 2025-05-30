import { ColumnType, Record, TableMetadata } from "../../gen";
import { VESPA_COLUMN_SUFFIXES, vespaColumnPrefix } from "../utilities";
import { ColumnTypeMap } from "./types";

export const getColumnTypeMap = <S>(tableMetadata: TableMetadata): ColumnTypeMap<S> => {
  const columnTypeMap = tableMetadata.columns.reduce((acc, column) => {
    acc[column.name] = column.type;
    return acc;
  }, {} as ColumnTypeMap<S>);

  for (const suffix of VESPA_COLUMN_SUFFIXES) {
    columnTypeMap[`${vespaColumnPrefix}${suffix}`] = ColumnType.TEXT;
  }

  return columnTypeMap;
};

// export const fromProtoInRecords = (records: Records, typeDef: { [key: string]: ColumnType }): RecordRow[] => {
//   const recordRows: RecordRow[] = [];
//   for (const recordItem of records.items) {
//     const recordRow: RecordRow = {};
//     for (const [i, columnName] of records.columnNames.entries()) {
//       const columnType = typeDef[columnName] || ColumnType.TEXT;
//       recordRow[columnName] = {
//         name: columnName,
//         type: columnType,
//         value: recordItem.values[i],
//       };
//     }
//     recordRows.push(recordRow);
//   }
//   return recordRows;
// };

// export const fromProtoOutRecords = (records: OutRecords, typeDef: { [key: string]: ColumnType }): RecordRow[] => {
//   const recordRows: RecordRow[] = [];

//   const recordsData: {
//     [key: string]: {
//       name: string;
//       type: ColumnType;
//       values: ValueType[];
//     };
//   } = {};

//   for (const [key, values] of Object.entries(records.records)) {
//     for (const value of values.values) {
//       const columnType = typeDef[key] || ColumnType.TEXT;

//       const dataValues = recordsData[key] || {
//         name: key,
//         type: columnType,
//         values: [],
//       };

//       if (isVespaColumn(key)) {
//         dataValues.values.push(value);
//       } else {
//         dataValues.values.push(fromString(value, columnType));
//       }
//       recordsData[key] = dataValues;
//     }
//   }

//   const recordsDataValues = Object.values(recordsData);
//   if (recordsDataValues.length === 0) {
//     return [];
//   }
//   const lengths = recordsDataValues.map((values) => values.values.length);
//   if (lengths.some((length) => length !== lengths[0])) {
//     throw new Error("lengths of slices are not equal: " + lengths);
//   }

//   if (lengths.length === 0) {
//     return [];
//   }

//   for (let i = 0; i < lengths[0]; i++) {
//     const recordRow: RecordRow = {};
//     for (const [key, values] of Object.entries(recordsData)) {
//       const columnName = isVespaColumn(key) ? getVespaColumnName(key) : key;
//       recordRow[columnName] = {
//         name: columnName,
//         type: values.type,
//         value: values.values[i],
//       };
//     }
//     recordRows.push(recordRow);
//   }

//   return recordRows;
// };

// export const fromProtoOutRecord = (record: OutRecord, typeDef: { [key: string]: ColumnType }): RecordRow => {
//   const recordRow: RecordRow = {};

//   for (const [key, value] of Object.entries(record.record)) {
//     const columnType = typeDef[key] || ColumnType.TEXT;

//     const columnName = isVespaColumn(key) ? getVespaColumnName(key) : key;
//     const columnValue = isVespaColumn(key) ? value : fromString(value, columnType);

//     recordRow[columnName] = {
//       name: columnName,
//       type: columnType,
//       value: columnValue,
//     };
//   }

//   return recordRow;
// };
