import { useState, useEffect } from "react";
import { account } from "@/lib/appwrite";
import { useRouter } from "next/navigation";

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkUserStatus();
  }, []);

  async function checkUserStatus() {
    try {
      const session = await account.get();
      setUser(session);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function login() {
    try {
      const response = await account.createOAuth2Session(
        "github",
        "http://localhost:3000/dashboard",
        "http://localhost:3000/login"
      );
      await checkUserStatus();
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
    }
  }

  async function logout() {
    try {
      await account.deleteSession("current");
      setUser(null);
      router.push("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  }

  return { user, loading, login, logout };
}
