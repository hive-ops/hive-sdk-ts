import { ColumnType, DatabaseSchema, VespaDatabase, VespaDatabaseStack } from "../../gen";
import { BeekeeperClient, VespaClient } from "../clients";
import { VESPA_COLUMN_SUFFIXES } from "../utilities";
import { convertFindOptionsToWhereConditions, FindManyOptions, FindOneOptions, getLimit, getOffset } from "./find-options";
import { databaseStack, getStackHRN, setDatabaseStack } from "./globals";
import { marshalRecord, unmarshalRecord } from "./marshalling";
import { ColumnTypeMap, Metadata } from "./types";

export abstract class CommonRepository<S, T extends Metadata & S> {
  // TODO: make the attributes private
  constructor(private readonly tableName: string) {}

  public async findMany(opts: FindManyOptions<T>): Promise<T[]> {
    const database = await this.getVespaDatabase();
    const vespaClient = await this.getVespaClient(database);
    const response = await vespaClient.getRecords({
      databaseHrn: database.hrn,
      tableName: this.tableName,
      whereConditions: convertFindOptionsToWhereConditions(opts),
      offset: getOffset(opts.Offset),
      limit: getLimit(opts.Limit),
    });

    const columnTypeMap = await this.getColumnTypeMap();
    return response.records.map((record) => unmarshalRecord<T>(record, columnTypeMap));
  }

  public async findOne(opts: FindOneOptions<T>): Promise<T | undefined> {
    const data = await this.findMany({
      ...opts,
      Limit: 1,
    });

    return !!data && data.length > 0 ? data[0] : undefined;
  }

  public async findOneById(id: string): Promise<T | undefined> {
    return this.findOne({
      Eq: {
        id,
      },
    });
  }

  public async saveMany(objs: S[]): Promise<string[]> {
    const columnTypeMap = await this.getColumnTypeMap();
    const records = objs.map((obj) => marshalRecord(obj, columnTypeMap));

    const database = await this.getVespaDatabase();
    const vespaClient = await this.getVespaClient(database);
    const res = await vespaClient.insertRecords({
      databaseHrn: database.hrn,
      tableName: this.tableName,
      records,
    });
    return res.insertedIds;
  }

  public async saveOne(obj: S): Promise<T> {
    const columnTypeMap = await this.getColumnTypeMap();
    const recordData = marshalRecord(obj, columnTypeMap);

    const database = await this.getVespaDatabase();
    const vespaClient = await this.getVespaClient(database);
    const res = await vespaClient.insertRecord({
      databaseHrn: database.hrn,
      tableName: this.tableName,
      record: recordData,
    });

    const record = res.record;
    if (!record) {
      throw new Error("error inserting record");
    }

    return unmarshalRecord(record, columnTypeMap);
  }

  public async deleteWhere(opts: FindManyOptions<T>): Promise<void> {
    const database = await this.getVespaDatabase();
    const vespaClient = await this.getVespaClient(database);
    await vespaClient.deleteRecords({
      databaseHrn: database.hrn,
      tableName: this.tableName,
      whereConditions: convertFindOptionsToWhereConditions(opts),
    });
  }

  public async countWhere(opts: FindManyOptions<T>): Promise<number> {
    const database = await this.getVespaDatabase();
    const vespaClient = await this.getVespaClient(database);
    const response = await vespaClient.countRecords({
      databaseHrn: database.hrn,
      tableName: this.tableName,
      whereConditions: convertFindOptionsToWhereConditions(opts),
    });
    return Number(response.count);
  }

  public async exists(opts: FindManyOptions<T>): Promise<boolean> {
    const database = await this.getVespaDatabase();
    const vespaClient = await this.getVespaClient(database);
    const response = await vespaClient.exists({
      databaseHrn: database.hrn,
      tableName: this.tableName,
      whereConditions: convertFindOptionsToWhereConditions(opts),
    });
    return response.exists;
  }

  public async updateWhere(obj: S, opts: FindManyOptions<T>): Promise<void> {
    const columnTypeMap = await this.getColumnTypeMap();
    const record = marshalRecord(obj, columnTypeMap);

    const database = await this.getVespaDatabase();
    const vespaClient = await this.getVespaClient(database);
    const _response = await vespaClient.updateRecords({
      databaseHrn: database.hrn,
      tableName: this.tableName,
      whereConditions: convertFindOptionsToWhereConditions(opts),
      record,
    });
  }

  abstract getBeekeeperClient(): BeekeeperClient;
  abstract getVespaClient(database: VespaDatabase): Promise<VespaClient>;

  async getVespaDatabaseStack(): Promise<VespaDatabaseStack> {
    if (!databaseStack) {
      const res = await this.getBeekeeperClient().getVespaDatabaseStack({
        hrn: getStackHRN(),
      });
      setDatabaseStack(res.stack!);
    }
    return databaseStack!;
  }
  async getVespaDatabase(): Promise<VespaDatabase> {
    const stack = await this.getVespaDatabaseStack();
    return stack.databases[0];
  }
  async getDatabaseSchema(): Promise<DatabaseSchema> {
    const stack = await this.getVespaDatabaseStack();
    return stack.schema!;
  }
  async getColumnTypeMap(): Promise<ColumnTypeMap<T>> {
    const schema = await this.getDatabaseSchema();

    const table = schema.tables.find((t) => t.name === this.tableName);
    if (!table) {
      throw new Error(`Table ${this.tableName} not found in schema`);
    }

    const columnTypeMap = {} as ColumnTypeMap<T>;
    for (const column of table.columns) {
      columnTypeMap[column.name] = column.type;
    }

    for (const suffix of VESPA_COLUMN_SUFFIXES) {
      columnTypeMap[suffix] = ColumnType.TEXT;
    }

    return columnTypeMap;
  }
}
