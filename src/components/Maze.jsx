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

  useLayoutEffect(() => {
    const visited = [];
    const grid = [];
    for (let x = 0; x < maze_col; x++) {
      grid[x] = [];
      for (let z = 0; z < maze_row; z++) {
        grid[x][z] = { x: x * cube_size, y: 0, z: z * cube_size, visited: false };
      }
    }
    carve_passage_from(0, 0, grid);
  }, []);

  // return { unvisited };
}

const convertToXDirection = { E: 1, W: -1, N: 0, S: 0 };
const convertToZDirection = { E: 0, W: 0, N: 1, S: -1 };
function carve_passage_from(x, z, grid) {
  const cardinalDirections = randomDirection();

  cardinalDirections.forEach((cardinal) => {
    const newXPoint = x + convertToXDirection[cardinal];
    const newZPoint = z + convertToZDirection[cardinal];
    // first check if x is
    if (
      grid.length - 1 >= newXPoint &&
      0 <= newXPoint &&
      -grid.length <= newZPoint &&
      0 >= newZPoint
    ) {
      // because z goes south, points are negative.
      if (-grid.length <= newZPoint && 0 >= newZPoint) {
        // problem is that there is no -1 or -100 index in a array. So we wrap it in a absolute to make it positive.
        console.log(grid[newXPoint][Math.abs(newZPoint)]);
      }
    }
  });
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
