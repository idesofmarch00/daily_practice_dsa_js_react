export const meta = {
  id: "day-03-dsa",
  title: "Binary Search",
  prompt: "Find the index of a target value inside a sorted array.",
};

export function binarySearch(nums: number[], target: number) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const middle = Math.floor((left + right) / 2);

    if (nums[middle] === target) return middle;
    if (nums[middle] < target) left = middle + 1;
    else right = middle - 1;
  }

  return -1;
}

export function run() {
  const nums = [1, 3, 5, 7, 9, 11];
  const target = 7;

  return [
    `Input: nums = ${JSON.stringify(nums)}, target = ${target}`,
    `Output: ${binarySearch(nums, target)}`,
  ].join("\n");
}
