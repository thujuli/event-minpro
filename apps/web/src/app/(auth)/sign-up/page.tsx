import placeholder from "@/public/images/sign-up/placeholder-768x864.png";
import SignUpForm from "../_components/sign-up/sign-up-form";
import AuthPoster from "../_components/auth-poster";
import React from "react";

const SignUpPage: React.FC = () => {
  return (
    <section id="sign-up" className="flex items-center justify-center">
      <AuthPoster image={placeholder} name="Sign Up Poster" />
      <SignUpForm />
    </section>
  );
};

export default SignUpPage;
