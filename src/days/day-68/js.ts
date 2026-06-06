export const meta = {
  id: "day-68-js",
  title: "Cooperative Scheduling with requestIdleCallback",
  prompt: "Process data during browser idle periods to minimize impact on user experience.",
  explanation: [
    {
      line: "requestIdleCallback(processChunk);",
      desc: "Schedules a task to run during the browser's idle periods, ensuring background work doesn't block critical frame rendering or animation."
    },
    {
      line: "while (deadline.timeRemaining() > 0 && index < transactions.length)",
      desc: "Loops only while the browser has unused time left in the current frame (measured in milliseconds by deadline.timeRemaining())."
    },
    {
      line: "const tx = transactions[index++];",
      desc: "Processes the transaction at the current index and increments the index pointer."
    },
    {
      line: "if (index < transactions.length) { requestIdleCallback(processChunk); }",
      desc: "If there is still data remaining but the current frame's idle time has expired, it schedules the next chunk to be processed in the next idle period."
    }
  ]
};

// Simulation of cooperative scheduler for synchronous terminal environment
class MockIdleDeadline {
  constructor(private timeToUse: number) {}
  timeRemaining() {
    const remaining = this.timeToUse;
    this.timeToUse = Math.max(0, this.timeToUse - 1);
    return remaining;
  }
}

export class IdleReportGenerator {
  private log: string[] = [];

  generateReportIdle(transactions: any[]) {
    const report = { totalRevenue: 0, byCategory: {} as Record<string, number>, topProducts: [] as any[] };
    let index = 0;
    this.log.push("Scheduling report generation on browser idle queue...");

    const processChunk = (deadline: { timeRemaining: () => number }) => {
      let processedInThisChunk = 0;
      while (deadline.timeRemaining() > 0 && index < transactions.length) {
        const tx = transactions[index++];
        report.totalRevenue += tx.amount;
        if (!report.byCategory[tx.category]) {
          report.byCategory[tx.category] = 0;
        }
        report.byCategory[tx.category] += tx.amount;
        processedInThisChunk++;
      }

      this.log.push(`Idle Callback Fired: Processed ${processedInThisChunk} items. Current Index: ${index}/${transactions.length}`);

      if (index < transactions.length) {
        const nextDeadline = new MockIdleDeadline(2); // Simulates 2 timeRemaining cycles
        processChunk(nextDeadline);
      } else {
        this.log.push(`Report Finished. Total Revenue: $${report.totalRevenue}`);
      }
    };

    const firstDeadline = new MockIdleDeadline(2);
    processChunk(firstDeadline);
  }

  getLog() {
    return this.log;
  }
}

export function run() {
  const transactions = [
    { product: "Laptop", amount: 1000, category: "Tech" },
    { product: "Phone", amount: 500, category: "Tech" },
    { product: "Book", amount: 20, category: "Media" },
    { product: "Shirt", amount: 40, category: "Apparel" },
    { product: "Coffee", amount: 5, category: "Food" }
  ];

  const generator = new IdleReportGenerator();
  generator.generateReportIdle(transactions);
  return generator.getLog().join("\n");
}
