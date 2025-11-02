import { ColumnType, DatabaseSchema, VespaDatabase, VespaDatabaseStack } from "../../gen";
import { BeekeeperClient, createBeekeeperClient, createSingletonVespaClient, VespaClient } from "../clients";
import { VESPA_COLUMN_SUFFIXES } from "../utilities";
import { convertFindOptionsToWhereConditions, FindManyOptions, FindOneOptions, getLimit, getOffset } from "./find-options";
import { databaseStack, getStackHRI, setDatabaseStack } from "./globals";
import { marshalRecord, unmarshalRecord } from "./marshalling";
import { ColumnTypeMap, Metadata } from "./types";

export abstract class BaseRepository<S, T extends Metadata & S> {
  private beekeeperClient: BeekeeperClient | undefined;
  private vespaClient: VespaClient | undefined;

  // TODO: make the attributes private
  constructor(private readonly tableName: string) {}

  public async findMany(opts: FindManyOptions<T>): Promise<T[]> {
    const database = await this.getVespaDatabase();
    const vespaClient = await this.getVespaClient(database);
    const response = await vespaClient.getRecords({
      hri: database.hri,
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
      hri: database.hri,
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
    const res = await vespaClient.insertRecords({
      hri: database.hri,
      tableName: this.tableName,
      records: [recordData],
      returnInserted: true,
    });

    if (res.insertedRecords.length === 0) {
      throw new Error("Failed to insert record");
    }
    const record = res.insertedRecords[0];

    return unmarshalRecord(record, columnTypeMap);
  }

  public async deleteWhere(opts: FindManyOptions<T>): Promise<void> {
    const database = await this.getVespaDatabase();
    const vespaClient = await this.getVespaClient(database);
    await vespaClient.deleteRecords({
      hri: database.hri,
      tableName: this.tableName,
      whereConditions: convertFindOptionsToWhereConditions(opts),
    });
  }

  public async countWhere(opts: FindManyOptions<T>): Promise<number> {
    const database = await this.getVespaDatabase();
    const vespaClient = await this.getVespaClient(database);
    const response = await vespaClient.countRecords({
      hri: database.hri,
      tableName: this.tableName,
      whereConditions: convertFindOptionsToWhereConditions(opts),
    });
    return Number(response.count);
  }

  public async exists(opts: FindManyOptions<T>): Promise<boolean> {
    const database = await this.getVespaDatabase();
    const vespaClient = await this.getVespaClient(database);
    const response = await vespaClient.recordExists({
      hri: database.hri,
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
      hri: database.hri,
      tableName: this.tableName,
      whereConditions: convertFindOptionsToWhereConditions(opts),
      record,
    });
  }

  private getBeekeeperClient(): BeekeeperClient {
    if (!this.beekeeperClient) {
      this.beekeeperClient = createBeekeeperClient();
    }
    return this.beekeeperClient;
  }

  private getVespaClient(database: VespaDatabase): VespaClient {
    if (!this.vespaClient) {
      this.vespaClient = createSingletonVespaClient({ hubId: database.node?.hubId!, nodeName: database.node?.name! });
    }
    return this.vespaClient;
  }

  async getVespaDatabaseStack(): Promise<VespaDatabaseStack> {
    if (!databaseStack) {
      const res = await this.getBeekeeperClient().getVespaDatabaseStack({
        hri: getStackHRI(),
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
