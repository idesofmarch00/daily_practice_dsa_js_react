export const meta = {
  id: "day-08-dsa",
  title: "Queue Using Stacks",
  prompt: "Implement queue enqueue and dequeue behavior using two stacks.",
};

class QueueUsingStacks<T> {
  private inbox: T[] = [];
  private outbox: T[] = [];

  enqueue(value: T) {
    this.inbox.push(value);
  }

  dequeue() {
    if (this.outbox.length === 0) {
      while (this.inbox.length) {
        this.outbox.push(this.inbox.pop() as T);
      }
    }

    return this.outbox.pop();
  }
}

export function run() {
  const queue = new QueueUsingStacks<number>();
  queue.enqueue(10);
  queue.enqueue(20);
  queue.enqueue(30);

  return [
    "Operations: enqueue 10, enqueue 20, enqueue 30, dequeue twice",
    `Output: ${JSON.stringify([queue.dequeue(), queue.dequeue()])}`,
  ].join("\n");
}
