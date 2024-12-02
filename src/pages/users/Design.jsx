import ImagePlacer from "@/components/users-components/ImagePlacer";

import React, { Suspense, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import CanvasModel from "@/components/canvas";

import SecondDesignModal from "@/components/users-components/SecondDesignModal";

import NavbarNew  from "@/components/NavbarNew";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SimilarDesigns from "@/components/users-components/SimilarDesigns";

function Design() {
  const location = useLocation();
  const [image, setImage] = useState(location.state.logo);

  const category = location.state.category;
  const [secondDesignUrl, setSecondDesignUrl] = useState(null);
  const navigate = useNavigate();
  const [modifiedImage, setModifiedImage] = useState(null);
  const [imageData, setImageData] = useState(null);

  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [secondModifiedImage, setSecondModifiedImage] = useState(null);
  const [secondImageData, setSecondImageData] = useState(null);

  const [clr, setColor] = useState("white");

  const getImageUrl = (data, objectData) => {
    setModifiedImage(data);
    setImageData(objectData);
  };

  const getSecondDesign = (url) => {
    setSecondDesignUrl(url);
  };

  const getFrontDesign = (url) => {
    setImage(url);
  };

  const secondDesignHandler = (data, objectData) => {
    setSecondModifiedImage(data);
    setSecondImageData(objectData);
  };

  const getColorName = (clr) => {
    if (clr === "#000000") return "Black";
    if (clr === "#ffffff") return "White";
    return "white";
  };

  console.log("Second design URL:", secondDesignUrl);

  return (
    <>
      <div className="flex-col flex ">
        <NavbarNew/>
        <div className="flex flex-col md:flex-row">
          <div>
            <div>
              <p className="text-xl font-extrabold text-center my-2">Live Preview</p>
            </div>

            <div className="flex gap-1 m-4 my-10">
              <div>
                <p className="font-bold m-2 mx-5">Front</p>

                <ImagePlacer image={image} getImageUrl={getImageUrl} />
                {image ? (
                  <Button
                    onClick={() => {
                      setImage(null);

                      setModifiedImage(null);
                    }}
                    variant="outline"
                    className="text-sm ml-4 my-2"
                  >
                    Remove Front Design
                  </Button>
                ) : (
                  <SecondDesignModal
                    getSecondDesign={getFrontDesign}
                    text={"Choose Front Design"}
                  />
                )}
                
              </div>

              <div>
                <p className="font-bold m-2 mx-5">Back</p>

                <ImagePlacer
                  image={secondDesignUrl}
                  getImageUrl={secondDesignHandler}
                />
                
                <div>
                  {secondDesignUrl ? (
                    <Button
                      onClick={() => {
                        setSecondDesignUrl(null);
                      }}
                    >
                      Remove Back Design
                    </Button>
                  ) : (
                    <SecondDesignModal getSecondDesign={getSecondDesign} />
                  )}

                </div>
              </div>
            </div>
          </div>

          <div className="h-[276px] w-auto mx-auto my-20">
            <Suspense fallback={<div>Loading</div>}>
              <CanvasModel
                imageUrl={modifiedImage}
                imageData={imageData}
                secondImageUrl={secondModifiedImage}
                secondImageData={secondImageData}
                color={clr}
               
              />
            </Suspense>
          </div>
        </div>

        <div className="my-8 mx-4 flex gap-4 flex-col md:flex-row">
          <div>
            <p className="font-bold">Choose Color</p>
            <div>
              <div
                onClick={() => setColor("#000000")}
                style={{
                  width: "100px",
                  height: "50px",
                  margin: "4px 0",
                  backgroundColor: "#000000",
                  cursor: "pointer",
                  border: clr === "#000000" ? "2px solid #0000ff" : "none",
                }}
              ></div>

              <div
                onClick={() => setColor("#ffffff")}
                style={{
                  width: "100px",
                  height: "50px",
                  backgroundColor: "#ffffff",
                  cursor: "pointer",

                  border:
                    clr === "#ffffff"
                      ? "2px solid #0000ff"
                      : "2px solid #000000",
                }}
              ></div>
            </div>
          </div>
          <div>
            <div>
              <p className="my-1 font-semibold">Size</p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-[250px]">
                    {size}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-fit">
                  <DropdownMenuLabel>Select Size</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={size} onValueChange={setSize}>
                    <DropdownMenuRadioItem value="XS">XS</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="S">S</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="M">M</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="L">L</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="XL">XL</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="XXL">
                      XXL
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="my-4">
              <p className="my-1 font-semibold">Quantity</p>
              <Input
                type="number"
                placeholder="1"
                min={1}
                value={quantity}
                onChange={(event) => {
                  setQuantity(event.target.value);
                }}
              />
            </div>

            <div>
              <Button
                onClick={() => {
                  
                  if(size!=''&&quantity!=''){
                  alert('Size you have selected : '+size);
                  alert('No of Quantity : '+quantity);
                  alert('Color you have selected : '+getColorName(clr));
                  navigate("/checkout", {
                    state: {
                      size,
                      quantity,
                      color: clr,
                      imageUrl: modifiedImage,
                      secondImageUrl: secondModifiedImage,
                    },
                  });
                }else{
                  alert('Please select required details')
                }
                }}
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
        {/* <Suspense fallback={<div>Loading</div>}>
          <SimilarDesigns categoryName={category} />
        </Suspense> */}
      </div>
    </>
  );
}

export default Design;

// import ImagePlacer from "@/components/users-components/ImagePlacer";
// import { SizeDropDown } from "@/components/users-components/SizeDropDown";
// import React, { Suspense, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import Shirt from "@/components/canvas/Shirt";
// import CanvasModel from "@/components/canvas";
// import { SketchPicker } from "react-color";
// import SecondDesignModal from "@/components/users-components/SecondDesignModal";
// import NavbarNew  from "@/components/NavbarNew";

// function Design() {
//   const location = useLocation();
//   const image = location.state.logo;
//   const [secondDesignUrl, setSecondDesignUrl] = useState(null);
//   const navigate = useNavigate();
//   const [modifiedImage, setModifiedImage] = useState(null);
//   const [imageData, setImageData] = useState(null);

//   const [secondModifiedImage, setSecondModifiedImage] = useState(null);
//   const [secondImageData, setSecondImageData] = useState(null);

//   const getImageUrl = (data, objectData) => {
//     setModifiedImage(data);
//     setImageData(objectData);
//   };

//   const getSecondDesign = (url) => {
//     console.log(url);
//     setSecondDesignUrl(url);
//   };
//   const [clr, setColor] = useState("white");

//   const secondDesignHandler = (data, objectData) => {
//     setSecondModifiedImage(data);
//     setSecondImageData(objectData);
//   };

//   return (
//     <div className="flex-col flex ">
//       <NavbarNew/>
//       <div className="flex flex-col md:flex-row">
//         <div>
//           <div>
//             <p className="text-xl font-extrabold my-2">Live Preview</p>
//           </div>
//           <div className="flex gap-1">
//             <div>
//               <ImagePlacer logo={image} getImageUrl={getImageUrl} />
//             </div>
//             {secondDesignUrl && (
//               <div>
//                 <ImagePlacer
//                   logo={secondDesignUrl}
//                   getImageUrl={secondDesignHandler}
//                 />
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="h-[276px]">
//           <Suspense fallback={<div>Loading</div>}>
//             <CanvasModel
//               imageUrl={modifiedImage}
//               imageData={imageData}
//               secondImageUrl={secondModifiedImage}
//               secondImageData={secondImageData}
//               color={clr}
//             />
//           </Suspense>
//         </div>
//       </div>

//       <div className="my-8 mx-4 flex gap-4 flex-col md:flex-row">
//         <div>
//           <SketchPicker
//             onChange={(color) => {
//               setColor(color.hex);
//             }}
//             disableAlpha
//             presetColors={["#ffffff", "#000000"]}
//             color={clr}
//           />
//         </div>
//         <div>
//           <div>
//             {secondDesignUrl ? (
//               <Button
//                 onClick={() => {
//                   setSecondDesignUrl(null);
//                 }}
//               >
//                 Remove Second Design
//               </Button>
//             ) : (
//               <SecondDesignModal getSecondDesign={getSecondDesign} />
//             )}
//           </div>
//           <div>
//             <p className="my-1 font-semibold">Size</p>
//             <SizeDropDown />
//           </div>
//           <div className="my-4">
//             <p className="my-1 font-semibold">Quantity</p>
//             <Input type="number" placeholder="1" min={1} />
//           </div>

//           <div>
//             <Button
//               onClick={() => {
//                 navigate("/checkout");
//               }}
//             >
//               Checkout
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Design;

