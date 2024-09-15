// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.
export function dfs(grid, startNode, finishNode, rows, cols){
  const stack = []
  const visitedNodesInOrder = []
  startNode.isVisited = true
  var dfsRow = Number(startNode.row)
  var dfsCol = Number(startNode.col)
  var previousNode = startNode
  if (dfsCol > 0 && grid[dfsRow][dfsCol - 1].isVisited == null && grid[dfsRow][dfsCol - 1].status !== "wall"){
    grid[dfsRow][dfsCol - 1].previousNode = previousNode
    stack.push(grid[dfsRow][dfsCol - 1])
  }
  if (dfsRow < rows - 1 && grid[dfsRow + 1][dfsCol].isVisited == null && grid[dfsRow + 1][dfsCol].status !== "wall"){
    grid[dfsRow + 1][dfsCol].previousNode = previousNode
    stack.push(grid[dfsRow + 1][dfsCol])
  }
  if (dfsCol < cols - 1 && grid[dfsRow][dfsCol + 1].isVisited == null && grid[dfsRow][dfsCol + 1].status !== "wall"){
    grid[dfsRow][dfsCol + 1].previousNode = previousNode
    stack.push(grid[dfsRow][dfsCol + 1])
  }
  if (dfsRow > 0 && grid[dfsRow - 1][dfsCol].isVisited == null && grid[dfsRow - 1][dfsCol].status !== "wall"){
    grid[dfsRow - 1][dfsCol].previousNode = previousNode
    stack.push(grid[dfsRow - 1][dfsCol])
  }
  while (stack.length > 0){
    const newNode = stack.pop()
    if (newNode.row == finishNode.row && newNode.col == finishNode.col){
      visitedNodesInOrder.push(newNode)
      return visitedNodesInOrder
    }
    dfsRow = newNode.row
    dfsCol = newNode.col
    if (newNode.isVisited || newNode.status == 'wall') continue
    grid[dfsRow][dfsCol].isVisited = true
    const currentNode = grid[dfsRow][dfsCol]
    visitedNodesInOrder.push(currentNode)
    previousNode = currentNode
    if (dfsCol > 0 && grid[dfsRow][dfsCol - 1].isVisited == null && grid[dfsRow][dfsCol - 1].status !== "wall"){
      grid[dfsRow][dfsCol - 1].previousNode = previousNode
      stack.push(grid[dfsRow][dfsCol - 1])
    }
    if (dfsRow < rows - 1 && grid[dfsRow + 1][dfsCol].isVisited == null && grid[dfsRow + 1][dfsCol].status !== "wall"){
      grid[dfsRow + 1][dfsCol].previousNode = previousNode
      stack.push(grid[dfsRow + 1][dfsCol])
    }
    if (dfsCol < cols - 1 && grid[dfsRow][dfsCol + 1].isVisited == null && grid[dfsRow][dfsCol + 1].status !== "wall"){
      grid[dfsRow][dfsCol + 1].previousNode = previousNode
      stack.push(grid[dfsRow][dfsCol + 1])
    }
    if (dfsRow > 0 && grid[dfsRow - 1][dfsCol].isVisited == null && grid[dfsRow - 1][dfsCol].status !== "wall"){
      grid[dfsRow - 1][dfsCol].previousNode = previousNode
      stack.push(grid[dfsRow - 1][dfsCol])
    }
  }

  return visitedNodesInOrder
}
export function dijkstra(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);
  while (!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    // If we encounter a wall, we skip it.
    // if (closestNode.isWall) continue;
    if (closestNode.status == 'wall') continue;
    // If the closest node is at a distance of infinity,
    // we must be trapped and should therefore stop.
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) return visitedNodesInOrder;
    updateUnvisitedNeighbors(closestNode, grid);
  }
}

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const {col, row} = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}

function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}


