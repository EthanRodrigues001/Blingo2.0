import { getLoggedInUser } from "@/actions/auth";

export default async function Home() {
  const user = await getLoggedInUser();
  console.log("home user", user);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Welcome to Our App</h1>
      {user ? (
        <p className="text-2xl">You are logged in!</p>
      ) : (
        <p className="text-2xl">You are not logged in.</p>
      )}
    </main>
  );
}
