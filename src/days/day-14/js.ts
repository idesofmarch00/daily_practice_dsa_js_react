export const meta = {
  id: "day-14-js",
  title: "Normalize Label Text",
  prompt: "Capitalize every word in a label string.",
};

export function debounce<T extends unknown[]>(fn: (...args: T) => string, _delay: number) {
  let latest = "";

  return (...args: T) => {
    latest = fn(...args);
    return latest;
  };
}

export function run() {
  const search = debounce((term: string) => `Searching for ${term}`, 300);
  search("rea");
  search("react");

  return ["Input: debounce search called twice", `Output: ${search("react router")}`].join("\n");
}
