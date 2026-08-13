export const meta = {
  id: "day-74-io",
  title: "Day 74 Input-Output Questions",
  prompt: "Test your understanding of JavaScript hoisting, execution order, this-binding, coercion, and closures with code snippets.",
};

export const questions = [
  {
    question: "1. What is the output of this hoisting snippet?\n\n```js\nvar a = 10;\nfunction foo() {\n  console.log(a);\n  var a = 20;\n  console.log(a);\n}\nfoo();\n```",
    answer: `**Output:**
\`\`\`
undefined
20
\`\`\`

### Explanation:
Inside the function \`foo()\`, the variable \`a\` is declared using \`var\`. Variable declarations using \`var\` are hoisted to the top of their enclosing function scope, but their assignments are not. 

Therefore, the function is interpreted as:
\`\`\`js
function foo() {
  var a; // hoisted (initialized to undefined)
  console.log(a); // logs undefined
  a = 20; // assignment remains in place
  console.log(a); // logs 20
}
\`\`\``,
  },
  {
    question: "2. What is the output of the event loop execution order snippet?\n\n```js\nconsole.log('Start');\nsetTimeout(() => console.log('Timeout'), 0);\nPromise.resolve().then(() => console.log('Promise'));\nconsole.log('End');\n```",
    answer: `**Output:**
\`\`\`
Start
End
Promise
Timeout
\`\`\`

### Explanation:
1. Synchronous operations run first: \`console.log('Start')\` and \`console.log('End')\` are executed immediately.
2. Microtasks (like \`Promise.resolve().then()\`) are executed next, right after the current call stack clears and before rendering or rendering-phase tasks. Thus, \`'Promise'\` is logged.
3. Macrotasks (like \`setTimeout\` callbacks) are processed in subsequent event loop iterations. Thus, \`'Timeout'\` is logged last.`,
  },
  {
    question: "3. What is the output of the closures in loop snippet?\n\n```js\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}\nfor (let j = 0; j < 3; j++) {\n  setTimeout(() => console.log(j), 100);\n}\n```",
    answer: `**Output:**
\`\`\`
3
3
3
0
1
2
\`\`\`

### Explanation:
- In the first loop, \`var\` declares a function-scoped (or globally-scoped) variable. By the time the asynchronous \`setTimeout\` callbacks run (100ms later), the loop has finished and the single shared variable \`i\` has reached \`3\`.
- In the second loop, \`let\` creates block-scoped bindings. Each iteration of the loop gets its own fresh block-scoped copy of \`j\`, capturing the correct values \`0\`, \`1\`, and \`2\` in their closures.`,
  },
  {
    question: "4. What is the output of the arrow function 'this' snippet?\n\n```js\nconst obj = {\n  name: 'Antigravity',\n  regularFunc: function() {\n    console.log(this.name);\n  },\n  arrowFunc: () => {\n    console.log(this.name);\n  }\n};\nobj.regularFunc();\nobj.arrowFunc();\n```",
    answer: `**Output:**
\`\`\`
Antigravity
undefined
\`\`\`

### Explanation:
- Normal functions define their own \`this\` dynamically based on how they are called (invocation context). Calling \`obj.regularFunc()\` binds \`this\` to \`obj\`, so \`this.name\` is \`'Antigravity'\`.
- Arrow functions do not bind their own \`this\`. Instead, they inherit \`this\` lexically from their surrounding enclosing scope. Since \`obj\` is not inside a function, the outer lexical scope is the global window/global scope where \`name\` is not defined (or undefined).`,
  },
  {
    question: "5. What is the output of array mapping with parseInt?\n\n```js\nconst result = ['1', '7', '11'].map(parseInt);\nconsole.log(result);\n```",
    answer: `**Output:**
\`\`\`
[1, NaN, 3]
\`\`\`

### Explanation:
\`Array.prototype.map\` passes three arguments to its callback: \`value\`, \`index\`, and \`array\`.
\`parseInt\` accepts two arguments: \`string\` and \`radix\` (base).

When passing \`parseInt\` directly to \`map\`, the arguments are mapped like this:
1. \`parseInt('1', 0)\` -> Radix \`0\` defaults to base-10: Output is \`1\`.
2. \`parseInt('7', 1)\` -> Base \`1\` is invalid (radix must be between 2 and 36): Output is \`NaN\`.
3. \`parseInt('11', 2)\` -> Base \`2\` (binary): \`'11'\` in binary translates to \`3\`.`,
  },
  {
    question: "6. What is the output of the object reference mutation snippet?\n\n```js\nlet userA = { name: 'Alice' };\nlet userB = userA;\nuserB.name = 'Bob';\nconsole.log(userA.name);\nuserB = { name: 'Charlie' };\nconsole.log(userA.name);\n```",
    answer: `**Output:**
\`\`\`
Bob
Bob
\`\`\`

### Explanation:
1. Object assignment copies the memory reference, not the object. Therefore, \`userA\` and \`userB\` point to the exact same object in the heap.
2. Mutating \`userB.name = 'Bob'\` alters the shared object, so \`userA.name\` becomes \`'Bob'\`.
3. Reassigning \`userB = { name: 'Charlie' }\` points \`userB\` to a brand new object, but leaves the original object referenced by \`userA\` unchanged. Thus, \`userA.name\` remains \`'Bob'\`.`,
  },
  {
    question: "7. What is the output of type coercion with arithmetic operators?\n\n```js\nconsole.log(1 + '2');\nconsole.log(1 - '2');\nconsole.log(true + true);\nconsole.log(+'10' + 5);\n```",
    answer: `**Output:**
\`\`\`
12
-1
2
15
\`\`\`

### Explanation:
1. \`1 + '2'\`: The binary \`+\` operator triggers string concatenation if either operand is a string. \`1\` is coerced to \`'1'\` yielding \`'12'\`.
2. \`1 - '2'\`: The binary \`-\` operator only performs subtraction. Both operands are coerced to numbers, yielding \`1 - 2 = -1\`.
3. \`true + true\`: Addition coerces booleans to numbers (\`true -> 1\`), yielding \`1 + 1 = 2\`.
4. \`+'10' + 5\`: The unary \`+\` operator immediately converts \`'10'\` to the number \`10\`, yielding \`10 + 5 = 15\`.`,
  },
  {
    question: "8. What is the output of the standard check on types?\n\n```js\nconsole.log(typeof null);\nconsole.log(typeof undefined);\nconsole.log(null === undefined);\nconsole.log(null == undefined);\n```",
    answer: `**Output:**
\`\`\`
object
undefined
false
true
\`\`\`

### Explanation:
1. \`typeof null\` returns \`'object'\` due to a historic bug in the initial JavaScript implementation where objects had tag type \`0\` and \`null\` was represented as a null pointer (all zeros).
2. \`typeof undefined\` returns \`'undefined'\`.
3. \`null === undefined\` is \`false\` because they are different primitive types.
4. \`null == undefined\` is \`true\` because the abstract equality operator coerces them to be equal.`,
  },
  {
    question: "9. What is the output of the spread vs rest operators?\n\n```js\nconst numbers = [1, 2, 3];\nconst add = (x, y, z) => x + y + z;\n\nconsole.log(add(...numbers));\n\nconst sum = (...args) => args.reduce((a, b) => a + b, 0);\nconsole.log(sum(1, 2, 3, 4));\n```",
    answer: `**Output:**
\`\`\`
6
10
\`\`\`

### Explanation:
1. \`...numbers\` inside the call to \`add\` acts as the **spread operator**, expanding the array into three separate arguments (\`1, 2, 3\`).
2. \`...args\` in the declaration of \`sum\` acts as the **rest parameter**, gathering all incoming comma-separated arguments into a single indexable array \`[1, 2, 3, 4]\`.`,
  },
  {
    question: "10. What is the output of the logical assignment operators?\n\n```js\nlet x = 0;\nlet y = 10;\n\nx ||= y;\nconsole.log(x);\n\nlet a = 0;\nlet b = 10;\na ??= b;\nconsole.log(a);\n```",
    answer: `**Output:**
\`\`\`
10
0
\`\`\`

### Explanation:
1. The logical OR assignment (\`x ||= y\`) assigns \`y\` to \`x\` if \`x\` is **falsy** (e.g. \`0\`, \`""\`, \`false\`, \`null\`, \`undefined\`). Since \`0\` is falsy, \`x\` becomes \`10\`.
2. The nullish coalescing assignment (\`a ??= b\`) assigns \`b\` to \`a\` only if \`a\` is **nullish** (\`null\` or \`undefined\`). Since \`0\` is falsy but not nullish, \`a\` is not reassigned and remains \`0\`.`,
  },
];
