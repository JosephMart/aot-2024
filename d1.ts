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
            acc[1].push(b);
            return acc;
        },
        [[], []] as [number[], number[]]
    )
    .map((x) => {
        return x.sort((a, b) => a - b);
    })
    .reduce((acc, items, i) => {
        return acc.map((x, i) => {
            return Math.abs(x - items[i]);
        });
    })
    .reduce((acc, v) => acc + v, 0);

console.log(lines);
