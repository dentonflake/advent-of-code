import { loadInput } from "../../lib/input.ts"

// Position type
type Position = {
  x: number
  y: number
  z: number
}

// Junction box type
type JunctionBox = {
  id: number
  pos: Position
}

// Pair type
type Pair = {
  p: JunctionBox
  q: JunctionBox
  distance: number
}

// Helper to get distance from two 3D points
const getDistance = (p: Position, q: Position): number => Math.sqrt(
  Math.pow(p.x - q.x, 2) +
  Math.pow(p.y - q.y, 2) +
  Math.pow(p.z - q.z, 2)
)

// Parse input into a junction box array
const input: JunctionBox[] = loadInput(import.meta.url).split('\n').map((line, index) => {

  const id = index + 1
  const [x, y, z] = line.split(',').map(Number)

  return {
    id,
    pos: { x, y, z }
  }
})

// Distance lookup between junction boxes
const pairs: Pair[] = []

// Iterate through every junction box
for (let i = 0; i < input.length; i++) {

  // Get fist junction box
  const p = input[i]

  // Iterate through every proceeding junction box
  for (let j = i + 1; j < input.length; j++) {

    // Get second junction box
    const q = input[j]

    // Calculate distance
    const distance = getDistance(p.pos, q.pos)

    // Add the pair to the array
    pairs.push({ p, q, distance })
  }
}

// Sort all the pairs by distance
pairs.sort(((a, b) => a.distance - b.distance))

const circuts: Set<number>[] = input.map(box => new Set([box.id]))

// Iterate through the smallest 1000 pairs
for (const { p, q } of pairs) {

  // For each pair, find all of its matching circuts
  const matchingCircuts = circuts.filter(circut => (
    circut.has(p.id) ||
    circut.has(q.id)
  ))

  // If one circut was found, add the ids
  if (matchingCircuts.length === 1) {
    matchingCircuts[0].add(p.id)
    matchingCircuts[0].add(q.id)
  }

  // If two circuts were found, combine the circuts
  if (matchingCircuts.length === 2) {

    for (const id of matchingCircuts[1]) {
      matchingCircuts[0].add(id)
    }

    const index = circuts.indexOf(matchingCircuts[1])

    circuts.splice(index, 1)

    if (circuts.length === 1) {
      console.log(p.pos.x * q.pos.x)
    }
  }
}