export const meta = {
  id: "day-64-js",
  title: "Array.prototype.myMap using reduce",
  prompt: "Implementation of Array.prototype.map using Array.prototype.reduce.",
  explanation: [
    {
      line: "Array.prototype.myMap = function(callback)",
      desc: "Attaches a custom mapping function 'myMap' directly to the Array prototype chain so all array instances can inherit and invoke it."
    },
    {
      line: "return this.reduce((acc, item, index, array) => { ... }, []);",
      desc: "Uses the native 'reduce' method to accumulate a new array. The accumulator 'acc' is initialized as an empty array '[]' as the second argument to reduce."
    },
    {
      line: "acc.push(callback(item, index, array));",
      desc: "Invokes the 'callback' function on each element (passing item, index, and the original array). The result is pushed into the accumulator array 'acc'."
    },
    {
      line: "return acc;",
      desc: "Returns the updated accumulator array at the end of each iteration so it becomes the 'acc' in the next iteration."
    }
  ]
};

// @ts-ignore
Array.prototype.myMap = function(callback: any) {
  return this.reduce((acc: any[], item: any, index: number, array: any[]) => {
    acc.push(callback(item, index, array));
    return acc;
  }, []);
};

export function run() {
  const nums = [1, 2, 3, 4, 5];
  // @ts-ignore
  const doubled = nums.myMap((x: number) => x * 2);
  return `Input: [1, 2, 3, 4, 5].myMap(x => x * 2)\nOutput: ${JSON.stringify(doubled)}`;
}
