# Algorithm Visualizer

Built entirely in Vue.js, this website allows users to understand more about algorithms through fun and interactive visualisations from start to end, along with the shortest paths.

https://algorithm-visualizer-tau-amber.vercel.app/

## Demo

## Features

_Finding Shortest Path_: Each algorithm will run through the maze from the start to end node, upon reaching the end node, it will run through all visited nodes and find the shortest path to the end node
_Movable Start & End Nodes_: Both nodes can be moved to any desired position on the grid
_Dynamic Walls_: Clicking/Click & Dragging on an empty node will create wall nodes, in which each algorithm will not traverse
_Recursive Maze_: Random mazes can be generated, through recursion, which would populate the entire grid

## Expansion

- _More Algos!_: Additional algorithms can be added as desired
- _'Bomb' Node_: Adding a separate node type into the grid, in which the start node will have to search for the 'bomb' node first, before applying the same/different algorithm again from the 'bomb' node, creating an additional element of recursion/complexity with multiple algorithms working together
- _Timer_: Implementing a timer when each algorithm is ran from start to end node

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
