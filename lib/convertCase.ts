export function convertToCamelCase<T>(obj: T | T[]) : T | T[] | null {
    return convertCase(obj, (key) => {
        let newKey = removeDelimiterFromKey(key, '-');
        newKey = removeDelimiterFromKey(newKey, '_');
        
        newKey = newKey[0].toLowerCase() + newKey.substr(1);
        return newKey;
    });
}

export function convertToPascalCase<T>(obj: T | T[]) : T | T[] | null {
    return convertCase(obj, (key) => {
        let newKey = removeDelimiterFromKey(key, '-');
        newKey = removeDelimiterFromKey(newKey, '_');
        
        newKey = newKey[0].toUpperCase() + newKey.substr(1);
        return newKey;
    });
}

export function convertToSnakeCase<T>(obj: T | T[]) : T | T[] | null {
    return convertCase(obj, (key) => {
        let newKey = removeDelimiterFromKey(key, '-');

        let indices = getIndicesForDelimiters(newKey);
        newKey = addDelimiterToKey(newKey, '_', indices);
        
        newKey = newKey.toLowerCase();
        return newKey;
    });
}

function convertCase<T>(obj: T | T[], convertKey: (key: string) => string) : T | T[] | null {
    if (obj === null || obj === undefined) {
        return null;
    }
    
    if (Array.isArray(obj)) {
        return (obj as Array<T>).map(val => convertCase(val, convertKey) as T);
    } else if (obj instanceof Date) {
        return obj;
    } else if (typeof obj === 'object') {
        let keys = Object.keys(obj);
        let newObj: any = { };

        keys.forEach(key => {
            let prop = (<any>obj)[key];
            let newKey = convertKey(key);
            newObj[newKey] = convertCase(prop, convertKey);
        });

        return newObj;
    }

    return obj;
}

function removeDelimiterFromKey(key: string, delimiter: string) : string {
    let index = key.indexOf(delimiter);
    while (index === 0) {
        key = key.substr(delimiter.length);

        index = key.indexOf(delimiter);
    }
    
    while (index > -1) {
        let firstPart = key.substr(0, index);
        let lastPart = key.substr(index + delimiter.length);
        key = firstPart + lastPart[0].toUpperCase() + lastPart.substr(1);

        index = key.indexOf(delimiter);
    }

    return key;
}

function getIndicesForDelimiters(key: string): number[] {
    let indices : number[] = [];

    // No need to check the first character as it won't need to be delimited
    for (let i = 2; i < key.length; i++) {
        let previousCharIsUpperCase = (key[i - 1] === key[i - 1].toUpperCase());
        let currentCharIsUpperCase = (key[i] === key[i].toUpperCase());

        if (previousCharIsUpperCase !== currentCharIsUpperCase) {
            if (previousCharIsUpperCase) {
                indices.push(i - 1);
            } else {
                indices.push(i);
                i++;
            }
        }
    }

    return indices;
}

function addDelimiterToKey(key: string, delimiter: string, indices: number[]) : string {
    // Start at end of indices to not affect locations of earlier indices
    indices.sort().reverse();

    indices.forEach(index => {
        if (index < delimiter.length || key.substr(index - delimiter.length, delimiter.length) !== delimiter) {
            key = key.substr(0, index) + delimiter + key.substr(index);
        }
    });
    
    return key;
}