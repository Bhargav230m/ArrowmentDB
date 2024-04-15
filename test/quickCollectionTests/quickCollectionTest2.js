const { expect } = require("chai");
const { QuickCollection } = require("../../src/classes/QuickCollection.js");

describe("QuickCollection", () => {
  let collection;

  // Before each test, create a new QuickCollection instance
  beforeEach(() => {
    collection = new QuickCollection();
  });

  // Test cases for the add() method
  describe("#add()", () => {
    it("should add data to the collection", () => {
      const data = { name: "John", age: 30 };
      collection.add("user1", data);
      const result = collection.find("user1");
      expect(result).to.deep.equal(data);
    });
  });

  // Test cases for the delete() method
  describe("#delete()", () => {
    it("should delete data from the collection", () => {
      const data = { name: "John", age: 30 };
      collection.add("user1", data);
      const result = collection.delete("user1");
      expect(result).to.be.undefined;
      expect(collection.find("user1")).to.be.null;
    });
  });

  // Test cases for the update() method
  describe("#update()", () => {
    it("should update data in the collection", () => {
      const initialData = { name: "John", age: 30 };
      const updatedData = { name: "Jane", age: 35 };
      collection.add("user1", initialData);
      collection.update("user1", updatedData);
      const result = collection.find("user1");
      expect(result).to.deep.equal(updatedData);
    });
  });

  // Test cases for the find() method
  describe("#find()", () => {
    it("should find data in the collection", () => {
      const data = { name: "John", age: 30 };
      collection.add("user1", data);
      const result = collection.find("user1");
      expect(result).to.deep.equal(data);
    });
  });

  // Test cases for the duplicate() method
  describe("#duplicate()", () => {
    it("should duplicate data in the collection", () => {
      const data = { name: "John", age: 30 };
      collection.add("user1", data);
      collection.duplicate("user1", 3);
      const data1 = collection.data.availableData;
      const result = Object.keys(data1);
      expect(result.length).to.equal(4); // Original + 3 duplicates
    });
  });

  // Test cases for the fuzzyDelete() method
  describe("#fuzzyDelete()", () => {
    it("should delete data from the collection with fuzzy key", () => {
      const data = { name: "John", age: 30 };
      collection.add("user1", data);
      collection.fuzzyDelete("use");
      const result = collection.find("use");
      expect(result).to.be.null;
    });
  });

  // Test cases for the fuzzyUpdate() method
  describe("#fuzzyUpdate()", () => {
    it("should update data in the collection with fuzzy key", () => {
      const initialData = { name: "John", age: 30 };
      const updatedData = { name: "Jane", age: 35 };
      collection.add("user1", initialData);
      collection.fuzzyUpdate("use", updatedData);
      const result = collection.find("user1");
      expect(result).to.deep.equal(updatedData);
    });
  });

  // Test cases for the fuzzyFind() method
  describe("#fuzzyFind()", () => {
    it("should find data in the collection with fuzzy key", () => {
      const data = { name: "John", age: 30 };
      collection.add("user1", data);
      const result = collection.fuzzyFind("use");
      expect(result).to.deep.equal(data);
    });
  });

  // Test cases for the fuzzyDuplicate() method
  describe("#fuzzyDuplicate()", () => {
    it("should duplicate data in the collection with fuzzy key", () => {
      const data = { name: "John", age: 30 };
      collection.add("user1", data);
      collection.fuzzyDuplicate("use", 3);
      const data1 = collection.data.availableData;
      const result = Object.keys(data1);
      expect(result.length).to.equal(4); // Original + 3 duplicates
    });
  });
});
