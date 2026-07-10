import { z } from "zod";

export const registerSchema = z
    .object({

        username: z
            .string()
            .min(3, "Username must be at least 3 characters")
            .max(30),

        email: z
            .email("Invalid email address"),

        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(/[A-Z]/, "One uppercase letter required")
            .regex(/[a-z]/, "One lowercase letter required")
            .regex(/[0-9]/, "One number required")
            .regex(/[^A-Za-z0-9]/, "One special character required"),

        confirmPassword: z.string(),

        terms: z.literal(true, {
            errorMap: () => ({
                message: "Accept Terms & Privacy Policy"
            })
        })

    })

    .refine(

        (data) => data.password === data.confirmPassword,

        {

            message: "Passwords do not match",

            path: ["confirmPassword"]

        }

    );

    export const loginSchema = z.object({
    email: z
        .email("Invalid email address"),

    password: z
        .string()
        .min(1, "Password is required"),
});