import { dfs, getNodesInShortestPathOrder } from "../pathfindingAlgorithms/algos"

export function visualiseDFS(context) {
    if (context.mazeStillGenerating){
        alert("Maze is still generating! Please wait!")
        return
    }
    if (context.algoDone){
        alert('Algo has been visualised!')
        return
    }
    let startNode = [];
    let finishNode = [];
    
    startNode = context.nodes2[context.isStart[0]][context.isStart[1]];
    finishNode = context.nodes2[context.isEnd[0]][context.isEnd[1]];
    context.visitedNodesInOrder = dfs(context.nodes2, startNode, finishNode, context.rows, context.cols);
    context.nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    context.animateDijkstra(context.visitedNodesInOrder, context.nodesInShortestPathOrder);
    context.visitedNodesInOrder= [];
    context.nodesInShortestPathOrder = [];

    context.dfsDone = true;
    context.algoDone = true;
}

export function visualiseInstantDFS(context) {
    let startNode = [];
    let finishNode = [];
    
    startNode = context.nodes2[context.isStart[0]][context.isStart[1]];
    finishNode = context.nodes2[context.isEnd[0]][context.isEnd[1]];
    context.visitedNodesInOrder = dfs(context.nodes2, startNode, finishNode, context.rows, context.cols);
    context.nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    context.instantDijkstra(context.visitedNodesInOrder, context.nodesInShortestPathOrder);
    context.visitedNodesInOrder= [];
    context.nodesInShortestPathOrder = [];

    context.dfsDone = true;
    context.algoDone = true;
}