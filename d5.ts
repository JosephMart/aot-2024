import fs from "fs";

const filePath = "./input.txt";
// const filePath = "./ex.txt";

const [rulesStr, pagesStr] = fs.readFileSync(filePath, "utf-8").split("\n\n");

const rules = rulesStr.split("\n").reduce((acc, line) => {
    const [key, item] = line.split("|").map(Number);
    acc.get(key)?.push(item) ?? acc.set(key, [item]);
    return acc;
}, new Map<number, number[]>());

const result = pagesStr.split("\n").reduce((acc, line) => {
    const pages = line.split(",").map(Number);
    const seen = new Set<number>();

    for (const num of pages) {
        for (const preRule of rules.get(num) ?? []) {
            if (seen.has(preRule)) {
                return acc;
            }
        }
        seen.add(num);
    }
    return acc + pages[Math.floor(pages.length / 2)];
}, 0);
console.log(result);
