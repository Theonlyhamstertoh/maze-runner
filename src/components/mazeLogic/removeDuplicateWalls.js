import getNewPointsInRange from "../getNewPointsInRange";
import { all_directions, flipToOppositeDirection } from "./useMaze";

export default function removeDuplicateWalls(currentPoint, grid) {
  // ex. cardinals === [true, true, false, true] (the order below matter)
  const wallBooleans = [currentPoint.E, currentPoint.W, currentPoint.S, currentPoint.N];
  wallBooleans.forEach((haveWall, i) => {
    if (haveWall) {
      // ex. true => "N" based on the current index
      const direction = all_directions[i];
      // get the following point
      const neighborPoint = getNewPointsInRange(grid, direction, currentPoint.x, currentPoint.z);

      // If the following point has a existing wall, set currentPoint direction as false to not generate duplicate walls
      // reverse to check if there are walls
      const oppositeDirection = flipToOppositeDirection[direction];
      if (neighborPoint && neighborPoint[oppositeDirection]) currentPoint[direction] = false;
    }
  });
}
