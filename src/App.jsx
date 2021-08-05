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
      <gridHelper args={[35, 35]} />
      <ambientLight />
      <directionalLight position={[0, 10, 10]} intensity={0.5} />
      <Stats />
      <axesHelper args={[10]} />
      <Maze />
      <MapControls />
      {/* <AnimatedMovingCube /> */}
      {/* <FlyControls dragToLook rollSpeed={0.5} /> */}
    </Canvas>
  );
}

export default App;
