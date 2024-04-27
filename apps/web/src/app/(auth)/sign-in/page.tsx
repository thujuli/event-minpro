import placeholder from "@/public/images/sign-in/placeholder-768x864.png";
import SignInForm from "../_components/sign-in/sign-in-form";
import AuthPoster from "../_components/auth-poster";
import React from "react";

const SignInPage: React.FC = () => {
  return (
    <section id="sign-in" className="flex items-center justify-center">
      <AuthPoster image={placeholder} name="Sign In Poster" />
      <SignInForm />
    </section>
  );
};

export default SignInPage;
