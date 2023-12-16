import { equalTest, readInputFile } from "../libs/lib"
import { answerPart1, answerPart2 } from "./main";

const example1 = () => {
  const input = readInputFile('./example01.txt');
  const result = answerPart1(input);
  equalTest('example1',result,4361);
}

example1();

const example2 = () => {
  const input = readInputFile('./example01.txt');
  const result = answerPart2(input);
  equalTest('example2',result,467835);
}

example2();
