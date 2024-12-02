import { Canvas } from "@react-three/fiber";
import { Environment, Center, OrbitControls } from "@react-three/drei";

import Shirt from "./Shirt";

import CameraRig from "./CameraRig";

const CanvasModel = ({
  imageUrl,
  imageData,
  secondImageUrl,
  secondImageData,
  color,
}) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 1.7], fov: 10 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      {/* <directionalLight intensity={0} position={[3, 3, 3]} /> */}
      <directionalLight intensity={3} position={[-3, -3, -3]} />
      <Environment preset="apartment" />

      <CameraRig>
        <Shirt
          imageDataUrl={imageUrl}
          imageData={imageData}
          color={color}
          secondImageData={secondImageData}
          secondImageUrl={secondImageUrl}
        />
      </CameraRig>
      <OrbitControls enabled />
    </Canvas>
  );
};

export default CanvasModel;
