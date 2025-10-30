export const meta = {
  id: "day-21-dsa",
  title: "Rotate Tasks Right",
  prompt: "Rotate a task list to the right by k positions.",
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
