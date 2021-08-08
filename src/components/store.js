// import { UseStore } from "zustand";

import create from "zustand";

const useMazeStore = create((set) => ({
  mazedGenerated: false,
  level: 1,
  mazeConfig: {
    maze_col: 3,
    maze_row: 3,
    wall_width: 0.25,
    wall_height: 1,
    wall_depth: 1,
  },
  setMazeSize: (col, row) => {
    set((state) => ({
      mazeConfig: {
        ...state.mazeConfig,
        maze_col: col,
        maze_row: row,
      },
    }));
  },
  nextLevel: () => set((state) => ({ level: state.level + 1 })),
  setMazedGenerated: (boolean) => set((state) => ({ mazedGenerated: boolean })),
}));

export default useMazeStore;
