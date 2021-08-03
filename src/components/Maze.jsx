import React, { useRef, useLayoutEffect, useMemo, useState, useEffect, useCallback } from "react";
import useMazeStore, { mazeConfig } from "./store";
import * as THREE from "three";
import Cell from "./Cell";
import randomizeOrder from "./utilities/randomizeOrder";
import { useFrame } from "@react-three/fiber";
const tempObject = new THREE.Object3D();
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
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
  const stack = useCallback(() => create_passage(), []);
  useLayoutEffect(() => {
    const nodes = stack();
    if (nodes.length === 0) return;
    nodes.forEach((cell, i) => {
      tempObject.position.set(cell.x, cell.y, cell.z);
      tempObject.updateMatrix();
      ref.current.setMatrixAt(i, tempObject.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;

    // center the group
    group.current.position.set(-Math.floor(maze_col / 2), 0, -Math.floor(maze_row / 2));
  }, [stack]);

  const totalSize = maze_col * maze_row;
  return (
    <group ref={group}>
      <instancedMesh ref={ref} args={[null, null, totalSize]}>
        <boxBufferGeometry args={[cube_size / 2, cube_size / 2, cube_size / 2]} />
        <meshBasicMaterial color="lightblue" />
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
  const stack = [{ x: 0, y: 0, z: 0, visited: true, direction: null }];
  const visited = [];
  // grid that will be filled with all the valid points to go. Basically creates a zone to prevent generator from going off to infinity.
  const grid = [];

  // maze wall array
  const mazeWall = [];

  // fills the array with arrays to make it multi-dimensional (to think of it, think of a table. The x becomes the columns and the z becomes the rows)
  // ex. [ [ {...code}, {...code} ] ] => array[0][1]
  for (let x = 0; x < maze_col; x++) {
    // initialize this index as a array
    grid[x] = [];
    for (let z = 0; z < maze_row; z++) {
      // create a object at this index position inside array of an array.
      // ex. [ [ {...code}, {...code} ] ]
      grid[x][z] = { x: x * cube_size, y: 0, z: z * cube_size, visited: false, direction: null };
    }
  }

  // The implementation of the maze that generates the maze coordinates.

  while (stack.length !== 0) {
    // get the newest item (or the last item in array) pushed and its value
    const currentPoint = stack[stack.length - 1];

    const possibleDirections = findDirectionsToMove(currentPoint.x, currentPoint.z, grid);

    // either way, if directions are defined and not defined, I want to set the previous position as visited so that on the next iteration, it won't move to the same place again.
    if (currentPoint.visited === false) visited.push(currentPoint);
    currentPoint.visited = true;

    // check to make sure there are possible directions to move
    if (possibleDirections === null) {
      // if we hit a dead-end, go back to the previous position
      stack.pop();
    } else {
      // return the new point the generator will move towards
      const moveToGridPoint = carve_passage_from(grid, possibleDirections, currentPoint);

      // push the current position onto stack
      stack.push(moveToGridPoint);
    }
  }
  return visited;
}
create_passage();

function carve_passage_from(grid, possibleDirections, currentPoint) {
  // pick a random index
  const randomIndex = Math.floor(Math.random() * possibleDirections.length);
  // select the random direction
  const chosenDirection = possibleDirections[randomIndex];

  const moveToGridPoint = grid[chosenDirection.x][chosenDirection.z];
  currentPoint.direction = chosenDirection.direction;
  return moveToGridPoint;
}

// this function will find all possible directions the current generator can move. It will return them as a array.
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
          possibleDirection.push({ x: newXPoint, z: newZPoint, direction: cardinal });
        }
      }
    }
  });

  // return null if no directions, else return directions
  return possibleDirection.length === 0 ? null : possibleDirection;
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
