import { equalTest, equalTestMap, readInputFile } from "../libs/lib";
import { CardCount, answerPart1, answerPart2, getCardCount, getHandType } from "./main";

const testgetCardCount = () => {
  const cards1 = '32T3K';
  const result1 = getCardCount(cards1);
  const expected1: CardCount = new Map([['2',1],['3',2],['T',1],['K',1]])
  equalTestMap('cardcount1', result1, expected1)
  const cards2 = 'KTJJT';
  const result2 = getCardCount(cards2);
  const expected2: CardCount = new Map([['T',2],['J',2],['K',1]])
  equalTestMap('cardcount2', result2, expected2)
}

testgetCardCount()

const testgetCardCountJoker = () => {
  const cards1 = '32T3K';
  const result1 = getCardCount(cards1, true);
  const expected1: CardCount = new Map([['2',1],['3',2],['T',1],['K',1]])
  equalTestMap('cardcount1 joker', result1, expected1)
  const cards2 = 'KTJJT';
  const result2 = getCardCount(cards2, true);
  const expected2: CardCount = new Map([['T',4],['K',1]])
  equalTestMap('cardcount2 joker', result2, expected2)
  const cards3 = 'KK677';
  const result3 = getCardCount(cards3, true);
  const expected3: CardCount = new Map([['6',1],['7',2],['K',2]])
  equalTestMap('cardcount3 joker', result3, expected3)
  const cards4 = 'T55J5';
  const result4 = getCardCount(cards4, true);
  const expected4: CardCount = new Map([['5',4],['T',1]])
  equalTestMap('cardcount4 joker', result4, expected4)
  const cards5 = 'QQQJA';
  const result5 = getCardCount(cards5, true);
  const expected5: CardCount = new Map([['Q',4],['A',1]])
  equalTestMap('cardcount5 joker', result5, expected5)
  const cards6 = 'JJJJJ';
  const result6 = getCardCount(cards6, true);
  const expected6: CardCount = new Map([['J',5]])
  equalTestMap('cardcount6 joker', result6, expected6)
}

testgetCardCountJoker()

const testgetHandType = () => {
  const cardCount1 = new Map([['2',1],['3',2],['T',1],['K',1]])
  const result1 = getHandType(cardCount1 as CardCount);
  equalTest('handtype1',result1,'1+1+1+2')
  const cardCount2 = new Map([['T',2],['J',2],['K',1]])
  const result2 = getHandType(cardCount2 as CardCount);
  equalTest('handtype2',result2,'1+2+2')
}

testgetHandType()

const example1 = () => {
  const input = readInputFile('./example01.txt');
  const result = answerPart1(input);
  equalTest('example1', result, 6440);
}

example1()

const example2 = () => {
  const input = readInputFile('./example01.txt');
  const result = answerPart2(input);
  equalTest('example2', result, 5905);
}

example2()