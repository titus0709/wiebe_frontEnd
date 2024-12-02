import { Route, Routes } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import Home from "./pages/Home";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoutes";
import Admin from "./pages/Admin";
import AdminCheck from "./components/AdminCheck";
import React from "react";
import Orders from "./pages/Orders";
import Checkout from "./pages/users/Checkout";
import Design from "./pages/users/Design";
import Payment from "./pages/users/Payment";
import OrdersUser from "./pages/users/OrdersUser";
import Price from "./pages/Price";

function App() {
  const { isLoaded, user } = useUser();

  if (!isLoaded) {
    return <div> Loading </div>;
  }
  const isAdmin = user?.publicMetadata?.role === "admin";

  console.log(isAdmin);
  return (
    <Routes>
      {isAdmin ? (
        <>
          <Route path="/*" element={<AdminCheck></AdminCheck>}>
            <Route index element={<Admin />} />
            <Route path="orders" element={<Orders />} />
            <Route path="customers" element={<div>Customers</div>} />
            <Route path="pricing" element={<Price />} />

            <Route path="*" element={<div>Not Found</div>} />
          </Route>
        </>
      ) : (
        <>
          {/* <Route path="/*" element={<ProtectedRoute></ProtectedRoute>}> */}
          <Route path="/*" >
            <Route index element={<Home />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="orders" element={<OrdersUser/>} />
            <Route path="design" element={<Design />} />
            <Route path="payment" element={<Payment/>} />
            <Route path="*" element={<div>Not Found</div>} />
          </Route>
        </>
      )}
      <Route path="/sign-in/*" element={<SignInPage />} />
      <Route path="/sign-up/*" element={<SignUpPage />} />
    </Routes>
  );
}

export default App;
