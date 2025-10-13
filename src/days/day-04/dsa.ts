export const meta = {
  id: "day-04-dsa",
  title: "Merge Sorted Arrays",
  prompt: "Merge two sorted arrays into one sorted array.",
};

export function mergeSortedArrays(left: number[], right: number[]) {
  const merged: number[] = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) merged.push(left[i++]);
    else merged.push(right[j++]);
  }

  return [...merged, ...left.slice(i), ...right.slice(j)];
}

export function run() {
  const left = [1, 4, 7];
  const right = [2, 3, 8, 10];

  return [
    `Input: ${JSON.stringify(left)} and ${JSON.stringify(right)}`,
    `Output: ${JSON.stringify(mergeSortedArrays(left, right))}`,
  ].join("\n");
}
