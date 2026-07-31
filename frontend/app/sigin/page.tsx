export default function SignIn() {
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
        <h1 style={{ fontSize: 36 }}>
          Sign In
        </h1>

        <p style={{ opacity: 0.7, marginTop: 10 }}>
          Enter your presence
        </p>
      </div>
    </main>
  );
}
