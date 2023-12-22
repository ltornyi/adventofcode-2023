import { Point } from "../libs/algos";
import { equalTest, readInputFile } from "../libs/lib"
import { Direction, answerPart1, answerPart2, calcAdjacentPoint, findStart, samePoint } from "./main";

const testFindStart = (msg: string, input: string[], expected: Point) => {
  const result = findStart(input);
  if (samePoint(result, expected)) {
    console.log(`${msg} passed.`)
  } else {
    console.log(`${msg} failed, expected (${expected.x},${expected.y}) but got (${result.x},${result.y})`)
  }
}

const testFindStarts = () => {
  testFindStart('findstart11', readInputFile('./example11.txt'), {x:1, y:1})
  testFindStart('findstart12', readInputFile('./example12.txt'), {x:1, y:1})
  testFindStart('findstart13', readInputFile('./example13.txt'), {x:2, y:0})
  testFindStart('findstart14', readInputFile('./example14.txt'), {x:2, y:0})
}

testFindStarts()

const testCalcAdjacentPoint = (msg: string, maxX: number, maxY: number, point: Point, dir:Direction, expected: Point|undefined) => {
  const result = calcAdjacentPoint(maxX, maxY, point, dir);
  if (!expected) {
    if (!result) {
      console.log(`${msg} passed.`);
    } else {
      console.log(`${msg} FAILED, expected undefined but got (${result.x}, ${result.y})`)
    }
  } else if (!result) {
    console.log(`${msg} FAILED, expected (${expected.x},${expected.y}) but got undefined`)
  } else if (samePoint(result, expected)) {
    console.log(`${msg} passed.`);
  } else {
    console.log(`${msg} FAILED, expected (${expected.x},${expected.y}) but got (${result.x}, ${result.y})`)
  }
}

const testCalcAdjacentPoints = () => {
  testCalcAdjacentPoint('adj1', 2, 2, {x:0,y:0}, Direction.NORTH, undefined)
  testCalcAdjacentPoint('adj2', 2, 2, {x:0,y:0}, Direction.EAST, {x:0, y:1})
  testCalcAdjacentPoint('adj3', 2, 2, {x:0,y:0}, Direction.SOUTH, {x:1, y:0})
  testCalcAdjacentPoint('adj4', 2, 2, {x:0,y:0}, Direction.WEST, undefined)
  testCalcAdjacentPoint('adj5', 2, 2, {x:2,y:2}, Direction.NORTH, {x:1, y:2})
  testCalcAdjacentPoint('adj6', 2, 2, {x:2,y:2}, Direction.EAST, undefined)
  testCalcAdjacentPoint('adj7', 2, 2, {x:2,y:2}, Direction.SOUTH, undefined)
  testCalcAdjacentPoint('adj8', 2, 2, {x:2,y:2}, Direction.WEST, {x:2, y:1})
}

testCalcAdjacentPoints()

const example1Test = (msg:string, inputfile: string, expected: number) => {
  const input = readInputFile(inputfile);
  const result = answerPart1(input);
  equalTest(msg,result,expected);
}

const example1Tests = () => {
  example1Test('./example11.txt','./example11.txt',4)
  example1Test('./example12.txt','./example12.txt',4)
  example1Test('./example13.txt','./example13.txt',8)
  example1Test('./example14.txt','./example14.txt',8)
}

example1Tests()

const example2Test = (msg:string, inputfile: string, expected: number) => {
  const input = readInputFile(inputfile);
  const result = answerPart2(input);
  equalTest(msg,result,expected);
}

const example2Tests = () => {
  example2Test('./example21.txt','./example21.txt',4)
  example2Test('./example22.txt','./example22.txt',4)
  example2Test('./example23.txt','./example23.txt',8)
  example2Test('./example24.txt','./example24.txt',10)
}

example2Tests()