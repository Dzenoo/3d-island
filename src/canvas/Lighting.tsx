function Lighting() {
  return (
    <>
      <ambientLight color="#ffffff" intensity={1.5} />
      <directionalLight
        color="#ffffff"
        intensity={7.5}
        position={[-12, 10, 4]}
        castShadow={true}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
        shadow-camera-near={0.5}
        shadow-camera-far={50}
      />
    </>
  );
}

export default Lighting;
