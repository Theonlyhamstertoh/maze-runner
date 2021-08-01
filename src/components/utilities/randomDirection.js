export default function randomDirection() {
  const all_directions = ["E", "W", "S", "N"];

  for (let i = all_directions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [all_directions[i], all_directions[j]] = [all_directions[j], all_directions[i]];
  }
  return all_directions;
}
