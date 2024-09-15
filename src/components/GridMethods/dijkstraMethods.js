import { dijkstra, getNodesInShortestPathOrder } from '../pathfindingAlgorithms/algos';

export function visualiseDijkstra(context) {
    if (context.mazeStillGenerating) {
        alert("Maze is still generating! Please wait!");
        return;
    }
    if (context.algoDone) {
        alert('Algo has been visualised!');
        return;
    }
    
    let startNode = context.nodes2[context.isStart[0]][context.isStart[1]];
    let finishNode = context.nodes2[context.isEnd[0]][context.isEnd[1]];
    
    context.visitedNodesInOrder = dijkstra(context.nodes2, startNode, finishNode);
    context.nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);

    context.animateDijkstra(context.visitedNodesInOrder, context.nodesInShortestPathOrder);
    
    context.visitedNodesInOrder = [];
    context.nodesInShortestPathOrder = [];

    context.djikstraDone = true;
    context.algoDone = true;
}

export function visualiseInstantDijkstra(context) {
    let startNode = [];
    let finishNode = [];
    
    startNode = context.nodes2[context.isStart[0]][context.isStart[1]];
    finishNode = context.nodes2[context.isEnd[0]][context.isEnd[1]];

    context.visitedNodesInOrder = dijkstra(context.nodes2, startNode, finishNode);
    context.nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    context.instantDijkstra(context.visitedNodesInOrder, context.nodesInShortestPathOrder);
    context.visitedNodesInOrder= [];
    context.nodesInShortestPathOrder = [];

    context.djikstraDone = true;
    context.algoDone = true;
}