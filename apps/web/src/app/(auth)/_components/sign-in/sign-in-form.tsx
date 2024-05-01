"use client";

import InputForm from "../input-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signInSchema, SignInSchema } from "@/schemas/authSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";

const SignInForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      console.log(isSubmitSuccessful);
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = async (values: SignInSchema) => {
    // simulation submit form
    const promise = () =>
      new Promise((resolve) => setTimeout(() => resolve("Sonner"), 2000));

    toast.promise(promise, {
      loading: "Loading...",
      success: (data) => {
        return `${data} toast has been added`;
      },
      error: "Error",
    });

    const res = await promise();
    console.log(res);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center px-2 ">
      <Card className="max-w-md flex-grow">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Welcome Back!</CardTitle>
            <CardDescription>
              Enter your username or email below to sign up to your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <InputForm
              id="identity"
              label="Username or Email"
              placeholder="John Doe"
              type="text"
              register={register}
              error={errors.identity}
            />
            <InputForm
              id="password"
              label="Password"
              placeholder="********"
              type="password"
              register={register}
              error={errors.password}
            />
          </CardContent>
          <CardFooter className="flex-col gap-4">
            <Button
              type="submit"
              size="sm"
              disabled={isSubmitting}
              className="w-full gap-2 md:h-10 md:px-4 md:py-2"
            >
              Sign In
            </Button>
            <span className="text-xs md:text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="font-bold underline">
                Sign Up
              </Link>
            </span>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SignInForm;
