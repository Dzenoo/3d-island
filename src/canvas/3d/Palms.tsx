import { Clone, useGLTF } from "@react-three/drei";

function Palms() {
  const { scene } = useGLTF("/models/palm.glb");

  return (
    <>
      <Clone
        object={scene}
        position={[-4, 0.5, -7]}
        rotation={[0, 2.6, 0]}
        scale={1.5}
        castShadow
      />
      <Clone
        object={scene}
        position={[-8.2, 0.5, 7.7]}
        rotation={[0, 0.4, 0]}
        scale={1.8}
        castShadow
      />
      <Clone
        object={scene}
        position={[-1.7, 0.5, -0.5]}
        rotation={[0, 1.6, 0]}
        scale={1}
        castShadow
      />
    </>
  );
}

export default Palms;
