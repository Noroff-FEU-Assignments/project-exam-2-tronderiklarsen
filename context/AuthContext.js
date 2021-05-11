import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NEXT_URL } from "../constants/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();

  const login = async ({ username: identifier, password }) => {
    const response = await fetch(`${NEXT_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });

    const data = await response.json();

    console.log(data);

    if (response.ok) {
      setUser(data.user);
      router.push("/dashboard");
    } else {
      setError(data.message);
    }
  };

  const logout = async () => {
    console.log("Logout");
  };

  const checkAdminLoggedIn = async (user) => {
    console.log("Check");
  };

  return (
    <AuthContext.Provider value={{ user, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
