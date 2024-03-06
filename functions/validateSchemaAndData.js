/**
 * Validates the provided data against the given schema.
 * @param {object} schema - The schema object specifying the expected properties and their types.
 * @param {object} data - The data object to be validated.
 * @throws {Error} If any property specified in the schema is missing in the data.
 * @throws {TypeError} If the type of any property in the data does not match the expected type specified in the schema.
 */
export function validateSchemaAndData(schema, data) {
  try {
    for (const key in schema) {
      if (schema.hasOwnProperty(key)) {
        // Check if the given data contains the current property
        if (!(key in data)) {
          throw new Error(`Property '${key}' is missing`);
        }
        // Check if the type of the given data for the current property matches the expected type
        if (typeof data[key] !== schema[key].name.toLowerCase()) {
          throw new TypeError(
            `Type of '${key}' is ${typeof data[key]}, expected ${
              schema[key].name
            }`
          );
        }
      }
    }
  } catch (err) {
    throw new Error(err);
  }
}
