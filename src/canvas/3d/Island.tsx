import { PerformanceMonitor } from "@react-three/drei";
import Bushes from "./Bushes";
import Palms from "./Palms";
import Sand from "./Sand";
import Treasure from "./Treasure";
import Water from "./Water";

function Island() {
  return (
    <>
      <PerformanceMonitor />
      <Treasure />
      <Palms />
      <Sand />
      <Bushes />
      <Water />
    </>
  );
}

export default Island;
