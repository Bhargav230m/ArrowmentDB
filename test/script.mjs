import { PersonaDB, Schema } from "personadb"

const jsonDB = new PersonaDB({
  data_dir: "C:/Users/techn/OneDrive/Desktop/Projects/JSON-DB/data",
});

const data = {
    name: String
}

const personalInfo = new Schema({ schema: data, name: "PersonalInfo", json_class: jsonDB });

personalInfo.create({
    name: "Test"
})