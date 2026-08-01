"use client";

import { createContext, useContext, useEffect, useState } from "react";

type PlatformState = "initializing" | "ready";

const PlatformContext = createContext<PlatformState>("initializing");

export function PlatformKernel({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] =
    useState<PlatformState>("initializing");

  useEffect(() => {
    setState("ready");
  }, []);

  return (
    <PlatformContext.Provider value={state}>
      {children}
    </PlatformContext.Provider>
  );
}

export function usePlatformState() {
  return useContext(PlatformContext);
}
