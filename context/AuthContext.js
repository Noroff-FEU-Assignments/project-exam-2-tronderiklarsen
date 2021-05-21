import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NEXT_URL } from "../constants/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => checkAdminLoggedIn(), []);

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

    if (response.ok) {
      setUser(data.user);
      router.push("/admin");
    } else {
      setError(data.message);
    }
  };

  const logout = async () => {
    const response = await fetch(`${NEXT_URL}/api/logout`, {
      method: "POST",
    });

    if (response.ok) {
      setUser(null);
      router.push("/");
    }
  };

  const checkAdminLoggedIn = async () => {
    const response = await fetch(`${NEXT_URL}/api/user`)
    const data =  await response.json()

    if (response.ok) {
      setUser(data.user);
    } else if (!response.ok && router.pathname === "/admin") {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
