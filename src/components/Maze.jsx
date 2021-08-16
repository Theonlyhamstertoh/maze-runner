import { useControls } from "leva";
import React, { useRef, useLayoutEffect, useMemo } from "react";
import * as THREE from "three";

/**
 *
 * Display the maze with instanced walls
 *
 */

const tempObject = new THREE.Object3D();
export default function Maze({ mazeMap, mazeConfig, level }) {
  const ref = useRef();

  const { maze_col, maze_row, wall_width, wall_height, wall_depth } = mazeConfig;

  const wallColor = useMemo(() => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${0 + level * 4}, 80%, 30%)`;
  }, [level]);
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

    function addToInstanceMesh() {
      tempObject.updateMatrix();
      ref.current.setMatrixAt(instanceIndex, tempObject.matrix);
      instanceIndex++;
    }

    for (let x = 0; x < maze_col; x++) {
      for (let z = 0; z < maze_row; z++) {
        const cell = mazeMap[x][z];
        // iterate through each direction to create wall
        if (cell.N) {
          tempObject.rotation.y = Math.PI / 2;
          tempObject.position.set(cell.x, cell.y, cell.z + 0.5);
          addToInstanceMesh();
        }
        if (cell.E) {
          tempObject.rotation.y = 0;
          tempObject.position.set(cell.x + 0.5, cell.y, cell.z);
          addToInstanceMesh();
        }
        if (cell.S) {
          tempObject.rotation.y = Math.PI / 2;
          tempObject.position.set(cell.x, cell.y, cell.z - 0.5);
          addToInstanceMesh();
        }
        if (cell.W) {
          tempObject.rotation.y = 0;
          tempObject.position.set(cell.x - 0.5, cell.y, cell.z);
          addToInstanceMesh();
        }
      }
    }

    console.log(instanceIndex, maze_col);
    ref.current.instanceMatrix.needsUpdate = true;
  }, [level]);
  return (
    <instancedMesh ref={ref} args={[null, null, totalWallCount * 3]}>
      <boxBufferGeometry args={[wall_width, wall_height, wall_depth + wall_width]} />
      <meshStandardMaterial metalness={0.2} roughness={0.7} envMapIntensity={9} color={wallColor} />
    </instancedMesh>
  );
}
