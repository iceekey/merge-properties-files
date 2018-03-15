
// import merge function
import { mergePropertiesFiles, savePropertiesFile } from "./main.js";
import { existsSync, mkdirSync } from "fs";
import { resolve } from "path";

const MOCKUPS_DIR    = "dist/mockups";
const FOO_PROPERTIES = resolve(MOCKUPS_DIR, "foo.properties");
const BAR_PROPERTIES = resolve(MOCKUPS_DIR, "bar.properties");

const foo = {
  fruits:       "фрукты",
  filth:        "грязи",
  mother:       "мама",
  music:        "музыка",
  silver:       "серебро",
  code:         "код",
  rickAndMorty: "Рик и Морти"
};

const bar = {
  blue:         "синий",
  fruits:       "фрукты",
  galaxy:       "галактика",
  mother:       "мама",
  silver:       "серебро"
};

// create mockups directory
if (!existsSync(MOCKUPS_DIR)){
  mkdirSync(MOCKUPS_DIR);
}

savePropertiesFile(FOO_PROPERTIES, foo)
  .then(() => { return savePropertiesFile(BAR_PROPERTIES, bar); })
  .then(() => {
    // merge 2 files and print result
    const merged = mergePropertiesFiles(FOO_PROPERTIES, BAR_PROPERTIES);

    for (let key in merged) {
      console.log(`${key}: ${merged[key]}`);
    }
  });
