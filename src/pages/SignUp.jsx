import React from "react";
import { SignUp } from "@clerk/clerk-react";
const SignUpPage = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <SignUp signInUrl="/sign-in" />
    </div>
  );
};

export default SignUpPage;
