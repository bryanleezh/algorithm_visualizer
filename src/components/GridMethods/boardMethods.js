// animate algorithm
export function animateAlgo(context, visitedNodesInOrder, nodesInShortestPathOrder) {
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

export function boardValidation(context) {
    if (context.mazeStillGenerating){
        alert("Maze is still generating! Please wait!")
        return false;
    }
    if (context.algoDone){
        alert('Algo has been visualised!')
        return false;
    }
    return true;
}

// if character is being grabbed, the status of the current grid coords will become movingstart so that user can see where character is moving to
export function grabCharacter(context, row, col) {
    if (context.castTwo){
        if (context.startgrabbed){
            context.nodes[row][col].status = 'movingstart2'
        }
        else if (context.endgrabbed){
            context.nodes[row][col].status = 'movingend2'
        }
    }
    else {
        if (context.startgrabbed){
            context.nodes[row][col].status = 'movingstart'
        }
        else if (context.endgrabbed){
            context.nodes[row][col].status = 'movingend'
        }
    }
}

export function replaceCharacterStatus(context, row, col) {
    if (context.startgrabbed && context.nodes[row][col].status!='target'){
        context.nodes[row][col].status = context.nodes2[row][col].status
    }
    else if(context.endgrabbed && context.nodes[row][col].status!='start'){
        context.nodes[row][col].status = context.nodes2[row][col].status
    }
}