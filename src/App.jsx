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
import { Stats, MapControls, Html, Environment, useHelper, useGLTF } from "@react-three/drei";
import * as THREE from "three";

// Maze Components
import Maze from "./components/Maze";
import useMazeGame from "./components/mazeLogic/useMazeGame";
import Player from "./components/Player";
import Flag from "./components/Flag";
import { useControls } from "leva";
import { Debug, Physics, useBox, usePlane } from "@react-three/cannon";

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
      <Suspense fallback={null}>
        <Environment files="snowy_hillside_1k.hdr" />
      </Suspense>

      {/* <AnimatedMovingCube /> */}
      {/* <FlyControls dragToLook rollSpeed={0.5} /> */}
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
  }, [mazeConfig]);

  return (
    <>
      <Physics>
        <Maze mazeMap={mazeMap} mazeConfig={mazeConfig} level={level} />
        <Debug>
          <Player position={playerPosition} />
        </Debug>
        <Floor />
      </Physics>
      <Suspense fallback={null}>
        <Flag position={goalPosition} />
        <LargeStone />
      </Suspense>
      <Html center className="rowTop">
        <button onClick={toPrevRound}>Decrement</button>
        <button onClick={nextRound}>Increment</button>
      </Html>
    </>
  );
}

function Floor() {
  const [ref, api] = useBox(() => ({
    mass: 0,
    args: [8, 0.1, 8],
    position: [0, -0.5, 0],
  }));
  return (
    // if we rotate around y, it doesn't become horizontal. So rotate around x will. Since y is upwards. And x is horizontal
    <mesh ref={ref}>
      <boxBufferGeometry args={[8, 0.1, 8]} double />
      <meshBasicMaterial color="#26a5b6" side={THREE.DoubleSide} />
    </mesh>
  );
}

export default App;

/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

export function LargeStone(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF(
    "https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/formation-large-stone/model.gltf"
  );
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={nodes.formationLarge_stone.geometry}
        material={materials["stone.002"]}
        position={[2.68, 0, -8.03]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[1, 0.77, 1]}
      />
    </group>
  );
}

useGLTF.preload(
  "https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/formation-large-stone/model.gltf"
);
