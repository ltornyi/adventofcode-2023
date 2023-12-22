export const parseLine = (line:string): number[] => line.split(' ').map(e => parseInt(e))

export const calcDiffs = (numbers: number[]): number[] => {
  const diffs: number[] = []
  for (const [index,n] of numbers.slice(1).entries()) {
    diffs.push(n - numbers[index])
  }
  return diffs;
}

const allZero = (numbers: number[]) => numbers.filter(e => e !== 0).length === 0

const buildPyramid = (numbers: number[]): number[][] => {
  const pyramid = [numbers];
  let diffs = calcDiffs(numbers);
  while (!allZero(diffs)) {
    pyramid.push(diffs);
    diffs = calcDiffs(diffs);
  }
  return pyramid;
}

export const prediction = (numbers: number[]): number => {
  const pyramid = buildPyramid(numbers);
  let result = 0;
  for (const series of pyramid) {
    result += series[series.length - 1]
  }
  return result;
}

export const backPrediction = (numbers: number[]): number => {
  const pyramid = buildPyramid(numbers);
  let diff = 0;
  for (let i=pyramid.length-1; i>0; i--) {
    diff = pyramid[i][0] - diff;
  }
  return pyramid[0][0] - diff;
}

export const answerPart1 = (input: string[]): number => {
  let result = 0;
  for (const line of input) {
    result += prediction(parseLine(line))
  }
  return result;
}

export const answerPart2 = (input: string[]): number => {
  let result = 0;
  for (const line of input) {
    result += backPrediction(parseLine(line))
  }
  return result;
}
