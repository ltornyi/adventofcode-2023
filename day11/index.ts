import { readInputFile } from "../libs/lib"
import { answerPart1 } from "./main"

const part1 = () => {
  const input = readInputFile('./input.txt')
  const result = answerPart1(input)
  console.log('Part1:',result)
}

part1()