export class ElfNumber {
  private _value: number;
  private _schematicLineNum: number;
  private _indexInLine: number;
  private _length: number;

  constructor(val: number, linenum: number, index: number, length: number) {
    this._value=val;
    this._schematicLineNum=linenum;
    this._indexInLine=index;
    this._length=length;
  }

  public get value() {return this._value;}

  touchesNonsymbol(line: string, nonsymbol: string): boolean {
    const start = Math.max(this._indexInLine - 1, 0);
    const end = Math.min(this._indexInLine + this._length + 1, line.length - 1);
    const part = line.slice(start,end);
    for (const ch of part) {
      if (ch != nonsymbol) {
        return true;
      }
    }
    return false;
  }

  isPartNumber(schematic: string[], nonsymbol: string): boolean {
    // console.log('Checking ',this._value)
    //same line
    const sameline = schematic[this._schematicLineNum];
    if (this._indexInLine>0 && sameline[this._indexInLine-1] != nonsymbol) {
      return true;
    }
    if (this._indexInLine + this._length < sameline.length) {
      if (sameline[this._indexInLine + this._length] != nonsymbol) {
        return true;
      }
    }
    //above:
    if (this._schematicLineNum > 0) {
      const above = schematic[this._schematicLineNum - 1];
      if (this.touchesNonsymbol(above, nonsymbol)) {
        return true;
      }
    }
    //below:
    if (this._schematicLineNum < schematic.length - 1) {
      const below = schematic[this._schematicLineNum + 1];
      if (this.touchesNonsymbol(below, nonsymbol)) {
        return true;
      }
    }
    return false;
  }

  touchesPoint(line: number, pos: number): boolean {
    //same line
    if (line == this._schematicLineNum) {
      if (pos == this._indexInLine - 1 || pos == this._indexInLine + this._length) {
        return true;
      }
    }
    //is it above
    if (line == this._schematicLineNum - 1) {
      if (pos >= this._indexInLine - 1 && pos <= this._indexInLine + this._length) {
        return true;
      }
    }
    //is it below
    if (line == this._schematicLineNum + 1) {
      if (pos >= this._indexInLine - 1 && pos <= this._indexInLine + this._length) {
        return true;
      }
    }
    return false;
  }
}