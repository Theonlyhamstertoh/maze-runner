import React, { useState, useEffect, useMemo, useLayoutEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stats, Center } from "@react-three/drei";
import * as THREE from "three";
function App() {
  return (
    <Canvas
      orthographic
      camera={{ position: [0, 100, 0], zoom: 60 }}
      onCreated={({ camera }) => (camera.rotation.z = Math.PI)}>
      <gridHelper />
      <OrbitControls />
    </Canvas>
  );
}

export default App;
