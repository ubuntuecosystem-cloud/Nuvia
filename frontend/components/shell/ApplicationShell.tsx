"use client";

import { useEffect, useState } from "react";
import { identitySystem } from "@/systems/identity/IdentitySystem";

export default function ApplicationShell() {
  const [userId, setUserId] = useState<string | null>(
    null
  );

  useEffect(() => {
    setUserId(identitySystem.getUserId());
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0b0b0f",
        color: "white",
        fontFamily: "system-ui",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <header
        style={{
          padding: 20,
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <h1>
          Application Shell
        </h1>

        <p
          style={{
            opacity: 0.7,
          }}
        >
          Identity connected
        </p>
      </header>

      <section
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h2>
            Platform Ready
          </h2>

          <p
            style={{
              opacity: 0.7,
              marginTop: 10,
            }}
          >
            User session active
          </p>

          {userId && (
            <p
              style={{
                opacity: 0.5,
                marginTop: 10,
                fontSize: 12,
              }}
            >
              Identity: {userId}
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
