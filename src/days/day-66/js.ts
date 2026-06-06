export const meta = {
  id: "day-66-js",
  title: "Non-Blocking Async Processing",
  prompt: "Process a large dataset in chunks, yielding control to the event loop to keep the UI responsive.",
  explanation: [
    {
      line: "async generateReportAsync(transactions, chunkSize = 1000)",
      desc: "Declares an asynchronous method. The 'async' keyword ensures the function returns a Promise and permits the use of 'await' within the loops."
    },
    {
      line: "for (let i = 0; i < transactions.length; i += chunkSize)",
      desc: "Iterates through the dataset by moving the pointer index 'i' forward by 'chunkSize' in each step."
    },
    {
      line: "const chunk = transactions.slice(i, i + chunkSize);",
      desc: "Extracts a smaller segment (chunk) of the transactions array to process in a single synchronous block."
    },
    {
      line: "for (const tx of chunk) { ... }",
      desc: "Loops synchronously over the small chunk. This performs CPU-bound aggregations (calculating revenue and updating categories) without blocking the thread for too long."
    },
    {
      line: "await new Promise(resolve => setTimeout(resolve, 0));",
      desc: "Yields execution back to the browser's event loop. By scheduling a macrotask via 'setTimeout(..., 0)', we let the browser handle pending user input, clicks, and UI frame repaints before resuming processing the next chunk."
    }
  ]
};

export class AnalyticsDashboard {
  private log: string[] = [];

  showProgress(progress: number) {
    this.log.push(`Progress: ${Math.round(progress)}%`);
  }

  calculateProductScore(tx: any) {
    return tx.amount * 1.2;
  }

  updateTopProducts(topProducts: any[], tx: any, score: number) {
    topProducts.push({ product: tx.product, score });
    topProducts.sort((a, b) => b.score - a.score);
    if (topProducts.length > 2) {
      topProducts.pop();
    }
  }

  displayReport(report: any) {
    this.log.push(`Final Report - Revenue: $${report.totalRevenue}, Top: ${report.topProducts.map((p: any) => p.product).join(', ')}`);
  }

  getLog() {
    return this.log;
  }

  async generateReportAsync(transactions: any[], chunkSize = 2) {
    this.log.push('Generating report...');
    this.showProgress(0);

    const report = {
      totalRevenue: 0,
      byCategory: {} as Record<string, number>,
      topProducts: [] as any[]
    };

    for (let i = 0; i < transactions.length; i += chunkSize) {
      const chunk = transactions.slice(i, i + chunkSize);

      for (const tx of chunk) {
        report.totalRevenue += tx.amount;

        if (!report.byCategory[tx.category]) {
          report.byCategory[tx.category] = 0;
        }
        report.byCategory[tx.category] += tx.amount;

        const productScore = this.calculateProductScore(tx);
        this.updateTopProducts(report.topProducts, tx, productScore);
      }

      const progress = ((i + chunkSize) / transactions.length) * 100;
      this.showProgress(Math.min(progress, 100));

      await new Promise(resolve => setTimeout(resolve, 0));
    }

    this.displayReport(report);
    return report;
  }
}

export async function run() {
  const transactions = [
    { product: "Laptop", amount: 1000, category: "Tech" },
    { product: "Phone", amount: 500, category: "Tech" },
    { product: "Book", amount: 20, category: "Media" },
    { product: "Shirt", amount: 40, category: "Apparel" },
    { product: "Coffee", amount: 5, category: "Food" }
  ];

  const dashboard = new AnalyticsDashboard();
  await dashboard.generateReportAsync(transactions, 2);
  return dashboard.getLog().join("\n");
}
