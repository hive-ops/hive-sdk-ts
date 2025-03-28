// @generated by protoc-gen-es v1.7.2 with parameter "target=ts"
// @generated from file drone/v1/token.proto (package drone.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3, protoInt64 } from "@bufbuild/protobuf";
import { HiveTokenType } from "./enums_pb.js";

/**
 * @generated from message drone.v1.HiveToken
 */
export class HiveToken extends Message<HiveToken> {
  /**
   * @generated from field: string signed_token = 1;
   */
  signedToken = "";

  /**
   * @generated from field: string uid = 2;
   */
  uid = "";

  /**
   * @generated from field: drone.v1.HiveTokenType type = 3;
   */
  type = HiveTokenType.UNSPECIFIED;

  /**
   * @generated from field: string issuer = 4;
   */
  issuer = "";

  /**
   * @generated from field: string subject = 5;
   */
  subject = "";

  /**
   * @generated from field: repeated string audience = 6;
   */
  audience: string[] = [];

  /**
   * UTC Unix timestamp in seconds
   *
   * @generated from field: uint64 expires_at = 7;
   */
  expiresAt = protoInt64.zero;

  /**
   * UTC Unix timestamp in seconds
   *
   * @generated from field: uint64 not_before = 8;
   */
  notBefore = protoInt64.zero;

  /**
   * UTC Unix timestamp in seconds
   *
   * @generated from field: uint64 issued_at = 9;
   */
  issuedAt = protoInt64.zero;

  /**
   * @generated from field: string id = 10;
   */
  id = "";

  /**
   * @generated from field: string key = 11;
   */
  key = "";

  constructor(data?: PartialMessage<HiveToken>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "drone.v1.HiveToken";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "signed_token", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "uid", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "type", kind: "enum", T: proto3.getEnumType(HiveTokenType) },
    { no: 4, name: "issuer", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "subject", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 6, name: "audience", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
    { no: 7, name: "expires_at", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 8, name: "not_before", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 9, name: "issued_at", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 10, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 11, name: "key", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): HiveToken {
    return new HiveToken().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): HiveToken {
    return new HiveToken().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): HiveToken {
    return new HiveToken().fromJsonString(jsonString, options);
  }

  static equals(a: HiveToken | PlainMessage<HiveToken> | undefined, b: HiveToken | PlainMessage<HiveToken> | undefined): boolean {
    return proto3.util.equals(HiveToken, a, b);
  }
}

/**
 * @generated from message drone.v1.GetSecureAppHiveTokenRequest
 */
export class GetSecureAppHiveTokenRequest extends Message<GetSecureAppHiveTokenRequest> {
  constructor(data?: PartialMessage<GetSecureAppHiveTokenRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "drone.v1.GetSecureAppHiveTokenRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetSecureAppHiveTokenRequest {
    return new GetSecureAppHiveTokenRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetSecureAppHiveTokenRequest {
    return new GetSecureAppHiveTokenRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetSecureAppHiveTokenRequest {
    return new GetSecureAppHiveTokenRequest().fromJsonString(jsonString, options);
  }

  static equals(a: GetSecureAppHiveTokenRequest | PlainMessage<GetSecureAppHiveTokenRequest> | undefined, b: GetSecureAppHiveTokenRequest | PlainMessage<GetSecureAppHiveTokenRequest> | undefined): boolean {
    return proto3.util.equals(GetSecureAppHiveTokenRequest, a, b);
  }
}

/**
 * @generated from message drone.v1.GetSecureAppHiveTokenResponse
 */
export class GetSecureAppHiveTokenResponse extends Message<GetSecureAppHiveTokenResponse> {
  /**
   * @generated from field: drone.v1.HiveToken hive_token = 1;
   */
  hiveToken?: HiveToken;

  constructor(data?: PartialMessage<GetSecureAppHiveTokenResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "drone.v1.GetSecureAppHiveTokenResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "hive_token", kind: "message", T: HiveToken },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetSecureAppHiveTokenResponse {
    return new GetSecureAppHiveTokenResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetSecureAppHiveTokenResponse {
    return new GetSecureAppHiveTokenResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetSecureAppHiveTokenResponse {
    return new GetSecureAppHiveTokenResponse().fromJsonString(jsonString, options);
  }

  static equals(a: GetSecureAppHiveTokenResponse | PlainMessage<GetSecureAppHiveTokenResponse> | undefined, b: GetSecureAppHiveTokenResponse | PlainMessage<GetSecureAppHiveTokenResponse> | undefined): boolean {
    return proto3.util.equals(GetSecureAppHiveTokenResponse, a, b);
  }
}

