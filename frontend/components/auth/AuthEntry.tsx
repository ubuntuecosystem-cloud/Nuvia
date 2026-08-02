"use client";

import { useState } from "react";

import {
  authenticationService,
} from "@/services/auth/AuthenticationService";

type EntryMode =
  | "entry"
  | "signin"
  | "signup"
  | "forgot";

export default function AuthEntry() {
  const [mode, setMode] =
    useState<EntryMode>("entry");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);


  async function handleSignIn() {
    setLoading(true);
    setMessage("");

    try {
      await authenticationService.signIn(
        email,
        password
      );

      setMessage(
        "Signed in successfully"
      );

      window.location.reload();

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


  async function handleForgotPassword() {
    setLoading(true);
    setMessage("");

    try {
      await authenticationService.requestPasswordReset(
        email
      );

      setMessage(
        "Password reset email sent."
      );

    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Password reset failed"
      );
    } finally {
      setLoading(false);
    }
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
            <h1
              style={{
                fontSize: 40,
              }}
            >
              Entry System
            </h1>

            <p
              style={{
                opacity: 0.7,
              }}
            >
              Presence • Relationship • Continuity
            </p>


            <button
              onClick={() =>
                setMode("signin")
              }
              style={{
                marginTop: 30,
                width: "100%",
                padding: 12,
              }}
            >
              Sign In
            </button>


            <button
              onClick={() =>
                setMode("signup")
              }
              style={{
                marginTop: 10,
                width: "100%",
                padding: 12,
              }}
            >
              Create Account
            </button>
          </>
        )}


        {(mode === "signin" ||
          mode === "signup" ||
          mode === "forgot") && (

          <>
            <h1>
              {mode === "signin"
                ? "Sign In"
                : mode === "signup"
                ? "Create Account"
                : "Reset Password"}
            </h1>


            <input
              placeholder="Email"
              value={email}
              onChange={(event) =>
                setEmail(
                  event.target.value
                )
              }
              style={{
                width: "100%",
                marginTop: 20,
                padding: 12,
              }}
            />


            {mode !== "forgot" && (

              <div
                style={{
                  display: "flex",
                  gap: 8,
                  marginTop: 10,
                }}
              >

                <input
                  placeholder="Password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(event) =>
                    setPassword(
                      event.target.value
                    )
                  }
                  style={{
                    flex: 1,
                    padding: 12,
                  }}
                />


                <button
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                >
                  {showPassword
                    ? "Hide"
                    : "Show"}
                </button>

              </div>
            )}


            <button
              disabled={loading}
              onClick={
                mode === "signin"
                  ? handleSignIn
                  : mode === "signup"
                  ? handleCreateAccount
                  : handleForgotPassword
              }
              style={{
                marginTop: 20,
                width: "100%",
                padding: 12,
              }}
            >
              {loading
                ? "Processing..."
                : mode === "signin"
                ? "Sign In"
                : mode === "signup"
                ? "Create Account"
                : "Send Reset Email"}
            </button>


            {mode === "signin" && (
              <button
                onClick={() =>
                  setMode("forgot")
                }
                style={{
                  marginTop: 10,
                }}
              >
                Forgot Password?
              </button>
            )}


            <button
              onClick={() =>
                setMode("entry")
              }
              style={{
                marginTop: 10,
              }}
            >
              Back
            </button>


            {message && (
              <p
                style={{
                  marginTop: 20,
                }}
              >
                {message}
              </p>
            )}

          </>
        )}

      </div>
    </main>
  );
}
