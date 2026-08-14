export const meta = {
  id: "day-75-io",
  title: "Day 75 IO",
  prompt: "Worklet Runtimes vs Main JS Thread.",
};

export const questions = [
  {
    question: "Difference between runOnJS and runOnRuntime?",
    answer: "runOnJS sends execution back to the main React JS thread, typically to update React state. runOnRuntime offloads code from the main thread onto a specific background worker runtime."
  }
];
