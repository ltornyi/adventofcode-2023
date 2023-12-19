import { equalTest, readInputFile } from "../libs/lib";
import { answerPart1, answerPart2, calcNumberOfWaysToBeat } from "./main";

const testcalcNumberOfWaysToBeat = () => {
  const res1 = calcNumberOfWaysToBeat(7, 9)
  equalTest('race1', res1, 4)
  const res2 = calcNumberOfWaysToBeat(15, 40)
  equalTest('race2', res2, 8)
  const res3 = calcNumberOfWaysToBeat(30, 200)
  equalTest('race3', res3, 9)
  const resNew = calcNumberOfWaysToBeat(71530, 940200)
  equalTest('raceNew', resNew, 71503)
}

testcalcNumberOfWaysToBeat();

const example1 = () => {
  const input = readInputFile('./example01.txt');
  const result = answerPart1(input);
  equalTest('example1', result, 288);
}

example1()

const example2 = () => {
  const input = readInputFile('./example01.txt');
  const result = answerPart2(input);
  equalTest('example2', result, 71503);
}

example2()