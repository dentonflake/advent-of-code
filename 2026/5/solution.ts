import { loadInput } from "../../lib/input.ts"

// Input types
type InputGroups = {
  freshRanges: number[][]
  ingredientIds: number[]
  split: boolean
}

// Load input into a string array
const { freshRanges, ingredientIds } = loadInput(import.meta.url).split('\n').reduce<InputGroups>((acc, line) => {

  if (line.trim() === '') {
    acc.split = true
  } else if (acc.split) {
    acc.ingredientIds.push(Number(line))
  } else {
    acc.freshRanges.push(line.split('-').map(Number))
  }

  return acc

}, {
  freshRanges: [],
  ingredientIds: [],
  split: false
})

freshRanges.sort((a, b) => a[0] - b[0])

let total = 0

if (freshRanges.length > 0) {
  let [currentStart, currentEnd] = freshRanges[0]

  for (const [start, end] of freshRanges.slice(1)) {
    if (start <= currentEnd) {
      // Overlapping ranges: extend the current range if needed
      currentEnd = Math.max(currentEnd, end)
    } else {
      // Separate range: count the finished one
      total += currentEnd - currentStart + 1

      // Start tracking the next range
      currentStart = start
      currentEnd = end
    }
  }

  // Count the last range
  total += currentEnd - currentStart + 1
}

console.log('Fresh Ingredient IDs:', total)