import Layout from "../components/layout/Layout";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function LoginPage() {
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");

  const { login, error } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ username, password });
  };

  return (
    <Layout title="Admin login - Holidaze">
      <h1>Admin login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUser(e.target.value)}
        ></input>

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>

        <input className="btn" type="submit" value="Login"></input>
      </form>
    </Layout>
  );
}
