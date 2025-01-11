import { Client, Account, OAuthProvider } from "appwrite";

export const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("668932430014a23f9ed8");
// .set(process.env.NEXT_PUBLIC_API_KEY);
console.log(client);
export const account = new Account(client);
export { ID } from "appwrite";

// Go to OAuth provider login page
account.createOAuth2Session(
  OAuthProvider.Github, // provider
  `${process.env.NEXT_PUBLIC_PAGE_URL}/`, // redirect here on success
  `${process.env.NEXT_PUBLIC_PAGE_URL}/`, // redirect here on failure
  ["repo", "user"] // scopes (optional)
);
