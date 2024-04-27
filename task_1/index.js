import { encoded, translations } from "./data.js";

console.log("Let's rock");
console.log(encoded, translations);

const decoded = encoded.map((element) =>
  Object.entries(element).reduce((acc, cur) => {
    const [key, val] = cur;
    if (
      key.slice(key.length - 2) === "Id" &&
      Object.keys(translations).includes(val)
    )
      acc[key] = translations[val];
    else acc[key] = val;
    return acc;
  }, {})
);

console.log(decoded);
