import _ from "lodash";
import { App, Environment, FQDN } from "../../gen";
import { APP_BASE_PORT_MAP, APP_MAP, CLIENT_TYPE_FRAMEWORK_MAP, ENVIRONMENT_MAP } from "./constants";
import { ClientType, Protocol } from "./types";

export const boundedInt = (value: number, min: number, max: number): number => {
  if (value < min) {
    return min;
  } else if (value > max) {
    return max;
  } else {
    return value;
  }
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

export const throwIfNullish = <T>(value: T | undefined, message: string): T => {
  if (!value) {
    throw new Error(message);
  }
  return value;
};
export const throwIfNullishAsync = async <T>(promise: Promise<T | undefined>, message: string): Promise<T> => {
  const value = await promise;
  return throwIfNullish(value, message);
};

export const getEnumKey = <T extends object>(enumType: T, value: T[keyof T]): keyof T => {
  return Object.keys(enumType)[Object.values(enumType).indexOf(value)] as keyof T;
};

export const vespaColumnPrefix = "_vespa_";
export const VESPA_COLUMN_SUFFIXES = ["id", "partition"]; // "createdAt", "updatedAt", "deletedAt"];

export const isVespaColumn = (key: string): boolean => key.startsWith(vespaColumnPrefix);
export const getVespaColumnName = (key: string): string => {
  return key.replace(vespaColumnPrefix, "");
};

const DOMAIN = "hiveops.io";

export const getEnv = (): Environment => {
  const envStr =
    process.env.HIVE_ENV || // Default - Node.js, Angular, Parcel
    process.env.NEXT_PUBLIC_HIVE_ENV || // Next.js
    process.env.REACT_APP_HIVE_ENV || // React
    process.env.VUE_APP_HIVE_ENV || // Vue
    process.env.PUBLIC_HIVE_ENV || // SvelteKit
    process.env.NUXT_PUBLIC_HIVE_ENV || // Nuxt.js
    process.env.VITE_HIVE_ENV || // Vite
    "";

  const envEntry = Object.entries(ENVIRONMENT_MAP).find(([, value]) => value === envStr);

  if (!envEntry || !(Object.keys(Environment) as string[]).includes(envEntry[0])) {
    return Environment.PROD;
  } else {
    return Environment[envEntry[0] as keyof Environment];
  }
};

export const getDomain = (): string => {
  return (
    process.env.HIVE_DOMAIN || // Default - Node.js, Angular, Parcel
    process.env.NEXT_PUBLIC_HIVE_DOMAIN || // Next.js
    process.env.REACT_APP_HIVE_DOMAIN || // React
    process.env.VUE_APP_HIVE_DOMAIN || // Vue
    process.env.PUBLIC_HIVE_DOMAIN || // SvelteKit
    process.env.NUXT_PUBLIC_HIVE_DOMAIN || // Nuxt.js
    process.env.VITE_HIVE_DOMAIN || // Vite
    DOMAIN // Fallback to default domain
  );
};

export const isDevEnv = (environment: Environment): boolean => environment === Environment.DEV;
export const isProdEnv = (environment: Environment): boolean => environment === Environment.PROD;

export const getProtocol = (environment: Environment): Protocol => {
  return isDevEnv(environment) ? "http" : "https";
};

export const buildURL = (fqdn: FQDN, clientType: ClientType): string => {
  // Port
  const basePort = APP_BASE_PORT_MAP[getEnumKey(App, fqdn.app)];

  // TCP Protocol
  const protocol = getProtocol(fqdn.environment);

  if (isDevEnv(fqdn.environment)) {
    return `${protocol}://localhost:${basePort + 1}`;
  }

  // Environment
  let environment = "";
  if (!([Environment.UNSPECIFIED, Environment.PROD] as Environment[]).includes(fqdn.environment)) {
    environment = ENVIRONMENT_MAP[getEnumKey(Environment, fqdn.environment)];
  }

  // App
  const appName = APP_MAP[getEnumKey(App, fqdn.app)];

  // Framework
  const frameworkText = CLIENT_TYPE_FRAMEWORK_MAP[clientType];

  const domainElements: string[] = [fqdn.nodeName, frameworkText, appName, environment, fqdn.hubId, fqdn.domain];

  return `${protocol}://${_.compact(domainElements).join(".")}`;
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
