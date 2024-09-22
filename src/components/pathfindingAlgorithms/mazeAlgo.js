
export function recursiveDivisionMaze(wallslist, start, end, height, width, allnodes, allnodes2, rowStart, rowEnd, colStart, colEnd, orientation, surroundingWalls) {
    // let wallsToAnimate = []
    if (rowEnd < rowStart || colEnd < colStart) {
      return;
    }
    // creates walls around entire grid
    if (!surroundingWalls) {
        // top & bottom walls
        for (let i = 0; i < width; i++){
            wallslist.push([0, i])
            wallslist.push([height-1, i])
        }
        // left and right walls
        for (let j = 0; j < height; j++){
            wallslist.push([j, 0])
            wallslist.push([j, width - 1])
        }
    }
    surroundingWalls = true;
    // divide maze horizontally
    if (orientation == "horizontal") {
        let possibleRows = [];
        for (let number = rowStart; number <= rowEnd; number += 2) {
            possibleRows.push(number);
        }
        let possibleCols = [];
        for (let number = colStart - 1; number <= colEnd + 1; number += 2) {
            possibleCols.push(number);
        }
        // choose random row and col
        let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
        let randomColIndex = Math.floor(Math.random() * possibleCols.length);
        let currentRow = possibleRows[randomRowIndex];
        let colRandom = possibleCols[randomColIndex];
        // For each node in the grid (allnodes2), if the node is in currentRow but not in colRandom, 
        // and if it’s within the valid column range, it is marked as a wall.
        for (let rowindex in allnodes2) {
            let rows = allnodes2[rowindex];
            for (let colindex in rows) {
                let node = rows[colindex]
                let rownum = node.row;
                let colnum = node.col;
                if (rownum === currentRow && colnum !== colRandom && colnum >= colStart-1 && colnum <= colEnd + 1) {
                    if (node.status !== 'start' && node.status !== 'target' ) {
                        let coords = [rownum,colnum]
                        wallslist.push(coords)
                    }
                }
            }
        }
        // If the height of the upper section (currentRow - 2) is greater than the width of the column section, 
        // the upper section is divided horizontally again. Otherwise, it is divided vertically.
        if (currentRow-2-rowStart > colEnd-colStart ){
            recursiveDivisionMaze(wallslist, start, end, height, width, allnodes, allnodes2, rowStart, currentRow-2, colStart, colEnd, orientation, true)
        }
        else {
            recursiveDivisionMaze(wallslist, start, end, height, width, allnodes, allnodes2, rowStart, currentRow-2, colStart, colEnd, 'vertical', true)
        }
        if (rowEnd-(currentRow+2) > colEnd - colStart) {
            recursiveDivisionMaze(wallslist, start, end, height, width, allnodes, allnodes2, currentRow+2, rowEnd, colStart, colEnd, orientation, true)
        }
        else {
            recursiveDivisionMaze(wallslist, start, end, height, width, allnodes, allnodes2, currentRow+2, rowEnd, colStart, colEnd, 'vertical', true)
        }
    }
    // divide maze vertically
    else {
        let possibleCols = [];
        for (let number = colStart; number <= colEnd; number += 2) {
            possibleCols.push(number);
        }
        let possibleRows = [];
        for (let number = rowStart - 1; number <= rowEnd + 1; number += 2) {
            possibleRows.push(number);
        }
        let randomColIndex = Math.floor(Math.random() * possibleCols.length);
        let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
        let currentCol = possibleCols[randomColIndex];
        let rowRandom = possibleRows[randomRowIndex];
        for (let rowindex in allnodes2) {
            let rows = allnodes2[rowindex];
            for (let colindex in rows) {
                let node = rows[colindex]
                let rownum = node.row;
                let colnum = node.col;
                if (colnum === currentCol && rownum !== rowRandom && rownum >= rowStart-1 && rownum <= rowEnd+1) {
                    if (node.status !== 'start' && node.status !== 'target') {
                        let coords = [rownum,colnum]
                        wallslist.push(coords)
                    }
                }
            }
        }
        if (rowEnd - rowStart > currentCol-2-colStart) {
            recursiveDivisionMaze(wallslist, start, end, height, width, allnodes, allnodes2, rowStart, rowEnd, colStart, currentCol -2, 'horizontal', true)
        }
        else {
            recursiveDivisionMaze(wallslist, start, end, height, width, allnodes, allnodes2, rowStart, rowEnd, colStart, currentCol -2, orientation, true)
        }
        if (rowEnd - rowStart > colEnd - (currentCol +2)) {
            recursiveDivisionMaze(wallslist, start, end, height, width, allnodes, allnodes2, rowStart, rowEnd, currentCol+2, colEnd, "horizontal", true)
        }
        else {
            recursiveDivisionMaze(wallslist, start, end, height, width, allnodes, allnodes2, rowStart, rowEnd, currentCol+2, colEnd, orientation, true)
        }
    }
}