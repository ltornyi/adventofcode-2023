import { Game } from "./Game";
import { ParsedInputLine } from "./ParsedInputLine"

export const answerPart1 = (input: string[], game: Game): number => {
  let result = 0;
  for (const line of input) {
    const parsedLine = new ParsedInputLine(line);
    if (game.isPossible(parsedLine.reveals)) {
      result += parsedLine.index;
    }
  }
  return result;
}

export const answerPart2 = (input: string[]): number => {
  let result = 0; 
  for (const line of input) {
    const parsedLine = new ParsedInputLine(line);
    let r=0; let g=0; let b=0;
    for (const reveal of parsedLine.reveals) {
      r=Math.max(r, reveal.red)
      g=Math.max(g, reveal.green)
      b=Math.max(b, reveal.blue)
    }
    result += r*g*b;
  }
  return result;
}