// src/pages/HomePage.jsx
import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Ikbracadabra</h1>
        <p style={styles.subtitle}>
          Explore the features and navigate through the application.
        </p>
      </header>
      <main style={styles.main}>
        <div style={styles.linkContainer}>
          <Link to="/split-bill" style={styles.link}>
            Split Bill
          </Link>
          <Link to="/form" style={styles.link}>
            Go to Form Page
          </Link>
          <Link to="/about" style={styles.link}>
            About Us
          </Link>
        </div>
      </main>
      <footer style={styles.footer}>
        <p>&copy; 2024 My Website. All rights reserved.</p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#f9f9f9",
    padding: "20px",
  },
  header: {
    marginBottom: "20px",
  },
  title: {
    fontSize: "2.5rem",
    color: "#333",
    margin: 0,
  },
  subtitle: {
    fontSize: "1rem",
    color: "#666",
  },
  main: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  linkContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  link: {
    fontSize: "1.2rem",
    color: "#007bff",
    textDecoration: "none",
    padding: "10px 20px",
    border: "1px solid #007bff",
    borderRadius: "5px",
    transition: "background-color 0.3s",
  },
  linkHover: {
    backgroundColor: "#007bff",
    color: "#fff",
  },
  footer: {
    marginTop: "20px",
    fontSize: "0.8rem",
    color: "#888",
  },
};

export default HomePage;
