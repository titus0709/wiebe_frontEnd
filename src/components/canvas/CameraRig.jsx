import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";

const CameraRig = ({ children }) => {
  const group = useRef();
  useFrame((state, delta) => {
    const isBreakpoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;

    // set the initial position of the model
    let targetPosition = [-0.4, 0, 2];

    if (isMobile) targetPosition = [0, 0, 2.5];
    else targetPosition = [0, 0, 2];
  });
  return <group ref={group}>{children}</group>;
};

export default CameraRig;
