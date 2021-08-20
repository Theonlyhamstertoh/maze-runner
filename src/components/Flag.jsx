import { Html, useGLTF } from "@react-three/drei";
import React, { useRef } from "react";

/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

export default function Flag({ position }) {
  const group = useRef();
  const { nodes, materials } = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/flag/model.gltf"
  );
  return (
    <group position={[position.x, position.y, position.z]} ref={group} dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]}>
        <mesh
          geometry={nodes.Cube1351.geometry}
          material={materials["Blue.011"]}
          material-color="red"
        />
        <mesh geometry={nodes.Cube1351_1.geometry} material={materials["Brown.006"]} />
        <mesh geometry={nodes.Cube1351_2.geometry} material={materials["Metal.019"]} />
      </group>
    </group>
  );
}
useGLTF.preload(
  "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/flag/model.gltf"
);
