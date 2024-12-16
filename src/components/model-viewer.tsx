"use client"

import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

function CameraController() {
  const { camera, gl } = useThree();

  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controls.enablePan = false;
    controls.maxDistance = 2;
    controls.minDistance = 2;
    controls.update();
    return () => controls.dispose();
  }, [camera]);
  return null
}

export default function ModelViewer() {
  const steveModel = useLoader(GLTFLoader, "/models/scene.gltf");
  return (
    <Canvas style={{ height: '500px', width: '100%', border: '1px solid black' }}>
      <mesh position={[0, -1, 0]}>
        <ambientLight intensity={2} />
        <CameraController />
        <primitive object={steveModel.scene} />
      </mesh>
    </Canvas>
  )
};