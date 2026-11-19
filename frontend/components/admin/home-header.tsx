"use client";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { useRouter } from "next/navigation";
import { useProfile } from "@/lib/utils/use-profile";

type HomeHeaderProps = {
  userName: string;
};

export default function HomeHeader({ userName }: HomeHeaderProps) {
  const { profile, isError, isAuthenticated, isReady, isLoading } =
    useProfile();
  const router = useRouter();

  if (!isReady || isLoading) {
    return <div className="h-7 w-40 animate-pulse rounded bg-foreground/10" />;
  }

  return (
    <div className="flex items-center justify-between">
      {isAuthenticated && !isError ? (
        <p className="text-lg">
          Welcome,{" "}
          <span className="text-amber-400">
            {profile?.fullName?.toUpperCase()}
          </span>
        </p>
      ) : (
        <Button
          onClick={() => router.push("/admin/login")}
          className="flex items-center gap-2 cursor-pointer bg-transparent hover:bg-primary text-foreground"
        >
          <CgProfile className="text-lg" />
          Login
        </Button>
      )}

      <Field className="w-1/3">
        <ButtonGroup className="rounded-md">
          <Input
            id="input-button-group"
            className="border-none"
            placeholder="Type to search..."
          />
          <Button className="bg-[#1d1d1d]">
            <CiSearch />
          </Button>
        </ButtonGroup>
      </Field>
    </div>
  );
}
