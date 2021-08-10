import create from "zustand";

const INITIAL = {
  maze_col: 3,
  maze_row: 3,
  wall_width: 0.3,
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
        maze_col: col >= INITIAL.maze_col ? col : INITIAL.maze_col,
        maze_row: row >= INITIAL.maze_row ? row : INITIAL.maze_row,
      },
    }));
  },
  nextLevel: () => set((state) => ({ level: state.level + 1 })),
  decrementLevel: () => set((state) => ({ level: state.level > 0 ? state.level - 1 : 0 })),
  setMazedGenerated: (boolean) => set((state) => ({ mazedGenerated: boolean })),
}));

export default useMazeStore;
