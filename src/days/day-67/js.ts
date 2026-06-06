export const meta = {
  id: "day-67-js",
  title: "Multi-Threading with Web Workers",
  prompt: "Offload heavy computation to a separate background worker thread to keep the main thread fully responsive.",
  explanation: [
    {
      line: "const worker = new Worker('analytics-worker.js');",
      desc: "Instantiates a new Web Worker from a separate script file. This starts a new system thread separate from the main execution thread."
    },
    {
      line: "worker.postMessage({ transactions });",
      desc: "Sends data (e.g. transactions array) to the worker thread. Data is serialized using the Structured Clone algorithm."
    },
    {
      line: "self.addEventListener('message', (e) => { ... })",
      desc: "Listens for incoming messages inside the worker thread. Once received, it triggers the CPU-intensive processing loop."
    },
    {
      line: "self.postMessage({ type: 'progress', value });",
      desc: "Sends progress updates back to the main thread while the computation is still running."
    },
    {
      line: "self.postMessage({ type: 'complete', report });",
      desc: "Sends the final report payload back to the main thread upon completing the heavy loop computation."
    },
    {
      line: "worker.addEventListener('message', (e) => { ... })",
      desc: "Listens on the main thread for updates sent from the worker thread, updating the progress bar and enabling/disabling UI buttons."
    }
  ]
};

// Simulation of Worker for the synchronous terminal environment
class MockWorker {
  private listeners: Record<string, Function[]> = {};

  addEventListener(event: string, callback: Function) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(callback);
  }

  postMessage(data: any) {
    const { transactions } = data;
    const log: string[] = ["Main Thread: Dispatched transactions to Worker."];

    const report = {
      totalRevenue: 0,
      byCategory: {} as Record<string, number>,
      topProducts: [] as any[]
    };

    const calculateProductScore = (tx: any) => tx.amount * 1.2;
    const updateTopProducts = (topProducts: any[], tx: any, score: number) => {
      topProducts.push({ product: tx.product, score });
      topProducts.sort((a, b) => b.score - a.score);
      if (topProducts.length > 2) {
        topProducts.pop();
      }
    };

    log.push("Worker Thread: Heavy computation started...");
    for (let i = 0; i < transactions.length; i++) {
      const tx = transactions[i];
      report.totalRevenue += tx.amount;

      if (!report.byCategory[tx.category]) {
        report.byCategory[tx.category] = 0;
      }
      report.byCategory[tx.category] += tx.amount;

      const productScore = calculateProductScore(tx);
      updateTopProducts(report.topProducts, tx, productScore);

      if ((i + 1) % 2 === 0 || i === transactions.length - 1) {
        const progress = ((i + 1) / transactions.length) * 100;
        log.push(`Worker -> Main (Progress Update): ${Math.round(progress)}%`);
        this.trigger('message', { data: { type: 'progress', value: progress } });
      }
    }

    log.push("Worker Thread: Heavy computation complete. Dispatching report.");
    this.trigger('message', { data: { type: 'complete', report } });
    return log;
  }

  private trigger(event: string, data: any) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(cb => cb(data));
    }
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

  const logs: string[] = [];
  const worker = new MockWorker();

  worker.addEventListener('message', (e: any) => {
    if (e.data.type === 'progress') {
      logs.push(`Main Thread: Received Progress = ${Math.round(e.data.value)}%`);
    } else if (e.data.type === 'complete') {
      logs.push(`Main Thread: Completed! Revenue = $${e.data.report.totalRevenue}`);
    }
  });

  const workerLogs = worker.postMessage({ transactions });
  return [...workerLogs, ...logs].join("\n");
}
