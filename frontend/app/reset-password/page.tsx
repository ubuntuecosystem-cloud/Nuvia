"use client";

import { useState } from "react";
import { authenticationService } from "@/services/auth/AuthenticationService";

export default function ResetPasswordPage() {
  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleReset() {
    setLoading(true);
    setMessage("");

    if (password !== confirmPassword) {
      setMessage(
        "Passwords do not match."
      );
      setLoading(false);
      return;
    }

    try {
      await authenticationService.updatePassword(
        password
      );

      setMessage(
        "Password updated successfully. You can sign in now."
      );
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Password update failed"
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
        <h1>
          Reset Password
        </h1>

        <input
          placeholder="New Password"
          type="password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={{
            width: "100%",
            marginTop: 20,
            padding: 12,
            borderRadius: 8,
          }}
        />

        <input
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(
              e.target.value
            )
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
          onClick={handleReset}
          style={{
            marginTop: 20,
            width: "100%",
            padding: 12,
            borderRadius: 8,
            background: "white",
            color: "black",
          }}
        >
          {loading
            ? "Updating..."
            : "Update Password"}
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
      </div>
    </main>
  );
}
