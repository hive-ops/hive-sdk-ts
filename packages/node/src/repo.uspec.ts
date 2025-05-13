import { faker } from "@faker-js/faker";
import { ColumnType, Metadata, vespaInit } from "@hiveops/core";
import { BaseRepository } from "@hiveops/node";

import dotenv from "dotenv";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

export type Image = {
  alt: string;
  height: number;
  url: string;
  width: number;
};

export type Person = {
  age: number;
  firstName: string;
  lastName: string;
};

export type UserData = Person & {
  email: string;
  isActive: boolean;
  lastLogin: string;
  profileImage: Image;
  role: UserRole;
};

export type User = Metadata & UserData;

export class UserRepository extends BaseRepository<UserData, User> {
  constructor() {
    super("User", {
      age: ColumnType.INTEGER,
      email: ColumnType.TEXT,
      firstName: ColumnType.TEXT,
      isActive: ColumnType.BOOLEAN,
      lastLogin: ColumnType.TEXT,
      lastName: ColumnType.TEXT,
      profileImage: ColumnType.TEXT,
      role: ColumnType.TEXT,
    });
  }
}

describe("repo", () => {
  beforeAll(() => {
    dotenv.config();
    vespaInit();
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
      isActive: faker.datatype.boolean(),
      lastLogin: faker.date.past().toISOString(),
      profileImage: {
        url: faker.image.avatar(),
        width: faker.number.int({ min: 100, max: 500 }),
        height: faker.number.int({ min: 100, max: 500 }),
        alt: faker.lorem.words(3),
      },
      role: UserRole.ADMIN,
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
