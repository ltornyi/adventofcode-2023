import { readInputFile } from "../libs/lib";
import { answerPart1, answerPart2 } from "./main";

const part1 = () => {
  const input = readInputFile('./input.txt');
  const result = answerPart1(input);
  console.log('Answer1:', result);
}

part1()

const part2 = () => {
  const input = readInputFile('./input.txt');
  const result = answerPart2(input);
  console.log('Answer2:', result);
}

part2()