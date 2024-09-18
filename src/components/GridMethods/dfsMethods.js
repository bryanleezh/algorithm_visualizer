import { dfs, getNodesInShortestPathOrder } from "../pathfindingAlgorithms/algos"
import { animateAlgo } from "./boardMethods"

export function visualiseDFS(context) {
    let startNode = [];
    let finishNode = [];
    
    startNode = context.nodes2[context.isStart[0]][context.isStart[1]];
    finishNode = context.nodes2[context.isEnd[0]][context.isEnd[1]];
    context.visitedNodesInOrder = dfs(context.nodes2, startNode, finishNode, context.rows, context.cols);
    context.nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateAlgo(context, context.visitedNodesInOrder, context.nodesInShortestPathOrder);
    context.visitedNodesInOrder= [];
    context.nodesInShortestPathOrder = [];

    context.dfsDone = true;
    context.algoDone = true;
}