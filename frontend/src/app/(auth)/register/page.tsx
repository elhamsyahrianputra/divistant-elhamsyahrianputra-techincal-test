"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Button } from "@/core/components/ui/button";
import { Input } from "@/core/components/ui/forms";
import { useRegister } from "@/features/auth/hooks/use-auth";
import {
  type RegisterRequest,
  registerSchema,
} from "@/features/auth/schemas/auth-schema";

export default function Page() {
  const { mutate, isPending } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequest>({
    resolver: zodResolver(registerSchema),
  });

  function onSubmit(request: RegisterRequest) {
    mutate(request);
  }

  return (
    <>
      {/* Left Section */}
      <section className="hidden max-w-120 flex-1 flex-col items-center justify-center gap-y-6 bg-linear-to-br from-white to-gray-200 lg:flex">
        <div className="flex flex-col gap-y-4 text-center">
          <h1 className="font-bold text-3xl text-gray-800">
            Create Your Account
          </h1>
          <p className="flex flex-col px-12 text-gray-600 text-sm">
            <span>Manage your books, get recommendations. </span>
            <span>Join the reading community today.</span>
          </p>
        </div>
        <div className="flex justify-center">
          <div className="w-9/12">
            <Image
              alt="Ilustrasi login — orang membaca buku"
              className="object-contain"
              height={480}
              priority
              src="/img/illustration/login-illustration.png"
              width={720}
            />
          </div>
        </div>
      </section>

      {/* Right Section */}
      <section className="mx-auto flex flex-1 flex-col justify-center px-4 pt-6 pb-20 md:max-w-md lg:pt-20">
        {/* Header */}
        <div className="flex flex-col gap-y-3 text-center lg:text-left">
          <h2 className="font-bold text-lg md:text-xl">
            Create your free account
          </h2>
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <Link className="font-medium text-primary" href="/login">
              Sign in
            </Link>
          </p>
        </div>

        {/* Forms */}
        <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <Input
              autoComplete="name"
              label="Full name"
              placeholder="Angelina Christy"
              {...register("name")}
              errorMessage={errors.name?.message}
            />
            <Input
              autoComplete="email"
              label="Email address"
              placeholder="email@example.com"
              type="email"
              {...register("email")}
              errorMessage={errors.email?.message}
            />
            <Input
              autoComplete="password"
              label="Password"
              placeholder="8+ characters"
              type="password"
              {...register("password")}
              errorMessage={errors.password?.message}
            />
            <Button isLoading={isPending}>Sign Up</Button>
          </div>
        </form>

        <div className="mt-6">
          <p className="text-center text-gray-600 text-xs">
            By signing up, you agree to our{" "}
            <Link
              className="text-gray-800 underline hover:text-gray-600"
              href="#"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              className="text-gray-800 underline hover:text-gray-600"
              href="#"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
