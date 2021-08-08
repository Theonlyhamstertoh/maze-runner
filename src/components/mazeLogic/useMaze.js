import create_maze from "./create_maze";
import { useMemo, useState } from "react";
import useMazeStore from "../store";

export const convertToXDirection = { E: 1, W: -1, N: 0, S: 0 };
export const convertToZDirection = { E: 0, W: 0, N: 1, S: -1 };
export const flipToOppositeDirection = { E: "W", S: "N", N: "S", W: "E" };
export const all_directions = ["E", "W", "S", "N"];

export default function useMaze() {
  const mazeConfig = useMazeStore((state) => state.mazeConfig);
  const mazeMap = useMemo(() => create_maze(mazeConfig), []);

  return [mazeMap];
}
