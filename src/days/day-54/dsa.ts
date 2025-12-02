export const meta = {
  id: "day-54-dsa",
  title: "Habit Range Total",
  prompt: "Calculate a range total from habit counts.",
};

export function containsDuplicate(values: number[]) {
  return new Set(values).size !== values.length;
}

export function run() {
  const values = [3, 9, 4, 3, 8];

  return [`Input: ${JSON.stringify(values)}`, `Output: ${containsDuplicate(values)}`].join("\n");
}
