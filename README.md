# Merge Properties Files for NodeJS (typings included)

## Warning! This project is abandoned! It's fully working though.

Merge properties files from several sources.

## Getting Started

Install using npm:

```
npm install merge-properties-files
```

Import to your project and use it:

```
// import functions
const { mergePropertiesFiles, savePropertiesFile } = require("merge-properties-files");

// merge as many files as you want
const merged = mergePropertiesFiles("a.properties", "b.properties", ...);

// save merged properties file
savePropertiesFile("path/to/save", merged).then(() => { /* Saved */ });
```

## mergePropertiesFiles(...paths: string[]): object

Will merge properties files synchronically and return a merged object. If file doesn't exist or null, then function would pass it.

## savePropertiesFile(path: string, properties: object): Promise

Async function that saves object as properties file. 
