"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { useRouter } from "next/navigation";
import { SignIn } from "@/actions/auth";
import { useUser } from "./context/UserContext";

export function LoginBtn() {
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();
  const { refetchUser } = useUser();

  const handleLogin = async () => {
    startTransition(async () => {
      const redirectUrl = await SignIn();

      if (redirectUrl) {
        refetchUser();
        router.push(redirectUrl);
      }
    });
  };

  return (
    <form action={handleLogin} className="flex items-center justify-center">
      <Button
        type="submit"
        disabled={isLoading}
        className="py-2 text-white bg-[#232323] hover:bg-[#232323]/80 gap-2"
      >
        {isLoading ? (
          "Logging in..."
        ) : (
          <>
            <Github className="w-5 h-5 mr-2" />
            Sign in with GitHub
          </>
        )}
      </Button>
    </form>
  );
}
