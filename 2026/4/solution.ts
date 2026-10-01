
import { loadInput } from "../../lib/input.ts"

// Load input into a 2D string array
let input: string[][] = loadInput(import.meta.url).split('\n').map(line =>
  line.split('')
)

// Helper to get the surrounding rolls
const getSurroundingRolls = (row: number, col: number): number => {

  // Total surrounding rolls
  let surroundingRolls = 0

  // Spaces to check
  const moves = [
    [-1, -1], // Upper left
    [-1,  0], // Up
    [-1,  1], // Upper right
    [ 0, -1], // Left
    [ 0,  1], // Right
    [ 1, -1], // Lower left
    [ 1,  0], // Low
    [ 1,  1], // Lower right
  ]

  // Iterate through the surrounding spaces
  for (const [rowChange, colChange] of moves) {

    // Define the next locations
    const nextRow = row + rowChange
    const nextCol = col + colChange

    // Check to see if the location is a valid space
    if (nextRow >= 0 && nextRow < input.length && nextCol >= 0 && nextCol < input[nextRow].length) {

      // Check to see if the space has a roll
      if (input[nextRow][nextCol] === '@') {
        surroundingRolls++
      }
    }
  }

  // Return surrounding rolls
  return surroundingRolls
}

// Helper to remove accessible rolls
const removeAccessibleRolls = (input: string[][]): { removed: number, output: string[][] } => {

  let removed = 0

  const output = input.map((row, rowIndex) => (row.map((col, colIndex) => {
    
    // If location is a roll and has fewer than 4 surrounding rolls
    if (col === '@' && getSurroundingRolls(rowIndex, colIndex) < 4) {
      removed++
      return '.'
    }

    // Return location
    return col

  })))

  return {
    removed,
    output
  }
}

let removedRolls = 0

// Iterate until no more rows can be returned
while (true) {

  const { removed, output } = removeAccessibleRolls(input)

  input = output
  removedRolls += removed

  if (removed === 0) break
}

// Log out accessible rolls
console.log('Removed Rolls:', removedRolls)