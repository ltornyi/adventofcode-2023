export const lcm = (numbers: number[]) => {
  return numbers.reduce((a, b) => a * b / gcd([a, b]));
}

function gcd(numbers: number[]) {
  return numbers.reduce((a, b) => {
      while (b) {
          let t = b;
          b = a % b;
          a = t;
      }
      return a;
  });
}