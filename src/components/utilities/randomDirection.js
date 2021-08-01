export default function randomDirection() {
  const all_directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  for (let i = all_directions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [all_directions[i], all_directions[j]] = [all_directions[j], all_directions[i]];
  }
  return all_directions;
}
