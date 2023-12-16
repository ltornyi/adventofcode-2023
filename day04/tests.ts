import { answerPart1, answerPart2, buildCardPile, cardValue, countCardsInPile, parseCardLine } from "./main";
import { equalTest, equalTestArray, readInputFile } from "../libs/lib"

const testCardParse1 = () => {
  const card = parseCardLine('Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53');
  equalTest('testCardParse1, index',card.index,1);
  equalTestArray('testCardParse1, winning',card.winningNumbers,[41,48,83,86,17]);
  equalTestArray('testCardParse1, yours',card.yourNumbers,[83,86,6,31,17,9,48,53]);
}

testCardParse1()

const testCardValue = () => {
  const card1 = parseCardLine('Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53');
  equalTest('testCardValue Card1', cardValue(card1), 8)
  const card2 = parseCardLine('Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19');
  equalTest('testCardValue Card2', cardValue(card2), 2)
  const card5 = parseCardLine('Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36');
  equalTest('testCardValue Card5', cardValue(card5), 0)
}

testCardValue()

const example1 = () => {
  const input = readInputFile('./example01.txt');
  const result = answerPart1(input);
  equalTest('example1', result, 13);
}

example1()

const testBuildPile = () => {
  const pile1 = buildCardPile(['Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53']);
  equalTest('build pile1',pile1[0].copies,1)
  const pile2 = buildCardPile(readInputFile('./example01.txt'));
  equalTestArray('build pile2',pile2.map(c => c.copies),[1,1,1,1,1,1])
}

testBuildPile()

const testCountPile = () => {
  const pile1 = buildCardPile(readInputFile('./example01.txt'));
  equalTest('count pile1',countCardsInPile(pile1),6)
}

testCountPile()

const example2 = () => {
  const input = readInputFile('./example01.txt');
  const result = answerPart2(input);
  equalTest('example2', result, 30);
}

example2()