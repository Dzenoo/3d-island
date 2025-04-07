import { useGLTF } from "@react-three/drei";

function Treasure() {
  const { scene } = useGLTF("/treasure.glb");

  return (
    <primitive object={scene} position={[0, 5, 0]} rotation={[0, 0.2, 0]} />
  );
}

export default Treasure;
