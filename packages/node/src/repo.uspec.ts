import { faker } from "@faker-js/faker";
import { ColumnType, initialize, Metadata } from "@hiveops/core";
import { BaseRepository } from "@hiveops/node";

import dotenv from "dotenv";

type UserData = {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
};

type User = UserData & Metadata;

const userColumnTypeMap = {
  firstName: ColumnType.TEXT,
  lastName: ColumnType.TEXT,
  email: ColumnType.TEXT,
  age: ColumnType.INTEGER,
};

class UserRepository extends BaseRepository<UserData, User> {
  constructor() {
    super("User", userColumnTypeMap);
  }
}

describe("repo", () => {
  beforeAll(() => {
    dotenv.config();
    initialize();
  });

  it("should be defined", () => {
    expect(true).toBe(true);
  });

  it("should insert one record into the database", async () => {
    const userRepository = new UserRepository();
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email({ firstName, lastName });

    const user = await userRepository.saveOne({
      firstName,
      lastName,
      email,
      age: faker.number.int({ min: 21, max: 45 }),
    });
    console.log(user);
    expect(user).toBeDefined();
    expect(user.firstName).toBe(firstName);
    expect(user.lastName).toBe(lastName);
    expect(user.email).toBe(email);
    expect(user.age).toBeDefined();
    expect(user.age).toBeGreaterThanOrEqual(21);
    expect(user.age).toBeLessThanOrEqual(45);
  });
});
