import { searchWithQuery } from "./searchWithQuery.js";

/**
 * This function searches for data using a query and returns results based on specified parameters.
 * @param {string} query - The search query.
 * @param {string} json_class - The JSON class to search in.
 * @param {string} name - The name to search for.
 * @param {boolean} all - Flag indicating whether to return all results or just the first one.
 * @returns {Object} - An object containing the search results.
 */
export async function schemaFind(query, json_class, name, all) {
  // Call the searchWithQuery function to get the search results
  const result = await searchWithQuery(query, json_class, name);

  // Extract the JSON files array and path array from the search result
  const dataResult = result.jsonFilesArray;
  const pathResult = result.pathArray;

  if(!dataResult.length || !pathResult.length) return null;

  // If 'all' parameter is false, return only the first result
  if (!all) {
    return {
      jsonFiles: dataResult[0], // Return the first JSON file
      paths: pathResult[0], // Return the first path
    };
  } else {
    // If 'all' parameter is true, return all results
    return {
      jsonFiles: dataResult, // Return all JSON files
      paths: pathResult, // Return all paths
    };
  }
}
