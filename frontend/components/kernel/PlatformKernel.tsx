"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type PlatformState =
  | "initializing"
  | "ready"
  | "error";

type PlatformContextType = {
  state: PlatformState;
};

const PlatformContext =
  createContext<PlatformContextType>({
    state: "initializing",
  });

export function PlatformKernel({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] =
    useState<PlatformState>(
      "initializing"
    );

  useEffect(() => {
    try {
      setState("ready");
    } catch (error) {
      console.error(
        "Platform startup failed:",
        error
      );

      setState("error");
    }
  }, []);

  return (
    <PlatformContext.Provider
      value={{
        state,
      }}
    >
      {children}
    </PlatformContext.Provider>
  );
}

export function usePlatformState() {
  return useContext(PlatformContext);
}
