"use client";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { getLoggedInUser } from "@/actions/auth";

type UserType = {
  id: string;
  displayName: string;
  email: string;
  photo: string | null;
  plan: string;
  hasCompletedOnboarding: boolean;
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  $databaseId: string;
  $collectionId: string;
};

type UserContextType = {
  user: UserType | null;
  profilePhoto: string | null;
  loading: boolean;
  error: string | null;
  refetchUser: () => void;
  setUserNull: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

const setUserNull = (
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    setLoading(true);
    setUser(null);
    setLoading(false);
  } catch (error) {
    console.log(error);
  }
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);

  const fetchPhoto = useCallback(async (user: UserType) => {
    if (!user.photo) return;

    try {
      const response = await fetch(
        `/api/v1/get-user-image?fileId=${user.photo}`
      );
      setPhoto(URL.createObjectURL(await response.blob()));
    } catch (error) {
      console.error("Failed to fetch photo:", error);
      setPhoto(null);
    }
  }, []);

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      const userData = await getLoggedInUser();
      console.log("Fetched user data:", userData);
      if (userData) {
        setUser(userData.user);
        await fetchPhoto(userData.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Failed to fetch user data:", err);
      setError("Failed to fetch user data");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [fetchPhoto]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const refetchUser = useCallback(() => {
    fetchUser();
  }, [fetchUser]);

  const contextSetUserNull = useCallback(() => {
    setUserNull(setUser, setLoading);
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        profilePhoto: photo,
        loading,
        error,
        refetchUser,
        setUserNull: contextSetUserNull,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
