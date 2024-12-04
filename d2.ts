import fs from "fs";

const filePath = "./input.txt";
// const filePath = "./ex.txt";

const lines = fs
    .readFileSync(filePath, "utf-8")
    .split("\n")
    .reduce((acc, line) => {
        const levels = line.split(" ").map(Number);

        if (isValid(levels)) {
            return acc + 1;
        }

        for (let i = 0; i < levels.length; i++) {
            if (isValid([...levels.slice(0, i), ...levels.slice(i + 1)])) {
                return acc + 1;
            }
        }

        return acc;
    }, 0);

console.log(lines);

function isValid(levels: number[]): boolean {
    let prevLevel = levels[0];
    let isIncreasing = true;

    for (let i = 1; i < levels.length; i++) {
        if (i === 1) {
            isIncreasing = levels[i] > prevLevel;
        }

        const diff = levels[i] - prevLevel;
        const diffAbs = Math.abs(diff);

        const inRange = !(diffAbs < 1 || diffAbs > 3);
        const correctDirection =
            (diff > 0 && isIncreasing) || (diff < 0 && !isIncreasing);

        if (!inRange || !correctDirection) {
            return false;
        }
        prevLevel = levels[i];
    }
    return true;
}
