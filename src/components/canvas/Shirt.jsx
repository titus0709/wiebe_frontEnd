// import React, { useEffect, useState } from "react";
// import { useFrame } from "@react-three/fiber";
// import { useGLTF, Decal } from "@react-three/drei";

// import tshirt from "../../assets/shirt_baked.glb";
// import { TextureLoader } from "three";

// import { easing } from "maath";

// const Shirt = ({
//   imageDataUrl,
//   imageData,
//   color,
//   secondImageData,
//   secondImageUrl,
// }) => {
//   const { nodes, materials } = useGLTF(tshirt);

//   const [decalTexture, setDecalTexture] = useState(null);

//   const [secondDecalTexture, setSecondDecalTexture] = useState(null);

//   useEffect(() => {
//     if (imageDataUrl) {
//       const loader = new TextureLoader();
//       loader.load(imageDataUrl, (texture) => {
//         texture.anisotropy = 16;
//         setDecalTexture(texture);
//       });
//     }
//     if (secondImageUrl) {
//       const loader = new TextureLoader();
//       loader.load(secondImageUrl, (texture) => {
//         texture.anisotropy = 16;
//         setSecondDecalTexture(texture);
//       });
//     }
//   }, [imageDataUrl, secondImageUrl]);

//   useFrame((state, delta) =>
//     easing.dampC(materials.lambert1.color, color, 0.25, delta)
//   );

//   return (
//     <group key={""}>
//       <mesh
//         geometry={nodes.T_Shirt_male.geometry}
//         material={materials.lambert1}
//         material-roughness={1}
//         dispose={null}
//         scale={[0.4, 0.4, 0.4]}
//       >
//         {decalTexture && (
//           <Decal
//             position={[0, -0.02, 0.15]}
//             rotation={[0, 0, 0]}
//             scale={0.4}
//             map={decalTexture}
//             depthTest={false}
//             depthWrite={true}
//           />
//         )}

//         {secondDecalTexture && (
//           <Decal
//             position={[0, 0, -0.15]}
//             rotation={[0, 0, 0]}
//             scale={0.4}
//             map={secondDecalTexture}
//             depthTest={false}
//             depthWrite={true}
//           />
//         )}
//       </mesh>
//     </group>
//   );
// };

// export default Shirt;
import React, { useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Decal } from "@react-three/drei";
import { TextureLoader } from "three";
import { easing } from "maath";

import tshirt from "../../assets/shirt_baked.glb";

const Shirt = ({
  imageDataUrl,
  imageData,
  color,
  secondImageData,
  secondImageUrl,
}) => {
  const { nodes, materials } = useGLTF(tshirt);

  const [decalTexture, setDecalTexture] = useState(null);
  const [secondDecalTexture, setSecondDecalTexture] = useState(null);

  useEffect(() => {
    const loader = new TextureLoader();
    if (imageDataUrl) {
      loader.load(imageDataUrl, (texture) => {
        texture.anisotropy = 16;
        setDecalTexture(texture);
      });
    } else {
      setDecalTexture(null);
    }
  }, [imageDataUrl]);

  useEffect(() => {
    const loader = new TextureLoader();
    if (secondImageUrl) {
      loader.load(secondImageUrl, (texture) => {
        texture.anisotropy = 16;
        setSecondDecalTexture(texture);
      });
    } else {
      setSecondDecalTexture(null);
    }
  }, [secondImageUrl]);

  useFrame((state, delta) =>
    easing.dampC(materials.lambert1.color, color, 0.25, delta)
  );

  return (
    <group>
      <mesh
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
        scale={[0.4, 0.4, 0.4]}
      >
        {/* Front Decal */}
        {decalTexture && (
          <Decal
            position={[0, -0.02, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.4}
            map={decalTexture}
            depthTest={false}
            depthWrite={true}
          />
        )}

        {/* Back Decal */}
        {secondDecalTexture && (
          <Decal
            position={[0, 0, -0.15]}
            rotation={[0, 0, 0]}
            scale={0.4}
            map={secondDecalTexture}
            depthTest={false}
            depthWrite={true}
          />
        )}
      </mesh>
    </group>
  );
};

export default Shirt;
