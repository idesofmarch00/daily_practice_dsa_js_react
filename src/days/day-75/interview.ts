export const meta = {
  id: "day-75-interview",
  title: "Day 75 Interview Questions",
  prompt: "React Native Worklets and Expo Multi-threading architecture.",
};

export const questions = [
  {
    question: "Worklet thread in react native",
    answer: `React Native Worklets is a lightweight multithreading engine developed by Software Mansion that allows you to run JavaScript code in parallel across separate threads and runtimes without writing native code. Originally created as an internal component for libraries like React Native Reanimated and React Native Gesture Handler, it is available as a standalone package called \`react-native-worklets\`.

## The Core Threading Architecture

Standard React Native apps execute all your React state and business logic sequentially on a single thread—the React Native (RN) Runtime. If this thread undergoes heavy computations, the application UI lags.

The \`react-native-worklets\` library introduces isolated JavaScript contexts known as Worklet Runtimes. These runtimes do not share memory with the main RN thread or each other. Instead, they isolate operations into separate thread execution pools:

- **UI Runtime:** Runs on the main OS thread. It handles high-priority tasks requiring synchronous access to native layout and gestures.
- **Worker Runtimes:** Run on separate background threads. You can spawn multiple worker runtimes simultaneously to tackle intensive data processing, cryptography, or heavy computation without freezing the frame rate.

## Writing a Worklet

To designate a block of JavaScript to run outside of the primary RN Runtime, define a function and declare the \`"worklet";\` directive at its very top. A Babel plugin compiles the code so it can safely execute across runtimes.

\`\`\`javascript
import { createWorkletRuntime, runOnRuntime } from 'react-native-worklets';

// 1. Spin up a separate background worker thread
const backgroundWorker = createWorkletRuntime('heavy-tasks-worker');

// 2. Define the worklet function
function computeHeavyTask(data) {
  'worklet';
  // This executes entirely on the background worker thread
  const result = data * 42; 
  console.log(\`Computed: \${result}\`);
}

// 3. Dispatch the worklet function to your background runtime
runOnRuntime(backgroundWorker, computeHeavyTask)(100);
\`\`\`

## Passing Data Across Threads

Because Worklet Runtimes run in strictly isolated memory zones, moving information across threads requires specialized primitives:

- **Shared Values:** Thread-safe data boxes that can be read from or written to by any runtime without thread-locking downfalls.
- **runOnJS / scheduleOnRN:** Used inside a worklet to pass processing results back asynchronously to the React Main Thread. This is required to trigger standard React hook state updates or component re-renders.

## Performance Limitations

- **No Native I/O Access:** By default, worklets are designed for pure computation. They cannot out-of-the-box make HTTP requests (\`fetch\`), access local databases, or use native file systems (FS) unless explicit bridge modes or flags are enabled.
- **Data Copying Overhead:** Since runtimes don't share memory, passing huge object hierarchies or massive arrays into a worklet will force deep copy operations, risking memory and execution overhead.`,
  },
  {
    question: "rn has 3 threads ui js and shadow running in hermes , where does worklet thread run ?",
    answer: `To answer directly: a worklet does not run on a brand-new, magically generated OS thread of its own. Instead, depending on how you call it, a worklet runs on either the existing native UI Thread or on custom background Worker Threads created by the software engine.

To achieve this, the underlying engine spins up entirely separate, isolated secondary instances of Hermes (called Worklet Runtimes) on those threads.

## Where Worklets Execute in the 3-Thread Architecture

To visualize exactly where a worklet slots into the React Native runtime architecture, it helps to map out how they utilize your existing threads:

| Thread Name | What Typically Runs Here | What Worklet Runtime Runs Here? |
| --- | --- | --- |
| **JS Thread** | Primary Hermes Engine (React state, hooks, network calls, rendering logic) | None. (Worklets are designed explicitly to offload work away from this thread). |
| **Shadow Thread** | Yoga Layout Engine (calculating Flexbox dimensions and positioning) | None. This thread remains strictly reserved for layout calculations. |
| **UI Thread (Main Thread)** | Native OS rendering, layout painting, and native gesture event processing | **The UI Worklet Runtime.** A secondary Hermes instance runs directly inside the UI thread to execute animations and gesture updates instantly. |
| **Worker Threads (Custom)** | Native background modules (like I/O, heavy file operations, or crypto) | **Worker Worklet Runtimes.** If using \`react-native-worklets\`, it spins up a custom OS background thread running its own isolated Hermes VM. |

## The Two Ways Worklets Execute Under the Hood

### 1. On the UI Thread (Reanimated & Gestures default)

When you use a library like React Native Reanimated or React Native Gesture Handler, the worklets execute on the UI Thread.
- **How it works:** Software Mansion injects a secondary Hermes context directly into the native UI Thread.
- **Why?** Since it sits on the native UI thread, the worklet can synchronously read user gestures and mutate native view properties at exactly 60fps/120fps, bypassing the asynchronous bridge to the primary JS thread entirely.

### 2. On Dedicated Worker Threads (Standalone Multithreading)

When you use the standalone \`react-native-worklets\` library for data crunching (like heavy JSON parsing or cryptography), you manually create a worker.
- **How it works:** The library spawns a brand new OS Background Worker Thread.
- **Inside the thread:** It boots a completely blank, lightweight Hermes instance (a Worker Runtime).
- **Why?** This gives you Web-Worker-style multithreading. The worklet executes its heavy logic completely isolated on that background OS thread, meaning both your primary JS Thread and your native UI Thread remain totally unblocked and responsive.

## Summary Mental Model

Instead of thinking of a "worklet thread" as an independent core piece of React Native, think of a worklet as a portable piece of JS code. The worklet library spins up an extra instance of the Hermes engine wherever it needs to do heavy lifting—either attaching it to the native UI Thread for smooth graphics or giving it its own Background Thread for pure data processing.`,
  },
  {
    question: "since its isolated how it talks and returns data to js or ui thread",
    answer: `Because worklet runtimes are fully isolated memory zones, they cannot pass data by reference. Instead, they communicate across threads using two methods: Shared Values (for synchronous, low-latency state sharing) and Asynchronous Message Queues (for background thread processing).

Under the hood, all data passed between threads must go through a native C++ serialization layer called the JSI (JavaScript Interface).

## Method 1: Using Shared Values (Synchronous & Immediate)

Shared Values act as a thread-safe memory container. The data lives in a shared native C++ container that both the JS Thread and the UI Thread can look into.
- The JS Thread reads and writes to it asynchronously.
- The UI Thread can read and write to it synchronously (instantly).

**Code Example:**
\`\`\`javascript
import { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

function App() {
  // 1. live data container sitting in C++ memory
  const width = useSharedValue(100); 

  const animatedStyle = useAnimatedStyle(() => {
    'worklet';
    // 3. UI Thread instantly reads the value here to paint the box
    return { width: width.value }; 
  });

  const startAnimation = () => {
    // 2. JS Thread modifies it; UI Thread instantly registers the change
    width.value = withSpring(300); 
  };
}
\`\`\`

## Method 2: Asynchronous Message Queues (Background Workers)

When you use a background Worker Thread for heavy math or data processing, you cannot return data using a standard \`return\` statement. Because the threads are running at different times, you must dispatch the data back using asynchronous functions: \`runOnJS\` or \`runOnRuntime\`.

When you call these functions, the native layer serializes (deep copies) your arguments, pushes them into the target thread's message queue, and the target thread executes them on its next event loop tick.

**Code Example: Offloading heavy math and returning the result**
\`\`\`javascript
import { createWorkletRuntime, runOnRuntime, runOnJS } from 'react-native-worklets';
import React, { useState } from 'react';

// 1. Spawn the isolated background worker thread
const mathWorker = createWorkletRuntime('math-worker');

export default function App() {
  const [result, setResult] = useState(0);

  // 2. This function lives on the Main JS Thread
  const handleCalculationResult = (finalValue) => {
    setResult(finalValue); // Update standard React state
  };

  const triggerHeavyComputation = () => {
    const rawData = 5000;

    // 3. Execute the worklet on the background worker thread
    runOnRuntime(mathWorker, (data) => {
      'worklet';
      
      // Heavy calculations happen completely in isolation here...
      let calculatedValue = data * 2; 

      // 4. Send the result back to the main JS thread asynchronously
      runOnJS(handleCalculationResult)(calculatedValue);
    })(rawData);
  };
}
\`\`\`

## How Data Serialization Works (The Catch)

Because memory is isolated, any data moving between the JS Thread and a Worklet Runtime must be translated through C++ JSI primitives:

- **Primitive Data Types** (Strings, numbers, booleans) are copied instantly with near-zero overhead.
- **Objects and Arrays** undergo a deep copy. The engine walks through your object tree, converts it to C++ representations, and rebuilds a brand new object inside the target thread's Hermes engine.

**⚠️ Performance Warning:** Passing a massive 10MB JSON object or a heavily nested array to a worklet thread will cause a performance hitch. The time it takes for C++ to copy that massive block of memory across threads can easily cancel out the performance benefits of multithreading.`,
  },
  {
    question: "give complete animation code ... also explain the 100 inside runOnRuntime ... tell me diff btw runonJS and runOnRuntime ... explain multiple width written in this ... also tell me how the values are being sent or being shared",
    answer: `## 1. Complete, Working Animation Code

To make your snippet work, we need to import a layout component (\`Animated.View\`), standard React Native primitives (\`View\`, \`Button\`, \`StyleSheet\`), and wrap the return statement so it renders a UI.

\`\`\`javascript
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

export default function App() {
  // 1. Live data container sitting in C++ memory
  const width = useSharedValue(100);

  // 2. Animated style driven by the worklet on the UI thread
  const animatedStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      width: width.value,
    };
  });

  const startAnimation = () => {
    // 3. Trigger the spring animation. 
    // If it's already 300, we toggle it back to 100 for a repeatable demo.
    width.value = withSpring(width.value === 300 ? 100 : 300);
  };

  return (
    <View style={styles.container}>
      {/* Animated.View hooks directly into Reanimated's UI thread engine */}
      <Animated.View style={[styles.box, animatedStyle]} />
      
      <View style={styles.buttonContainer}>
        <Button title="Animate Box" onPress={startAnimation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  box: {
    height: 100,
    backgroundColor: '#3498db',
    borderRadius: 10,
  },
  buttonContainer: {
    marginTop: 40,
  },
});
\`\`\`

## 2. Explaining the Multiple \`width\` Variables

Even though the word \`width\` appears five times in that code, they represent three completely distinct concepts in JavaScript and Reanimated.

- **Line 7: \`const width = useSharedValue(100);\`**
This is a **JavaScript Variable Name**. It acts as a reference pointer to a thread-safe data container sitting in C++ memory. You could rename this variable to \`boxWidth\` or \`x\`, and the code would work exactly the same.
- **Line 13: \`width: width.value,\`**
The first \`width\` (Left side): This is a **UI Style Property Name**. It tells React Native's layout engine exactly which visual attribute of the box to change (the layout width of the view).
The second \`width\` (Right side): This refers right back to the JavaScript Variable from Line 7. Calling \`.value\` reads the raw numeric layout data (e.g., 100) out of the thread-safe container so the UI style can use it.
- **Line 19: \`width.value = withSpring(width.value === 300 ? 100 : 300);\`**
The third and fourth \`width\`: Both refer back to the JavaScript Variable from Line 7. Setting \`.value = withSpring(...)\` intercepts the assignment and tells the C++ engine to smoothly animate the number inside that container from its current value to the new target value (either 100 or 300).

## 3. Explaining the \`(100)\` inside \`runOnRuntime(...)\`

Let’s look back at how that function was executed:
\`\`\`javascript
runOnRuntime(backgroundWorker, computeHeavyTask)(100);
\`\`\`
This is an example of **currying** (a function that returns another function).
- \`runOnRuntime(backgroundWorker, computeHeavyTask)\` returns a brand new "scheduler" function wrapper.
- The trailing \`(100)\` executes that newly returned scheduler function and passes \`100\` as the parameter to your worklet.

Think of it as a two-step process written on a single line:
\`\`\`javascript
// Step 1: Prepare the schedule pointer
const scheduledFunction = runOnRuntime(backgroundWorker, computeHeavyTask);

// Step 2: Trigger it with the arguments
scheduledFunction(100); 
\`\`\`
Whatever you place in that final set of parentheses gets safely serialized, shipped over to the thread pool, and handed directly into your worklet function's arguments.

## 4. Difference Between \`runOnJS\` and \`runOnRuntime\`

Both utilities exist to pass code execution over thread boundaries, but they target completely opposite ends of the engine.

| Feature | \`runOnJS\` | \`runOnRuntime\` |
| --- | --- | --- |
| **Where do you call it?** | Inside a Worklet (UI Thread or Worker Thread). | Outside a worklet (Main React thread) or from another worklet. |
| **Where does it execute?** | On the Main React JS Thread. | On a Specific Target Runtime (like a custom background thread). |
| **Primary Use Case** | Stepping back into standard React world to update useState, hit endpoints, or fire non-UI side effects. | Offloading code away from the main thread onto a helper thread. |
| **Origin/Library** | Part of Reanimated core & react-native-worklets. | Part of the standalone react-native-worklets multi-threading library. |

**Visual Comparison:**
- \`runOnRuntime\`: Main React JS Thread ➡️ 🚀 ➡️ Background Worker Runtime (Offloading work).
- \`runOnJS\`: Background Worker/UI Runtime ➡️ ↩️ ➡️ Main React JS Thread (Reporting results back).

## 5. How Values are Moved or Shared Behind the Scenes

Because the React JS Thread, UI Thread, and Worker Threads live in totally isolated memory worlds, they cannot simply look at each other's local JavaScript variables. They pass data using two entirely different mechanisms under the hood: **Shared Values** and **Worklet Arguments/Closures**.

### Mechanism A: Shared Values (C++ Shared Box)

Shared Values do not serialize or copy data back and forth when you read or write to them.

\`\`\`
[ React JS Thread ]              [ Native UI Thread ]
       │                                  │
       ▼ (Asynchronous read/write)        ▼ (Synchronous read/write)
 ┌────────────────────────────────────────────────────────┐
 │                   C++ Native Memory                    │
 │               [ Shared Value Container ]               │
 └────────────────────────────────────────────────────────┘
\`\`\`
- **Allocation:** When you call \`useSharedValue(100)\`, Reanimated allocates a block of memory inside the C++ native layer, entirely outside of both Hermes JavaScript runtimes.
- **Accessing:** Both the JS thread and the UI thread are given a handle (pointer) to this exact same C++ memory address.
- **Updating:** When you run \`width.value = 300\` on the JS thread, it updates the number inside the C++ box. The UI Thread worklet constantly monitors this C++ box; the millisecond the number changes, the UI thread reads it out and instantly redraws the screen.

### Mechanism B: runOnRuntime and runOnJS (Serialization/Deep Copy)

When you use functions like \`runOnRuntime\` or \`runOnJS\` to pass functions and arguments across threads, data cannot be shared. It must be copied.

\`\`\`
[ Thread A: JS Thread ]                               [ Thread B: Worker Thread ]
 ┌───────────────────┐                                 ┌───────────────────────┐
 │ Object: {x: 10}   │                                 │ (Receives brand new)  │
 └─────────┬─────────┘                                 │ Object: {x: 10}       │
           │                                           └───────────▲───────────┘
           │ 1. Serialize into C++ primitives                      │
           ▼                                                       │
 ┌─────────────────────────────────────────────────────────────────┴───────────┐
 │                     C++ JSI (JavaScript Interface)                          │
 │         Deep copies the object data structure into the message queue        │
 └─────────────────────────────────────────────────────────────────────────────┘
\`\`\`
- **Capturing/Arguments:** When you write \`runOnRuntime(worker, worklet)(100)\` or use a variable inside a worklet, the Babel plugin flags those variables.
- **Serialization:** Before crossing the thread boundary, the C++ JSI (JavaScript Interface) freezes the data, walks through your objects/arrays, and transforms them into basic C++ data primitives (Strings, Doubles, Booleans).
- **The Thread Cross:** This serialized C++ data payload is pushed into an operation message queue assigned to the destination thread.
- **Deserialization:** When the target thread (e.g., the Worker or Main JS thread) picks up the message from its queue, its local Hermes engine unpacks those C++ primitives and reconstructs a brand new object in its own local memory pool.`,
  },
];
