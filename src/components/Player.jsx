import { Html } from "@react-three/drei";
import { useControls } from "leva";
import React, { useState } from "react";

export default function Player({ position }) {
  const [state, setState] = useState(0);

  return (
    <mesh position={[position.x, position.y, position.z]}>
      <boxBufferGeometry args={[0.5, 0.5, 0.5]} />
      <meshPhysicalMaterial
      // thickness={5}
      // roughness={1}
      // clearcoat={1}
      // transmission={1}
      // ior={1.25}
      // envMapIntensity={25}
      // color="#ffffff"
      />
    </mesh>
  );
}
