import { NavLink } from "react-router-dom";

export function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <p style={{ color: "var(--accent)", fontSize: "50px" }}>
        The page you are looking for does not exist.
      </p>
      <NavLink
        to="/"
        style={{
          fontSize: "20px",
          position: "relative",
          margin: "20px 0",
          padding: "10px 20px",
          textDecoration: "none",
          color: "var(--primary)",
          backgroundColor: "transparent",
          transition: "all 0.3s ease",
        }}
        onMouseOver={(e) => {
          e.target.style.color = "var(--accent)";
        }}
        onMouseOut={(e) => {
          e.target.style.color = "var(--primary)";
        }}
      >
        Go Back Home
      </NavLink>
    </div>
  );
}
