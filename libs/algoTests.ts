import { Point, shoelaceFormulaForArea } from "./algos";
import { equalTest } from "./lib";

const testShowlace = (msg: string, vertices: Point[], expected: number) => {
  const result = shoelaceFormulaForArea(vertices);
  equalTest(msg, result, expected)
}

const testsForShoelace = () => {
  testShowlace('Shoelace Wikipedia example1', [{x:1, y:6}, {x:3, y:1}, {x:7, y:2}, {x:4, y:4}, {x:8, y:5}], 16.5)
  testShowlace('Shoelace Wikipedia example2', [{x:3, y:1}, {x:7, y:2}, {x:4, y:4}, {x:8, y:6}, {x:1, y:7}], 20.5)
  testShowlace('Shoelace Wikipedia example3', [{x:7, y:2}, {x:4, y:4}, {x:8, y:6}], -7)
  testShowlace('Shoelace Wikipedia example4', [{x:3, y:1}, {x:4, y:3}, {x:7, y:2}], -3.5)
}

testsForShoelace()