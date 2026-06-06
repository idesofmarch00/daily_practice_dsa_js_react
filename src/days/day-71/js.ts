export const meta = {
  id: "day-71-js",
  title: "Debounce and Throttle",
  prompt: "Implement debounce and throttle rate-limiting helper utilities with standard browser simulation and explanations.",
  explanation: [
    {
      line: "let timerId; ... clearTimeout(timerId); timerId = setTimeout(...)",
      desc: "Debounce mechanism: Clears any previously scheduled timer if a new call comes in within the delay window. Only executes the function once calls stop for the duration of the delay."
    },
    {
      line: "func.apply(this, args);",
      desc: "Executes the target function with the correct context ('this') and arguments list."
    },
    {
      line: "if (!inThrottle) { ... inThrottle = true; setTimeout(() => inThrottle = false, limit); }",
      desc: "Throttle mechanism: Executes the function immediately on the first call, blocks subsequent calls by setting 'inThrottle' to true, and clears the block after the specified limit time."
    }
  ]
};

export function debounce(func: Function, delay: number) {
  let timerId: any;

  return function(this: any, ...args: any[]) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

export function throttle(func: Function, limit: number) {
  let inThrottle = false;

  return function(this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

export async function run() {
  const log: string[] = [];
  
  // Debounce Demo
  log.push("--- Debounce Simulation (Delay: 50ms) ---");
  const debouncedFunc = debounce((val: string) => {
    log.push(`Debounced execution: ${val}`);
  }, 50);

  debouncedFunc("A");
  debouncedFunc("B");
  debouncedFunc("C"); // Only this last call should run
  log.push("Called A, B, C immediately. Waiting 80ms...");
  await new Promise(r => setTimeout(r, 80));

  // Throttle Demo
  log.push("\n--- Throttle Simulation (Limit: 50ms) ---");
  const throttledFunc = throttle((val: string) => {
    log.push(`Throttled execution: ${val}`);
  }, 50);

  throttledFunc("1"); // Should execute immediately
  throttledFunc("2"); // Blocked
  throttledFunc("3"); // Blocked
  log.push("Called 1, 2, 3 immediately. Waiting 80ms...");
  await new Promise(r => setTimeout(r, 80));

  throttledFunc("4"); // Should execute (limit period passed)
  log.push("Called 4. Waiting 10ms...");
  await new Promise(r => setTimeout(r, 10));

  return log.join("\n");
}
