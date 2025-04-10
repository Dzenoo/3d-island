import * as THREE from "three";
import { useRef } from "react";
import { extend, useFrame, useLoader } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";

import simplexNoise from "../shaders/includes/simplexNoise.glsl?raw";
import sandVertexShader from "../shaders/sand/sand.vert?raw";
import sandFragmentShader from "../shaders/sand/sand.frag?raw";

const SandMaterial = shaderMaterial(
  {
    uAlbedo: null,
    uNormal: null,
    uRoughness: null,
    uAo: null,
    cameraPosition: new THREE.Vector3(),
  },
  `${simplexNoise} ${sandVertexShader}`,
  sandFragmentShader
);

extend({
  SandMaterial,
});

function Sand() {
  const sandMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
  const [albedo, normal, roughness, ao] = useLoader(THREE.TextureLoader, [
    "/textures/sand/sand_diff.jpg",
    "/textures/sand/sand_nor_gl.jpg",
    "/textures/sand/sand_rough.jpg",
    "/textures/sand/sand_ao.jpg",
  ]);

  [albedo, normal, roughness, ao].forEach((tex) => {
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(4, 4);
  });

  useFrame((state) => {
    if (sandMaterialRef.current) {
      sandMaterialRef.current.uniforms.cameraPosition.value =
        state.camera.position;
    }
  });

  return (
    <mesh position={[-5, 0.5, 0]} rotation={[-Math.PI * 0.5, 0, 0]}>
      <planeGeometry args={[15, 25, 128, 128]} />
      {/* @ts-ignore */}
      <sandMaterial
        ref={sandMaterialRef}
        uAlbedo={albedo}
        uNormal={normal}
        uRoughness={roughness}
        uAo={ao}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default Sand;
