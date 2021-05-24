export type JSONPrimitive = string | number | boolean | null;
export type JSONValue = JSONPrimitive | JSONObject | JSONArray;
export type JSONObject = { [key: string]: JSONValue };
export type JSONArray = Array<JSONValue>;
const camel = (obj: JSONValue): JSONValue => {
  if (typeof obj === 'object' && obj) {
    if (Array.isArray(obj)) {
      return obj.map(item => camel(item));
    }
    const newObj: JSONObject = {};
    for (const key of Object.keys(obj)) {
      let newKey = key.replace(/^([A-Z])/, (_p, m: string) => m.toLowerCase());
      newKey = key.replace(/(?<!^)_([a-z])/g, (_p, m: string) => m.toUpperCase());
      newObj[newKey] = camel(obj[key]);
    }
    return newObj;
  } else {
    return obj;
  }
};
const underline = (obj: JSONValue): JSONValue => {
  if (typeof obj === 'object' && obj) {
    if (Array.isArray(obj)) {
      return obj.map(item => underline(item));
    }
    const newObj: JSONObject = {};
    for (const key of Object.keys(obj)) {
      const newKey = key.replace(/([A-Z])/g, (_p, m: string) => `_${m.toLowerCase()}`);
      newObj[newKey] = underline(obj[key]);
    }
    return newObj;
  } else {
    return obj;
  }
};
export { camel, underline };
