import { Sky as SkyDrei, Cloud, Clouds } from "@react-three/drei";

function Sky() {
  return (
    <>
      <SkyDrei />
      <Clouds position={[40, 25, 0]}>
        <Cloud
          bounds={[1, 0, 5]}
          color="#ffffff"
          growth={15}
          position={[0, -5, -70]}
          speed={0.2}
        />
        <Cloud
          bounds={[1, 0, 5]}
          color="#ffffff"
          growth={15}
          position={[0, 0, -25]}
          speed={0.2}
        />
        <Cloud
          bounds={[1, 0, 5]}
          color="#ffffff"
          growth={15}
          position={[0, -2, 17]}
          speed={0.2}
        />
        <Cloud
          bounds={[1, 0, 5]}
          color="#ffffff"
          growth={15}
          position={[0, -7, 75]}
          speed={0.2}
        />
      </Clouds>
    </>
  );
}

export default Sky;
