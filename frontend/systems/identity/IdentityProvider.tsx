"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { identitySystem } from "./IdentitySystem";

type IdentityContextType = {
  initialized: boolean;
  authenticated: boolean;
  userId: string | null;
};

const IdentityContext =
  createContext<IdentityContextType>({
    initialized: false,
    authenticated: false,
    userId: null,
  });

export function IdentityProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [initialized, setInitialized] =
    useState(false);

  const [authenticated, setAuthenticated] =
    useState(false);

  const [userId, setUserId] =
    useState<string | null>(null);

  useEffect(() => {
    async function initialize() {
      await identitySystem.initialize();

      setAuthenticated(
        identitySystem.getSessionStatus() ===
          "authenticated"
      );

      setUserId(
        identitySystem.getUserId()
      );

      setInitialized(true);
    }

    initialize();
  }, []);

  return (
    <IdentityContext.Provider
      value={{
        initialized,
        authenticated,
        userId,
      }}
    >
      {children}
    </IdentityContext.Provider>
  );
}

export function useIdentity() {
  return useContext(IdentityContext);
}
