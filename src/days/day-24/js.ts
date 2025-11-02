export const meta = {
  id: "day-24-js",
  title: "Count Array Values",
  prompt: "Return a map of each value to its frequency.",
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
