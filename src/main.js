import { read, createEditor } from "properties-parser";

export function mergePropertiesFiles(...sources) {
  if (arguments.length === 0) {
    return Object.create(null);
  }

  // just parse single file if there's one argument
  if (arguments.length === 1) {
    try {
      return read(sources[0]);
    } catch(e) {
      return Object.create(null);
    }
  }

  return sources.reduce((heap, source) => {
    if (heap === null) {
      heap = Object.create(null);
    }

    // if there's no heap yet, create it
    if (typeof heap !== "object") {
      try {
        heap = read(heap);

      } catch(e) {
        // file wasn't found
        heap = Object.create(null);
      }
    }

    try {
      // read next file to merge
      const properties = read(source);

      return { ...heap, ...properties };
    } catch(e) {
      // if we have an error, just pass this file;
      // this will also cover null source case
      return heap;
    }
  });
}

// used in tesing purposes
export async function savePropertiesFile(path, properties) {
  return new Promise(r => {
    const editor = createEditor();

    for(let key in properties) {
      editor.set(key, properties[key]);
    }

    try {
      editor.save(path, () => { r(properties); });
    } catch(e) {
      // Return error if there's error saving file
      r(e);
    }
  });
}
