import fs from "fs";

/**
 * Searches for JSON files in a directory based on a search query.
 *
 * @param {object} search_query - The search query object.
 * @param {object} json_class - The JSON class object.
 * @param {string} name - The name of the directory to search.
 * @returns {object} - An object containing the search results.
 * @throws {TypeError} If the search query is not an object or if there's an error during file reading.
 * @throws {Error} If the search directory doesn't exist or if there's an error during file parsing.
 */
export async function searchWithQuery(search_query, json_class, name) {
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
                  const matches = keys.every(
                    (key) => jsonData[key] === search_query[key]
                  );

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
    throw new TypeError(
      `${searchDirectory} doesn't exist, the folder has either been deleted or no data has yet been saved`
    );
  }
}
