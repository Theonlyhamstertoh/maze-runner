import React, {
  useState,
  useEffect,
  useMemo,
  useLayoutEffect,
  useRef,
  useCallback,
  Suspense,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Stats,
  MapControls,
  Html,
  Environment,
  useHelper,
  useGLTF,
  useAnimations,
  OrbitControls,
} from "@react-three/drei";
import * as THREE from "three";

// Maze Components
import Maze from "./components/Maze";
import useMazeGame from "./components/mazeLogic/useMazeGame";
import Player from "./components/Player";
import Flag from "./components/Flag";
import { useControls } from "leva";
import { Debug, Physics, useBox, usePlane } from "@react-three/cannon";
import { generateUUID } from "three/src/math/MathUtils";

function App() {
  return (
    <Canvas
      camera={{ position: [0, 25, 0] }}
      onCreated={({ camera }) => (camera.rotation.z = Math.PI)}>
      <ambientLight />
      <directionalLight position={[0, 10, 10]} intensity={0.5} />
      <Scene />
      <Suspense
        fallback={
          <Html center className="loading">
            Loading...
          </Html>
        }>
        <Environment files="snowy_hillside_1k.hdr" />
      </Suspense>
    </Canvas>
  );
}

function Scene() {
  const { mazeMap, mazeConfig, nextRound, toPrevRound, level } = useMazeGame();

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
  }, [level]);

  const wallColor = useMemo(() => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 80%, 30%)`;
  }, [level]);

  return (
    <>
      <Physics broadphase="SAP">
        <Maze
          mazeMap={mazeMap}
          mazeConfig={mazeConfig}
          level={level}
          key={generateUUID()}
          wallColor={wallColor}
        />
        <Player key={generateUUID()} position={playerPosition} />
        <Floor />
        <Suspense fallback={null}>
          {/* <Character /> */}
          <Flag
            key={generateUUID()}
            position={goalPosition}
            wallColor={wallColor}
            nextRound={nextRound}
          />
        </Suspense>
      </Physics>
    </>
  );
}

function Floor() {
  const [ref, api] = useBox(() => ({
    mass: 0,
    args: [63, 0.1, 63],
    position: [0, -0.5, 0],
  }));
  return (
    // if we rotate around y, it doesn't become horizontal. So rotate around x will. Since y is upwards. And x is horizontal
    <mesh ref={ref}>
      <boxBufferGeometry args={[63, 0.1, 63]} double />
      <shadowMaterial side={THREE.DoubleSide} />
    </mesh>
  );
}

export default App;
