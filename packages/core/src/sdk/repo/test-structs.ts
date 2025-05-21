import { faker } from "@faker-js/faker";
import { ColumnType } from "../../gen";
import { ColumnTypeMap, Metadata } from "./types";

export enum UserRole {
  Admin = 1,
  User = 2,
}

export type Image = {
  url: string;
  alt: string;
  width: number;
  height: number;
};

export type Person = {
  firstName: string;
  lastName: string;
  age: number;
};

export type UserData = Person & {
  email: string;
  role: UserRole;
  isActive: boolean;
  lastLogin: Date;
  profileImage?: Image;
};

export type User = Metadata & UserData;

export const UserColumnTypeMap: ColumnTypeMap<User> = {
  id: ColumnType.TEXT,
  partition: ColumnType.TEXT,
  age: ColumnType.INTEGER,
  email: ColumnType.TEXT,
  firstName: ColumnType.TEXT,
  isActive: ColumnType.BOOLEAN,
  lastLogin: ColumnType.TIMESTAMP,
  lastName: ColumnType.TEXT,
  profileImage: ColumnType.JSON,
  role: ColumnType.ENUM,
};

// export class UserRepository {
//   constructor() {}
// }

export function generateTestUserData(): UserData {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = `${firstName}.${lastName}@${faker.internet.domainName()}`.toLowerCase();
  return {
    firstName,
    lastName,
    age: faker.number.int({ min: 18, max: 35 }),
    email,
    role: UserRole.User,
    isActive: false,
    lastLogin: new Date(),
    profileImage: {
      url: faker.internet.url(),
      alt: faker.word.words(),
      width: faker.number.int({ min: 100, max: 1000 }),
      height: faker.number.int({ min: 100, max: 1000 }),
    },
  };
}
