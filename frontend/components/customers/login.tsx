"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Field, FieldGroup } from "@/components/ui/field";
import { useAuth } from "@/lib/context/authContext";
import { buildAuthUrl, getSafeRedirect } from "@/lib/auth-redirect";
import { useLoginMutation } from "@/lib/api/authApi";
import { ApiErrorResponse } from "@/lib/utils/apiErrorResponse";
import { toast } from "../ui/toast";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();

  const { customerlogin } = useAuth();
  const searchParams = useSearchParams();
  const redirectTo = getSafeRedirect(searchParams.get("redirect"));

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const payload = {
      email: data.email,
      password: data.password,
    };

    try {
      const result = await login(payload).unwrap();
      toast.add({
        type: "success",
        description: result.message,
      });
      router.push("/");
    } catch (error) {
      console.error("error:", error);
      const errorData = error as ApiErrorResponse;

      toast.add({
        type: "error",
        description: errorData.message,
      });
    }
  });

  const { errors, isValid } = form.formState;

  return (
    <div className="w-full max-w-sm rounded-lg bg-primary p-6 mx-auto mt-16 h-full">
      <h1 className="mb-6 text-center text-2xl font-semibold text-secondary-foreground">
        Welcome Back
      </h1>

      <form onSubmit={onSubmit}>
        <FieldGroup>
          <Field>
            <Label htmlFor="login-email">Email</Label>
            <Input
              id="login-email"
              type="email"
              placeholder="you@example.com"
              {...form.register("email")}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </Field>
          <Field>
            <Label htmlFor="login-password">Password</Label>
            <Input
              id="login-password"
              type="password"
              placeholder="**********"
              {...form.register("password")}
            />
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </Field>
        </FieldGroup>

        <Button type="submit" className="mt-4 w-full" disabled={!isValid}>
          {isLoading ? "Logging in" : "Log in"}
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-foreground/70">
        Don&apos;t have an account?{" "}
        <Link
          href={buildAuthUrl("/signup", redirectTo)}
          className="font-medium text-amber-400 hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
