import fs from "fs";

/**
 * Creates a JSON file with the given schema and saves it to the given schema path.
 * @param {Object} schema - The JSON schema to be saved as a JSON file.
 * @param {String} schemaPath - The path where the JSON file should be saved.
 * @param {Function} getRandomString - A function that returns a random string.
 */
export function createJson(schema, schemaPath, getRandomString) {
  /**
   * @typedef {Function} getRandomString
   * @param {Number} length - The length of the random string to be generated.
   * @returns {String} A randomly generated string of the specified length.
   */

  schema.id = getRandomString(8);

  const json_data = JSON.stringify(schema, null, 4);
  const creationPath = schemaPath + "/" + getRandomString(10) + ".json";

  // Write the JSON string to the file
  fs.writeFile(creationPath, json_data, (err) => {
    if (err) {
      console.error("Error writing JSON file:", err);
    } else {
      console.log(`JSON data has been written to ${schemaPath}`);
    }
  });
}
