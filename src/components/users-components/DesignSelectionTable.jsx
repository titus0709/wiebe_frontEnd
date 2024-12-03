

// import React, { useState } from "react";
// import ReactSelect from "react-select";
// import ImagePlacer from "./ImagePlacer";
// import veirdo from "../../assets/vb200.jpeg";
// import banner from "../../assets/banner.jpeg";


// import { useNavigate } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";

// import { request } from "@/global/axiosGlobal";
// import DesignViewClient from "./DesignViewClient";
// import HomeProducts from "./homeProducts";

// function DesignSelectionTable() {
//   const logos = [veirdo,veirdo,veirdo,veirdo,veirdo,veirdo,veirdo,veirdo];
//   const rating = [4,3,5,5,4,5];
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
//         <div className="">
//         <img src={banner} alt="" className="rounded-lg" />
//         </div>
       
//         <div className="mx-4">

// <ReactSelect
//   isLoading={isLoading}
//   styles={{
//     container: (base) => ({
//       ...base,
//       width: "200px", 
//       margin:"20px",
//       marginLeft: "auto", 
//       marginRight:"50px",
//       marginTop:"20px"
//     }),
//     control: (base) => ({
//       ...base,
//       minHeight: "30px", 
//       fontSize: "14px", 
//       margin:"10px"
//     }),
//     menu: (base) => ({
//       ...base,
//       textAlign: "center",
//     }),
//     option: (base) => ({
//       ...base,
//       color: "black",
//       textAlign: "center", 
//       fontWeight: "bold"
//     }),
//   }}
//   options={data?.data.map((category) => ({
//     label: category.categoryName,
//     value: category.categoryName,
//   }))}
//   value={value}
//   onChange={(option) => {
//     setValue(option);
//   }}
//   className="my-custom-class"
// />

//   </div>

//       <div className="">
        
//         <DesignViewClient categoryName={value?.value} />

//       </div>
//           <div className=" grid grid-cols-4 gap-8 content-center " >
//           {logos.map((logo) => {
//               return (
//                 <div
//                   key={logo}
//                   style={{
//                     width: "270px",
//                     height: "410px",
//                     // display: "block",
//                     marginLeft: "auto",
//                     marginRight: "auto",
//                     // width: "40%"
//                   }}
//                   onClick={() => {
//                     navigate("/design", {
//                       state: {
//                         logo,
//                       },
//                     });
//                   }}
//                 >
//                  <img src={logo} className=" rounded-sm ring   " />
                
//                   <div>
                         
//                   </div>

//                 </div>
                
//               );
//             })}
          
//           </div>
//        {/* <HomeProducts/> */}
//       </div>
//     </>
//   );
// }

// export default DesignSelectionTable;

import React, { useState } from "react";
import ReactSelect from "react-select";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { request } from "@/global/axiosGlobal";
import DesignViewClient from "./DesignViewClient";
import banner from "../../assets/banner.jpeg";
import veirdo from "../../assets/vb200.jpeg";

function DesignSelectionTable() {
  const logos = [veirdo, veirdo, veirdo, veirdo, veirdo, veirdo, veirdo, veirdo];
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
      {/* Banner Section */}
      <div className="mb-6">
        <img
          src={banner}
          alt="Banner"
          className="rounded-lg w-full max-h-64 object-cover"
        />
      </div>

      {/* Dropdown Section */}
      <div className="flex justify-center mb-4">
        <ReactSelect
          isLoading={isLoading}
          styles={{
            container: (base) => ({
              ...base,
              width: "200px",
              margin: "auto",
            }),
            control: (base) => ({
              ...base,
              minHeight: "30px",
              fontSize: "14px",
            }),
            menu: (base) => ({
              ...base,
              textAlign: "center",
            }),
            option: (base) => ({
              ...base,
              color: "black",
              textAlign: "center",
              fontWeight: "bold",
            }),
          }}
          options={data?.data.map((category) => ({
            label: category.categoryName,
            value: category.categoryName,
          }))}
          value={value}
          onChange={(option) => setValue(option)}
        />
      </div>

      {/* Design View Section */}
      <div className="px-4">
        <DesignViewClient categoryName={value?.value} />
      </div>

      {/* Logos Grid Section */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
        {logos.map((logo, index) => (
          <div
            key={index}
            className="rounded-sm ring overflow-hidden shadow-md hover:shadow-lg cursor-pointer"
            onClick={() =>
              navigate("/design", {
                state: { logo },
              })
            }
          >
            <img
              src={logo}
              alt={`Logo ${index + 1}`}
              className="w-full h-64 object-cover"
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default DesignSelectionTable;




