export const meta = {
  id: "day-73-js",
  title: "Long Polling Client/Server",
  prompt: "Implement a long polling pattern for real-time client-server communication using simulated Express and fetch flows.",
  explanation: [
    {
      line: "waitingClients.push(res);",
      desc: "Holds the HTTP response object open by storing it in an array instead of sending a response immediately, keeping the connection suspended."
    },
    {
      line: "res.status(204).end();",
      desc: "Triggers a 204 (No Content) status code if the safety timeout (e.g. 30 seconds) expires. This tells the client that the connection closed gracefully without new updates, and that it should start a new poll request."
    },
    {
      line: "startLongPoll(); // Trigger the next connection request immediately.",
      desc: "Triggers the next fetch cycle immediately after a successful response or timeout. This ensures a persistent open connection channel."
    },
    {
      line: "setTimeout(startLongPoll, 5000);",
      desc: "Ensures that if the server goes down (resulting in a network catch block error), the client backs off and waits 5 seconds before retrying, preventing infinite rapid loop crashes."
    }
  ]
};

// Simulation of Express Server + Fetch Client for Long Polling
class MockLongPollSystem {
  private log: string[] = [];
  private currentData = "Initial Data";
  private waitingClients: { resolve: (val: any) => void; reject: (err: any) => void }[] = [];
  private pollCount = 0;

  updateData(newData: string) {
    this.currentData = newData;
    this.log.push(`[Server] Data updated to: "${newData}"`);
    
    const activeClients = [...this.waitingClients];
    this.waitingClients = [];
    
    activeClients.forEach(client => {
      client.resolve({ status: 200, data: { data: this.currentData } });
    });
  }

  async handleIncomingPollRequest(): Promise<any> {
    this.pollCount++;
    this.log.push(`[Server] Received poll request #${this.pollCount}. Holding connection...`);

    return new Promise((resolve) => {
      const clientRecord = { resolve, reject: () => {} };
      this.waitingClients.push(clientRecord);

      setTimeout(() => {
        const index = this.waitingClients.indexOf(clientRecord);
        if (index > -1) {
          this.waitingClients.splice(index, 1);
          this.log.push(`[Server] Poll request #${this.pollCount} connection timed out (204 No Content).`);
          resolve({ status: 204 });
        }
      }, 30);
    });
  }

  async startLongPoll(iterations = 3) {
    for (let i = 0; i < iterations; i++) {
      try {
        const response = await this.handleIncomingPollRequest();

        if (response.status === 200) {
          this.log.push(`[Client] Received new updates: "${response.data.data}"`);
        } else if (response.status === 204) {
          this.log.push(`[Client] Connection closed by timeout. Instantly reconnecting...`);
        }
      } catch (error) {
        this.log.push(`[Client] Network error! Reconnecting in 5ms...`);
        await new Promise(r => setTimeout(r, 5));
      }
    }
  }

  getLog() {
    return this.log;
  }
}

export async function run() {
  const system = new MockLongPollSystem();

  const pollingPromise = system.startLongPoll(3);

  await new Promise(r => setTimeout(r, 15));
  system.updateData("New Message from Server");

  await pollingPromise;

  return system.getLog().join("\n");
}
