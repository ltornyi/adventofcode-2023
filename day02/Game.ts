export class Game {
  private _red:number;
  private _green:number;
  private _blue: number;

  public get red() {
    return this._red;
  };

  public get green() {
    return this._green;
  };

  public get blue() {
    return this._blue;
  };

  constructor(r:number, g:number, b:number) {
    this._red=r;
    this._green=g;
    this._blue=b;
  }

  isPossible(reveals: Game[]): boolean {
    let result = true;
    for (const reveal of reveals) {
      if (reveal.red > this.red || reveal.green > this.green || reveal.blue > this.blue) {
        result = false;
        break;
      }
    }
    return result;
  }

}