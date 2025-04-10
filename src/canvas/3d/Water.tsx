import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/Addons.js";
import { useRef } from "react";
import { extend, useFrame, useLoader } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";

import simplexNoise from "../shaders/includes/simplexNoise.glsl?raw";
import waterVertexShader from "../shaders/water/water.vert?raw";
import waterFragmentShader from "../shaders/water/water.frag?raw";

const WaterMaterial = shaderMaterial(
  {
    uTime: 0.0,
    uWavesElevation: 0.01,
    uWavesFrequency: new THREE.Vector2(0.8, 0.8),
    uWavesLacunarity: 1.0,
    uWavesIterations: 5,
    uWavesPersistence: 0.5,
    uWavesSpeed: 0.8,
    uOpacity: 0.75,
    uTroughColor: new THREE.Color("#006ead"),
    uSurfaceColor: new THREE.Color("#00d0ff"),
    uPeakColor: new THREE.Color("#98d9ec"),
    uTroughThreshold: -0.08,
    uTroughTransition: 0.18,
    uPeakThreshold: 0.1,
    uPeakTransition: 0.1,
    uFresnelStrength: 0.6,
    uFresnelPower: 1.7,
    uEnvMap: null,
  },
  `${simplexNoise} ${waterVertexShader}`,
  waterFragmentShader
);

extend({
  WaterMaterial,
});

function Water() {
  const waterMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
  const hdrTexture = useLoader(RGBELoader, "/textures/environment.hdr");

  useFrame((state) => {
    if (waterMaterialRef.current) {
      const mat = waterMaterialRef.current.uniforms;

      mat.uTime.value = state.clock.getElapsedTime();
      mat.uEnvMap.value = hdrTexture;
    }
  });

  return (
    <mesh rotation={[-Math.PI * 0.5, 0, 0]} scale={10}>
      <planeGeometry args={[5, 25, 512, 512]} />
      {/* @ts-ignore */}
      <waterMaterial ref={waterMaterialRef} />
    </mesh>
  );
}

export default Water;
