import React, { useRef, useLayoutEffect, useMemo, useState, useEffect } from "react";
import useMazeStore, { mazeConfig } from "./store";
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
  const { maze_col, maze_row, cube_size } = mazeConfig;
  // const { stack } = useGenerateMazeCoords();
  // useLayoutEffect(() => {
  //   if (stack.length === 0) return;
  //   stack.forEach((cell, i) => {
  //     tempObject.position.set(cell.x, cell.y, cell.z);
  //     tempObject.updateMatrix();
  //     ref.current.setMatrixAt(i, tempObject.matrix);
  //   });
  //   ref.current.instanceMatrix.needsUpdate = true;

  //   // center the group
  //   group.current.position.set(-Math.floor(maze_col / 2), 0, -Math.floor(maze_row / 2));
  // }, [stack]);

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

function useGenerateMazeCoords() {}

const convertToXDirection = { E: 1, W: -1, N: 0, S: 0 };
const convertToZDirection = { E: 0, W: 0, N: 1, S: -1 };
const all_directions = ["E", "W", "S", "N"];
function create_passage() {
  const { maze_col, maze_row, cube_size } = mazeConfig;

  // initialize starting maze point
  const stack = [{ x: 0, y: 0, z: 0, visited: false }];

  // grid that will be filled with all the valid points to go. Basically creates a zone to prevent generator from going off to infinity.
  const grid = [];

  // fills the array with arrays to make it multi-dimensional (to think of it, think of a table. The x becomes the columns and the z becomes the rows)
  // ex. [ [ {...code}, {...code} ] ] => array[0][1]
  for (let x = 0; x < maze_col; x++) {
    // initialize this index as a array
    grid[x] = [];
    for (let z = 0; z < maze_row; z++) {
      // create a object at this index position inside array of an array.
      // ex. [ [ {...code}, {...code} ] ]
      grid[x][z] = { x: x * cube_size, y: 0, z: z * cube_size, visited: false };
    }
  }

  // The implementation of the maze that generates the maze coordinates.
  while (stack.length !== 0) {
    // get the newest item (or the last item in array) pushed and its value
    const { x, z, visited } = stack[stack.length - 1];
    const possibleDirections = findDirectionsToMove(x, z, grid);
    console.log(possibleDirections);
    stack.pop();
  }
}
create_passage();

function findDirectionsToMove(x, z, grid) {
  // randomly chose a direction to go from
  const cardinalDirections = randomizeOrder(all_directions);

  const possibleDirection = [];
  // this will generate possible directions
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

        // check for visited points
        if (potentialNewPoint.visited === false) {
          // once we are here, it means we have found a viable path and a unvisited point.
          // push any potential paths to the array for access below
          possibleDirection.push({ x: newXPoint, z: newZPoint });
        }
      }
    }
  });

  return possibleDirection || null;
}
function carve_passage_from(x, z, grid, stack, setMazedGenerated) {
  if (possibleDirection.length === 0) {
    return setMazedGenerated(true);
  }
  // pick a random index
  const randomIndex = Math.floor(Math.random() * possibleDirection.length);
  // select the random direction
  const chosenDirection = possibleDirection[randomIndex];
  const fromGridPoint = grid[x][z];
  const moveToGridPoint = grid[chosenDirection.x][chosenDirection.z];

  // set previous position as visited
  fromGridPoint.visited = true;

  // push the current position onto stack
  stack.push(moveToGridPoint);

  // call itself recursively until no more direction available
  carve_passage_from(chosenDirection.x, chosenDirection.z, grid, stack, setMazedGenerated);
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
