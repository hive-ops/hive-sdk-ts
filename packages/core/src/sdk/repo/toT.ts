import { ColumnType } from "../../gen";
import { ValueType } from "./types";

export const toInt = (v: string): number => {
  const value = parseInt(v, 10);
  if (isNaN(value)) {
    throw new Error("Invalid int value");
  }
  return value;
};

export const toFloat = (v: string): number => {
  const value = parseFloat(v);
  if (isNaN(value)) {
    throw new Error("Invalid int value");
  }
  return value;
};

export const toBool = (v: string): boolean => {
  if (v.toLowerCase() === "true") {
    return true;
  } else if (v.toLowerCase() === "false") {
    return false;
  } else {
    throw new Error("Invalid bool value");
  }
};

export const toString = (v: string): string => v;

export const toTime = (v: string): Date => {
  const value = new Date(v);
  if (isNaN(value.getTime())) {
    throw new Error("Invalid time value");
  }
  return value;
};

export const toBytes = (v: string): Uint8Array => {
  const buf = Buffer.from(v, "base64");
  return new Uint8Array(buf);
};

export const toT = (v: string, columnType: ColumnType): ValueType => {
  switch (columnType) {
    case ColumnType.TEXT:
      return toString(v);
    case ColumnType.INTEGER:
      return toInt(v);
    case ColumnType.FLOAT:
      return toFloat(v);
    case ColumnType.BOOLEAN:
      return toBool(v);
    case ColumnType.TIMESTAMP:
      return toTime(v);
    case ColumnType.BLOB:
      return toBytes(v);
    default:
      throw new Error("Invalid data type");
  }
};
