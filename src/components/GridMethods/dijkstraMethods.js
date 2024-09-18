import { dijkstra, getNodesInShortestPathOrder } from '../pathfindingAlgorithms/algos';
import { animateAlgo } from './boardMethods';

export function visualiseDijkstra(context) {
    let startNode = context.nodes2[context.isStart[0]][context.isStart[1]];
    let finishNode = context.nodes2[context.isEnd[0]][context.isEnd[1]];
    
    context.visitedNodesInOrder = dijkstra(context.nodes2, startNode, finishNode);
    context.nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);

    animateAlgo(context, context.visitedNodesInOrder, context.nodesInShortestPathOrder);
    
    context.visitedNodesInOrder = [];
    context.nodesInShortestPathOrder = [];

    context.djikstraDone = true;
    context.algoDone = true;
}
