function merge(firstArr, secondArr, m, n) {
  let i = 0;
  let j = 0;
  let k = 0;
  
  let newArr = [];

  while (i <= m - 1 && j <= n - 1){
    if (firstArr[i] < secondArr[j]) {
      newArr[k++] = firstArr[i++];
    } else {
      newArr[k++] = secondArr[j++];
    };
  };

  for (i; i <= m - 1; i++) {
    newArr[k++] = firstArr[i];
  };

  for (j; j <= n - 1; j++) {
    newArr[k++] = secondArr[j];
  };

  return newArr;
};


function mergeSort(arr) {
  let sortedArr = [];

if (arr.length < 2) return arr;
  else {
    let leftArr = arr.slice(0, arr.length / 2);
    let rightArr = arr.slice(arr.length / 2);
    let sortedLeft = mergeSort(leftArr);
    let sortedRight = mergeSort(rightArr);
    let merged = merge(sortedLeft, sortedRight, sortedLeft.length, sortedRight.length);
    for (let i = 0; i < merged.length; i++) {
      sortedArr.push(merged[i]);
    }
  }
  return sortedArr;
}

const Node = (data = null, left = null, right = null) => {
  return { data, left, right }
};

const Tree = (arr) => {
  const sortedArr = mergeSort(arr);
  const noDuplicateArr = [...new Set(sortedArr)];

  root = buildTree(noDuplicateArr, 0, noDuplicateArr.length - 1);

  const print = () => prettyPrint(root);

  const insert = (root, value) => {
    if (value === root.data) return;

    if (value < root.data && root.left) {
      root = insert(root.left, value);
    } else if (value > root.data && root.right) {
      root = insert(root.right, value);
    } else {
      if (value < root.data) {
        root.left = Node(value);
      } else {
        root.right = Node(value);
      }
    }
  }

  const del = (value) => {
    root = deleteNode(root, value)
  }

  const deleteNode = (node, value) => {
    if (node === null) {
      return node
    }

    if (value < node.data) {
      node.left = deleteNode(node.left, value)
    } else if (value > node.data) {
      node.right = deleteNode(node.right, value)
    } else {
      if(!node.left && !node.right) {
        return null
      }
      if(!node.left) {
        return node.right;
      } else if (!node.right) {
        return node.left;
      }
      node.data = minValue(node.right)
      node.right = deleteNode(node.right, node.data);
    }
    return node
  }

  const minValue = (node) => {
    let minV = node.data;
    while (node.left !== null) {
      minV = node.left.data;
      root = node.left;
    }
    return minV;
  } 

  const find = (value) => {
    let node = root;
    while(node) {
      if (value === node.data || node.data === null) {
        return node;
      } else if (value < node.data) {
        node = node.left
      } else {
        node = node.right
      }
    }
  }

  const findRec = (root, value) => {
    if (root.data === value || root.data === null) {
      return root
    }

    if (value < root.data && root.left) {
      return findRec(root.left, value);
    } else if (value > root.data && root.right) {
      return findRec(root.right, value);
    } else {
      return;
    }
   }

   const levelOrder = (fn) => {
    if (root === null) return;

    let q = [];
    let traversed = []
    q.push(root);
    while(q.length > 0) {
      let current = q[0];
      if (!fn) {
        traversed.push(current.data);
      } else {
        let newNum = fn(current.data)
        traversed.push(newNum);
      }
      if (current.left !== null) {
        q.push(current.left);
      }
      if (current.right !== null) {
        q.push(current.right);
      }
      q.shift();
    }
    return traversed
   }

   const preOrder = (root, fn, orderedArr = []) => {
    if (root === null) return;
    if (!fn) {
      orderedArr.push(root.data);
    } else {
      let newNum = fn(root.data)
      orderedArr.push(newNum);
    }
    preOrder(root.left, fn, orderedArr)
    preOrder(root.right, fn, orderedArr)
    return orderedArr;
   }

   const inOrder = (root, fn, orderedArr = []) => {
    if (root === null) return;
    inOrder(root.left, fn, orderedArr)
    if (!fn) {
      orderedArr.push(root.data);
    } else {
      let newNum = fn(root.data)
      orderedArr.push(newNum);
    }
    inOrder(root.right, fn, orderedArr)
    return orderedArr;
   }

   const postOrder = (root, fn, orderedArr = []) => {
    if (root === null) return;
    postOrder(root.left, fn, orderedArr)
    postOrder(root.right, fn, orderedArr)
    if (!fn) {
      orderedArr.push(root.data);
    } else {
      let newNum = fn(root.data)
      orderedArr.push(newNum);
    }
    return orderedArr;
   }

  const findDepth = (root, node) => {
     if (root === null)
        return -1;
 
    let depth = -1;

    let data = node.data
 
    if ((root.data === data)||
     
        (depth = findDepth(root.left, node)) >= 0 ||
         
        (depth = findDepth(root.right, node)) >= 0)
 
        return depth + 1;
         
    return depth;
}

  const heightCalc = (root, node) => {
    if (root === null)
    {
        return -1;
    }

    let data = node.data

    let leftHeight = heightCalc(root.left, node);

    let rightHeight = heightCalc(root.right, node);

    let ans = Math.max(leftHeight, rightHeight) + 1;

    if (root.data === data)
        height = ans;

    return ans;
  }
  
  const findHeight = (root, node) => {
    heightCalc(root, node);

    return height;
  }

  const height = (root) => {
    if (root === null) {
      return 0
    }
    return Math.max(height(root.left), height(root.right) + 1);
  }

  const isBalanced = (root) => {
    if (root === null) {
      return true;
    }

    let leftHeight = height(root.left)
    let rightHeight = height(root.right)

    if (Math.abs(leftHeight - rightHeight) <= 1 && isBalanced(root.left) === true && isBalanced(root.right) === true) {
      return true;
    }
    return false;
  }

  const rebalance = () => {
    let inOrderArr = inOrder(root, undefined, []);
    root = Tree(inOrderArr);
    return root;
  }

  return { root, print, insert, del, find, findRec, levelOrder, preOrder, inOrder, postOrder, findHeight, findDepth, isBalanced, rebalance }
}

function buildTree(arr, start, end) {
  if (start > end) {
    return null;
  }

  let mid = parseInt((start + end) / 2);
  let node = Node(arr[mid]);
  node.left = buildTree(arr, start, mid - 1);
  node.right = buildTree(arr, mid + 1, end);
  return node;
};

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const newTree = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
newTree.insert(root, 212)
newTree.insert(root, 111)
newTree.insert(root, 198)
newTree.insert(root, 345)
newTree.insert(root, 888)
newTree.insert(root, 537)
newTree.insert(root, 345)
