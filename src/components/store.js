// import { UseStore } from "zustand";

import create from "zustand";

export const mazeConfig = {
  // maze count should always be odd
  maze_col: 55,
  maze_row: 55,
  cube_size: 1,
};

const useMazeStore = create((set) => ({
  mazedGenerated: false,
  setMazedGenerated: (boolean) => set((state) => ({ mazedGenerated: boolean })),
}));

export default useMazeStore;
