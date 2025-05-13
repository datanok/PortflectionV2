"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { signInSchema } from "@/lib/zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Link from "next/link";
import { useState } from "react";

import { useRouter } from "next/navigation";

import { ErrorContext } from "@better-fetch/fetch";
import { GithubIcon } from "lucide-react"
import { toast } from "sonner";
import LoadingButton from "@/components/ui/loading-button";
import { authClient } from "../../../../../auth-client";

export default function SignIn() {
  const router = useRouter();
  const [pendingCredentials, setPendingCredentials] = useState(false);
  const [pendingGithub, setPendingGithub] = useState(false);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleCredentialsSignIn = async (
    values: z.infer<typeof signInSchema>
  ) => {
    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        onRequest: () => {
          setPendingCredentials(true);
        },
        onSuccess: async () => {
          toast.success("Signed in successfully");
          router.push("/dashboard");
          router.refresh();
        },
        onError: (ctx: ErrorContext) => {
          toast.error("Something went wrong", {
            description: ctx.error.message ?? "Something went wrong.",
          });
        },
      }
    );
    setPendingCredentials(false);
  };

  const handleSignInWithGithub = async () => {
    await authClient.signIn.social(
      {
        provider: "github",
      },
      {
        onRequest: () => {
          setPendingGithub(true);
        },
        onSuccess: async () => {
          toast.success("Signed in successfully");
          router.push("/dashboard");
          router.refresh();
        },
        onError: (ctx: ErrorContext) => {
          toast.error("Something went wrong", {
            description:(ctx.error.message || ctx.error.statusText) ?? "Something went wrong.",
          });
        },
      }
    );
    setPendingGithub(false);
  };

  return (
    <div className="grow flex items-center justify-center p-4">
      <Card
        className="w-full max-w-md"
        // style={{
        //   backgroundColor: "var(--card)",
        //   borderColor: "var(--border)",
        //   boxShadow: "0 4px 12px var(--shadow)",
        // }}
      >
        <CardHeader className="pb-4">
          <CardTitle
            className="text-3xl font-bold text-center"
            style={{ color: "var(--brand)" }}
          >
            Sign In
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleCredentialsSignIn)}
              className="space-y-6"
            >
              {["email", "password"].map((field) => (
                <FormField
                  control={form.control}
                  key={field}
                  name={field as keyof z.infer<typeof signInSchema>}
                  render={({ field: fieldProps }) => (
                    <FormItem>
                      <FormLabel style={{ color: "var(--foreground)" }}>
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type={field === "password" ? "password" : "email"}
                          placeholder={`Enter your ${field}`}
                          {...fieldProps}
                          autoComplete={
                            field === "password" ? "current-password" : "email"
                          }
                          // className="border-2 focus:border-2 focus-visible:ring-0 transition-colors"
                          // style={{
                          //   borderColor: "var(--border)",
                          //   color: "var(--foreground)",
                          //   backgroundColor: "var(--background)",
                          // }}
                          onFocus={(e) =>
                            (e.target.style.borderColor = "var(--brand)")
                          }
                          onBlur={(e) =>
                            (e.target.style.borderColor = "var(--border)")
                          }
                        />
                      </FormControl>
                      <FormMessage style={{ color: "var(--destructive)" }} />
                    </FormItem>
                  )}
                />
              ))}
              <LoadingButton
                pending={pendingCredentials}
                className="w-full transition-colors"
                style={{
                  // backgroundColor: "var(--brand)",
                  color: "white",
                  border: "none",
                  fontWeight: 500,
                }}
              >
                Sign in
              </LoadingButton>
            </form>
          </Form>
          <div className="relative mt-8 mb-6">
            <div className="absolute inset-0 flex items-center">
              <div
                style={{
                  height: "1px",
                  width: "100%",
                  // backgroundColor: "var(--border)",
                }}
              ></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span
                style={{
                  backgroundColor: "var(--card)",
                  padding: "0 8px",
                  // color: "var(--muted-foreground)",
                }}
              >
                Or continue with
              </span>
            </div>
          </div>
          <div>
            <LoadingButton
              pending={pendingGithub}
              onClick={handleSignInWithGithub}
              className="w-full transition-colors flex items-center justify-center"
              style={{
                backgroundColor: "var(--accent)",
                color: "var(--accent-foreground)",
                border: "1px solid var(--border)",
                fontWeight: 500,
              }}
            >
              <GithubIcon className="w-4 h-4 mr-2" />
              Continue with GitHub
            </LoadingButton>
          </div>
          <div className="mt-6 text-center text-sm">
            <Link
              href="/forgot-password"
              className="hover:underline transition-colors"
              style={{ color: "var(--brand)" }}
            >
              Forgot password?
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
