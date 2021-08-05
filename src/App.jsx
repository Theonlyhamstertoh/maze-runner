import React, { useState, useEffect, useMemo, useLayoutEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stats, Center, FlyControls } from "@react-three/drei";
import * as THREE from "three";
import Maze from "./components/Maze";

function App() {
  // AnimatedMovingCube();
  return (
    <Canvas
      camera={{ position: [0, 0, 0] }}
      onCreated={({ camera }) => (camera.rotation.z = Math.PI)}>
      <gridHelper args={[25, 25]} />
      <ambientLight />
      <Stats />
      <axesHelper args={[10]} />
      <Maze />
      {/* <AnimatedMovingCube /> */}
      <FlyControls dragToLook rollSpeed={0.5} />
    </Canvas>
  );
}

export default App;
