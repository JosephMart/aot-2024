import fs from "fs";

const filePath = "./input.txt";
// const filePath = "./ex.txt";
const TARGET_WORD = "XMAS";

const DIRECTIONS = [
    [0, 1], // right
    [0, -1], // left
    [1, 0], // down
    [-1, 0], // up
    [-1, -1], // up-left
    [-1, 1], // up-right
    [1, -1], // down-left
    [1, 1], // down-right
];

const { grid, startIndexes } = fs
    .readFileSync(filePath, "utf-8")
    .split("\n")
    .reduce(
        (acc, line, rowIndex) => {
            const row = line.split("");
            row.forEach((char, colIndex) => {
                if (char === TARGET_WORD[0]) {
                    acc.startIndexes.push({ row: rowIndex, col: colIndex });
                }
            });
            acc.grid.push(row);
            return acc;
        },
        { grid: [], startIndexes: [] } as {
            grid: string[][];
            startIndexes: { row: number; col: number }[];
        }
    );

const count = startIndexes.reduce((total, start) => {
    return (
        total +
        DIRECTIONS.reduce((dirCount, [rowInc, colInc]) => {
            let { row, col } = start;
            for (let i = 1; i < TARGET_WORD.length; i++) {
                row += rowInc;
                col += colInc;
                if (!grid[row]?.[col] || grid[row][col] !== TARGET_WORD[i]) {
                    return dirCount;
                }
            }
            return dirCount + 1;
        }, 0)
    );
}, 0);

console.log(count);
