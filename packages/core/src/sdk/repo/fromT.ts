import { ColumnType } from "../../gen";
import { ValueType } from "./types";

export const fromInt = (v: number): string => v.toString();

export const fromFloat = (v: number): string => v.toString();

export const fromBool = (v: boolean): string => v.toString();

export const fromTime = (v: Date): string => v.toISOString();

export const fromBytes = (v: Uint8Array): string => Buffer.from(v).toString("base64");

export const fromString = (v: string): string => v;

export const fromT = (v: ValueType, columnType: ColumnType): string => {
  if (typeof v === "string" && columnType === ColumnType.TEXT) {
    return fromString(v);
  } else if (typeof v === "number" && columnType === ColumnType.INTEGER) {
    return fromInt(v);
  } else if (typeof v === "number" && columnType === ColumnType.FLOAT) {
    return fromFloat(v);
  } else if (typeof v === "boolean" && columnType === ColumnType.BOOLEAN) {
    return fromBool(v);
  } else if (v instanceof Date && columnType === ColumnType.TIMESTAMP) {
    return fromTime(v);
  } else if (v instanceof Uint8Array && columnType === ColumnType.BLOB) {
    return fromBytes(v);
  }
  throw new Error("Invalid data type");
};
