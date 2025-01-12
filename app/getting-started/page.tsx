"use client";

import { useRouter } from "next/navigation";
import ProjectIdeaGenerator from "@/components/project-idea-generator";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useUser } from "@/components/context/UserContext";
import Loading from "@/components/main/Loading";

export default function GettingStartedPage() {
  const router = useRouter();
  const { user, loading } = useUser();

  if (loading) return <Loading />;

  if (!user) {
    router.push("/login");
  } else if (user.hasCompletedOnboarding === true) {
    router.push("/dashboard");
  }

  // if (!user) return null;

  return (
    <div className="min-h-screen bg-[#09090B] text-white relative py-4 px-6 sm:py-6 sm:px-24 lg:py-8 lg:p-32 flex flex-col">
      <Button
        variant="ghost"
        className="absolute top-4 left-4 text-white"
        onClick={() => router.push("/")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <div className="mb-8 mt-16 sm:mt-20">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-left">
          Getting Started
        </h1>
        <p className="text-lg text-gray-300">
          Generate project ideas tailored to your interests and skills.
        </p>
      </div>

      <div className="flex-grow overflow-auto">
        <ProjectIdeaGenerator />
      </div>
    </div>
  );
}
