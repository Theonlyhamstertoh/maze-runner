// import { UseStore } from "zustand";

import create from "zustand";

const INITIAL = {
  maze_col: 3,
  maze_row: 3,
  wall_width: 0.25,
  wall_height: 1,
  wall_depth: 1,
};
const useMazeStore = create((set) => ({
  mazedGenerated: false,
  level: 1,
  mazeConfig: { ...INITIAL },
  setMazeSize: (col, row) => {
    set((state) => ({
      mazeConfig: {
        ...state.mazeConfig,
        maze_col: col >= 3 ? col : INITIAL.maze_col,
        maze_row: row >= 3 ? row : INITIAL.maze_row,
      },
    }));
  },
  nextLevel: () => set((state) => ({ level: state.level + 1 })),
  decrementLevel: () => set((state) => ({ level: state.level - 1 })),
  setMazedGenerated: (boolean) => set((state) => ({ mazedGenerated: boolean })),
}));

export default useMazeStore;
