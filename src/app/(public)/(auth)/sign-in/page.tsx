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
import { Button } from "@/components/ui/button";
import { signInSchema } from "@/lib/zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ErrorContext } from "@better-fetch/fetch";
import { GithubIcon, Mail, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "../../../../../auth-client";

export default function SignIn() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState({
    credentials: false,
    github: false,
    google: false,
  });

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
        onRequest: () =>
          setIsLoading((prev) => ({ ...prev, credentials: true })),
        onSuccess: async () => {
          router.push("/dashboard");
          router.refresh();
          toast.success("Signed in successfullyyy");
        },
        onError: (ctx: ErrorContext) => {
          toast.error("Authentication failed", {
            description:
              ctx.error.message ??
              "Please check your credentials and try again.",
          });
        },
      }
    );
    setIsLoading((prev) => ({ ...prev, credentials: false }));
  };

  const handleSocialSignIn = async (provider: "github" | "google") => {
    const loadingKey = provider as keyof typeof isLoading;

    await authClient.signIn.social(
      { provider },
      {
        onRequest: () =>
          setIsLoading((prev) => ({ ...prev, [loadingKey]: true })),
        onSuccess: async () => {
          router.push("/dashboard");
          router.refresh();

          setTimeout(() => {
            toast.success("Signed in Successfully");
          }, 1000);
        },
        onError: (ctx: ErrorContext) => {
          toast.error("Authentication failed", {
            description:
              (ctx.error.message || ctx.error.statusText) ??
              `There was a problem signing in with ${provider}.`,
          });
        },
      }
    );
    setIsLoading((prev) => ({ ...prev, [loadingKey]: false }));
  };

  return (
    <div className="grow flex items-center justify-center p-4 mt-20">
      <Card className="w-full max-w-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-3xl font-bold text-center text-primary">
            Sign In
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleCredentialsSignIn)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        autoComplete="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full font-medium"
                disabled={isLoading.credentials}
              >
                {isLoading.credentials ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
            </form>
          </Form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              type="button"
              variant="outline"
              className="w-full font-medium"
              onClick={() => handleSocialSignIn("github")}
              disabled={isLoading.github}
            >
              {isLoading.github ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <GithubIcon className="mr-2 h-4 w-4" />
              )}
              {isLoading.github ? "Connecting..." : "Continue with GitHub"}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full  font-medium"
              onClick={() => handleSocialSignIn("google")}
              disabled={isLoading.google}
            >
              {isLoading.google ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <img
                  className="w-6 h-6"
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  loading="lazy"
                  alt="Google logo"
                />
              )}
              {isLoading.google ? "Connecting..." : "Continue with Google"}
            </Button>
          </div>

          <div className="mt-6 text-center text-sm">
            <Link
              href="/forgot-password"
              className="text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
