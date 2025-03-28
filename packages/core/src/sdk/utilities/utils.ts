import _ from "lodash";
import { FQDN, Framework, Service } from "../../gen";
import { FRAMEWORK_MAP, SERVICE_MAP } from "./constants";

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

export type ValueOfService = Service[keyof Service];

export const getEnumKey = <T extends object>(enumType: T, value: T[keyof T]): keyof T => {
  return Object.keys(enumType)[Object.values(enumType).indexOf(value)] as keyof T;
};

export const buildURL = (fqdn: FQDN): string => {
  let framework = "";
  if (fqdn.framework !== Framework.UNSPECIFIED) {
    framework = FRAMEWORK_MAP[getEnumKey(Framework, fqdn.framework)];
  }

  const subdomainElements: string[] = [fqdn.node, framework, SERVICE_MAP[getEnumKey(Service, fqdn.service)], fqdn.hub, fqdn.workload];

  const subdomain = _.compact(subdomainElements).join(".");

  const hostElements = _.compact([subdomain, fqdn.domain]);

  return `https://${hostElements.join(".")}`;
};

export const isNodeClient = (framework: Framework): boolean => framework === Framework.GRPC;
export const isWebClient = (framework: Framework): boolean => framework === Framework.GRPC_WEB;
