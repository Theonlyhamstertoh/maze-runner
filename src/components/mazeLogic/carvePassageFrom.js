export default function carve_passage_from(grid, possibleDirections, currentPoint) {
  // pick a random index
  const randomIndex = Math.floor(Math.random() * possibleDirections.length);
  // select the random direction
  const chosenDirection = possibleDirections[randomIndex];
  const moveToGridPoint = grid[chosenDirection.x][chosenDirection.z];
  currentPoint.direction = chosenDirection.direction;
  return moveToGridPoint;
}
