import { Canvas } from "@react-three/fiber";

import CameraRig from "./CameraRig";
import Sky from "./3d/Sky";
import Water from "./3d/Water";
import Lighting from "./Lighting";

function BaseCanvas() {
  return (
    <div className="h-full w-full absolute top-0 left-0 right-0 bottom-0">
      <Canvas
        camera={{
          position: [-21.86, 9.34, -0.42],
          fov: 85,
          near: 0.1,
          far: 200,
        }}
      >
        <Lighting />
        <CameraRig />
        <Sky />
        <Water />
      </Canvas>
    </div>
  );
}

export default BaseCanvas;
