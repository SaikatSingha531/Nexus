"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/zustand/authStore";
import Ballpit from "@/components/Ballpit";

interface IFormInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export default function Register() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { loading, registerUser } = useAuthStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IFormInputs) => {
    const { ...userData } = data;

    const response = await registerUser(userData);

    if (response.success) {
      toast.success("Accouant Created Successfully");
      router.push("/login")
      reset();
    } else {
      toast.error(response.message || "Registration failed");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">

      {/* Ballpit Background */}
      <div className="absolute inset-0 -z-10 bg-black">
        <Ballpit
          count={120}
          gravity={0.01}
          friction={0.9975}
          wallBounce={0.95}
          followCursor={false}
          colors={[0x6366f1, 0x3b82f6, 0x9333ea]}
        />
      </div>

      {/* Register Card */}
      <div className="w-full max-w-md p-10 border border-white/20 rounded-2xl backdrop-blur-md bg-transparent shadow-2xl text-center">

        <h1 className="text-3xl font-semibold text-center text-white mb-8 tracking-wide">
          Create Account
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Name */}
          <div className="space-y-2">
            <label className="text-sm text-white font-medium">
              Full Name
            </label>

            <Input
              {...register("name")}
              className="bg-transparent border-white/30 text-white focus:border-indigo-400"
            />

            {errors.name && (
              <p className="text-red-400 text-xs">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm text-white font-medium">
              Email Address
            </label>

            <Input
              {...register("email")}
              type="email"
              className="bg-transparent border-white/30 text-white focus:border-indigo-400"
            />

            {errors.email && (
              <p className="text-red-400 text-xs">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2 relative">
            <label className="text-sm text-white font-medium">
              Password
            </label>

            <Input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              className="bg-transparent border-white/30 text-white pr-10 focus:border-indigo-400"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-9 text-white/70 hover:text-white"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>

            {errors.password && (
              <p className="text-red-400 text-xs">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2 relative">
            <label className="text-sm text-white font-medium">
              Confirm Password
            </label>

            <Input
              {...register("confirmPassword")}
              type={showConfirmPassword ? "text" : "password"}
              className="bg-transparent border-white/30 text-white pr-10 focus:border-indigo-400"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword((prev) => !prev)
              }
              className="absolute right-3 top-9 text-white/70 hover:text-white"
            >
              {showConfirmPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>

            {errors.confirmPassword && (
              <p className="text-red-400 text-xs">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Register Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2"
          >
            {loading ? "Registering..." : "Register"}
          </Button>

        </form>

        {/* Login Redirect */}
        <p className="text-center text-sm text-white/70 mt-8">
          Already have an account?{" "}
          <br />
          <span
            onClick={() => router.push("/login")}
            className="text-red-500 cursor-pointer hover:text-blue-600 transition-all duration-500 ease-in-out"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}

