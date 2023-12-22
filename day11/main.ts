import { Point } from "../libs/algos";

const GALAXY = '#'

const lineIsAllSpace = (line: string) => line.replace(/\./g,'').length === 0

const expandRows = (input: string[]) => {
  const rowsAdded:string[] = [];
  for (const line of input) {
    rowsAdded.push(line);
    if (lineIsAllSpace(line)) {
      rowsAdded.push(line);
    }
  }
  return rowsAdded
}

const expandColumns = (input: string[]) => {
  const height = input.length;
  const width = input[0].length;
  const columnsAdded: string[] = Array(height).fill('');
  for (let i=0; i<width; i++) {
    const currentCol = input.map(row => row[i]).join('');
    for (let row=0; row<height; row++) {
      columnsAdded[row] += currentCol[row]
    }
    if (lineIsAllSpace(currentCol)) {
      for (let row=0; row<height; row++) {
        columnsAdded[row] += currentCol[row]
      }
    }
  }
  return columnsAdded;
}

export const expandUniverse = (input: string[]) => {
  const rowsAdded = expandRows(input);
  const columnsAdded = expandColumns(rowsAdded);
  return columnsAdded;
}

const mapGalaxies = (input: string[]): Point[] => {
  const height = input.length;
  const width = input[0].length;
  const result: Point[] = [];
  for (let x=0; x<height; x++) {
    for (let y=0; y<width; y++) {
      if (input[x][y] === GALAXY) {
        result.push({x,y})
      }
    }
  }
  return result
}

const stepDistance = (p1: Point, p2: Point) => Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y)

const sumAllStepDistance = (map: Point[]) => {
  let sum = 0;
  for (const [index, p1] of map.entries()) {
    for (const p2 of map.slice(index+1)) {
      sum += stepDistance(p1, p2)
    }
  }
  return sum;
}

export const answerPart1 = (input: string[]) => {
  const expandedUniverse = expandUniverse(input);
  const mappedGalaxies = mapGalaxies(expandedUniverse);
  return sumAllStepDistance(mappedGalaxies)
}