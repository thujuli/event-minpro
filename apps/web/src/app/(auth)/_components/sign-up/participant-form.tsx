"use client";

import InputForm from "../input-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { SignUpSchema, signUpSchema } from "@/schemas/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, { useEffect } from "react";
import { toast } from "sonner";

const ParticipantForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      console.log(isSubmitSuccessful);
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = async (values: SignUpSchema) => {
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
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader>
          <CardDescription>
            When you register as a <strong>participant</strong>, you can browse
            available events, purchase tickets for events, and provide feedback
            on events you have attended.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 ">
          <InputForm
            id="username"
            label="Username"
            placeholder="John Doe"
            type="text"
            register={register}
            error={errors.username}
          />
          <InputForm
            id="email"
            label="Email"
            placeholder="johndoe@mail.com"
            type="text"
            register={register}
            error={errors.email}
          />
          <InputForm
            id="password"
            label="Password"
            placeholder="********"
            type="password"
            register={register}
            error={errors.password}
          />
          <InputForm
            id="confirmPassword"
            label="Confirm Password"
            placeholder="********"
            type="password"
            register={register}
            error={errors.confirmPassword}
          />
          <InputForm
            id="referralCode"
            label="Referral Code"
            placeholder="EXAMPLE123"
            type="text"
            register={register}
            error={errors.referralCode}
          />
        </CardContent>
        <CardFooter className="flex-col gap-4 ">
          <Button
            type="submit"
            size="sm"
            disabled={isSubmitting}
            className="w-full gap-2 md:h-10 md:px-4 md:py-2"
          >
            Sign Up
          </Button>
          <span className="text-xs md:text-sm">
            Have an account?{" "}
            <Link href="/sign-in" className="font-bold underline">
              Sign In
            </Link>
          </span>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ParticipantForm;
