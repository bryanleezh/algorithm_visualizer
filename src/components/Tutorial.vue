<template>
    <div class="float-left" id="mycustommodal tutorial">
        <div class="modal fade" id="tutorialpage1" aria-hidden="true" aria-labelledby="tutorialpage1Label" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5 mx-auto" id="tutorialpage1Label">Welcome to Algorithm Visualiser!</h1>
                    </div>
                    <div class="modal-body">
                        <h6>We'll take you through a short tutorial and show you the features available in this application.</h6>
                        <img id="mainTutorialImage" src="../assets/styling/welcomeicon.png">
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="skipButton" class="btn btn-default navbar-btn" data-bs-dismiss="modal">Close</button>
                        <button id="modalButton" class="btn btn-default navbar-btn" data-bs-target="#tutorialpage2" data-bs-toggle="modal">Next</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="tutorialpage2" aria-hidden="true" aria-labelledby="tutorialpage2Label" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5 mx-auto" id="tutorialpage2Label">What is a pathfinding algorithm?</h1>
                    </div>
                    <div class="modal-body">
                        <h6>A pathfinding algorithm explores routes between nodes and ultimately seeks to find the shortest path between 2 points</h6>
                        <img id="mainTutorialImage" src="../assets/styling/destination.png">
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="skipButton" class="btn btn-default navbar-btn" data-bs-dismiss="modal">Close</button>
                        <button id="modalButton" class="btn btn-default navbar-btn" data-bs-target="#tutorialpage1" data-bs-toggle="modal">Previous</button>
                        <button id="modalButton" class="btn btn-default navbar-btn" data-bs-target="#tutorialpage3" data-bs-toggle="modal">Next</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="tutorialpage3" aria-hidden="true" aria-labelledby="tutorialpage3Label" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5 mx-auto" id="tutorialpage3Label">Algorithms Offered</h1>
                    </div>
                    <div class="modal-body">
                        <h6>Select an algorithm you would like to learn about from the "Algorithm" drop-down menu</h6>
                        Our application currently supports these algorithms
                        <div class="container-fluid">
                            <div class="row align-items-center">
                                <div class="col-md-6">Dijkstra's Algo</div>
                                <div class="col-md-6">Depth-First Search</div>
                            </div>
                            
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="skipButton" class="btn btn-default navbar-btn" data-bs-dismiss="modal">Close</button>
                        <button id="modalButton" class="btn btn-default navbar-btn" data-bs-target="#tutorialpage2" data-bs-toggle="modal">Previous</button>
                        <button id="modalButton" class="btn btn-default navbar-btn" data-bs-target="#tutorialpage4" data-bs-toggle="modal">Next</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="tutorialpage4" aria-hidden="true" aria-labelledby="tutorialpage4Label" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5 mx-auto" id="tutorialpage4Label">Add Ons</h1>
                    </div>
                    <div class="modal-body">
                        <b>Walls:</b> Impenetrable nodes that a path cannot cross
                        <br>
                        Access these additional features via the visualizer navbar
                        Click and drag on the start and target nodes to move them!!
                        <br>
                        <div class="container-fluid">
                            <div class="row align-items-center">
                                <div><img id="mainTutorialImage" src="../assets/styling/wall.png"></div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="skipButton" class="btn btn-default navbar-btn" data-bs-dismiss="modal">Close</button>
                        <button id="modalButton" class="btn btn-default navbar-btn" data-bs-target="#tutorialpage3" data-bs-toggle="modal">Previous</button>
                        <button id="modalButton" class="btn btn-default navbar-btn" data-bs-target="#tutorialpage5" data-bs-toggle="modal">Next</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="tutorialpage5" aria-hidden="true" aria-labelledby="tutorialpage5Label" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5 mx-auto" id="tutorialpage4Label">Extra Features!</h1>
                    </div>
                    <div class="modal-body">
                        <h6>Use the navbar buttons to clear different objects</h6>
                        You can clear the current path, walls and the entire board!
                        <br>
                        If you want to access this tutorial again, click on "Tutorial" button below the navbar!
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="skipButton" class="btn btn-default navbar-btn" data-bs-dismiss="modal">Close</button>
                        <button id="modalButton" class="btn btn-default navbar-btn" data-bs-target="#tutorialpage4" data-bs-toggle="modal">Previous</button>
                        <button id="modalButton" class="btn btn-default navbar-btn" data-bs-target="#tutorialpage6" data-bs-toggle="modal">Next</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="tutorialpage6" aria-hidden="true" aria-labelledby="tutorialpage6Label" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5 mx-auto" id="tutorialpage6Label">You are all set!</h1>
                    </div>
                    <div class="modal-body">
                        <h6>Have fun learning and visualising the algorithms!!</h6>
                        <img id="mainTutorialImage" src="../assets/styling/welcomeicon.png">
                    </div>
                    <div class="modal-footer">
                        <button id="modalButton" class="btn btn-default navbar-btn" data-bs-target="#tutorialpage5" data-bs-toggle="modal">Previous</button>
                        <button id="modalButton" class="btn btn-default navbar-btn" data-bs-dismiss="modal">Finish</button>
                    </div>
                </div>
            </div>
        </div>
        <a id="navbarButton" class="btn btn-primary" data-bs-toggle="modal" href="#tutorialpage1" role="button">Tutorial</a>
    </div>
</template>

<script>
    export default {
        name: 'Tutorial',
    };
</script>

<style scoped>
    @import '@/assets/styling/algoStyler.css';
</style>