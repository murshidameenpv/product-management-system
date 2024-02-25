/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
export const AuthContext = createContext();

function AuthProvider({ children }) {
  const axiosPublic = useAxiosPublic();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const createUser = async (email, password, userName) => {
    setLoading(true);
    const response = await axiosPublic.post("/api/signup", {
      email,
      password,
      userName,
    });
    if (response.data.token) {
      localStorage.setItem("access_token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user)); // store user data in local storage
    }
    setUser(response.data.user);
    setLoading(false);
    return response;
  };

  const login = async (email, password) => {
    setLoading(true);
    const response = await axiosPublic.post("/api/login", { email, password });
    if (response.data.token) {
      localStorage.setItem("access_token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user)); // store user data in local storage
    }
    setUser(response.data.user);
    setLoading(false);
    return response;
  };

  const logOut = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
  };
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("access_token");
      if (token) {
        try {
          const response = await axiosPublic.get("/jwt/verify", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.status === 200) setIsAuthenticated(true);
        } catch (error) {
          console.error(error);
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    };
    if (user) {
      checkAuth();
    }
  }, [user]);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    login,
    logOut,
    isAuthenticated,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
