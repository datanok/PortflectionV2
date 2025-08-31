import { z } from "zod";

export const PROJECT_TYPES = [
  "web-app",
  "mobile-app",
  "desktop-app",
  "api",
  "library",
  "game",
  "data-science",
  "machine-learning",
  "other",
] as const;

const getPasswordSchema = (type: "password" | "confirmPassword") =>
  z
    .string({ required_error: `${type} is required` })
    .min(8, `${type} must be atleast 8 characters`)
    .max(32, `${type} can not exceed 32 characters`);

const getEmailSchema = () =>
  z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email");

const getNameSchema = () =>
  z
    .string({ required_error: "Name is required" })
    .min(1, "Name is required")
    .max(50, "Name must be less than 50 characters");

export const signUpSchema = z
  .object({
    name: getNameSchema(),
    email: getEmailSchema(),
    password: getPasswordSchema("password"),
    confirmPassword: getPasswordSchema("confirmPassword"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const signInSchema = z.object({
  email: getEmailSchema(),
  password: getPasswordSchema("password"),
});

export const forgotPasswordSchema = z.object({
  email: getEmailSchema(),
});

export const resetPasswordSchema = z
  .object({
    password: getPasswordSchema("password"),
    confirmPassword: getPasswordSchema("confirmPassword"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
