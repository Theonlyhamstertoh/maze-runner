import { all_directions } from "./useMazeGame";
import randomizeOrder from "./randomizeOrder";
import getNewPointsInRange from "./getNewPointsInRange";

// this function will find all possible directions the current generator can move. It will return them as a array.
export default function findDirectionsToMove(x, z, grid) {
  // randomly chose a direction to go from
  const cardinalDirections = randomizeOrder([...all_directions]);
  const possibleDirection = [];
  // this will generate possible directions
  cardinalDirections.forEach((cardinal) => {
    // moveToGridPoint represent the point we will be moving to next. In another word, the new position
    const possibleNewPosition = getNewPointsInRange(grid, cardinal, x, z);
    // fromGridPoint is the point we are currently at.

    // check for visited points
    if (possibleNewPosition && possibleNewPosition.visited === false) {
      // once we are here, it means we have found a viable path and a unvisited point.
      // push any potential paths to the array for access below
      possibleDirection.push({
        x: possibleNewPosition.x,
        z: possibleNewPosition.z,
        direction: cardinal,
      });
    }
  });

  // return null if no directions, else return directions
  return possibleDirection.length === 0 ? null : possibleDirection;
}
