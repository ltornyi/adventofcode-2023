import { Point, PoligonBoundary, polygonInteriorPointCountByPicksTheorem } from "../libs/algos";

export enum Direction {
  NORTH, EAST, SOUTH, WEST
}
type Tile = {
  char: string,
  connects: Direction[]
}
const VPIPE: Tile = {char:'|', connects: [Direction.NORTH, Direction.SOUTH]};
const HPIPE: Tile = {char:'-', connects: [Direction.EAST, Direction.WEST]};
const NEPIPE: Tile = {char:'L', connects: [Direction.NORTH, Direction.EAST]};
const NWPIPE: Tile = {char:'J', connects: [Direction.NORTH, Direction.WEST]};
const SWPIPE: Tile = {char:'7', connects: [Direction.SOUTH, Direction.WEST]};
const SEPIPE: Tile = {char:'F', connects: [Direction.SOUTH, Direction.EAST]};
const GROUND: Tile = {char:'.', connects: []};
const START: Tile = {char:'S', connects: [Direction.NORTH, Direction.EAST, Direction.SOUTH, Direction.WEST]}

const TILES = [VPIPE, HPIPE, NEPIPE, NWPIPE, SWPIPE, SEPIPE, GROUND, START];

export const charToTile = (char: string) => {
  const result = TILES.find(t => t.char === char)
  if (!result) {
    throw new Error(`${char} is not a tile`);
  }
  return result
}

const hasConnectionInDir = (tile: Tile, dir: Direction) => tile.connects.includes(dir)

const oppositeDir = (dir: Direction): Direction => {
  switch (dir) {
    case Direction.NORTH:
      return Direction.SOUTH
    case Direction.EAST:
      return Direction.WEST;
    case Direction.SOUTH:
      return Direction.NORTH;
    case Direction.WEST:
      return Direction.EAST;
  }
}

export const samePoint = (p1: Point, p2: Point) => p1.x === p2.x && p1.y === p2.y

export const calcAdjacentPoint = (maxX: number, maxY: number, point: Point, dir: Direction): Point|undefined => {
  switch (dir) {
    case Direction.NORTH:
      if (point.x > 0) {
       return {x: point.x - 1, y:point.y}
      }
      return undefined;
    case Direction.EAST:
      if (point.y < maxY) {
        return {x:point.x, y:point.y+1}
      }
      return undefined;
    case Direction.SOUTH:
      if (point.x < maxX) {
        return {x:point.x + 1, y:point.y}
      }
      return undefined;
    case Direction.WEST:
      if (point.y > 0) {
        return {x:point.x, y:point.y-1}
      }
      return undefined;
  }
}

const tileOfPoint = (input: string[], point: Point): Tile => charToTile(input[point.x][point.y])

/*
   ---->y
  |
  |
  V
  x
*/
export const findStart = (input: string[]): Point => {
  const x = input.findIndex(line => line.includes(START.char));
  const y = input[x].indexOf(START.char);
  return {x,y}
}

export const findTwoConnectedDirs = (input: string[], point: Point): Direction[] => {
  const result: Direction[] = [];
  const thisTile = charToTile(input[point.x][point.y]);
  const maxX = input.length - 1;
  const maxY = input[0].length - 1;
  for (const thisDir of thisTile.connects) {
    const adjacentPoint = calcAdjacentPoint(maxX, maxY, point, thisDir)
    if (adjacentPoint && hasConnectionInDir(tileOfPoint(input, adjacentPoint), oppositeDir(thisDir))) {
      result.push(thisDir)
    }
  }
  if (result.length !== 2) {
    throw new Error(`For point (${point.x},${point.y}) exactly two connections needed, but found ${result.length}`);
  }
  return result;
}

export const pointsOfTheLoop = (input: string[]): PoligonBoundary[] => {
  const boundary: PoligonBoundary[]= [];
  const maxX = input.length - 1;
  const maxY = input[0].length - 1;
  let startPoint = findStart(input);
  let [currentDir, otherDir] = findTwoConnectedDirs(input, startPoint);
  //it's a vertex if the two directions are not opposites
  boundary.push({point:startPoint, vertex:oppositeDir(currentDir) !== otherDir});
  let currentPoint = calcAdjacentPoint(maxX, maxY, startPoint, currentDir);
  if (!currentPoint) {
    throw new Error("this is not possible");
  }
  while (!samePoint(currentPoint, startPoint)) {
    const twoDirs = findTwoConnectedDirs(input, currentPoint);
    const oppositeOfCurrentDir = oppositeDir(currentDir)
    currentDir = twoDirs.filter(d => d !== oppositeOfCurrentDir)[0];
    otherDir = twoDirs.filter(d => d !== currentDir)[0]
    //it's a vertex if the two directions are not opposites
    boundary.push({point:currentPoint, vertex:oppositeDir(currentDir) !== otherDir});
    currentPoint = calcAdjacentPoint(maxX, maxY, currentPoint, currentDir);
    if (!currentPoint) {
      throw new Error("this is not possible");
    }
  }
  return boundary;
}

export const answerPart1 = (input: string[]): number => {
  const boundary = pointsOfTheLoop(input);
  return boundary.length / 2;
}

export const answerPart2 = (input: string[]): number => {
  const boundary = pointsOfTheLoop(input);
  return polygonInteriorPointCountByPicksTheorem(boundary);
}