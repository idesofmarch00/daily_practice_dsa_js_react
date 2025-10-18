export const meta = {
  id: "day-09-js",
  title: "Curry Add",
  prompt: "Write a curried add function that supports add(2)(3).",
};

export function add(a: number) {
  return function addInner(b: number) {
    return a + b;
  };
}

export function run() {
  return ["Input: add(2)(3)", `Output: ${add(2)(3)}`].join("\n");
}
