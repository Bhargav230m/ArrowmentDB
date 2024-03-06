import { schemaCreate } from "./functions/schemaCreate.js";
import { schemaDelete } from "./functions/schemaDelete.js";
import { schemaFind } from "./functions/schemaFind.js";
import { schemaSave } from "./functions/schemaUpdate.js";

/**
 * Represents a schema for validating and manipulating JSON objects.
 */
export class Schema {
  /**
   * Creates a new Schema instance.
   * @param {Object} options - The options used to create the Schema instance.
   * @param {Object} options.schema - The schema used to validate the data.
   * @param {String} options.name - The name of the Schema.
   * @param {Class} options.json_class - The class of the JSON object to create.
   */
  constructor({ schema, name, json_class }) {
    /**
     * The schema used to validate the data.
     * @type {Object}
     */
    this.schema = schema;

    /**
     * The name of the Schema.
     * @type {String}
     */
    this.name = name;

    /**
     * The class of the JSON object to create.
     * @type {Class}
     */
    this.json_class = json_class;
  }

  /**
   * Creates an instance of a JSON object based on the given data and schema.
   * @param {Object} data - The data to create the JSON object.
   * @throws {Error} If an error occurs during creation.
   */
  create(data) {
    try {
      return schemaCreate(data, this.schema, this.json_class, this.name);
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Deletes a JSON object based on the given search query.
   * @param {Object} search_query - The search query used to delete the JSON object.
   * @throws {Error} If an error occurs during deletion.
   */
  async delete(search_query) {
    try {
      await schemaDelete(search_query, this.json_class, this.name, false);
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Deletes all JSON objects matching the given search query.
   * @param {Object} search_query - The search query used to delete the JSON objects.
   * @throws {Error} If an error occurs during deletion.
   */
  async deleteAll(search_query) {
    try {
      await schemaDelete(search_query, this.json_class, this.name, true);
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Finds JSON objects based on the given search query.
   * @param {Object} search_query - The search query used to find the JSON objects.
   * @returns {Object} The search results.
   * @property {Array} jsonFilesArray - An array containing the JSON files found.
   * @property {Array} pathArray - An array containing the paths of the JSON files found.
   * @throws {Error} If an error occurs during search.
   */
  async find(search_query) {
    try {
      return await schemaFind(search_query, this.json_class, this.name, false);
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Finds all JSON objects based on the given search query.
   * @param {Object} search_query - The search query used to find the JSON objects.
   * @returns {Object} The search results.
   * @property {Array} jsonFilesArray - An array containing the JSON files found.
   * @property {Array} pathArray - An array containing the paths of the JSON files found.
   * @throws {Error} If an error occurs during search.
   */
  async findAll(search_query) {
    try {
      return await schemaFind(search_query, this.json_class, this.name, true);
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Saves new data to existing JSON objects based on a search query.
   * @param {Object} data - The new data to be saved.
   * @param {Object} query - The search query used to identify the JSON objects to be updated.
   * @throws {Error} If an error occurs during saving.
   */
  async save(data, query) {
    try {
      return await schemaSave(data, query, this.json_class, this.name, false);
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Updates all existing JSON objects matching the given search query with new data.
   * @param {Object} data - The new data to be saved.
   * @param {Object} query - The search query used to identify the JSON objects to be updated.
   * @throws {Error} If an error occurs during updating.
   */
  async updateAll(data, query) {
    try {
      return await schemaSave(data, query, this.json_class, this.name, true);
    } catch (error) {
      throw new Error(error);
    }
  }
}
