"use client";

import {
  usePlatformState,
} from "@/components/kernel/PlatformKernel";

import ApplicationShell from "@/components/shell/ApplicationShell";

import AuthEntry from "@/components/auth/AuthEntry";


export default function Home() {
  const {
    state,
    authenticated,
  } = usePlatformState();


  if (state === "initializing") {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b0b0f",
          color: "white",
          fontFamily: "system-ui",
        }}
      >
        Initializing Identity...
      </main>
    );
  }


  if (state === "error") {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b0b0f",
          color: "white",
          fontFamily: "system-ui",
        }}
      >
        Platform initialization failed.
      </main>
    );
  }


  if (authenticated) {
    return <ApplicationShell />;
  }


  return <AuthEntry />;
}
