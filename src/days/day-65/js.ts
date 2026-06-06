export const meta = {
  id: "day-65-js",
  title: "Array.prototype.myFilter using reduce",
  prompt: "Implementation of Array.prototype.filter using Array.prototype.reduce.",
  explanation: [
    {
      line: "Array.prototype.myFilter = function(callback)",
      desc: "Registers a custom filtering function 'myFilter' directly on the Array prototype chain."
    },
    {
      line: "return this.reduce((acc, item, index, array) => { ... }, []);",
      desc: "Leverages the native 'reduce' method to build a filtered array. The accumulator 'acc' starts as an empty array '[]'."
    },
    {
      line: "if (callback(item, index, array)) { acc.push(item); }",
      desc: "Invokes the 'callback' condition. If the condition evaluates to a truthy value, the current element 'item' is appended to the accumulator array 'acc'."
    },
    {
      line: "return acc;",
      desc: "Returns the accumulated array to be passed onto the next element's iteration."
    }
  ]
};

// @ts-ignore
Array.prototype.myFilter = function(callback: any) {
  return this.reduce((acc: any[], item: any, index: number, array: any[]) => {
    if (callback(item, index, array)) {
      acc.push(item);
    }
    return acc;
  }, []);
};

export function run() {
  const nums = [1, 2, 3, 4, 5];
  // @ts-ignore
  const evens = nums.myFilter((x: number) => x % 2 === 0);
  return `Input: [1, 2, 3, 4, 5].myFilter(x => x % 2 === 0)\nOutput: ${JSON.stringify(evens)}`;
}
