import { Record } from "../../gen";
import { marshalRecord } from "./marshalling";
import { UserColumnTypeMap, UserData, UserRole } from "./test-structs";

describe("marshalling", () => {
  const tests: {
    name: string;
    obj: UserData;
    record: Record;
  }[] = [
    {
      name: "user",
      obj: {
        firstName: "John",
        lastName: "Doe",
        age: 30,
        email: "john.doe@example.com",
        role: UserRole.User,
        isActive: true,
        lastLogin: new Date("2023-01-01T12:34:56.789Z"),
        profileImage: {
          url: "https://example.com/profile.jpg",
          alt: "Profile Image",
          width: 100,
          height: 100,
        },
      },
      record: new Record({
        record: {
          firstName: { value: "John", isNil: false },
          lastName: { value: "Doe", isNil: false },
          age: { value: "30", isNil: false },
          email: { value: "john.doe@example.com", isNil: false },
          role: { value: "2", isNil: false },
          isActive: { value: "1", isNil: false },
          lastLogin: { value: "2023-01-01T12:34:56.789Z", isNil: false },
          profileImage: {
            value: '{"url":"https://example.com/profile.jpg","alt":"Profile Image","width":100,"height":100}',
            isNil: false,
          },
        },
      }),
    },
  ];

  tests.forEach(({ name, obj, record }) => {
    it(`should marshal ${name}`, () => {
      const marshalledRecord = marshalRecord(obj, UserColumnTypeMap);
      expect(marshalledRecord).toEqual(record);
    });

    // it(`should unmarshal ${name}`, () => {
    //   const unmarshalledObj = unmarshalRecord(record, UserColumnTypeMap);
    //   expect(unmarshalledObj).toEqual(obj);
    // });
  });
});
