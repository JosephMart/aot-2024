import fs from "fs";

const filePath = "./input.txt";
// const filePath = "./ex.txt";
const lines = fs
    .readFileSync(filePath, "utf-8")
    .split("\n")
    .reduce(
        (acc, line) => {
            const [a, b] = line.split("   ").map(Number);
            acc[0].push(a);
            acc[1].set(b, (acc[1].get(b) ?? 0) + 1);
            return acc;
        },
        [[], new Map()] as [number[], Map<number, number>]
    );

const result = lines[0].reduce((sum, x) => sum + (lines[1].get(x) ?? 0) * x, 0);

console.log(result);
