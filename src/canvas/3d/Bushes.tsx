import * as THREE from "three";
import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import vertexShader from "../shaders/bush/bush.vert?raw";
import fragmentShader from "../shaders/bush/bush.frag?raw";

function Bush({
  position,
  scale,
  ...props
}: {
  position?: number[];
  scale?: number;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 100;

  const offsets = useMemo(() => {
    const arr = new Float32Array(count);
    for (let i = 0; i < count; i++) arr[i] = Math.random() * 100;
    return arr;
  }, [count]);

  const curveStrengths = useMemo(() => {
    const arr = new Float32Array(count);
    for (let i = 0; i < count; i++) arr[i] = 0.05 + Math.random() * 0.1;
    return arr;
  }, [count]);

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(0.1, 1, 1, 10);
    geo.translate(0, 0.5, 0);
    geo.setAttribute("aOffset", new THREE.InstancedBufferAttribute(offsets, 1));
    geo.setAttribute(
      "aCurveStrength",
      new THREE.InstancedBufferAttribute(curveStrengths, 1)
    );

    return geo;
  }, [offsets]);

  const material = useMemo(() => {
    return new THREE.RawShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
      },
      side: THREE.DoubleSide,
    });
  }, []);

  useFrame(({ clock }) => {
    if (material) {
      material.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  useEffect(() => {
    if (!meshRef.current) return;

    const dummy = new THREE.Object3D();
    const spread = 0.5;

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * spread;
      const z = (Math.random() - 0.5) * spread;
      const rotY = Math.random() * Math.PI * 2;
      const scale = 0.5 + Math.random() * 0.5;

      dummy.position.set(x, 0, z);
      dummy.rotation.y = rotY;
      dummy.scale.set(0.1, scale, 1);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <instancedMesh
      {...props}
      position={position && [position[0], position[1], position[2]]}
      scale={scale ?? 1}
      ref={meshRef}
      args={[geometry, material, count]}
    />
  );
}

function Bushes() {
  return (
    <>
      <Bush position={[-10, 0.4, -7.5]} scale={2} />
      <Bush position={[-3.5, 0.4, 6.6]} scale={3} />
      <Bush position={[-2, 0.4, -4.5]} scale={1.5} />
    </>
  );
}

export default Bushes;
