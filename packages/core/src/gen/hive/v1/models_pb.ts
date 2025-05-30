// @generated by protoc-gen-es v1.7.2 with parameter "target=ts"
// @generated from file hive/v1/models.proto (package hive.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";
import { ErrorCode, Resource, Verb } from "./enums_pb";

/**
 * @generated from message hive.v1.Error
 */
export class Error extends Message<Error> {
  /**
   * @generated from field: hive.v1.ErrorCode code = 1;
   */
  code = ErrorCode.UNSPECIFIED;

  /**
   * @generated from field: string message = 2;
   */
  message = "";

  constructor(data?: PartialMessage<Error>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "hive.v1.Error";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "code", kind: "enum", T: proto3.getEnumType(ErrorCode) },
    { no: 2, name: "message", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Error {
    return new Error().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Error {
    return new Error().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Error {
    return new Error().fromJsonString(jsonString, options);
  }

  static equals(a: Error | PlainMessage<Error> | undefined, b: Error | PlainMessage<Error> | undefined): boolean {
    return proto3.util.equals(Error, a, b);
  }
}

/**
 * @generated from message hive.v1.ResponseMetadata
 */
export class ResponseMetadata extends Message<ResponseMetadata> {
  /**
   * @generated from field: bool successful = 1;
   */
  successful = false;

  /**
   * @generated from field: repeated hive.v1.Error errors = 2;
   */
  errors: Error[] = [];

  constructor(data?: PartialMessage<ResponseMetadata>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "hive.v1.ResponseMetadata";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "successful", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 2, name: "errors", kind: "message", T: Error, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ResponseMetadata {
    return new ResponseMetadata().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ResponseMetadata {
    return new ResponseMetadata().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ResponseMetadata {
    return new ResponseMetadata().fromJsonString(jsonString, options);
  }

  static equals(a: ResponseMetadata | PlainMessage<ResponseMetadata> | undefined, b: ResponseMetadata | PlainMessage<ResponseMetadata> | undefined): boolean {
    return proto3.util.equals(ResponseMetadata, a, b);
  }
}

/**
 * @generated from message hive.v1.File
 */
export class File extends Message<File> {
  /**
   * @generated from field: repeated string directory_path_elements = 1;
   */
  directoryPathElements: string[] = [];

  /**
   * @generated from field: string file_name = 2;
   */
  fileName = "";

  /**
   * @generated from field: string content = 3;
   */
  content = "";

  /**
   * @generated from field: string header_comment = 4;
   */
  headerComment = "";

  constructor(data?: PartialMessage<File>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "hive.v1.File";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "directory_path_elements", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
    { no: 2, name: "file_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "content", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "header_comment", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): File {
    return new File().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): File {
    return new File().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): File {
    return new File().fromJsonString(jsonString, options);
  }

  static equals(a: File | PlainMessage<File> | undefined, b: File | PlainMessage<File> | undefined): boolean {
    return proto3.util.equals(File, a, b);
  }
}

/**
 * @generated from message hive.v1.HivePermission
 */
export class HivePermission extends Message<HivePermission> {
  /**
   * @generated from field: hive.v1.Resource resource = 1;
   */
  resource = Resource.UNSPECIFIED;

  /**
   * @generated from field: repeated hive.v1.Verb verbs = 2;
   */
  verbs: Verb[] = [];

  constructor(data?: PartialMessage<HivePermission>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "hive.v1.HivePermission";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "resource", kind: "enum", T: proto3.getEnumType(Resource) },
    { no: 2, name: "verbs", kind: "enum", T: proto3.getEnumType(Verb), repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): HivePermission {
    return new HivePermission().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): HivePermission {
    return new HivePermission().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): HivePermission {
    return new HivePermission().fromJsonString(jsonString, options);
  }

  static equals(a: HivePermission | PlainMessage<HivePermission> | undefined, b: HivePermission | PlainMessage<HivePermission> | undefined): boolean {
    return proto3.util.equals(HivePermission, a, b);
  }
}

