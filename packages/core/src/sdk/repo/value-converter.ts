import { ColumnType } from "../../gen";
import { ValueType } from "./types";

export const convertTimeToString = (v: Date | undefined, columnType: ColumnType): string | undefined => {
  if (!v) {
    return undefined;
  }

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

export const convertNumberToString = (v: number | undefined, columnType: ColumnType): string | undefined => {
  if (columnType === ColumnType.ENUM && v === 0) {
    return undefined;
  }

  return v === undefined ? undefined : v.toString();
};

export const fromBytes = (v: Uint8Array): string | undefined => (!v ? undefined : Buffer.from(v).toString("base64"));

export const toString = (v: any | undefined, columnType: ColumnType): string | undefined => {
  if (v === undefined || v === null) {
    return undefined;
  }

  if (typeof v === "string") {
    return v === undefined ? undefined : (v as string);
  } else if (typeof v === "number") {
    return convertNumberToString(v, columnType);
  } else if (typeof v === "boolean" && columnType === ColumnType.BOOLEAN) {
    return v === true ? "1" : "0";
  } else if (v instanceof Date) {
    return convertTimeToString(v, columnType);
  } else if (v instanceof Uint8Array && columnType === ColumnType.BLOB) {
    return fromBytes(v);
  } else if (v instanceof Object && columnType === ColumnType.JSON) {
    return !v ? undefined : JSON.stringify(v);
  }
  throw new Error("unsupported type: " + typeof v + " for column type: " + ColumnType[columnType]);
};

// From String

export const toInt = (v: string): number | undefined => {
  if (v === "") {
    return undefined;
  }

  const value = parseInt(v, 10);
  if (isNaN(value)) {
    throw new Error("Invalid int value");
  }
  return value;
};

export const toFloat = (v: string): number | undefined => {
  if (v === "") {
    return undefined;
  }

  const value = parseFloat(v);
  if (isNaN(value)) {
    throw new Error("Invalid float value");
  }
  return value;
};

export const toTime = (v: string): Date | undefined => {
  if (v === "") {
    return undefined;
  }

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

const convertStringToByteArray = (v: string): Uint8Array | undefined => {
  return v === "" ? undefined : new Uint8Array(Buffer.from(v, "base64"));
};

export const fromString = (v: string, columnType: ColumnType): ValueType => {
  switch (columnType) {
    case ColumnType.BLOB:
      return convertStringToByteArray(v);
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
