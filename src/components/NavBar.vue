<template>
  <nav id="second" class="navbar navbar-expand-lg">
    <div class="container-fluid d-flex" style="margin-left: 5%; margin-right:5%">
      <!-- Tutorial Modals -->
      <Tutorial />
      <button class="navbar-toggler float-right" style="margin-right: 0px;" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse mb-2 mb-lg-0" style="margin-right: 0px;" id="navbarNav">
        <ul class="navbar-nav d-flex align-items-center" style="background-color:#5d91fe">
          <li class="nav-item">
            <button class="btn navbar-btn me-auto" @click="visualiseDijkstra(false)">Dijkstra</button>
          </li>
          <li class="nav-item">
            <button class="btn navbar-btn me-auto" @click="visualiseDFS(false)">DFS</button>
          </li>
          <li class="nav-item">
            <button class="btn navbar-btn me-auto" @click="resetboard">Clear All</button>
          </li>
          <li class="nav-item">
            <button class="btn navbar-btn me-auto" @click="generateHorizontalRecursiveMaze">Random Recursive Maze (Horizontal)</button>
          </li>
          <li class="nav-item">
            <button class="btn navbar-btn me-auto" @click="generateVerticalRecursiveMaze">Random Recursive Maze (Vertical)</button>
          </li>
          <li class="nav-item ms-3 d-inline">
            <span class="me-1 d-inline">Speed:</span>
            <select id="visualisationSpeed" class="selectlabel d-inline" @change="changeVisualisationSpeed">
              <option value="fast">Fast</option>
              <option value="medium">Medium</option>
              <option value="slow">Slow</option>
            </select>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>


<script>
    import Tutorial from './Tutorial.vue';

    export default {
        components: {
            Tutorial,
        },
        methods: {
            visualiseDijkstra(isBoardValidated) {
                this.$emit('visualiseDijkstra', isBoardValidated);
            },
            visualiseDFS(isBoardValidated) {
                this.$emit('visualiseDFS', isBoardValidated);
            },
            resetboard() {
                this.$emit('resetboard');
            },
            generateHorizontalRecursiveMaze() {
                this.$emit('generateHorizontalRecursiveMaze');
            },
            generateVerticalRecursiveMaze() {
                this.$emit('generateVerticalRecursiveMaze');
            },
            changeVisualisationSpeed(event) {
              const speed = event.target.value;
              this.$emit('changeVisualisationSpeed', speed);
            },
        }
    }
</script>

<style scoped>
    @import '@/assets/styling/algoStyler.css';
</style>