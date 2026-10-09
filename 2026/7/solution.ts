import { loadInput } from "../../lib/input.ts"

// Parse input into a 2D string array
let input: string[][] = loadInput(import.meta.url).split('\n').map(line => line.split(''))

const possibleJournys = new Map<string, number>()

// Recursive helper function to trace the tachyon beam
const traceTachyonBeam = (indexOfRow: number, indexesOfTachyonBeams: number[]): number => {

  let total = 0

  // If there is no next row, exit
  if (indexOfRow > input.length - 1) {

    return indexesOfTachyonBeams.length
  }

  // For each index/position of the tachyon beam
  for (const indexOfTachyonBeam of indexesOfTachyonBeams) {

    const key = `${indexOfRow}:${indexOfTachyonBeam}`
    const cached = possibleJournys.get(key)

    if (cached !== undefined) {
      total += cached
      continue
    }

    let journeys = 0

    // If that position in this row is a '^' split the beam and increment the counter
    if (input[indexOfRow][indexOfTachyonBeam] === '^') {

      journeys = traceTachyonBeam(indexOfRow + 1, [indexOfTachyonBeam - 1, indexOfTachyonBeam + 1])

    }
    
    // Draw the beam as normal
    else {
      journeys = traceTachyonBeam(indexOfRow + 1, [indexOfTachyonBeam])
    }

    possibleJournys.set(key, journeys)
    total += journeys
  }

  return total
}

const timelines = traceTachyonBeam(
  1,
  [input[0].indexOf('S')]
)

console.log('Total timelines: ', timelines)