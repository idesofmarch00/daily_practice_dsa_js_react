export const meta = {
  id: "day-08-js",
  title: "Object Entries to Query String",
  prompt: "Convert a flat object into a URL query string.",
};

export function toQueryString(params: Record<string, string | number | boolean>) {
  return Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join("&");
}

export function run() {
  const input = { search: "react router", page: 2, solved: true };

  return [`Input: ${JSON.stringify(input)}`, `Output: ${toQueryString(input)}`].join("\n");
}
