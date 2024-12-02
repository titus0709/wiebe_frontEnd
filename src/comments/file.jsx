// import React from "react";
// import * as fabric from "fabric";
// import { useEffect, useRef, useState } from "react";

// const ImagePlacer = ({ logo, getImageUrl }) => {
//   const canvasref = useRef();
//   const [canvas, setCanvas] = useState(null);
//   useEffect(() => {
//     let can = new fabric.Canvas(canvasref.current);
//     setCanvas(can);

//     return () => {
//       can.dispose();
//     };
//   }, []);

//   useEffect(() => {
//     let imgElement = document.createElement("img");
//     imgElement.src = logo;
//     imgElement.onload = function () {
//       let image = new fabric.FabricImage(imgElement);

//       canvas.clear();

//       const maxWidth = 280 * 0.5;
//       const maxHeight = 420 * 0.5;
//       const scale = Math.min(
//         maxWidth / image.width,
//         maxHeight / image.height,
//         1
//       );

//       image.set({
//         scaleX: scale,
//         scaleY: scale,
//         originX: "left",
//         originY: "left",
//       });

//       canvas.add(image);

//       canvas.on("object:modified", modifiedHandler);
//       canvas.centerObject(image);
//       canvas.setActiveObject(image);
//       canvas.renderAll();
//     };
//   }, [canvas, logo]);
//   var modifiedHandler = function (evt) {
//     // var modifiedObject = evt.target;

//     // document.getElementById("modified").src = canvas.toDataURL();

//     getImageUrl(canvas.toDataURL());
//   };

//   const handleAddImage = (logo) => {
//     let imgElement = document.createElement("img");
//     imgElement.src = logo;
//     imgElement.onload = function () {
//       let image = new fabric.Image(imgElement);

//       canvas.clear();

//       const maxWidth = 280 * 0.5;
//       const maxHeight = 420 * 0.5;
//       const scale = Math.min(
//         maxWidth / image.width,
//         maxHeight / image.height,
//         1
//       );

//       image.set({
//         scaleX: scale,
//         scaleY: scale,
//         originX: "left",
//         originY: "left",
//       });

//       canvas.add(image);
//       console.log(image);
//       canvas.on("object:modified", modifiedHandler);
//       canvas.centerObject(image);
//       canvas.setActiveObject(image);
//       canvas.renderAll();
//     };
//   };
//   return (
//     <div className="flex gap-5">
//       <div>
//         <canvas
//           width="300"
//           height="400"
//           style={{
//             border: "1px dotted black",
//             margin: "0 16px",
//           }}
//           ref={canvasref}
//         />
//       </div>
//       <div className="">
//         {/* <img
//           id="modified"
//           width={"280"}
//           height={"280"}
//           src={logo}
//           className="border border-black"
//         /> */}
//       </div>
//       <div
//         style={{
//           display: "flex",
//           margin: "0 16px",
//         }}
//       ></div>
//     </div>
//   );
// };

// export default ImagePlacer;
