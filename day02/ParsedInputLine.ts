import { Game } from "./Game";

export class ParsedInputLine {
  public index:number;
  public reveals:Game[];

  constructor(line:string) {
    const [gameString, revealString] = line.split(':');
    this.index = this.processGameString(gameString);
    this.reveals = this.processRevealString(revealString);
  }

  processGameString(gameString: string): number {
    return parseInt(gameString.slice(5))
  }

  processRevealString(revealString: string): Game[] {
    const reveals = revealString.split(';');
    const result: Game[] = [];
    for (const reveal of reveals) {
      result.push(this.processReveal(reveal))
    }
    return result;
  }

  processReveal(str: string): Game {
    const parts = str.split(',');
    let red=0;let green=0; let blue = 0;
    for (const part of parts) {
      const [num, color] = part.trim().split(' ');
      switch (color) {
        case 'red':
          red = parseInt(num);
          break;
        case 'green':
          green = parseInt(num);
          break;
        case 'blue':
          blue = parseInt(num);
          break;
        default:
          break;
      }
    }
    return new Game(red, green, blue);
  }
}