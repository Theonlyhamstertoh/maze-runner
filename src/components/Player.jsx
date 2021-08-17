import { Html } from "@react-three/drei";
import { useControls } from "leva";
import React, { useState, useEffect } from "react";

const keys = {
  KeyW: "up",
  KeyS: "down",
  KeyA: "left",
  KeyD: "right",
};

function usePlayerControls() {
  const [movement, setMovement] = useState({
    up: false,
    down: false,
    left: false,
    right: false,
  });
  useEffect(() => {
    // set the movement click as true
    const handleKeyDown = (e) => setMovement((m) => ({ ...m, [keys[e.code]]: true }));
    const handleKeyUp = (e) => setMovement((m) => ({ ...m, [keys[e.code]]: false }));
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return movement;
}
export default function Player({ position }) {
  const [state, setState] = useState(0);
  const movement = usePlayerControls();
  useEffect(() => console.log(movement));
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
