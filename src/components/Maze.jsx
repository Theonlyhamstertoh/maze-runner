import React, { useRef, useLayoutEffect, useMemo } from "react";
import { mazeConfig } from "./store";
import * as THREE from "three";
import { Center } from "@react-three/drei";

const tempObject = new THREE.Object3D();
export default function Maze() {
  // related to maze dimensions
  const { grid } = useGenerateMazeCoords();
  const { maze_col, maze_row, cube_size } = mazeConfig;
  const group = useRef();

  useLayoutEffect(() => {
    grid.forEach((cell, i) => {
      tempObject.position.set(cell.x, cell.y, cell.z);
      tempObject.updateMatrix();
      ref.current.setMatrixAt(i, tempObject.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;

    // center the group
    const box3D = new THREE.Box3().setFromObject(group.current);
    console.log(Math.floor(maze_col / 2));

    group.current.position.set(-Math.floor(maze_col / 2), 0, -Math.floor(maze_row / 2));
  }, [cube_size]);
  const ref = useRef();

  const totalSize = maze_col * maze_row;
  return (
    <group ref={group}>
      <instancedMesh ref={ref} args={[null, null, totalSize]}>
        <boxBufferGeometry args={[cube_size, cube_size, cube_size]} />
        <meshBasicMaterial color="lightblue" wireframe />
      </instancedMesh>
    </group>
  );
}

function useRandomDirection() {
  const all_directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
}
function useGenerateMazeCoords() {
  const { maze_col, maze_row, cube_size } = mazeConfig;

  const grid = useMemo(() => []);

  useLayoutEffect(() => {
    for (let x = 0; x < maze_col; x++) {
      for (let z = 0; z < maze_row; z++) {
        grid.push(new Cell(x * cube_size, 0, z * cube_size));
      }
    }
  }, []);

  return { grid };
}
class Cell {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  show() {
    const x = this.x * mazeConfig.cube_size;
    const z = this.z * mazeConfig.cube_size;
  }
}
function MazeBlock() {}
