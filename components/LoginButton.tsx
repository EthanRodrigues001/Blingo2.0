"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { useRouter } from "next/navigation";
import { SignIn } from "@/actions/auth";
import { useUser } from "./context/UserContext";

export function LoginButton() {
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
    <form action={handleLogin}>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? (
          "Logging in..."
        ) : (
          <>
            <Github className="mr-2 h-4 w-4" /> Sign in with GitHub
          </>
        )}
      </Button>
    </form>
  );
}
