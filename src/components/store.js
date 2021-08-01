// import { UseStore } from "zustand";

import create from "zustand/vanilla";

export const mazeConfig = {
  // maze count should always be odd
  maze_col: 13,
  maze_row: 13,
  cube_size: 1,
};

const useStore = create((set) => {});

export default useStore;
