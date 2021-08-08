import React, { useRef, useLayoutEffect, useMemo, useState, useEffect, useCallback } from "react";
import useMazeStore from "./store";
import * as THREE from "three";
import useMaze from "./mazeLogic/useMaze";

/**
 *
 * Maze Displayer
 *
 */
function giveRandomPosition(length, object) {
  const randomX = Math.floor(Math.random() * length);
  const randomZ = Math.floor(Math.random() * length);
  object.current.position.set(randomX, 0, randomZ);
}
const tempObject = new THREE.Object3D();
export default function Maze() {
  // related to maze dimensions
  const group = useRef();
  const ref = useRef();
  const playerRef = useRef();
  const goalRef = useRef();

  const { maze_col, maze_row, wall_width, wall_height, wall_depth } = useMazeStore(
    (state) => state.mazeConfig
  );
  const [mazeMap] = useMaze();
  useLayoutEffect(() => {
    if (mazeMap.length === 0) return;
    let instanceIndex = 0;

    // there is probably a better way to do this.
    giveRandomPosition(mazeMap.length, playerRef);
    giveRandomPosition(mazeMap.length, goalRef);

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

    ref.current.instanceMatrix.needsUpdate = true;

    // center the group
    group.current.position.set(-Math.floor(maze_col / 2), 0, -Math.floor(maze_row / 2));
  }, []);

  const totalSize = maze_col * maze_row;
  return (
    <>
      <group ref={group}>
        <instancedMesh ref={ref} args={[null, null, totalSize * 10]}>
          <boxBufferGeometry args={[wall_width, wall_height, wall_depth + wall_width]} />
          <meshNormalMaterial />
        </instancedMesh>
        <mesh ref={goalRef}>
          <boxBufferGeometry args={[0.5, 0.5, 0.5]} />
          <meshBasicMaterial color="blue" />
        </mesh>
        <mesh ref={playerRef}>
          <boxBufferGeometry args={[0.5, 0.5, 0.5]} />
          <meshBasicMaterial color="gold" />
        </mesh>
      </group>
    </>
  );
}
