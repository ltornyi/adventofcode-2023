import { equalTest, readInputFile } from "../libs/lib"
import { Game } from "./Game"
import { answerPart1, answerPart2 } from "./main";

const example1 = () => {
  const input = readInputFile('./example01.txt')
  const game = new Game(12,13,14);
  const result = answerPart1(input, game);
  equalTest('example 1', result, 8);
}

example1();

const example2 = () => {
  const input = readInputFile('./example01.txt')
  const result = answerPart2(input);
  equalTest('example 2', result, 2286)
}

example2()