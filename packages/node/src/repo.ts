import { BeekeeperClient, CommonRepository, Metadata, VespaClient, VespaDatabase } from "@hiveops/core";
import { createSingletonBeekeeperClient, createSingletonVespaClient } from "./clients";

export abstract class BaseRepository<S, T extends Metadata & S> extends CommonRepository<S, T> {
  getBeekeeperClient(): BeekeeperClient {
    return createSingletonBeekeeperClient();
  }

  async getVespaClient(database: VespaDatabase): Promise<VespaClient> {
    return createSingletonVespaClient(database);
  }
}
