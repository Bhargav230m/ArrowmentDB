# Arrowment-DB

Arrowment-DB is a simple JSON database library for Node.js projects, similar to Mongoose but with a focus on simplicity and ease of use.

## Getting Started

To start using Arrowment-DB in your project, follow these simple steps:

1. Install Arrowment-DB using npm:

   ```
   npm i arrowment-db
   ```

2. Create a new folder named `jsonDB.js` in your project directory.

3. In the `jsonDB.js` file, set up the database configuration:

   ```javascript
   // jsonDB.js

   import { ArrowmentJsonDB } from "arrowment-db";

   const jsonDB = new ArrowmentJsonDB({ data_dir: "path/to/your/data/directory" });

   export { jsonDB };
   ```

   Replace `"path/to/your/data/directory"` with the actual path to the directory where you want to store your JSON data. **IT MUST BE ABSOLUTE PATH**

4. Congratulations! You have set up your JSON database. Now you can create and manage your JSON data easily.

## Adding Custom String Generator

If you want to add a custom string generator function, you can do so by adding a `string_generator` property to the `ArrowmentJsonDB` configuration.

## Creating Schema

To define a schema for your data, follow these steps:

1. Create a new directory named `schema` in your project directory.

2. In the `schema` directory, create a new file (e.g., `myschema.js`).

3. In the `myschema.js` file, define your schema using the `Schema` class:

   ```javascript
   // myschema.js

   import { jsonDB } from "../jsonDB";
   import { Schema } from "arrowment-db";

   const data = {
       Name: String,
       Age: Number
   };

   const info = new Schema({ schema: data, json_class: jsonDB, name: "Info" });
   ```

   Make sure to replace `"../jsonDB"` with the actual path to your `jsonDB.js` file.

   In this example, we define a schema with two fields: `Name` (string) and `Age` (number). The schema is associated with the `Info` collection in the database.

## Managing Data

Once you have set up your schema, you can start managing your data. Here's how:

### Creating Data

To create data, simply import the schema and use the `create` method:

```javascript
import { info } from "./schema/mySchema.js";

info.create({
    Name: "John",
    Age: 13
});
```

### Deleting Data

To delete data, specify the query and use the `delete` method:

```javascript
import { info } from "./schema/mySchema.js";

info.delete({ Age: 13 });
```

To delete multiple records matching a query, use the `deleteAll` method:

```javascript
info.deleteAll({ Age: 13 });
```

### Finding Data

To find data, use the `find` method:

```javascript
const data = await info.find({ Age: 13 });
```

To find all records matching a query, use the `findAll` method:

```javascript
const data = await info.findAll({ Age: 13 });
```

### Saving Data

To save data, use the `save` method:

```javascript
const result = await info.find({ Age: 13 });
const data = result.jsonFiles;

data.Name = "The Rock";

await info.save(data, { Name: "John" });
```

To update all records matching a query, use the `updateAll` method:

```javascript
const result = await info.find({ Age: 13 });
const data = result.jsonFiles;

data.Name = "The Rock";

await info.updateAll(data, { Name: "John" });
```

## Notes

- Only `find` and `findAll` methods return something.
- `find`, `save`, and `delete` methods operate on the first index of files in an array.
- `find`, `findAll`, `save`, and `delete` methods return promises.
- `find` and `findAll` functions return the filePath and fileData, `console.log` it for more information
- Never add `ID` in the schema as we already create a id property which stores id of the file (randomString)

And there we go! You now have a functioning JSON database using Arrowment-DB in your project. Enjoy managing your data effortlessly!