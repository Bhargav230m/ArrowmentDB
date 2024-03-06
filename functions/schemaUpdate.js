import { searchWithQuery } from "./searchWithQuery.js";
import fs from "fs";

/**
 * Saves new data to existing JSON files based on a search query.
 * @param {Object} data - The new data to be saved.
 * @param {string} query - The search query to find the JSON files to update.
 * @param {Object} json_class - The JSON class to search within.
 * @param {string} name - The name to search for.
 * @param {boolean} all - Indicates whether to update all matching files or just the first one found.
 * @throws {TypeError} If the data is not an object.
 * @throws {Error} If no data is found with the given query or an error occurs during file update.
 */
export async function schemaSave(data, query, json_class, name, all) {
  /**
   * @typedef {Object} json_class
   * @property {string} save_folder - The directory where the JSON files are stored.
   * @property {Function} getRandomString - A function to generate a random string.
   */

  try {
    if (typeof data !== "object") {
      throw new TypeError(`Data must be an object, and not an ${typeof data}`);
    }

    const result = await searchWithQuery(query, json_class, name);

    let pathResult = result.pathArray;

    if (!pathResult.length)
      return null;

    if (!all) {
      pathResult = pathResult[0];

      await update(pathResult, data);
    } else {
      pathResult.forEach(async (path) => {
        await update(path, data);
      });
    }
  } catch (err) {
    throw new Error(err);
  }
}

/**
 * Updates the JSON file at the specified path with new data.
 * @param {string} pathResult - The path to the JSON file to be updated.
 * @param {Object} newData - The new data to be merged with existing data.
 * @throws {Error} If an error occurs during file reading, parsing, or writing.
 */
async function update(pathResult, newData) {
  fs.readFile(pathResult, "utf8", (err, data) => {
    if (err) {
      if (err) throw err;
    }

    try {
      const jsonData = JSON.parse(data);
      const keysToRemove = Object.keys(jsonData).filter((key) => key !== "id");
      const filteredData = {};
      keysToRemove.forEach((key) => {
        filteredData[key] = jsonData[key];
      });

      const lastKey = Object.keys(jsonData).find((key) => key === "id");
      const lastValue = jsonData[lastKey];
      const updatedData = { [lastKey]: lastValue };

      Object.assign(updatedData, newData);

      fs.writeFile(
        pathResult,
        JSON.stringify(Object.assign({}, filteredData, updatedData), null, 4),
        (err) => {
          if (err) throw err;
        }
      );
    } catch (error) {
      throw new Error(error);
    }
  });
}
