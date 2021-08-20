import carve_passage_from from "./carvePassageFrom";
import breakWalls from "./breakWalls";
import removeDuplicateWalls from "./removeDuplicateWalls";
import findDirectionsToMove from "./findDirectionsToMove";

/**
 *
 * This function carves out the maze
 *
 */
export default function create_maze({ maze_col, maze_row }) {
  // initialize starting maze point
  const stack = [];
  // grid that will be filled with all the valid points to go. Basically creates a zone to prevent generator from going off to infinity.
  const grid = [];

  // fills the array with arrays to make it multi-dimensional (to think of it, think of a table. The x becomes the columns and the z becomes the rows)
  // ex. [ [ {...code}, {...code} ] ] => array[0][1]
  // x and z are used as indexes in the array
  for (let x = 0; x < maze_col; x++) {
    // initialize this index as a array
    grid[x] = [];
    for (let z = 0; z < maze_row; z++) {
      // create a object at this index position inside array of an array.
      // ex. [ [ {...code}, {...code} ] ]
      grid[x][z] = {
        x,
        y: 0,
        z,
        visited: false,
        direction: null,
        N: true,
        E: true,
        S: true,
        W: true,
      };
    }
  }

  // push initial starting point. In future, this can be a random point so the starting position is unique.
  stack.push(grid[0][0]);

  // The implementation of the maze that generates the maze coordinates.
  while (stack.length !== 0) {
    // get the newest item (or the last item in array) pushed and its value
    const currentPoint = stack[stack.length - 1];
    const possibleDirections = findDirectionsToMove(
      currentPoint.x,
      currentPoint.z,
      grid,
      maze_col,
      maze_row
    );

    // check to make sure there are possible directions to move
    if (possibleDirections === null) {
      // if we hit a dead-end, go back to the previous position
      stack.pop();
    } else {
      // return the new point the generator will move towards
      const moveToGridPoint = carve_passage_from(grid, possibleDirections, currentPoint);
      breakWalls(currentPoint, moveToGridPoint);
      removeDuplicateWalls(currentPoint, grid, maze_col, maze_row);
      // push the current position onto stack
      stack.push(moveToGridPoint);
    }

    // either way, if directions are defined and not defined, I want to set the previous position as visited so that on the next iteration, it won't move to the same place again.
    currentPoint.visited = true;
  }
  return grid;
}
