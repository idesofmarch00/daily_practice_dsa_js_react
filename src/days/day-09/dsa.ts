export const meta = {
  id: "day-09-dsa",
  title: "Binary Tree Level Order",
  prompt: "Return the values of a binary tree level by level.",
};

type TreeNode = {
  value: number;
  left?: TreeNode;
  right?: TreeNode;
};

export function levelOrder(root: TreeNode) {
  const result: number[][] = [];
  const queue: TreeNode[] = [root];

  while (queue.length) {
    const levelSize = queue.length;
    const level: number[] = [];

    for (let i = 0; i < levelSize; i += 1) {
      const node = queue.shift() as TreeNode;
      level.push(node.value);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(level);
  }

  return result;
}

export function run() {
  const tree = {
    value: 1,
    left: { value: 2, left: { value: 4 } },
    right: { value: 3 },
  };

  return [`Input tree root: 1`, `Output: ${JSON.stringify(levelOrder(tree))}`].join("\n");
}
