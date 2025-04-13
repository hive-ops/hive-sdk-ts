
import { initialize } from "@hiveops/core";
import { CustomerData, CustomerRepository, generateRandomCustomer } from "./synthetics";
import dotenv from "dotenv";
dotenv.config();

jest.setTimeout(30000);

describe("CustomerRepository", () => {
  let customerRepo: CustomerRepository;
  let customer1: CustomerData;

  beforeAll(async () => {
    const result = await initialize();
    expect(result.isOk()).toBeTruthy();

    customerRepo = new CustomerRepository();
    customer1 = generateRandomCustomer();
  });

  it("should insert a customer", async () => {
    const aa = await customerRepo.saveOne(customer1);

    const savedCustomerResult = await customerRepo.findOne({ Eq: { id: customer1.id, firstName: customer1.firstName, email: customer1.email } });
    if (savedCustomerResult.isErr()) {
      throw savedCustomerResult.error;
    }
    const savedCustomer = savedCustomerResult.value;

    expect(customer1.email).toEqual(savedCustomer?.email);
  });
});
