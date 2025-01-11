"use server";

import { Client, Account, OAuthProvider } from "appwrite";
import { headers } from "next/headers";
export const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("668932430014a23f9ed8");
// .set(process.env.NEXT_PUBLIC_API_KEY);
console.log(client);
export const account = new Account(client);

async function getOrigin() {
  const headersList = await headers();
  return headersList.get("origin");
}

const origin = await getOrigin();

export { ID } from "appwrite";

// Go to OAuth provider login page
account.createOAuth2Session(
  OAuthProvider.Github, // provider
  `${origin}/`, // redirect here on success
  `${origin}/login`, // redirect here on failure
  ["repo", "user"] // scopes (optional)
);
