"use server";

import { createSessionClient } from "@/lib/server/appwrite";
import { createAdminClient } from "@/lib/server/appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
// import { Query } from "appwrite";
import { headers } from "next/headers";
import { ID, OAuthProvider, Query } from "node-appwrite";
// import crypto from "crypto";

// function generateApiKey(): string {
//   return crypto.randomBytes(20).toString("hex");
// }

export async function getLoggedInUser() {
  const sessionClient = await createSessionClient();
  // return await account.get();
  if (!sessionClient) return null;

  try {
    const { account } = sessionClient;
    const result = await account.get();
    let user = null;
    if (result) {
      user = await getUserData(result.$id);
      if (!user) {
        await createNewUser(result.name, result.email, result.$id);
        user = await getUserData(result.$id);
      }
    }

    // console.log("start");
    // console.log(result);
    // console.log(
    //   "--------------------------------------------------------------------------------"
    // );
    // console.log(JSON.parse(JSON.stringify(user)));
    return {
      user: JSON.parse(JSON.stringify(user)),
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const getUserData = async (userId: string) => {
  try {
    const { database } = await createAdminClient();
    const user = await database.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_COLLECTION_ORDERS!,
      [Query.equal("id", userId)]
    );
    return user.documents[0] || null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// export async function signUpWithEmail(formData) {
//   "use server";

//   const email = formData.get("email");
//   const password = formData.get("password");
//   const name = formData.get("name");

//   const { account } = await createAdminClient();

//   await account.create(ID.unique(), email, password, name);
//   const session = await account.createEmailPasswordSession(email, password);

//   cookies().set("my-custom-session", session.secret, {
//     path: "/",
//     httpOnly: true,
//     sameSite: "strict",
//     secure: true,
//   });

//   redirect("/account");
// }

export async function SignOut(): Promise<void> {
  const sessionClient = await createSessionClient();
  if (!sessionClient) {
    redirect("/login");
  }
  const { account } = sessionClient;

  (await cookies()).delete("blingo-session");
  await account.deleteSession("current");
}

export async function SignIn() {
  const { account } = await createAdminClient();

  const origin = (await headers()).get("origin") || "http://localhost:3000";

  const redirectUrl = await account.createOAuth2Token(
    OAuthProvider.Github,
    `${origin}/api/oauth`,
    `${origin}/login`
  );

  //   const result = await account.get();
  //   let user;
  //   if (result) {
  //     user = await getUserData(result.$id);
  //   }

  return redirectUrl;
}

export async function createNewUser(name: string, email: string, id: string) {
  const { database } = await createAdminClient();

  const newUser = await database.createDocument(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_COLLECTION_ORDERS!,
    ID.unique(),
    {
      displayName: name,
      email: email,
      id: id,
      // apiKey: generateApiKey(),
    }
  );

  if (!newUser) throw new Error("Error creating user");
}
