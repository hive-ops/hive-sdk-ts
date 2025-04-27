import { ColumnType } from "../../gen";

export type ValueType = string | number | boolean | Date | Uint8Array;

export type ColumnTypeMap<S> = { [key in keyof S]: ColumnType };

export type Metadata = {
  id: string;
  partition: string;
};
