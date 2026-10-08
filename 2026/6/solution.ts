import { loadInput } from "../../lib/input.ts"

// Problem type
type Problem = {
  numbers: number[]
  operation: string | null
}

// Helper to solve all problems to return grand total
const solveProblems = (problems: Problem[]) => problems.reduce((grandTotal, { numbers, operation }) => {

  if (operation === '+') {
    return grandTotal += numbers.reduce((subtotal, number) => subtotal + number)
  }

  if (operation === '*') {
    return grandTotal += numbers.reduce((subtotal, number) => subtotal * number)
  }

  console.log('No operation found, skipping.')

  return grandTotal

}, 0)

// Parse input into a 2D string array
let input: string[][] = loadInput(import.meta.url).split('\n').map(line => line.split(''))

// Array to store problems
const problems: Problem[] = []

// Const to store the current problem being built
let problem: Problem = {
  numbers: [],
  operation: null
}

// Loop to iterate through each column
for (let colIndex = input[0].length - 1; colIndex >= 0; colIndex--) {

  // Each potential number in the column
  const a = input[0][colIndex]
  const b = input[1][colIndex]
  const c = input[2][colIndex]
  const d = input[3][colIndex]

  // Potential number
  const n = [a, b, c, d].join('').trim()

  // Potential operation
  const o = input[4][colIndex]

  // If starting a new problem (empty column)
  if (n === '') {

    // If the problem didn't get an operation
    if (!problem.operation) {
      throw Error('No operation found on problem...')
    }

    // Add the problem to the list
    problems.push(problem)


    // Reset current problem
    problem = {
      numbers: [],
      operation: null
    }

    continue
  }

  // If o is an operation
  if (o === '+' || o === '*') {
    problem.operation = o
  }

  // Add the number to the problem
  problem.numbers.push(Number(n))

}

// Add the problem to the list
problems.push(problem)

console.log('Grand total: ', solveProblems(problems))