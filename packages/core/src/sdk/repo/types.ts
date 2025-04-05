import { ColumnType } from "../../gen";

export type ValueType = string | number | boolean | Date | Uint8Array;

export type ColumnTypeMap = { [key: string]: ColumnType };

export type Metadata = {
  _vespa_partition: string;
  _vespa_id: string;
};
