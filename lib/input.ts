import { readFileSync } from "node:fs"

export const loadInput = (moduleUrl: string): string => {

  return readFileSync(new URL("input.txt", moduleUrl), "utf8")
    .replace(/\r\n/g, "\n")
    .replace(/\n$/, "")
}