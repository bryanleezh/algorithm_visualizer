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
// TODO: same as visualise dijkstra above
// when character is grabbed and moved, visualise the algo again
export function visualiseInstantDijkstra(context) {
    let startNode = [];
    let finishNode = [];
    
    startNode = context.nodes2[context.isStart[0]][context.isStart[1]];
    finishNode = context.nodes2[context.isEnd[0]][context.isEnd[1]];

    context.visitedNodesInOrder = dijkstra(context.nodes2, startNode, finishNode);
    context.nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    context.animateDijkstra(context.visitedNodesInOrder, context.nodesInShortestPathOrder);
    context.visitedNodesInOrder= [];
    context.nodesInShortestPathOrder = [];

    context.djikstraDone = true;
    context.algoDone = true;
}

// animate algorithm
export function animateDijkstra(context, visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
        if (i == visitedNodesInOrder.length) {
            setTimeout(() => {
                for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
                    setTimeout(() => {
                        const node = nodesInShortestPathOrder[i];
                        let row = node.row
                        let col = node.col
                        if (context.nodes[row][col].status == 'visited' || context.nodes[row][col].status == 'visited2'){
                            context.nodes[row][col].status = 'shortest-path-right'
                        }
                    }, 25 * i);
                }
            }, 5 * i);
            return;
        }
        else {
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                let row = node.row
                let col = node.col
                if (context.nodes[row][col].status == 'norm') {
                    if (context.castTwo){
                        context.nodes[row][col].status = 'visited2'
                    }
                    else {
                    context.nodes[row][col].status = 'visited'
                    }
                }
            }, 5 * i);
        }
    }
}