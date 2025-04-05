import _ from "lodash";
import { App, Framework } from "../../gen";
import { ClientType } from "../clients";
import { APP_MAP, FRAMEWORK_MAP } from "./constants";

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

export const getEnumKey = <T extends object>(enumType: T, value: T[keyof T]): keyof T => {
  return Object.keys(enumType)[Object.values(enumType).indexOf(value)] as keyof T;
};

const getFramework = (clientType: ClientType): string => {
  switch (clientType) {
    case "node":
      return FRAMEWORK_MAP[getEnumKey(Framework, Framework.GRPC)];
    case "deno":
      return FRAMEWORK_MAP[getEnumKey(Framework, Framework.GRPC)];
    case "web":
      return FRAMEWORK_MAP[getEnumKey(Framework, Framework.GRPC_WEB)];
    default:
      throw new Error(`Unsupported client type: ${clientType}`);
  }
};

export const buildURL = (options: { domain: string; app: App; clientType: ClientType; nodeName?: string; hub?: string; workload?: string }): string => {
  const framework = getFramework(options.clientType);

  // App
  const appName = APP_MAP[getEnumKey(App, options.app)];

  const subdomainElements = [options.nodeName, framework, appName, options.hub, options.workload];

  const subdomain = _.compact(subdomainElements).join(".");

  const domainElements = _.compact([subdomain, options.domain]);

  return `https://${domainElements.join(".")}`;
};

// export const isNodeClient = (framework: Framework): boolean => framework === Framework.GRPC;
// export const isWebClient = (framework: Framework): boolean => framework === Framework.GRPC_WEB;
