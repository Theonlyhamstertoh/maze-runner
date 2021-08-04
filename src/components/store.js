// import { UseStore } from "zustand";

import create from "zustand";

export const mazeConfig = {
  // maze count should always be odd
  maze_col: 13,
  maze_row: 13,
  cube_size: 1,
};

const useMazeStore = create((set) => ({
  mazedGenerated: false,
  setMazedGenerated: (boolean) => set((state) => ({ mazedGenerated: boolean })),
}));

export default useMazeStore;
// export default function Maze() {
//   // related to maze dimensions
//   const group = useRef();
//   const ref = useRef();
//   const { maze_col, maze_row, cube_size } = mazeConfig;
//   const stack = useCallback(() => create_passage(), []);
//   useLayoutEffect(() => {
//     const nodes = stack();
//     if (nodes.length === 0) return;
//     nodes.forEach((cell, i) => {
//       i < 10 && console.log(cell);
//       tempObject.position.set(cell.x, cell.y, cell.z);
//       tempObject.updateMatrix();
//       ref.current.setMatrixAt(i, tempObject.matrix);
//     });
//     ref.current.instanceMatrix.needsUpdate = true;

//     // center the group
//     group.current.position.set(-Math.floor(maze_col / 2), 0, -Math.floor(maze_row / 2));
//   }, [stack]);

//   const totalSize = maze_col * maze_row;
//   return (
//     <group ref={group}>
//       <instancedMesh ref={ref} args={[null, null, totalSize]}>
//         <boxBufferGeometry args={[0.01, cube_size / 2, 1]} />
//         <meshBasicMaterial color="lightblue" />
//       </instancedMesh>
//     </group>
//   );
// }
