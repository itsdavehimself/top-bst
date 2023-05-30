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

  const insert = (value) => {
    let node = root;
    while(node.left || node.right) {
      if (value === node.data) {
        return
      } else if (value < node.data) {
        node = node.left;
      } else {
        node = node.right;
      }
    }
    if (value < node.data) {
      node.left = Node(value);
    } else {
      node.right = Node(value);
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
      return null
    }
   }

  return { root, print, insert, del, find, findRec }
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
