import { ColumnType } from "../../gen";
import { ValueType } from "./types";

export const fromInt = (v: number): string => v.toString();

export const fromFloat = (v: number): string => v.toString();

export const fromBool = (v: boolean): string => v.toString();

export const fromTime = (v: Date, columnType: ColumnType): string => {
  switch (columnType) {
    case ColumnType.TIMESTAMP:
      return v.toISOString();
    case ColumnType.DATE:
      return v.toISOString().split("T")[0];
    case ColumnType.TIME:
      return v.toISOString().split("T")[1].split(".")[0];
    default:
      throw new Error("unsupported type: " + typeof v + " for column type: " + ColumnType[columnType]);
  }
};

export const fromBytes = (v: Uint8Array): string => Buffer.from(v).toString("base64");

export const fromString = (v: string): string => v;

export const ToString = (v: ValueType, columnType: ColumnType): string => {
  if (typeof v === "string" && columnType === ColumnType.TEXT) {
    return fromString(v);
  } else if (typeof v === "number" && ([ColumnType.INTEGER, ColumnType.ENUM] as ColumnType[]).includes(columnType)) {
    return fromInt(v);
  } else if (typeof v === "number" && columnType === ColumnType.FLOAT) {
    return fromFloat(v);
  } else if (typeof v === "boolean" && columnType === ColumnType.BOOLEAN) {
    return fromBool(v);
  } else if (v instanceof Date && columnType === ColumnType.TIMESTAMP) {
    return fromTime(v, columnType);
  } else if (v instanceof Uint8Array && columnType === ColumnType.BLOB) {
    return fromBytes(v);
  } else if (v instanceof Object && columnType === ColumnType.JSON) {
    return fromString(JSON.stringify(v));
  }
  throw new Error("unsupported type: " + typeof v + " for column type: " + ColumnType[columnType]);
};
