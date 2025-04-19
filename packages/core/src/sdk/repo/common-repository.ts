import { OutRecord, OutRecords, Record, RecordItem, Records, VespaDatabase, VespaDatabaseStack } from "../../gen";
import { BeekeeperClient, VespaClient } from "../clients";
import { fromProtoOutRecord, fromProtoOutRecords } from "./data-record";
import { convertFindOptionsToWhereConditions, FindManyOptions, FindOneOptions, getLimit, getOffset } from "./find-options";
import { fromT } from "./fromT";
import { getStackHRN } from "./globals";
import { ColumnTypeMap, Metadata, ValueType } from "./types";

export abstract class CommonRepository<S, T extends Metadata & S> {
  // TODO: make the attributes private
  constructor(private readonly tableName: string, public columnTypeMap: ColumnTypeMap) {}

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

    return response.records ? this.unmarshalFunc(response.records) : [];
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
    const records = this.marshalFunc(objs);

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
    const recordData = this.marshalOneFunc(obj);

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

    return this.unmarshalOneFunc(record);
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
    const record = this.marshalOneFunc(obj);

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
    const res = await this.getBeekeeperClient().getVespaDatabaseStack({
      hrn: getStackHRN(),
    });
    return res.stack!;
  }
  async getVespaDatabase(): Promise<VespaDatabase> {
    const stack = await this.getVespaDatabaseStack();
    return stack.databases[0];
  }

  unmarshalFunc(records: OutRecords): T[] {
    const recordRows = fromProtoOutRecords(records, this.columnTypeMap);

    return recordRows.map((recordRow) => {
      const obj: { [key: string]: ValueType } = {};
      for (const [key, value] of Object.entries(recordRow)) {
        obj[key] = value.value;
      }
      return obj as T;
    });
  }

  marshalFunc(objs: S[]): Records {
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
    return new Records({
      columnNames,
      items: recordItems,
    });
  }

  unmarshalOneFunc(record: OutRecord): T {
    const recordRow = fromProtoOutRecord(record, this.columnTypeMap);

    const obj: { [key: string]: ValueType } = {};
    for (const [key, value] of Object.entries(recordRow)) {
      obj[key] = value.value;
    }
    return obj as T;
  }

  private marshalOneFunc(data: S): Record {
    const records = this.marshalFunc([data]);

    const items = records.items;
    const item: RecordItem | undefined = items.length === 0 ? undefined : items[0];

    return new Record({
      columnNames: records.columnNames,
      item: item,
    });
  }
}
