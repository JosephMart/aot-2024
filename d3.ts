import fs from "fs";

const filePath = "./input.txt";
// const filePath = "./ex.txt";

let active = true;
const PART_2 = true;

const lines = fs
    .readFileSync(filePath, "utf-8")
    .match(/mul\(\d+,\d+\)|do\(\)|don't\(\)/g)
    ?.reduce((acc, match) => {
        if (PART_2) {
            active ||= match === "do()";
            active &&= match !== "don't()";
        }

        if (active && match[0] === "m") {
            acc += match
                .match(/\d+/g)!
                .reduce((acc, num) => acc * Number(num), 1);
        }
        return acc;
    }, 0);

console.log(lines);
