import Bushes from "./Bushes";
import Palms from "./Palms";
import Sand from "./Sand";
import Treasure from "./Treasure";
import Water from "./Water";

function Island() {
  return (
    <>
      <Treasure />
      <Palms />
      <Sand />
      <Bushes />
      <Water />
    </>
  );
}

export default Island;
