const DIGITS = ['0','1','2','3','4','5','6','7','8','9'];
const SPELLED_DIGITS = ['one','two','three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

const isDigit = (ch: string): boolean => {
  return DIGITS.includes(ch)
}

const digitsInLine = (line: string): string => {
  let result = ''
  for (const ch of line) {
    if (isDigit(ch)) {
      result += ch;
    }
  }
  return result
}

export const processInput = (input: string[]) : number => {
  let result = 0;
  for (const line of input) {
    const digits = digitsInLine(line);
    const lineResult = parseInt(digits[0] + digits[digits.length-1]);
    result += lineResult;
  }
  return result;
}

const getSpelledDigit = (segment: string) => {
  let result = '';
  for (const spelled of SPELLED_DIGITS) {
    if (segment.startsWith(spelled)) {
      result = spelled;
      return result;
    }
  }
  return result;
}

const digitsInLine2 = (line: string): string => {
  let result = '';
  let index = 0;
  while (index <= line.length-1) {
    const ch = line[index];
    if (isDigit(ch)) {
      result += ch;
    } else {
      const spelledDigit = getSpelledDigit(line.slice(index));
      if (spelledDigit.length > 0) {
        result += (SPELLED_DIGITS.indexOf(spelledDigit) + 1).toString();
      }
    }
    index++;
  }
  return result
}

export const processInput2 = (input: string[]) : number => {
  let result = 0;
  for (const line of input) {
    const digits = digitsInLine2(line);
    const lineResult = parseInt(digits[0] + digits[digits.length-1]);
    result += lineResult;
  }
  return result;
}