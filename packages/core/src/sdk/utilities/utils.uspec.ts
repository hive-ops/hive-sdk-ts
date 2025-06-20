import { Err, err, Ok, ok } from "neverthrow";
import { App, JavaScriptClientType, } from "../../gen";
import { FQDN } from "./types";
import * as utils from "./utils";

describe("utils", () => {
  describe("toError", () => {
    it("returns the same error if input is an Error", () => {
      const error = new Error("test");
      expect(utils.toError(error)).toEqual(error);
    });

    it("wraps non-Error input in an Error", () => {
      expect(utils.toError("fail")).toBeInstanceOf(Error);
      expect(utils.toError("fail").message).toBe("fail");
    });
  });

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

  describe("resolveResult", () => {
    it("returns ok if function does not throw", () => {
      const result = utils.resolveResult(() => 42);
      expect(result.isOk()).toBe(true);
      expect((result as Ok<number, Error>).value).toBe(42);
    });
    it("returns err if function throws", () => {
      const result = utils.resolveResult(() => {
        throw "fail";
      });
      expect(result.isErr()).toBe(true);
      expect((result as Err<number, Error>).error).toBeInstanceOf(Error);
    });
  });

  describe("resolveResultAsync", () => {
    it("returns ok if promise resolves", async () => {
      const result = await utils.resolveResultAsync(async () => 42);
      expect(result.isOk()).toBe(true);
      expect((result as Ok<number, Error>).value).toBe(42);
    });
    it("returns err if promise rejects", async () => {
      const result = await utils.resolveResultAsync(async () => {
        throw "fail";
      });
      expect(result.isErr()).toBe(true);
      expect((result as Err<number, Error>).error).toBeInstanceOf(Error);
    });
  });

  describe("unwrapResult", () => {
    it("returns value if ok", () => {
      expect(utils.unwrapResult(ok(123))).toBe(123);
    });
    it("throws error if err", () => {
      expect(() => utils.unwrapResult(err(new Error("fail")))).toThrow("fail");
    });
  });

  describe("unwrapResultAsync", () => {
    it("returns value if ok", async () => {
      await expect(utils.unwrapResultAsync(Promise.resolve(ok(123)))).resolves.toBe(123);
    });
    it("throws error if err", async () => {
      await expect(utils.unwrapResultAsync(Promise.resolve(err(new Error("fail"))))).rejects.toThrow("fail");
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
      expected: string;
    }[] = [
      {
        fqdn: {
          app: App.DRONE,
          clientType: JavaScriptClientType.NODE,
          domain: "example.com",
        },
        expected: "https://grpc.drone.example.com",
      },
      {
        fqdn: {
          app: App.BEEKEEPER,
          clientType: JavaScriptClientType.WEB,
          domain: "example.com",
        },
        expected: "https://grpc-web.beekeeper.example.com",
      },
      {
        fqdn: {
          app: App.VESPA,
          clientType: JavaScriptClientType.WEB,
          nodeName: "node1",
          hubId: "hub42",
          domain: "example.com",
        },
        expected: "https://node1.grpc-web.vespa.hub42.example.com",
      },
    ];

    testCases.forEach(({ fqdn, expected }) => {
      it(`builds URL for ${JSON.stringify(fqdn)}`, () => {
        const url = utils.buildURL(fqdn);
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
