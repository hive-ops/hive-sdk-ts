import { FQDN, Framework, Service } from "../../gen";
import { buildURL, makeSingletonFunction } from "./utils";

describe("utils", () => {
  it("makeSingletonFunction should return the same instance", () => {
    const makeObject = jest.fn(() => ({}));
    const singletonFunc = makeSingletonFunction(makeObject);
    const instance1 = singletonFunc();
    const instance2 = singletonFunc();
    expect(instance1).toBe(instance2);
    expect(makeObject).toHaveBeenCalledTimes(1);
  });

  const buildURLTestCases: { fqdn: FQDN; expected: string }[] = [
    {
      fqdn: new FQDN({
        framework: Framework.GRPC,
        node: "node1",
        service: Service.DRONE,
        hub: "hub1",
        workload: "workload1",
        domain: "example.com",
      }),
      expected: "https://node1.grpc.drone.hub1.workload1.example.com",
    },
    {
      fqdn: new FQDN({
        framework: Framework.GRPC_WEB,
        service: Service.DRONE,
        domain: "hiveops.io",
      }),
      expected: "https://grpc-web.drone.hiveops.io",
    },
  ];

  buildURLTestCases.forEach(({ fqdn, expected }) => {
    it(`buildURL(${fqdn.toString()}) should return ${expected}`, () => {
      expect(buildURL(fqdn)).toBe(expected);
    });
  });
});
