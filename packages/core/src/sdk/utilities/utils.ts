import { App, Framework, JavaScriptClientType } from "../../gen";
import { APP_MAP, CLIENT_TYPE_FRAMEWORK_MAP, FRAMEWORK_MAP } from "./constants";
import { FQDN } from "./types";

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

export const buildURL = (fqdn: FQDN): string => {
  // App
  const appName = APP_MAP[getEnumKey(App, fqdn.app)];

  const domainElements: string[] = [];

  const useGlobalDomain = fqdn.app !== App.VESPA;

  // Node Name
  if (!useGlobalDomain) {
    const nodeName = throwIfNullish(fqdn.nodeName, `Node name is required for ${appName} app`);
    domainElements.push(nodeName);
  }

  // Framework
  const framework = CLIENT_TYPE_FRAMEWORK_MAP[getEnumKey(JavaScriptClientType, fqdn.clientType)];
  const frameworkText = FRAMEWORK_MAP[getEnumKey(Framework, framework)];
  domainElements.push(frameworkText);

  // App Name
  domainElements.push(appName);

  // Hub ID
  if (!useGlobalDomain) {
    const hubId = throwIfNullish(fqdn.hubId, `Hub ID is required for ${appName} app`);
    domainElements.push(hubId);
  }

  // Domain
  const domain = throwIfNullish(fqdn.domain, `Domain is required for ${appName} app`);
  domainElements.push(domain);

  // const subdomainElements: (string | undefined)[] = [useGlobalDomain ? fqdn.nodeName : undefined, frameworkText, appName, useGlobalDomain ? fqdn.hubId : undefined];

  // const subdomain = _.compact(subdomainElements).join(".");

  // domainElements.push(..._.compact([subdomain, fqdn.domain]));

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
