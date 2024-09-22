import { recursiveDivisionMaze } from "../pathfindingAlgorithms/mazeAlgo";

export function generateHorizontalRecursiveMaze(context) {
    context.boardGrid = 'whitebackground';
    // if grid  is empty, generate a new maze
    if (context.mazeGenerated == false && context.algoDone == false){
        context.mazeStillGenerating = true;
        console.log("maze generating");
        recursiveDivisionMaze(context.mazewalls ,context.isStart, context.isEnd, context.rows, context.cols, context.nodes, context.nodes2, 2, context.rows-3, 2, context.cols-3, 'horizontal', false );
        let startrowfront = Number(context.isStart[0]);
        let startcolfront = Number(context.isStart[1]) +1;
        let endrowfront = Number(context.isEnd[0]);
        let endcolfront = Number(context.isEnd[1]) +1;
        for (let i=0; i<context.mazewalls.length; i++) {
            setTimeout(() => {
                let coord = context.mazewalls[i];
                if (context.nodes[coord[0]][coord[1]].status != 'start' && context.nodes[coord[0]][coord[1]].status != 'target' ){
                context.nodes[coord[0]][coord[1]].status = 'wall';
                context.nodes2[coord[0]][coord[1]].status = 'wall';
            }
            }, 10* i);
        }
        if (context.nodes[startrowfront][startcolfront].status == 'wall'){
            context.nodes[startrowfront][startcolfront].status = 'norm';
            context.nodes2[startrowfront][startcolfront].status = 'norm';
        }
        if (context.nodes[endrowfront][endcolfront].status == 'wall'){
            context.nodes[endrowfront][endcolfront].status = 'norm';
            context.nodes2[endrowfront][endcolfront].status = 'norm';
        }
        context.mazeGenerated = true;
        setTimeout(() => {
            context.mazeStillGenerating = false;
            console.log('maze done');
            context.boardGrid = 'default';
        }, context.mazewalls.length * 10);
    }
    // otherwise, reset board and generate the maze
    else {
        context.resetboard();
        context.generateHorizontalRecursiveMaze();
    }
    context.castTwo = false;
    context.nodes[context.isStart[0]][context.isStart[1]].status = 'start';
    context.nodes[context.isEnd[0]][context.isEnd[1]].status = 'target';
}

export function generateVerticalRecursiveMaze(context) {
    context.boardGrid = 'whitebackground';
    if (context.mazeGenerated == false && context.algoDone == false){
        context.mazeStillGenerating = true;
        console.log("maze generating");
        recursiveDivisionMaze(context.mazewalls ,context.isStart, context.isEnd, context.rows, context.cols, context.nodes, context.nodes2, 2, context.rows-3, 2, context.cols-3, 'vertical', false );
        let startrowfront = Number(context.isStart[0]);
        let startcolfront = Number(context.isStart[1]) +1;
        let endrowfront = Number(context.isEnd[0]);
        let endcolfront = Number(context.isEnd[1]) +1;

        for (let i=0; i<context.mazewalls.length; i++) {
            setTimeout(() => {
                const coord = context.mazewalls[i]
                if (context.nodes[coord[0]][coord[1]].status != 'start' && context.nodes[coord[0]][coord[1]].status != 'target' ){
                    context.nodes[coord[0]][coord[1]].status = 'wall';
                    context.nodes2[coord[0]][coord[1]].status = 'wall';
                }
            }, 10* i);
        }
        
        if (context.nodes[startrowfront][startcolfront].status == 'wall'){
            context.nodes[startrowfront][startcolfront].status = 'norm';
            context.nodes2[startrowfront][startcolfront].status = 'norm';
        }
        if (context.nodes[endrowfront][endcolfront].status == 'wall'){
            context.nodes[endrowfront][endcolfront].status = 'norm';
            context.nodes2[endrowfront][endcolfront].status = 'norm';
        }
        context.mazeGenerated = true;
        setTimeout(() => {
            context.mazeStillGenerating = false;;
            console.log('maze done');
            context.boardGrid = 'default';
        }, context.mazewalls.length * 10);
    }
    else {
        context.resetboard();
        context.generateVerticalRecursiveMaze();
    }
    context.castTwo = true;
    context.nodes[context.isStart[0]][context.isStart[1]].status = 'start2';
    context.nodes[context.isEnd[0]][context.isEnd[1]].status = 'target2';
}