import React, { useRef, useLayoutEffect, useMemo, useState, useEffect } from "react";
import useStore, { mazeConfig } from "./store";
import * as THREE from "three";
import Cell from "./Cell";
import randomizeOrder from "./utilities/randomizeOrder";
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
    const stack = [];
    const grid = [];
    for (let x = 0; x < maze_col; x++) {
      grid[x] = [];
      for (let z = 0; z < maze_row; z++) {
        grid[x][z] = { x: x * cube_size, y: 0, z: z * cube_size, visited: false };
      }
    }
    carve_passage_from(0, 0, grid, stack);
  }, []);

  // return { unvisited };
}

const convertToXDirection = { E: 1, W: -1, N: 0, S: 0 };
const convertToZDirection = { E: 0, W: 0, N: 1, S: -1 };
const all_directions = ["E", "W", "S", "N"];

/**
 *
 * @param {number} x - point that we will carve _from_
 * @param {number} z - point that we will carve _from_
 * @param {array} grid - array of all the points
 * @param {array} stack - array of visited points. Newest on top
 */

let i = 0;
function carve_passage_from(x, z, grid, stack) {
  // randomly chose a direction to go from
  const cardinalDirections = randomizeOrder(all_directions);

  const possibleDirection = [];
  cardinalDirections.forEach((cardinal) => {
    const newXPoint = x + convertToXDirection[cardinal];
    const newZPoint = z + convertToZDirection[cardinal];
    // first check if x is in valid range
    if (grid.length - 1 >= newXPoint && 0 <= newXPoint) {
      // We also check if z is in valid range.
      if (grid.length - 1 >= newZPoint && 0 <= newZPoint) {
        // moveToGridPoint represent the point we will be moving to next. In another word, the new position
        const potentialNewPoint = grid[newXPoint][newZPoint];
        // fromGridPoint is the point we are currently at.
        const fromGridPoint = grid[x][z];

        // check for visited points
        if (potentialNewPoint.visited === false) {
          // once we are here, it means we have found a viable path and a unvisited point.
          // first, set the point we move to
          // console.log(i++);
          possibleDirection.push({ x: newXPoint, z: newZPoint });
        } else {
          // console.log(stack);
        }
      }
    }
  });
  if (possibleDirection.length === 0) return console.log(stack);
  // pick a random index
  const randomIndex = Math.floor(Math.random() * possibleDirection.length);
  // select the random direction
  const chosenDirection = possibleDirection[randomIndex];

  console.log(possibleDirection);
  const moveToGridPoint = grid[chosenDirection.x][chosenDirection.z];
  stack.push(moveToGridPoint);
  moveToGridPoint.visited = true;

  // call itself recursively until no more direction available
  carve_passage_from(chosenDirection.x, chosenDirection.z, grid, stack);
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
