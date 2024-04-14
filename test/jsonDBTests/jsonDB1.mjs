import { ArrowmentJsonDB } from "../../src/classes/ArrowmentJsonDB.js";
import { JsonSchema } from "../../src/classes/JsonSchema.js";

const jsonDB = new ArrowmentJsonDB({
  data_dir: "C:/Users/techn/OneDrive/Desktop/Projects/JSON-DB/test/data",
});

const data = {
  Name: String,
  Age: Number,
};
const testSchema = new JsonSchema({
  schema: data,
  json_class: jsonDB,
  name: "testSchema123",
});

const wait = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

const create = async () => {
  try {
    await testSchema.create({ Name: "BhargavRaj", Age: 13 });

    wait(1500).then(async () => {
      const data = await testSchema.findData({ Name: "BhargavRaj" });

      if (data) {
        console.log("Passed test `create()`");
      } else {
        console.log("Failed test `create()`", data);
      }
    });
  } catch (err) {
    console.log("Failed test `create()`:", err);
  }
};

const createMany = async () => {
  try {
    testSchema.name = "XD"; //Changing the name to avoid conflict with the old data

    await testSchema.createMany({ Name: "BhargavRaj", Age: 13 }, 2);

    wait(5500).then(async () => {
      const data = await testSchema.findAllData({ Name: "BhargavRaj" });
      if (!data) return console.log("Failed test `createMany()`");

      if (data && data.length === 2) {
        console.log("Passed test `createMany()`");
      } else {
        console.log("Failed test `createMany()`");
      }
    });
  } catch (err) {
    console.log("Failed test `createMany()`", err);
  }
};

const deleteData = async () => {
  try {
    testSchema.name = "LOL"; //Changing the name to avoid conflict with the old data

    await testSchema.create({ Name: "BhargavRaj", Age: 13 });

    wait(3500).then(async () => {
      await testSchema.delete({ Name: "BhargavRaj", Age: 13 });
      const data = await testSchema.findData({ Name: "BhargavRaj" });
      if (data) {
        console.log("Failed test `deleteData()`");
      } else {
        console.log("Passed test `deleteData()`");
      }
    });
  } catch (err) {
    console.log("Failed test `deleteData()`:", err);
  }
};

create();
deleteData();
createMany();
