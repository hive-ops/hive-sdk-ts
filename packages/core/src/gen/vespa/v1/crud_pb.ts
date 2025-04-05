// @generated by protoc-gen-es v1.7.2 with parameter "target=ts"
// @generated from file vespa/v1/crud.proto (package vespa.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3, protoInt64 } from "@bufbuild/protobuf";
import { OutRecords, Record, Records, WhereCondition } from "./data_models_pb";
import { ResponseMetadata } from "../../hive/v1/models_pb";

/**
 * @generated from message vespa.v1.DeleteRecordsRequest
 */
export class DeleteRecordsRequest extends Message<DeleteRecordsRequest> {
  /**
   * @generated from field: string database_hrn = 1;
   */
  databaseHrn = "";

  /**
   * @generated from field: string table_name = 2;
   */
  tableName = "";

  /**
   * @generated from field: repeated vespa.v1.WhereCondition where_conditions = 3;
   */
  whereConditions: WhereCondition[] = [];

  constructor(data?: PartialMessage<DeleteRecordsRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "vespa.v1.DeleteRecordsRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "database_hrn", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "table_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "where_conditions", kind: "message", T: WhereCondition, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DeleteRecordsRequest {
    return new DeleteRecordsRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DeleteRecordsRequest {
    return new DeleteRecordsRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DeleteRecordsRequest {
    return new DeleteRecordsRequest().fromJsonString(jsonString, options);
  }

  static equals(a: DeleteRecordsRequest | PlainMessage<DeleteRecordsRequest> | undefined, b: DeleteRecordsRequest | PlainMessage<DeleteRecordsRequest> | undefined): boolean {
    return proto3.util.equals(DeleteRecordsRequest, a, b);
  }
}

/**
 * @generated from message vespa.v1.DeleteRecordsResponse
 */
export class DeleteRecordsResponse extends Message<DeleteRecordsResponse> {
  /**
   * @generated from field: hive.v1.ResponseMetadata metadata = 1;
   */
  metadata?: ResponseMetadata;

  constructor(data?: PartialMessage<DeleteRecordsResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "vespa.v1.DeleteRecordsResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "metadata", kind: "message", T: ResponseMetadata },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DeleteRecordsResponse {
    return new DeleteRecordsResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DeleteRecordsResponse {
    return new DeleteRecordsResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DeleteRecordsResponse {
    return new DeleteRecordsResponse().fromJsonString(jsonString, options);
  }

  static equals(a: DeleteRecordsResponse | PlainMessage<DeleteRecordsResponse> | undefined, b: DeleteRecordsResponse | PlainMessage<DeleteRecordsResponse> | undefined): boolean {
    return proto3.util.equals(DeleteRecordsResponse, a, b);
  }
}

/**
 * @generated from message vespa.v1.GetRecordsRequest
 */
export class GetRecordsRequest extends Message<GetRecordsRequest> {
  /**
   * @generated from field: string database_hrn = 1;
   */
  databaseHrn = "";

  /**
   * @generated from field: string table_name = 2;
   */
  tableName = "";

  /**
   * @generated from field: repeated vespa.v1.WhereCondition where_conditions = 3;
   */
  whereConditions: WhereCondition[] = [];

  /**
   * @generated from field: int32 offset = 4;
   */
  offset = 0;

  /**
   * @generated from field: int32 limit = 5;
   */
  limit = 0;

  constructor(data?: PartialMessage<GetRecordsRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "vespa.v1.GetRecordsRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "database_hrn", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "table_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "where_conditions", kind: "message", T: WhereCondition, repeated: true },
    { no: 4, name: "offset", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 5, name: "limit", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetRecordsRequest {
    return new GetRecordsRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetRecordsRequest {
    return new GetRecordsRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetRecordsRequest {
    return new GetRecordsRequest().fromJsonString(jsonString, options);
  }

  static equals(a: GetRecordsRequest | PlainMessage<GetRecordsRequest> | undefined, b: GetRecordsRequest | PlainMessage<GetRecordsRequest> | undefined): boolean {
    return proto3.util.equals(GetRecordsRequest, a, b);
  }
}

/**
 * @generated from message vespa.v1.GetRecordsResponse
 */
export class GetRecordsResponse extends Message<GetRecordsResponse> {
  /**
   * @generated from field: hive.v1.ResponseMetadata metadata = 1;
   */
  metadata?: ResponseMetadata;

  /**
   * @generated from field: vespa.v1.OutRecords records = 2;
   */
  records?: OutRecords;

  constructor(data?: PartialMessage<GetRecordsResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "vespa.v1.GetRecordsResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "metadata", kind: "message", T: ResponseMetadata },
    { no: 2, name: "records", kind: "message", T: OutRecords },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetRecordsResponse {
    return new GetRecordsResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetRecordsResponse {
    return new GetRecordsResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetRecordsResponse {
    return new GetRecordsResponse().fromJsonString(jsonString, options);
  }

  static equals(a: GetRecordsResponse | PlainMessage<GetRecordsResponse> | undefined, b: GetRecordsResponse | PlainMessage<GetRecordsResponse> | undefined): boolean {
    return proto3.util.equals(GetRecordsResponse, a, b);
  }
}

/**
 * @generated from message vespa.v1.CountRecordsRequest
 */
export class CountRecordsRequest extends Message<CountRecordsRequest> {
  /**
   * @generated from field: string database_hrn = 1;
   */
  databaseHrn = "";

  /**
   * @generated from field: string table_name = 2;
   */
  tableName = "";

  /**
   * @generated from field: repeated vespa.v1.WhereCondition where_conditions = 3;
   */
  whereConditions: WhereCondition[] = [];

  constructor(data?: PartialMessage<CountRecordsRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "vespa.v1.CountRecordsRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "database_hrn", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "table_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "where_conditions", kind: "message", T: WhereCondition, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CountRecordsRequest {
    return new CountRecordsRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CountRecordsRequest {
    return new CountRecordsRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CountRecordsRequest {
    return new CountRecordsRequest().fromJsonString(jsonString, options);
  }

  static equals(a: CountRecordsRequest | PlainMessage<CountRecordsRequest> | undefined, b: CountRecordsRequest | PlainMessage<CountRecordsRequest> | undefined): boolean {
    return proto3.util.equals(CountRecordsRequest, a, b);
  }
}

/**
 * @generated from message vespa.v1.CountRecordsResponse
 */
export class CountRecordsResponse extends Message<CountRecordsResponse> {
  /**
   * @generated from field: hive.v1.ResponseMetadata metadata = 1;
   */
  metadata?: ResponseMetadata;

  /**
   * @generated from field: uint64 count = 2;
   */
  count = protoInt64.zero;

  constructor(data?: PartialMessage<CountRecordsResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "vespa.v1.CountRecordsResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "metadata", kind: "message", T: ResponseMetadata },
    { no: 2, name: "count", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CountRecordsResponse {
    return new CountRecordsResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CountRecordsResponse {
    return new CountRecordsResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CountRecordsResponse {
    return new CountRecordsResponse().fromJsonString(jsonString, options);
  }

  static equals(a: CountRecordsResponse | PlainMessage<CountRecordsResponse> | undefined, b: CountRecordsResponse | PlainMessage<CountRecordsResponse> | undefined): boolean {
    return proto3.util.equals(CountRecordsResponse, a, b);
  }
}

/**
 * @generated from message vespa.v1.ExistsRequest
 */
export class ExistsRequest extends Message<ExistsRequest> {
  /**
   * @generated from field: string database_hrn = 1;
   */
  databaseHrn = "";

  /**
   * @generated from field: string table_name = 2;
   */
  tableName = "";

  /**
   * @generated from field: repeated vespa.v1.WhereCondition where_conditions = 3;
   */
  whereConditions: WhereCondition[] = [];

  constructor(data?: PartialMessage<ExistsRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "vespa.v1.ExistsRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "database_hrn", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "table_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "where_conditions", kind: "message", T: WhereCondition, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ExistsRequest {
    return new ExistsRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ExistsRequest {
    return new ExistsRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ExistsRequest {
    return new ExistsRequest().fromJsonString(jsonString, options);
  }

  static equals(a: ExistsRequest | PlainMessage<ExistsRequest> | undefined, b: ExistsRequest | PlainMessage<ExistsRequest> | undefined): boolean {
    return proto3.util.equals(ExistsRequest, a, b);
  }
}

/**
 * @generated from message vespa.v1.ExistsResponse
 */
export class ExistsResponse extends Message<ExistsResponse> {
  /**
   * @generated from field: hive.v1.ResponseMetadata metadata = 1;
   */
  metadata?: ResponseMetadata;

  /**
   * @generated from field: bool exists = 2;
   */
  exists = false;

  constructor(data?: PartialMessage<ExistsResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "vespa.v1.ExistsResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "metadata", kind: "message", T: ResponseMetadata },
    { no: 2, name: "exists", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ExistsResponse {
    return new ExistsResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ExistsResponse {
    return new ExistsResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ExistsResponse {
    return new ExistsResponse().fromJsonString(jsonString, options);
  }

  static equals(a: ExistsResponse | PlainMessage<ExistsResponse> | undefined, b: ExistsResponse | PlainMessage<ExistsResponse> | undefined): boolean {
    return proto3.util.equals(ExistsResponse, a, b);
  }
}

/**
 * @generated from message vespa.v1.InsertRecordsRequest
 */
export class InsertRecordsRequest extends Message<InsertRecordsRequest> {
  /**
   * @generated from field: string database_hrn = 1;
   */
  databaseHrn = "";

  /**
   * @generated from field: string table_name = 2;
   */
  tableName = "";

  /**
   * @generated from field: vespa.v1.Records records = 3;
   */
  records?: Records;

  constructor(data?: PartialMessage<InsertRecordsRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "vespa.v1.InsertRecordsRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "database_hrn", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "table_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "records", kind: "message", T: Records },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): InsertRecordsRequest {
    return new InsertRecordsRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): InsertRecordsRequest {
    return new InsertRecordsRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): InsertRecordsRequest {
    return new InsertRecordsRequest().fromJsonString(jsonString, options);
  }

  static equals(a: InsertRecordsRequest | PlainMessage<InsertRecordsRequest> | undefined, b: InsertRecordsRequest | PlainMessage<InsertRecordsRequest> | undefined): boolean {
    return proto3.util.equals(InsertRecordsRequest, a, b);
  }
}

/**
 * @generated from message vespa.v1.InsertRecordsResponse
 */
export class InsertRecordsResponse extends Message<InsertRecordsResponse> {
  /**
   * @generated from field: hive.v1.ResponseMetadata metadata = 1;
   */
  metadata?: ResponseMetadata;

  /**
   * @generated from field: repeated string inserted_ids = 2;
   */
  insertedIds: string[] = [];

  constructor(data?: PartialMessage<InsertRecordsResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "vespa.v1.InsertRecordsResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "metadata", kind: "message", T: ResponseMetadata },
    { no: 2, name: "inserted_ids", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): InsertRecordsResponse {
    return new InsertRecordsResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): InsertRecordsResponse {
    return new InsertRecordsResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): InsertRecordsResponse {
    return new InsertRecordsResponse().fromJsonString(jsonString, options);
  }

  static equals(a: InsertRecordsResponse | PlainMessage<InsertRecordsResponse> | undefined, b: InsertRecordsResponse | PlainMessage<InsertRecordsResponse> | undefined): boolean {
    return proto3.util.equals(InsertRecordsResponse, a, b);
  }
}

/**
 * @generated from message vespa.v1.UpdateRecordsRequest
 */
export class UpdateRecordsRequest extends Message<UpdateRecordsRequest> {
  /**
   * @generated from field: string database_hrn = 1;
   */
  databaseHrn = "";

  /**
   * @generated from field: string table_name = 2;
   */
  tableName = "";

  /**
   * @generated from field: vespa.v1.Record record = 3;
   */
  record?: Record;

  /**
   * @generated from field: repeated vespa.v1.WhereCondition where_conditions = 4;
   */
  whereConditions: WhereCondition[] = [];

  constructor(data?: PartialMessage<UpdateRecordsRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "vespa.v1.UpdateRecordsRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "database_hrn", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "table_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "record", kind: "message", T: Record },
    { no: 4, name: "where_conditions", kind: "message", T: WhereCondition, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UpdateRecordsRequest {
    return new UpdateRecordsRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UpdateRecordsRequest {
    return new UpdateRecordsRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UpdateRecordsRequest {
    return new UpdateRecordsRequest().fromJsonString(jsonString, options);
  }

  static equals(a: UpdateRecordsRequest | PlainMessage<UpdateRecordsRequest> | undefined, b: UpdateRecordsRequest | PlainMessage<UpdateRecordsRequest> | undefined): boolean {
    return proto3.util.equals(UpdateRecordsRequest, a, b);
  }
}

/**
 * @generated from message vespa.v1.UpdateRecordsResponse
 */
export class UpdateRecordsResponse extends Message<UpdateRecordsResponse> {
  /**
   * @generated from field: hive.v1.ResponseMetadata metadata = 1;
   */
  metadata?: ResponseMetadata;

  constructor(data?: PartialMessage<UpdateRecordsResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "vespa.v1.UpdateRecordsResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "metadata", kind: "message", T: ResponseMetadata },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UpdateRecordsResponse {
    return new UpdateRecordsResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UpdateRecordsResponse {
    return new UpdateRecordsResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UpdateRecordsResponse {
    return new UpdateRecordsResponse().fromJsonString(jsonString, options);
  }

  static equals(a: UpdateRecordsResponse | PlainMessage<UpdateRecordsResponse> | undefined, b: UpdateRecordsResponse | PlainMessage<UpdateRecordsResponse> | undefined): boolean {
    return proto3.util.equals(UpdateRecordsResponse, a, b);
  }
}

