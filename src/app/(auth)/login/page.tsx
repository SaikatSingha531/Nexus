// 'use client'

// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { useState } from 'react';
// import { Eye, EyeOff } from 'lucide-react';
// import { toast } from 'sonner';
// import { useRouter } from 'next/navigation';
// import { useAuthStore } from '@/zustand/authStore';
// import Ballpit from '@/components/Ballpit';

// interface ILoginInputs {
//   email: string;
//   password: string;
// }

// const schema = yup.object({
//   email: yup.string().email('Invalid email').required('Email is required'),
//   password: yup
//     .string()
//     .min(6, 'Password must be at least 6 characters')
//     .required('Password is required'),
// });

// export default function Login() {
//   const router = useRouter();
//   const [showPassword, setShowPassword] = useState(false);

//   const { loading, loginUser } = useAuthStore();

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm<ILoginInputs>({
//     resolver: yupResolver(schema),
//   });

//   const onSubmit = async (data: ILoginInputs) => {
//     const response = await loginUser(data);

//     if (response.success) {
//       toast.success('Login Successful 🎉');

//       const role = useAuthStore.getState().role;

//       if (role === 'admin') {
//         router.push('/admin/addvideos');
//       } else {
//         router.push('/');
//       }

//       reset();
//     } else {
//       toast.error(response.message || 'Login failed');
//     }
//   };

//   return (
//     <div className="relative flex items-center justify-center min-h-screen overflow-hidden">

//       {/* Animated Background */}
//       <div className="absolute inset-0 -z-10 bg-black pointer-events-none">
//         <Ballpit
//           count={120}
//           gravity={0.01}
//           friction={0.9975}
//           wallBounce={0.95}
//           followCursor={false}
//           colors={[0x6366f1, 0x3b82f6, 0x9333ea]}
//         />
//       </div>

//       {/* Login Container */}
//       <div className="relative z-10 w-full max-w-md p-10 border border-white/20 rounded-2xl backdrop-blur-md bg-transparent shadow-2xl text-center">

//         <h1 className="text-3xl font-semibold text-center text-white mb-8 tracking-wide">
//           Login
//         </h1>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

//           {/* Email */}
//           <div className="space-y-2 ">
//             <label className="text-sm text-white font-medium">
//               Email Address
//             </label>

//             <Input
//               {...register('email')}
//               type="email"
//               className="bg-transparent border-white/30 text-white focus:border-indigo-400"
//             />

//             {errors.email && (
//               <p className="text-red-400 text-xs">
//                 {errors.email.message}
//               </p>
//             )}
//           </div>

//           {/* Password */}
//           <div className="space-y-2 relative">

//             <label className="text-sm text-white font-medium">
//               Password
//             </label>

//             <Input
//               {...register('password')}
//               type={showPassword ? 'text' : 'password'}
//               className="bg-transparent border-white/30 text-white pr-10 focus:border-indigo-400"
//             />

//             <button
//               type="button"
//               onClick={() => setShowPassword((prev) => !prev)}
//               className="absolute right-3 top-9 text-white/70 hover:text-white"
//             >
//               {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//             </button>

//             {errors.password && (
//               <p className="text-red-400 text-xs">
//                 {errors.password.message}
//               </p>
//             )}

//           </div>

//           {/* Login Button */}
//           <Button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2"
//           >
//             {loading ? 'Logging in...' : 'Login'}
//           </Button>

//         </form>

//         <p className="text-center text-sm text-white/70 mt-8">
//           Don’t have an account?{' '}
//           <br />
//           <span
//             onClick={() => router.push('/register')}
//             className="text-red-500 cursor-pointer hover:text-blue-600 transition-all duration-500 ease-in-out"
//           >
//             Register
//           </span>
//         </p>

//         <p className="text-right text-sm text-white/70 mt-4 italic ">
//           <span
//             onClick={() => router.push('/')}
//             className="text-blue-400 cursor-pointer hover:text-blue-600 transition-all duration-500 ease-in-out"
//           >
//            Continue As Guest
//           </span>
//         </p>

//       </div>

//     </div>
//   );
// }





























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
    <>
      {/* FIX 1: Move background to a FIXED container outside the main flow.
        Added pointer-events-none and select-none to ensure it is invisible to touch.
      */}
      <div className="fixed inset-0 -z-50 bg-black pointer-events-none select-none overflow-hidden">
        <Ballpit
          count={120}
          gravity={0.01}
          friction={0.9975}
          wallBounce={0.95}
          followCursor={false}
          colors={[0x6366f1, 0x3b82f6, 0x9333ea]}
        />
      </div>

      {/* FIX 2: Main container uses min-h-screen but allows scrolling on small devices.
        Increased Z-index and added 'isolate' to create a clean stacking context.
      */}
      <main className="relative z-10 isolate flex items-center justify-center min-h-screen px-4 py-12">
        
        <div className="w-full max-w-md p-8 md:p-10 border border-white/20 rounded-2xl backdrop-blur-xl bg-black/20 shadow-2xl text-center">
          
          <h1 className="text-3xl font-semibold text-center text-white mb-8 tracking-wide">
            Login
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-left">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm text-white font-medium ml-1">
                Email Address
              </label>
              <Input
                {...register('email')}
                type="email"
                autoComplete="email"
                className="bg-white/5 border-white/20 text-white focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 h-11"
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2 relative">
              <label className="text-sm text-white font-medium ml-1">
                Password
              </label>
              <div className="relative">
                <Input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  className="bg-white/5 border-white/20 text-white pr-12 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 h-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors p-1"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-6 rounded-xl transition-all active:scale-[0.98]"
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          <div className="mt-8 space-y-4">
            <p className="text-center text-sm text-white/70">
              Don’t have an account?{' '}
              <span
                onClick={() => router.push('/register')}
                className="text-indigo-400 font-semibold cursor-pointer hover:text-indigo-300 transition-colors"
              >
                Register
              </span>
            </p>

            <div 
              onClick={() => router.push('/')}
              className="text-sm text-blue-400 cursor-pointer hover:text-blue-300 transition-colors italic"
            >
              Continue As Guest
            </div>
          </div>

        </div>
      </main>
    </>
  );
}