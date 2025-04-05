import { BeekeeperClient, CommonRepository, getAccessToken, VespaClient, VespaDatabase } from "@hiveops/core";
import { createSingletonBeekeeperClient, createSingletonVespaClient } from "./clients";

export abstract class BaseRepository<S, T extends S> extends CommonRepository<S, T> {
  getBeekeeperClient(): BeekeeperClient {
    return createSingletonBeekeeperClient(getAccessToken());
  }

  async getVespaClient(database: VespaDatabase): Promise<VespaClient> {
    return createSingletonVespaClient(getAccessToken(), database);
  }
}
