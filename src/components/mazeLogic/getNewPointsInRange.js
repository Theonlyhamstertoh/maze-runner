import { convertToXDirection, convertToZDirection } from "./useMazeGame";

export default function getNewPointsInRange(grid, cardinal, x, z, maze_col, maze_row) {
  const newXPoint = x + convertToXDirection[cardinal];
  const newZPoint = z + convertToZDirection[cardinal];

  // first check if x is in valid range
  if (maze_col - 1 >= newXPoint && 0 <= newXPoint) {
    // We also check if z is in valid range.
    if (maze_row - 1 >= newZPoint && 0 <= newZPoint) {
      const newPoint = grid[newXPoint][newZPoint];
      return newPoint;
    }
  }
  return null;
}
