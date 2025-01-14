const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");

const inputParts = input.split("\n\n");
const rules = inputParts[0]
  .split("\n")
  .map((a) => a.split("|").map((b) => parseInt(b, 10)));
const updates = inputParts[1]
  .split("\n")
  .map((a) => a.split(",").map((b) => parseInt(b, 10)));

let sum = 0;

for (const update of updates) {
  let valid = true;

  for (const rule of rules) {
    const indexes = rule.map((_, i) => update.indexOf(rule[i]));

    if (indexes.every((v) => v !== -1) && indexes[0] > indexes[1]) {
      valid = false;
      break;
    }
  }

  if (!valid) {
    const fixedUpdate = update.toSorted((a, b) => {
      if (rules.some((rule) => rule[0] === a && rule[1] === b)) return -1;
      if (rules.some((rule) => rule[0] === b && rule[1] === a)) return 1;
      return 0;
    });

    sum += fixedUpdate[Math.floor(update.length / 2)];
  }
}

console.log(JSON.stringify(sum));
