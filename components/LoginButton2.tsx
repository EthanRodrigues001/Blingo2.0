"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { SignIn } from "@/actions/auth";
import { Loader2 } from "lucide-react";

export function LoginButton2() {
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();
  const handleLogin = async () => {
    startTransition(async () => {
      const redirectUrl = await SignIn();
      if (redirectUrl) {
        router.push(redirectUrl);
      }
    });
  };

  return (
    <form action={handleLogin}>
      <Button
        type="submit"
        disabled={isLoading}
        size="sm"
        variant="tertiary"
        asChild
        className="hover:translate-y-0 hover:scale-100"
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin" /> Logging in...
          </>
        ) : (
          <>
            Login <ArrowRightIcon className="w-4 h-4 ml-2 hidden lg:block" />
          </>
        )}
      </Button>
    </form>
  );
}
