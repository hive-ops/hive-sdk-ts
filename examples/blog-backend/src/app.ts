import { faker } from "@faker-js/faker";
import { vespaInit } from "@hiveops/node";
import { configDotenv } from "dotenv";
import { postRepository, userRepository, UserRole } from "./vespa";

configDotenv();

const start = async () => {
  vespaInit();

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email({ firstName, lastName });

  const user = await userRepository.saveOne({
    firstName,
    lastName,
    email,
    age: faker.number.int({ min: 21, max: 45 }),
    isActive: faker.datatype.boolean(),
    lastLogin: new Date(Date.now()),
    profileImage: {
      url: faker.image.avatar(),
      width: faker.number.int({ min: 100, max: 500 }),
      height: faker.number.int({ min: 100, max: 500 }),
      alt: faker.lorem.words(3),
    },
    role: UserRole.ADMIN,
  });
  console.log("User created:");
  console.log(user);
  console.log("\n")

  if (!user) {
    console.error("User not found");
    return;
  }

  const post = await postRepository.saveOne({
    userId: user.id,
    title: faker.lorem.words(3),
    body: faker.lorem.paragraph(),
  });
  console.log("Post created:");
  console.log(post);

};

start().catch(console.error);
