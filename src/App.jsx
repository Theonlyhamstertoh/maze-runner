import React, { useState, useEffect, useMemo, useLayoutEffect, useRef, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stats, MapControls, Html } from "@react-three/drei";
import * as THREE from "three";

// Maze Components
import Maze from "./components/Maze";
import useMazeGame from "./components/mazeLogic/useMazeGame";
import Player from "./components/Player";
import Goal from "./components/Goal";

function App() {
  return (
    <Canvas
      camera={{ position: [0, 25, 0] }}
      onCreated={({ camera }) => (camera.rotation.z = Math.PI)}>
      <gridHelper args={[15, 15]} />
      <ambientLight />
      <directionalLight position={[0, 10, 10]} intensity={0.5} />
      <Stats />
      <axesHelper args={[10]} />

      <Scene />
      <MapControls />

      {/* <AnimatedMovingCube /> */}
      {/* <FlyControls dragToLook rollSpeed={0.5} /> */}
    </Canvas>
  );
}

function Scene() {
  const [mazeMap, mazeConfig, nextRound, toPrevRound] = useMazeGame();

  const getRandomPosition = useCallback(() => {
    const x = Math.floor(Math.random() * mazeConfig.maze_col);
    const z = Math.floor(Math.random() * mazeConfig.maze_row);
    return { x, y: 0, z };
  });

  const [playerPosition, goalPosition] = useMemo(() => {
    const playerPosition = getRandomPosition();
    let goalPosition = getRandomPosition();

    // generate a new position for the goal if both are in the same position.
    while (playerPosition.x === goalPosition.x && playerPosition.z === goalPosition.z) {
      goalPosition = getRandomPosition();
    }
    return [playerPosition, goalPosition];
  }, [mazeConfig]);

  return (
    <group>
      <Maze mazeMap={mazeMap} mazeConfig={mazeConfig} />
      <Player position={playerPosition} />
      <Goal position={goalPosition} />
      <Html center className="rowTop">
        <button onClick={toPrevRound}>Decrement</button>
        <button onClick={nextRound}>Increment</button>
      </Html>
    </group>
  );
}
function Floor() {
  return (
    // if we rotate around y, it doesn't become horizontal. So rotate around x will. Since y is upwards. And x is horizontal
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry args={[75, 75]} double />
      <meshBasicMaterial color="#26a5b6" side={THREE.DoubleSide} />
    </mesh>
  );
}

export default App;
