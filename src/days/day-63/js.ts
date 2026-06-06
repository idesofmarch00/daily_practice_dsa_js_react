export const meta = {
  id: "day-63-js",
  title: "Array.prototype.every",
  prompt: "Simplified V8 internal implementation of Array.prototype.every.",
  explanation: [
    {
      line: "Array.prototype.every = function (callback, thisArg)",
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
      line: "if (!callback.call(thisArg, O[k], k, O))",
      desc: "Executes the callback function, binding the context to 'thisArg'. Passes the current element value O[k], current index k, and the array object O as arguments. If the callback returns a falsy value (negated by !), it enters the condition."
    },
    {
      line: "return false;",
      desc: "If the callback yields a falsy result for ANY element, it immediately returns false and stops further loop iteration (short-circuits)."
    },
    {
      line: "return true;",
      desc: "If the loop finishes checking all elements and all of them returned truthy, the function returns true, indicating every element matches the condition."
    }
  ]
};

// @ts-ignore
Array.prototype.every = function (callback: any, thisArg?: any) {
  const O = Object(this);
  const len = O.length >>> 0;

  for (let k = 0; k < len; k++) {
    if (k in O) {
      if (!callback.call(thisArg, O[k], k, O)) {
        return false; // ✅ SHORT-CIRCUIT on first false
      }
    }
  }
  return true; // All match
};

export function run() {
  const arr = [2, 4, 6, 8];
  const allEven = arr.every((val) => val % 2 === 0);
  return `Input: [2, 4, 6, 8].every(val => val % 2 === 0)\nOutput: ${allEven}`;
}
