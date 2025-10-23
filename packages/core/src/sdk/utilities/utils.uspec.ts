import { ClientType } from "./types";
import * as utils from "./utils";
import { create } from "@bufbuild/protobuf";
import { App, BasePort, FQDN, FQDNSchema, Environment } from "../../gen";

describe("utils", () => {
  describe("boundedInt", () => {
    it("returns value if within bounds", () => {
      expect(utils.boundedInt(5, 1, 10)).toBe(5);
    });
    it("returns min if value is less than min", () => {
      expect(utils.boundedInt(0, 1, 10)).toBe(1);
    });
    it("returns max if value is greater than max", () => {
      expect(utils.boundedInt(11, 1, 10)).toBe(10);
    });
  });

  describe("makeSingletonFactory", () => {
    it("returns the same instance for the same argument", () => {
      const factory = jest.fn((x: { id: number }) => ({ ...x }));
      const singleton = utils.makeSingletonFactory(factory);
      const a = singleton({ id: 1 });
      const b = singleton({ id: 1 });
      expect(a).toBe(b);
      expect(factory).toHaveBeenCalledTimes(1);
    });
    it("returns different instances for different arguments", () => {
      const factory = jest.fn((x: { id: number }) => ({ ...x }));
      const singleton = utils.makeSingletonFactory(factory);
      const a = singleton({ id: 1 });
      const b = singleton({ id: 2 });
      expect(a).not.toBe(b);
      expect(factory).toHaveBeenCalledTimes(2);
    });
  });

  describe("makeSingletonFunction", () => {
    it("returns the same instance every time", () => {
      const factory = jest.fn(() => ({}));
      const singleton = utils.makeSingletonFunction(factory);
      const a = singleton();
      const b = singleton();
      expect(a).toBe(b);
      expect(factory).toHaveBeenCalledTimes(1);
    });
  });

  describe("getEnumKey", () => {
    enum TestEnum {
      A = "a",
      B = "b",
    }
    it("returns the key for a given value", () => {
      expect(utils.getEnumKey(TestEnum, TestEnum.A)).toBe("A");
      expect(utils.getEnumKey(TestEnum, TestEnum.B)).toBe("B");
    });
  });

  describe("vespaColumnPrefix, isVespaColumn, getVespaColumnName", () => {
    it("detects vespa columns", () => {
      expect(utils.isVespaColumn("_vespa_foo")).toBe(true);
      expect(utils.isVespaColumn("foo")).toBe(false);
    });
    it("removes vespa prefix", () => {
      expect(utils.getVespaColumnName("_vespa_foo")).toBe("foo");
    });
  });

  describe("buildURL", () => {
    const testCases: {
      fqdn: FQDN;
      clientType: ClientType;
      expected: string;
    }[] = [
      {
        fqdn: create(FQDNSchema, {
          app: App.DRONE,
          domain: "example.com",
        }),
        clientType: "node",
        expected: "https://grpc.drone.example.com",
      },
      {
        fqdn: create(FQDNSchema, {
          app: App.BEEKEEPER,
          domain: "example.com",
        }),
        clientType: "web",
        expected: "https://grpc-web.beekeeper.example.com",
      },
      {
        fqdn: create(FQDNSchema, {
          app: App.VESPA,
          nodeName: "node1",
          hubId: "hub42",
          domain: "example.com",
        }),
        clientType: "web",
        expected: "https://node1.grpc-web.vespa.hub42.example.com",
      }
    ];

    testCases.forEach(({ fqdn, clientType, expected }) => {
      it(`builds URL for ${JSON.stringify(fqdn)}`, () => {
        const url = utils.buildURL(fqdn, clientType);
        expect(url).toBe(expected);
      });
    });

    // it("builds a URL from FQDN", () => {
    //   const fqdn: FQDN = {
    //     app: App.DRONE,
    //     clientType: "web",
    //     nodeName: "node1",
    //     hubId: "hub42",
    //     domain: "example.com",
    //   };
    //   const url = utils.buildURL(fqdn);
    //   expect(url).toBe("https://node1.grpc-web.drone.hub42.example.com");
    // });
  });

  describe("getEnvString", () => {
    const OLD_ENV = process.env;
    beforeEach(() => {
      process.env = { ...OLD_ENV };
    });
    afterAll(() => {
      process.env = OLD_ENV;
    });
    it("returns the env variable if set", () => {
      process.env.TEST_ENV = "abc";
      expect(utils.getEnvString("TEST_ENV")).toBe("abc");
    });
    it("throws if env variable is not set", () => {
      delete process.env.TEST_ENV;
      expect(() => utils.getEnvString("TEST_ENV")).toThrow("Environment variable TEST_ENV is not set");
    });
  });
});
