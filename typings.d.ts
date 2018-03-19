export declare function mergePropertiesFiles(...sources: string[]): { [key: string]: string};
export declare function savePropertiesFile(path: string, properties: { [key: string]: string}): Promise< { [key: string]: string} | Error>;
