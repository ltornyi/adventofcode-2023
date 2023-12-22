import { equalTest, readInputFile } from "../libs/lib";
import { answerPart1, answerPart2, backPrediction, parseLine, prediction } from "./main"

const testPrediction = (msg: string, numbers: number[], expected:number) => {
  const result = prediction(numbers);
  equalTest(msg, result, expected);
}

const testPredictions = () => {
  testPrediction('prediction1', parseLine('0 3 6 9 12 15'), 18);
  testPrediction('prediction2', parseLine('1 3 6 10 15 21'), 28);
  testPrediction('prediction3', parseLine('10 13 16 21 30 45'), 68);
}

testPredictions()

const example1 = () => {
  const input = readInputFile('./example01.txt');
  const result = answerPart1(input);
  equalTest('example1',result,114)
}

example1()

const testBackPrediction = (msg: string, numbers: number[], expected:number) => {
  const result = backPrediction(numbers);
  equalTest(msg, result, expected);
}

const testBackPredictions = () => {
  testBackPrediction('backprediction1', parseLine('0 3 6 9 12 15'), -3);
  testBackPrediction('backprediction2', parseLine('1 3 6 10 15 21'), 0);
  testBackPrediction('backprediction3', parseLine('10 13 16 21 30 45'), 5);
}

testBackPredictions()

const example2 = () => {
  const input = readInputFile('./example01.txt');
  const result = answerPart2(input);
  equalTest('example2',result,2)
}

example2()