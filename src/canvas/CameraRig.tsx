import { useEffect, useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";

function CameraRig() {
  const initialRotationRef = useRef<{
    x: number;
    y: number;
    z: number;
  }>(null);
  const [mouseCoordinates, setMouseCoordinates] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseCoordinates({
        x: (e.clientX / window.innerWidth - 0.5) * 0.05,
        y: (e.clientY / window.innerHeight - 0.5) * 0.05,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    const camera = state.camera;

    if (!initialRotationRef.current) {
      initialRotationRef.current = {
        x: camera.rotation.x,
        y: camera.rotation.y,
        z: camera.rotation.z,
      };
    }

    const targetRotationX = initialRotationRef.current.x - mouseCoordinates.x;
    const targetRotationY = initialRotationRef.current.y - mouseCoordinates.y;

    camera.rotation.x += (targetRotationX - camera.rotation.x) * delta * 3;
    camera.rotation.y += (targetRotationY - camera.rotation.y) * delta * 3;
  });

  return null;
}

export default CameraRig;
