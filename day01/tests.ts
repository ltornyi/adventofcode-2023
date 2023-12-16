import { equalTest, readInputFile } from "../libs/lib";
import { processInput, processInput2 } from "./main";

const example1 = () => {
  const exampleInput = readInputFile('./example01.txt');
  const result = processInput(exampleInput);
  equalTest('example1 answer', result, 142);
}

example1();

const example2 = () => {
  const input = readInputFile('./example02.txt');
  const result = processInput2(input);
  equalTest('example2 answer', result, 281);
}

example2();

const test1 = () => {
  const input = ['jninedsrvftdlcg4hhztwofourskrjhcjvthree'];
  const result = processInput2(input);
  equalTest('test1', result, 93);
}

const test2 = () => {
  const input = ['4ninepxhzxmhgsixjncqfhqlnb'];
  const result = processInput2(input);
  equalTest('test2', result, 46);
}

const test3 = () => {
  const input = ['tp8'];
  const result = processInput2(input);
  equalTest('test3', result, 88);
}

const test4 = () => {
  const input = ['eightwo'];
  const result = processInput2(input);
  equalTest('test4', result, 82);
}

test1();
test2();
test3();
test4();