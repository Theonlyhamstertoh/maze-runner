import { convertToXDirection, convertToZDirection } from "./mazeLogic/useMaze";

export default function getNewPointsInRange(grid, cardinal, x, z) {
  const newXPoint = x + convertToXDirection[cardinal];
  const newZPoint = z + convertToZDirection[cardinal];

  // first check if x is in valid range
  if (grid.length - 1 >= newXPoint && 0 <= newXPoint) {
    // We also check if z is in valid range.
    if (grid.length - 1 >= newZPoint && 0 <= newZPoint) {
      const newPoint = grid[newXPoint][newZPoint];
      return newPoint;
    }
  }
  return null;
}
