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
        window.alert("Maze is still generating! Please wait!")
        return false;
    }
    if (context.algoDone){
        window.alert('Algo has been visualised!')
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

export function validateRestartAlgo(context) {
    if(context.djikstraDone){
        removePaths(context)
        context.visualiseDijkstra(true);
    }
    if(context.dfsDone){
        removePaths(context)
        context.visualiseDFS(true);
    }
}

export function editCell(context, row, col) {
    context.usedboard = true;
    context.boardGrid = 'whitebackground';
    if (context.clickedstatus == false) {
        context.clickedstatus = true;
        // if clicked is a normal cell, change it to wall
        if (context.nodes[row][col].status == 'norm') {
            context.nodes[row][col].status = 'wall';
            context.nodes2[row][col].status = 'wall';
        }
        // if clicked is a wall, change it to empty cell
        else if (context.nodes[row][col].status == 'wall') {
            context.nodes[row][col].status = 'norm';
            context.nodes2[row][col].status = 'norm';
        }
        // if clicked is start node, change it to empty cell
        else if (context.nodes2[row][col].status == 'start'){
            context.startgrabbed = true;
            context.nodes[row][col].status = 'norm';
            context.nodes2[row][col].status = 'norm';
        }
        // if clicked is end node, change it to empty cell
        else if (context.nodes2[row][col].status == 'target'){
            context.endgrabbed = true;
            context.nodes[row][col].status = 'norm';
            context.nodes2[row][col].status = 'norm';
        }
    }
}

export function editMouseDownCell(context, row, col) {
    // if not grabbing start or end node,  change the held down cell to wall, vice versa
    if (context.startgrabbed == false && context.endgrabbed == false) {
        if (context.clickedstatus == true ) {
            if (context.nodes[row][col].status == 'norm') {
                context.nodes[row][col].status = 'wall'
                context.nodes2[row][col].status = 'wall'
            }
            else if (context.nodes[row][col].status == 'wall' ) {
                context.nodes[row][col].status = 'norm'
                context.nodes2[row][col].status = 'norm'
            }            
        }
    }
    else {
        console.log("start or end is grabbed")
    }
}

export  function editMouseUpCell(context, row, col) {
    if (context.clickedstatus == true) {
        // drop start node at current position
        // restart algorithm if algorithm was completed before
        if (context.startgrabbed == true) {
            if (context.nodes2[row][col].status != 'target') {
                if (context.castTwo){
                    context.nodes[row][col].status = 'start2'
                }
                else {
                    context.nodes[row][col].status = 'start'
                }
                context.nodes2[row][col].status = 'start'
                context.startgrabbed = false
                context.isStart = [row,col]

                validateRestartAlgo(context)
            }
            // if start or end node is overlapped by each other
            else {
                // place start node at col 1
                if (col == 0) {
                    if (context.castTwo){
                        context.nodes[row][1].status = 'start2'
                    }
                    else {
                        context.nodes[row][1].status = 'start'
                    }
                    context.nodes2[row][1].status = 'start'
                    context.startgrabbed = false
                    context.isStart = [row,1]
                    if (context.castTwo){
                        context.nodes[row][col].status = 'target2'
                    }
                    else {
                        context.nodes[row][col].status = 'target'
                    }
                    context.nodes2[row][col].status = 'target'

                    validateRestartAlgo(context)
                }
                // place start node at col - 1
                else{
                    if (context.castTwo){
                        context.nodes[row][col - 1].status = 'start2'
                    }
                    else {
                        context.nodes[row][col - 1].status = 'start'
                    }
                    context.nodes2[row][col - 1].status = 'start'
                    context.startgrabbed = false
                    context.isStart = [row,col - 1]
                    if (context.castTwo){
                    context.nodes[row][col].status = 'target2'
                    }
                    else {
                        context.nodes[row][col].status = 'target'
                    }
                    context.nodes2[row][col].status = 'target'

                    validateRestartAlgo(context)
                }
            }
        }
        // if end node is grabbed
        else if (context.endgrabbed == true ) {
            if (context.nodes2[row][col].status != "start") {
                if (context.castTwo){
                    context.nodes[row][col].status = 'target2'
                }
                else {
                    context.nodes[row][col].status = 'target'
                }
                context.nodes2[row][col].status = 'target'
                context.endgrabbed = false
                context.isEnd = [row,col]

                validateRestartAlgo(context)
            }
            // if start or end node is overlapped by each other
            else {
                // place target node at col 1
                if (col == 0) {
                    if (context.castTwo){
                        context.nodes[row][1].status = 'target2'
                    }
                    else {
                        context.nodes[row][1].status = 'target'
                    }
                    context.nodes2[row][1].status = 'target'
                    context.endgrabbed = false
                    context.isEnd = [row,1]
                    if (context.castTwo){
                        context.nodes[row][col].status = 'start2'
                    }
                    else {
                        context.nodes[row][col].status = 'start'
                    }
                    context.nodes2[row][col].status = 'start'

                    validateRestartAlgo(context)
                }
                else {
                    if (context.castTwo){
                        context.nodes[row][col-1].status = 'target2'
                    }
                    else {
                        context.nodes[row][col-1].status = 'target'
                    }
                    context.nodes2[row][col - 1].status = 'target'
                    context.endgrabbed = false
                    context.isEnd = [row,col - 1]
                    if (context.castTwo){
                        context.nodes[row][col].status = 'start2'
                    }
                    else {
                        context.nodes[row][col].status = 'start'
                    }
                    context.nodes2[row][col].status = 'start'

                    validateRestartAlgo(context)
                }
            }
        }
        context.clickedstatus = false;
        context.boardGrid = 'default'
    }
}

function removePaths(context) {
    for (let i = 0; i < context.rows; i++){
        for (let j = 0; j < context.cols; j++){
            
            if (context.nodes2[i][j].status !== 'start' && context.nodes2[i][j].status !== 'target' && context.nodes2[i][j].status !== 'wall'){
                context.nodes2[i][j].status = 'norm'
                context.nodes[i][j].status = 'norm'
            }
            context.nodes2[i][j].distance = Infinity
            context.nodes2[i][j].isVisited = null
            context.nodes2[i][j].previousNode = null
        }
    }
}

export function resetBoard(context) {
    if (context.mazeStillGenerating){
        alert("Maze still generating!! Please wait for maze to finish");
        return
    }
    if (context.usedboard == true || context.mazeGenerated == true || context.algoDone == true){
        context.nodes2 = []
        for (let row = 0; row < context.rows; row++){
            const currentRow = {}
            const currentRow2 = []
            for (let col = 0; col <context.cols; col++){
                var currentNode = {col: col, row: row, status: 'norm', distance: Infinity, previousNode: null}
                var currentNode2 = {col: col, row: row, status: 'norm', distance: Infinity, previousNode: null}
                if (row == context.isStart[0] && col == context.isStart[1]){
                    if (context.castTwo){
                        currentNode.status = 'start2'
                    }
                    else{
                        currentNode.status = 'start'
                    }
                    currentNode2.status = 'start'
                }
                else if (row == context.isEnd[0] && col == context.isEnd[1]){
                    if (context.castTwo){
                        currentNode.status = 'target2'
                    }
                    else{
                        currentNode.status = 'target'
                    }
                    currentNode2.status = 'target'
                }
                currentRow[col] = currentNode
                currentRow2.push(currentNode2)
            }
            context.nodes[row] = currentRow
            context.nodes2.push(currentRow2)
        }
        context.mazeGenerated = false
        context.usedboard = false
        context.mazewalls = []
        context.djikstraDone = false
        context.dfsDone = false
        context.algoDone = false

    }
}