export default function SignUp() {
  return (
    <main
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0b0b0f",
        color: "white",
        fontFamily: "system-ui",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: 40 }}>
          Create Account
        </h1>

        <p
          style={{
            opacity: 0.7,
            marginTop: 10,
          }}
        >
          Begin your presence
        </p>
      </div>
    </main>
  );
}
