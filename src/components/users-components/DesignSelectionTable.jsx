// import React, { useState } from "react";
// import ReactSelect from "react-select";
// import ImagePlacer from "./ImagePlacer";
// import wolf from "../../assets/wolf.png";
// import tiger from "../../assets/tiger.png";
// import eagle from "../../assets/eagle.png";
// import { useNavigate } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";

// import { request } from "@/global/axiosGlobal";
// import DesignViewClient from "./DesignViewClient";
// function DesignSelectionTable() {
//   const logos = [wolf, tiger, eagle];
//   const [value, setValue] = useState(null);
//   const { data, isLoading } = useQuery({
//     queryKey: ["categories"],
//     queryFn: () => {
//       return request.get(`/get-categories`);
//     },
//   });
//   const navigate = useNavigate();
//   if (isLoading) {
//     return <div>Loading..</div>;
//   }

//   return (
//     <>
//       <div className="">
//         <div className="mx-4">
//           <ReactSelect
//             isLoading={isLoading}
//             styles={{
//               option: () => ({
//                 color: "black",
//               }),
//             }}
//             options={data?.data.map((category) => {
//               return {
//                 label: category.categoryName,
//                 value: category.categoryName,
//               };
//             })}
//             value={value}
//             onChange={(option) => {
//               setValue(option);
//             }}
//           />
//         </div>

//         <div className="">
//           <DesignViewClient categoryName={value?.value} />
//           {logos.map((logo) => {
//             return (
//               <div
//                 key={logo}
//                 style={{
//                   width: "fit-content",
//                 }}
//                 onClick={() => {
//                   navigate("/design", {
//                     state: {
//                       logo,
//                     },
//                   });
//                 }}
//               >
//                 <img src={logo} height={150} width={150} />
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </>
//   );
// }

// export default DesignSelectionTable;

import React, { useState } from "react";
import ReactSelect from "react-select";
import ImagePlacer from "./ImagePlacer";
import veirdo from "../../assets/vb200.jpeg";
import banner from "../../assets/banner.jpeg";


import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { request } from "@/global/axiosGlobal";
import DesignViewClient from "./DesignViewClient";
import HomeProducts from "./homeProducts";

function DesignSelectionTable() {
  const logos = [veirdo,veirdo,veirdo,veirdo,veirdo,veirdo,veirdo,veirdo];
  const rating = [4,3,5,5,4,5];
  const [value, setValue] = useState(null);
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => {
      return request.get(`/get-categories`);
    },
  });
  const navigate = useNavigate();
  if (isLoading) {
    return <div>Loading..</div>;
  }

  return (
    <>
      <div className="">
        <div className="">
        <img src={banner} alt="" className="rounded-lg" />
        </div>
       
        <div className="mx-4">

<ReactSelect
  isLoading={isLoading}
  styles={{
    container: (base) => ({
      ...base,
      width: "200px", 
      margin:"20px",
      marginLeft: "auto", 
      marginRight:"50px",
      marginTop:"20px"
    }),
    control: (base) => ({
      ...base,
      minHeight: "30px", 
      fontSize: "14px", 
      margin:"10px"
    }),
    menu: (base) => ({
      ...base,
      textAlign: "center",
    }),
    option: (base) => ({
      ...base,
      color: "black",
      textAlign: "center", 
      fontWeight: "bold"
    }),
  }}
  options={data?.data.map((category) => ({
    label: category.categoryName,
    value: category.categoryName,
  }))}
  value={value}
  onChange={(option) => {
    setValue(option);
  }}
  className="my-custom-class"
/>

  </div>

      <div className="">
        
        <DesignViewClient categoryName={value?.value} />

      </div>
          <div className=" grid grid-cols-4 gap-8 content-center " >
          {logos.map((logo) => {
              return (
                <div
                  key={logo}
                  style={{
                    width: "270px",
                    height: "410px",
                    // display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                    // width: "40%"
                  }}
                  onClick={() => {
                    navigate("/design", {
                      state: {
                        logo,
                      },
                    });
                  }}
                >
                 <img src={logo} className=" rounded-sm ring   " />
                
                  <div>
                         
                  </div>

                </div>
                
              );
            })}
          
          </div>
       {/* <HomeProducts/> */}
      </div>
    </>
  );
}

export default DesignSelectionTable;



