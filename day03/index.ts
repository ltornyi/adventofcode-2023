import { readInputFile } from "../libs/lib"
import { answerPart1, answerPart2 } from "./main";

const question1 = () => {
  const input = readInputFile('./input.txt');
  const result = answerPart1(input);
  console.log('Answer 1:',result);
}

question1();

const question2 = () => {
  const input = readInputFile('./input.txt');
  const result = answerPart2(input);
  console.log('Answer 2:',result);
}

question2();