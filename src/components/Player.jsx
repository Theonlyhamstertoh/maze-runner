import { useBox, useSphere } from "@react-three/cannon";
import {
  Html,
  useTexture,
  useGLTF,
  useAnimations,
  PerspectiveCamera,
  useHelper,
} from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { useControls } from "leva";
import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
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
const SPEED = 6;

export default function Player({ position }) {
  const [normalMap] = useTexture(["normal_texture.png"]);

  const { up, down, left, right } = usePlayerControls();
  const camera = useRef();
  const [playerRef, api] = useSphere(() => ({
    mass: 1,
    args: 0.3,
    position: [position.x, position.y, position.z],
  }));
  const playerPosition = useRef([0, 0, 0]);

  useLayoutEffect(() => {
    api.position.subscribe((pos) => (playerPosition.current = pos));
  }, []);
  useFrame(() => {
    // ref.current.getWorldPosition(camera.current.position);
    frontVector.set(0, 0, Number(down) - Number(up));
    sideVector.set(Number(left) - Number(right), 0, 0);

    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED);
    api.velocity.set(direction.x, direction.y, direction.z);

    // camera.current.position.copy(api.current.position);
    const [x, y, z] = playerPosition.current;
    camera.current.position.set(x, 5, z);
    camera.current.lookAt(new THREE.Vector3(x, y, z));
    camera.current.updateMatrix();
  });

  return (
    <>
      <PerspectiveCamera makeDefault ref={camera} far={20} />
      <mesh ref={playerRef}>
        <sphereBufferGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial normalMap={normalMap} color="blue" />
      </mesh>
    </>
  );
}
