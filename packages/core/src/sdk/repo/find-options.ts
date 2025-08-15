import { ColumnType, ComparisonOperator, WhereCondition as PbWhereCondition, WhereConditionSchema, WhereValueSchema } from "../../gen";
import { boundedInt } from "../utilities/utils";
import { create } from "@bufbuild/protobuf";

type Key<T> = keyof T;

export type OrderByValue = "asc" | "desc";

export type OrderBy = {
  [key: string]: OrderByValue;
};

type WhereCondition<T> = {
  [key in keyof T]?: any;
};

export type Where<T> = {
  Eq?: WhereCondition<T>;
  NE?: WhereCondition<T>;
  LT?: WhereCondition<T>;
  GT?: WhereCondition<T>;
  LTE?: WhereCondition<T>;
  GTE?: WhereCondition<T>;
  In?: { [key in Key<T>]?: any[] };
  NotIn?: { [key in Key<T>]?: any[] };
  IsNull?: Key<T>[];
  NotNull?: Key<T>[];
  Like?: WhereCondition<T>;
  NotLike?: WhereCondition<T>;
};

export type FindOneOptions<T> = Where<T> & {
  OrderBy?: OrderBy;
  Offset?: number;
};

export type FindManyOptions<T> = FindOneOptions<T> & {
  Limit?: number;
};

export const getOffset = (offset: number = 0): number => boundedInt(offset, 0, offset);

export const getLimit = (limit: number = 10, max: number = 10): number => boundedInt(limit, 1, max);

const marshalWhereCondition = <T>(operator: ComparisonOperator, conditionMap: WhereCondition<T>): PbWhereCondition[] =>
  Object.entries(conditionMap).map(([key, value]) => {
    return create(WhereConditionSchema, {
      key,
      operator,
      value: create(WhereValueSchema, {
        type: ColumnType.TEXT,
        isArray: false,
        isNull: false,
        data: value as string,
      }),
    });
  });

const marshalWhereInCondition = <T>(operator: ComparisonOperator.IN | ComparisonOperator.NOT_IN, keyMap: { [key in Key<T>]?: any[] }): PbWhereCondition[] =>
  Object.entries(keyMap).map(([key, values]) => {
    return create(WhereConditionSchema, {
      key,
      operator,
      value: create(WhereValueSchema, {
        type: ColumnType.TEXT,
        isArray: true,
        isNull: false,
        data: (values as any[]).toString(),
      }),
    });
  });

export const convertFindOptionsToWhereConditions = <T>(opts: FindOneOptions<T>): PbWhereCondition[] => {
  const whereConditions: PbWhereCondition[] = [];

  if (opts.Eq) {
    whereConditions.push(...marshalWhereCondition(ComparisonOperator.EQUAL, opts.Eq));
  }

  if (opts.NE) {
    whereConditions.push(...marshalWhereCondition(ComparisonOperator.NOT_EQUAL, opts.NE));
  }

  if (opts.LT) {
    whereConditions.push(...marshalWhereCondition(ComparisonOperator.LESS_THAN, opts.LT));
  }

  if (opts.GT) {
    whereConditions.push(...marshalWhereCondition(ComparisonOperator.GREATER_THAN, opts.GT));
  }

  if (opts.LTE) {
    whereConditions.push(...marshalWhereCondition(ComparisonOperator.LESS_THAN_OR_EQUALS, opts.LTE));
  }

  if (opts.GTE) {
    whereConditions.push(...marshalWhereCondition(ComparisonOperator.GREATER_THAN_OR_EQUALS, opts.GTE));
  }

  if (opts.Like) {
    whereConditions.push(...marshalWhereCondition(ComparisonOperator.LIKE, opts.Like));
  }

  if (opts.NotLike) {
    whereConditions.push(...marshalWhereCondition(ComparisonOperator.NOT_LIKE, opts.NotLike));
  }

  if (opts.In) {
    whereConditions.push(...marshalWhereInCondition(ComparisonOperator.IN, opts.In));
  }

  if (opts.NotIn) {
    whereConditions.push(...marshalWhereInCondition(ComparisonOperator.NOT_IN, opts.NotIn));
  }

  return whereConditions;
};
