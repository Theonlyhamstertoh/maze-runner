import React, { useState, useEffect, useMemo, useLayoutEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Stats,
  Center,
  FlyControls,
  TransformControls,
  MapControls,
} from "@react-three/drei";
import * as THREE from "three";
import Maze from "./components/Maze";

function App() {
  // AnimatedMovingCube();
  return (
    <Canvas
      camera={{ position: [0, 25, 0] }}
      onCreated={({ camera }) => (camera.rotation.z = Math.PI)}>
      <gridHelper args={[15, 15]} />
      <ambientLight />
      <directionalLight position={[0, 10, 10]} intensity={0.5} />
      <Stats />
      <axesHelper args={[10]} />
      {/* <Center alignTop> */}
      <Maze />
      {/* </Center> */}
      {/* <Floor /> */}
      <MapControls />
      {/* <AnimatedMovingCube /> */}
      {/* <FlyControls dragToLook rollSpeed={0.5} /> */}
    </Canvas>
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
