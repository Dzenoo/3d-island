import * as THREE from "three";
import { useEffect, useRef } from "react";
import { Clone, useGLTF } from "@react-three/drei";
import { useFrame, useGraph } from "@react-three/fiber";

function Palms() {
  const { scene } = useGLTF("/models/palm.glb");
  const { materials } = useGraph(scene);
  const uTime = useRef({ value: 0 });

  useEffect(() => {
    const leafMat = materials["Leafs"] as THREE.MeshStandardMaterial;

    if (leafMat && !leafMat.userData._windInjected) {
      leafMat.onBeforeCompile = (shader) => {
        shader.uniforms.uTime = uTime.current;

        shader.vertexShader = shader.vertexShader.replace(
          `#include <common>`,
          `
            #include <common>
            uniform float uTime;
          `
        );

        shader.vertexShader = shader.vertexShader.replace(
          `#include <begin_vertex>`,
          `
            vec3 transformed = vec3(position);
            float wind = sin(position.y * 2.0 + uTime * 2.0) * 0.05;
            transformed.xyz += wind;
          `
        );
      };

      leafMat.userData._windInjected = true;
      leafMat.needsUpdate = true;
    }
  }, [materials]);

  useFrame((_, delta) => {
    uTime.current.value += delta;
  });

  return (
    <>
      <Clone
        object={scene}
        position={[-4, 2.0, -7]}
        rotation={[0, 2.6, 0]}
        scale={1.5}
        castShadow
      />
      <Clone
        object={scene}
        position={[-8.2, 1.3, 7.7]}
        rotation={[0, 0.4, 0]}
        scale={1.8}
        castShadow
      />
      <Clone
        object={scene}
        position={[-1.7, 2.0, -0.5]}
        rotation={[0, 1.0, 0]}
        scale={1}
        castShadow
      />
    </>
  );
}

export default Palms;
