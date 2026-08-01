"use client";

import { useEffect, useState } from "react";
import { authenticationService } from "@/services/auth/AuthenticationService";
import { identitySystem } from "@/systems/identity/IdentitySystem";

type EntryMode = "entry" | "signin" | "signup";

export default function Home() {
  const [mode, setMode] = useState<EntryMode>("entry");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] =
    useState(false);

  useEffect(() => {
    setAuthenticated(
      identitySystem.getSessionStatus() ===
        "authenticated"
    );
  }, []);

  async function handleSignIn() {
    setLoading(true);
    setMessage("");

    try {
      await authenticationService.signIn(
        email,
        password
      );

      setAuthenticated(true);
      setMessage("Signed in successfully");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Sign in failed"
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateAccount() {
    setLoading(true);
    setMessage("");

    try {
      await authenticationService.createAccount(
        email,
        password
      );

      setMessage(
        "Account created. Check email verification if required."
      );
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Account creation failed"
      );
    } finally {
      setLoading(false);
    }
  }

  if (authenticated) {
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
        <div style={{ textAlign: "center" }}>
          <h1>Application Shell</h1>

          <p style={{ opacity: 0.7 }}>
            Authenticated session active
          </p>
        </div>
      </main>
    );
  }

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

        {(mode === "signin" || mode === "signup") && (
          <>
            <h1>
              {mode === "signin"
                ? "Sign In"
                : "Create Account"}
            </h1>

            <input
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              style={{
                width: "100%",
                marginTop: 20,
                padding: 12,
                borderRadius: 8,
              }}
            />

            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              style={{
                width: "100%",
                marginTop: 10,
                padding: 12,
                borderRadius: 8,
              }}
            />

            <button
              disabled={loading}
              onClick={
                mode === "signin"
                  ? handleSignIn
                  : handleCreateAccount
              }
              style={{
                marginTop: 20,
                width: "100%",
                padding: 12,
                borderRadius: 8,
                background: "white",
                color: "black",
                border: "none",
              }}
            >
              {loading
                ? "Processing..."
                : mode === "signin"
                ? "Sign In"
                : "Create Account"}
            </button>

            <button
              onClick={() => {
                setMode("entry");
                setMessage("");
              }}
              style={{
                marginTop: 10,
                padding: 10,
              }}
            >
              Back
            </button>

            {message && (
              <p style={{ marginTop: 20 }}>
                {message}
              </p>
            )}
          </>
        )}
      </div>
    </main>
  );
}
