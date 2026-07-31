 import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui",
        background: "#0b0b0f",
        color: "white",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: 40 }}>
          Entry System
        </h1>

        <p style={{ opacity: 0.7, marginTop: 10 }}>
          Presence • Relationship • Continuity
        </p>

        <div
          style={{
            marginTop: 30,
            display: "flex",
            gap: 10,
            justifyContent: "center",
          }}
        >
          <Link
            href="/signin"
            style={{
              padding: "10px 16px",
              borderRadius: 8,
              border: "1px solid white",
              background: "transparent",
              color: "white",
              textDecoration: "none",
            }}
          >
            Sign In
          </Link>

          <Link
            href="/signup"
            style={{
              padding: "10px 16px",
              borderRadius: 8,
              border: "none",
              background: "white",
              color: "black",
              textDecoration: "none",
            }}
          >
            Create Account
          </Link>
        </div>
      </div>
    </main>
  );
}
