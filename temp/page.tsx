import { LoginButton } from "@/components/LoginButton";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Login</h1>
      <LoginButton />
    </div>
  );
}
