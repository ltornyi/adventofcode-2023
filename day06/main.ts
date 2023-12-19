type ParsedInput = {
  times:number[],
  distances:number[]
}

export const answerPart1 = (input:string[]): number => {
  let result = 1;
  const {times, distances} = parseInput(input)
  for ( const [index, time] of times.entries()) {
    const distance = distances[index];
    result *= calcNumberOfWaysToBeat(time, distance)
  }
  return result;
}

export const calcNumberOfWaysToBeat = (time: number, distance: number): number => {
  //x = time to hold the button. speed = x, remaining time = time-x
  //solve x*(time-x) > distance if x is an integer
  //  x^2 - time*x + distance < 0 
  //  x1 = (time - sqrt(time^2 - 4*distance))/2
  //  x2 = (time + sqrt(time^2 - 4*distance))/2
  //
  const D = time*time - 4*distance
  if (D < 0) {
    return 0;
  }
  const sqrtD = Math.sqrt(D);
  const x1 = (time - sqrtD) / 2;
  const x2 = (time + sqrtD) / 2;
  //number of integers strictly between x1 and x2:
  const upper = x2 == Math.floor(x2) ? x2 - 1: Math.floor(x2)
  const lower = x1 == Math.floor(x1) ? x1 + 1: Math.ceil(x1)
  return upper - lower + 1
}

const parseInput = (input:string[]): ParsedInput => {
  const times = parseInputLine(input[0])
  const distances = parseInputLine(input[1])
  return {times, distances}
}

const parseInputLine = (line: string): number[] => {
  return line.split(':')[1].split(' ').filter(e => e).map(e => parseInt(e))
}

export const answerPart2 = (input:string[]): number => {
  let result = 1;
  const {times, distances} = parseInput2(input)
  for ( const [index, time] of times.entries()) {
    const distance = distances[index];
    result *= calcNumberOfWaysToBeat(time, distance)
  }
  return result;
}

const parseInput2 = (input:string[]): ParsedInput => {
  const times = parseInputLine2(input[0])
  const distances = parseInputLine2(input[1])
  return {times, distances}
}

const parseInputLine2 = (line: string): number[] => {
  return [parseInt(line.split(':')[1].split(' ').filter(e => e).reduce((prev, curr) => prev+curr))]
}