'use client'
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { CgProfile } from "react-icons/cg"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Field, FieldGroup } from "@/components/ui/field"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation"

type AuthMode = "login" | "signup"

// Base schema shared by both modes
const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

// Signup extends login with name + confirm password
const signupSchema = loginSchema
  .extend({
    name: z.string().min(2, "Enter your full name"),
    confirmPassword: z.string().min(1, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type LoginFormValues = z.infer<typeof loginSchema>
type SignupFormValues = z.infer<typeof signupSchema>

export default function LoginSignupDialog({onLoginSuccessAction }: { onLoginSuccessAction?: () => void }) {
  const [mode, setMode] = useState<AuthMode>("login")
  const router = useRouter();

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  })

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
    mode: "onChange",
  })


  const switchMode = (next: AuthMode) => {
    setMode(next)
  }

  const resetForms = () => {
    loginForm.reset()
    signupForm.reset()
  }


  const onLoginSubmit = loginForm.handleSubmit((data) => {
    localStorage.setItem('userLoggedIn','true')
    onLoginSuccessAction?.()
    console.log("Logging in...", data)
  })

  const onSignupSubmit = signupForm.handleSubmit((data) => {
    // TODO: wire up real signup call
    console.log("Signing up...", data)
  })

  return (
    <Dialog onOpenChange={(open) => !open && resetForms()}>
      <DialogTrigger render={
        <Button className="flex items-center gap-2 cursor-pointer bg-transparent hover:bg-primary text-foreground">
          <CgProfile className="text-lg" />
          Login / Signup
        </Button>
      } />

      <DialogContent className="sm:max-w-sm bg-primary">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl text-secondary-foreground">
            {mode === "login" ? "Welcome Back" : "Create an Account"}
          </DialogTitle>
        </DialogHeader>

        {/* Tab switcher */}
        <div className="flex w-full border border-foreground/20 rounded-md overflow-hidden">
          <button
            type="button"
            onClick={() => switchMode("login")}
            className={`w-1/2 py-2 text-sm font-medium transition-colors ${
              mode === "login"
                ? "bg-secondary-foreground text-primary"
                : "bg-transparent text-foreground/60 hover:text-foreground"
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => switchMode("signup")}
            className={`w-1/2 py-2 text-sm font-medium transition-colors ${
              mode === "signup"
                ? "bg-secondary-foreground text-primary"
                : "bg-transparent text-foreground/60 hover:text-foreground"
            }`}
          >
            Signup
          </button>
        </div>

        {mode === "login" ? (
          <form onSubmit={onLoginSubmit}>
            <FieldGroup>
              <Field>
                <Label htmlFor="login-email">Email</Label>
                <Input id="login-email" type="email" placeholder="you@example.com" {...loginForm.register("email")} />
                {loginForm.formState.errors.email && (
                  <p className="text-red-500 text-xs">{loginForm.formState.errors.email.message}</p>
                )}
              </Field>
              <Field>
                <Label htmlFor="login-password">Password</Label>
                <Input id="login-password" type="password" placeholder="**********" {...loginForm.register("password")} />
                {loginForm.formState.errors.password && (
                  <p className="text-red-500 text-xs">{loginForm.formState.errors.password.message}</p>
                )}
              </Field>
            </FieldGroup>

            <DialogFooter className="mt-4">
              <DialogClose render={<Button className="bg-red-600 hover:bg-red-600/50">Cancel</Button>} />
              <Button type="submit" disabled={!loginForm.formState.isValid}>Log In</Button>
            </DialogFooter>
          </form>
        ) : (
          <form onSubmit={onSignupSubmit}>
            <FieldGroup>
              <Field>
                <Label htmlFor="signup-name">Full Name</Label>
                <Input id="signup-name" placeholder="Chukwu Obi" {...signupForm.register("name")} />
                {signupForm.formState.errors.name && (
                  <p className="text-red-500 text-xs">{signupForm.formState.errors.name.message}</p>
                )}
              </Field>
              <Field>
                <Label htmlFor="signup-email">Email</Label>
                <Input id="signup-email" type="email" placeholder="you@example.com" {...signupForm.register("email")} />
                {signupForm.formState.errors.email && (
                  <p className="text-red-500 text-xs">{signupForm.formState.errors.email.message}</p>
                )}
              </Field>
              <Field>
                <Label htmlFor="signup-password">Password</Label>
                <Input id="signup-password" type="password" placeholder="*******" {...signupForm.register("password")} />
                {signupForm.formState.errors.password && (
                  <p className="text-red-500 text-xs">{signupForm.formState.errors.password.message}</p>
                )}
              </Field>
              <Field>
                <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                <Input id="signup-confirm-password" type="password" placeholder="*******" {...signupForm.register("confirmPassword")} />
                {signupForm.formState.errors.confirmPassword && (
                  <p className="text-red-500 text-xs">{signupForm.formState.errors.confirmPassword.message}</p>
                )}
              </Field>
            </FieldGroup>

            <DialogFooter className="mt-4">
              <DialogClose render={<Button className="bg-red-600 hover:bg-red-600/50">Cancel</Button>} />
              <Button type="submit" disabled={!loginForm.formState.isValid}>Sign Up</Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}