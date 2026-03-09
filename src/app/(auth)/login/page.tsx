'use client'

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/zustand/authStore';
import Ballpit from '@/components/Ballpit';

interface ILoginInputs {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const { loading, loginUser } = useAuthStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ILoginInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: ILoginInputs) => {
    const response = await loginUser(data);

    if (response.success) {
      toast.success('Login Successful 🎉');

      const role = useAuthStore.getState().role;

      if (role === 'admin') {
        router.push('/admin/addvideos');
      } else {
        router.push('/');
      }

      reset();
    } else {
      toast.error(response.message || 'Login failed');
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">

      {/* Animated Background */}
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

      {/* Login Container */}
      <div className="w-full max-w-md p-10 border border-white/20 rounded-2xl backdrop-blur-md bg-transparent shadow-2xl text-center ">

        <h1 className="text-3xl font-semibold text-center text-white mb-8 tracking-wide">
          Login
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Email */}
          <div className="space-y-2 ">
            <label className="text-sm text-white font-medium">
              Email Address
            </label>

            <Input
              {...register('email')}
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
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
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

          {/* Login Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2"
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>

        </form>

        <p className="text-center text-sm text-white/70 mt-8">
          Don’t have an account?{' '}
          <br />
          <span
            onClick={() => router.push('/register')}
            className="text-red-500 cursor-pointer hover:text-blue-600 transition-all duration-500 ease-in-out"
          >
            Register
          </span>
        </p>

        <p className="text-right text-sm text-white/70 mt-4 italic ">
          <span
            onClick={() => router.push('/')}
            className="text-blue-400 cursor-pointer hover:text-blue-600 transition-all duration-500 ease-in-out"
          >
           Continue As Gueast
          </span>
        </p>

      </div>

    </div>
  );
}