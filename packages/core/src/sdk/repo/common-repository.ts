import { err, ok, Result } from "neverthrow";
import { OutRecords, Record, RecordItem, Records, VespaDatabase, VespaDatabaseStack } from "../../gen";
import { BeekeeperClient, VespaClient } from "../clients";
import { PromiseResult, resolveResultAsync, unwrapResultAsync } from "../utilities/utils";
import { fromProtoOutRecords } from "./data-record";
import { convertFindOptionsToWhereConditions, FindManyOptions, FindOneOptions, getLimit, getOffset } from "./find-options";
import { fromT } from "./fromT";
import { getStackHRN } from "./globals";
import { ColumnTypeMap, ValueType } from "./types";

export abstract class CommonRepository<S, T extends S> {
  // TODO: make the attributes private
  constructor(private readonly tableName: string, public columnTypeMap: ColumnTypeMap) {}

  public async findMany(opts: FindManyOptions<T>): PromiseResult<T[]> {
    const result = await resolveResultAsync(async () => {
      const database = await this.getVespaDatabase();
      const vespaClient = await this.getVespaClient(database);
      const response = await vespaClient.getRecords({
        databaseHrn: database.hrn,
        tableName: this.tableName,
        whereConditions: convertFindOptionsToWhereConditions(opts),
        offset: getOffset(opts.Offset),
        limit: getLimit(opts.Limit),
      });

      return response.records ? this.unmarshalFunc(response.records) : ok([]);
    });

    if (result.isErr()) {
      return err(result.error);
    }

    return result.value;
  }

  public async FindManyOrThrow(opts: FindManyOptions<T>): Promise<T[]> {
    return unwrapResultAsync(this.findMany(opts));
  }

  public async findOne(opts: FindOneOptions<T>): PromiseResult<T | undefined> {
    const result = await this.findMany({
      ...opts,
      Limit: 1,
    });

    if (result.isErr()) {
      return err(result.error);
    }

    const data = result.value;

    return ok(!!data && data.length > 0 ? data[0] : undefined);
  }

  public async findOneOrThrow(opts: FindOneOptions<T>): Promise<T | undefined> {
    return unwrapResultAsync(this.findOne(opts));
  }

  public async saveMany(objs: S[]): PromiseResult<string[]> {
    const recordsResult = this.marshalFunc(objs);
    if (recordsResult.isErr()) {
      return err(recordsResult.error);
    }

    return resolveResultAsync(async () => {
      const database = await this.getVespaDatabase();
      const vespaClient = await this.getVespaClient(database);
      const res = await vespaClient.insertRecords({
        databaseHrn: database.hrn,
        tableName: this.tableName,
        records: recordsResult.value,
      });
      return res.insertedIds;
    });
  }

  public async saveManyOrThrow(objs: S[]): Promise<string[]> {
    return unwrapResultAsync(this.saveMany(objs));
  }

  public async saveOne(obj: S): PromiseResult<string[]> {
    return this.saveMany([obj]);
  }

  public async saveOneOrThrow(obj: S): Promise<string[]> {
    return unwrapResultAsync(this.saveOne(obj));
  }

  public async deleteWhere(opts: FindManyOptions<T>): PromiseResult<void> {
    return resolveResultAsync(async () => {
      const database = await this.getVespaDatabase();
      const vespaClient = await this.getVespaClient(database);
      await vespaClient.deleteRecords({
        databaseHrn: database.hrn,
        tableName: this.tableName,
        whereConditions: convertFindOptionsToWhereConditions(opts),
      });
    });
  }

  public async deleteWhereOrThrow(opts: FindManyOptions<T>): Promise<void> {
    return unwrapResultAsync(this.deleteWhere(opts));
  }

  public async countWhere(opts: FindManyOptions<T>): PromiseResult<number> {
    return resolveResultAsync(async () => {
      const database = await this.getVespaDatabase();
      const vespaClient = await this.getVespaClient(database);
      const response = await vespaClient.countRecords({
        databaseHrn: database.hrn,
        tableName: this.tableName,
        whereConditions: convertFindOptionsToWhereConditions(opts),
      });
      return Number(response.count);
    });
  }

  public async countWhereOrThrow(opts: FindManyOptions<T>): Promise<number> {
    return unwrapResultAsync(this.countWhere(opts));
  }

  public async exists(opts: FindManyOptions<T>): PromiseResult<boolean> {
    return resolveResultAsync(async () => {
      const database = await this.getVespaDatabase();
      const vespaClient = await this.getVespaClient(database);
      const response = await vespaClient.exists({
        databaseHrn: database.hrn,
        tableName: this.tableName,
        whereConditions: convertFindOptionsToWhereConditions(opts),
      });
      return response.exists;
    });
  }

  public async existsOrThrow(opts: FindManyOptions<T>): Promise<boolean> {
    return unwrapResultAsync(this.exists(opts));
  }

  public async updateWhere(obj: S, opts: FindManyOptions<T>): PromiseResult<void> {
    const recordResult = this.marshalOneFunc(obj);
    if (recordResult.isErr()) {
      return err(recordResult.error);
    }
    return resolveResultAsync(async () => {
      const database = await this.getVespaDatabase();
      const vespaClient = await this.getVespaClient(database);
      const _response = await vespaClient.updateRecords({
        databaseHrn: database.hrn,
        tableName: this.tableName,
        whereConditions: convertFindOptionsToWhereConditions(opts),
        record: recordResult.value,
      });
    });
  }

  public async updateWhereOrThrow(obj: S, opts: FindManyOptions<T>): Promise<void> {
    return unwrapResultAsync(this.updateWhere(obj, opts));
  }

  abstract getBeekeeperClient(): BeekeeperClient;
  abstract getVespaClient(database: VespaDatabase): Promise<VespaClient>;

  async getVespaDatabaseStack(): Promise<VespaDatabaseStack> {
    const res = await this.getBeekeeperClient().getVespaDatabaseStack({
      hrn: getStackHRN(),
    });
    return res.stack!;
  }
  async getVespaDatabase(): Promise<VespaDatabase> {
    const stack = await this.getVespaDatabaseStack();
    return stack.databases[0];
  }

  unmarshalFunc(records: OutRecords): Result<T[], Error> {
    const recordRowsResult = fromProtoOutRecords(records, this.columnTypeMap);

    if (recordRowsResult.isErr()) {
      return err(recordRowsResult.error);
    }

    const objs = recordRowsResult.value.map((recordRow) => {
      const obj: { [key: string]: ValueType } = {};
      for (const [key, value] of Object.entries(recordRow)) {
        obj[key] = value.value;
      }
      return obj as T;
    });

    // const recordsData: { [key: string]: Type[] } = {};

    // for (const [key, values] of Object.entries(records.records)) {
    //   for (const value of values.values) {
    //     const dataValues = recordsData[key] || [];
    //     if (isVespaColumn(key)) {
    //       dataValues.push(value as string);
    //     } else {
    //       const result = toT(value, this.typeDef[key]);
    //       if (result.isErr()) {
    //         return err(result.error);
    //       }
    //       dataValues.push(result.value);
    //     }
    //     recordsData[key] = dataValues;
    //   }
    // }

    // const recordsDataValues = Object.values(recordsData);
    // if (recordsDataValues.length === 0) {
    //   return ok([]);
    // }
    // const lengths = recordsDataValues.map((values) => values.length);
    // if (lengths.some((length) => length !== lengths[0])) {
    //   return err(new Error("lengths of slices are not equal: " + lengths));
    // }

    // const objs: T[] = [];
    // for (let i = 0; i < recordsDataValues.length; i++) {
    //   const obj: { [key: string]: Type } = {};
    //   for (const [key, values] of Object.entries(recordsData)) {
    //     obj[key] = values[i];
    //   }
    //   objs.push(obj as T);
    // }

    return ok(objs);
  }

  marshalFunc(objs: S[]): Result<Records, Error> {
    const columnNames = Object.keys(this.columnTypeMap);
    const recordItems: RecordItem[] = objs.map(
      (obj) =>
        new RecordItem({
          values: columnNames.map((columnName) => {
            const dataType = this.columnTypeMap[columnName as keyof typeof this.columnTypeMap];
            return fromT(obj[columnName], dataType);
          }),
        }),
    );
    return ok(
      new Records({
        columnNames,
        items: recordItems,
      }),
    );
  }

  private marshalOneFunc(data: S): Result<Record, Error> {
    const recordsResult = this.marshalFunc([data]);
    if (recordsResult.isErr()) {
      return err(recordsResult.error);
    }
    const items = recordsResult.value.items;
    const item: RecordItem | undefined = items.length === 0 ? undefined : items[0];

    const record: Record = new Record({
      columnNames: recordsResult.value.columnNames,
      item: item,
    });
    return ok(record);
  }
}
