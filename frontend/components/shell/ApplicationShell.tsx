"use client";

import { usePlatformState } from "@/components/kernel/PlatformKernel";
import { authenticationService } from "@/services/auth/AuthenticationService";

export default function ApplicationShell() {
  const {
    userId,
  } = usePlatformState();

  async function handleSignOut() {
    await authenticationService.signOut();

    window.location.reload();
  }

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
          borderBottom:
            "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
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
        </div>

        <button
          onClick={handleSignOut}
          style={{
            padding: "10px 16px",
            borderRadius: 8,
            background: "transparent",
            color: "white",
            border:
              "1px solid rgba(255,255,255,0.5)",
          }}
        >
          Sign Out
        </button>
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
