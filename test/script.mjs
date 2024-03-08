import { ArrowmentJsonDB, JsonSchema } from "../index.js";

const jsonDB = new ArrowmentJsonDB({
  data_dir: "C:/Users/techn/OneDrive/Desktop/Projects/JSON-DB/test/data",
});

const data = {
  name: String,
  Age: Number
}

const personalInfo = new JsonSchema({ schema: data, name: "PersonalInfo", json_class: jsonDB });

personalInfo.create({ name: "John", Age: 13 })