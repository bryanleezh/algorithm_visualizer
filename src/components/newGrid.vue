<template>
    <div>
        <div id="third" class="d-flex">
            <h1 id="bigheader">
                <span>Let's Visualise!!</span>
            </h1>
        </div>
        <nav id="second" class="navbar navbar-expand-lg">
            <div class="container-fluid d-flex" style="margin-left: 5%; margin-right:5%">
                <!-- Tutorial Modals -->
                <Tutorial />
                <button class="navbar-toggler float-right" style="margin-right: 0px;" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse mb-2 mb-lg-0" style="margin-right: 0px;" id="navbarNav">
                    <ul class="navbar-nav d-flex align-items-center" style="background-color:#5d91fe">
                        <li class="nav-item" >
                            <button class="btn navbar-btn me-auto" v-on:click="visualiseDijkstra()">Dijkstra</button>
                        </li>
                        <li class="nav-item ">
                            <button class="btn navbar-btn me-auto" v-on:click="visualiseDFS()">DFS</button>
                        </li>
                        <li class="nav-item ">
                            <button class="btn navbar-btn me-auto" v-on:click="resetboard()">Clear All</button>
                        </li>
                        <li class="nav-item ">
                            <button class="btn navbar-btn me-auto" v-on:click="generateHorizontalRecursiveMaze()">Random Recursive Maze (Horizontal)</button>
                        </li>
                        <li class="nav-item">
                            <button class="btn navbar-btn me-auto" v-on:click="generateVerticalRecursiveMaze()">Random Recursive Maze (Vertical)</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
    
    <table :id="this.boardGrid">
        <tr v-for="(nodesCol, rowIdx) of this.nodes" :key="rowIdx" :id="`row-${rowIdx}`">
            <td v-for="(nodeObj, colIdx) of nodesCol" :key="colIdx" :id="`${rowIdx}-${colIdx}`" :class="`${nodeObj.status}`" @mouseleave="movingAwayElements(`${rowIdx}`,`${colIdx}`)" @mouseover="movingElements(`${rowIdx}`,`${colIdx}`)" @mousedown="createwall(`${rowIdx}`,`${colIdx}`)" @mouseup="stopwall(`${rowIdx}`,`${colIdx}`)" @mouseenter="morewalls(`${rowIdx}`,`${colIdx}`)">
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

import {dijkstra, getNodesInShortestPathOrder, dfs} from './pathfindingAlgorithms/dijkstra.js'
import { recursiveDivisionMaze } from './pathfindingAlgorithms/mazeAlgo.js'
import Tutorial from './Tutorial.vue';

export default {
    data() {
        return {
            boardGrid: 'default',
            width: null,
            rows: 31,
            cols: null,
            isStart: null,
            isEnd: null,
            nodes: {},
            nodes2: [],
            clickedstatus: false,
            startgrabbed: false,
            endgrabbed:false,
            visitedNodesInOrder: [],
            nodesInShortestPathOrder: [],
            mazewalls: [],
            usedboard: false,
            mazeGenerated: false,
            mazeStillGenerating: false,
            djikstraDone: false,
            dfsDone: false,
            algoDone: false,
            castTwo: false,
            
        }
    },
    name: 'boardGrid',
    components: {
        Tutorial
    },
    methods: {
        movingElements(row, col){
            if (this.castTwo){
                if (this.startgrabbed){
                    this.nodes[row][col].status = 'movingstart2'
                }
                else if (this.endgrabbed){
                    this.nodes[row][col].status = 'movingend2'
                }
            }
            else {
                if (this.startgrabbed){
                    this.nodes[row][col].status = 'movingstart'
                }
                else if (this.endgrabbed){
                    this.nodes[row][col].status = 'movingend'
                }
            }
        },
        movingAwayElements(row, col){
            if (this.startgrabbed && this.nodes[row][col].status!='target'){
                this.nodes[row][col].status = this.nodes2[row][col].status
            }
            else if(this.endgrabbed && this.nodes[row][col].status!='start'){
                this.nodes[row][col].status = this.nodes2[row][col].status
            }
        },
        createwall(row,col){
            this.usedboard = true
            this.boardGrid = 'whitebackground'
            if (this.clickedstatus == false) {
                this.clickedstatus = true;
                if (this.nodes[row][col].status == 'norm') {
                    this.nodes[row][col].status = 'wall'
                    this.nodes2[row][col].status = 'wall'
                }
                else if (this.nodes[row][col].status == 'wall') {
                    this.nodes[row][col].status = 'norm'
                    this.nodes2[row][col].status = 'norm'
                }
                else if (this.nodes2[row][col].status == 'start'){
                    this.startgrabbed = true
                    this.nodes[row][col].status = 'norm'
                    this.nodes2[row][col].status = 'norm'
                }
                else if (this.nodes2[row][col].status == 'target'){
                    this.endgrabbed = true
                    this.nodes[row][col].status = 'norm'
                    this.nodes2[row][col].status = 'norm'
                }
            }
            
        },
        morewalls(row,col){
            if (this.startgrabbed == false && this.endgrabbed == false) {
                if (this.clickedstatus == true ) {
                    if (this.nodes[row][col].status == 'norm') {
                        this.nodes[row][col].status = 'wall'
                        this.nodes2[row][col].status = 'wall'
                    }
                    else if (this.nodes[row][col].status == 'wall' ) {
                        this.nodes[row][col].status = 'norm'
                        this.nodes2[row][col].status = 'norm'
                    }            
                }
            }
            else {
                console.log("start or end is grabbed")
            }
        },
        stopwall(row,col){
            if (this.clickedstatus == true) {
                if (this.startgrabbed == true) {
                    if (this.nodes2[row][col].status != 'target') {
                        if (this.castTwo){
                            this.nodes[row][col].status = 'start2'
                        }
                        else {
                            this.nodes[row][col].status = 'start'
                        }
                        this.nodes2[row][col].status = 'start'
                        this.startgrabbed = false
                        this.isStart = [row,col]
                        if(this.djikstraDone){
                            this.removepaths()
                            this.visualiseInstantDijkstra()
                        }
                        if(this.dfsDone){
                            this.removepaths()
                            this.visualiseInstantDFS()
                        }
                    }
                    else {
                        if (col == 0) {
                            if (this.castTwo){
                                this.nodes[row][1].status = 'start2'
                            }
                            else {
                                this.nodes[row][1].status = 'start'
                            }
                            this.nodes2[row][1].status = 'start'
                            this.startgrabbed = false
                            this.isStart = [row,1]
                            if (this.castTwo){
                                this.nodes[row][col].status = 'target2'
                            }
                            else {
                                this.nodes[row][col].status = 'target'
                            }
                            this.nodes2[row][col].status = 'target'
                            if(this.djikstraDone){
                                this.removepaths()
                                this.visualiseInstantDijkstra()
                            }
                            if(this.dfsDone){
                                this.removepaths()
                                this.visualiseInstantDFS()
                            }
                        }
                        else{
                            if (this.castTwo){
                                this.nodes[row][col - 1].status = 'start2'
                            }
                            else {
                                this.nodes[row][col - 1].status = 'start'
                            }
                            this.nodes2[row][col - 1].status = 'start'
                            this.startgrabbed = false
                            this.isStart = [row,col - 1]
                            if (this.castTwo){
                            this.nodes[row][col].status = 'target2'
                            }
                            else {
                                this.nodes[row][col].status = 'target'
                            }
                            this.nodes2[row][col].status = 'target'
                            if(this.djikstraDone){
                                this.removepaths()
                                this.visualiseInstantDijkstra()
                            }
                            if(this.dfsDone){
                                this.removepaths()
                                this.visualiseInstantDFS()
                            }
                        }
                        
                    }
                }
                else if (this.endgrabbed == true ) {
                    if (this.nodes2[row][col].status != "start") {
                        if (this.castTwo){
                            this.nodes[row][col].status = 'target2'
                        }
                        else {
                            this.nodes[row][col].status = 'target'
                        }
                        this.nodes2[row][col].status = 'target'
                        this.endgrabbed = false
                        this.isEnd = [row,col]
                        if(this.djikstraDone){
                            this.removepaths()
                            this.visualiseInstantDijkstra()
                        }
                        if(this.dfsDone){
                            this.removepaths()
                            this.visualiseInstantDFS()
                        }
                    }
                    else {
                        if (col == 0) {
                            if (this.castTwo){
                                this.nodes[row][1].status = 'target2'
                            }
                            else {
                                this.nodes[row][1].status = 'target'
                            }
                            this.nodes2[row][1].status = 'target'
                            this.endgrabbed = false
                            this.isEnd = [row,1]
                            if (this.castTwo){
                            this.nodes[row][col].status = 'start2'
                            }
                            else {
                                this.nodes[row][col].status = 'start'
                            }
                            this.nodes2[row][col].status = 'start'
                            if(this.djikstraDone){
                                this.removepaths()
                                this.visualiseInstantDijkstra()
                            }
                            if(this.dfsDone){
                                this.removepaths()
                                this.visualiseInstantDFS()
                            }
                        }
                        else {
                            if (this.castTwo){
                                this.nodes[row][col-1].status = 'target2'
                            }
                            else {
                                this.nodes[row][col-1].status = 'target'
                            }
                            this.nodes2[row][col - 1].status = 'target'
                            this.endgrabbed = false
                            this.isEnd = [row,col - 1]
                            if (this.castTwo){
                            this.nodes[row][col].status = 'start2'
                            }
                            else {
                                this.nodes[row][col].status = 'start'
                            }
                            this.nodes2[row][col].status = 'start'
                            if(this.djikstraDone){
                                this.removepaths()
                                this.visualiseInstantDijkstra()
                            }
                            if(this.dfsDone){
                                this.removepaths()
                                this.visualiseInstantDFS()
                            }
                        }
                    }
                }
                this.clickedstatus = false;
                this.boardGrid = 'default'
            }
        },
        removepaths(){
            for (let i = 0; i < this.rows; i++){
                for (let j = 0; j < this.cols; j++){
                    
                    if (this.nodes2[i][j].status !== 'start' && this.nodes2[i][j].status !== 'target' && this.nodes2[i][j].status !== 'wall'){
                        this.nodes2[i][j].status = 'norm'
                        this.nodes[i][j].status = 'norm'
                    }
                    this.nodes2[i][j].distance = Infinity
                    this.nodes2[i][j].isVisited = null
                    this.nodes2[i][j].previousNode = null
                }
            }
        },
        visualiseInstantDijkstra(){
            let startNode = [];
            let finishNode = [];
            
            startNode = this.nodes2[this.isStart[0]][this.isStart[1]];
            finishNode = this.nodes2[this.isEnd[0]][this.isEnd[1]];

            this.visitedNodesInOrder = dijkstra(this.nodes2, startNode, finishNode);
            this.nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
            this.instantDijkstra(this.visitedNodesInOrder, this.nodesInShortestPathOrder);
            this.visitedNodesInOrder= []
            this.nodesInShortestPathOrder = []

            this.djikstraDone = true
            this.algoDone = true
        },
        visualiseDijkstra(){

            if (this.mazeStillGenerating){
                alert("Maze is still generating! Please wait!")
                return
            }
            if (this.algoDone){
                alert('Algo has been visualised!')
                return
            }
            let startNode = [];
            let finishNode = [];
            
            startNode = this.nodes2[this.isStart[0]][this.isStart[1]];
            finishNode = this.nodes2[this.isEnd[0]][this.isEnd[1]];
            this.visitedNodesInOrder = dijkstra(this.nodes2, startNode, finishNode);
            this.nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);

            this.animateDijkstra(this.visitedNodesInOrder, this.nodesInShortestPathOrder);
            this.visitedNodesInOrder= []
            this.nodesInShortestPathOrder = []

            this.djikstraDone = true
            this.algoDone = true
        },
        visualiseInstantDFS(){
            let startNode = [];
            let finishNode = [];
            
            startNode = this.nodes2[this.isStart[0]][this.isStart[1]];
            finishNode = this.nodes2[this.isEnd[0]][this.isEnd[1]];
            this.visitedNodesInOrder = dfs(this.nodes2, startNode, finishNode, this.rows, this.cols);
            this.nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
            this.instantDijkstra(this.visitedNodesInOrder, this.nodesInShortestPathOrder);
            this.visitedNodesInOrder= []
            this.nodesInShortestPathOrder = []

            this.dfsDone = true
            this.algoDone = true
        },
        visualiseDFS(){
            if (this.mazeStillGenerating){
                alert("Maze is still generating! Please wait!")
                return
            }
            if (this.algoDone){
                alert('Algo has been visualised!')
                return
            }
            let startNode = [];
            let finishNode = [];
            
            startNode = this.nodes2[this.isStart[0]][this.isStart[1]];
            finishNode = this.nodes2[this.isEnd[0]][this.isEnd[1]];
            this.visitedNodesInOrder = dfs(this.nodes2, startNode, finishNode, this.rows, this.cols);
            this.nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
            this.animateDijkstra(this.visitedNodesInOrder, this.nodesInShortestPathOrder);
            this.visitedNodesInOrder= []
            this.nodesInShortestPathOrder = []

            this.dfsDone = true
            this.algoDone = true
        },
        animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
            for (let i = 0; i <= visitedNodesInOrder.length; i++) {
                if (i == visitedNodesInOrder.length) {
                    setTimeout(() => {
                        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
                            setTimeout(() => {
                                const node = nodesInShortestPathOrder[i];
                                let row = node.row
                                let col = node.col
                                if (this.nodes[row][col].status == 'visited' || this.nodes[row][col].status == 'visited2'){
                                    this.nodes[row][col].status = 'shortest-path-right'
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
                        if (this.nodes[row][col].status == 'norm') {
                            if (this.castTwo){
                                this.nodes[row][col].status = 'visited2'
                            }
                            else {
                            this.nodes[row][col].status = 'visited'
                            }
                        }
                    }, 5 * i);
                }
            }
        },
        instantDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
            for (let i = 0; i <= visitedNodesInOrder.length; i++) {
                if (i == visitedNodesInOrder.length) {
                    setTimeout (() => {
                        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
                            setTimeout(() => {
                                const node = nodesInShortestPathOrder[i];
                                let row = node.row
                                let col = node.col
                                if (this.nodes2[row][col].status != 'start' && this.nodes2[row][col].status != 'target'){
                                    this.nodes[row][col].status = 'shortest-path-right'
                                }
                            }, 25 * i)
                            
                        }
                    }, 5 * i)

                    return
                    
                }
                else {
                    setTimeout(() => {
                        const node = visitedNodesInOrder[i];
                        let row = node.row
                        let col = node.col
                        if (this.nodes2[row][col].status != 'start' && this.nodes2[row][col].status != 'target') {
                            if (this.castTwo){
                                this.nodes[row][col].status = 'visited2'
                            }
                            else {
                                this.nodes[row][col].status = 'visited'
                            }
                        }
                    }, 5 * i)
                }
            }
        },
        generateHorizontalRecursiveMaze() {
            this.boardGrid = 'whitebackground'
            if (this.mazeGenerated == false){
                this.mazeStillGenerating = true
                console.log("maze generating")
                recursiveDivisionMaze(this.mazewalls ,this.isStart, this.isEnd, this.rows, this.cols, this.nodes, this.nodes2, 2, this.rows-3, 2, this.cols-3, 'horizontal', false )
                let startrowfront = Number(this.isStart[0])
                let startcolfront = Number(this.isStart[1]) +1
                let endrowfront = Number(this.isEnd[0])
                let endcolfront = Number(this.isEnd[1]) +1
                for (let i=0; i<this.mazewalls.length; i++) {
                    setTimeout(() => {
                        let coord = this.mazewalls[i]
                        if (this.nodes[coord[0]][coord[1]].status != 'start' && this.nodes[coord[0]][coord[1]].status != 'target' ){
                        this.nodes[coord[0]][coord[1]].status = 'wall'
                        this.nodes2[coord[0]][coord[1]].status = 'wall'
                    }
                    }, 10* i);
                }
                if (this.nodes[startrowfront][startcolfront].status == 'wall'){
                    this.nodes[startrowfront][startcolfront].status = 'norm'
                    this.nodes2[startrowfront][startcolfront].status = 'norm'
                }
                if (this.nodes[endrowfront][endcolfront].status == 'wall'){
                    this.nodes[endrowfront][endcolfront].status = 'norm'
                    this.nodes2[endrowfront][endcolfront].status = 'norm'
                }
                this.mazeGenerated = true
                setTimeout(() => {
                    this.mazeStillGenerating = false;
                    console.log('maze done')
                    this.boardGrid = 'default'
                }, this.mazewalls.length * 10)
                
            }
            else {
                this.resetboard()
                this.generateHorizontalRecursiveMaze()
            }
            this.castTwo = false
            this.nodes[this.isStart[0]][this.isStart[1]].status = 'start'
            this.nodes[this.isEnd[0]][this.isEnd[1]].status = 'target'
        },
        generateVerticalRecursiveMaze() {
            this.boardGrid = 'whitebackground'
            if (this.mazeGenerated == false){
                this.mazeStillGenerating = true
                console.log("maze generating")
                recursiveDivisionMaze(this.mazewalls ,this.isStart, this.isEnd, this.rows, this.cols, this.nodes, this.nodes2, 2, this.rows-3, 2, this.cols-3, 'vertical', false )
                let startrowfront = Number(this.isStart[0])
                let startcolfront = Number(this.isStart[1]) +1
                let endrowfront = Number(this.isEnd[0])
                let endcolfront = Number(this.isEnd[1]) +1

                for (let i=0; i<this.mazewalls.length; i++) {
                    setTimeout(() => {
                        const coord = this.mazewalls[i]
                        if (this.nodes[coord[0]][coord[1]].status != 'start' && this.nodes[coord[0]][coord[1]].status != 'target' ){
                        this.nodes[coord[0]][coord[1]].status = 'wall'
                        this.nodes2[coord[0]][coord[1]].status = 'wall'
                    }
                    }, 10* i);
                }
                
                if (this.nodes[startrowfront][startcolfront].status == 'wall'){
                    this.nodes[startrowfront][startcolfront].status = 'norm'
                    this.nodes2[startrowfront][startcolfront].status = 'norm'
                }
                if (this.nodes[endrowfront][endcolfront].status == 'wall'){
                    this.nodes[endrowfront][endcolfront].status = 'norm'
                    this.nodes2[endrowfront][endcolfront].status = 'norm'
                }
                this.mazeGenerated = true
                setTimeout(() => {
                    this.mazeStillGenerating = false;
                    console.log('maze done')
                    this.boardGrid = 'default'
                }, this.mazewalls.length * 10)
            }
            else {
                this.resetboard()
                this.generateVerticalRecursiveMaze()           
            }
            this.castTwo = true
            this.nodes[this.isStart[0]][this.isStart[1]].status = 'start2'
            this.nodes[this.isEnd[0]][this.isEnd[1]].status = 'target2'
        },
        resetboard() {
            if (this.mazeStillGenerating){
                alert("maze still generating!! Please wait for maze to finish")
                return
            }
            if (this.usedboard == true || this.mazeGenerated == true || this.algoDone == true){
                this.nodes2 = []
                for (let row = 0; row < this.rows; row++){
                    const currentRow = {}
                    const currentRow2 = []
                    for (let col = 0; col <this.cols; col++){
                        var currentNode = {col: col, row: row, status: 'norm', distance: Infinity, previousNode: null}
                        var currentNode2 = {col: col, row: row, status: 'norm', distance: Infinity, previousNode: null}
                        if (row == this.isStart[0] && col == this.isStart[1]){
                            if (this.castTwo){
                                currentNode.status = 'start2'
                            }
                            else{
                                currentNode.status = 'start'
                            }
                            currentNode2.status = 'start'
                        }
                        else if (row == this.isEnd[0] && col == this.isEnd[1]){
                            if (this.castTwo){
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
                    this.nodes[row] = currentRow
                    this.nodes2.push(currentRow2)
                }
                this.mazeGenerated = false
                this.usedboard = false
                this.mazewalls = []
                this.djikstraDone = false
                this.dfsDone = false
                this.algoDone = false

            }
        }
    },
    async created() {
        this.width = window.innerWidth
        this.cols = Math.floor(this.width*0.9/25)
        this.isStart = [16,Math.floor(this.cols/5)]
        this.isEnd = [16,Math.floor(this.cols*4/5)]
        for (let row = 0; row < this.rows; row++){
            const currentRow = {}
            const currentRow2 = []
            for (let col = 0; col <this.cols; col++){
                var currentNode = {col: col, row: row, status: 'norm', distance: Infinity, previousNode: null}
                var currentNode2 = {col: col, row: row, status: 'norm', distance: Infinity, previousNode: null}
                if (row == this.isStart[0] && col == this.isStart[1]){
                    currentNode.status = 'start'
                    currentNode2.status = 'start'
                }
                else if (row == this.isEnd[0] && col == this.isEnd[1]){
                    currentNode.status = 'target'
                    currentNode2.status = 'target'
                }
                currentRow[col] = currentNode
                currentRow2.push(currentNode2)
            }
            this.nodes[row] = currentRow
            this.nodes2.push(currentRow2)
        }
    },
    watch: {
        cols(){
            this.isStart = [16,Math.floor(this.cols/5)]
            this.isEnd = [16,Math.floor(this.cols*4/5)]
            const intermediate = {}
            const intermediate2 = []
            for (let row = 0; row < this.rows; row++){
                const currentRow = {}
                const currentRow2 = []
                for (let col = 0; col <this.cols; col++){
                    var currentNode = {col: col, row: row, status: 'norm', distance: Infinity, previousNode: null}
                    var currentNode2 = {col: col, row: row, status: 'norm', distance: Infinity, previousNode: null}
                    if (row == this.isStart[0] && col == this.isStart[1]){
                        if (this.castTwo){
                            currentNode.status = 'start2'
                        }
                        else{
                            currentNode.status = 'start'
                        }
                        currentNode2.status = 'start'
                    }
                    else if (row == this.isEnd[0] && col == this.isEnd[1]){
                        if (this.castTwo){
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
                intermediate[row] = currentRow
                intermediate2.push(currentRow2)
            }
            this.nodes = intermediate
            this.nodes2 = intermediate2
            this.mazeGenerated = false
            this.usedboard = false
            this.mazewalls = []
            this.djikstraDone = false
            this.dfsDone = false
            this.algoDone = false
            },
    },
    mounted() {
        window.onresize = () => {
            this.width = window.innerWidth
            this.cols = Math.floor(0.9*window.innerWidth/25)
        }
        // this.generateHorizontalRecursiveMaze()
    }
};
</script>
<style scoped>
    @import '@/assets/styling/algoStyler.css';
</style>