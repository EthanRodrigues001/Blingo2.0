"use client";

import { SignOut } from "@/actions/auth";
import React, { useState } from "react";
import { useUser } from "./context/UserContext";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const [isLoading, setLoading] = useState(false);
  const { setUserNull } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    console.log("Logout process started");
    setLoading(true);
    try {
      console.log("Calling SignOut");
      await SignOut();
      console.log("SignOut completed, setting user to null");
      setUserNull(); // Directly set user to null
      console.log("User set to null");
      router.refresh();
      console.log("Router refreshed");
      router.push("/"); // Redirect to / after refreshing user
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
      console.log("Logout process completed");
    }
  };

  return (
    <button onClick={handleLogout} disabled={isLoading}>
      {isLoading ? "Logging out..." : "Logout"}
    </button>
  );
};

export default LogoutButton;
