export const meta = {
  id: "day-07-dsa",
  title: "Reverse a Linked List",
  prompt: "Reverse a singly linked list and print the result.",
};

type ListNode = {
  value: number;
  next: ListNode | null;
};

function fromArray(values: number[]) {
  return values.reduceRight<ListNode | null>((next, value) => ({ value, next }), null);
}

function toArray(head: ListNode | null) {
  const values: number[] = [];
  let current = head;

  while (current) {
    values.push(current.value);
    current = current.next;
  }

  return values;
}

export function reverseList(head: ListNode | null) {
  let previous: ListNode | null = null;
  let current = head;

  while (current) {
    const next = current.next;
    current.next = previous;
    previous = current;
    current = next;
  }

  return previous;
}

export function run() {
  const input = [1, 2, 3, 4];
  const reversed = toArray(reverseList(fromArray(input)));

  return [`Input: ${JSON.stringify(input)}`, `Output: ${JSON.stringify(reversed)}`].join("\n");
}
