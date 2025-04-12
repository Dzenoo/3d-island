import { useGLTF } from "@react-three/drei";

function Treasure() {
  const { scene } = useGLTF("/models/treasure.glb");

  return (
    <primitive
      object={scene}
      position={[-3.15, 2.3, -4.32]}
      rotation={[-0.0, 6.7, 6.1]}
    />
  );
}

export default Treasure;
