import { useBox, useSphere } from "@react-three/cannon";
import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import React, { useState, useRef, useEffect } from "react";
import * as THREE from "three";
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

const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();
const speed = new THREE.Vector3();
const SPEED = 5;

export default function Player({ position }) {
  const [state, setState] = useState(0);
  const { up, down, left, right } = usePlayerControls();
  const [ref, api] = useSphere(() => ({
    mass: 1,
    args: 0.3,
  }));
  const velocity = useRef([0, 0, 0]);
  useFrame(() => {
    frontVector.set(0, 0, Number(down) - Number(up));
    sideVector.set(Number(left) - Number(right), 0, 0);

    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED);
    api.velocity.set(direction.x, direction.y, direction.z);
    // console.log(direction);
  });
  return (
    <mesh ref={ref} position={[position.x, position.y, position.z]}>
      <sphereBufferGeometry args={[0.3, 16, 16]} />
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
