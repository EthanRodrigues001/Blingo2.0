"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface LoadingContextType {
  isloading: boolean;
  toggleLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isloading, setLoading] = useState(false);

  const toggleLoading = (loading: boolean) => {
    setLoading(loading);
  };

  React.useEffect(() => {
    console.log(`Loading state changed: ${isloading}`);
  }, [isloading]);

  return (
    <LoadingContext.Provider value={{ isloading, toggleLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
