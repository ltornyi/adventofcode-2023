import { equalTest, equalTestArray, readInputFile } from "../libs/lib"
import { answerPart1, expandUniverse } from "./main"

const testExpandUniverse = () => {
  const input = readInputFile('./example01.txt')
  const expectedExpanded = readInputFile('./expanded_example01.txt')
  const result = expandUniverse(input)
  equalTestArray('example1 expand', result, expectedExpanded)
}

testExpandUniverse()

const example1 = () => {
  const input = readInputFile('./example01.txt')
  const result = answerPart1(input)
  equalTest('example1',result,374)
}

example1()