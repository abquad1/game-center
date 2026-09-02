'use client'
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { IoIosArrowBack } from "react-icons/io"
import { FiCamera } from "react-icons/fi"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Field, FieldGroup } from "@/components/ui/field"
import { z } from "zod"

const profileSchema = z.object({
  name: z.string().min(2, "Enter your full name"),
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
  phone: z.string().min(10, "Enter a valid phone number").optional().or(z.literal("")),
})

export type ProfileFormValues = z.infer<typeof profileSchema>

export default function EditProfilePage() {
  const router = useRouter()
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
    defaultValues: {
      name: "Chukwu",
      email: "chukwu@example.com",
      phone: "",
    },
  })

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setAvatarPreview(URL.createObjectURL(file))
  }

  const onSubmit = form.handleSubmit((data) => {
    // TODO: wire up real update-profile API call
    console.log("Saving profile...", data)
    router.push("/profile")
  })

  return (
    <div className="flex flex-col gap-6 w-full">
      <Link href="/profile" className="flex gap-2 items-center text-secondary-foreground hover:underline w-fit">
        <IoIosArrowBack />
        Back to profile
      </Link>

      <h1 className="text-xl font-bold text-foreground">Edit Profile</h1>

      <form onSubmit={onSubmit} className="flex flex-col gap-6">
        {/* Avatar */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative w-24 h-24">
            <div className="w-24 h-24 rounded-full bg-primary border border-foreground/10 flex items-center justify-center overflow-hidden">
              {avatarPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={avatarPreview} alt="Profile avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-2xl text-secondary-foreground font-bold">C</span>
              )}
            </div>

            <label
              htmlFor="avatar-upload"
              className="absolute bottom-0 right-0 bg-secondary-foreground text-primary p-2 rounded-full cursor-pointer border-2 border-background"
            >
              <FiCamera className="text-sm" />
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </div>
          <p className="text-xs text-foreground/40">Tap the icon to change your photo</p>
        </div>

        {/* Form fields */}
        <div className="bg-primary border border-foreground/10 rounded-lg px-6 py-6">
          <FieldGroup>
            <Field>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Chukwu Obi" {...form.register("name")} />
              {form.formState.errors.name && (
                <p className="text-red-500 text-xs">{form.formState.errors.name.message}</p>
              )}
            </Field>

            <Field>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" {...form.register("email")} />
              {form.formState.errors.email && (
                <p className="text-red-500 text-xs">{form.formState.errors.email.message}</p>
              )}
            </Field>

            <Field>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" placeholder="080X XXX XXXX" {...form.register("phone")} />
              {form.formState.errors.phone && (
                <p className="text-red-500 text-xs">{form.formState.errors.phone.message}</p>
              )}
            </Field>
          </FieldGroup>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <Button
            type="button"
            onClick={() => router.push("/profile")}
            className="bg-transparent border border-foreground/20 text-foreground px-6 py-2 rounded-md"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!form.formState.isValid}
            className="bg-secondary-foreground text-primary px-6 py-2 rounded-md disabled:opacity-40"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  )
}