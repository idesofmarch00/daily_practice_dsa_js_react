export const meta = {
  id: "day-10-js",
  title: "Compose Functions",
  prompt: "Compose small functions from right to left.",
};

type Fn = (value: number) => number;

export function compose(...functions: Fn[]) {
  return (value: number) => functions.reduceRight((result, fn) => fn(result), value);
}

export function run() {
  const double = (value: number) => value * 2;
  const increment = (value: number) => value + 1;
  const transform = compose(double, increment);

  return ["Input: compose(double, increment)(3)", `Output: ${transform(3)}`].join("\n");
}
