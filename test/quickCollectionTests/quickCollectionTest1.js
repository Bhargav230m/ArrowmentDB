const { QuickCollection } = require("../../src/classes/QuickCollection.js"); // Adjust the path as needed

const testAdd = () => {
  const collection = new QuickCollection();
  const data = { name: "John", age: 30 };
  collection.add("user1", data);
  const result = collection.find("user1");
  if (result !== data) {
    console.error("Test failed: add() method");
  } else {
    console.log("Test passed: add() method");
  }
};

const testDelete = () => {
  const collection = new QuickCollection();
  const data = { name: "John", age: 30 };
  collection.add("user1", data);
  const result2 = collection.delete("user1");
  const result = collection.find("user1");
  if (result !== null && result2 !== false) {
    console.error("Test failed: delete() method");
  } else {
    console.log("Test passed: delete() method");
  }
};

const testUpdate = () => {
  const collection = new QuickCollection();
  const initialData = { name: "John", age: 30 };
  const updatedData = { name: "Jane", age: 35 };
  collection.add("user1", initialData);
  collection.update("user1", updatedData);
  const result = collection.find("user1");
  if (result !== updatedData) {
    console.error("Test failed: update() method");
  } else {
    console.log("Test passed: update() method");
  }
};

const testFind = () => {
  const collection = new QuickCollection();
  const data = { name: "John", age: 30 };
  collection.add("user1", data);
  const result = collection.find("user1");
  if (result !== data && result !== null) {
    console.error("Test failed: find() method");
  } else {
    console.log("Test passed: find() method");
  }
};

const testDuplicate = () => {
  const collection = new QuickCollection();
  const data = { name: "John", age: 30 };
  collection.add("user1", data);
  let e = collection.duplicate("user", 3);
  const data1 = collection.data.availableData;
  const result = Object.keys(data1);
  if (result.length !== 4 && e == false) {
    // Original + 3 duplicates
    console.error("Test failed: duplicate() method");
  } else {
    console.log("Test passed: duplicate() method");
  }
};

const testFuzzyDelete = () => {
  const collection = new QuickCollection();
  const data = { name: "John", age: 30 };
  collection.add("user1", data);
  collection.fuzzyDelete("use");
  const result = collection.find("use");
  if (result !== null) {
    console.error("Test failed: fuzzyDelete() method");
  } else {
    console.log("Test passed: fuzzyDelete() method");
  }
};

const testFuzzyUpdate = () => {
  const collection = new QuickCollection();
  const initialData = { name: "John", age: 30 };
  const updatedData = { name: "Jane", age: 35 };
  collection.add("user1", initialData);
  collection.fuzzyUpdate("use", updatedData);
  const result = collection.find("user1");
  if (result !== updatedData) {
    console.error("Test failed: fuzzyUpdate() method");
  } else {
    console.log("Test passed: fuzzyUpdate() method");
  }
};

const testFuzzyFind = () => {
  const collection = new QuickCollection();
  const data = { name: "John", age: 30 };
  collection.add("user1", data);
  const result = collection.fuzzyFind("use");
  if (result !== data) {
    console.error("Test failed: fuzzyFind() method");
  } else {
    console.log("Test passed: fuzzyFind() method");
  }
};

const testFuzzyDuplicate = () => {
  const collection = new QuickCollection();
  const data = { name: "John", age: 30 };
  collection.add("user1", data);
  collection.fuzzyDuplicate("use", 3);
  const data1 = collection.data.availableData;
  const result = Object.keys(data1);
  if (result.length !== 4) {
    // Original + 3 duplicates
    console.error("Test failed: fuzzyDuplicate() method");
  } else {
    console.log("Test passed: fuzzyDuplicate() method");
  }
};

// Run all test functions
testAdd();
testDelete();
testUpdate();
testFind();
testDuplicate();
testFuzzyDelete();
testFuzzyUpdate();
testFuzzyFind();
testFuzzyDuplicate();
