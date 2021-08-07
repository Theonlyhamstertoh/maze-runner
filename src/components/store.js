// import { UseStore } from "zustand";

import create from "zustand";

export const mazeConfig = {
  // maze count should always be odd
  maze_col: 9,
  maze_row: 9,
  wall_width: 1,
  wall_height: 1,
  wall_depth: 1,
};

const useMazeStore = create((set) => ({
  mazedGenerated: false,
  setMazedGenerated: (boolean) => set((state) => ({ mazedGenerated: boolean })),
}));

export default useMazeStore;
