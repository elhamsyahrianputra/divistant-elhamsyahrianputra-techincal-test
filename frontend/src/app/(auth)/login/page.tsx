"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Button } from "@/core/components/ui/button";
import { Input } from "@/core/components/ui/forms";
import { useLogin } from "@/features/auth/hooks/use-auth";
import {
  type LoginRequest,
  loginSchema,
} from "@/features/auth/schemas/auth-schema";

export default function Page() {
  const { mutate, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
  });

  function onSubmit(request: LoginRequest) {
    mutate(request);
  }

  return (
    <>
      {/* Left Section */}
      <section className="hidden max-w-120 flex-1 flex-col items-center justify-center gap-y-6 bg-linear-to-br from-white to-gray-200 lg:flex">
        <div className="flex flex-col gap-y-4 text-center">
          <h1 className="font-bold text-3xl text-gray-800">Welcome Back!</h1>
          <p className="px-12 text-gray-600 text-sm">
            Discover, track, and review books — sign in to manage your reading
            lists and connect with fellow readers.
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
            Sign in to your account
          </h2>
          <p className="text-gray-600 text-sm">
            Don&apos;t have an account?{" "}
            <Link className="font-medium text-primary" href="/register">
              Register
            </Link>
          </p>
        </div>

        {/* Forms */}
        <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <Input
              autoComplete="email"
              autoFocus
              errorMessage={errors.email?.message}
              label="Email address"
              placeholder="email@example.com"
              type="email"
              {...register("email")}
            />
            <div className="flex flex-col gap-3">
              <Input
                autoComplete="password"
                errorMessage={errors.password?.message}
                label="Password"
                placeholder="8+ characters"
                type="password"
                {...register("password")}
              />
              <Link className="self-end text-sm" href="#">
                Forgot password?
              </Link>
            </div>
            <Button isLoading={isPending}>Sign In</Button>
          </div>
        </form>
      </section>
    </>
  );
}
