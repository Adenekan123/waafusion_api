"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseFields = void 0;
const parseFields = (fields, values) => {
    if (!fields)
        return [];
    console.log(fields);
    return fields.map(field => values.includes(field) ? JSON.parse(field) : field);
};
exports.parseFields = parseFields;
