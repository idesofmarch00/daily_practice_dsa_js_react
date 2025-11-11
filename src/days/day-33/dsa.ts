export const meta = {
  id: "day-33-dsa",
  title: "Reorder Zeroes Last",
  prompt: "Preserve non-zero order and place zeroes at the end.",
};

export function rotateRight<T>(values: T[], steps: number) {
  const offset = steps % values.length;
  return [...values.slice(-offset), ...values.slice(0, values.length - offset)];
}

export function run() {
  const values = [1, 2, 3, 4, 5];
  const steps = 2;

  return [`Input: values = ${JSON.stringify(values)}, k = ${steps}`, `Output: ${JSON.stringify(rotateRight(values, steps))}`].join("\n");
}
