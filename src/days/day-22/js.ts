export const meta = {
  id: "day-22-js",
  title: "Count Votes",
  prompt: "Build a frequency object for vote values.",
};

export function chunkArray<T>(values: T[], size: number) {
  const chunks: T[][] = [];

  for (let index = 0; index < values.length; index += size) {
    chunks.push(values.slice(index, index + size));
  }

  return chunks;
}

export function run() {
  const values = [1, 2, 3, 4, 5];
  const size = 2;

  return [`Input: ${JSON.stringify(values)}, size = ${size}`, `Output: ${JSON.stringify(chunkArray(values, size))}`].join("\n");
}
