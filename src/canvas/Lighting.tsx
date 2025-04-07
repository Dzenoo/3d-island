function Lighting() {
  return (
    <>
      <ambientLight color="#ffffff" intensity={1.5} />
      <directionalLight
        color="#ffffff"
        intensity={7.5}
        position={[-12, 10, 4]}
        scale={[5, 5, 5]}
        castShadow={true}
      />
    </>
  );
}

export default Lighting;
