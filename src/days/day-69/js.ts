export const meta = {
  id: "day-69-js",
  title: "RAIL Budget Chunk Sizing",
  prompt: "Dynamically calculate and monitor task chunk sizes to stay under the 50ms RAIL budget.",
  explanation: [
    {
      line: "const chunkSize = Math.floor(MAX_TASK_TIME / estimatedTimePerItem);",
      desc: "Calculates the maximum number of items that can be processed in a single chunk based on the 50ms RAIL idle budget and estimated time per item."
    },
    {
      line: "const start = performance.now();",
      desc: "Measures the high-resolution timestamp before processing the chunk to start tracking execution time."
    },
    {
      line: "items.slice(i, i + chunkSize).forEach(process);",
      desc: "Slices the array to extract the computed chunk size and executes the processing logic synchronously on those items."
    },
    {
      line: "const elapsed = performance.now() - start;",
      desc: "Calculates the total time spent in milliseconds executing the synchronous chunk. Used to monitor if we exceeded our 50ms budget."
    },
    {
      line: "await new Promise(r => setTimeout(r, 0));",
      desc: "Yields back to the event loop, giving the browser time to process user events before taking on the next chunk."
    }
  ]
};

export class BudgetProcessor {
  private log: string[] = [];

  async processWithBudget(items: any[], chunkSize: number) {
    this.log.push(`Starting processing. Total items: ${items.length}, Chunk size: ${chunkSize}`);

    for (let i = 0; i < items.length; i += chunkSize) {
      const start = performance.now();

      // Process chunk
      const chunk = items.slice(i, i + chunkSize);
      chunk.forEach(item => {
        // Simulate minor busy loop work to consume ~2ms per item
        const end = performance.now() + 2;
        while (performance.now() < end) {}
      });

      const elapsed = performance.now() - start;
      this.log.push(`Processed chunk starting at index ${i}: took ${elapsed.toFixed(1)}ms (RAIL Budget: 50ms)`);

      await new Promise(r => setTimeout(r, 0));
    }
  }

  getLog() {
    return this.log;
  }
}

export async function run() {
  const MAX_TASK_TIME = 50; // ms
  const estimatedTimePerItem = 2; // ms
  const chunkSize = Math.floor(MAX_TASK_TIME / estimatedTimePerItem); // 25 items

  const items = Array.from({ length: 60 }, (_, i) => `item-${i}`);
  const processor = new BudgetProcessor();
  await processor.processWithBudget(items, chunkSize);
  return processor.getLog().join("\n");
}
