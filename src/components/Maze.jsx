import { useBox } from "@react-three/cannon";
import { useControls } from "leva";
import React, { useRef, useLayoutEffect, useMemo, useEffect } from "react";
import * as THREE from "three";

/**
 *
 * Display the maze with instanced walls
 *
 */

export default function Maze({ mazeMap, mazeConfig, level, wallColor }) {
  const { maze_col, maze_row, wall_width, wall_height, wall_depth } = mazeConfig;
  const [ref, api] = useBox(() => ({
    mass: 0,
    args: [wall_width, wall_height, wall_depth + wall_width],
  }));

  const totalWallCount = useMemo(() => {
    let count = 0;
    for (let x = 0; x < maze_col; x++) {
      for (let z = 0; z < maze_row; z++) {
        const cell = mazeMap[x][z];
        if (cell.N) count++;
        if (cell.E) count++;
        if (cell.S) count++;
        if (cell.W) count++;
      }
    }
    return count;
  }, [level]);

  useLayoutEffect(() => {
    if (mazeMap.length === 0) return;
    let instanceIndex = 0;

    for (let x = 0; x < maze_col; x++) {
      for (let z = 0; z < maze_row; z++) {
        const cell = mazeMap[x][z];

        // iterate through each direction to create wall
        if (cell.N) {
          api.at(instanceIndex).rotation.set(0, Math.PI / 2, 0);
          api.at(instanceIndex).position.set(cell.x, cell.y, cell.z + 0.5);
          instanceIndex++;
        }
        if (cell.E) {
          api.at(instanceIndex).position.set(cell.x + 0.5, cell.y, cell.z);
          instanceIndex++;
        }
        if (cell.S) {
          api.at(instanceIndex).rotation.set(0, Math.PI / 2, 0);
          api.at(instanceIndex).position.set(cell.x, cell.y, cell.z - 0.5);
          instanceIndex++;
        }
        if (cell.W) {
          api.at(instanceIndex).position.set(cell.x - 0.5, cell.y, cell.z);
          instanceIndex++;
        }
      }
    }
  }, [level]);
  return (
    <instancedMesh ref={ref} args={[null, null, totalWallCount]}>
      <boxBufferGeometry args={[wall_width, wall_height, wall_depth + wall_width]} />
      <meshStandardMaterial metalness={0.2} roughness={0.7} envMapIntensity={9} color={wallColor} />
    </instancedMesh>
  );
}
