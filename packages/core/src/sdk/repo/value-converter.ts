import { ColumnType } from "../../gen";
import { ValueType } from "./types";

export const fromInt = (v: number): string => v.toString();

export const fromFloat = (v: number): string => v.toString();

export const convertTimeToString = (v: Date, columnType: ColumnType): string => {
  switch (columnType) {
    case ColumnType.TIMESTAMP:
      return v.toISOString();
    case ColumnType.DATE:
      return v.toISOString().split("T")[0];
    case ColumnType.TIME:
      return v.toISOString().split("T")[1].replace("Z", "");
    default:
      throw new Error("unsupported type: " + typeof v + " for column type: " + ColumnType[columnType]);
  }
};

export const fromBytes = (v: Uint8Array): string => Buffer.from(v).toString("base64");

export const ToString = (v: ValueType, columnType: ColumnType): string => {
  if (typeof v === "string" && columnType === ColumnType.TEXT) {
    return v as string;
  } else if (typeof v === "number" && ([ColumnType.INTEGER, ColumnType.ENUM] as ColumnType[]).includes(columnType)) {
    return fromInt(v);
  } else if (typeof v === "number" && columnType === ColumnType.FLOAT) {
    return fromFloat(v);
  } else if (typeof v === "boolean" && columnType === ColumnType.BOOLEAN) {
    return v === true ? "1" : "0";
  } else if (v instanceof Date) {
    return convertTimeToString(v, columnType);
  } else if (v instanceof Uint8Array && columnType === ColumnType.BLOB) {
    return fromBytes(v);
  } else if (v instanceof Object && columnType === ColumnType.JSON) {
    return JSON.stringify(v);
  }
  throw new Error("unsupported type: " + typeof v + " for column type: " + ColumnType[columnType]);
};

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

export const toTime = (v: string): Date => {
  // Try parsing the full ISO 8601 format (with date)
  const value = new Date(v);
  if (!isNaN(value.getTime())) {
    return value;
  }

  // If that fails, try parsing just the time part
  const timeMatch = v.match(/^(\d{2}):(\d{2}):(\d{2})(\.(\d+))?$/);
  if (timeMatch) {
    const hours = parseInt(timeMatch[1], 10);
    const minutes = parseInt(timeMatch[2], 10);
    const seconds = parseInt(timeMatch[3], 10);
    const milliseconds = timeMatch[5] ? parseInt(timeMatch[5].padEnd(3, "0"), 10) : 0;

    return new Date(Date.UTC(1900, 0, 1, hours, minutes, seconds, milliseconds));
  }
  throw new Error("Invalid time value");
};

export const toBytes = (v: string): Uint8Array => {
  const buf = Buffer.from(v, "base64");
  return new Uint8Array(buf);
};

export const fromString = (v: string, columnType: ColumnType): ValueType => {
  switch (columnType) {
    case ColumnType.BLOB:
      return new Uint8Array(Buffer.from(v, "base64"));
    case ColumnType.BOOLEAN:
      return v === "1" || v.toLowerCase() === "true";
    case ColumnType.TEXT:
      return v;
    case ColumnType.INTEGER:
      return toInt(v);
    case ColumnType.FLOAT:
      return toFloat(v);
    case ColumnType.TIMESTAMP:
      return toTime(v);
    case ColumnType.JSON:
      return JSON.parse(v);
    case ColumnType.DATE:
      return toTime(v);
    case ColumnType.TIME:
      return toTime(v);
    case ColumnType.TIMESTAMP:
      return toTime(v);
    case ColumnType.ENUM:
      return toInt(v);
    default:
      throw new Error(`Unsupported column type: ${columnType}`);
  }
};
