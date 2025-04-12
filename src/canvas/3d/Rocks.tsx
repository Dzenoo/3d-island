import { Clone, useGLTF } from "@react-three/drei";

function Rocks() {
  const { scene } = useGLTF("/models/rock.glb");

  return (
    <>
      <Clone
        object={scene}
        position={[-4.36, 0.94, 2.28]}
        rotation={[0, 0.5, 0]}
        scale={3.8}
      />
      <Clone
        object={scene}
        position={[-10.42, 0.84, 9.75]}
        rotation={[-0.45, 0.14, 3.12]}
        scale={1.83}
      />
      <Clone
        object={scene}
        position={[-1.32, 0.57, -9.51]}
        rotation={[0.39, 0, 0.32]}
        scale={2.79}
      />
      <Clone
        object={scene}
        position={[-10.98, 0.5, -3.91]}
        rotation={[3.5, 0.79, 0.72]}
        scale={1.71}
      />
    </>
  );
}

export default Rocks;
