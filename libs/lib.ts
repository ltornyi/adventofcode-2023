import fs from 'fs';

export const DIGITS = ['0','1','2','3','4','5','6','7','8','9']

export const isDigit = (ch:string) => DIGITS.includes(ch)

export const readInputFile = (filename: string) => {
  return fs.readFileSync(filename).toString().split("\n");
}

export const equalTest = (tstMsg: string, inp1: any, inp2: any) => {
  if (inp1 === inp2) {
    console.log(tstMsg + ': passed');
  } else {
    console.log(tstMsg + `: FAILED, got ${inp1}, expected ${inp2}`);
  }
}