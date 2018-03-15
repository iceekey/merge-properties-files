const { mergePropertiesFiles, savePropertiesFile } = require("./index.js");
const { existsSync, mkdirSync, rmdirSync } = require("fs");
const { resolve } = require("path");

const MOCKUPS_DIR    = "mockups";
const FOO_PROPERTIES = resolve(MOCKUPS_DIR, "foo.properties");
const BAR_PROPERTIES = resolve(MOCKUPS_DIR, "bar.properties");
const BAZ_PROPERTIES = resolve(MOCKUPS_DIR, "baz.properties");

const foo = {
  fruits:       "фрукты",
  filth:        "грязи"
},

bar = {
  fruits:       "фрукты",
  blue:         "синий"
},

baz = {
  blue:         "синий",
  matrix:       "матрица"
};

beforeAll(async () => {
  if (!existsSync(MOCKUPS_DIR)){
    mkdirSync(MOCKUPS_DIR);
  }

  await savePropertiesFile(FOO_PROPERTIES, foo);
  await savePropertiesFile(BAR_PROPERTIES, bar);
  await savePropertiesFile(BAZ_PROPERTIES, baz);
});

test("should return an object", () => {
  expect(typeof mergePropertiesFiles(FOO_PROPERTIES, BAR_PROPERTIES))
    .toBe("object");
});

test("should pass null/undefined files", () => {
  expect(mergePropertiesFiles(FOO_PROPERTIES, null, undefined))
    .toEqual(foo);
});

test("should return empty object if there's no arguments", () => {
  expect(mergePropertiesFiles())
    .toEqual(Object.create(null));
});

test("should return empty object if there's no corrent arguments", () => {
  expect(mergePropertiesFiles(null, null))
    .toEqual(Object.create(null));
});

test("should pass non existent files", () => {
  expect(mergePropertiesFiles(FOO_PROPERTIES, "WRONG_PATH.properties"))
    .toEqual(foo);
});

test("should merge properly (no covers)", () => {
  expect(mergePropertiesFiles(FOO_PROPERTIES, BAZ_PROPERTIES))
    .toEqual({...foo, ...baz});
});

test("should merge properly (covers case)", () => {
  expect(mergePropertiesFiles(FOO_PROPERTIES, BAR_PROPERTIES))
    .toEqual({...foo, ...bar });
});

test("should merge properly up to three files (covers case)", () => {
  expect(mergePropertiesFiles(FOO_PROPERTIES, BAR_PROPERTIES, BAZ_PROPERTIES))
    .toEqual({...foo, ...bar, ...baz});
});
