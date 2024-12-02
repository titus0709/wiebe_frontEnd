import React from "react";
import { SignIn } from "@clerk/clerk-react";
const SignInPage = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <SignIn signUpUrl="/sign-up" />
    </div>
  );
};

export default SignInPage;
