import fs from "fs";

const filePath = "./input.txt";
// const filePath = "./ex.txt";
const TARGET_WORD = "MAS";
const [first, middle, last] = TARGET_WORD.split("");

const grid = fs
    .readFileSync(filePath, "utf-8")
    .split("\n")
    .map((line) => line.split(""));

const count = grid.reduce((total, row, rowIndex) => {
    return (
        total +
        row.reduce((acc, char, colIndex) => {
            if (char !== middle) return acc;

            const diagonals = [
                [
                    grid[rowIndex - 1]?.[colIndex - 1],
                    grid[rowIndex + 1]?.[colIndex + 1],
                ],
                [
                    grid[rowIndex + 1]?.[colIndex - 1],
                    grid[rowIndex - 1]?.[colIndex + 1],
                ],
            ];

            return (
                acc +
                Number(
                    diagonals.filter(
                        ([a, b]) =>
                            (a === first && b === last) ||
                            (a === last && b === first)
                    ).length === 2
                )
            );
        }, 0)
    );
}, 0);

console.log(count);
