export const meta = {
  id: "day-23-dsa",
  title: "Rotate Queue Snapshot",
  prompt: "Rotate a queue snapshot to the right.",
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
