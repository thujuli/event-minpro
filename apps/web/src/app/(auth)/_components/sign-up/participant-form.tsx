"use client";

import InputForm from "../input-form";
import Spinner from "@/components/shared/spinner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { SignUpSchema, signUpSchema } from "@/types/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect } from "react";

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
    const res = await new Promise((resolve) =>
      setTimeout(() => resolve("success"), 5000),
    );

    console.log(res);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader className="px-2">
          <CardDescription>
            When you register as a <strong>participant</strong>, you can browse
            available events, purchase tickets for events, and provide feedback
            on events you have attended.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 px-2">
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
        <CardFooter className="flex-col gap-4 px-2">
          <Button
            type="submit"
            size="sm"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Spinner />
                <span>Loading...</span>
              </>
            ) : (
              "Sign Up"
            )}
          </Button>
          <span className="text-xs">
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
