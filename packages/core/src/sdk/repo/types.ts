import { ColumnType } from "../../gen";

export type ValueType = string | number | boolean | Date | Uint8Array;

export type ColumnTypeMap = { [key: string]: ColumnType };

export type Metadata = {
  id: string;
  partition: string;
};
