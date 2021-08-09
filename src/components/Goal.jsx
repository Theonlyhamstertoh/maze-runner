import { Html } from "@react-three/drei";
import React from "react";

export default function Goal({ position }) {
  return (
    <mesh position={[position.x, position.y, position.z]}>
      <boxBufferGeometry args={[0.5, 0.5, 0.5]} />
      <meshBasicMaterial color="blue" />
    </mesh>
  );
}
