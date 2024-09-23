<template>
    <div>
        <div id="third" class="d-flex">
            <h1 id="bigheader">
                Let's Visualise!!
            </h1>
        </div>
        <NavBar 
            @visualiseDijkstra="visualiseDijkstra"
            @visualiseDFS="visualiseDFS"
            @resetboard="resetboard"
            @generateHorizontalRecursiveMaze="generateHorizontalRecursiveMaze"
            @generateVerticalRecursiveMaze="generateVerticalRecursiveMaze"
            @changeVisualisationSpeed="chanzgeVisualisationSpeed"
        />
    </div>
    
    <table :id="this.boardGrid">
        <tr v-for="(nodesCol, rowIdx) of this.nodes" :key="rowIdx" :id="`row-${rowIdx}`">
            <td 
                v-for="(nodeObj, colIdx) of nodesCol" :key="colIdx" :id="`${rowIdx}-${colIdx}`" 
                :class="`${nodeObj.status}`" 
                @mouseleave="replaceCharacterStatus(`${rowIdx}`,`${colIdx}`)" 
                @mouseover="grabCharacter(`${rowIdx}`,`${colIdx}`)" 
                @mousedown="editCell(`${rowIdx}`,`${colIdx}`)" 
                @mouseup="editMouseUpCell(`${rowIdx}`,`${colIdx}`)" 
                @mouseenter="editMouseDownCell(`${rowIdx}`,`${colIdx}`)"
            >
            </td>
        </tr>
    </table>

    <div v-if="this.mazeGenerated" class="exp">
        <div class="row">
            <div class="jumbotron col-lg-12 col-md-12 col-sm-12">
                <h4>Explanation</h4>
                <p class="expdescription">
                    This maze was generated using recursion. It first creates all the surrounding walls on all 4 sides, before moving on to the actual recursion itself
                </p>
                <p class="expdescription">
                    In order to create the rest of the maze, based on its parameters of either horizontal or vertical, it will generate a random row and column, and using that particular coordinates from the grid, it will generate walls for every coordinate in that row or column other than that one random coordinate
                </p>
                <p class="expdescription">
                    This is done recursively again and again until the entire grid is populated
                </p>
            </div>
            
        </div>
    </div>
    <div v-if="this.djikstraDone" class="exp">
        <div class="row">
            <div class="jumbotron col-lg-8 col-md-6 col-sm-12" id="explanation">
                <h4>Explanation</h4>
                <p class="expdescription">
                    Dijkstras algorithm is an algorithm used for finding the shortest path within a weighted graph, from a starting node to a destination node. 
                </p>
                <p class="expdescription">
                    This algorithm visits all nodes in a graph in sequence starting from the start node, recording the shortest distance needed to reach each node as it visits them, as well as the path it took to achieve said minimum distance.
                </p>
                <p class="expdescription">
                    After visiting all possible nodes, the algorithm then checks whether or not it is able to reach the destination node. If found possible, it will then start from the destination node and backtrack through the path taken in order to reach the node, thereby finding the path required to achieve the shortest distance. 
                </p>
                
            </div>
            <div class="jumbotron col-lg-4 col-md-6 col-sm-12">
                <h4>Pseudocode</h4>
                <p class="expdescription">
                    1. Mark all nodes as unvisited and set their distance to infinity
                </p>
                <p class="expdescription">
                    2. Pick the starting node, select it as the currently visited node and set its distance to 0
                </p>
                <p class="expdescription">
                    3. Analyse all the currently visited node&#39;s unvisited adjacent neighbours and record their distances by adding the distance taken to reach the currently visited node to the distance required to reach the adjacent neighbour node
                </p>
                <p class="expdescription">
                    4. Compare the newly calculated distance of each neighbour node to the distance currently assigned to said neighbour node, replacing it if its lower and assigning it the path taken to reach said node
                </p>
                <p class="expdescription">
                    5. After analysing all of the current node&#39;s unvisited adjacent neighbours, mark the current node as visited
                </p>
                <p class="expdescription">
                    6. If the current node is the destination node, stop the algorithm and backtrack through the path taken to reach said node, retrieving the shortest path possible
                </p>
                <p class="expdescription">
                    7. 
                    Else, choose the neighbouring nodes with the shortest distance from the current node, selecting it as the new currently visited node and repeat steps 3 to 6
                </p>
                <p class="expdescription">
                    8. When all nodes have been visited without the destination node being found, the destination node is concluded to be inaccessible from the start node
                </p>
            </div>
        </div>
    </div>
    <div v-if="this.dfsDone" class="exp">
        <div class="row">
            <div class="jumbotron col-lg-8 col-md-6 col-sm-12">
                <h4>Explanation</h4>
                <p class="expdescription">
                    Depth-first search is an algorithm for traversing or searching tree or graph data structures. The algorithm starts at a root node and explores as far as possible along each branch or direction before backtracking and changing directions. 
                </p>
                <p class="expdescription">
                    The algorithm will continually iterate until it finds a target node or if all possible nodes have been visited
                </p>
            </div>
            <div class="jumbotron col-lg-4 col-md-6 col-sm-12">
                <h4>Pseudocode</h4>
                <p class="expdescription">
                    1. Start with root node as the currently visited node and mark it as visited
                </p>
                <p class="expdescription">
                    2. Record the previous node of all adjacent nodes as the currently visited node and push all adjacent nodes into a stack
                </p>
                <p class="expdescription">
                    3. Pop the latest node from the stack and select it as currently visited node
                </p>
                <p class="expdescription">
                    4. If the currently selected node is the target node, iterate through its previous nodes to get the shortest path
                </p>
                <p class="expdescription">
                    5. Else, repeat steps 2 to 4
                </p>
            </div>
        </div>
    </div>
</template>
<script>

    import NavBar from './NavBar.vue';
    import { visualiseDijkstra } from './GridMethods/dijkstraMethods.js';
    import { generateHorizontalRecursiveMaze, generateVerticalRecursiveMaze } from './GridMethods/generateMazeMethods.js';
    import { visualiseDFS} from './GridMethods/dfsMethods.js';
    import { boardValidation, editCell, editMouseDownCell, editMouseUpCell, grabCharacter, replaceCharacterStatus, resetBoard } from './GridMethods/boardMethods.js';

    export default {
        data() {
            return {
                boardGrid: 'default',
                // board config
                width: null,
                rows: 31,
                cols: null,
                isStart: null,
                isEnd: null,
                nodes: {},
                nodes2: [],
                usedboard: false,
                // start + end nodes flags
                castTwo: false,
                clickedstatus: false,
                startgrabbed: false,
                endgrabbed:false,
                // algos
                visitedNodesInOrder: [],
                nodesInShortestPathOrder: [],
                djikstraDone: false,
                dfsDone: false,
                algoDone: false,
                visualisationSpeed: "fast",
                // maze
                mazewalls: [],
                mazeGenerated: false,
                mazeStillGenerating: false,
            }
        },
        name: 'boardGrid',
        components: {
            NavBar
        },
        methods: {
            // if character is being grabbed, the status of the current grid coords will become movingstart so that user can see where character is moving to
            grabCharacter(row, col){
                grabCharacter(this, row, col);
            },
            // replace start or end nodes with the status of cell with the status of back grid
            replaceCharacterStatus(row, col){
                replaceCharacterStatus(this, row, col);
            },
            // if nothing is clicked at all
            editCell(row,col){
                editCell(this, row, col);
            },
            // if click and hold, continue creating/removing more walls
            editMouseDownCell(row,col){
                editMouseDownCell(this, row, col);
            },
            // on mouse up, 
            // drop start or end node if grabbed
            // stop placing/ removing more walls
            editMouseUpCell(row,col){
                editMouseUpCell(this, row, col);
            },
            visualiseDijkstra(isBoardValidated){
                if (!isBoardValidated) {
                    if (!boardValidation(this)) {
                        console.log("board not validated");
                        return;
                    }
                }
                visualiseDijkstra(this);
            },
            visualiseDFS(isBoardValidated){
                if (!isBoardValidated) {
                    if (!boardValidation(this)) {
                        console.log("board not validated");
                        return;
                    };
                }
                visualiseDFS(this);
            },
            generateHorizontalRecursiveMaze() {
                generateHorizontalRecursiveMaze(this);
            },
            generateVerticalRecursiveMaze() {
                generateVerticalRecursiveMaze(this);
            },
            chanzgeVisualisationSpeed(speed) {
                console.log(speed);
                if (speed === "fast") {
                    this.visualisationSpeed = "fast";
                } else if (speed === "medium") {
                    this.visualisationSpeed = "medium";
                } else {
                    this.visualisationSpeed = "slow";
                }
            },
            resetboard() {
                resetBoard(this);
            }
        },
        // create grid, calculating all the columns needed and coords of start and end node
        async created() {
            this.width = window.innerWidth;
            this.cols = Math.floor(this.width*0.9/25);
            this.isStart = [16,Math.floor(this.cols/5)];
            this.isEnd = [16,Math.floor(this.cols*4/5)];
            // TODO: Can refactor to rebuild grid function
            // rebuild grid to base config
            for (let row = 0; row < this.rows; row++){
                const currentRow = {};
                const currentRow2 = [];
                for (let col = 0; col <this.cols; col++){
                    var currentNode = {col: col, row: row, status: 'norm', distance: Infinity, previousNode: null};
                    var currentNode2 = {col: col, row: row, status: 'norm', distance: Infinity, previousNode: null};
                    if (row == this.isStart[0] && col == this.isStart[1]){
                        currentNode.status = 'start';
                        currentNode2.status = 'start';
                    }
                    else if (row == this.isEnd[0] && col == this.isEnd[1]){
                        currentNode.status = 'target';
                        currentNode2.status = 'target';
                    }
                    currentRow[col] = currentNode;
                    currentRow2.push(currentNode2);
                }
                this.nodes[row] = currentRow;
                this.nodes2.push(currentRow2);
            }
        },
        watch: {
            // reset grid + calculate how many columns to fit based on screen size
            cols(){
                this.isStart = [16,Math.floor(this.cols/5)];
                this.isEnd = [16,Math.floor(this.cols*4/5)];
                // TODO: Can refactor to rebuild grid function
                // rebuild grid to base config
                const intermediate = {};
                const intermediate2 = [];
                for (let row = 0; row < this.rows; row++){
                    const currentRow = {};
                    const currentRow2 = [];
                    for (let col = 0; col <this.cols; col++){
                        var currentNode = {col: col, row: row, status: 'norm', distance: Infinity, previousNode: null};
                        var currentNode2 = {col: col, row: row, status: 'norm', distance: Infinity, previousNode: null};
                        if (row == this.isStart[0] && col == this.isStart[1]){
                            if (this.castTwo){
                                currentNode.status = 'start2';
                            }
                            else{
                                currentNode.status = 'start';
                            }
                            currentNode2.status = 'start';
                        }
                        else if (row == this.isEnd[0] && col == this.isEnd[1]){
                            if (this.castTwo){
                                currentNode.status = 'target2';
                            }
                            else{
                                currentNode.status = 'target';
                            }
                            currentNode2.status = 'target';
                        }
                        currentRow[col] = currentNode;
                        currentRow2.push(currentNode2);
                    }
                    intermediate[row] = currentRow;
                    intermediate2.push(currentRow2);
                }
                this.nodes = intermediate;
                this.nodes2 = intermediate2;
                this.mazeGenerated = false;
                this.usedboard = false;
                this.mazewalls = [];
                this.djikstraDone = false;
                this.dfsDone = false;
                this.algoDone = false;
            },
        },
        mounted() {
            // resize window and calculate number of columns
            window.onresize = () => {
                this.width = window.innerWidth
                this.cols = Math.floor(0.9*window.innerWidth/25)
            }
        }
    };
</script>
<style scoped>
    @import '@/assets/styling/algoStyler.css';
</style>