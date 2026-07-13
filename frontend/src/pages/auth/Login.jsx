import { Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {

GoogleLogin

}

from "@react-oauth/google";
import { toast } from "sonner";
import Logo from "@/assets/logos/actionwatch-logo.svg";
import RightBanner from "@/assets/logos/registerpage.svg";

import { loginSchema } from "@/schemas/auth.schema";
import { useLogin } from "@/hooks/auth/useLogin";

const Login = () => {

    const [showPassword, setShowPassword] = useState(false);

const { handleLogin, handleGoogleLogin } = useLogin();
    const {

        register,

        handleSubmit,

        formState: {

            errors,

            isSubmitting,

        },

    } = useForm({

        resolver: zodResolver(loginSchema),

        defaultValues: {

            email: "",

            password: "",

        },

    });

   const onSubmit = async (data) => {

    await handleLogin(data);

};

    return (

        <main className="min-h-screen grid bg-background lg:grid-cols-12">

            {/* ================= Left ================= */}

            <section className="hidden lg:col-span-5 lg:flex flex-col justify-between border-r border-border bg-sidebar px-12 py-10">

                <div>

                    <img
                        src={Logo}
                        alt="ActionWatch"
                        className="h-10"
                    />

                    <h1 className="mt-6 max-w-sm text-3xl font-bold leading-tight text-foreground">

                        Welcome Back
                        <br />
                        To ActionWatch

                    </h1>

                    <p className="mt-4 max-w-sm text-[15px] leading-7 text-muted">

                        Sign in to monitor incidents,
                        collaborate with your team and
                        keep your infrastructure healthy.

                    </p>

                </div>

                <div className="flex justify-center">

                    <img
                        src={RightBanner}
                        alt="Login"
                        className="max-h-[300px] w-auto object-contain"
                    />

                </div>

            </section>

            {/* ================= Right ================= */}

            <section className="lg:col-span-7 flex items-center justify-center p-5">

                <div className="w-full max-w-[430px] rounded-3xl border border-border bg-surface p-7 shadow-card">

                    <img
                        src={Logo}
                        alt="ActionWatch"
                        className="mx-auto mb-6 h-10 lg:hidden"
                    />

                    <h2 className="text-center text-2xl font-bold text-foreground">

                        Welcome Back

                    </h2>

                    <p className="mt-1 text-center text-sm text-muted">

                        Login to continue to ActionWatch.

                    </p>

                    <form
                        onSubmit={handleSubmit(handleLogin)}
                        className="mt-6 space-y-5"
                    >
                        {/* ================= Email ================= */}

<div>

    <label className="mb-2 block text-sm font-medium text-foreground">
        Email Address
    </label>

    <div className="relative">

        <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />

        <input
            type="email"
            placeholder="john@example.com"
            {...register("email")}
            className={`h-11 w-full rounded-xl border bg-background pl-11 pr-4 text-sm text-foreground outline-none transition-all ${
                errors.email
                    ? "border-red-500"
                    : "border-border focus:border-primary"
            }`}
        />

    </div>

    {errors.email && (
        <p className="mt-1 text-xs text-red-500">
            {errors.email.message}
        </p>
    )}

</div>

{/* ================= Password ================= */}

<div>

    <label className="mb-2 block text-sm font-medium text-foreground">
        Password
    </label>

    <div className="relative">

        <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />

        <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            {...register("password")}
            className={`h-11 w-full rounded-xl border bg-background pl-11 pr-11 text-sm text-foreground outline-none transition-all ${
                errors.password
                    ? "border-red-500"
                    : "border-border focus:border-primary"
            }`}
        />

        <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted transition hover:text-foreground"
        >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>

    </div>

    {errors.password && (
        <p className="mt-1 text-xs text-red-500">
            {errors.password.message}
        </p>
    )}

</div>

{/* ================= Remember Me ================= */}

<div className="flex items-center justify-between">

    <label className="flex items-center gap-2 text-sm text-muted">

        <input
            type="checkbox"
            className="h-4 w-4 accent-primary"
        />

        Remember me

    </label>

    <button
        type="button"
        className="text-sm font-medium text-primary transition hover:underline"
    >
        Forgot Password?
    </button>

</div>

{/* ================= Submit ================= */}

<button
    type="submit"
    disabled={isSubmitting}
    className="h-11 w-full rounded-xl bg-primary font-semibold text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-70"
>

    {isSubmitting ? "Signing In..." : "Sign In"}

</button>
                    </form>

                    {/* ================= Divider ================= */}

                    <div className="my-5 flex items-center gap-4">

                        <div className="h-px flex-1 bg-border" />

                        <span className="text-xs uppercase tracking-wider text-muted">
                            Or continue with
                        </span>

                        <div className="h-px flex-1 bg-border" />

                    </div>

                    {/* ================= Google ================= */}

           <div className="flex justify-center">

   <GoogleLogin
  onSuccess={(credentialResponse) =>
    handleGoogleLogin(credentialResponse.credential)
  }
  onError={() => toast.error("Google Login Failed")}
/>

</div>

                    {/* ================= Footer ================= */}

                    <p className="mt-6 text-center text-sm text-muted">

                        Don't have an account?

                        <Link
                            to="/register"
                            className="ml-2 font-semibold text-primary hover:underline"
                        >
                            Create Account
                        </Link>

                    </p>

                </div>

            </section>

        </main>

    );
};

export default Login;