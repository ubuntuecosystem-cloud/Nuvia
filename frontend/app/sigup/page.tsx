"use client";

import { useState } from "react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          width: 320,
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: 36 }}>
          Create Account
        </h1>

        <p style={{ opacity: 0.7 }}>
          Begin your presence
        </p>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            marginTop: 10,
            padding: 12,
            borderRadius: 8,
          }}
        />

        <button
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
          Create Account
        </button>
      </div>
    </main>
  );
}
