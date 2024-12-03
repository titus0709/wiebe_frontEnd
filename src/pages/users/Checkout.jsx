// import { Button } from "@/components/ui/button";
// import { CheckoutAddress } from "@/components/users-components/CheckoutAddress";
// import React from "react";
// import { getDate } from "datetimesaga";
// const Checkout = () => {
//   const { date, day, month, year } = getDate();
//   return (
//     <div>
//       <div className="mx-1 md:mx-36">
//         <div className="flex-auto">
//           <div className=" font-bold text-2xl mb-4">Product Details</div>
//           <div className="h-60 border border-slate-300 rounded-lg"></div>
//         </div>

//         <div className="flex-auto">
//           <div className="font-bold text-2xl my-2">Checkout</div>
//           <div>
//             <h1 className="text-xl">Price Details (1 Items)</h1>
//             <p className="font-bold">Total Product Price + ₹110 Order</p>
//             <hr className="my-2" />
//             <div className="my-2">
//               <h1>Total ₹110</h1>
//             </div>
//             <span className="text-[10px]">
//               Clicking on 'Continue' will not deduct any money
//             </span>

//             <CheckoutAddress />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;


// second edited

// import React from "react";
// import { useLocation } from "react-router-dom";
// import { CheckoutAddress } from "@/components/users-components/CheckoutAddress";
// import NavbarNew  from "@/components/NavbarNew";

// const Checkout = () => {
//   const location = useLocation();

//   // Extracting data passed from the Design component
//   const { size, quantity, color, imageUrl, secondImageUrl } = location.state || {};

//   return (
//     <div>
//       <NavbarNew/>
//       <div className="mx-1 md:mx-36">
//         <div className="flex-auto">
//           <div className="font-bold text-2xl mb-4">Product Details</div>
//           <div className="h-60 border border-slate-300 rounded-lg p-4">
//             {imageUrl || secondImageUrl ? (
//               <div className="flex gap-4">
//                 {/* Display front design */}
//                 {imageUrl && (
//                   <div>
//                     <p className="font-bold">Front Design:</p>
//                     <img
//                       src={imageUrl}
//                       alt="Front Design"
//                       className="w-20 h-20 object-cover border rounded-lg"
//                     />
//                   </div>
//                 )}
//                 {/* Display back design */}
//                 {secondImageUrl && (
//                   <div>
//                     <p className="font-bold">Back Design:</p>
//                     <img
//                       src={secondImageUrl}
//                       alt="Back Design"
//                       className="w-20 h-20 object-cover border rounded-lg"
//                     />
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <p>No design added</p>
//             )}
//             <div className="mt-4">
//               <p><strong>Size:</strong> {size || "Not selected"}</p>
//               <p><strong>Quantity:</strong> {quantity || 1}</p>
//               <p><strong>Color:</strong> {color === "#000000" ? "Black" : "White"}</p>
//             </div>
//           </div>
//         </div>

//         <div className="flex-auto">
//           <div className="font-bold text-2xl my-2">Checkout</div>
//           <div>
//             <h1 className="text-xl">Price Details ({quantity || 1} Items)</h1>
//             <p className="font-bold">Total Product Price + ₹110 Order</p>
//             <hr className="my-2" />
//             <div className="my-2">
//               <h1>Total ₹{(quantity || 1) * 110}</h1>
//             </div>
//             <span className="text-[10px]">
//               Clicking on 'Continue' will not deduct any money
//             </span>

//             <CheckoutAddress />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;


//lastly edited 

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { CheckoutAddress } from "@/components/users-components/CheckoutAddress";
import NavbarNew from "@/components/NavbarNew";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extracting data passed from the Design component
  const { size, quantity, color, imageUrl, secondImageUrl } = location.state || {};

  // State to handle form submission and feedback
  const [shippingAddress, setShippingAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    landmark: "",
    pincode: "",
    city: "",
    state: "",
    country: "India", // default
    addressType: "home", // default
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);

    // Basic validation
    // if (!shippingAddress.addressLine1 || !shippingAddress.pincode || !shippingAddress.city || !shippingAddress.state) {
    //   setError("Please fill all required shipping details.");
    //   setLoading(false);
    //   return;
    // }

    const orderData = {
      user: "USER_ID_FROM_CONTEXT_OR_AUTH", // Replace with actual user ID
      orderItems: [
        {
          frontImage: imageUrl,
          backImage: secondImageUrl,
          size: size || "Not selected",
          quantity: quantity || 1,
          color: color || "Not selected",
          orderId: `ORDER-${Date.now()}`, // Example unique order ID
          placement: "Front and Back",
          designPosition: "Center",
          
        },
      ],
      ShippingAddress: shippingAddress,
    };

    try {
      const response = await axios.post("http://localhost:8000/api/orders", orderData);
      console.log("Order placed:", response.data);

      // Navigate to a success page or reset the form
      navigate("/success", { state: { orderId: response.data.order._id } });
    } catch (error) {
      console.error("Error placing order:", error);
      setError("Failed to place the order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <NavbarNew />
      <div className="mx-1 md:mx-36">
        <div className="flex-auto">
          <div className="font-bold text-2xl mb-4">Product Details</div>
          <div className="h-60 border border-slate-300 rounded-lg p-4">
            {imageUrl || secondImageUrl ? (
              <div className="flex gap-4">
                {imageUrl && (
                  <div>
                    <p className="font-bold">Front Design:</p>
                    <img
                      src={imageUrl}
                      alt="Front Design"
                      className="w-20 h-20 object-cover border rounded-lg"
                    />
                  </div>
                )}
                {secondImageUrl && (
                  <div>
                    <p className="font-bold">Back Design:</p>
                    <img
                      src={secondImageUrl}
                      alt="Back Design"
                      className="w-20 h-20 object-cover border rounded-lg"
                    />
                  </div>
                )}
              </div>
            ) : (
              <p>No design added</p>
            )}
            <div className="mt-4">
              <p><strong>Size:</strong> {size || "Not selected"}</p>
              <p><strong>Quantity:</strong> {quantity || 1}</p>
              <p><strong>Color:</strong> {color === "#000000" ? "Black" : "White"}</p>
            </div>
          </div>
        </div>

        <div className="flex-auto">
          <div className="font-bold text-2xl my-2">Checkout</div>
          <div>
            <h1 className="text-xl">Price Details ({quantity || 1} Items)</h1>
            <p className="font-bold">Total Product Price: ₹{(quantity || 1) * 110}</p>
            <hr className="my-2" />
            <div className="my-2">
              <h1>Total: ₹{(quantity || 1) * 110}</h1>
            </div>
            <span className="text-[10px]">
              Clicking on 'Place Order' will not deduct any money
            </span>

            <div className="mt-4">
              <CheckoutAddress
                shippingAddress={shippingAddress}
                setShippingAddress={setShippingAddress}
              />
            </div>

            {error && <p className="text-red-500 mt-2">{error}</p>}

          
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

