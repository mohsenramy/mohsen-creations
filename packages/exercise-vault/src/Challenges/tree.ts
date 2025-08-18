type TNode = {
  value: number;
  left: TNode | null;
  right: TNode | null;
};
const maxDepth = (root: TNode | null): number => {
  // Tree Challenge:
  // Given a binary tree, find its maximum depth.
  // The depth of a binary tree is the number of nodes along the longest path from the root node down to the farthest leaf node.

  if (!root) {
    return 0;
  }
  // let depthLeft = 0;
  // let depthRight = 0;
  // depthLeft = maxDepth(root.left);
  // depthRight = maxDepth(root.right);
  // return Math.max(depthLeft, depthRight) + 1;
  const { left, right } = root;
  return Math.max(maxDepth(left), maxDepth(right)) + 1;
};
