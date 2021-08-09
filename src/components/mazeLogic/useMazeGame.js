import create_maze from "./create_maze";
import { useMemo, useState } from "react";
import useMazeStore from "../store";
import shallow from "zustand/shallow";

export const convertToXDirection = { E: 1, W: -1, N: 0, S: 0 };
export const convertToZDirection = { E: 0, W: 0, N: 1, S: -1 };
export const flipToOppositeDirection = { E: "W", S: "N", N: "S", W: "E" };
export const all_directions = ["E", "W", "S", "N"];

export default function useMazeGame() {
  const [mazeConfig, setMazeSize, setNextLevel, decrementLevel] = useMazeStore(
    (state) => [
      state.mazeConfig,
      state.setMazeSize,
      state.nextLevel,
      state.decrementLevel,
      state.setMazeGenerated,
    ],
    shallow
  );

  const nextRound = () => {
    setMazeSize(mazeConfig.maze_col + 2, mazeConfig.maze_row + 2);
    setNextLevel();
  };

  const toPrevRound = () => {
    setMazeSize(mazeConfig.maze_col - 2, mazeConfig.maze_row - 2);
    decrementLevel();
  };
  const mazeMap = useMemo(() => create_maze(mazeConfig), [mazeConfig]);

  return [mazeMap, mazeConfig, nextRound, toPrevRound];
}
