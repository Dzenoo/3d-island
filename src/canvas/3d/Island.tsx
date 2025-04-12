import Bushes from "./Bushes";
import Palms from "./Palms";
import Rocks from "./Rocks";
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
      <Rocks />
      <Water />
    </>
  );
}

export default Island;
