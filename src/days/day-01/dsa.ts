export const meta = {
  id: "day-01-dsa",
  title: "Two Sum",
  prompt: "Given an array of numbers and a target, return the indexes of two numbers that add up to the target.",
};

export function twoSum(nums: number[], target: number) {
  const seen = new Map<number, number>();

  for (let index = 0; index < nums.length; index += 1) {
    const needed = target - nums[index];

    if (seen.has(needed)) {
      return [seen.get(needed), index];
    }

    seen.set(nums[index], index);
  }

  return [];
}

export function run() {
  const nums = [2, 7, 11, 15];
  const target = 9;
  const result = twoSum(nums, target);

  return [
    `Input: nums = ${JSON.stringify(nums)}, target = ${target}`,
    `Output: ${JSON.stringify(result)}`,
    "Explanation: nums[0] + nums[1] equals 9.",
  ].join("\n");
}
