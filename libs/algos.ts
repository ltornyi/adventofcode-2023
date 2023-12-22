export type Point = {x: number, y: number}

//https://en.wikipedia.org/wiki/Shoelace_formula
export const shoelaceFormulaForArea = (vertices: Point[]) => {
  let doubleArea = 0;
  for (const [index, point] of vertices.entries()) {
    let nextPoint: Point;
    if (index < vertices.length - 1) {
      nextPoint = vertices[index + 1]
    } else {
      nextPoint = vertices[0]
    }
    doubleArea += point.x * nextPoint.y - nextPoint.x * point.y;
  }
  return doubleArea / 2;
}

export type PoligonBoundary = {
  point: Point,
  vertex: boolean
}

//https://en.wikipedia.org/wiki/Pick's_theorem
//Pick's theorem says area = interior points + (all boundary points / 2) - 1
export const polygonInteriorPointCountByPicksTheorem = (boundary: PoligonBoundary[]) => {
  const area = Math.abs(shoelaceFormulaForArea(boundary.filter(b => b.vertex).map(b => b.point)))
  const interiorPoints = area + 1 - boundary.length / 2;
  return interiorPoints;
}

export const leastCommonMultiple = (numbers: number[]) => {
  return numbers.reduce((a, b) => a * b / greatestCommonDenominator([a, b]));
}

function greatestCommonDenominator(numbers: number[]) {
  return numbers.reduce((a, b) => {
      while (b) {
          let t = b;
          b = a % b;
          a = t;
      }
      return a;
  });
}