export const meta = {
  id: "day-70-js",
  title: "Smart Polling with setTimeout",
  prompt: "Compare setInterval and recursive setTimeout, and implement a smart polling pattern with error handling and cleanup.",
  explanation: [
    {
      line: "setInterval(async () => { await fetchData(); }, 5000);",
      desc: "❌ Bad practice for async tasks: setInterval fires callbacks at fixed intervals regardless of how long the async operation takes, which can cause requests to overlap and stack up if the network is slow."
    },
    {
      line: "setTimeout(async () => { await fetchData(); poll(); }, 5000);",
      desc: "✅ Good practice: A recursive setTimeout ensures that the next request is scheduled only after the current asynchronous task has fully completed."
    },
    {
      line: "try { await fetchData(); } catch (error) { ... }",
      desc: "Protects the polling cycle. Catching errors prevents the execution thread from crashing and ensures that the next poll is still scheduled even if a request fails."
    },
    {
      line: "if (!isPolling) return;",
      desc: "Provides a clean termination mechanism to stop the recursive cycle (preventing memory leaks or stray requests when a component unmounts)."
    }
  ]
};

export class SmartPoller {
  private log: string[] = [];
  private isPolling = true;
  private pollCount = 0;

  // Mock async fetch
  private async fetchData() {
    this.pollCount++;
    this.log.push(`[Poll #${this.pollCount}] Fetching data...`);
    // Simulate minor network delay
    await new Promise(resolve => setTimeout(resolve, 10));
    
    if (this.pollCount === 2) {
      throw new Error("Simulated network timeout");
    }
    
    this.log.push(`[Poll #${this.pollCount}] Data fetched successfully.`);
  }

  async startPolling(maxPolls = 3) {
    this.log.push("Starting smart poll...");
    
    const poll = async () => {
      if (!this.isPolling) {
        this.log.push("Polling stopped (cleaned up).");
        return;
      }

      try {
        await this.fetchData();
      } catch (error: any) {
        this.log.push(`[Error Handling] Polling error caught: ${error.message}`);
      }

      if (this.pollCount >= maxPolls) {
        this.stop();
      }

      // Schedule next poll in 10ms for simulation
      await new Promise(resolve => setTimeout(resolve, 10));
      await poll();
    };

    await poll();
  }

  stop() {
    this.isPolling = false;
  }

  getLog() {
    return this.log;
  }
}

export async function run() {
  const poller = new SmartPoller();
  await poller.startPolling(3);
  return poller.getLog().join("\n");
}
