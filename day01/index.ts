import { readInputFile } from "../libs/lib"
import { processInput, processInput2 } from "./main"

const question1 = () => {
  const input = readInputFile('./input.txt');
  const result = processInput(input);
  console.log('Answer1:', result);
}

question1();

const question2 = () => {
  const input = readInputFile('./input.txt');
  const result = processInput2(input);
  console.log('Answer2:', result);
}

question2();