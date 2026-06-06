export const meta = {
  id: "day-61-js",
  title: "Array.prototype.find",
  prompt: "Simplified V8 internal implementation of Array.prototype.find.",
  explanation: [
    {
      line: "Array.prototype.find = function (callback, thisArg)",
      desc: "Registers the method directly on the Array prototype chain so all array instances inherit it. It accepts a callback callback and an optional thisArg parameter to set the execution context."
    },
    {
      line: "const O = Object(this);",
      desc: "Converts the 'this' context (the array) into a standard JavaScript object. In the V8 engine, this ensures abstract 'ToObject' conversion is satisfied, letting us safely interact with primitive wrappers or objects."
    },
    {
      line: "const len = O.length >>> 0;",
      desc: "Converts the length property to a 32-bit unsigned integer using the zero-fill right shift (>>>) operator. This ensures negative values, floats, or undefined are normalized to a valid integer."
    },
    {
      line: "for (let k = 0; k < len; k++)",
      desc: "Iterates through the indices of the array sequentially from 0 up to len - 1."
    },
    {
      line: "if (k in O)",
      desc: "Checks whether the index 'k' actually exists as a property in the object. This handles sparse arrays (e.g. [1, , 3]) so that callback functions are not executed on unassigned index holes."
    },
    {
      line: "const kValue = O[k];",
      desc: "Extracts the array item at index k."
    },
    {
      line: "if (callback.call(thisArg, kValue, k, O))",
      desc: "Executes the callback function, manually binding the 'this' context of the callback to 'thisArg'. Passes the current element, current index, and the whole array object as arguments."
    },
    {
      line: "return kValue;",
      desc: "If the callback yields a truthy result, it immediately returns the current element and stops further loop iteration (short-circuits on the first match)."
    },
    {
      line: "return undefined;",
      desc: "If the loop finishes checking all elements and none of them satisfy the callback, the function returns undefined as per specification."
    }
  ]
};

// @ts-ignore
Array.prototype.find = function (callback: any, thisArg?: any) {
  const O = Object(this); // ToObject conversion
  const len = O.length >>> 0; // Convert to uint32

  for (let k = 0; k < len; k++) {
    if (k in O) { // Check if index exists (sparse arrays)
      const kValue = O[k];
      if (callback.call(thisArg, kValue, k, O)) {
        return kValue; // ✅ Return FIRST match
      }
    }
  }
  return undefined; // Not found
};

export function run() {
  const arr = [10, 20, 30, 40, 50];
  const found = arr.find((val) => val > 25);
  return `Input: [10, 20, 30, 40, 50].find(val => val > 25)\nOutput: ${found}`;
}
