export const meta = {
  id: "day-44-js",
  title: "Safe Parse Api Payload",
  prompt: "Handle invalid JSON with a safe fallback.",
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
