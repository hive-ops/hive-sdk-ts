// @generated by protoc-gen-es v1.7.2 with parameter "target=ts"
// @generated from file beekeeper/v1/migration.proto (package beekeeper.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";
import { File, ResponseMetadata } from "../../hive/v1/models_pb";
import { Migration } from "../../vespa/v1/migrations_pb";

/**
 * @generated from message beekeeper.v1.ApplyMigrationRequest
 */
export class ApplyMigrationRequest extends Message<ApplyMigrationRequest> {
  /**
   * @generated from field: string stack_hrn = 1;
   */
  stackHrn = "";

  /**
   * @generated from field: repeated hive.v1.File hsl_files = 2;
   */
  hslFiles: File[] = [];

  constructor(data?: PartialMessage<ApplyMigrationRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "beekeeper.v1.ApplyMigrationRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "stack_hrn", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "hsl_files", kind: "message", T: File, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ApplyMigrationRequest {
    return new ApplyMigrationRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ApplyMigrationRequest {
    return new ApplyMigrationRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ApplyMigrationRequest {
    return new ApplyMigrationRequest().fromJsonString(jsonString, options);
  }

  static equals(a: ApplyMigrationRequest | PlainMessage<ApplyMigrationRequest> | undefined, b: ApplyMigrationRequest | PlainMessage<ApplyMigrationRequest> | undefined): boolean {
    return proto3.util.equals(ApplyMigrationRequest, a, b);
  }
}

/**
 * @generated from message beekeeper.v1.ApplyMigrationResponse
 */
export class ApplyMigrationResponse extends Message<ApplyMigrationResponse> {
  /**
   * @generated from field: hive.v1.ResponseMetadata metadata = 1;
   */
  metadata?: ResponseMetadata;

  /**
   * @generated from field: vespa.v1.Migration migration = 2;
   */
  migration?: Migration;

  constructor(data?: PartialMessage<ApplyMigrationResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "beekeeper.v1.ApplyMigrationResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "metadata", kind: "message", T: ResponseMetadata },
    { no: 2, name: "migration", kind: "message", T: Migration },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ApplyMigrationResponse {
    return new ApplyMigrationResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ApplyMigrationResponse {
    return new ApplyMigrationResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ApplyMigrationResponse {
    return new ApplyMigrationResponse().fromJsonString(jsonString, options);
  }

  static equals(a: ApplyMigrationResponse | PlainMessage<ApplyMigrationResponse> | undefined, b: ApplyMigrationResponse | PlainMessage<ApplyMigrationResponse> | undefined): boolean {
    return proto3.util.equals(ApplyMigrationResponse, a, b);
  }
}

/**
 * @generated from message beekeeper.v1.PlanMigrationRequest
 */
export class PlanMigrationRequest extends Message<PlanMigrationRequest> {
  /**
   * @generated from field: string stack_hrn = 1;
   */
  stackHrn = "";

  /**
   * @generated from field: repeated hive.v1.File hsl_files = 2;
   */
  hslFiles: File[] = [];

  constructor(data?: PartialMessage<PlanMigrationRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "beekeeper.v1.PlanMigrationRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "stack_hrn", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "hsl_files", kind: "message", T: File, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): PlanMigrationRequest {
    return new PlanMigrationRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): PlanMigrationRequest {
    return new PlanMigrationRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): PlanMigrationRequest {
    return new PlanMigrationRequest().fromJsonString(jsonString, options);
  }

  static equals(a: PlanMigrationRequest | PlainMessage<PlanMigrationRequest> | undefined, b: PlanMigrationRequest | PlainMessage<PlanMigrationRequest> | undefined): boolean {
    return proto3.util.equals(PlanMigrationRequest, a, b);
  }
}

/**
 * @generated from message beekeeper.v1.PlanMigrationResponse
 */
export class PlanMigrationResponse extends Message<PlanMigrationResponse> {
  /**
   * @generated from field: hive.v1.ResponseMetadata metadata = 1;
   */
  metadata?: ResponseMetadata;

  /**
   * @generated from field: vespa.v1.Migration migration = 2;
   */
  migration?: Migration;

  constructor(data?: PartialMessage<PlanMigrationResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "beekeeper.v1.PlanMigrationResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "metadata", kind: "message", T: ResponseMetadata },
    { no: 2, name: "migration", kind: "message", T: Migration },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): PlanMigrationResponse {
    return new PlanMigrationResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): PlanMigrationResponse {
    return new PlanMigrationResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): PlanMigrationResponse {
    return new PlanMigrationResponse().fromJsonString(jsonString, options);
  }

  static equals(a: PlanMigrationResponse | PlainMessage<PlanMigrationResponse> | undefined, b: PlanMigrationResponse | PlainMessage<PlanMigrationResponse> | undefined): boolean {
    return proto3.util.equals(PlanMigrationResponse, a, b);
  }
}

