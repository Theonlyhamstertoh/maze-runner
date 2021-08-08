import { flipToOppositeDirection } from "./useMaze";
export default function breakWalls(currentPoint, moveToGridPoint) {
  // ex. if "E", return "W"
  const oppositeDirection = flipToOppositeDirection[currentPoint.direction];

  // set the walls in the direction to false
  currentPoint[currentPoint.direction] = false;
  moveToGridPoint[oppositeDirection] = false;
}
