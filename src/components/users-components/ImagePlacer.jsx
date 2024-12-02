import React, { useContext, useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import { ThemeProviderContext, useTheme } from "../theme-provider";

const ImagePlacer = ({ image, getImageUrl }) => {
  const canvasRef = useRef();
  const [canvas, setCanvas] = useState(null);
  const { theme } = useContext(ThemeProviderContext);

  const [logo, setLogo] = useState(image);

  useEffect(() => {
    setLogo(image);
  }, [image]);

  useEffect(() => {
    if (canvas && !logo) {
      canvas.clear();
    }
  }, [canvas, logo]);
  useEffect(() => {
    let can = new fabric.Canvas(canvasRef.current);
    setCanvas(can);

    return () => {
      can.dispose();
    };
  }, []);

  useEffect(() => {
    if (canvas && logo) {
      handleAddImage(logo);
    }
  }, [canvas, logo]);

  const handleAddImage = (logo) => {
    let imgElement = document.createElement("img");
    imgElement.crossOrigin = "Anonymous";
    imgElement.src = logo;

    imgElement.onload = function () {
      let image = new fabric.Image(imgElement);

      canvas.clear();

      const maxWidth = canvas.width * 0.5;
      const maxHeight = canvas.height * 0.5;
      const scale = Math.min(
        maxWidth / image.width,
        maxHeight / image.height,
        1
      );

      image.set({
        scaleX: scale,
        scaleY: scale,
        originX: "center",
        originY: "center",
        left: canvas.width / 2,
        top: canvas.height / 2,
      });

      canvas.add(image);
      canvas.setActiveObject(image);
      canvas.renderAll();

      // Add event listener for changes
      canvas.on("object:modified", modifiedHandler);
    };
  };

  const modifiedHandler = () => {
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      const imageData = {
        position: {
          left: activeObject.left,
          top: activeObject.top,
        },
        scale: {
          x: activeObject.scaleX,
          y: activeObject.scaleY,
        },
        rotation: activeObject.angle, // Get rotation in degrees
      };

      getImageUrl(canvas.toDataURL(), imageData);
    }
  };

  return (
    <div className="flex gap-5">
      <div>
        <canvas
          width="300"
          height="400"
          style={{
            border: theme === "light" ? "1px dotted black" : "1px dotted white",
            margin: "0 16px",
          }}
          ref={canvasRef}
        />
      </div>
    </div>
  );
};

export default ImagePlacer;
