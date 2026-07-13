import { Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "@/hooks/auth/useRegister";
import Logo from "@/assets/logos/actionwatch-logo.svg";
import RightBanner from "@/assets/logos/registerpage.svg";
import { GoogleLogin } from "@react-oauth/google";
import { registerSchema } from "@/schemas/auth.schema";
import { toast } from "sonner";
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
const {

    register: registerAccount,

    handleGoogleRegister,

} = useRegister();
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

                  <div className="flex justify-center">

    <GoogleLogin

        theme="outline"

        size="large"

        shape="pill"

        text="signup_with"

        width="360"

        onSuccess={(credentialResponse) => {

            handleGoogleRegister(

                credentialResponse.credential

            );

        }}

        onError={() => {

            toast.error(

                "Google Sign Up Failed"

            );

        }}

    />

</div>

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
