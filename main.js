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

  return { root, print, insert }
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