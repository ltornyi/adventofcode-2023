import { isDigit } from "../libs/lib";
import { ElfNumber } from "./ElfNumber";

export const answerPart1 = (input: string[]) => {
  const numbers = parseNumbers(input);
  const partNumbers = findPartNumbers(numbers, input);
  let result = 0;
  for (const pn of partNumbers) {
    result += pn.value;
  }
  return result;
}

const findPartNumbers = (numbers: ElfNumber[], input: string[]): ElfNumber[] => {
  const partNumbers: ElfNumber[] = [];
  for (const num of numbers) {
    if (num.isPartNumber(input, '.')) {
      partNumbers.push(num);
    }
  }
  return partNumbers;
}

const parseNumbers = (input: string[]): ElfNumber[] => {
  const numbers:ElfNumber[] = [];
  for (let index=0; index < input.length; index++) {
    const numbersHere = parseNumbersFromLine(index, input[index]);
    numbers.push(...numbersHere)
  }
  return numbers;
}

const parseNumbersFromLine = (index: number, line:string): ElfNumber[] => {
  const result: ElfNumber[] = [];
  let temp = '';
  let inNumber = false;
  let start = 0;
  let len = 0;
  for (let i=0; i<line.length; i++) {
    const thisChar=line[i]
    if (isDigit(thisChar)) {
      if (!inNumber) {
        inNumber = true;
        start = i;
      }
      temp += thisChar
    } else if (inNumber) {
        inNumber = false;
        len = i-start;
        result.push(new ElfNumber(parseInt(temp), index, start, len));
        temp='';
        start=0;
    }
  }
  if (start>0) {
    result.push(new ElfNumber(parseInt(temp), index, start, line.length-start))
  }
  return result;
}

export const answerPart2 = (input: string[]) => {
  const numbers = parseNumbers(input);
  const partNumbers = findPartNumbers(numbers, input);
  const gears = findGears(input, partNumbers);
  
  let result = 0;
  for (const adj of gears) {
    result += adj.first.value * adj.second.value;
  }
  return result;
}

const findGears = (input: string[], partNumbers: ElfNumber[]): any[] => {
  const result: any[] = [];
  for (let lineno=0; lineno<input.length; lineno++) {
    const line = input[lineno];
    for (let pos=0; pos<line.length; pos++) {
      if (line[pos] == '*') {
        const adjacent = findAdjacentParts(lineno, pos, partNumbers);
        if (adjacent.length == 2) {
          result.push({'first':adjacent[0], 'second':adjacent[1]})
        }
      }
    }
  }
  return result;
}

const findAdjacentParts = (line: number, pos: number, partNumbers: ElfNumber[]): ElfNumber[] => {
  const result: ElfNumber[] = [];
  for (const part of partNumbers) {
    if (part.touchesPoint(line,pos)) {
      result.push(part);
    }
  }
  return result;
}