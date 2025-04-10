import * as THREE from "three";
import { extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";

import simplexNoise from "../shaders/includes/simplexNoise.glsl?raw";
import sandVertexShader from "../shaders/sand/sand.vert?raw";
import sandFragmentShader from "../shaders/sand/sand.frag?raw";

const SandMaterial = shaderMaterial(
  {},
  `${simplexNoise} ${sandVertexShader}`,
  sandFragmentShader
);

extend({
  SandMaterial,
});

function Sand() {
  return (
    <mesh
      position={[-5, 0.5, 0]}
      rotation={[-Math.PI * 0.5, 0, 0]}
      scale={1.4}
      castShadow
      receiveShadow
    >
      <planeGeometry args={[15, 25, 128, 128]} />
      {/* @ts-ignore */}
      <sandMaterial side={THREE.DoubleSide} />
    </mesh>
  );
}

export default Sand;
