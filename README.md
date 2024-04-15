# Arrowment-DB

# CommonJS conversion by 1blckhrt

# Original code by Bhargav230m

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

   const { ArrowmentJsonDB } = require("arrowment-db");

   const jsonDB = new ArrowmentJsonDB({
     data_dir: "path/to/your/data/directory",
   });

   module.exports = { jsonDB };
   ```

   Replace `"path/to/your/data/directory"` with the actual path to the directory where you want to store your JSON data. **IT MUST BE ABSOLUTE PATH**

4. Congratulations! You have set up your JSON database. Now you can create and manage your JSON data easily.

## Adding Custom String Generator

If you want to add a custom string generator function, you can do so by adding a `string_generator` property to the `ArrowmentJsonDB` configuration.

## Creating Schema

To define a schema for your data, follow these steps:

1. Create a new directory named `schema` in your project directory.

2. In the `schema` directory, create a new file (e.g., `myschema.js`).

3. In the `myschema.js` file, define your schema using the `JsonSchema` class:

   ```javascript
   // myschema.js

   const { jsonDB } = require("../jsonDB");
   const { JsonSchema } = require("arrowment-db");

   const data = {
     Name: String,
     Age: Number,
   };

   const info = new JsonSchema({
     schema: data,
     json_class: jsonDB,
     name: "Info",
   });
   ```

   Make sure to replace `"../jsonDB"` with the actual path to your `jsonDB.js` file.

   In this example, we define a schema with two fields: `Name` (string) and `Age` (number). The schema is associated with the `Info` collection in the database.

## Managing Data

Once you have set up your schema, you can start managing your data. Here's how:

### Creating Data

To create data, simply const the schema and use the `create` method:

```javascript
const { info } = require("./schema/mySchema.js");

info.create({
  Name: "John",
  Age: 13,
});
```

### Deleting Data

To delete data, specify the query and use the `delete` method:

```javascript
const { info } = require("./schema/mySchema.js");

info.delete({ Age: 13 });
```

To delete multiple records matching a query, use the `deleteAll` method:

```javascript
info.deleteAll({ Age: 13 });
```

### Finding Data

To find data, use the `findData` method:

```javascript
const data = await info.findData({ Age: 13 });
```

To find all records matching a query, use the `findAllData` method:

```javascript
const data = await info.findAllData({ Age: 13 });
```

### Saving Data

To save data, use the `save` method:

```javascript
const result = await info.findData({ Age: 13 });
const data = result;

data.Name = "The Rock";

await info.save(data, { Name: "John" });
```

To update all records matching a query, use the `updateAll` method:

```javascript
const result = await info.findData({ Age: 13 });
const data = result;

data.Name = "The Rock";

await info.updateAll(data, { Name: "John" });
```

### Finding Path

To find a path, use `findPath`:

```javascript
console.log(await personalInfo.findPath({ name: "The Rock" }));
/**
 C:/Users/techn/OneDrive/Desktop/Projects/JSON-DB/test/data/PersonalInfo/l5G0U0t2Z7t4x9u5z0q6fd3357708145db3dfbb81709888536.json
 */
```

To find all the paths, use `findAllPath`:

```javascript
console.log(await personalInfo.findAllPath({ name: "The Rock" }));
/**
[
  'C:/Users/techn/OneDrive/Desktop/Projects/JSON-DB/test/data/PersonalInfo/l5G0U0t2Z7t4x9u5z0q6fd3357708145db3dfbb81709888536.json'
]
 */
```

## Notes

CHANGES IN 1.2.0

- All methods like `findData`, `findAllData`, `save`, `updateAll`, and their fuzzy versions now return something.
- `findData`, `findAllData`, `save`, `updateAll`, `create`, and their fuzzy versions will return `null` if no data is found.
- The methods `findData` and `findAllData` now return only the data, not an object containing the path and the data.
- `findData` and `findAllData` methods return `null` if no data is found.
- Methods `findPath` and `findAllPath` have been added to the `JsonSchema` class for finding paths.
- Methods `findPath` and `findAllPath` return the file paths directly.
- `fuzzySearchData`, `fuzzySearchAllData`, `fuzzySearchPath`, `fuzzySearchAllPath`, `fuzzyDelete`, `fuzzyDeleteAll`, `fuzzySave`, `fuzzyUpdateAll` methods have been added for fuzzy searching and operations.
- Added QuickCollection, Its a map() like class but with fuzzy searching.
- Added support for searching nested object structures.

## Fuzzy Search Methods

**What is fuzzy searching?**

_Fuzzy searching is a searching method used when you don't have the exact query or only have a rough or approximate query. In such cases, instead of requiring an exact match, fuzzy searching employs algorithms like Levenshtein's algorithm to find the best match and retrieve relevant data. This approach allows for more flexible and forgiving searches, accommodating variations in spelling, typos, or slight deviations from the original query._

### Finding Data Using Fuzzy Method

To find data using the fuzzy method, use `fuzzySearchData`:

```javascript
console.log(await personalInfo.fuzzySearchData({ name: "Jo" })); //We are not sure of the actual name
/**
  {
  name: 'John',
  Age: 13,
  id: 'l5G0U0t2Z7t4x9u5z0q6fd3357708145db3dfbb81709888536'
}
 */
```

To search all the data and not just one data, use `fuzzySearchAllData`:

```javascript
console.log(await personalInfo.fuzzySearchAllData({ name: "Jo" })); //We are not sure of the actual name
/**
 [
  {
    name: 'John',
    Age: 13,
    id: 'l5G0U0t2Z7t4x9u5z0q6fd3357708145db3dfbb81709888536'
  }
]
 */
```

### Finding Path

To find the path using fuzzy search, use `fuzzySearchPath`:

```javascript
console.log(await personalInfo.fuzzySearchPath({ name: "Jo" })); //We are not sure of the actual name
/**
C:/Users/techn/OneDrive/Desktop/Projects/JSON-DB/test/data/PersonalInfo/l5G0U0t2Z7t4x9u5z0q6fd3357708145db3dfbb81709888536.json
 */
```

To find all the paths using fuzzy search, use `fuzzySearchAllPath`:

```javascript
console.log(await personalInfo.fuzzySearchAllPath({ name: "Jo" })); //We are not sure of the actual name
/**
[
  'C:/Users/techn/OneDrive/Desktop/Projects/JSON-DB/test/data/PersonalInfo/l5G0U0t2Z7t4x9u5z0q6fd3357708145db3dfbb81709888536.json'
]
 */
```

### Deleting Data

To delete the data using fuzzy search, use `fuzzyDelete`:

```javascript
await personalInfo.fuzzyDelete({ name: "Jo" }); //We are not

 sure of the actual name
```

To delete all the data using fuzzy search, use `fuzzyDeleteAll`:

```javascript
await personalInfo.fuzzyDeleteAll({ name: "Jo" }); //We are not sure of the actual name
```

### Updating Data

To update one data using fuzzy search, use `fuzzySave`:

```javascript
const s = await personalInfo.fuzzySearchData({ name: "Jo" });
s.name = "TechPowerB";

console.log(await personalInfo.fuzzySave(s, { name: "Jo" })); //We are not sure of the actual name
/**
{
  name: 'TechPowerB',
  Age: 13,
  id: 'l5G0U0t2Z7t4x9u5z0q6fd3357708145db3dfbb81709888536'
}
 */
```

To update everything using fuzzy search, use `fuzzyUpdateAll`:

```javascript
const s = await personalInfo.fuzzySearchData({ name: "Jo" });
s.name = "TechPowerB";

console.log(await personalInfo.fuzzyUpdateAll(s, { name: "Jo" })); //We are not sure of the actual name
/**
{
  name: 'TechPowerB',
  Age: 13,
  id: 'l5G0U0t2Z7t4x9u5z0q6fd3357708145db3dfbb81709888536'
}
 */
```
