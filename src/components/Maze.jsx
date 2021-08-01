import React, { useRef, useLayoutEffect, useMemo, useState, useEffect } from "react";
import useStore, { mazeConfig } from "./store";
import * as THREE from "three";
import Cell from "./Cell";
import randomDirection from "./utilities/randomDirection";
const tempObject = new THREE.Object3D();

/**
 *
 * Maze Displayer
 *
 */

export default function Maze() {
  // related to maze dimensions
  const group = useRef();
  const ref = useRef();
  useGenerateMazeCoords(ref);
  const { maze_col, maze_row, cube_size } = mazeConfig;

  useLayoutEffect(() => {
    // unvisited.forEach((cell, i) => {
    //   tempObject.position.set(cell.x, cell.y, cell.z);
    //   tempObject.updateMatrix();
    //   ref.current.setMatrixAt(i, tempObject.matrix);
    // });
    // ref.current.instanceMatrix.needsUpdate = true;

    // center the group
    group.current.position.set(-Math.floor(maze_col / 2), 0, -Math.floor(maze_row / 2));
  }, [cube_size]);

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

/**
 *
 * Maze Generator
 *
 */

function useGenerateMazeCoords() {
  const { maze_col, maze_row, cube_size } = mazeConfig;
  // const { visited, setVisited, unvisited, setUnvisited } = useVisit();
  const all_direction = randomDirection();

  useLayoutEffect(() => {
    const visited = [];
    const unvisited = [];
    const grid = [];
    for (let x = 0; x < maze_col; x++) {
      for (let z = 0; z < maze_row; z++) {
        unvisited.push(new Cell(x * cube_size, 0, z * cube_size));
      }
    }
  }, []);

  // return { unvisited };
}

/**
 *
 * visit hook that keeps track of nodes visited and unvisited.
 *
 */

function useVisit() {
  const [visited, setVisited] = useState([]);
  const [unvisited, setUnvisited] = useState([]);

  // useEffect(() => {
  //   console.log(unvisited);
  // }, [unvisited]);
  return { visited, setVisited, unvisited, setUnvisited };
}
