import { Canvas } from "@react-three/fiber";
import {
  EffectComposer,
  BrightnessContrast,
} from "@react-three/postprocessing";

import CameraRig from "./CameraRig";
import Sky from "./3d/Sky";
import Lighting from "./Lighting";
import Island from "./3d/Island";
import LoadingScreen from "./LoadingScreen";

function BaseCanvas() {
  return (
    <>
      <LoadingScreen />
      <div className="h-full w-full absolute top-0 left-0 right-0 bottom-0">
        <Canvas
          shadows={true}
          gl={{ antialias: true }}
          camera={{
            position: [-21.86, 9.34, -0.42],
            fov: 85,
            near: 0.1,
            far: 200,
          }}
        >
          <Lighting />

          <Sky />
          <Island />

          <CameraRig />

          <EffectComposer>
            <BrightnessContrast brightness={-0.05} contrast={0.01} />
          </EffectComposer>
        </Canvas>
      </div>
    </>
  );
}

export default BaseCanvas;
