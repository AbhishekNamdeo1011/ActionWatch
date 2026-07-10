import { Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "@/hooks/useRegister";
import Logo from "@/assets/logos/actionwatch-logo.svg";
import RightBanner from "@/assets/logos/registerpage.svg";

import { registerSchema } from "@/schemas/auth.schema";

const Register = () => {

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {

        register,

        handleSubmit,

        formState: {

            errors,

            isSubmitting,

        },

    } = useForm({

        resolver: zodResolver(registerSchema),

        defaultValues: {

            username: "",

            email: "",

            password: "",

            confirmPassword: "",

            terms: false,

        },

    });
const { register: registerAccount } = useRegister();
  const onSubmit = async (data) => {
    await registerAccount(data);
};

    return (

        <main className="max-h-screen grid bg-background lg:grid-cols-12">

            {/* Left */}

            <section className="hidden lg:col-span-5 lg:flex flex-col justify-between border-r border-border bg-sidebar px-12 py-10">

                <div>

                    <img
                        src={Logo}
                        alt="ActionWatch"
                        className="h-10"
                    />

                    <h1 className="mt-6 max-w-sm text-3xl font-bold leading-tight text-foreground">

                        Modern Incident
                        <br />
                        Response Platform

                    </h1>

                    <p className="mt-4 max-w-sm text-[15px] leading-7 text-muted">

                        Detect outages instantly, collaborate with responders,
                        automate investigations and resolve incidents faster
                        using AI-powered workflows.

                    </p>

                </div>

                <div className="mr-[100px] mb-40">

                    <img
                        src={RightBanner}
                        alt="Register"
                        
                    />

                </div>

            </section>

            {/* Right */}

            <section className="lg:col-span-7 flex items-center justify-center p-5">

                <div className="w-full max-w-[430px] rounded-3xl border border-border bg-surface p-7 shadow-card">

                    <img
                        src={Logo}
                        alt="ActionWatch"
                        className="mx-auto mb-6 h-10 lg:hidden"
                    />

                    <h2 className="text-center text-2xl font-bold text-foreground">

                        Create your account

                    </h2>

                    <p className="mt-1 text-center text-sm text-muted">

                        Start monitoring your infrastructure today.

                    </p>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="mt-2 space-y-5"
                    >
     {/* ================= Username ================= */}

<div>

    <label className="mb-1 block text-sm font-medium text-foreground">
        Full Name
    </label>

    <div className="relative">

        <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />

        <input
            type="text"
            placeholder="John Doe"
            {...register("username")}
            className={`h-10 w-full rounded-xl border bg-background pl-11 pr-4 text-sm outline-none transition-all ${
                errors.username
                    ? "border-red-500"
                    : "border-border focus:border-primary"
            }`}
        />

    </div>

    {errors.username && (
        <p className="mt-1 text-xs text-red-500">
            {errors.username.message}
        </p>
    )}

</div>

{/* ================= Email ================= */}

<div>

    <label className="mb-1 block text-sm font-medium text-foreground">
        Email Address
    </label>

    <div className="relative">

        <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />

        <input
            type="email"
            placeholder="john@example.com"
            {...register("email")}
            className={`h-10 w-full rounded-xl border bg-background pl-11 pr-4 text-sm outline-none transition-all ${
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

    <label className="mb-1 block text-sm font-medium text-foreground">
        Password
    </label>

    <div className="relative">

        <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />

        <input
            type={showPassword ? "text" : "password"}
            placeholder="Create password"
            {...register("password")}
            className={`h-10 w-full rounded-xl border bg-background pl-11 pr-11 text-sm outline-none transition-all ${
                errors.password
                    ? "border-red-500"
                    : "border-border focus:border-primary"
            }`}
        />

        <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
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

{/* ================= Confirm Password ================= */}

<div>

    <label className="mb-1 block text-sm font-medium text-foreground">
        Confirm Password
    </label>

    <div className="relative">

        <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />

        <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm password"
            {...register("confirmPassword")}
            className={`h-10 w-full rounded-xl border bg-background pl-11 pr-11 text-sm outline-none transition-all ${
                errors.confirmPassword
                    ? "border-red-500"
                    : "border-border focus:border-primary"
            }`}
        />

        <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
        >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>

    </div>

    {errors.confirmPassword && (
        <p className="mt-1 text-xs text-red-500">
            {errors.confirmPassword.message}
        </p>
    )}

</div>

{/* ================= Terms ================= */}

<div>

    <label className="flex items-start gap-3">

        <input
            type="checkbox"
            {...register("terms")}
            className="mt-1 h-4 w-4 accent-primary"
        />

        <span className="text-sm text-muted">

            I agree to the{" "}

            <span className="font-medium text-primary">
                Terms
            </span>

            {" "}and{" "}

            <span className="font-medium text-primary">
                Privacy Policy
            </span>

        </span>

    </label>

    {errors.terms && (
        <p className="mt-1 text-xs text-red-500">
            {errors.terms.message}
        </p>
    )}

</div>

{/* ================= Submit ================= */}

<button
    type="submit"
    disabled={isSubmitting}
    className="h-10 w-full rounded-xl bg-primary font-semibold text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-70"
>

    {isSubmitting ? "Creating Account..." : "Create Account"}

</button>
                     </form>

                    {/* ================= Divider ================= */}

                    <div className="my-3 flex items-center gap-4">

                        <div className="h-px flex-1 bg-border" />

                        <span className="text-xs uppercase tracking-wider text-muted">
                            Or continue with
                        </span>

                        <div className="h-px flex-1 bg-border" />

                    </div>

                    {/* ================= Google Button ================= */}

                    <button
                        type="button"
                        className="flex h-10 w-full items-center justify-center gap-3 rounded-xl border border-border bg-background text-sm font-medium text-foreground transition-all hover:border-primary hover:bg-surface-hover"
                    >

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 48 48"
                            className="h-5 w-5"
                        >
                            <path
                                fill="#FFC107"
                                d="M43.611 20.083H42V20H24v8h11.303C33.654 32.657 29.215 36 24 36c-6.627 0-12-5.373-12-12S17.373 12 24 12c3.059 0 5.842 1.154 7.96 3.04l5.657-5.657C34.046 6.053 29.274 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                            />

                            <path
                                fill="#FF3D00"
                                d="M6.306 14.691l6.571 4.819C14.655 16.108 18.961 13 24 13c3.059 0 5.842 1.154 7.96 3.04l5.657-5.657C34.046 6.053 29.274 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"
                            />

                            <path
                                fill="#4CAF50"
                                d="M24 44c5.177 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.155 35.091 26.715 36 24 36c-5.194 0-9.623-3.328-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
                            />

                            <path
                                fill="#1976D2"
                                d="M43.611 20.083H42V20H24v8h11.303c-1.012 2.84-3.021 5.166-5.685 6.57l.003-.002l6.19 5.238C35.373 40.092 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
                            />
                        </svg>

                        Continue with Google

                    </button>

                    {/* ================= Footer ================= */}

                    <p className="mt-4 text-center text-sm text-muted">

                        Already have an account?

                        <Link
                            to="/login"
                            className="ml-2 font-semibold text-primary hover:underline"
                        >
                            Sign In
                        </Link>

                    </p>

                </div>

            </section>

        </main>

    );
};

export default Register;
