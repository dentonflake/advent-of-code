
import { loadInput } from "../../lib/input.ts"

const BATTERY_COUNT = 12

// Load input into a 2D number array
const input: number[][] = loadInput(import.meta.url).split('\n').map(line =>
  line.split('').map(Number)
)

// Calculate total
const total = input.reduce((total, bank) => {

  // Batteries to turn on
  const batteries: number[] = []

  // Starting index
  let start = 0

  // Iterate through 12 battery positions
  for (let i = BATTERY_COUNT - 1; i >= 0; i--) {

    // Section to evaluate
    const section = bank.slice(start, bank.length - i)

    // Get the largest battery in the section
    const { index, value } = section.reduce((battery, value, index) => {

      if (value > battery.value) return {
        index,
        value,
      }

      return battery

    }, {
      index: 0,
      value: 0,
    })

    // Move the start to after the largest battery
    start = start + index + 1

    // Turn the battery on
    batteries.push(value)
  }

  // Return the total
  return total += Number(batteries.join(''))

}, 0)

// Log out the total joltage
console.log(total)