'use client'
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Field, FieldGroup } from "@/components/ui/field"
import { buildAuthUrl, getSafeRedirect } from "@/lib/auth-redirect"

const signupSchema = z
  .object({
    name: z.string().min(2, "Enter your full name"),
    email: z.string().min(1, "Email is required").email("Enter a valid email address"),
    phone: z
      .string()
      .min(1, "Phone number is required")
      .refine(
        (value) => /^(?:\+234|234|0)[789][01]\d{8}$/.test(value.replace(/[\s-]/g, "")),
        "Enter a valid Nigerian phone number"
      ),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type SignupFormValues = z.infer<typeof signupSchema>

export default function SignupForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = getSafeRedirect(searchParams.get("redirect"))
  
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", phone: "", password: "", confirmPassword: "" },
    mode: "onChange",
  })

  const normalizePhone = (value: string) => {
    const digits = value.replace(/[\s-+]/g, "")
    return digits.startsWith("0") ? `234${digits.slice(1)}` : digits
  }

  const onSubmit = form.handleSubmit((data) => {
    const payload = { ...data, phone: normalizePhone(data.phone) }
    console.log("Signing up...", payload)
    router.push(buildAuthUrl("/login", redirectTo))
  })

  const { errors, isValid } = form.formState

  return (
    <div className="w-full max-w-sm rounded-lg bg-primary p-6 mx-auto mt-8 h-full">
      <h1 className="mb-6 text-center text-2xl font-semibold text-secondary-foreground">
        Create an Account
      </h1>

      <form onSubmit={onSubmit}>
        <FieldGroup>
          <Field>
            <Label htmlFor="signup-name">Full Name</Label>
            <Input id="signup-name" placeholder="Chukwu Obi" {...form.register("name")} />
            {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
          </Field>
          <Field>
            <Label htmlFor="signup-email">Email</Label>
            <Input id="signup-email" type="email" placeholder="you@example.com" {...form.register("email")} />
            {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
          </Field>
          <Field>
        <Label htmlFor="signup-phone">Phone Number</Label>
        <Input
            id="signup-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="0801 234 5678"
            {...form.register("phone")}
        />
        {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
        </Field>
          <Field>
            <Label htmlFor="signup-password">Password</Label>
            <Input id="signup-password" type="password" placeholder="*******" {...form.register("password")} />
            {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
          </Field>
          <Field>
            <Label htmlFor="signup-confirm-password">Confirm Password</Label>
            <Input id="signup-confirm-password" type="password" placeholder="*******" {...form.register("confirmPassword")} />
            {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>}
          </Field>
        </FieldGroup>

        <Button type="submit" className="mt-4 w-full"   disabled={!isValid || form.formState.isSubmitting}>
          Sign Up
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-foreground/70">
        Already have an account?{" "}
        <Link href={buildAuthUrl("/login", redirectTo)} className="font-medium text-secondary-foreground hover:underline">
          Login
        </Link>
      </p>
    </div>
  )
}