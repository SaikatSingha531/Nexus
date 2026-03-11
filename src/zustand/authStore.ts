import { supabase } from "@/lib/supabaseClient";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { create } from "zustand";

interface AuthState {
  loading: boolean;
  error: string | null;
  token: string | null;
  success: boolean;
  user: any | null;
  role: string | null;
  registerUser: (data: any) => Promise<any>;
  loginUser: (data: any) => Promise<any>;
  logoutUser: () =>  Promise<{success:boolean , message:string}>;
}

export const useAuthStore = create<AuthState>((set) => ({
  loading: false,
  error: null,
  token: (getCookie("token") as string) || null,
  success: false,
  user: getCookie("user") ? JSON.parse(getCookie("user") as string) : null,
  role: (getCookie("role") as string) || null,

  registerUser: async (data) => {
    set({ loading: true });
    try {
      const { data: authData, error: acCreateError } =
        await supabase.auth.signUp({
          email: data.email,
          password: data.password,
        });

      if (acCreateError) throw acCreateError;
      if (!authData.user) throw new Error("User creation failed");

      const userID = authData.user?.id;
      console.log("accouant create", authData, userID);
      const { data: registration, error: registrationError } = await supabase
        .from("registration")
        .insert({
          name: data.name,
          email: data.email,
          phone: data.phone,
          password: data.password,
          role: "user",
          auth_user_id: userID,
        });
      console.log("registration compleated ", registration);
      if (registrationError) throw registrationError;

      set({
        loading: false,
        success: true,
      });
      return {
        success: true,
        message: "Registration Successfull",
      };
    } catch (error: any) {
      console.log(error);
      set({ loading: false, error: error.message || "failed" });
      return {
        success: false,
        message: error.message || "Faild to register",
      };
    } finally {
      set({ loading: false });
    }
  },

   loginUser: async (data) => {
    // console.log("data coming in zustand", data);
    set({ loading: true });
    try {
      set({ loading: true, success: true });
      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });
      console.log("auth return", authData);
      if (authError) throw authError;
      const { data: profile, error: profileError } = await supabase
        .from("registration")
        .select("*")
        .eq("auth_user_id", authData.user.id)
        .single();
      console.log("profile details", profile);
      if (profileError) throw profileError;
      setCookie("token", authData?.session?.access_token, {
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });
      setCookie("role", profile.role, { maxAge: 60 * 60 * 24 * 7, path: "/" });
      setCookie("user", JSON.stringify(profile), {
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });
      set({
        token: authData?.session?.access_token,
        user: profile,
        role: profile.role,
        loading: false,
      });
      return {
        success: true,
        message: "Login Successfull",
      };
    } catch (error: any) {
      console.log(error);
      set({ loading: false, error: error.message || "failed" });
      return {
        success: false,
        message: error.message || "Faild to Login",
      };
    } finally {
      set({ loading: false });
    }
  },

  logoutUser: async () => {
    try {
      set({ loading: true });
      await supabase.auth.signOut();
      deleteCookie("token");
      deleteCookie("role");
      deleteCookie("user");
      set({
        token: null,
        user: null,
        role: null,
        loading: false,
      });
      return {
        success: true,
        message: "Logged out successfully",
      };
    } catch (error: any) {
      set({ loading: false });
      return {
        success: false,
        message: error.message || "Logout failed",
      };
    }
  },

}));

