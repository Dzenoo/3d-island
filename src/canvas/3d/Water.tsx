import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/Addons.js";
import { useRef } from "react";
import { extend, useFrame, useLoader } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";

import waterVertexShader from "../shaders/water/water.vert?raw";
import waterFragmentShader from "../shaders/water/water.frag?raw";

const WaterMaterial = shaderMaterial(
  {
    uTime: 0.0,
    uWavesElevation: 0.01,
    uWavesFrequency: new THREE.Vector2(1.5, 0.5),
    uWavesLacunarity: 1.5,
    uWavesIterations: 5,
    uWavesPersistence: 0.42,
    uWavesSpeed: 0.7,

    uOpacity: 0.85,
    uTroughColor: new THREE.Color("#145374"),
    uSurfaceColor: new THREE.Color("#71c7ec"),
    uPeakColor: new THREE.Color("#b0e0e6"),
    uTroughThreshold: -0.08,
    uTroughTransition: 0.15,
    uPeakThreshold: 0.08,
    uPeakTransition: 0.12,
    uFresnelStrength: 1.3,
    uFresnelPower: 0.9,
    uEnvMap: null,
  },
  waterVertexShader,
  waterFragmentShader
);

extend({
  WaterMaterial,
});

function Water() {
  const waterMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
  const hdrTexture = useLoader(RGBELoader, "/environment.hdr");

  useFrame((state) => {
    if (waterMaterialRef.current) {
      waterMaterialRef.current.uniforms.uTime.value =
        state.clock.getElapsedTime();
      waterMaterialRef.current.uniforms.uEnvMap.value = hdrTexture;
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
