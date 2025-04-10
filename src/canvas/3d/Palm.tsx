import { Clone, useGLTF } from "@react-three/drei";
import { useControls } from "leva";

function Palm() {
  const { scene } = useGLTF("/models/palm.glb");
  const controls = useControls("Palm", {
    position: { value: [0, 0, 0], step: 0.1 },
    rotation: { value: [0, 0, 0], step: 0.1 },
    scale: { value: 1, min: 0.1, max: 5, step: 0.1 },
  });

  return (
    <>
      <Clone object={scene} {...controls}></Clone>
      <Clone object={scene} {...controls}></Clone>
      <Clone object={scene} {...controls}></Clone>
      <Clone object={scene} {...controls}></Clone>
    </>
  );
}

export default Palm;
