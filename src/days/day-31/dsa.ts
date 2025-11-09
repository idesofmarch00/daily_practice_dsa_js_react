export const meta = {
  id: "day-31-dsa",
  title: "Move Empty Slots",
  prompt: "Move all zero values to the end of an array.",
};

export function linearSearch(values: number[], target: number) {
  for (let index = 0; index < values.length; index += 1) {
    if (values[index] === target) return index;
  }

  return -1;
}

export function run() {
  const values = [14, 8, 22, 5, 19];
  const target = 5;

  return [`Input: values = ${JSON.stringify(values)}, target = ${target}`, `Output: ${linearSearch(values, target)}`].join("\n");
}
