"use client";
import Icons from "@/components/icons";
import { LoginBtn } from "@/components/login-button";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  return (
    <div className="flex flex-col relative items-center justify-center min-h-screen">
      <Button
        variant="ghost"
        className="absolute top-4 left-4 text-white"
        onClick={() => router.back()}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      <div className="w-full max-w-md p-8 space-y-4">
        {/* <h1 className="text-2xl font-bold text-center text-gray-900">
          Welcome to our platform
        </h1> */}
        <div className="flex justify-center">
          <Link href="/">
            <Icons.icon className="w-10 h-10" />
          </Link>
        </div>
        <h1 className="text-2xl text-center mt-4">Login to Blingo</h1>
        <p className="text-sm text-center text-gray-500 mt-2">
          Choose a method to login
        </p>
        <LoginBtn />
      </div>
    </div>
  );
}
