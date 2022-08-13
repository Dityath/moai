import React, { Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars, PerspectiveCamera } from "@react-three/drei";
import { DDSLoader } from "three-stdlib";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import "./styles.css";

THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());

const name = `statue_diffuse.jpg`;

function Scene() {
  const materials = useLoader(MTLLoader, "moai.mtl");
  const obj = useLoader(OBJLoader, "moai.obj", (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });
  return (
    <primitive
      object={obj}
      scale={0.1}
      rotation={[Math.PI / -2, 0, 0]}
      position={[0, -15, 0]}
    />
  );
}

function App() {
  return (
    <Canvas>
      <OrbitControls autoRotate maxDistance={100} minDistance={30} />
      <PerspectiveCamera
        makeDefault
        position={[50, 0.9, 1.8]}
        fov={60}
        zoom={0.9}
      />
      <Stars />
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 0, 5]} intensity={0.5} />
      <Scene />
    </Canvas>
  );
}

export default App;
