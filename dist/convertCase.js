"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function convertToCamelCase(obj) {
    return convertCase(obj, function (key) {
        var newKey = removeDelimiterFromKey(key, '-');
        newKey = removeDelimiterFromKey(newKey, '_');
        newKey = newKey[0].toLowerCase() + newKey.substr(1);
        return newKey;
    });
}
exports.convertToCamelCase = convertToCamelCase;
function convertToPascalCase(obj) {
    return convertCase(obj, function (key) {
        var newKey = removeDelimiterFromKey(key, '-');
        newKey = removeDelimiterFromKey(newKey, '_');
        newKey = newKey[0].toUpperCase() + newKey.substr(1);
        return newKey;
    });
}
exports.convertToPascalCase = convertToPascalCase;
function convertToSnakeCase(obj) {
    return convertCase(obj, function (key) {
        var newKey = removeDelimiterFromKey(key, '-');
        var indices = getIndicesForDelimiters(newKey);
        newKey = addDelimiterToKey(newKey, '_', indices);
        newKey = newKey.toLowerCase();
        return newKey;
    });
}
exports.convertToSnakeCase = convertToSnakeCase;
function convertCase(obj, convertKey) {
    if (obj === null || obj === undefined) {
        return null;
    }
    if (Array.isArray(obj)) {
        return obj.map(function (val) { return convertCase(val, convertKey); });
    }
    else if (obj instanceof Date) {
        return obj;
    }
    else if (typeof obj === 'object') {
        var keys = Object.keys(obj);
        var newObj_1 = {};
        keys.forEach(function (key) {
            var prop = obj[key];
            var newKey = convertKey(key);
            newObj_1[newKey] = convertCase(prop, convertKey);
        });
        return newObj_1;
    }
    return obj;
}
function removeDelimiterFromKey(key, delimiter) {
    var index = key.indexOf(delimiter);
    while (index === 0) {
        key = key.substr(delimiter.length);
        index = key.indexOf(delimiter);
    }
    while (index > -1) {
        var firstPart = key.substr(0, index);
        var lastPart = key.substr(index + delimiter.length);
        key = firstPart + lastPart[0].toUpperCase() + lastPart.substr(1);
        index = key.indexOf(delimiter);
    }
    return key;
}
function getIndicesForDelimiters(key) {
    var indices = [];
    // No need to check the first character as it won't need to be delimited
    for (var i = 2; i < key.length; i++) {
        var previousCharIsUpperCase = (key[i - 1] === key[i - 1].toUpperCase());
        var currentCharIsUpperCase = (key[i] === key[i].toUpperCase());
        if (previousCharIsUpperCase !== currentCharIsUpperCase) {
            if (previousCharIsUpperCase) {
                indices.push(i - 1);
            }
            else {
                indices.push(i);
                i++;
            }
        }
    }
    return indices;
}
function addDelimiterToKey(key, delimiter, indices) {
    // Start at end of indices to not affect locations of earlier indices
    indices.sort().reverse();
    indices.forEach(function (index) {
        if (index < delimiter.length || key.substr(index - delimiter.length, delimiter.length) !== delimiter) {
            key = key.substr(0, index) + delimiter + key.substr(index);
        }
    });
    return key;
}
