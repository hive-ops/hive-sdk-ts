import _ from "lodash";
import { err, Result as NeverThrowResult, ok, ResultAsync } from "neverthrow";
import { App, Framework } from "../../gen";
import {} from "../clients";
import { APP_MAP, CLIENT_TYPE_FRAMEWORK_MAP, FRAMEWORK_MAP } from "./constants";
import { FQDN } from "./types";

export const toError = (error: any): Error => {
  return err instanceof Error ? err : new Error(String(error));
};
export type Result<T> = NeverThrowResult<T, Error>;
export type PromiseResult<T> = Promise<Result<T>>;

export const boundedInt = (value: number, min: number, max: number): number => {
  if (value < min) {
    return min;
  } else if (value > max) {
    return max;
  } else {
    return value;
  }
};

export const resolveResult = <T>(func: () => T): Result<T> => {
  try {
    return ok(func());
  } catch (error) {
    return err(toError(error));
  }
};

export const resolveResultAsync = async <T>(func: () => Promise<T>): PromiseResult<T> => {
  return ResultAsync.fromPromise(func(), (error) => toError(error));
};

export const unwrapResult = <T>(result: Result<T>): T => {
  if (result.isErr()) {
    throw result.error;
  }
  return result.value;
};

export const unwrapResultAsync = async <T>(result: PromiseResult<T>): Promise<T> => {
  const unwrapped = await result;
  return unwrapResult(unwrapped);
};

type SingletonFactory<S, T> = (arg: S) => T;

export function makeSingletonFactory<S, T>(factory: SingletonFactory<S, T>): SingletonFactory<S, T> {
  const instances = new Map<string, T>();
  return (arg: S) => {
    const key = JSON.stringify(arg);
    let instance = instances.get(key);

    if (!instance) {
      instance = factory(arg);
      instances.set(key, instance);
    }
    return instance;
  };
}

export function makeSingletonFunction<T>(makeObject: () => T): () => T {
  let singleton: T;
  return () => {
    if (!singleton) {
      singleton = makeObject();
    }
    return singleton;
  };
}

export const getEnumKey = <T extends object>(enumType: T, value: T[keyof T]): keyof T => {
  return Object.keys(enumType)[Object.values(enumType).indexOf(value)] as keyof T;
};

export const isVespaColumn = (key: string): boolean => key.startsWith("_vespa_");
export const getVespaColumnName = (key: string): string => key.replace("_vespa_", "");

export const buildURL = (fqdn: FQDN): string => {
  // App
  const appName = APP_MAP[getEnumKey(App, fqdn.app)];

  // Framework
  const framework = CLIENT_TYPE_FRAMEWORK_MAP[fqdn.clientType];
  const frameworkText = FRAMEWORK_MAP[getEnumKey(Framework, framework)];

  const subdomainElements: (string | undefined)[] = [fqdn.nodeName, frameworkText, appName, fqdn.hubId];

  const subdomain = _.compact(subdomainElements).join(".");

  const domainElements = _.compact([subdomain, fqdn.domain]);

  return `https://${domainElements.join(".")}`;
};

// export const isNodeClient = (framework: Framework): boolean => framework === Framework.GRPC;
// export const isWebClient = (framework: Framework): boolean => framework === Framework.GRPC_WEB;

export const getEnvString = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not set`);
  }
  return value;
};
