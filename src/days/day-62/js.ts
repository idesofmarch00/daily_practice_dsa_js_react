export const meta = {
  id: "day-62-js",
  title: "Array.prototype.some",
  prompt: "Simplified V8 internal implementation of Array.prototype.some.",
  explanation: [
    {
      line: "Array.prototype.some = function (callback, thisArg)",
      desc: "Registers the method directly on the Array prototype chain so all array instances inherit it. It accepts a callback tester function and an optional thisArg parameter to set the execution context."
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
      line: "if (callback.call(thisArg, O[k], k, O))",
      desc: "Executes the callback function, binding the context to 'thisArg'. Passes the current element value O[k], current index k, and the array object O as arguments."
    },
    {
      line: "return true;",
      desc: "If the callback yields a truthy result for ANY element, it immediately returns true and stops further loop iteration (short-circuits)."
    },
    {
      line: "return false;",
      desc: "If the loop finishes checking all elements and none of them return truthy, the function returns false, indicating no elements match the condition."
    }
  ]
};

// @ts-ignore
Array.prototype.some = function (callback: any, thisArg?: any) {
  const O = Object(this);
  const len = O.length >>> 0;

  for (let k = 0; k < len; k++) {
    if (k in O) {
      if (callback.call(thisArg, O[k], k, O)) {
        return true; // ✅ SHORT-CIRCUIT on first true
      }
    }
  }
  return false; // No matches
};

export function run() {
  const arr = [1, 2, 3, 4, 5];
  const hasEven = arr.some((val) => val % 2 === 0);
  return `Input: [1, 2, 3, 4, 5].some(val => val % 2 === 0)\nOutput: ${hasEven}`;
}
