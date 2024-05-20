import placeholder from "@/public/images/aesthetic-lakeside-beauty-background-hd-wallpaper-sr10012409-1704894284394-cover.webp";
import SignUpForm from "../_components/sign-up/sign-up-form";
import React from "react";
import AuthPosterRegis from "../_components/auth-poster-regis";

const SignUpPage: React.FC = () => {
  return (
    <section id="sign-up" className="flex items-center justify-center">
      <AuthPosterRegis image={placeholder} name="Sign Up Poster" />
      <SignUpForm />
    </section>
  );
};

export default SignUpPage;
