"use client";

import { useState } from "react";

type EntryMode = "entry" | "signin" | "signup";

export default function Home() {
  const [mode, setMode] = useState<EntryMode>("entry");

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
      <div
        style={{
          width: 360,
          textAlign: "center",
        }}
      >
        {mode === "entry" && (
          <>
            <h1 style={{ fontSize: 40 }}>
              Entry System
            </h1>

            <p style={{ opacity: 0.7 }}>
              Presence • Relationship • Continuity
            </p>

            <button
              onClick={() => setMode("signin")}
              style={{
                marginTop: 30,
                width: "100%",
                padding: 12,
                borderRadius: 8,
                background: "transparent",
                color: "white",
                border: "1px solid white",
              }}
            >
              Sign In
            </button>

            <button
              onClick={() => setMode("signup")}
              style={{
                marginTop: 10,
                width: "100%",
                padding: 12,
                borderRadius: 8,
                background: "white",
                color: "black",
                border: "none",
              }}
            >
              Create Account
            </button>
          </>
        )}

        {mode === "signin" && (
          <>
            <h1>Sign In</h1>

            <button
              onClick={() => setMode("entry")}
              style={{
                marginTop: 20,
                padding: 10,
              }}
            >
              Back
            </button>
          </>
        )}

        {mode === "signup" && (
          <>
            <h1>Create Account</h1>

            <button
              onClick={() => setMode("entry")}
              style={{
                marginTop: 20,
                padding: 10,
              }}
            >
              Back
            </button>
          </>
        )}
      </div>
    </main>
  );
}
