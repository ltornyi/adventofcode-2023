import { equalTest, readInputFile } from '../libs/lib';
import {Node, answerPart1, answerPart2, parseLine} from './main';

const test1ParseLine = (msg: string, line: string, expectedNode: Node) => {
  const result = parseLine(line);
  if (expectedNode.nodeId == result.nodeId &&
      expectedNode.leftNodeId == result.leftNodeId &&
      expectedNode.rightNodeId == result.rightNodeId) {
    console.log(`${msg}: passed`);
  } else {
    console.log(`${msg}: FAILED, got ${JSON.stringify(result)}, expected ${JSON.stringify(expectedNode)}`)
  }
}
const testParseLine = () => {
  test1ParseLine('example line 1', 'AAA = (BBB, CCC)', {nodeId:'AAA', leftNodeId:'BBB', rightNodeId:'CCC'})
  test1ParseLine('example line 2', 'BBB = (DDD, EEE)', {nodeId:'BBB', leftNodeId:'DDD', rightNodeId:'EEE'})
}

testParseLine()

const example1 = () => {
  const input = readInputFile('./example01.txt');
  const result = answerPart1(input);
  equalTest('example1', result, 2);
}

example1()

const example2 = () => {
  const input = readInputFile('./example02.txt');
  const result = answerPart2(input);
  equalTest('example2', result, 6);
}

example2()