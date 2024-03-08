import fs from "fs";
import { findClosestString } from "../findClosestString.js";

/**
 * Searches for JSON files in a directory based on a search query.
 *
 * @param {object} search_query - The search query object.
 * @param {object} json_class - The JSON class object.
 * @param {string} name - The name of the directory to search.
 * @returns {object} - An object containing the search results.
 * @throws {TypeError} If the search query is not an object or if there's an error during file reading.
 */
export async function searchWithQuery(
  search_query,
  json_class,
  name,
  approximateSearch
) {
  /**
   * @typedef {Object} json_class
   * @property {string} save_folder - The directory where the JSON files are stored.
   * @property {Function} getRandomString - A function to generate a random string.
   */

  if (typeof search_query !== "object") {
    throw new TypeError(
      `Search Query must be an object, and not an ${typeof search_query}`
    );
  }

  let emptyArray = [];
  let pathArray = [];
  const searchDirectory = `${json_class.save_folder}/${name}`;

  if (fs.existsSync(searchDirectory)) {
    const files = await fs.promises.readdir(searchDirectory);

    await Promise.all(
      files.map(async (file) => {
        if (file.endsWith(".json")) {
          const filePath = `${searchDirectory}/${file}`;
          const fileData = await fs.promises.readFile(filePath);
          try {
            let jsonData = JSON.parse(fileData);

            for (const key in search_query) {
              if (search_query.hasOwnProperty(key)) {
                if (!(key in search_query)) {
                  throw new TypeError(
                    `Search Query '${search_query}' does not exist in ${filePath}`
                  );
                } else {
                  const keys = Object.keys(search_query);
                  let matches;

                  if (approximateSearch) {
                    const closest = findClosestString(
                      search_query[key],
                      jsonData[key]
                    );

                    if (closest.score > 0.45) matches = true;
                    else matches = false;
                  } else {
                    matches = keys.every(
                      (key) => jsonData[key] === search_query[key]
                    );
                  }

                  if (matches) {
                    const isDuplicate = emptyArray.some(
                      (existingData) =>
                        JSON.stringify(existingData) ===
                        JSON.stringify(jsonData)
                    );

                    if (!isDuplicate) {
                      emptyArray.push(jsonData);
                      pathArray.push(filePath);
                    }
                  } else {
                    return null;
                  }
                }
              }
            }
          } catch (err) {
            throw new Error(err);
          }
        }
      })
    );

    return { jsonFilesArray: emptyArray, pathArray: pathArray };
  } else {
    return { jsonFilesArray: emptyArray, pathArray: pathArray };
  }
}
